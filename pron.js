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
function respellSemitic(roman) {
  if (!roman) return '';
  return String(roman).split(/\s+/).map(function (phrase) {
    return phrase.split('-').map(function (chunk) {
      var us = units(chunk);
      return us.length ? syllabify(us).join('-') : '';
    }).filter(Boolean).join('-');
  }).filter(Boolean).join(' ');
}


/* =================================================== Spanish and German ====
 *
 * Arabic and Urdu arrive already transliterated, so the work is turning one
 * notation into another. Spanish and German arrive in their own spelling, and
 * both are regular enough that the pronunciation can be *derived* — which is
 * far better than storing it by hand, because a generated respelling cannot
 * drift out of step with the word it describes.
 *
 * French and Korean are not regular enough for that, so those carry an explicit
 * `p` field in the course data instead. Guessing at French would teach the
 * wrong sounds, which is worse than not guessing.
 */

var VOWEL_RE = /[aeiouáéíóúäöüàèìòùâêîôûy]/i;

/* Consonant pairs that never split across a syllable in Spanish. */
var ES_CLUSTERS = ['bl','br','cl','cr','dl','dr','fl','fr','gl','gr','pl','pr','tl','tr','ch','ll','rr'];

function esSyllables(word) {
  var w = word.toLowerCase();
  /* Units carry whether they are a vowel nucleus. Deciding that by looking for
     a vowel letter fails on qu and gu, whose u is silent — `quiero` would be
     split as k-YEH-roh instead of KYEH-roh. */
  var units = [], i = 0;
  function push(s, vowel) { units.push({ s: s, vowel: vowel }); }
  while (i < w.length) {
    var two = w.slice(i, i + 2);
    if ((two === 'qu' || two === 'gu') && /[eéií]/.test(w[i + 2] || '')) { push(two, false); i += 2; continue; }
    if (ES_CLUSTERS.indexOf(two) >= 0) { push(two, false); i += 2; continue; }
    push(w[i], VOWEL_RE.test(w[i]));
    i++;
  }

  /* A weak vowel (i/u) beside another vowel is one nucleus, not two — unless
     the weak one carries the accent, which is exactly what breaks the pair. */
  var merged = [];
  for (i = 0; i < units.length; i++) {
    var u = units[i], nx = units[i + 1];
    if (u.vowel && nx && nx.vowel) {
      var weak = 'iuü';
      var pair = u.s + nx.s;
      if ((weak.indexOf(u.s) >= 0 || weak.indexOf(nx.s) >= 0) && !/[íú]/.test(pair)) {
        merged.push({ s: pair, vowel: true }); i++; continue;
      }
    }
    merged.push(u);
  }
  units = merged;

  var vAt = [];
  units.forEach(function (u, k) { if (u.vowel) vAt.push(k); });
  var text = units.map(function (u) { return u.s; });
  if (vAt.length < 2) return [text.join('')];

  var cuts = [];
  for (var k = 0; k < vAt.length - 1; k++) {
    var x = vAt[k], y = vAt[k + 1], gap = y - x - 1;
    cuts.push(gap <= 1 ? y - gap : y - 1);
  }
  var parts = [], start = 0;
  cuts.forEach(function (c) { if (c > start) { parts.push(text.slice(start, c).join('')); start = c; } });
  parts.push(text.slice(start).join(''));
  return parts.filter(Boolean);
}

/* Spanish stress is fully regular, which is why it can be marked with
   confidence: a written accent wins; otherwise a word ending in a vowel, n or
   s is stressed on the second-to-last syllable, and anything else on the last. */
function esStressIndex(syls) {
  for (var i = 0; i < syls.length; i++) if (/[áéíóú]/.test(syls[i])) return i;
  if (syls.length === 1) return 0;
  var last = syls[syls.length - 1];
  return /[aeiouns]$/.test(last) ? syls.length - 2 : syls.length - 1;
}

/* Spanish vowel pairs. A weak vowel (i/u) beside a strong one is a glide, not
   a syllable of its own: `gracias` is GRAH-syahs, never GRAH-see-ahs. Getting
   this wrong is the single most audible mistake an English speaker makes. */
var ES_DIPH = {
  ia: 'yah', ie: 'yeh', io: 'yoh', iu: 'yoo',
  ua: 'wah', ue: 'weh', ui: 'wee', uo: 'woh',
  ai: 'eye', ay: 'eye', ei: 'ay', ey: 'ay',
  oi: 'oy', oy: 'oy', au: 'ow', eu: 'eh-oo'
};

function esSounds(syl, atStart) {
  var out = '', i = 0, s = syl;
  while (i < s.length) {
    var c = s[i], nx = s[i + 1] || '';
    var two = c + nx;
    if (two === 'ch') { out += 'ch'; i += 2; continue; }
    if (two === 'll') { out += 'y'; i += 2; continue; }
    if (two === 'rr') { out += 'rr'; i += 2; continue; }
    if (two === 'qu') { out += 'k'; i += 2; continue; }
    if (c === 'g' && nx === 'u' && /[ei]/.test(s[i + 2] || '')) { out += 'g'; i += 2; continue; }
    if (c === 'g' && /[eiéí]/.test(nx)) { out += 'h'; i++; continue; }
    if (c === 'c' && /[eiéí]/.test(nx)) { out += 's'; i++; continue; }
    if (c === 'c') { out += 'k'; i++; continue; }
    if (c === 'z') { out += 's'; i++; continue; }
    if (c === 'j') { out += 'h'; i++; continue; }
    if (c === 'h') { i++; continue; }                 /* always silent */
    if (c === 'ñ') { out += 'ny'; i++; continue; }
    if (c === 'v') { out += 'b'; i++; continue; }
    if (c === 'r' && atStart && i === 0) { out += 'rr'; i++; continue; }
    if (c === 'ü') { out += 'w'; i++; continue; }
    /* A diphthong, but only when neither half carries a written accent —
       an accent is exactly the mark that breaks the pair apart. */
    /* Look the pair up with the stress accent stripped off the strong vowel,
       so ió is still the io diphthong. A weak í or ú is left alone, because
       there the accent genuinely breaks the pair. */
    var plainTwo = two.replace(/á/g, 'a').replace(/é/g, 'e').replace(/ó/g, 'o');
    if (ES_DIPH[plainTwo] && !/[íú]/.test(two)) { out += ES_DIPH[plainTwo]; i += 2; continue; }
    if (/[aá]/.test(c)) { out += 'ah'; i++; continue; }
    if (/[eé]/.test(c)) { out += 'eh'; i++; continue; }
    if (/[ií]/.test(c)) { out += 'ee'; i++; continue; }
    if (/[oó]/.test(c)) { out += 'oh'; i++; continue; }
    if (/[uú]/.test(c)) { out += 'oo'; i++; continue; }
    if (c === 'y') { out += nx ? 'y' : 'ee'; i++; continue; }
    out += c; i++;
  }
  return out;
}

function respellSpanish(word) {
  return String(word).split(/\s+/).map(function (w) {
    var bare = w.replace(/[¿?¡!.,;:"]/g, '');
    if (!bare) return '';
    var syls = esSyllables(bare);
    var stress = esStressIndex(syls);
    return syls.map(function (sy, i) {
      var snd = esSounds(sy, i === 0);
      return i === stress ? snd.toUpperCase() : snd;
    }).join('-');
  }).filter(Boolean).join(' ');
}

/* German: regular enough to derive, with the usual caveats about which `ch`
   you are looking at and where a borrowed word puts its stress.
 *
 * The sounds are mapped across the whole word first and the result is split
 * afterwards. Splitting first breaks the digraphs — `sprechen` becomes
 * "sprec|hen" and the `ch` disappears — which is how the obvious
 * implementation gets Wasser, ich and Mädchen all wrong at once. */
function deSounds(s) {
  var out = '', i = 0;
  /* A doubled consonant is one sound. `s` is deliberately excluded: `ss` is
     voiceless and has its own rule below, and collapsing it here would let the
     s-before-vowel rule voice it — Wasser would come out as "VAH-zehr". */
  s = s.replace(/([bdfgklmnprt])\1/g, '$1');
  while (i < s.length) {
    var c = s[i], three = s.slice(i, i + 3), two = s.slice(i, i + 2);
    if (three === 'sch') { out += 'sh'; i += 3; continue; }
    /* Both German `ch` sounds are written kh. They differ — after a, o, u it is
       the throaty loch sound, elsewhere a softer hiss made further forward —
       but no English spelling distinguishes them, and inventing one produces a
       phantom vowel that wrecks the syllable split. The sound note carries the
       difference instead. */
    if (two === 'ch') { out += 'kh'; i += 2; continue; }
    if (two === 'ei' || two === 'ai') { out += 'y'; i += 2; continue; }
    if (two === 'ie') { out += 'ee'; i += 2; continue; }
    if (two === 'eu' || two === 'äu') { out += 'oy'; i += 2; continue; }
    if (two === 'au') { out += 'ow'; i += 2; continue; }
    if (two === 'qu') { out += 'kv'; i += 2; continue; }
    if (two === 'ck') { out += 'k'; i += 2; continue; }
    if (two === 'ss') { out += 's'; i += 2; continue; }
    if (c === 'ß') { out += 's'; i++; continue; }
    if (two === 'st' && i === 0) { out += 'sht'; i += 2; continue; }
    if (two === 'sp' && i === 0) { out += 'shp'; i += 2; continue; }
    if (c === 's' && VOWEL_RE.test(s[i + 1] || '')) { out += 'z'; i++; continue; }
    if (c === 'v') { out += 'f'; i++; continue; }
    if (c === 'w') { out += 'v'; i++; continue; }
    if (c === 'z') { out += 'ts'; i++; continue; }
    if (c === 'j') { out += 'y'; i++; continue; }
    if (c === 'ä') { out += 'eh'; i++; continue; }
    if (c === 'ö') { out += 'ur'; i++; continue; }
    if (c === 'ü') { out += 'ew'; i++; continue; }
    if (c === 'a') { out += 'ah'; i++; continue; }
    if (c === 'e') { out += 'eh'; i++; continue; }
    if (c === 'i') { out += 'ih'; i++; continue; }
    if (c === 'o') { out += 'oh'; i++; continue; }
    if (c === 'u') { out += 'oo'; i++; continue; }
    if (c === 'h' && i > 0 && !VOWEL_RE.test(s[i + 1] || '')) { i++; continue; }  /* lengthens, not sounded */
    out += c; i++;
  }
  return out;
}

/* German stress sits on the first syllable, except after an unstressed prefix. */
var DE_PREFIX = ['be', 'ge', 'er', 'ver', 'zer', 'ent', 'emp', 'miss', 'zu'];

function respellGerman(word) {
  return String(word).split(/\s+/).map(function (w) {
    var bare = w.replace(/[?!.,;:"]/g, '');
    if (!bare) return '';
    var lower = bare.toLowerCase();
    var syls = genericSyllables(deSounds(lower));
    var stress = 0;
    for (var i = 0; i < DE_PREFIX.length; i++) {
      if (lower.indexOf(DE_PREFIX[i]) === 0 && syls.length > 1) { stress = 1; break; }
    }
    return syls.map(function (sy, k) {
      return k === stress ? sy.toUpperCase() : sy;
    }).join('-');
  }).filter(Boolean).join(' ');
}

/* A plain vowel-counting syllable split, used where a language does not need
   anything cleverer. */
function genericSyllables(w) {
  var vAt = [];
  for (var i = 0; i < w.length; i++) if (VOWEL_RE.test(w[i])) vAt.push(i);
  if (vAt.length < 2) return [w];
  /* Treat common digraph vowels as one nucleus. */
  var merged = [];
  for (i = 0; i < vAt.length; i++) {
    if (merged.length && vAt[i] === merged[merged.length - 1] + 1) continue;
    merged.push(vAt[i]);
  }
  if (merged.length < 2) return [w];
  var cuts = [];
  for (i = 0; i < merged.length - 1; i++) {
    var a = merged[i], b = merged[i + 1], gap = b - a - 1;
    cuts.push(gap <= 1 ? b - gap : b - 1);
  }
  /* Never cut through a pair that spells one sound, or `sprechen` comes out as
     SHPREHK-hehn with the kh torn in half. */
  var ATOMIC = ['kh', 'sh', 'ts', 'ch', 'ny', 'ng', 'oy', 'ow', 'ee', 'oo'];
  var parts = [], start = 0;
  cuts.forEach(function (c) {
    if (c > 0 && ATOMIC.indexOf(w.slice(c - 1, c + 1)) >= 0) c -= 1;
    if (c > start) { parts.push(w.slice(start, c)); start = c; }
  });
  parts.push(w.slice(start));
  return parts.filter(Boolean);
}

/* ------------------------------------------------------------- dispatch */

/* Which engine a language uses. Anything not listed passes its text through
   unchanged, which is what French and Korean want — their course data carries
   an explicit `p` for every entry. */
var ENGINES = {
  ar: respellSemitic, ur: respellSemitic,
  es: respellSpanish, de: respellGerman
};

/* The pronunciation line for one course entry.
   An explicit `p` in the data always wins, because it is there precisely for
   the cases a generator would get wrong. */
function forItem(course, item) {
  if (!item) return '';
  if (item.p) return item.p;
  var engine = ENGINES[course.id];
  if (!engine) return '';
  return engine(course.romanized ? (item.r || '') : (item.t || ''));
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

/* Kept as the old name so existing Arabic and Urdu call sites are unchanged. */
function respell(roman) { return respellSemitic(roman); }

return {
  respell: respell, respellSemitic: respellSemitic,
  respellSpanish: respellSpanish, respellGerman: respellGerman,
  forItem: forItem, tips: tips, hasTips: hasTips, SOUNDS: SOUNDS
};
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Pron;
