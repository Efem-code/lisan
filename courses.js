/* Lisan — the course registry.
 *
 * Loaded before the individual course files, each of which calls register().
 * This file owns the shape of a course and the checks every course must pass;
 * it owns none of the content.
 */
var Courses = (function () {
'use strict';

var ALL = [];

/* Sensible defaults so a course file only has to state what is unusual about
   it. A Latin-script language needs almost none of this. */
var DEFAULTS = {
  dir: 'ltr',
  script: 'latin',
  romanized: false,     /* entries carry an `r` romanisation */
  hasAlphabet: false,   /* the course teaches a writing system first */
  gendered: false,      /* nouns carry a `g` */
  speech: []
};

function register(course) {
  Object.keys(DEFAULTS).forEach(function (k) {
    if (course[k] === undefined) course[k] = DEFAULTS[k];
  });
  ALL.push(course);
  ALL.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
  return course;
}

function byId(id) {
  for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i];
  return ALL[0];
}

/* Every vocabulary item in a course, for building plausible wrong answers. */
function allVocab(course) {
  var out = [];
  course.units.forEach(function (u) {
    (u.vocab || []).forEach(function (v) { out.push(v); });
  });
  return out;
}

function allSentences(course) {
  var out = [];
  course.units.forEach(function (u) {
    (u.sentences || []).forEach(function (s) { out.push(s); });
  });
  return out;
}

/* Sanity checks, run by the test script and at startup in the console. A
   course that fails these would produce exercises with no right answer, or a
   word bank missing the words needed to build its own sentence. */
function verify() {
  var problems = [];
  ALL.forEach(function (course) {
    var seenUnit = {}, seenWord = {};
    if (!course.units || !course.units.length) problems.push(course.id + ': no units');
    (course.units || []).forEach(function (u) {
      if (seenUnit[u.id]) problems.push(course.id + ': duplicate unit id ' + u.id);
      seenUnit[u.id] = true;

      if (u.kind === 'alphabet') {
        if (!course.hasAlphabet) problems.push(u.id + ': alphabet unit in a course with hasAlphabet false');
        Array.prototype.forEach.call(u.letters, function (ch) {
          if (!Alphabet.byChar(course.id, ch)) {
            problems.push(u.id + ': letter ' + ch + ' is not in the ' + course.id + ' alphabet');
          }
        });
        return;
      }

      if (!u.vocab || u.vocab.length < 4) problems.push(u.id + ': needs at least 4 words');
      (u.vocab || []).forEach(function (v) {
        if (!v.t || !v.e) problems.push(u.id + ': incomplete entry ' + JSON.stringify(v));
        if (course.romanized && !v.r) problems.push(u.id + ': "' + v.t + '" has no romanisation');
        if (seenWord[v.t]) problems.push(course.id + ': "' + v.t + '" appears twice');
        seenWord[v.t] = true;
      });
      (u.sentences || []).forEach(function (s) {
        if (!s.t || !s.e) { problems.push(u.id + ': incomplete sentence'); return; }
        if (course.romanized && !s.r) problems.push(u.id + ': sentence "' + s.t + '" has no romanisation');
        /* Word-bank exercises tokenise on spaces, so a single-token sentence
           cannot be built at all. */
        if (s.t.split(' ').length < 2) problems.push(u.id + ': sentence "' + s.t + '" has nothing to build');
        if (s.e.split(' ').length < 2) problems.push(u.id + ': English "' + s.e + '" has nothing to build');
      });
    });
  });
  return problems;
}

function stats() {
  return ALL.map(function (c) {
    return {
      id: c.id, name: c.name,
      units: c.units.length,
      words: allVocab(c).length,
      sentences: allSentences(c).length
    };
  });
}

return {
  ALL: ALL, register: register, byId: byId,
  allVocab: allVocab, allSentences: allSentences,
  verify: verify, stats: stats
};
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Courses;
