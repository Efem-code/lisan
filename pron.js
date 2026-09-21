/* Lisan — pronunciation help.
 *
 * The romanisation in the course data is the standard academic transliteration:
 * `marḥaban`, `ṣabāḥu l-khayr`. It is precise and completely useless to someone
 * who has never seen it — nobody reads `ḥ` and knows what to do with their
 * throat. This turns it into two things a beginner can actually use:
 *
 *   a plain respelling   marḥaban  ->  mar-ha-ban
 *   and sound notes      ḥ = a hard h from the throat, as if fogging a window
 *
 * The respelling only claims to handle vowels and syllables. The consonants
 * with no English equivalent are handled by the notes instead of being quietly
 * flattened into something that would teach the wrong sound.
 */
var Pron = (function () {
'use strict';

/* Sounds English does not have. `plain` is what goes into the respelling,
   `how` is the note shown beneath it. */
var SOUNDS = {
  'ḥ':  { plain: 'h',  label: 'ḥ',  how: 'A hard h from deep in the throat — breathe out as if fogging a window.' },
  'ʿ':  { plain: "'",  label: 'ʿ',  how: 'A tightening deep in the throat, below the h. No English equivalent — copy the audio.' },
  'ʾ':  { plain: "'",  label: 'ʾ',  how: 'A catch in the voice, like the gap in "uh-oh".' },
  'kh': { plain: 'kh', label: 'kh', how: 'Like the ch in Scottish "loch", or clearing your throat.' },
  'gh': { plain: 'gh', label: 'gh', how: 'Like a French r, or a soft gargle.' },
  'q':  { plain: 'q',  label: 'q',  how: 'A k made much further back, near where you swallow.' },
  'ṣ':  { plain: 's',  label: 'ṣ',  how: 'A heavy s, tongue low and the mouth full.' },
  'ḍ':  { plain: 'd',  label: 'ḍ',  how: 'A heavy d, deeper and duller than the English one.' },
  'ṭ':  { plain: 't',  label: 'ṭ',  how: 'A heavy t. In Urdu, said with the tongue curled back.' },
  'ẓ':  { plain: 'z',  label: 'ẓ',  how: 'A heavy version of the th in "this".' },
  'ṛ':  { plain: 'r',  label: 'ṛ',  how: 'A flapped r — curl the tongue back and flick it forward.' },
  'ṇ':  { plain: 'n',  label: 'ṇ',  how: 'An n with the tongue curled back.' },
  'ḳ':  { plain: 'k',  label: 'ḳ',  how: 'A k made far back in the throat.' },
  'th': { plain: 'th', label: 'th', how: 'As in "think" — not as in "this".' },
  'dh': { plain: 'th', label: 'dh', how: 'As in "this" — not as in "think".' }
};

/* Long vowels first: they are the single biggest thing the academic spelling
   hides from an English reader. */
var VOWELS = { 'ā': 'aa', 'ī': 'ee', 'ū': 'oo', 'ē': 'ay', 'ō': 'oh',
               'a': 'a', 'e': 'e', 'i': 'i', 'o': 'o', 'u': 'u' };

/* Vowel pairs that are one sound, not two. Without these, "alaikum" comes out
   as a-la-i-kum, which nobody would ever say. */
var DIPHTHONGS = ['ai', 'ay', 'au', 'aw', 'ei', 'ey', 'oi', 'ou'];

/* A stop plus a puff of air. Urdu writes these with ھ; the romanisation uses a
   digraph, and the respelling keeps the h so the aspiration survives. */
var ASPIRATES3 = ['chh', 'ṭha', 'ḍha'];
var ASPIRATES2 = ['ph', 'bh', 'jh', 'ṭh', 'ḍh', 'ṛh', 'ch', 'sh', 'zh'];

function isVowelUnit(u) {
  return /^(aa|ee|oo|ay|oh|ai|au|aw|ei|ey|oi|ou|a|e|i|o|u)$/.test(u);
}

/* Nothing carrying a dot or a macron may reach the respelling — the entire
   point is that it can be read without knowing the notation. */
function plainChar(ch) {
  if (SOUNDS[ch]) return SOUNDS[ch].plain;
  if (VOWELS[ch]) return VOWELS[ch];
  return ch;
}

/* One chunk of romanisation, broken into pronunciation units. */
function units(word) {
  var s = String(word).toLowerCase().replace(/[.,?!؟]/g, '');
  var out = [], i = 0;
  while (i < s.length) {
    if (ASPIRATES3.indexOf(s.slice(i, i + 3)) >= 0) {
      out.push(plainChar(s[i]) + 'h'); i += 2; continue;   /* leave the vowel */
    }
    var two = s.slice(i, i + 2);
    if (SOUNDS[two]) { out.push(SOUNDS[two].plain); i += 2; continue; }
    if (DIPHTHONGS.indexOf(two) >= 0) { out.push(two); i += 2; continue; }
    if (ASPIRATES2.indexOf(two) >= 0) { out.push(plainChar(two[0]) + two[1]); i += 2; continue; }
    out.push(plainChar(s[i]));
    i++;
  }
  return out;
}

/* Split units into syllables with the ordinary rule: one consonant between
   vowels starts the next syllable (ma-ra); two split between them (mar-ha). */
function syllabify(us) {
  var vowelAt = [];
  us.forEach(function (u, i) { if (isVowelUnit(u)) vowelAt.push(i); });
  if (vowelAt.length < 2) return [us.join('')];

  var cuts = [];
  for (var k = 0; k < vowelAt.length - 1; k++) {
    var a = vowelAt[k], b = vowelAt[k + 1];
    cuts.push(b - a - 1 === 0 ? b : b - 1);
  }
  var parts = [], start = 0;
  cuts.forEach(function (c) {
    if (c > start) { parts.push(us.slice(start, c).join('')); start = c; }
  });
  parts.push(us.slice(start).join(''));
  return parts.filter(Boolean);
}

/* marḥaban -> "mar-ha-ban". Hyphens already in the romanisation mark real
   boundaries — the Arabic article in `s-salāma`, the Urdu izafat in
   `tālib-e-ilm` — so they are kept rather than swallowed. */
function respell(roman) {
  if (!roman) return '';
  return String(roman).split(/\s+/).map(function (phrase) {
    return phrase.split('-').map(function (chunk) {
      var us = units(chunk);
      return us.length ? syllabify(us).join('-') : '';
    }).filter(Boolean).join('-');
  }).filter(Boolean).join(' ');
}

/* The sounds in this word an English speaker has to be told about. */
function tips(roman) {
  if (!roman) return [];
  var s = String(roman).toLowerCase();
  var found = [], seen = {};
  for (var i = 0; i < s.length; i++) {
    var two = s.slice(i, i + 2);
    var key = SOUNDS[two] ? two : (SOUNDS[s[i]] ? s[i] : null);
    if (!key) continue;
    if (!seen[key]) { seen[key] = true; found.push(SOUNDS[key]); }
    i += key.length - 1;
  }
  return found;
}

function hasTips(roman) { return tips(roman).length > 0; }

return { respell: respell, tips: tips, hasTips: hasTips, SOUNDS: SOUNDS };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Pron;
