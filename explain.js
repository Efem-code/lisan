/* Lisan — why that was wrong.
 *
 * Showing the right answer teaches almost nothing: next time round you
 * recognise the shape of the correct tile rather than knowing the word. What
 * actually moves someone forward is being told what the thing they picked
 * *was*, and what separates the two.
 *
 * So every wrong answer gets three things, where they exist:
 *
 *   1. what you chose, and what it actually means
 *   2. the discriminating feature — the dots, the one letter, the word order
 *   3. the right answer, written so you can pronounce it
 *
 * Everything here is derived from the course data rather than hand-written per
 * question, so it cannot fall out of step with the content, and every word in
 * the app gets the same quality of explanation.
 */
var Explain = (function () {
'use strict';

/* What tends to go wrong with word order, per language. Used when someone
   builds a sentence out of the right words in the wrong order. */
var WORD_ORDER = {
  ar: 'Arabic puts the adjective after the noun — البَيْتُ كَبير is literally ' +
      '"the house big" — and there is no word for "is" in the present tense.',
  ur: 'Urdu puts the verb at the very end, after everything else — ' +
      'میں چائے پیتا ہوں is literally "I tea drink".'
};

var SEP = '|~|';

/* Explanations are English sentences with Arabic or Urdu words embedded in
   them. Without isolation the bidi algorithm takes its cue from the first
   strong character, so a sentence that happens to start with a target-script
   word renders the entire English half backwards, and punctuation next to a
   script run lands on the wrong side. FSI...PDI marks each run as a
   self-contained island, which fixes both regardless of CSS. */
var FSI = '\u2068', PDI = '\u2069';
function iso(text) { return FSI + text + PDI; }

function lookups(course) {
  var byTarget = {}, byEnglish = {};
  course.units.forEach(function (u) {
    (u.vocab || []).forEach(function (w) {
      byTarget[w.t] = w;
      (byEnglish[w.e] = byEnglish[w.e] || []).push(w);
    });
    (u.sentences || []).forEach(function (sn) {
      byTarget[sn.t] = sn;
      (byEnglish[sn.e] = byEnglish[sn.e] || []).push(sn);
    });
  });
  return { byTarget: byTarget, byEnglish: byEnglish };
}

/* Two words differing by a single letter are the commonest source of a wrong
   tap, and pointing straight at the letter fixes it faster than any amount of
   repetition. */
function singleLetterDiff(a, b) {
  if (!a || !b || a.length !== b.length) return null;
  var at = -1, n = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) { n++; at = i; }
  }
  return n === 1 ? { index: at, mine: b[at], theirs: a[at] } : null;
}

function say(roman) {
  var r = (typeof Pron !== 'undefined' && roman) ? Pron.respell(roman) : '';
  return r ? ' (' + r + ')' : '';
}

/* ------------------------------------------------------------- the letters */

function explainLetters(courseId, chosen, correct) {
  var lines = [];
  lines.push({
    kind: 'chose',
    text: 'You picked ' + iso(chosen.ch) + ' — that is ' + chosen.name +
          ', the letter for the sound "' + chosen.roman + '".'
  });

  if (chosen.family && chosen.family === correct.family) {
    lines.push({
      kind: 'key',
      text: 'These two are the same skeleton. The dots are the entire difference: ' +
            iso(correct.ch) + ' has ' + correct.mark + ', ' + iso(chosen.ch) + ' has ' + chosen.mark + '.'
    });
    var rest = Alphabet.family(courseId, correct.ch).filter(function (l) { return l.ch !== chosen.ch; });
    if (rest.length) {
      lines.push({
        kind: 'note',
        text: 'The rest of the family: ' + rest.map(function (l) {
          return iso(l.ch) + ' = ' + l.roman + ', ' + l.mark;
        }).join('; ') + '.'
      });
    }
  } else {
    lines.push({
      kind: 'key',
      text: iso(correct.ch) + ' is ' + correct.name + ' — ' + correct.mark + '. ' + correct.sound
    });
  }
  return lines;
}

/* ---------------------------------------------------------------- the words */

function explainWords(course, chosenWord, correctWord, chosenLabel) {
  var lines = [];

  if (chosenWord) {
    lines.push({
      kind: 'chose',
      text: 'You picked ' + iso(chosenWord.t) + say(chosenWord.r) + ' — that means "' + chosenWord.e + '".'
    });
  } else if (chosenLabel) {
    lines.push({ kind: 'chose', text: 'You picked "' + chosenLabel + '".' });
  }

  if (correctWord) {
    lines.push({
      kind: 'key',
      text: iso(correctWord.t) + say(correctWord.r) + ' is the one that means "' + correctWord.e + '".'
    });
  }

  if (chosenWord && correctWord) {
    var d = singleLetterDiff(chosenWord.t, correctWord.t);
    if (d) {
      var mine = Alphabet.byChar(course.id, d.mine);
      var theirs = Alphabet.byChar(course.id, d.theirs);
      var text = 'These two differ by one letter only: ' + iso(correctWord.t) + ' has ' + iso(d.theirs) +
                 (theirs ? ' (' + theirs.roman + ')' : '') + ' where ' + iso(chosenWord.t) + ' has ' +
                 iso(d.mine) + (mine ? ' (' + mine.roman + ')' : '') + '.';
      if (mine && theirs && mine.family && mine.family === theirs.family) {
        text += ' Same shape, different dots — ' + theirs.mark + ' against ' + mine.mark + '.';
      }
      lines.push({ kind: 'note', text: text });
    }
  }
  if (correctWord && correctWord.n) lines.push({ kind: 'note', text: correctWord.n });
  return lines;
}

/* ------------------------------------------------------------ the sentences */

/* A built sentence is compared word by word, because "right words, wrong
   order" and "you used the wrong word" are completely different mistakes and
   need completely different advice. */
function explainBuild(course, ex, given) {
  var lines = [];
  var answer = ex.answer || [];
  var sortedA = answer.slice().sort().join(SEP);
  var sortedG = given.slice().sort().join(SEP);

  if (sortedA === sortedG) {
    lines.push({ kind: 'chose', text: 'Every word was right — only the order was wrong.' });
    lines.push({
      kind: 'key',
      text: (ex.direction === 'target' && WORD_ORDER[course.id])
        ? WORD_ORDER[course.id]
        : 'Read the answer back and notice where each word sits relative to the others.'
    });
    return lines;
  }

  var L = lookups(course);
  var missing = answer.filter(function (w) { return given.indexOf(w) < 0; });
  var extra = given.filter(function (w) { return answer.indexOf(w) < 0; });

  extra.forEach(function (w) {
    var word = L.byTarget[w];
    lines.push({
      kind: 'chose',
      text: word
        ? iso(w) + say(word.r) + ' does not belong here — it means "' + word.e + '".'
        : '"' + iso(w) + '" does not belong in this sentence.'
    });
  });
  missing.forEach(function (w) {
    var word = L.byTarget[w];
    lines.push({
      kind: 'key',
      text: word
        ? 'You left out ' + iso(w) + say(word.r) + ' — "' + word.e + '".'
        : 'You left out "' + iso(w) + '".'
    });
  });
  if (ex.sentence && ex.sentence.n) lines.push({ kind: 'note', text: ex.sentence.n });
  return lines;
}

/* --------------------------------------------------------------- the entry */

/* Find the letter a chosen label refers to, whichever form it was shown in. */
function letterFromLabel(courseId, label) {
  if (!label) return null;
  var letters = Alphabet.get(courseId), found = null;
  letters.forEach(function (l) {
    if (found) return;
    if (label === l.ch || label === l.isolated || label === l.initial ||
        label === l.medial || label === l.final) found = l;
    else if (label.indexOf(l.roman + '  ·  ' + l.name) === 0) found = l;
  });
  return found;
}

/* ctx: { course, ex, chosenLabel, given }
   Returns { headline, lines } where each line is { kind, text } and kind is
   one of chose | key | note. */
function wrong(ctx) {
  var course = ctx.course, ex = ctx.ex;

  if (ex.type === 'build') {
    var lines = explainBuild(course, ex, ctx.given || []);
    var orderOnly = lines.length && lines[0].text.indexOf('only the order') >= 0;
    return { headline: orderOnly ? 'Right words, wrong order' : 'Not quite', lines: lines };
  }

  if (ex.letter) {
    var chosen = letterFromLabel(course.id, ctx.chosenLabel);
    if (chosen && chosen.ch === ex.letter.ch) {
      /* The right letter, but in the wrong position — a different mistake, and
         one worth naming, because it means the joining has not landed yet. */
      var l = ex.letter;
      return {
        headline: 'Right letter, wrong form',
        lines: [{
          kind: 'key',
          text: 'That is ' + iso(l.ch) + ', but not in the position asked for. Alone it is ' +
                iso(l.isolated) + (l.initial ? '; at the start ' + iso(l.initial) : '') +
                (l.medial ? '; in the middle ' + iso(l.medial) : '') +
                '; at the end ' + iso(l.final) + '.'
        }]
      };
    }
    if (chosen) return { headline: 'Not quite', lines: explainLetters(course.id, chosen, ex.letter) };
    return {
      headline: 'Not quite',
      lines: [{ kind: 'key', text: iso(ex.letter.ch) + ' is ' + ex.letter.name + ' — ' + ex.letter.sound }]
    };
  }

  var L = lookups(course);
  var correctWord = ex.word || ex.sentence || null;
  var chosenWord = L.byTarget[ctx.chosenLabel] || null;
  if (!chosenWord && ctx.chosenLabel) {
    var byEn = L.byEnglish[ctx.chosenLabel];
    if (byEn && byEn.length) chosenWord = byEn[0];
  }
  return { headline: 'Not quite', lines: explainWords(course, chosenWord, correctWord, ctx.chosenLabel) };
}

return { wrong: wrong, iso: iso, WORD_ORDER: WORD_ORDER, singleLetterDiff: singleLetterDiff, lookups: lookups };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Explain;
