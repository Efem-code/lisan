/* Lisan — application.
 *
 * A path of lessons, a lesson runner, a practice mode and a word list. The
 * lesson runner is the whole app really: everything else exists to choose what
 * it should ask next.
 */
(function () {
'use strict';

var $ = function (id) { return document.getElementById(id); };
function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function on(node, ev, fn) { if (node) node.addEventListener(ev, fn); }
function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

var course = null;
var plan = [];

/* ------------------------------------------------------------- feedback */

var Sfx = (function () {
  var ctx = null;
  function tone(freq, ms, type, gain, delay) {
    if (!Store.settings().sound) return;
    try {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      var t0 = ctx.currentTime + (delay || 0);
      var osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(gain || 0.07, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + ms / 1000);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(t0); osc.stop(t0 + ms / 1000);
    } catch (e) {}
  }
  return {
    right: function () { tone(660, 90, 'sine', .06); tone(880, 150, 'sine', .06, .08); },
    wrong: function () { tone(220, 200, 'square', .045); },
    tap: function () { tone(520, 35, 'sine', .03); },
    finish: function () {
      tone(523, 120); tone(659, 120, 'sine', .07, .12);
      tone(784, 120, 'sine', .07, .24); tone(1047, 260, 'sine', .07, .36);
    },
    fail: function () { tone(330, 180, 'sine', .06); tone(220, 300, 'sine', .06, .16); }
  };
})();

function buzz(ms) {
  if (!Store.settings().haptics) return;
  try { if (navigator.vibrate) navigator.vibrate(ms || 8); } catch (e) {}
}

function canSpeak() {
  return Store.settings().listening && TTS.available(course.speech);
}
function say(text, slow) {
  if (!text) return;
  /* The slow reading is much slower than the "slow" setting: it is for picking
     a word apart syllable by syllable, not for listening comfortably. */
  TTS.speak(text, course.speech, slow ? 0.35 : Store.settings().speakRate);
}

/* Script text with optional romanisation underneath. */
function scriptBlock(text, roman, size) {
  var wrap = el('div');
  var s = el('div', 'script ' + (size || 'lg'), text);
  wrap.appendChild(s);
  if (roman && Store.settings().showRoman) wrap.appendChild(el('div', 'roman', roman));
  return wrap;
}

/* The same, plus the plain-English respelling. Used only where something is
   being taught — never on a question, where it would give the answer away and
   undo the point of switching romanisation off. */
function teachBlock(text, roman, size) {
  var wrap = el('div');
  wrap.appendChild(el('div', 'script ' + (size || 'lg'), text));
  var say = Pron.respell(roman);
  if (say) wrap.appendChild(el('div', 'pron', say));
  if (roman && Store.settings().showRoman) wrap.appendChild(el('div', 'roman', roman));
  return wrap;
}

/* Notes for the sounds in this word that English simply does not have. */
function soundTips(roman) {
  var list = Pron.tips(roman);
  if (!list.length) return null;
  var box = el('div', 'sound-tips');
  box.appendChild(el('div', 'st-head', list.length === 1 ? 'One sound to watch' : 'Sounds to watch'));
  list.forEach(function (t) {
    var row = el('div', 'sound-tip');
    row.appendChild(el('span', 'st-sym', t.label));
    row.appendChild(el('span', null, t.how));
    box.appendChild(row);
  });
  return box;
}

/* Normal speed and a much slower reading, side by side. */
function speakPair(text) {
  var row = el('span', 'speak-row');
  row.appendChild(speakButton(text));
  /* Labelled with a word rather than a turtle: Android renders emoji through
     whichever font is installed, at unpredictable sizes and colours. */
  var slow = el('button', 'speak-btn slow', 'SLOW');
  slow.setAttribute('aria-label', 'Listen slowly');
  slow.onclick = function (e) { e.stopPropagation(); say(text, true); };
  row.appendChild(slow);
  return row;
}

function speakButton(text, small) {
  var b = el('button', 'speak-btn' + (small ? ' small' : ''), '🔊');
  b.setAttribute('aria-label', 'Listen');
  b.onclick = function (e) { e.stopPropagation(); say(text); };
  return b;
}

/* ============================================================ PATH SCREEN */

function setCourse(id) {
  course = Courses.byId(id);
  plan = Lesson.planCourse(course);
  Store.setSetting('course', course.id);
  document.documentElement.setAttribute('data-script', course.script);
  $('course-flag').textContent = course.native;
  $('course-name').textContent = course.name;
  renderPath();
  renderWords();
  renderPractice();
}

function renderHeader() {
  $('stat-streak').innerHTML = '🔥 <b>' + Store.streak() + '</b>';
  $('stat-xp').innerHTML = '✦ <b>' + (Store.course(course.id).xp || 0) + '</b>';
  $('stat-known').innerHTML = '◆ <b>' + Store.knownItems(course.id) + '</b>';

  var goal = Store.settings().dailyGoal, today = Store.todayXp(course.id);
  $('goal-fill').style.width = Math.min(100, today / goal * 100) + '%';
  $('goal-text').textContent = today >= goal
    ? 'Daily goal done'
    : today + ' / ' + goal + ' XP today';
}

function renderPath() {
  renderHeader();
  var wrap = $('path-list');
  clear(wrap);

  var byUnit = {};
  plan.forEach(function (node, i) {
    (byUnit[node.unitId] = byUnit[node.unitId] || []).push({ node: node, i: i });
  });

  course.units.forEach(function (unit) {
    var nodes = byUnit[unit.id] || [];
    if (!nodes.length) return;
    var box = el('div', 'unit');
    var doneCount = nodes.filter(function (n) {
      return Store.lessonState(n.node.id, course.id).crowns > 0;
    }).length;

    var head = el('div', 'unit-head' + (unit.kind === 'alphabet' ? ' alphabet' : '') +
                          (doneCount === nodes.length ? ' done' : ''));
    head.appendChild(el('div', 'u-title', unit.title));
    head.appendChild(el('div', 'u-blurb', unit.blurb + ' · ' + doneCount + '/' + nodes.length));
    box.appendChild(head);

    var row = el('div', 'unit-nodes');
    nodes.forEach(function (entry) {
      var st = Store.lessonState(entry.node.id, course.id);
      var unlocked = Store.isUnlocked(plan, entry.i, course.id);
      var cls = 'node ' + (!unlocked ? 'locked' : st.crowns > 0 ? 'done' : 'open');
      var btn = el('button', cls);
      var dot = el('div', 'dot', !unlocked ? '🔒' : st.crowns >= 5 ? '★' : st.crowns > 0 ? '✓' : '▶');
      btn.appendChild(dot);
      btn.appendChild(el('div', 'crowns', st.crowns ? new Array(st.crowns + 1).join('★') : ''));
      btn.appendChild(el('div', 'cap', entry.node.title));
      if (unlocked) btn.onclick = function () { startLesson(entry.node); };
      row.appendChild(btn);
    });
    box.appendChild(row);
    wrap.appendChild(box);
  });

  var prog = Store.courseProgress(course.id, plan);
  var foot = el('div', 'card');
  foot.appendChild(el('h2', null, 'Course progress'));
  foot.appendChild(el('p', 'hint', prog.done + ' of ' + prog.total + ' lessons done · ' +
    Store.knownItems(course.id) + ' words and letters met · ' + prog.xp + ' XP total'));
  wrap.appendChild(foot);
}

/* =========================================================== LESSON RUNNER */

var LS = null;

function startLesson(node, practice) {
  var exercises = practice
    ? Lesson.buildPractice(course, Store.course(course.id), { canSpeak: canSpeak() })
    : Lesson.buildExercises(course, node.spec, { canSpeak: canSpeak() });

  if (!exercises.length) {
    alert('Nothing to practise yet — finish a lesson first.');
    return;
  }

  LS = {
    node: node, practice: !!practice,
    queue: exercises, index: 0, total: exercises.length,
    correct: 0, answered: 0, mistakes: 0,
    startedAt: Date.now(), newItems: [], selection: null, state: 'answering',
    missed: []
  };
  showScreen('lesson');
  renderExercise();
}

function currentEx() { return LS.queue[LS.index]; }

function isIntro(ex) {
  return ex.type === 'wordIntro' || ex.type === 'letterIntro' || ex.type === 'sentenceIntro';
}

function renderExercise() {
  var ex = currentEx();
  var box = $('exercise');
  clear(box);
  LS.selection = null;
  LS.state = 'answering';

  $('lesson-progress').style.width = (LS.index / LS.total * 100) + '%';
  var footer = $('lesson-footer');
  footer.className = 'footer';
  $('feedback').hidden = true;

  var check = $('btn-check');
  check.className = 'big-btn grey';
  check.disabled = true;
  check.textContent = 'Check';

  if (isIntro(ex)) {
    check.className = 'big-btn green';
    check.disabled = false;
    check.textContent = 'Continue';
  }
  /* A matching grid advances itself when the last pair clears, so a Check
     button there is a dead control that only invites tapping. */
  check.hidden = ex.type === 'match';

  var render = RENDERERS[ex.type];
  if (render) render(ex, box);
  else box.appendChild(el('p', null, 'Unsupported exercise.'));

  /* Play the audio for listening exercises without waiting to be asked. */
  if (ex.type === 'listen' && ex.speak) setTimeout(function () { say(ex.speak); }, 250);
}

var RENDERERS = {};

RENDERERS.wordIntro = function (ex, box) {
  box.appendChild(el('div', 'ex-q', 'New word'));
  var card = el('div', 'prompt-card');
  var row = el('div', 'speak-row');
  row.appendChild(teachBlock(ex.word.t, ex.word.r, 'xl'));
  if (canSpeak()) row.appendChild(speakPair(ex.word.t));
  card.appendChild(row);
  card.appendChild(el('div', 'english', ex.word.e));
  box.appendChild(card);
  var tips = soundTips(ex.word.r);
  if (tips) box.appendChild(tips);
  if (ex.word.n) box.appendChild(el('p', 'ex-note', ex.word.n));
  if (LS.newItems.indexOf(ex.word.t) < 0) LS.newItems.push(ex.word.t);
};

RENDERERS.sentenceIntro = function (ex, box) {
  box.appendChild(el('div', 'ex-q', 'New sentence'));
  var card = el('div', 'prompt-card');
  var row = el('div', 'speak-row');
  row.appendChild(teachBlock(ex.sentence.t, ex.sentence.r, 'lg'));
  if (canSpeak()) row.appendChild(speakPair(ex.sentence.t));
  card.appendChild(row);
  card.appendChild(el('div', 'english', ex.sentence.e));
  box.appendChild(card);
  var stips = soundTips(ex.sentence.r);
  if (stips) box.appendChild(stips);
  if (ex.sentence.n) box.appendChild(el('p', 'ex-note', ex.sentence.n));
};

RENDERERS.letterIntro = function (ex, box) {
  var l = ex.letter;
  box.appendChild(el('div', 'ex-q', 'New letter'));
  var hero = el('div', 'letter-hero');
  var row = el('div', 'speak-row');
  row.appendChild(el('div', 'big', l.ch));
  if (canSpeak()) row.appendChild(speakPair(l.ch));
  hero.appendChild(row);
  hero.appendChild(el('div', 'lname', l.name + '  ·  ' + l.roman));
  hero.appendChild(el('div', 'lsound', l.sound));
  box.appendChild(hero);

  box.appendChild(formsGrid(l));
  box.appendChild(el('p', 'ex-note', l.connects === 'right'
    ? 'This letter never joins to the letter after it, so it has no start or middle form. A word simply breaks after it.'
    : 'The same letter, in the four places it can sit in a word.'));
};

function formsGrid(l) {
  var grid = el('div', 'forms');
  [['isolated', 'Alone'], ['initial', 'Start'], ['medial', 'Middle'], ['final', 'End']].forEach(function (pair) {
    var cell = el('div', 'form-cell' + (l[pair[0]] ? '' : ' none'));
    var g = el('div', 'fc-glyph', l[pair[0]] || '—');
    cell.appendChild(g);
    cell.appendChild(el('div', 'fc-lbl', pair[1]));
    grid.appendChild(cell);
  });
  return grid;
}

function optionList(ex, box, grid) {
  var wrap = el('div', 'options' + (grid ? ' grid' : ''));
  ex.options.forEach(function (opt, i) {
    var b = el('button', 'opt' + (opt.big ? ' big' : ''));
    var label = el('div', opt.script ? 'script md' : '', opt.label);
    if (opt.big) label.className = opt.script ? 'script' : '';
    b.appendChild(label);
    if (opt.roman && Store.settings().showRoman) b.appendChild(el('div', 'opt-roman', opt.roman));
    b.dataset.i = i;
    b.onclick = function () {
      if (LS.state !== 'answering') return;
      Sfx.tap();
      Array.prototype.forEach.call(wrap.children, function (c) { c.classList.remove('sel'); });
      b.classList.add('sel');
      LS.selection = i;
      var check = $('btn-check');
      check.disabled = false;
      check.className = 'big-btn green';
    };
    wrap.appendChild(b);
  });
  box.appendChild(wrap);
  return wrap;
}

RENDERERS.pickMeaning = function (ex, box) {
  box.appendChild(el('div', 'ex-q', ex.question));
  if (ex.note) box.appendChild(el('p', 'ex-note', ex.note));
  var card = el('div', 'prompt-card');
  var row = el('div', 'speak-row');
  if (ex.bigScript) {
    row.appendChild(el('div', 'script xl', ex.bigScript));
  } else {
    row.appendChild(scriptBlock(ex.word.t, ex.word.r, 'xl'));
  }
  if (canSpeak()) row.appendChild(speakButton(ex.bigScript || ex.word.t));
  card.appendChild(row);
  box.appendChild(card);
  optionList(ex, box, false);
};

RENDERERS.pickWord = function (ex, box) {
  box.appendChild(el('div', 'ex-q', ex.question));
  if (ex.note) box.appendChild(el('p', 'ex-note', ex.note));
  optionList(ex, box, true);
};

RENDERERS.listen = function (ex, box) {
  box.appendChild(el('div', 'ex-q', ex.question));
  var card = el('div', 'prompt-card');
  card.appendChild(speakButton(ex.speak));
  box.appendChild(card);
  optionList(ex, box, true);
};

RENDERERS.fill = function (ex, box) {
  box.appendChild(el('div', 'ex-q', ex.question));
  var card = el('div', 'prompt-card');
  var line = el('div', 'script lg');
  ex.tokens.forEach(function (tok, i) {
    if (i) line.appendChild(document.createTextNode(' '));
    line.appendChild(document.createTextNode(i === ex.gap ? ' ____ ' : tok));
  });
  card.appendChild(line);
  card.appendChild(el('div', 'english', ex.english));
  box.appendChild(card);
  optionList(ex, box, true);
};

RENDERERS.build = function (ex, box) {
  box.appendChild(el('div', 'ex-q', ex.question.replace('{lang}', course.name)));

  var card = el('div', 'prompt-card');
  var row = el('div', 'speak-row');
  if (ex.promptScript) {
    row.appendChild(scriptBlock(ex.prompt, ex.promptRoman, 'lg'));
    if (canSpeak()) row.appendChild(speakButton(ex.prompt));
  } else {
    row.appendChild(el('div', 'english', ex.prompt));
  }
  card.appendChild(row);
  box.appendChild(card);

  var rtl = ex.direction === 'target' && course.dir === 'rtl';
  var answer = el('div', 'answer-area' + (rtl ? ' rtl' : ''));
  var bank = el('div', 'bank' + (rtl ? ' rtl' : ''));
  box.appendChild(answer);
  box.appendChild(bank);

  LS.built = [];

  function refresh() {
    var check = $('btn-check');
    check.disabled = LS.built.length === 0;
    check.className = LS.built.length ? 'big-btn green' : 'big-btn grey';
  }

  ex.bank.forEach(function (word, i) {
    var t = el('button', 'tile' + (ex.direction === 'target' ? ' script' : ''), word);
    t.dataset.i = i;
    t.onclick = function () {
      if (LS.state !== 'answering' || t.classList.contains('used')) return;
      Sfx.tap();
      t.classList.add('used');
      var placed = el('button', 'tile' + (ex.direction === 'target' ? ' script' : ''), word);
      placed.onclick = function () {
        if (LS.state !== 'answering') return;
        t.classList.remove('used');
        answer.removeChild(placed);
        LS.built.splice(LS.built.indexOf(placed), 1);
        refresh();
      };
      answer.appendChild(placed);
      LS.built.push(placed);
      refresh();
    };
    bank.appendChild(t);
  });
  refresh();
};

RENDERERS.match = function (ex, box) {
  box.appendChild(el('div', 'ex-q', ex.question));
  var grid = el('div', 'match-grid');
  var left = el('div', 'match-col'), right = el('div', 'match-col');
  grid.appendChild(left); grid.appendChild(right);
  box.appendChild(grid);

  var state = { picked: null, remaining: ex.pairs.length, errors: 0 };
  LS.matchState = state;

  Lesson.shuffle(ex.pairs).forEach(function (p) {
    var b = el('button', 'opt');
    b.appendChild(el('div', 'script md', p.t));
    if (Store.settings().showRoman) b.appendChild(el('div', 'opt-roman', p.r));
    b.dataset.key = p.t;
    b.dataset.side = 'l';
    b.onclick = function () { tapPair(b, p.t); };
    left.appendChild(b);
  });
  Lesson.shuffle(ex.pairs).forEach(function (p) {
    var b = el('button', 'opt', p.e);
    b.dataset.key = p.t;
    b.dataset.side = 'r';
    b.onclick = function () { tapPair(b, p.t); };
    right.appendChild(b);
  });

  function tapPair(btn, key) {
    if (LS.state !== 'answering' || btn.classList.contains('gone')) return;
    Sfx.tap();
    if (!state.picked) {
      state.picked = { btn: btn, key: key };
      btn.classList.add('sel');
      return;
    }
    if (state.picked.btn === btn) {
      btn.classList.remove('sel');
      state.picked = null;
      return;
    }
    if (state.picked.btn.dataset.side === btn.dataset.side) {
      state.picked.btn.classList.remove('sel');
      state.picked = { btn: btn, key: key };
      btn.classList.add('sel');
      return;
    }
    var first = state.picked;
    state.picked = null;
    if (first.key === key) {
      first.btn.classList.remove('sel');
      first.btn.classList.add('right'); btn.classList.add('right');
      Store.recordAnswer(key, true, course.id);
      setTimeout(function () {
        first.btn.classList.add('gone'); btn.classList.add('gone');
      }, 220);
      if (--state.remaining === 0) {
        Sfx.right();
        setTimeout(function () { finishMatch(state); }, 420);
      }
    } else {
      state.errors++;
      Sfx.wrong(); buzz(30);
      first.btn.classList.remove('sel');
      first.btn.classList.add('wrong'); btn.classList.add('wrong');
      Store.recordAnswer(key, false, course.id);
      setTimeout(function () {
        first.btn.classList.remove('wrong'); btn.classList.remove('wrong');
      }, 450);
    }
  }
};

/* A matching grid counts as one exercise. Mis-taps inside it affect accuracy
   but are not treated as a wrong answer worth explaining — pairing the wrong
   two tiles is usually a slip of the thumb, not a misunderstanding. */
function finishMatch(state) {
  LS.answered++;
  if (state.errors === 0) LS.correct++; else LS.mistakes++;
  LS.index++;
  advance();
}

/* ------------------------------------------------------------- answering */

function checkAnswer() {
  var ex = currentEx();

  if (isIntro(ex)) {
    if (ex.item) Store.recordAnswer(ex.item, true, course.id);
    LS.index++;
    advance();
    return;
  }

  var correct, expected = '';

  var given = null;
  if (ex.type === 'build') {
    given = LS.built.map(function (t) { return t.textContent; });
    correct = given.length === ex.answer.length && given.every(function (w, i) { return w === ex.answer[i]; });
    expected = ex.answer.join(' ');
  } else {
    if (LS.selection === null) return;
    correct = !!ex.options[LS.selection].correct;
    ex.options.forEach(function (o) { if (o.correct) expected = o.label; });
  }

  LS.answered++;
  if (ex.item) Store.recordAnswer(ex.item, correct, course.id);

  if (correct) {
    LS.correct++;
    Sfx.right(); buzz(10);
  } else {
    LS.mistakes++;
    Sfx.wrong(); buzz(40);
    if (ex.item && LS.missed.indexOf(ex.item) < 0) LS.missed.push(ex.item);

    /* It comes back later in the lesson — but as a different kind of question.
       Re-showing the identical one teaches which tile to tap, not the word. */
    var again = Lesson.reask(course, ex, { canSpeak: canSpeak() }) || ex;
    LS.queue.push(again);
    LS.total = LS.queue.length;
  }

  markOptions(ex, correct);
  showFeedback(correct, expected, ex, chosenLabel(ex), given);
}

/* The label of whatever was actually tapped, so the explanation can name it. */
function chosenLabel(ex) {
  if (ex.type === 'build' || LS.selection === null) return null;
  var opt = ex.options && ex.options[LS.selection];
  return opt ? opt.label : null;
}

function markOptions(ex, correct) {
  var wrap = $('exercise').querySelector('.options');
  if (!wrap) return;
  Array.prototype.forEach.call(wrap.children, function (b, i) {
    b.classList.remove('sel');
    if (ex.options[i].correct) b.classList.add('right');
    else if (i === LS.selection && !correct) b.classList.add('wrong');
  });
}

function showFeedback(correct, expected, ex, chosen, given) {
  LS.state = 'reviewing';
  var footer = $('lesson-footer');
  footer.className = 'footer ' + (correct ? 'ok' : 'no');
  $('feedback').hidden = false;

  var body = $('fb-body');
  clear(body);

  if (correct) {
    $('fb-title').textContent = pickPraise();
    var note = (ex.word && ex.word.n) || (ex.sentence && ex.sentence.n);
    if (note) body.appendChild(el('div', 'fb-line note', note));
  } else {
    /* The whole point of the app: say what was wrong with what they chose,
       not merely what the right answer was. */
    var why = Explain.wrong({ course: course, ex: ex, chosenLabel: chosen, given: given || [] });
    $('fb-title').textContent = why.headline;

    var answer = el('div', 'fb-answer');
    answer.appendChild(el('span', 'fb-answer-lbl', 'Answer'));
    var needsScript = ex.type === 'build' ? ex.direction === 'target'
      : !!(ex.options && ex.options[0] && ex.options[0].script);
    answer.appendChild(el('span', needsScript ? 'script md' : '', expected));
    var wrongRoman = (ex.word && ex.word.r) || (ex.sentence && ex.sentence.r) || '';
    if (wrongRoman) answer.appendChild(el('span', 'pron sm', Pron.respell(wrongRoman)));
    body.appendChild(answer);

    why.lines.forEach(function (line) {
      body.appendChild(el('div', 'fb-line ' + line.kind, line.text));
    });
    body.appendChild(el('div', 'fb-line again', 'This one will come back later, asked a different way.'));
  }

  var check = $('btn-check');
  check.disabled = false;
  check.className = 'big-btn ' + (correct ? 'green' : 'red');
  check.textContent = 'Continue';

  /* A long explanation can push the board off-screen, so bring whatever was
     marked back into view above the panel. */
  if (!correct) {
    var marked = $('exercise').querySelector('.opt.right') || $('exercise').querySelector('.prompt-card');
    if (marked) setTimeout(function () { marked.scrollIntoView({ block: 'nearest' }); }, 30);
  }
}

var PRAISE = ['Correct', 'Nicely done', 'That is it', 'Yes', 'Exactly', 'Good'];
function pickPraise() { return PRAISE[Math.floor(Math.random() * PRAISE.length)]; }

function advance() {
  if (LS.index >= LS.queue.length) { finishLesson(); return; }
  renderExercise();
}

function onCheckButton() {
  if (!LS) return;
  if (LS.state === 'answering') { checkAnswer(); return; }
  LS.index++;
  advance();
}

/* Every lesson is finished; there is nothing to fail. The only question is how
   much of it needed a second look, and that is information rather than
   punishment. */
function finishLesson() {
  var secs = Math.round((Date.now() - LS.startedAt) / 1000);
  var accuracy = LS.answered ? Math.round(LS.correct / LS.answered * 100) : 100;
  var xp = LS.practice ? 5 : 10;
  if (LS.mistakes === 0) xp += 3;

  Store.addXp(xp, course.id);
  if (!LS.practice && LS.node) Store.completeLesson(LS.node.id, course.id);
  Sfx.finish();

  $('done-mark').textContent = '✦';
  $('done-mark').className = 'done-mark';
  $('done-title').textContent = LS.practice ? 'Practice complete' : 'Lesson complete';
  $('done-xp').textContent = '+' + xp;
  $('done-acc').textContent = accuracy + '%';
  $('done-time').textContent = Math.floor(secs / 60) + ':' + ('0' + (secs % 60)).slice(-2);

  var nw = $('done-newwords');
  clear(nw);
  if (LS.newItems.length) {
    nw.appendChild(el('p', 'hint', 'New this lesson'));
    var list = el('div', 'newwords');
    LS.newItems.forEach(function (t) { list.appendChild(el('span', 'newword script md', t)); });
    nw.appendChild(list);
  }
  /* What needed a second attempt is the useful part of the summary — it is
     also exactly what Practice will bring back first. */
  if (LS.missed.length) {
    nw.appendChild(el('p', 'hint', 'Needed a second look — Practice will bring these back'));
    var missed = el('div', 'newwords');
    LS.missed.forEach(function (key) {
      var label = key.indexOf('L:') === 0 ? key.slice(2) : key;
      missed.appendChild(el('span', 'newword script md missed', label));
    });
    nw.appendChild(missed);
  }
  $('btn-done-continue').textContent = 'Continue';
  showScreen('done');
}

function quitLesson() {
  if (!LS) { showScreen('tab'); return; }
  if (LS.answered > 0 && !confirm('Leave the lesson? Progress in it will be lost.')) return;
  LS = null;
  TTS.stop();
  showScreen('tab');
  renderPath();
}

/* ========================================================= PRACTICE SCREEN */

function renderPractice() {
  var due = Lesson.dueItems(course, Store.course(course.id), 10);
  var known = Store.knownItems(course.id);
  $('practice-note').textContent = known === 0
    ? 'Nothing learned yet. Finish a lesson on the Learn tab and it will show up here.'
    : due.length + ' of your ' + known + ' items are weakest right now. Anything you missed in a lesson comes back here first.';
  $('btn-practice').disabled = known === 0;

  var list = $('weaklist');
  clear(list);
  $('weak-empty').hidden = due.length > 0;
  due.slice(0, 8).forEach(function (d) {
    var li = el('li', 'wordrow');
    var txt = el('div', 'wr-text');
    if (d.kind === 'letter') {
      txt.appendChild(el('div', 'script md', d.letter.ch));
      txt.appendChild(el('div', 'wr-en', d.letter.name + ' · ' + d.letter.roman));
    } else {
      txt.appendChild(el('div', 'script md', d.word.t));
      txt.appendChild(el('div', 'wr-en', d.word.e));
    }
    li.appendChild(txt);
    li.appendChild(strengthBar(d.strength));
    list.appendChild(li);
  });

}

function strengthBar(n) {
  var bar = el('div', 'strength');
  for (var i = 0; i < 5; i++) bar.appendChild(el('i', i < n ? 'on' : ''));
  return bar;
}

/* ============================================================ WORDS SCREEN */

function renderWords() {
  var wrap = $('words-list');
  clear(wrap);
  var c = Store.course(course.id);
  var total = 0, met = 0;

  course.units.forEach(function (unit) {
    var rows = [];
    if (unit.kind === 'alphabet') {
      Array.prototype.forEach.call(unit.letters, function (ch) {
        var l = Alphabet.byChar(course.id, ch);
        if (!l) return;
        total++;
        var st = c.items['L:' + ch];
        if (st) met++;
        rows.push({ t: l.ch, e: l.name + ' · ' + l.roman, r: null, st: st, speak: l.ch });
      });
    } else {
      (unit.vocab || []).forEach(function (w) {
        total++;
        var st = c.items[w.t];
        if (st) met++;
        rows.push({ t: w.t, e: w.e, r: w.r, st: st, speak: w.t });
      });
    }
    if (!rows.length) return;
    var group = el('div', 'wordgroup');
    group.appendChild(el('h2', null, unit.title));
    rows.forEach(function (row) {
      var li = el('div', 'wordrow');
      if (canSpeak()) li.appendChild(speakButton(row.speak, true));
      var txt = el('div', 'wr-text');
      txt.appendChild(el('div', 'script md', row.t));
      if (row.r) txt.appendChild(el('div', 'pron sm', Pron.respell(row.r)));
      if (row.r && Store.settings().showRoman) txt.appendChild(el('div', 'roman', row.r));
      txt.appendChild(el('div', 'wr-en', row.e));
      li.appendChild(txt);
      li.appendChild(strengthBar(row.st ? row.st.strength : 0));
      li.style.opacity = row.st ? '1' : '.5';
      group.appendChild(li);
    });
    wrap.appendChild(group);
  });

  $('words-count').textContent = met + ' of ' + total + ' met';
}

/* ============================================================== NAVIGATION */

var currentTab = 'path';

function showScreen(which) {
  var tabs = ['path', 'practice', 'words'];
  $('screen-lesson').hidden = which !== 'lesson';
  $('screen-done').hidden = which !== 'done';
  var inTab = which === 'tab';
  tabs.forEach(function (t) { $('screen-' + t).hidden = !(inTab && t === currentTab); });
  $('tabs').hidden = !inTab;
  window.scrollTo(0, 0);
}

function goTab(name) {
  currentTab = name;
  if (name === 'path') renderPath();
  if (name === 'practice') renderPractice();
  if (name === 'words') renderWords();
  Array.prototype.forEach.call($('tabs').children, function (b) {
    b.classList.toggle('on', b.dataset.goto === name);
  });
  showScreen('tab');
}

/* ================================================================ SETTINGS */

function openCourseSheet() {
  var wrap = $('course-options');
  clear(wrap);
  Courses.ALL.forEach(function (c) {
    var prog = Store.courseProgress(c.id, Lesson.planCourse(c));
    var b = el('button', 'course-opt' + (c.id === course.id ? ' on' : ''));
    b.appendChild(el('div', 'co-native', c.native));
    var txt = el('div');
    txt.appendChild(el('div', 'co-name', c.name));
    txt.appendChild(el('div', 'co-sub', c.blurb));
    txt.appendChild(el('div', 'co-sub', prog.done + '/' + prog.total + ' lessons · ' + prog.xp + ' XP'));
    b.appendChild(txt);
    b.onclick = function () {
      $('sheet-course').hidden = true;
      setCourse(c.id);
      goTab('path');
    };
    wrap.appendChild(b);
  });
  $('sheet-course').hidden = false;
}

function openSettings() {
  var s = Store.settings();
  $('opt-roman').checked = s.showRoman;
  $('opt-listen').checked = s.listening;
  $('opt-sound').checked = s.sound;
  $('opt-haptics').checked = s.haptics;
  $('opt-goal').value = String(s.dailyGoal);
  $('opt-rate').value = String(s.speakRate);

  var voice = TTS.describe(course.speech);
  $('voice-note').textContent = voice
    ? 'Using ' + voice + ' — the phone\'s own voice. Nothing is downloaded or sent anywhere.'
    : 'No ' + course.name + ' voice is installed on this phone, so listening exercises are switched off. ' +
      'Android: Settings → General management → Text-to-speech → install the language.';
  $('opt-listen').disabled = !voice;

  $('settings-note').textContent = 'Lisan · ' + Courses.ALL.length + ' courses · ' +
    'everything stored on this device only';
  $('sheet-settings').hidden = false;
}

function bindSettings() {
  on($('btn-settings-close'), 'click', function () { $('sheet-settings').hidden = true; });
  on($('sheet-settings'), 'click', function (e) { if (e.target === this) this.hidden = true; });
  on($('btn-course'), 'click', openCourseSheet);
  on($('btn-course-close'), 'click', function () { $('sheet-course').hidden = true; });
  on($('sheet-course'), 'click', function (e) { if (e.target === this) this.hidden = true; });

  on($('opt-roman'), 'change', function () { Store.setSetting('showRoman', this.checked); renderWords(); });
  on($('opt-listen'), 'change', function () { Store.setSetting('listening', this.checked); });
  on($('opt-sound'), 'change', function () { Store.setSetting('sound', this.checked); });
  on($('opt-haptics'), 'change', function () { Store.setSetting('haptics', this.checked); });
  on($('opt-goal'), 'change', function () { Store.setSetting('dailyGoal', +this.value); renderHeader(); });
  on($('opt-rate'), 'change', function () {
    Store.setSetting('speakRate', +this.value);
    say(course.id === 'ur' ? 'شکریہ' : 'شُكْراً');
  });

  on($('btn-export'), 'click', function () {
    var blob = new Blob([Store.exportAll()], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lisan-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  });
  on($('btn-reset'), 'click', function () {
    if (!confirm('Delete all progress in every course on this device? This cannot be undone.')) return;
    Store.resetAll();
    location.reload();
  });
}


/* ==================================================== install and updates */

/* Two jobs share one strip above the tab bar: offering the home-screen
   install, and saying when a newer build has arrived. */
function showBanner(text, action, fn) {
  $('banner-text').textContent = text;
  var act = $('banner-act');
  act.textContent = action;
  act.onclick = fn;
  $('banner').hidden = false;
}
function hideBanner() { $('banner').hidden = true; }

function setupInstallAndUpdates() {
  on($('banner-x'), 'click', hideBanner);

  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    /* Holding onto the event lets the offer live inside the app rather than
       buried in the browser's menu, which is where people miss it. */
    e.preventDefault();
    deferred = e;
    showBanner('Install Lisan for an icon, fullscreen and offline lessons.', 'Install', function () {
      hideBanner();
      deferred.prompt();
      deferred.userChoice.then(function () { deferred = null; });
    });
  });
  window.addEventListener('appinstalled', function () {
    deferred = null;
    hideBanner();
  });

  if (!('serviceWorker' in navigator)) return;

  /* A page that was already controlled and then gets a new controller means a
     new build took over — the first install also fires this, hence the guard.
     Reloading mid-lesson would throw the lesson away, so that one waits. */
  var wasControlled = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (!wasControlled) return;
    if (LS) showBanner('A new version is ready.', 'Reload', function () { location.reload(); });
    else location.reload();
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState !== 'visible') return;
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (reg) reg.update();
    }).catch(function () {});
  });
}

/* ==================================================================== init */

function init() {
  setCourse(Store.settings().course);
  bindSettings();
  setupInstallAndUpdates();

  $('tabs').addEventListener('click', function (e) {
    var b = e.target.closest('[data-goto]');
    if (b) goTab(b.dataset.goto);
  });
  on($('btn-settings'), 'click', openSettings);
  on($('btn-check'), 'click', onCheckButton);
  on($('btn-quit'), 'click', quitLesson);
  on($('btn-practice'), 'click', function () { startLesson(null, true); });
  on($('btn-done-continue'), 'click', function () {
    LS = null;
    goTab('path');
  });

  goTab('path');

  /* Voices arrive asynchronously on Android; once they do, listening
     exercises become possible and the settings copy needs to change. */
  TTS.onReady(function () {
    if ($('sheet-settings').hidden === false) openSettings();
  });

  var problems = Courses.verify();
  if (problems.length) console.error('Course problems:', problems);

  /* The streak rolls over at midnight, so a page left open overnight would
     otherwise show yesterday's numbers. */
  setInterval(function () {
    if (!$('screen-path').hidden) renderHeader();
  }, 60000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
