/* Lisan — the two alphabets.
 *
 * Both scripts are cursive: a letter changes shape depending on whether it
 * starts, sits inside, or ends a word, and six Arabic letters refuse to join to
 * whatever follows them. Learning the isolated forms alone leaves you unable to
 * read an actual word, so the forms are taught from the first lesson.
 *
 * The contextual forms are produced with the zero-width joiner (U+200D) rather
 * than hardcoded presentation-form codepoints. The joiner asks the text shaper
 * for "the shape this letter takes when joined on that side", which is exactly
 * the question being asked, and it renders correctly in any font. The
 * alternative — the tatweel character ـ — draws an extra baseline stroke that
 * beginners reliably mistake for part of the letter.
 */
var Alphabet = (function () {
'use strict';

var ZWJ = '‍';

/* connects: 'both' joins on either side; 'right' only joins to the letter
   before it, so nothing after it can connect back. */
function forms(ch, connects) {
  if (connects === 'right') {
    return { isolated: ch, initial: null, medial: null, final: ZWJ + ch };
  }
  return {
    isolated: ch,
    initial: ch + ZWJ,
    medial: ZWJ + ch + ZWJ,
    final: ZWJ + ch
  };
}

/* ch, name, romanisation, how to say it, joining behaviour */
function L(ch, name, roman, sound, connects) {
  var f = forms(ch, connects || 'both');
  return {
    ch: ch, name: name, roman: roman, sound: sound,
    connects: connects || 'both',
    isolated: f.isolated, initial: f.initial, medial: f.medial, final: f.final
  };
}

var ARABIC = [
  L('ا', 'alif',  'a',  'a long "aa", as in father. It also carries other vowels.', 'right'),
  L('ب', 'bāʾ',   'b',  'b, as in book.'),
  L('ت', 'tāʾ',   't',  't, as in table.'),
  L('ث', 'thāʾ',  'th', 'th, as in think — not as in this.'),
  L('ج', 'jīm',   'j',  'j, as in jam.'),
  L('ح', 'ḥāʾ',   'ḥ',  'A hard h from the throat. Breathe out as if fogging a window.'),
  L('خ', 'khāʾ',  'kh', 'kh, as in Scottish loch.'),
  L('د', 'dāl',   'd',  'd, as in door.', 'right'),
  L('ذ', 'dhāl',  'dh', 'th, as in this — not as in think.', 'right'),
  L('ر', 'rāʾ',   'r',  'A rolled r, as in Spanish pero.', 'right'),
  L('ز', 'zāy',   'z',  'z, as in zoo.', 'right'),
  L('س', 'sīn',   's',  's, as in sun.'),
  L('ش', 'shīn',  'sh', 'sh, as in ship.'),
  L('ص', 'ṣād',   'ṣ',  'A heavy s, said with the tongue low and the mouth full.'),
  L('ض', 'ḍād',   'ḍ',  'A heavy d. Arabic is nicknamed "the language of the ḍād".'),
  L('ط', 'ṭāʾ',   'ṭ',  'A heavy t, deeper in the mouth than an English t.'),
  L('ظ', 'ẓāʾ',   'ẓ',  'A heavy version of the th in this.'),
  L('ع', 'ʿayn',  'ʿ',  'A tightening deep in the throat. No English equivalent — listen and copy.'),
  L('غ', 'ghayn', 'gh', 'Like a French r, or gargling.'),
  L('ف', 'fāʾ',   'f',  'f, as in fish.'),
  L('ق', 'qāf',   'q',  'A k made far back, near where you swallow.'),
  L('ك', 'kāf',   'k',  'k, as in kite.'),
  L('ل', 'lām',   'l',  'l, as in light.'),
  L('م', 'mīm',   'm',  'm, as in moon.'),
  L('ن', 'nūn',   'n',  'n, as in night.'),
  L('ه', 'hāʾ',   'h',  'h, as in house.'),
  L('و', 'wāw',   'w',  'w, as in water — or a long "oo".', 'right'),
  L('ي', 'yāʾ',   'y',  'y, as in yes — or a long "ee".')
];

/* Urdu keeps the Arabic letters and adds the sounds Arabic has no symbol for:
   the retroflexes ٹ ڈ ڑ, the aspirate marker ھ, and پ چ گ ژ. */
var URDU = [
  L('ا', 'alif',        'a',  'a long "aa", as in father.', 'right'),
  L('ب', 'be',          'b',  'b, as in book.'),
  L('پ', 'pe',          'p',  'p, as in pen. Arabic has no p — this is an Urdu letter.'),
  L('ت', 'te',          't',  'A soft t, tongue on the teeth — closer to French t than English.'),
  L('ٹ', 'ṭe',          'ṭ',  'A hard t with the tongue curled back. The English t is nearer this one.'),
  L('ث', 'se',          's',  's. In Urdu this is said the same as س.'),
  L('ج', 'jīm',         'j',  'j, as in jam.'),
  L('چ', 'che',         'ch', 'ch, as in chair. Another Urdu-only letter.'),
  L('ح', 'baṛī he',     'h',  'h. In Urdu it is said the same as ہ.'),
  L('خ', 'khe',         'kh', 'kh, as in Scottish loch.'),
  L('د', 'dāl',         'd',  'A soft d, tongue on the teeth.', 'right'),
  L('ڈ', 'ḍāl',         'ḍ',  'A hard d with the tongue curled back.', 'right'),
  L('ذ', 'zāl',         'z',  'z. Said the same as ز in Urdu.', 'right'),
  L('ر', 're',          'r',  'A tapped r.', 'right'),
  L('ڑ', 'ṛe',          'ṛ',  'A flapped r with the tongue curled back. Practise with باڑ.', 'right'),
  L('ز', 'ze',          'z',  'z, as in zoo.', 'right'),
  L('ژ', 'zhe',         'zh', 'The s in measure. Rare — mostly in borrowed words.', 'right'),
  L('س', 'sīn',         's',  's, as in sun.'),
  L('ش', 'shīn',        'sh', 'sh, as in ship.'),
  L('ص', 'su.ād',       's',  's. Said the same as س in Urdu.'),
  L('ض', 'zu.ād',       'z',  'z. Said the same as ز in Urdu.'),
  L('ط', 'to.e',        't',  't. Said the same as ت in Urdu.'),
  L('ظ', 'zo.e',        'z',  'z. Said the same as ز in Urdu.'),
  L('ع', 'ain',         'a',  'Usually just carries a vowel in Urdu.'),
  L('غ', 'ghain',       'gh', 'Like a French r, or gargling.'),
  L('ف', 'fe',          'f',  'f, as in fish.'),
  L('ق', 'qāf',         'q',  'A k made far back in the throat.'),
  L('ک', 'kāf',         'k',  'k, as in kite. Note the shape differs from Arabic ك.'),
  L('گ', 'gāf',         'g',  'g, as in go. An Urdu-only letter.'),
  L('ل', 'lām',         'l',  'l, as in light.'),
  L('م', 'mīm',         'm',  'm, as in moon.'),
  L('ن', 'nūn',         'n',  'n, as in night.'),
  L('و', 'vāo',         'v',  'v or w — or a long "oo".', 'right'),
  L('ہ', 'choṭī he',    'h',  'h, as in house. Also makes the "a" sound at a word\'s end.'),
  L('ھ', 'do-chashmī he', 'h', 'Never stands alone. It adds a puff of air: ک → کھ,ب → بھ.'),
  L('ی', 'choṭī ye',    'y',  'y, as in yes — or a long "ee".'),
  L('ے', 'baṛī ye',     'e',  'The "ay" in day. Only ever at the end of a word.', 'right')
];


/* ------------------------------------------------- shape families and marks */

/* Most letters in both scripts are the same skeleton wearing different dots.
   ب ت ث are one shape with one dot below, two above and three above; ج ح خ
   likewise. Beginners do not confuse these letters because the letters are
   hard — they confuse them because nobody ever told them the letters are the
   same drawing. Recording the family and the distinguishing mark lets a wrong
   answer be explained as "same shape, different dots" with the actual
   difference spelled out.

   `family` groups letters sharing a skeleton; `mark` describes what sets this
   one apart from the others in its family. */
var MARKS = {
  'ا': ['alif',  'a plain upright stroke, no dots'],
  'ب': ['tooth', 'one dot below'],
  'ت': ['tooth', 'two dots above'],
  'ث': ['tooth', 'three dots above'],
  'پ': ['tooth', 'three dots below'],
  'ٹ': ['tooth', 'a small ط above'],
  'ج': ['belly', 'one dot inside the belly'],
  'ح': ['belly', 'no dots at all'],
  'خ': ['belly', 'one dot above'],
  'چ': ['belly', 'three dots below'],
  'د': ['dal',   'no dot'],
  'ذ': ['dal',   'one dot above'],
  'ڈ': ['dal',   'a small ط above'],
  'ر': ['ra',    'no dot'],
  'ز': ['ra',    'one dot above'],
  'ڑ': ['ra',    'a small ط above'],
  'ژ': ['ra',    'three dots above'],
  'س': ['sin',   'three teeth, no dots'],
  'ش': ['sin',   'three teeth and three dots above'],
  'ص': ['sad',   'no dot'],
  'ض': ['sad',   'one dot above'],
  'ط': ['tah',   'no dot'],
  'ظ': ['tah',   'one dot above'],
  'ع': ['ayn',   'no dot'],
  'غ': ['ayn',   'one dot above'],
  'ف': ['fa',    'one dot above'],
  'ق': ['fa',    'two dots above'],
  'ك': ['kaf',   'a small stroke tucked inside'],
  'ک': ['kaf',   'no mark'],
  'گ': ['kaf',   'a second stroke above'],
  'ل': ['lam',   'a tall stroke with a curved tail'],
  'م': ['mim',   'a small closed loop on the line'],
  'ن': ['nun',   'one dot above a deep bowl'],
  'ه': ['ha',    'a small loop, no dots'],
  'ہ': ['ha',    'a rounded loop'],
  'ھ': ['ha',    'a two-eyed shape that only ever follows another letter'],
  'و': ['waw',   'no dot'],
  'ي': ['ya',    'two dots below'],
  'ی': ['ya',    'no dots in Urdu'],
  'ے': ['ya',    'a wide open sweep, only ever at a word\'s end']
};

[ARABIC, URDU].forEach(function (set) {
  set.forEach(function (l) {
    var m = MARKS[l.ch];
    if (m) { l.family = m[0]; l.mark = m[1]; }
  });
});

/* The other letters in this letter's family — the ones it is actually
   confusable with. */
function family(lang, ch) {
  var me = byChar(lang, ch);
  if (!me || !me.family) return [];
  return get(lang).filter(function (l) { return l.family === me.family && l.ch !== ch; });
}

/* Letters that look alike are the real difficulty, so they are grouped to be
   learned together rather than spread across the alphabet. */
var CONFUSABLE = [
  ['ب', 'ت', 'ث'], ['ج', 'ح', 'خ'], ['د', 'ذ'], ['ر', 'ز'],
  ['س', 'ش'], ['ص', 'ض'], ['ط', 'ظ'], ['ع', 'غ'], ['ف', 'ق']
];

function get(lang) { return lang === 'ur' ? URDU : ARABIC; }

/* Split into lesson-sized groups, keeping look-alike letters together. */
function groups(lang, size) {
  var letters = get(lang), out = [], i;
  size = size || 7;
  for (i = 0; i < letters.length; i += size) out.push(letters.slice(i, i + size));
  return out;
}

function byChar(lang, ch) {
  var letters = get(lang);
  for (var i = 0; i < letters.length; i++) if (letters[i].ch === ch) return letters[i];
  return null;
}

/* A word written out letter by letter, for the "how it joins up" exercise. */
function spell(lang, word) {
  var out = [];
  for (var i = 0; i < word.length; i++) {
    var l = byChar(lang, word[i]);
    if (l) out.push(l);
  }
  return out;
}

return {
  ARABIC: ARABIC, URDU: URDU, CONFUSABLE: CONFUSABLE, ZWJ: ZWJ, MARKS: MARKS,
  get: get, groups: groups, byChar: byChar, spell: spell, forms: forms, family: family
};
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Alphabet;
