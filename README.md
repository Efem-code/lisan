# Lisan

Arabic and Urdu, taught the way Duolingo teaches: a path of short lessons,
hearts, a streak, a daily goal, and the same handful of exercise types drilled
until the words stick. Both courses start at the alphabet and assume you cannot
read a word of the script.

No account, no subscription, no network. Everything runs on the phone.

---

## Getting it onto the phone

```bash
./phone.sh
```

Then on the phone, in your browser's **⋮ menu → Add to Home screen** (Brave) or
**Install app** (Chrome). Unplug once it has loaded; it works offline from then
on. Re-run `./phone.sh` to push an update — the service worker picks it up on the
next launch.

The cable is needed because `adb reverse` makes the Mac's server reachable from
the phone on loopback, and browsers only allow service workers and home-screen
installs on secure origins. Loopback counts; a Wi-Fi address like `192.168.1.20`
does not.

The URL is `http://lisan.localhost:8779` rather than plain `localhost`, because
an installed web app claims its whole host on Android regardless of port — one
app on plain `localhost` will otherwise intercept every other one. The Gambit
README has the longer version.

---

## What is in it

**Two courses.** Modern Standard Arabic and Urdu, switchable from the chip at
the top left. They keep separate progress, so working on both does not have them
fighting over one streak.

| | Arabic | Urdu |
|---|---|---|
| Alphabet units | 4 (28 letters) | 5 (37 letters) |
| Vocabulary units | 8 | 8 |
| Words | 122 | 108 |
| Sentences | 36 | 32 |
| Lessons | 46 | 48 |

**The alphabet comes first, and it teaches joining.** Both scripts are cursive: a
letter is a different shape at the start, middle and end of a word, and six
Arabic letters refuse to join to whatever follows them. Learning only the
isolated forms — which is what most alphabet charts give you — leaves you unable
to read an actual word. Every letter is introduced with all four of its forms,
and there is an exercise type that shows a letter mid-word and asks which one it
is.

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

**Pronunciation.** Every word and sentence is introduced three ways at once:

> **صَباحُ الخَيْر**
> **sa-baa-hu l-khayr**  ← plain respelling, syllable by syllable
> *ṣabāḥu l-khayr*  ← the academic transliteration
> good morning
> 🔊  **SLOW**
>
> **SOUNDS TO WATCH**
> **ṣ** A heavy s, tongue low and the mouth full.
> **ḥ** A hard h from deep in the throat — breathe out as if fogging a window.
> **kh** Like the ch in Scottish "loch", or clearing your throat.

The respelling is generated from the transliteration rather than written by
hand, so it never drifts out of step with the content: long vowels are spelled
out (`ā` → `aa`), diphthongs are kept whole (`alaikum` → `a-lai-kum`, not
`a-la-i-kum`), the article and izafat hyphens survive, and nothing carrying a dot
or a macron is allowed through — the whole point is that it reads without knowing
the notation. The sounds English genuinely does not have are handled by the notes
instead of being flattened into a nearest-miss, because "ḥ = h" would teach the
wrong sound.

There are two audio buttons everywhere a word is taught: normal speed, and a
much slower reading for pulling a word apart. The respelling and the notes appear
only where something is being *taught* — never on a question, where they would
give the answer away.

**Practice** pulls whatever is weakest or most overdue. Each item tracks its own
strength 0–5; a correct answer pushes the next review out (4 hours → 1 day → 3
days → 1 week → 3 weeks), a wrong one drops it back to the start.

**Words** lists everything in the course with its strength, and a button to hear
each one. Items you have not met yet are dimmed but still browsable.

---

## Honest limitations

**Audio depends on your phone, not on this app.** It uses the device's own
text-to-speech. Arabic voices are usually present on Android; Urdu often is not.
When no voice for the course is installed, the listening exercises are left out
of every lesson rather than played in the wrong accent — a Hindi or English voice
reading Urdu teaches the wrong pronunciation, which is worse than no audio. To
add one: Android **Settings → General management → Text-to-speech → Preferred
engine → install voice data**. The Settings sheet tells you which voice it found.

**Urdu needs a Nastaliq font to look right.** Urdu is properly written in the
sloping Nastaliq style, not the Naskh style used for Arabic. Samsung devices
normally ship one. If yours does not, Urdu falls back to Naskh — still perfectly
readable, just not how Urdu is normally set.

**Romanisation is a crutch with a cost.** The academic transliteration is on by
default and there is a switch to turn it off in Settings. Turn it off as soon as
you can stand to: as long as it is there you will read it instead of the script,
and the script is the thing you are here for. (The plain respelling and the sound
notes stay either way — they only appear on teaching screens, not on questions,
so they cannot be read instead of the script when it actually counts.)

**The Arabic is fully vowelled.** Real Arabic text almost never writes the short
vowels — `كَيْفَ حالُك` appears in the wild as `كيف حالك`. The vowels are here
because without them a beginner cannot pronounce anything, but be aware you are
reading training wheels.

**Urdu verbs change with your gender.** `پیتا ہوں` is what a man says; a woman
says `پیتی ہوں`. The course teaches the masculine forms and flags this where it
comes up, which is a real gap rather than a design decision — it is simply not
handled yet.

**This is a beginner course.** Roughly 230 words and 68 sentences per the table
above. That is enough to greet people, order food, ask where something is and
read the script — it is not enough to hold a conversation.

---

## Checking the content

The course data is validated rather than trusted: every alphabet unit must
reference real letters, every word needs all three of script, romanisation and
English, no word may appear in two units, and every sentence must have at least
two tokens on both sides (a word-bank exercise needs something to build).

```bash
node -e "
global.Alphabet=require('./alphabet.js');
const p=require('./courses.js').verify();
console.log(p.length ? p : 'course content ok');
"
```

The exercise generator is checked separately — every generated multiple choice
must have exactly one correct option and no duplicate labels, and every word bank
must actually contain the words needed to build its answer:

```bash
node -e "
global.Alphabet=require('./alphabet.js'); global.Courses=require('./courses.js');
const L=require('./lesson.js');
let bad=0, n=0;
Courses.ALL.forEach(c => L.planCourse(c).forEach(node => {
  L.buildExercises(c, node.spec, {canSpeak:true}).forEach(e => {
    n++;
    if (e.options) {
      if (e.options.filter(o=>o.correct).length !== 1) bad++;
      if (new Set(e.options.map(o=>o.label)).size !== e.options.length) bad++;
    }
    if (e.type==='build' && !e.answer.every(w=>e.bank.includes(w))) bad++;
  });
}));
console.log(n + ' exercises generated, ' + bad + ' problems');
"
```

---

## Files

| | |
|---|---|
| `alphabet.js` | Both alphabets, with contextual forms built from the zero-width joiner |
| `courses.js` | All the words and sentences, plus `verify()` |
| `lesson.js` | Turns content into exercises; the spaced-repetition schedule |
| `pron.js` | Transliteration → plain respelling, and the sound notes |
| `tts.js` | Device speech, and deciding whether a usable voice exists |
| `store.js` | localStorage: progress, hearts, streak, XP |
| `app.js` | Path, lesson runner, practice, word list |
| `phone.sh` | USB install |
| `make-icons.py` | Launcher icons |

---

## Your data

Progress, streak and XP live in `localStorage` on the phone and are never
uploaded. Settings → **Export data** writes a JSON backup. Clearing the browser's
site data, or uninstalling, loses it.
