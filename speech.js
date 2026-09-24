/* Lisan — speaking practice.
 *
 * Two ways to practise saying a word, because they have very different costs.
 *
 * SCORED uses the browser's SpeechRecognition. On Android this is not done on
 * the device: Chrome streams the audio to Google's servers and sends back a
 * transcript. That means it needs a connection, and it means your voice leaves
 * the phone — the only thing in this app that does. It is therefore off until
 * you switch it on, and the settings screen says plainly what it does.
 *
 * COMPARE uses MediaRecorder, which is entirely local. It records you, plays
 * the model, then plays you back. No scoring, nothing uploaded, works in
 * aeroplane mode. It is what a singer or a language teacher would actually have
 * you do, and it is the fallback whenever scoring is unavailable.
 */
var Speech = (function () {
'use strict';

var SR = (typeof window !== 'undefined') &&
         (window.SpeechRecognition || window.webkitSpeechRecognition);

function canScore() { return !!SR; }
function canRecord() {
  return typeof MediaRecorder !== 'undefined' &&
         !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

/* The best recognition tag for a course, preferring its own list. */
function langFor(course) {
  return (course.speech && course.speech[0]) || 'en-US';
}

/* ------------------------------------------------------------ normalising */

var COMBINING = /[̀-ͯ]/g;              /* Latin accents, after NFD */
var ARABIC_MARKS = /[ً-ٰٟـ]/g; /* harakat, sukun, tatweel */
var PUNCT = /[.,;:!?"'()\[\]«»¿¡،؛؟。，…\-]/g;

/* Recognition never returns the vowel marks that the Arabic course writes, and
   it is inconsistent about accents. Comparing raw strings would fail on every
   single Arabic word, so both sides are flattened the same way first. */
function normalize(text, courseId) {
  var s = String(text || '').toLowerCase();
  s = s.replace(ARABIC_MARKS, '');
  s = s.normalize ? s.normalize('NFD').replace(COMBINING, '') : s;
  if (courseId === 'de') s = s.replace(/ß/g, 'ss');
  s = s.replace(PUNCT, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  var prev = [], cur = [], i, j;
  for (j = 0; j <= b.length; j++) prev[j] = j;
  for (i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1,
                        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    for (j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length];
}

/* 0 to 1. Character distance rather than word matching, because a learner who
   gets most of a word right should see that reflected rather than a flat fail. */
function similarity(heard, target, courseId) {
  var a = normalize(heard, courseId), b = normalize(target, courseId);
  if (!a || !b) return 0;
  if (a === b) return 1;
  var d = levenshtein(a, b);
  return Math.max(0, 1 - d / Math.max(a.length, b.length));
}

/* Recognition offers several guesses; take whichever was closest, because the
   top guess is often a common word that merely sounds like the target. */
function bestOf(alternatives, target, courseId) {
  var best = { text: '', score: 0 };
  (alternatives || []).forEach(function (t) {
    var s = similarity(t, target, courseId);
    if (s > best.score) best = { text: t, score: s };
  });
  if (!best.text && alternatives && alternatives.length) best.text = alternatives[0];
  return best;
}

/* Which of the target's words were not heard — the useful half of a wrong
   answer, since it points at the syllable that needs work. */
function missedWords(heard, target, courseId) {
  var h = normalize(heard, courseId).split(' ').filter(Boolean);
  /* Compare on the flattened forms but report the word as it is actually
     written — telling someone they missed "adios" when the course taught them
     "adiós" is a small thing that reads as sloppiness. */
  var out = [];
  String(target).split(/\s+/).forEach(function (raw) {
    var w = normalize(raw, courseId);
    if (!w) return;
    var landed = h.some(function (x) {
      return x === w || 1 - levenshtein(x, w) / Math.max(x.length, w.length) > 0.7;
    });
    if (!landed) out.push(raw);
  });
  return out;
}

/* ------------------------------------------------------------- recognising */

/* Starts listening. Returns a handle with stop(). Callbacks:
   onInterim(text), onResult({text, score, alternatives}), onError(kind). */
function listen(opts) {
  if (!SR) { opts.onError('unsupported'); return { stop: function () {} }; }
  var rec;
  try { rec = new SR(); } catch (e) { opts.onError('unsupported'); return { stop: function () {} }; }

  rec.lang = opts.lang;
  rec.interimResults = true;
  rec.maxAlternatives = 5;
  rec.continuous = false;

  var settled = false;
  rec.onresult = function (e) {
    var last = e.results[e.results.length - 1];
    var alts = [];
    for (var i = 0; i < last.length; i++) alts.push(last[i].transcript);
    if (!last.isFinal) { if (opts.onInterim) opts.onInterim(alts[0] || ''); return; }
    settled = true;
    var best = bestOf(alts, opts.target, opts.courseId);
    opts.onResult({ text: best.text, score: best.score, alternatives: alts });
  };
  rec.onerror = function (e) {
    settled = true;
    /* 'network' is the common one and deserves its own message — it means the
       recogniser could not reach its server, not that you said it wrong. */
    opts.onError(e.error || 'error');
  };
  rec.onend = function () {
    if (!settled) opts.onError('no-speech');
  };

  try { rec.start(); } catch (e) { opts.onError('error'); }
  return { stop: function () { try { rec.stop(); } catch (e) {} } };
}

/* --------------------------------------------------------------- recording */

/* Entirely on-device. Records until stop() is called, then hands back a URL
   that can be played through an <audio> element. */
function record(onReady, onError) {
  if (!canRecord()) { onError('unsupported'); return null; }
  var chunks = [], recorder = null, stream = null, stopped = false;

  navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) {
    if (stopped) { s.getTracks().forEach(function (t) { t.stop(); }); return; }
    stream = s;
    recorder = new MediaRecorder(s);
    recorder.ondataavailable = function (e) { if (e.data.size) chunks.push(e.data); };
    recorder.onstop = function () {
      stream.getTracks().forEach(function (t) { t.stop(); });
      onReady(URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })));
    };
    recorder.start();
  }).catch(function () { onError('not-allowed'); });

  return {
    stop: function () {
      stopped = true;
      if (recorder && recorder.state !== 'inactive') recorder.stop();
      else if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
    }
  };
}

/* What went wrong, in words rather than an error code. */
var ERRORS = {
  'no-speech': 'Nothing was picked up. Tap and speak straight away — it stops listening after a moment of silence.',
  'not-allowed': 'The microphone is blocked. Allow it for this site in the browser\'s site settings.',
  'audio-capture': 'No microphone was found.',
  'network': 'Scoring needs a connection — Chrome sends the audio away to be transcribed. Record and compare instead.',
  'unsupported': 'This browser cannot score speech. Record and compare instead.',
  'aborted': 'Listening stopped.',
  'error': 'The recogniser failed. Try once more.'
};
function errorText(kind) { return ERRORS[kind] || ERRORS.error; }

return {
  canScore: canScore, canRecord: canRecord, langFor: langFor,
  listen: listen, record: record,
  normalize: normalize, similarity: similarity, missedWords: missedWords,
  errorText: errorText
};
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Speech;
