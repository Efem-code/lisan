/* Lisan — speech.
 *
 * Uses the device's own speech synthesis. Nothing is downloaded and nothing is
 * sent anywhere, but it also means the voices available are whatever the phone
 * happens to have installed. Arabic is usually present on Android; Urdu often
 * is not, and when it is missing the listening exercises are simply left out
 * rather than played in a voice that would teach the wrong pronunciation.
 */
var TTS = (function () {
'use strict';

var voices = [];
var ready = false;
var listeners = [];

function refresh() {
  try {
    voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  } catch (e) { voices = []; }
  if (voices.length && !ready) {
    ready = true;
    listeners.forEach(function (fn) { try { fn(); } catch (e) {} });
    listeners = [];
  }
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  refresh();
  window.speechSynthesis.onvoiceschanged = refresh;
  /* Some Android builds never fire voiceschanged; poll briefly as a backstop. */
  var tries = 0;
  var poll = setInterval(function () {
    refresh();
    if (ready || ++tries > 20) clearInterval(poll);
  }, 250);
}

function onReady(fn) {
  if (ready || !window.speechSynthesis) fn();
  else listeners.push(fn);
}

/* Finds the best available voice for a list of preferred tags, most specific
   first: an exact ur-PK beats a generic ur, which beats nothing. */
function voiceFor(tags) {
  if (!voices.length) refresh();
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i].toLowerCase();
    for (var j = 0; j < voices.length; j++) {
      if ((voices[j].lang || '').toLowerCase().replace('_', '-') === tag) return voices[j];
    }
  }
  /* Then any voice whose language matches the base tag, e.g. ar-anything. */
  for (i = 0; i < tags.length; i++) {
    var base = tags[i].split('-')[0].toLowerCase();
    for (j = 0; j < voices.length; j++) {
      if ((voices[j].lang || '').toLowerCase().indexOf(base) === 0) return voices[j];
    }
  }
  return null;
}

function available(tags) { return !!voiceFor(tags); }

function speak(text, tags, rate) {
  if (!window.speechSynthesis || !text) return false;
  var voice = voiceFor(tags || []);
  try {
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    if (voice) { u.voice = voice; u.lang = voice.lang; }
    else if (tags && tags.length) u.lang = tags[0];
    /* Slower than natural: these are unfamiliar sounds and the point is to be
       copied, not to sound fluent. */
    u.rate = rate || 0.75;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}

function stop() {
  try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
}

function describe(tags) {
  var v = voiceFor(tags || []);
  return v ? (v.name + ' (' + v.lang + ')') : null;
}

return { speak: speak, stop: stop, available: available, onReady: onReady, describe: describe, voiceFor: voiceFor };
})();
