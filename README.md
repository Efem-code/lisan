# Lisan

Six languages, taught the way Duolingo teaches: a path of short lessons, a
streak, a daily goal, and the same handful of exercise types drilled until the
words stick. Arabic, Urdu and Korean start from the writing system and assume
you cannot read a character.

No account, no subscription, no network. Everything runs on the phone.

## Getting it onto the phone

The app lives at **<https://efem-code.github.io/lisan/>**.

Open that on the phone **in Chrome** and tap the **Install** button along the
bottom. It gets its own icon and opens fullscreen, with no browser bar.

It has to be Chrome — Brave only creates a home-screen shortcut that opens in a
browser tab. And it has to be the https address rather than localhost, because
Android's install machinery keys on hostname and ignores the port, so everything
served from `localhost` collides. The Gambit README has the long version.

To push a change:

```bash
./deploy.sh
```

Stamps a new build into `sw.js`, commits and pushes. Open the app afterwards and
it reloads itself onto the new version — no cable, no reinstall.

`./phone.sh` still serves the folder over USB at `http://lisan.localhost:8779`
for testing a change before deploying it.

---

## What is in it

**Six courses**, switchable from the chip at the top left. Each keeps its own
progress, so working on two does not have them fighting over one streak.

| | Script | Units | Words | Sentences | Lessons |
|---|---|---|---|---|---|
| **Spanish** | Latin | 21 | 382 | 149 | 105 |
| **German** | Latin | 21 | 370 | 124 | 105 |
| **French** | Latin | 21 | 366 | 123 | 104 |
| **Arabic** | Arabic (28 letters) | 22 | 275 | 86 | 90 |
| **Korean** | Hangul (24 jamo) | 21 | 259 | 85 | 86 |
| **Urdu** | Nastaliq (37 letters) | 23 | 255 | 82 | 91 |

1,907 words and 649 sentences in total, across 581 lessons.

Each course runs the same arc: greetings, people, the verb "to be", family,
numbers, food, places, everyday verbs, adjectives, questions, time, shopping,
home, travel, the past, plans, health, weather, opinions, work, and the
connectives that join clauses together. Roughly the ground a CEFR A2 course
covers.

Which variety: **Latin American Spanish** (Castilian differences noted where
they matter), **standard French**, **standard German**, **Modern Standard
Arabic**, **Pakistani Urdu**, and Korean in the everyday **해요 polite style**.

**The writing systems come first, and they are taught properly.** Arabic and
Urdu are cursive: a letter is a different shape at the start, middle and end of
a word, and six Arabic letters refuse to join to whatever follows them. Learning
only the isolated forms — which is what most alphabet charts give you — leaves
you unable to read an actual word, so every letter is introduced with all four
of its forms and there is an exercise that shows one mid-word and asks which it
is. Hangul is not cursive but it stacks: 한 is ㅎ + ㅏ + ㄴ in one square, so
each jamo is introduced with worked syllable blocks instead.

**Exercise types**, generated from the content rather than hand-written:

- new word / new letter / new sentence, with audio
- word shown → choose the meaning
- meaning shown → choose the word
- tap what you hear
- tap the matching pairs
- build the sentence from a word bank, in both directions
- fill the gap in a sentence
- which letter is this, at the start / middle / end of a word

Wrong answers cost a heart and the question comes back later in the same lesson,
so you leave having got it right. Five hearts, one back every 25 minutes, or
finish a practice run to refill them all.

**Pronunciation.** Every word and sentence is introduced three ways at once —
the writing, a plain respelling, and the meaning — with a normal-speed and a
much slower audio button:

> **صَباحُ الخَيْر** · **sa-baa-hu l-khayr** · *ṣabāḥu l-khayr* · good morning
>
> **SOUNDS TO WATCH**
> **ṣ** A heavy s, tongue low and the mouth full.
> **ḥ** A hard h from deep in the throat — breathe out as if fogging a window.

How the respelling is produced depends on the language, and the split is
deliberate:

* **Spanish and German are derived by rule.** Both spellings are regular enough
  to turn into sound in code, which is better than storing it by hand because a
  generated respelling cannot drift out of step with the word. Spanish stress is
  fully predictable, so the stressed syllable is marked in capitals:
  `gracias → GRAH-syahs`, `país → pah-EES`, `quiero → KYEH-roh`. German maps the
  sounds across the whole word before splitting it into syllables — splitting
  first tears the digraphs apart and turns `sprechen` into "SHPREHK-hehn".
* **French and Korean carry an explicit respelling for every entry.** Neither
  can be derived honestly. French drops final consonants, nasalises vowels and
  writes "eaux" as one sound; Korean's Revised Romanisation is a spelling system
  rather than a pronunciation guide, writing 어 as "eo". A generator would be
  wrong often enough to teach the wrong sounds, which is worse than not guessing.
* **Arabic and Urdu convert their transliteration**, expanding long vowels and
  keeping the article and izafat hyphens, and hand the consonants English does
  not have to the sound notes rather than flattening them into a nearest miss.

**Speaking practice.** Off by default; switch it on in Settings. About one
exercise in ten then becomes "say this out loud": the word, its respelling, a
model to listen to, and a microphone button.

A wrong attempt is explained the way the rest of the app explains things —
what came through, and which word did not land:

> **Not quite there**
> TARGET · **adiós** · ah-DYOHS
> What came through: "buenas noches"
> This word did not land: adiós
> *The recogniser is not judging your accent — it only reports the words it
> matched. Play the model again and copy the rhythm, not just the sounds.*

Matching is deliberately forgiving in the right places. Recognition never
returns Arabic vowel marks, so `صباح الخير` heard against the course's fully
vowelled `صَباحُ الخَيْر` scores a perfect match rather than a flat zero; Spanish
accents and inverted punctuation are normalised away; German ß matches ss. The
comparison is a character-distance score, so most of a word right shows as most
of a word right, and the recogniser's alternative guesses are all checked
because its first guess is often a common word that merely sounds similar.

**It is the one thing in this app that leaves your phone.** Chrome does not
transcribe on the device — it streams the audio to Google and sends back text.
That is why the feature is off until you turn it on, why the setting says so in
plain words, and why there is an offline fallback: with no signal, or in a
browser that cannot score, it records you and plays it back against the model.
That part is entirely local and is closer to how anyone actually drills
pronunciation. Every spoken exercise also has a **Skip** button, because you
will not always be somewhere you can talk.

**Practice** pulls whatever is weakest or most overdue. Each item tracks its own
strength 0–5; a correct answer pushes the next review out (4 hours → 1 day → 3
days → 1 week → 3 weeks), a wrong one drops it back to the start.

**Words** lists everything in the course with its strength, and a button to hear
each one. Items you have not met yet are dimmed but still browsable.

---

## Honest limitations

**Audio depends on your phone, not on this app.** It uses the device's own
text-to-speech. Spanish, French, German and Korean voices are almost always
present on Android; Arabic usually is; Urdu often is not. When no voice for the
course is installed, the listening exercises are left out of every lesson rather
than played in the wrong accent. To add one: Android **Settings → General
management → Text-to-speech → Preferred engine → install voice data**. The
Settings sheet says which voice it found.

**Urdu needs a Nastaliq font to look right**, and Korean a CJK font. Samsung
devices normally ship both. If yours does not, Urdu falls back to Naskh — still
readable, just not how Urdu is normally set.

**Speech scoring is not accent scoring.** The recogniser reports which words it
matched, nothing more. You can be understood while sounding foreign, and you can
be marked wrong for a perfectly good accent the model was not expecting. Treat a
pass as "that was intelligible", not "that was native", and use the record-and-
compare drill for the finer work.

**Gender is taught but not drilled hard.** Spanish, French and German nouns are
always introduced with their article, and a wrong article in a built sentence is
explained as a gender mistake rather than a vocabulary slip. There is no
dedicated gender drill yet.

**The Arabic is fully vowelled.** Real Arabic text almost never writes the short
vowels — `كَيْفَ حالُك` appears in the wild as `كيف حالك`. They are here because
without them a beginner cannot pronounce anything, but you are reading training
wheels.

**Urdu verbs change with your gender.** `پیتا ہوں` is what a man says; a woman
says `پیتی ہوں`. The courses teach the masculine forms and flag this where it
comes up, which is a real gap rather than a design decision.

**This will not make you fluent, and nothing like it can.** Roughly 300–380
words and 85–150 sentences per language is a real foundation — enough to greet
people, order food, ask where something is, talk about what you did yesterday
and what you plan to do tomorrow, and read the script. It is about the ground a
CEFR A2 course covers. Fluency comes from the two things an app cannot do for
you: talking to actual people, and reading or listening to far more of the
language than any course contains. Use this to build the base, then go and use
it badly with someone patient.

---

## Checking the content

The course data is validated rather than trusted: every alphabet unit must
reference real letters, every word needs all three of script, romanisation and
English, no word may appear in two units, and every sentence must have at least
two tokens on both sides (a word-bank exercise needs something to build).

```bash
node -e "
global.Alphabet=require('./alphabet.js'); global.Courses=require('./courses.js');
['ar','ur','es','fr','de','ko'].forEach(c=>eval(require('fs').readFileSync('./course-'+c+'.js','utf8')));
const p=Courses.verify();
console.log(p.length ? p : 'course content ok');
console.table(Courses.stats());
"
```

The exercise generator is checked separately — every generated multiple choice
must have exactly one correct option and no duplicate labels, every word bank
must contain the words needed to build its answer, and every wrong answer must
produce an explanation:

```bash
node -e "
global.Alphabet=require('./alphabet.js'); global.Courses=require('./courses.js'); global.Pron=require('./pron.js');
['ar','ur','es','fr','de','ko'].forEach(c=>eval(require('fs').readFileSync('./course-'+c+'.js','utf8')));
const L=require('./lesson.js'), E=require('./explain.js');
let n=0, bad=0;
Courses.ALL.forEach(c => L.planCourse(c).forEach(node =>
  L.buildExercises(c, node.spec, {canSpeak:true}).forEach(ex => {
    n++;
    if (ex.options) {
      if (ex.options.filter(o=>o.correct).length !== 1) bad++;
      if (new Set(ex.options.map(o=>o.label)).size !== ex.options.length) bad++;
    }
    if (ex.type==='build' && !ex.answer.every(w=>ex.bank.includes(w))) bad++;
    if (ex.type!=='match' && !['wordIntro','letterIntro','sentenceIntro'].includes(ex.type)) {
      const r = E.wrong({course:c, ex:ex, chosenLabel:(ex.options&&ex.options[0]||{}).label, given:[]});
      if (!r.lines.length) bad++;
    }
  })));
console.log(n + ' exercises generated, ' + bad + ' problems');
"
```

---

## Files

| | |
|---|---|
| `alphabet.js` | Arabic, Urdu and Hangul — joining forms, shape families and marks |
| `courses.js` | The course registry and the checks every course must pass |
| `course-*.js` | One file per language — words, sentences and grammar notes |
| `lesson.js` | Turns content into exercises; the spaced-repetition schedule; re-asking |
| `pron.js` | Per-language pronunciation: derived for Spanish and German, stored for French and Korean, converted for Arabic and Urdu |
| `speech.js` | Speaking practice: recognition, matching, and local recording |
| `explain.js` | Turns a wrong answer into an explanation |
| `tts.js` | Device speech, and deciding whether a usable voice exists |
| `store.js` | localStorage: progress, streak, XP |
| `app.js` | Path, lesson runner, practice, word list |
| `phone.sh` | USB serving, for testing before a deploy |
| `deploy.sh` | Publish to GitHub Pages |
| `make-icons.py` | Launcher icons |

---

## Your data

Progress, streak and XP live in `localStorage` on the phone and are never
uploaded. Settings → **Export data** writes a JSON backup. Clearing the
browser's site data, or uninstalling, loses it.
