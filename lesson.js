/* Lisan — lesson construction.
 *
 * Content is written once as words and sentences; every exercise is generated
 * from it. That way adding a word automatically adds it to the multiple choice,
 * the listening drill, the matching pairs and the word banks, instead of
 * needing eight hand-written variants that then drift apart.
 *
 * The generator has one rule that matters pedagogically: wrong answers are
 * drawn from the same unit wherever possible. A choice between "bread" and
 * three random words is answerable by elimination; a choice between "bread",
 * "rice", "meat" and "fish" actually requires knowing the word.
 */
var Lesson = (function () {
'use strict';

var WORDS_PER_LESSON = 5;

function shuffle(a) {
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
function sample(a, n) { return shuffle(a).slice(0, n); }
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

/* ------------------------------------------------------------- lesson plan */

/* Splits a unit into the lessons shown as nodes on the path. */
function planUnit(course, unit) {
  var out = [];
  if (unit.kind === 'alphabet') {
    var letters = Array.prototype.map.call(unit.letters, function (ch) {
      return Alphabet.byChar(course.id, ch);
    }).filter(Boolean);
    var half = Math.ceil(letters.length / 2);
    out.push({ kind: 'letters', letters: letters.slice(0, half), title: 'Letters 1' });
    out.push({ kind: 'letters', letters: letters.slice(half), title: 'Letters 2' });
    out.push({ kind: 'letter-review', letters: letters, title: 'Joining up' });
    return out;
  }
  var vocab = unit.vocab || [];
  for (var i = 0; i < vocab.length; i += WORDS_PER_LESSON) {
    out.push({
      kind: 'words',
      words: vocab.slice(i, i + WORDS_PER_LESSON),
      earlier: vocab.slice(0, i),
      title: 'Words ' + (out.length + 1)
    });
  }
  if (unit.sentences && unit.sentences.length) {
    out.push({ kind: 'sentences', sentences: unit.sentences, words: vocab, title: 'Sentences' });
  }
  return out;
}

/* Every lesson in a course, flattened, in the order they unlock. */
function planCourse(course) {
  var out = [];
  course.units.forEach(function (unit) {
    planUnit(course, unit).forEach(function (spec, i) {
      out.push({
        id: unit.id + '-' + i,
        unitId: unit.id,
        unitTitle: unit.title,
        index: i,
        spec: spec,
        title: spec.title
      });
    });
  });
  return out;
}

/* --------------------------------------------------------- exercise makers */

function distractors(pool, answer, n, key) {
  var seen = {}, out = [];
  seen[answer[key]] = true;
  shuffle(pool).forEach(function (item) {
    if (out.length >= n) return;
    if (seen[item[key]]) return;
    seen[item[key]] = true;
    out.push(item);
  });
  return out;
}

/* Target word shown, choose the English. */
function exPickMeaning(word, pool) {
  var wrong = distractors(pool, word, 3, 'e');
  var options = shuffle([word].concat(wrong));
  return {
    type: 'pickMeaning', item: word.t, word: word,
    question: 'What does this mean?',
    options: options.map(function (o) { return { label: o.e, correct: o === word }; })
  };
}

/* English shown, choose the target word. */
function exPickWord(word, pool) {
  var wrong = distractors(pool, word, 3, 't');
  var options = shuffle([word].concat(wrong));
  return {
    type: 'pickWord', item: word.t, word: word,
    question: 'Which one is “' + word.e + '”?',
    options: options.map(function (o) { return { label: o.t, roman: o.r, script: true, correct: o === word }; })
  };
}

/* Heard, not seen. Only generated when a voice for the language exists. */
function exListen(word, pool) {
  var wrong = distractors(pool, word, 3, 't');
  var options = shuffle([word].concat(wrong));
  return {
    type: 'listen', item: word.t, word: word,
    question: 'Tap what you hear',
    speak: word.t,
    options: options.map(function (o) { return { label: o.t, roman: o.r, script: true, correct: o === word }; })
  };
}

function exMatch(words) {
  var chosen = sample(words, Math.min(5, words.length));
  return {
    type: 'match',
    question: 'Tap the matching pairs',
    pairs: chosen.map(function (w) { return { t: w.t, e: w.e, r: w.r }; }),
    items: chosen.map(function (w) { return w.t; })
  };
}

/* Build the target sentence from a bank of word tiles. */
function exBuildTarget(sentence, pool) {
  var answer = sentence.t.split(' ').filter(Boolean);
  var extra = sample(pool.filter(function (w) {
    return answer.indexOf(w.t) < 0 && w.t.indexOf(' ') < 0;
  }), Math.min(3, Math.max(2, 5 - answer.length)));
  return {
    type: 'build', direction: 'target', item: sentence.t, sentence: sentence,
    question: 'Write this in ' + '{lang}',
    prompt: sentence.e,
    answer: answer,
    bank: shuffle(answer.concat(extra.map(function (w) { return w.t; })))
  };
}

/* And the other way: target sentence shown, build the English. */
function exBuildEnglish(sentence, pool) {
  var answer = sentence.e.split(' ').filter(Boolean);
  var extraPool = [];
  pool.forEach(function (w) {
    w.e.split(' ').forEach(function (tok) {
      if (answer.indexOf(tok) < 0) extraPool.push(tok);
    });
  });
  var extra = sample(extraPool, Math.min(3, Math.max(2, 6 - answer.length)));
  return {
    type: 'build', direction: 'english', item: sentence.t, sentence: sentence,
    question: 'Write this in English',
    prompt: sentence.t, promptRoman: sentence.r, promptScript: true,
    speak: sentence.t,
    answer: answer,
    bank: shuffle(answer.concat(extra))
  };
}

/* One word removed from the sentence; choose the one that belongs. */
function exFillBlank(sentence, pool) {
  var tokens = sentence.t.split(' ').filter(Boolean);
  var candidates = [];
  tokens.forEach(function (tok, i) {
    if (tok === '؟' || tok === '?' || tok === ',') return;
    candidates.push(i);
  });
  if (!candidates.length) return null;
  var gap = pick(candidates);
  var answerWord = tokens[gap];
  var wrong = sample(pool.filter(function (w) {
    return w.t !== answerWord && w.t.indexOf(' ') < 0;
  }), 3).map(function (w) { return w.t; });
  var options = shuffle([answerWord].concat(wrong));
  return {
    type: 'fill', item: sentence.t, sentence: sentence,
    question: 'Fill the gap',
    tokens: tokens, gap: gap,
    english: sentence.e,
    options: options.map(function (o) { return { label: o, script: true, correct: o === answerWord }; })
  };
}


/* Say it out loud. The only exercise that asks you to produce the language
   rather than recognise it, which is the part that actually transfers to
   speaking to a person. */
function exSpeak(subject, isSentence) {
  var ex = {
    type: 'speak',
    item: subject.t,
    question: 'Say this out loud',
    speak: subject.t
  };
  if (isSentence) ex.sentence = subject; else ex.word = subject;
  return ex;
}

/* ------------------------------------------------------- alphabet makers */

function exLetterIntro(letter) {
  return { type: 'letterIntro', item: 'L:' + letter.ch, letter: letter, speak: letter.ch };
}

function exLetterSound(letter, pool) {
  var wrong = distractors(pool, letter, 3, 'roman');
  var options = shuffle([letter].concat(wrong));
  return {
    type: 'pickMeaning', item: 'L:' + letter.ch, letter: letter,
    question: 'Which sound is this letter?',
    bigScript: letter.ch,
    options: options.map(function (o) {
      return { label: o.roman + '  ·  ' + o.name, correct: o === letter };
    })
  };
}

function exLetterShape(letter, pool) {
  var wrong = distractors(pool, letter, 3, 'ch');
  var options = shuffle([letter].concat(wrong));
  return {
    type: 'pickWord', item: 'L:' + letter.ch, letter: letter,
    question: 'Which letter makes the sound “' + letter.roman + '”?',
    options: options.map(function (o) { return { label: o.ch, script: true, big: true, correct: o === letter }; })
  };
}

/* The form exercise is the one that actually teaches cursive: given a letter,
   recognise it in the middle of a word rather than standing alone. */
function exLetterForm(letter, pool) {
  var which = letter.connects === 'right' ? 'final' : pick(['initial', 'medial', 'final']);
  var shown = letter[which];
  if (!shown) return null;
  var wrong = distractors(pool.filter(function (l) { return l[which]; }), letter, 3, 'ch');
  if (wrong.length < 3) return null;
  var options = shuffle([letter].concat(wrong));
  var label = which === 'initial' ? 'at the start of a word'
            : which === 'medial' ? 'in the middle of a word' : 'at the end of a word';
  return {
    type: 'pickWord', item: 'L:' + letter.ch, letter: letter,
    question: 'Which of these is ' + letter.ch + ' ' + label + '?',
    note: 'Both scripts are cursive — letters change shape depending on where they sit.',
    options: options.map(function (o) {
      return { label: o[which], script: true, big: true, correct: o === letter };
    })
  };
}

function exLetterListen(letter, pool) {
  var wrong = distractors(pool, letter, 3, 'ch');
  var options = shuffle([letter].concat(wrong));
  return {
    type: 'listen', item: 'L:' + letter.ch, letter: letter,
    question: 'Tap the letter you hear',
    speak: letter.ch,
    options: options.map(function (o) { return { label: o.ch, script: true, big: true, correct: o === letter }; })
  };
}

/* ----------------------------------------------------------- the assembler */

function buildExercises(course, spec, opts) {
  opts = opts || {};
  var canSpeak = !!opts.canSpeak;
  var out = [];
  var pool = Courses.allVocab(course);

  if (spec.kind === 'letters' || spec.kind === 'letter-review') {
    var letters = spec.letters;
    var allLetters = Alphabet.get(course.id);
    if (spec.kind === 'letters') {
      letters.forEach(function (l) { out.push(exLetterIntro(l)); });
    }
    letters.forEach(function (l) {
      out.push(exLetterSound(l, allLetters));
      out.push(exLetterShape(l, allLetters));
    });
    letters.forEach(function (l) {
      var form = exLetterForm(l, allLetters);
      if (form) out.push(form);
    });
    if (canSpeak) {
      sample(letters, Math.min(3, letters.length)).forEach(function (l) {
        out.push(exLetterListen(l, allLetters));
      });
    }
    /* Keep the introductions in order at the front; shuffle only the drills. */
    var intros = out.filter(function (e) { return e.type === 'letterIntro'; });
    var drills = shuffle(out.filter(function (e) { return e.type !== 'letterIntro'; }));
    return intros.concat(drills).slice(0, spec.kind === 'letters' ? 18 : 16);
  }

  if (spec.kind === 'words') {
    var words = spec.words;
    var unitPool = words.concat(spec.earlier || []);
    /* Fall back to the whole course when the unit is too small to supply
       three plausible wrong answers. */
    var near = unitPool.length >= 4 ? unitPool : pool;

    words.forEach(function (w) {
      out.push({ type: 'wordIntro', item: w.t, word: w, speak: w.t });
    });
    words.forEach(function (w) {
      out.push(exPickMeaning(w, near));
      out.push(exPickWord(w, near));
      if (canSpeak) out.push(exListen(w, near));
    });
    if (words.length >= 3) out.push(exMatch(words.concat(sample(spec.earlier || [], 2))));
    /* Two per lesson rather than one per word: speaking aloud is slow, needs a
       quiet moment, and becomes tedious long before it stops being useful. */
    if (opts.speaking) {
      sample(words, Math.min(2, words.length)).forEach(function (w) { out.push(exSpeak(w, false)); });
    }
    /* Recycle two words from earlier in the unit so nothing is learned once
       and abandoned. */
    sample(spec.earlier || [], 2).forEach(function (w) {
      out.push(exPickMeaning(w, near));
    });

    var intros2 = out.filter(function (e) { return e.type === 'wordIntro'; });
    var drills2 = shuffle(out.filter(function (e) { return e.type !== 'wordIntro'; }));
    /* Interleave: introduce a word, then drill, rather than five introductions
       in a row followed by fifteen questions. */
    var mixed = [];
    intros2.forEach(function (intro, i) {
      mixed.push(intro);
      mixed.push.apply(mixed, drills2.splice(0, i === 0 ? 1 : 2));
    });
    return mixed.concat(drills2).slice(0, 18);
  }

  if (spec.kind === 'sentences') {
    var sents = spec.sentences, wordPool = spec.words || pool;
    sents.forEach(function (s) {
      out.push({ type: 'sentenceIntro', item: s.t, sentence: s, speak: s.t });
      out.push(exBuildEnglish(s, wordPool));
      out.push(exBuildTarget(s, wordPool));
      var fill = exFillBlank(s, wordPool);
      if (fill) out.push(fill);
      if (opts.speaking) out.push(exSpeak(s, true));
    });
    var intros3 = [], rest = [];
    out.forEach(function (e) { (e.type === 'sentenceIntro' ? intros3 : rest).push(e); });
    /* Each sentence is introduced immediately before its own exercises. */
    var bySentence = {};
    rest.forEach(function (e) {
      (bySentence[e.item] = bySentence[e.item] || []).push(e);
    });
    var seq = [];
    intros3.forEach(function (intro) {
      seq.push(intro);
      seq.push.apply(seq, shuffle(bySentence[intro.item] || []));
    });
    return seq.slice(0, 20);
  }

  return out;
}


/* ------------------------------------------------------------ re-asking */

/* When an answer is wrong the item comes back later in the lesson — but as a
   *different kind* of question, not the same one again.
 *
 * Re-showing the identical question with the identical options teaches the
 * position of the correct tile, which is the exact opposite of the point. A
 * word missed on "what does this mean?" comes back as "which one is X?", which
 * cannot be answered from a memory of where the right answer sat.
 */
function reask(course, ex, opts) {
  opts = opts || {};
  var pool = Courses.allVocab(course);
  var letters = Alphabet.get(course.id);

  if (ex.letter) {
    var makers = [
      function (l) { return exLetterSound(l, letters); },
      function (l) { return exLetterShape(l, letters); },
      function (l) { return exLetterForm(l, letters); }
    ];
    if (opts.canSpeak) makers.push(function (l) { return exLetterListen(l, letters); });
    return pickDifferent(makers, ex.letter, ex);
  }

  if (ex.word) {
    /* A word you could not say comes back to be said again, not turned into a
       multiple choice — the point was the mouth, not the recognition. */
    if (ex.type === 'speak') return exSpeak(ex.word, false);
    var wordMakers = [
      function (w) { return exPickMeaning(w, pool); },
      function (w) { return exPickWord(w, pool); }
    ];
    if (opts.canSpeak) wordMakers.push(function (w) { return exListen(w, pool); });
    return pickDifferent(wordMakers, ex.word, ex);
  }

  if (ex.sentence) {
    if (ex.type === 'speak') return exSpeak(ex.sentence, true);
    var sentMakers = [
      function (sn) { return exBuildTarget(sn, pool); },
      function (sn) { return exBuildEnglish(sn, pool); },
      function (sn) { return exFillBlank(sn, pool); }
    ];
    return pickDifferent(sentMakers, ex.sentence, ex);
  }
  return null;
}

/* Try the makers in a random order and take the first that produces something
   genuinely different from what was just asked. */
function pickDifferent(makers, subject, previous) {
  var order = shuffle(makers);
  for (var i = 0; i < order.length; i++) {
    var made = null;
    try { made = order[i](subject); } catch (e) { made = null; }
    if (!made) continue;
    if (made.type === previous.type && made.question === previous.question) continue;
    return made;
  }
  /* Nothing else was possible — reshuffle the original rather than showing the
     options in the order they were just memorised in. */
  if (previous.options) {
    var copy = {};
    for (var k in previous) copy[k] = previous[k];
    copy.options = shuffle(previous.options);
    return copy;
  }
  return null;
}

/* ------------------------------------------------------------------- SRS */

/* A practice lesson built from whatever is weakest or most overdue. Simple
   spaced repetition: each correct answer pushes the next review further out,
   each wrong one drops the item back to the start. */
var INTERVALS = [0, 4 * 3600e3, 24 * 3600e3, 3 * 24 * 3600e3, 7 * 24 * 3600e3, 21 * 24 * 3600e3];

function nextDue(strength) {
  return Date.now() + INTERVALS[Math.max(0, Math.min(INTERVALS.length - 1, strength))];
}

function dueItems(course, progress, limit) {
  var now = Date.now();
  var pool = Courses.allVocab(course);
  var letters = Alphabet.get(course.id);
  var scored = [];

  pool.forEach(function (w) {
    var s = progress.items[w.t];
    if (!s) return;
    scored.push({ kind: 'word', word: w, key: w.t, overdue: now - (s.due || 0), strength: s.strength || 0 });
  });
  letters.forEach(function (l) {
    var s = progress.items['L:' + l.ch];
    if (!s) return;
    scored.push({ kind: 'letter', letter: l, key: 'L:' + l.ch, overdue: now - (s.due || 0), strength: s.strength || 0 });
  });

  scored.sort(function (a, b) {
    /* Weakest first, then most overdue. */
    if (a.strength !== b.strength) return a.strength - b.strength;
    return b.overdue - a.overdue;
  });
  return scored.slice(0, limit || 10);
}

function buildPractice(course, progress, opts) {
  opts = opts || {};
  var items = dueItems(course, progress, 10);
  if (!items.length) return [];
  var pool = Courses.allVocab(course);
  var letters = Alphabet.get(course.id);
  var out = [];
  items.forEach(function (it) {
    if (it.kind === 'letter') {
      out.push(exLetterSound(it.letter, letters));
      out.push(exLetterShape(it.letter, letters));
    } else {
      out.push(exPickMeaning(it.word, pool));
      out.push(exPickWord(it.word, pool));
      if (opts.canSpeak && Math.random() < 0.4) out.push(exListen(it.word, pool));
      if (opts.speaking && Math.random() < 0.3) out.push(exSpeak(it.word, false));
    }
  });
  return shuffle(out).slice(0, 16);
}

return {
  planUnit: planUnit, planCourse: planCourse, buildExercises: buildExercises, reask: reask,
  buildPractice: buildPractice, exSpeak: exSpeak, dueItems: dueItems, nextDue: nextDue,
  shuffle: shuffle, sample: sample, WORDS_PER_LESSON: WORDS_PER_LESSON
};
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Lesson;
