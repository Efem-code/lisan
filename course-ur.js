/* Lisan — the Urdu course.
 *
 * One file per language. Each registers itself with the shared registry in
 * courses.js, which is loaded first. Splitting them up keeps any one file
 * reviewable: a course is a few hundred hand-checked words, and a mistake in
 * one language should never be buried in a file containing six.
 *
 * Fields on every entry:
 *   t  the word as written
 *   e  the English meaning
 *   r  romanisation (non-Latin scripts only)
 *   p  an explicit pronunciation respelling, where deriving one would be wrong
 *   n  a note shown when the word is introduced
 *   g  grammatical gender, where the language has it
 */

(function () {
'use strict';

var URDU = {
  id: 'ur',
  name: 'Urdu',
  native: 'اردو',
  dir: 'rtl',
  speech: ['ur-PK', 'ur', 'hi-IN'],
  script: 'nastaliq',
  romanized: true,
  hasAlphabet: true,
  order: 2,
  blurb: 'Urdu as spoken in Pakistan and northern India. Shares its script with Arabic, but almost none of its grammar.',
  grammar: {
    wordOrder: 'Urdu puts the verb at the very end, after everything else — میں چائے پیتا ہوں is literally "I tea drink".'
  },
  units: [
    { id: 'ur-a1', kind: 'alphabet', title: 'Alphabet 1', letters: 'ابپتٹثج',
      blurb: 'The first seven, including two letters Arabic does not have.' },
    { id: 'ur-a2', kind: 'alphabet', title: 'Alphabet 2', letters: 'چحخدڈذر',
      blurb: 'The retroflex letters — made with the tongue curled back.' },
    { id: 'ur-a3', kind: 'alphabet', title: 'Alphabet 3', letters: 'ڑزژسشصض',
      blurb: 'Four letters that all sound like z. Only the spelling differs.' },
    { id: 'ur-a4', kind: 'alphabet', title: 'Alphabet 4', letters: 'طظعغفقک',
      blurb: 'Letters borrowed from Arabic, said the Urdu way.' },
    { id: 'ur-a5', kind: 'alphabet', title: 'Alphabet 5', letters: 'گلمنوہھیے',
      blurb: 'The last nine, including the two forms of h and the big ye.' },

    { id: 'ur-greet', kind: 'words', title: 'Greetings',
      blurb: 'Enough to start and end a conversation politely.',
      vocab: [
        { t: 'السلام علیکم', r: 'as-salām-o-alaikum', e: 'peace be upon you', n: 'The standard greeting. Works at any time of day.' },
        { t: 'وعلیکم السلام', r: 'wa-alaikum as-salām', e: 'and peace be upon you', n: 'The fixed reply.' },
        { t: 'آداب', r: 'ādāb', e: 'greetings', n: 'A courteous, non-religious alternative.' },
        { t: 'خوش آمدید', r: 'khush āmdīd', e: 'welcome' },
        { t: 'شکریہ', r: 'shukriya', e: 'thank you' },
        { t: 'مہربانی', r: 'mehrbānī', e: 'please' },
        { t: 'جی ہاں', r: 'jī hān', e: 'yes' },
        { t: 'جی نہیں', r: 'jī nahīn', e: 'no' },
        { t: 'معاف کیجیے', r: 'muāf kījiye', e: 'excuse me' },
        { t: 'خدا حافظ', r: 'khudā ḥāfiz', e: 'goodbye' },
        { t: 'ٹھیک', r: 'ṭhīk', e: 'fine' },
        { t: 'کیسے', r: 'kaise', e: 'how' }
      ],
      sentences: [
        { t: 'آپ کیسے ہیں ؟', r: 'āp kaise hain?', e: 'how are you ?' },
        { t: 'میں ٹھیک ہوں شکریہ', r: 'main ṭhīk hūn, shukriya', e: 'I am fine , thank you' },
        { t: 'آپ کا نام کیا ہے ؟', r: 'āp kā nām kyā hai?', e: 'what is your name ?' },
        { t: 'میرا نام احمد ہے', r: 'merā nām Ahmad hai', e: 'my name is Ahmad' }
      ] },

    { id: 'ur-people', kind: 'words', title: 'People',
      blurb: 'Pronouns and family.',
      vocab: [
        { t: 'میں', r: 'main', e: 'I' },
        { t: 'آپ', r: 'āp', e: 'you', n: 'The polite form. تم tum is casual, and تو tū is for close friends or children only.' },
        { t: 'وہ', r: 'voh', e: 'he' },
        { t: 'ہم', r: 'ham', e: 'we' },
        { t: 'آدمی', r: 'ādmī', e: 'man' },
        { t: 'عورت', r: 'aurat', e: 'woman' },
        { t: 'لڑکا', r: 'laṛkā', e: 'boy' },
        { t: 'لڑکی', r: 'laṛkī', e: 'girl' },
        { t: 'والد', r: 'wālid', e: 'father' },
        { t: 'والدہ', r: 'wālida', e: 'mother' },
        { t: 'بھائی', r: 'bhāī', e: 'brother' },
        { t: 'بہن', r: 'bahan', e: 'sister' },
        { t: 'بیٹا', r: 'beṭā', e: 'son' },
        { t: 'بیٹی', r: 'beṭī', e: 'daughter' },
        { t: 'دوست', r: 'dost', e: 'friend' },
        { t: 'خاندان', r: 'khāndān', e: 'family' },
        { t: 'استاد', r: 'ustād', e: 'teacher' }
      ],
      sentences: [
        { t: 'میں طالب علم ہوں', r: 'main tālib-e-ilm hūn', e: 'I am a student', n: 'The verb comes last in Urdu. Literally: "I student am".' },
        { t: 'وہ استاد ہے', r: 'voh ustād hai', e: 'he is a teacher' },
        { t: 'یہ میرا دوست ہے', r: 'yeh merā dost hai', e: 'this is my friend' },
        { t: 'میرا ایک بھائی ہے', r: 'merā ek bhāī hai', e: 'I have one brother' }
      ] },

    { id: 'ur-food', kind: 'words', title: 'Food and drink',
      blurb: 'Ordering, and saying what you like.',
      vocab: [
        { t: 'پانی', r: 'pānī', e: 'water' },
        { t: 'روٹی', r: 'roṭī', e: 'bread' },
        { t: 'چاول', r: 'chāwal', e: 'rice' },
        { t: 'گوشت', r: 'gosht', e: 'meat' },
        { t: 'مرغی', r: 'murghī', e: 'chicken' },
        { t: 'مچھلی', r: 'machhlī', e: 'fish' },
        { t: 'انڈا', r: 'anḍā', e: 'egg' },
        { t: 'دودھ', r: 'dūdh', e: 'milk' },
        { t: 'چائے', r: 'chāy', e: 'tea' },
        { t: 'پھل', r: 'phal', e: 'fruit' },
        { t: 'سیب', r: 'seb', e: 'apple' },
        { t: 'چینی', r: 'chīnī', e: 'sugar' },
        { t: 'نمک', r: 'namak', e: 'salt' },
        { t: 'کھانا', r: 'khānā', e: 'food' },
        { t: 'مزیدار', r: 'mazedār', e: 'delicious' }
      ],
      sentences: [
        { t: 'روٹی مزیدار ہے', r: 'roṭī mazedār hai', e: 'the bread is delicious' },
        { t: 'مجھے پانی چاہیے', r: 'mujhe pānī chāhiye', e: 'I want water', n: 'مجھے mujhe is "to me" — Urdu says "to me water is needed".' },
        { t: 'میں چائے پیتا ہوں', r: 'main chāy pītā hūn', e: 'I drink tea', n: 'A woman says پیتی ہوں pītī hūn. Urdu verbs agree with the speaker\'s gender.' },
        { t: 'مجھے چائے پسند ہے', r: 'mujhe chāy pasand hai', e: 'I like tea' }
      ] },

    { id: 'ur-num', kind: 'words', title: 'Numbers',
      blurb: 'One to ten, and asking how much.',
      vocab: [
        { t: 'ایک', r: 'ek', e: 'one' },
        { t: 'دو', r: 'do', e: 'two' },
        { t: 'تین', r: 'tīn', e: 'three' },
        { t: 'چار', r: 'chār', e: 'four' },
        { t: 'پانچ', r: 'pānch', e: 'five' },
        { t: 'چھ', r: 'chhe', e: 'six' },
        { t: 'سات', r: 'sāt', e: 'seven' },
        { t: 'آٹھ', r: 'āṭh', e: 'eight' },
        { t: 'نو', r: 'nau', e: 'nine' },
        { t: 'دس', r: 'das', e: 'ten' },
        { t: 'بیس', r: 'bīs', e: 'twenty' },
        { t: 'سو', r: 'sau', e: 'hundred' },
        { t: 'کتنا', r: 'kitnā', e: 'how much' }
      ],
      sentences: [
        { t: 'یہ کتنا ہے ؟', r: 'yeh kitnā hai?', e: 'how much is this ?' },
        { t: 'میرے پاس دو ہیں', r: 'mere pās do hain', e: 'I have two' },
        { t: 'پانچ روٹی مہربانی', r: 'pānch roṭī mehrbānī', e: 'five bread please' }
      ] },

    { id: 'ur-place', kind: 'words', title: 'Places',
      blurb: 'Getting around and asking where things are.',
      vocab: [
        { t: 'گھر', r: 'ghar', e: 'house' },
        { t: 'سکول', r: 'skūl', e: 'school' },
        { t: 'بازار', r: 'bāzār', e: 'market' },
        { t: 'شہر', r: 'shahr', e: 'city' },
        { t: 'سڑک', r: 'saṛak', e: 'road' },
        { t: 'ہوٹل', r: 'hoṭal', e: 'hotel' },
        { t: 'ہسپتال', r: 'haspatāl', e: 'hospital' },
        { t: 'دفتر', r: 'daftar', e: 'office' },
        { t: 'گاڑی', r: 'gāṛī', e: 'car' },
        { t: 'کہاں', r: 'kahān', e: 'where' },
        { t: 'یہاں', r: 'yahān', e: 'here' },
        { t: 'وہاں', r: 'wahān', e: 'there' }
      ],
      sentences: [
        { t: 'بازار کہاں ہے ؟', r: 'bāzār kahān hai?', e: 'where is the market ?' },
        { t: 'گھر یہاں ہے', r: 'ghar yahān hai', e: 'the house is here' },
        { t: 'میں سکول جاتا ہوں', r: 'main skūl jātā hūn', e: 'I go to school' },
        { t: 'شہر بڑا ہے', r: 'shahr baṛā hai', e: 'the city is big' }
      ] },

    { id: 'ur-verbs', kind: 'words', title: 'Everyday verbs',
      blurb: 'What you do. A man says ـتا ہوں, a woman ـتی ہوں.',
      vocab: [
        { t: 'جاتا ہوں', r: 'jātā hūn', e: 'I go' },
        { t: 'بولتا ہوں', r: 'boltā hūn', e: 'I speak' },
        { t: 'پڑھتا ہوں', r: 'paṛhtā hūn', e: 'I read' },
        { t: 'لکھتا ہوں', r: 'likhtā hūn', e: 'I write' },
        { t: 'کھاتا ہوں', r: 'khātā hūn', e: 'I eat' },
        { t: 'پیتا ہوں', r: 'pītā hūn', e: 'I drink' },
        { t: 'رہتا ہوں', r: 'rahtā hūn', e: 'I live' },
        { t: 'جانتا ہوں', r: 'jāntā hūn', e: 'I know' },
        { t: 'سمجھتا ہوں', r: 'samajhtā hūn', e: 'I understand' },
        { t: 'کام کرتا ہوں', r: 'kām kartā hūn', e: 'I work' },
        { t: 'چاہیے', r: 'chāhiye', e: 'want' },
        { t: 'پسند', r: 'pasand', e: 'liked' }
      ],
      sentences: [
        { t: 'میں اردو بولتا ہوں', r: 'main urdū boltā hūn', e: 'I speak Urdu' },
        { t: 'میں نہیں سمجھتا', r: 'main nahīn samajhtā', e: 'I do not understand', n: 'نہیں nahīn goes before the verb to make it negative.' },
        { t: 'میں شہر میں رہتا ہوں', r: 'main shahr men rahtā hūn', e: 'I live in the city' },
        { t: 'کیا آپ انگریزی بولتے ہیں ؟', r: 'kyā āp angrezī bolte hain?', e: 'do you speak English ?', n: 'کیا kyā at the front turns a statement into a yes/no question.' }
      ] },

    { id: 'ur-desc', kind: 'words', title: 'Describing things',
      blurb: 'Adjectives, which come before the noun as in English.',
      vocab: [
        { t: 'بڑا', r: 'baṛā', e: 'big' },
        { t: 'چھوٹا', r: 'chhoṭā', e: 'small' },
        { t: 'نیا', r: 'nayā', e: 'new' },
        { t: 'پرانا', r: 'purānā', e: 'old' },
        { t: 'خوبصورت', r: 'khūbsūrat', e: 'beautiful' },
        { t: 'خوش', r: 'khush', e: 'happy' },
        { t: 'اچھا', r: 'achchhā', e: 'good' },
        { t: 'برا', r: 'burā', e: 'bad' },
        { t: 'بہت', r: 'bahut', e: 'very' },
        { t: 'تھوڑا', r: 'thoṛā', e: 'a little' },
        { t: 'گرم', r: 'garm', e: 'hot' },
        { t: 'ٹھنڈا', r: 'ṭhanḍā', e: 'cold' },
        { t: 'مشکل', r: 'mushkil', e: 'difficult' },
        { t: 'آسان', r: 'āsān', e: 'easy' }
      ],
      sentences: [
        { t: 'گھر بہت بڑا ہے', r: 'ghar bahut baṛā hai', e: 'the house is very big' },
        { t: 'پانی ٹھنڈا ہے', r: 'pānī ṭhanḍā hai', e: 'the water is cold' },
        { t: 'یہ نئی گاڑی ہے', r: 'yeh naī gāṛī hai', e: 'this is a new car' },
        { t: 'اردو آسان ہے', r: 'urdū āsān hai', e: 'Urdu is easy' }
      ] },

    { id: 'ur-time', kind: 'words', title: 'Questions and time',
      blurb: 'The question words, and when things happen.',
      vocab: [
        { t: 'کیا', r: 'kyā', e: 'what', n: 'Also the past tense of "to do", and the marker that turns a statement into a yes/no question. Three jobs, one spelling.' },
        { t: 'کون', r: 'kaun', e: 'who' },
        { t: 'کب', r: 'kab', e: 'when' },
        { t: 'کیوں', r: 'kyūn', e: 'why' },
        { t: 'آج', r: 'āj', e: 'today' },
        { t: 'کل', r: 'kal', e: 'tomorrow', n: 'کل means both tomorrow and yesterday. The verb tense tells you which.' },
        { t: 'ابھی', r: 'abhī', e: 'now' },
        { t: 'صبح', r: 'subah', e: 'morning' },
        { t: 'شام', r: 'shām', e: 'evening' },
        { t: 'رات', r: 'rāt', e: 'night' },
        { t: 'دن', r: 'din', e: 'day' },
        { t: 'ہفتہ', r: 'haftah', e: 'week' },
        { t: 'وقت', r: 'waqt', e: 'time' }
      ],
      sentences: [
        { t: 'یہ کیا ہے ؟', r: 'yeh kyā hai?', e: 'what is this ?' },
        { t: 'وہ کون ہے ؟', r: 'voh kaun hai?', e: 'who is he ?' },
        { t: 'آپ کب جاتے ہیں ؟', r: 'āp kab jāte hain?', e: 'when do you go ?' },
        { t: 'میں آج جاتا ہوں', r: 'main āj jātā hūn', e: 'I go today' },
        { t: 'کیا وقت ہوا ہے ؟', r: 'kyā waqt huā hai?', e: 'what time is it ?' }
      ] },

    { id: 'ur-shop', kind: 'words', title: 'Shopping and money',
      blurb: 'Buying things, and asking the price.',
      vocab: [
        { t: 'پیسہ', r: 'paisa', e: 'money' },
        { t: 'قیمت', r: 'qīmat', e: 'price' },
        { t: 'کارڈ', r: 'kārḍ', e: 'card' },
        { t: 'خریدتا ہوں', r: 'kharīdtā hūn', e: 'I buy' },
        { t: 'بیچتا ہوں', r: 'bechtā hūn', e: 'I sell' },
        { t: 'کپڑے', r: 'kapṛe', e: 'clothes' },
        { t: 'قمیض', r: 'qamīz', e: 'shirt' },
        { t: 'جوتا', r: 'jūtā', e: 'shoe' },
        { t: 'بیگ', r: 'baig', e: 'bag' },
        { t: 'تحفہ', r: 'tuhfah', e: 'gift' },
        { t: 'کھلا', r: 'khulā', e: 'open' },
        { t: 'بند', r: 'band', e: 'closed' },
        { t: 'مفت', r: 'muft', e: 'free of charge' },
        { t: 'دوسرا', r: 'dūsrā', e: 'another' },
        { t: 'مہنگا', r: 'mahangā', e: 'expensive' },
        { t: 'سستا', r: 'sastā', e: 'cheap' }
      ],
      sentences: [
        { t: 'یہ قمیض کتنی ہے ؟', r: 'yeh qamīz kitnī hai?', e: 'how much is this shirt ?' },
        { t: 'میں کارڈ سے دوں گا', r: 'main kārḍ se dūn gā', e: 'I will pay by card' },
        { t: 'یہ بہت مہنگا ہے', r: 'yeh bahut mahangā hai', e: 'this is very expensive' },
        { t: 'دکان بند ہے', r: 'dukān band hai', e: 'the shop is closed' },
        { t: 'میں تحفہ خریدتا ہوں', r: 'main tuhfah kharīdtā hūn', e: 'I am buying a gift' }
      ] },

    { id: 'ur-home', kind: 'words', title: 'Home and routine',
      blurb: 'The house, and the shape of a day.',
      vocab: [
        { t: 'دروازہ', r: 'darwāzah', e: 'door' },
        { t: 'کھڑکی', r: 'khiṛkī', e: 'window' },
        { t: 'میز', r: 'mez', e: 'table' },
        { t: 'کرسی', r: 'kursī', e: 'chair' },
        { t: 'بستر', r: 'bistar', e: 'bed' },
        { t: 'باورچی خانہ', r: 'bāwarchī khānah', e: 'kitchen' },
        { t: 'کمرہ', r: 'kamrah', e: 'room' },
        { t: 'چابی', r: 'chābī', e: 'key' },
        { t: 'کتاب', r: 'kitāb', e: 'book' },
        { t: 'سوتا ہوں', r: 'sotā hūn', e: 'I sleep' },
        { t: 'اٹھتا ہوں', r: 'uṭhtā hūn', e: 'I get up' },
        { t: 'دھوتا ہوں', r: 'dhotā hūn', e: 'I wash' },
        { t: 'صاف کرتا ہوں', r: 'sāf kartā hūn', e: 'I clean' },
        { t: 'پکاتا ہوں', r: 'pakātā hūn', e: 'I cook' },
        { t: 'کھولتا ہوں', r: 'kholtā hūn', e: 'I open' },
        { t: 'ڈھونڈتا ہوں', r: 'ḍhūnḍtā hūn', e: 'I search' }
      ],
      sentences: [
        { t: 'میں سات بجے اٹھتا ہوں', r: 'main sāt baje uṭhtā hūn', e: 'I get up at seven' },
        { t: 'میں روز پکاتا ہوں', r: 'main roz pakātā hūn', e: 'I cook every day' },
        { t: 'کتاب میز پر ہے', r: 'kitāb mez par hai', e: 'the book is on the table' },
        { t: 'میں اپنی چابی ڈھونڈتا ہوں', r: 'main apnī chābī ḍhūnḍtā hūn', e: 'I am looking for my key' },
        { t: 'کیا آپ کھڑکی کھول سکتے ہیں ؟', r: 'kyā āp khiṛkī khol sakte hain?', e: 'can you open the window ?' }
      ] },

    { id: 'ur-travel', kind: 'words', title: 'Travel',
      blurb: 'Getting from one place to another.',
      vocab: [
        { t: 'ٹکٹ', r: 'ṭikaṭ', e: 'ticket' },
        { t: 'سامان', r: 'sāmān', e: 'luggage' },
        { t: 'سفر', r: 'safar', e: 'journey' },
        { t: 'اسٹیشن', r: 'sṭeshan', e: 'station' },
        { t: 'نقشہ', r: 'naqshah', e: 'map' },
        { t: 'جہاز', r: 'jahāz', e: 'aeroplane' },
        { t: 'بس', r: 'bas', e: 'bus' },
        { t: 'سفر کرتا ہوں', r: 'safar kartā hūn', e: 'I travel' },
        { t: 'پہنچتا ہوں', r: 'pahunchtā hūn', e: 'I arrive' },
        { t: 'نکلتا ہوں', r: 'nikaltā hūn', e: 'I depart' },
        { t: 'انتظار کرتا ہوں', r: 'intizār kartā hūn', e: 'I wait' },
        { t: 'چلتا ہوں', r: 'chaltā hūn', e: 'I walk' },
        { t: 'ملک', r: 'mulk', e: 'country' },
        { t: 'دنیا', r: 'duniyā', e: 'world' },
        { t: 'پاسپورٹ', r: 'pāsporṭ', e: 'passport' },
        { t: 'دور', r: 'dūr', e: 'far' }
      ],
      sentences: [
        { t: 'ریل گاڑی کب نکلتی ہے ؟', r: 'rel gāṛī kab nikaltī hai?', e: 'when does the train leave ?' },
        { t: 'مجھے لاہور کا ٹکٹ چاہیے', r: 'mujhe Lāhaur kā ṭikaṭ chāhiye', e: 'I want a ticket to Lahore' },
        { t: 'اسٹیشن کہاں ہے ؟', r: 'sṭeshan kahān hai?', e: 'where is the station ?' },
        { t: 'میرا سامان کھو گیا', r: 'merā sāmān kho gayā', e: 'my luggage is lost' },
        { t: 'میں کل سفر کروں گا', r: 'main kal safar karūn gā', e: 'I will travel tomorrow' }
      ] },

    { id: 'ur-past', kind: 'words', title: 'The past',
      blurb: 'Saying what happened.',
      vocab: [
        { t: 'گیا', r: 'gayā', e: 'went' },
        { t: 'کھایا', r: 'khāyā', e: 'ate' },
        { t: 'پیا', r: 'piyā', e: 'drank' },
        { t: 'دیکھا', r: 'dekhā', e: 'saw' },
        { t: 'کہا', r: 'kahā', e: 'said' },
        { t: 'آیا', r: 'āyā', e: 'came' },
        { t: 'تھا', r: 'thā', e: 'was', n: 'تھا for a masculine subject, تھی for a feminine one.' },
        { t: 'پیدا ہوا', r: 'paidā huā', e: 'was born' },
        { t: 'ملا', r: 'milā', e: 'met' },
        { t: 'بھول گیا', r: 'bhūl gayā', e: 'forgot' },
        { t: 'کل رات', r: 'kal rāt', e: 'last night' },
        { t: 'پچھلے ہفتے', r: 'pichhle hafte', e: 'last week' },
        { t: 'پہلے', r: 'pahle', e: 'before' },
        { t: 'بعد میں', r: 'baad men', e: 'afterwards' }
      ],
      sentences: [
        { t: 'کل میں بازار گیا', r: 'kal main bāzār gayā', e: 'yesterday I went to the market' },
        { t: 'میں نے کھانا کھایا', r: 'main ne khānā khāyā', e: 'I ate food', n: 'نے appears with past transitive verbs — a quirk of Urdu with no English equivalent.' },
        { t: 'آپ نے کیا کیا ؟', r: 'āp ne kyā kiyā?', e: 'what did you do ?' },
        { t: 'میں کینیڈا میں پیدا ہوا', r: 'main Kaineḍā men paidā huā', e: 'I was born in Canada' },
        { t: 'میں اس کا نام بھول گیا', r: 'main us kā nām bhūl gayā', e: 'I forgot his name' }
      ] },

    { id: 'ur-future', kind: 'words', title: 'Plans and the future',
      blurb: 'What you are going to do.',
      vocab: [
        { t: 'کروں گا', r: 'karūn gā', e: 'I will do', n: 'گا for a man, گی for a woman. The ending agrees with the speaker.' },
        { t: 'جاؤں گا', r: 'jāūn gā', e: 'I will go' },
        { t: 'سکتا ہوں', r: 'saktā hūn', e: 'I can' },
        { t: 'کوشش کرتا ہوں', r: 'koshish kartā hūn', e: 'I try' },
        { t: 'شروع کرتا ہوں', r: 'shurū kartā hūn', e: 'I begin' },
        { t: 'ختم کرتا ہوں', r: 'khatm kartā hūn', e: 'I finish' },
        { t: 'منصوبہ', r: 'mansūbah', e: 'plan' },
        { t: 'جلد', r: 'jald', e: 'soon' },
        { t: 'اگلا', r: 'aglā', e: 'next' },
        { t: 'ساتھ', r: 'sāth', e: 'together' },
        { t: 'امید', r: 'umīd', e: 'hope' },
        { t: 'مدد', r: 'madad', e: 'help' },
        { t: 'ضرور', r: 'zarūr', e: 'certainly' },
        { t: 'شاید', r: 'shāyad', e: 'perhaps' }
      ],
      sentences: [
        { t: 'میں اردو سیکھوں گا', r: 'main urdū sīkhūn gā', e: 'I will learn Urdu' },
        { t: 'کیا آپ میری مدد کر سکتے ہیں ؟', r: 'kyā āp merī madad kar sakte hain?', e: 'can you help me ?' },
        { t: 'مجھے کل کام کرنا ہے', r: 'mujhe kal kām karnā hai', e: 'I have to work tomorrow' },
        { t: 'ہم ساتھ کھائیں گے', r: 'ham sāth khāen ge', e: 'we will eat together' },
        { t: 'مجھے امید ہے', r: 'mujhe umīd hai', e: 'I hope so' }
      ] },

    { id: 'ur-body', kind: 'words', title: 'Health and the body',
      blurb: 'Saying what hurts.',
      vocab: [
        { t: 'سر', r: 'sar', e: 'head' },
        { t: 'آنکھ', r: 'ānkh', e: 'eye' },
        { t: 'منہ', r: 'munh', e: 'mouth' },
        { t: 'ہاتھ', r: 'hāth', e: 'hand' },
        { t: 'پاؤں', r: 'pāon', e: 'foot' },
        { t: 'بازو', r: 'bāzū', e: 'arm' },
        { t: 'ٹانگ', r: 'ṭāng', e: 'leg' },
        { t: 'پیٹ', r: 'peṭ', e: 'stomach' },
        { t: 'کمر', r: 'kamar', e: 'back' },
        { t: 'دل', r: 'dil', e: 'heart' },
        { t: 'بیمار', r: 'bīmār', e: 'ill' },
        { t: 'درد', r: 'dard', e: 'pain' },
        { t: 'دوا', r: 'dawā', e: 'medicine' },
        { t: 'ڈاکٹر', r: 'ḍākṭar', e: 'doctor' },
        { t: 'محسوس کرتا ہوں', r: 'mahsūs kartā hūn', e: 'I feel' }
      ],
      sentences: [
        { t: 'میرے سر میں درد ہے', r: 'mere sar men dard hai', e: 'my head hurts' },
        { t: 'میں آج بیمار ہوں', r: 'main āj bīmār hūn', e: 'I am ill today' },
        { t: 'آپ کیسا محسوس کرتے ہیں ؟', r: 'āp kaisā mahsūs karte hain?', e: 'how do you feel ?' },
        { t: 'مجھے ڈاکٹر چاہیے', r: 'mujhe ḍākṭar chāhiye', e: 'I need a doctor' },
        { t: 'مجھے دوا چاہیے', r: 'mujhe dawā chāhiye', e: 'I need medicine' }
      ] },

    { id: 'ur-weather', kind: 'words', title: 'Weather and seasons',
      blurb: 'Small talk, everywhere.',
      vocab: [
        { t: 'موسم', r: 'mausam', e: 'weather' },
        { t: 'سورج', r: 'sūraj', e: 'sun' },
        { t: 'بارش', r: 'bārish', e: 'rain' },
        { t: 'برف', r: 'barf', e: 'snow' },
        { t: 'ہوا', r: 'hawā', e: 'wind' },
        { t: 'بادل', r: 'bādal', e: 'cloud' },
        { t: 'سردی', r: 'sardī', e: 'winter' },
        { t: 'بہار', r: 'bahār', e: 'spring' },
        { t: 'گرمی', r: 'garmī', e: 'summer' },
        { t: 'خزاں', r: 'khizān', e: 'autumn' },
        { t: 'باہر', r: 'bāhar', e: 'outside' },
        { t: 'اندر', r: 'andar', e: 'inside' },
        { t: 'گرم ہے', r: 'garm hai', e: 'it is hot' }
      ],
      sentences: [
        { t: 'آج بہت ٹھنڈ ہے', r: 'āj bahut ṭhanḍ hai', e: 'today it is very cold' },
        { t: 'باہر بارش ہو رہی ہے', r: 'bāhar bārish ho rahī hai', e: 'it is raining outside' },
        { t: 'سردی میں برف پڑتی ہے', r: 'sardī men barf paṛtī hai', e: 'in winter snow falls' },
        { t: 'موسم کیسا ہے ؟', r: 'mausam kaisā hai?', e: 'what is the weather like ?' },
        { t: 'مجھے بہار پسند ہے', r: 'mujhe bahār pasand hai', e: 'I like the spring' }
      ] },

    { id: 'ur-feel', kind: 'words', title: 'Feelings and opinions',
      blurb: 'Saying what you think.',
      vocab: [
        { t: 'اداس', r: 'udās', e: 'sad' },
        { t: 'غصہ', r: 'ghussah', e: 'anger' },
        { t: 'پریشان', r: 'pareshān', e: 'worried' },
        { t: 'پرسکون', r: 'pursukūn', e: 'calm' },
        { t: 'تھکا', r: 'thakā', e: 'tired' },
        { t: 'سوچتا ہوں', r: 'sochtā hūn', e: 'I think' },
        { t: 'مانتا ہوں', r: 'māntā hūn', e: 'I believe' },
        { t: 'محبت', r: 'mohabbat', e: 'love' },
        { t: 'نفرت', r: 'nafrat', e: 'hatred' },
        { t: 'خیال', r: 'khayāl', e: 'idea' },
        { t: 'سچ', r: 'sach', e: 'truth' },
        { t: 'متفق', r: 'muttafiq', e: 'in agreement' },
        { t: 'شاندار', r: 'shāndār', e: 'wonderful' },
        { t: 'بورنگ', r: 'boring', e: 'boring' }
      ],
      sentences: [
        { t: 'میں سمجھتا ہوں آپ ٹھیک ہیں', r: 'main samajhtā hūn āp ṭhīk hain', e: 'I think you are right' },
        { t: 'میں آج بہت خوش ہوں', r: 'main āj bahut khush hūn', e: 'I am very happy today' },
        { t: 'میں متفق نہیں ہوں', r: 'main muttafiq nahīn hūn', e: 'I do not agree' },
        { t: 'آپ کا کیا خیال ہے ؟', r: 'āp kā kyā khayāl hai?', e: 'what do you think ?' },
        { t: 'میں آج تھکا ہوں', r: 'main āj thakā hūn', e: 'I am tired today' }
      ] },

    { id: 'ur-work', kind: 'words', title: 'Work and study',
      blurb: 'What you do, and what you are learning.',
      vocab: [
        { t: 'کام', r: 'kām', e: 'work' },
        { t: 'کمپنی', r: 'kampanī', e: 'company' },
        { t: 'باس', r: 'bās', e: 'boss' },
        { t: 'میٹنگ', r: 'meṭing', e: 'meeting' },
        { t: 'یونیورسٹی', r: 'yūnīwarsiṭī', e: 'university' },
        { t: 'سبق', r: 'sabaq', e: 'lesson' },
        { t: 'امتحان', r: 'imtihān', e: 'exam' },
        { t: 'سوال', r: 'sawāl', e: 'question' },
        { t: 'جواب', r: 'jawāb', e: 'answer' },
        { t: 'سیکھتا ہوں', r: 'sīkhtā hūn', e: 'I learn' },
        { t: 'سکھاتا ہوں', r: 'sikhātā hūn', e: 'I teach' },
        { t: 'مشق', r: 'mashq', e: 'practice' },
        { t: 'لفظ', r: 'lafz', e: 'word' },
        { t: 'زبان', r: 'zabān', e: 'language', n: 'Also means "tongue".' }
      ],
      sentences: [
        { t: 'میں روز اردو سیکھتا ہوں', r: 'main roz urdū sīkhtā hūn', e: 'I learn Urdu every day' },
        { t: 'میری تین بجے میٹنگ ہے', r: 'merī tīn baje meṭing hai', e: 'I have a meeting at three' },
        { t: 'آپ کا کام کیا ہے ؟', r: 'āp kā kām kyā hai?', e: 'what is your work ?' },
        { t: 'مجھے جواب نہیں معلوم', r: 'mujhe jawāb nahīn maalūm', e: 'I do not know the answer' },
        { t: 'میں دوسری زبان سیکھنا چاہتا ہوں', r: 'main dūsrī zabān sīkhnā chāhtā hūn', e: 'I want to learn another language' }
      ] },

    { id: 'ur-connect', kind: 'words', title: 'Putting sentences together',
      blurb: 'The small words that turn phrases into speech.',
      vocab: [
        { t: 'اور', r: 'aur', e: 'and' },
        { t: 'لیکن', r: 'lekin', e: 'but' },
        { t: 'یا', r: 'yā', e: 'or' },
        { t: 'اگر', r: 'agar', e: 'if' },
        { t: 'کیونکہ', r: 'kyūnki', e: 'because' },
        { t: 'اس لیے', r: 'is liye', e: 'therefore' },
        { t: 'بھی', r: 'bhī', e: 'also', n: 'Goes after the word it applies to: میں بھی, "me too".' },
        { t: 'پھر بھی', r: 'phir bhī', e: 'even so' },
        { t: 'جب', r: 'jab', e: 'when' },
        { t: 'بغیر', r: 'baghair', e: 'without' },
        { t: 'کے لیے', r: 'ke liye', e: 'for' },
        { t: 'تک', r: 'tak', e: 'until' },
        { t: 'سے', r: 'se', e: 'from' },
        { t: 'کچھ', r: 'kuchh', e: 'something' },
        { t: 'کچھ نہیں', r: 'kuchh nahīn', e: 'nothing' }
      ],
      sentences: [
        { t: 'میں آنا چاہتا ہوں لیکن تھکا ہوں', r: 'main ānā chāhtā hūn lekin thakā hūn', e: 'I want to come but I am tired' },
        { t: 'اگر بارش ہوئی تو میں یہاں رہوں گا', r: 'agar bārish huī to main yahān rahūn gā', e: 'if it rains I will stay here' },
        { t: 'میں اردو سیکھتا ہوں کیونکہ مجھے پسند ہے', r: 'main urdū sīkhtā hūn kyūnki mujhe pasand hai', e: 'I learn Urdu because I like it' },
        { t: 'میں چائے کے بغیر نہیں رہ سکتا', r: 'main chāy ke baghair nahīn rah saktā', e: 'I cannot live without tea' },
        { t: 'ہم سفر کے بارے میں بات کرتے ہیں', r: 'ham safar ke bāre men bāt karte hain', e: 'we talk about the journey' }
      ] }

  ]
};

Courses.register(URDU);
})();
