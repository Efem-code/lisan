/* Lisan — persistence.
 *
 * Everything lives in localStorage on the device. No account, no server.
 * Progress is kept per course, so learning Arabic and Urdu at the same time
 * does not have them fighting over one streak.
 */
var Store = (function () {
'use strict';

var KEY = 'lisan.v1';

var DEFAULTS = {
  settings: {
    course: 'ar', showRoman: true, sound: true, haptics: true,
    dailyGoal: 30, speakRate: 0.75, listening: true
  },
  streak: 0,
  lastActiveDay: null,
  courses: {}           /* courseId -> { xp, lessons: {}, items: {}, dayXp: {} } */
};

function clone(o) { return JSON.parse(JSON.stringify(o)); }

var data = null;

function load() {
  if (data) return data;
  data = clone(DEFAULTS);
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var p = JSON.parse(raw);
      Object.keys(DEFAULTS).forEach(function (k) {
        if (p[k] === undefined) return;
        if (k === 'settings') {
          Object.keys(DEFAULTS.settings).forEach(function (sk) {
            if (p.settings && p.settings[sk] !== undefined) data.settings[sk] = p.settings[sk];
          });
        } else data[k] = p[k];
      });
    }
  } catch (e) { /* unreadable or unavailable — start fresh rather than fail */ }
  return data;
}

var timer = null;
function save() {
  if (timer) return;
  timer = setTimeout(saveNow, 150);
}
function saveNow() {
  if (timer) { clearTimeout(timer); timer = null; }
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
}

function settings() { return load().settings; }
function setSetting(k, v) { load().settings[k] = v; save(); }

function course(id) {
  var d = load();
  id = id || d.settings.course;
  if (!d.courses[id]) d.courses[id] = { xp: 0, lessons: {}, items: {}, dayXp: {} };
  var c = d.courses[id];
  if (!c.items) c.items = {};
  if (!c.lessons) c.lessons = {};
  if (!c.dayXp) c.dayXp = {};
  return c;
}

function today() {
  var d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}
function dayKey(offset) {
  var d = new Date();
  d.setDate(d.getDate() + (offset || 0));
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

/* ------------------------------------------------------------------- XP */

function addXp(n, courseId) {
  var d = load(), c = course(courseId);
  c.xp = (c.xp || 0) + n;
  var k = today();
  c.dayXp[k] = (c.dayXp[k] || 0) + n;
  /* Trim the history; only the last few weeks are ever shown. */
  var keys = Object.keys(c.dayXp);
  if (keys.length > 60) keys.slice(0, keys.length - 60).forEach(function (old) { delete c.dayXp[old]; });
  updateStreak();
  save();
  return c.xp;
}

function todayXp(courseId) { return course(courseId).dayXp[today()] || 0; }

/* The streak counts days on which the daily goal was met — not days the app
   was merely opened, which would make it meaningless. */
function updateStreak() {
  var d = load();
  var goal = d.settings.dailyGoal;
  var t = today();
  var metToday = false;
  Object.keys(d.courses).forEach(function (id) {
    if ((d.courses[id].dayXp || {})[t] >= goal) metToday = true;
  });
  if (!metToday) return d.streak;
  if (d.lastActiveDay === t) return d.streak;
  d.streak = (d.lastActiveDay === dayKey(-1)) ? d.streak + 1 : 1;
  d.lastActiveDay = t;
  save();
  return d.streak;
}

/* A streak is only alive if the goal was met today or yesterday. */
function streak() {
  var d = load();
  if (!d.lastActiveDay) return 0;
  if (d.lastActiveDay === today() || d.lastActiveDay === dayKey(-1)) return d.streak;
  return 0;
}

/* ------------------------------------------------------------ item memory */

function itemState(key, courseId) {
  var c = course(courseId);
  return c.items[key] || null;
}

function recordAnswer(key, correct, courseId) {
  if (!key) return;
  var c = course(courseId);
  var s = c.items[key] || { strength: 0, due: 0, seen: 0, wrong: 0 };
  s.seen++;
  if (correct) s.strength = Math.min(5, s.strength + 1);
  else { s.strength = 0; s.wrong++; }
  s.due = Lesson.nextDue(s.strength);
  c.items[key] = s;
  save();
}

/* ---------------------------------------------------------------- lessons */

function lessonState(lessonId, courseId) {
  return course(courseId).lessons[lessonId] || { crowns: 0 };
}
function completeLesson(lessonId, courseId) {
  var c = course(courseId);
  var s = c.lessons[lessonId] || { crowns: 0 };
  s.crowns = Math.min(5, (s.crowns || 0) + 1);
  s.at = new Date().toISOString();
  c.lessons[lessonId] = s;
  saveNow();
  return s;
}

/* A lesson unlocks when the one before it has been completed at least once.
   The first is always open. */
function isUnlocked(plan, index, courseId) {
  if (index === 0) return true;
  return lessonState(plan[index - 1].id, courseId).crowns > 0;
}

function courseProgress(courseId, plan) {
  var c = course(courseId), done = 0;
  plan.forEach(function (n) { if ((c.lessons[n.id] || {}).crowns > 0) done++; });
  return { done: done, total: plan.length, xp: c.xp || 0 };
}

function knownItems(courseId) {
  return Object.keys(course(courseId).items).length;
}

function exportAll() { return JSON.stringify(load(), null, 2); }
function resetAll() { data = clone(DEFAULTS); saveNow(); }
function resetCourse(id) {
  var d = load();
  delete d.courses[id];
  saveNow();
}

return {
  settings: settings, setSetting: setSetting,
  course: course,
  addXp: addXp, todayXp: todayXp, streak: streak,
  itemState: itemState, recordAnswer: recordAnswer,
  lessonState: lessonState, completeLesson: completeLesson, isUnlocked: isUnlocked,
  courseProgress: courseProgress, knownItems: knownItems,
  exportAll: exportAll, resetAll: resetAll, resetCourse: resetCourse,
  saveNow: saveNow, today: today
};
})();
