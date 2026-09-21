/* Lisan — course content.
 *
 * Two courses, each a list of units. A unit is either an alphabet unit (which
 * draws its material from alphabet.js) or a vocabulary unit holding words and
 * whole sentences. Lessons are generated from this at runtime rather than
 * written out one by one, so adding a word adds it to every exercise type that
 * can use it.
 *
 * Fields on every item:
 *   t  the word in its own script
 *   r  romanisation, using the standard academic transliteration
 *   e  the English meaning
 *   n  an optional note shown when the word is introduced
 *
 * Sentences additionally get tokenised on spaces for the word-bank exercises,
 * so the spacing here is load-bearing — one token is one tappable tile.
 */
var Courses = (function () {
'use strict';

/* ------------------------------------------------------------------ Arabic */

var ARABIC = {
  id: 'ar',
  name: 'Arabic',
  native: 'العربية',
  dir: 'rtl',
  speech: ['ar-SA', 'ar-EG', 'ar'],
  script: 'naskh',
  blurb: 'Modern Standard Arabic — the written and formal language shared across the Arab world.',
  units: [
    { id: 'ar-a1', kind: 'alphabet', title: 'Alphabet 1', letters: 'ابتثجحخ',
      blurb: 'The first seven letters, and how they join up.' },
    { id: 'ar-a2', kind: 'alphabet', title: 'Alphabet 2', letters: 'دذرزسشص',
      blurb: 'Four letters that refuse to join to what follows them.' },
    { id: 'ar-a3', kind: 'alphabet', title: 'Alphabet 3', letters: 'ضطظعغفق',
      blurb: 'The heavy letters, and the two throat sounds.' },
    { id: 'ar-a4', kind: 'alphabet', title: 'Alphabet 4', letters: 'كلمنهوي',
      blurb: 'The last seven. After this you can read any Arabic word.' },

    { id: 'ar-greet', kind: 'words', title: 'Greetings',
      blurb: 'Enough to start and end a conversation politely.',
      vocab: [
        { t: 'مَرْحَبا', r: 'marḥaban', e: 'hello' },
        { t: 'السَّلامُ عَلَيْكُم', r: 'as-salāmu ʿalaykum', e: 'peace be upon you', n: 'The standard greeting anywhere in the Arab world, at any time of day.' },
        { t: 'وَعَلَيْكُمُ السَّلام', r: 'wa-ʿalaykumu s-salām', e: 'and peace be upon you', n: 'The fixed reply. Always this, never anything else.' },
        { t: 'صَباحُ الخَيْر', r: 'ṣabāḥu l-khayr', e: 'good morning' },
        { t: 'مَساءُ الخَيْر', r: 'masāʾu l-khayr', e: 'good evening' },
        { t: 'شُكْراً', r: 'shukran', e: 'thank you' },
        { t: 'عَفْواً', r: 'ʿafwan', e: 'you are welcome' },
        { t: 'مِن فَضْلِك', r: 'min faḍlik', e: 'please' },
        { t: 'نَعَم', r: 'naʿam', e: 'yes' },
        { t: 'لا', r: 'lā', e: 'no' },
        { t: 'مَعَ السَّلامة', r: 'maʿa s-salāma', e: 'goodbye' },
        { t: 'أَهْلاً وَسَهْلاً', r: 'ahlan wa-sahlan', e: 'welcome' },
        { t: 'آسِف', r: 'āsif', e: 'sorry' },
        { t: 'كَيْفَ حالُك', r: 'kayfa ḥāluk', e: 'how are you' },
        { t: 'بِخَيْر', r: 'bi-khayr', e: 'well' }
      ],
      sentences: [
        { t: 'كَيْفَ حالُك ؟', r: 'kayfa ḥāluk?', e: 'how are you ?' },
        { t: 'أَنا بِخَيْر شُكْراً', r: 'anā bi-khayr, shukran', e: 'I am well , thank you' },
        { t: 'ما اسْمُك ؟', r: 'mā ismuk?', e: 'what is your name ?' },
        { t: 'اسْمي أَحْمَد', r: 'ismī Aḥmad', e: 'my name is Ahmad' },
        { t: 'صَباحُ الخَيْر يا صَديقي', r: 'ṣabāḥu l-khayr yā ṣadīqī', e: 'good morning my friend' }
      ] },

    { id: 'ar-people', kind: 'words', title: 'People',
      blurb: 'Pronouns and the words for family.',
      vocab: [
        { t: 'أَنا', r: 'anā', e: 'I' },
        { t: 'أَنْتَ', r: 'anta', e: 'you', n: 'Said to a man. To a woman it is أَنْتِ anti — Arabic marks gender on "you".' },
        { t: 'هُوَ', r: 'huwa', e: 'he' },
        { t: 'هِيَ', r: 'hiya', e: 'she' },
        { t: 'نَحْنُ', r: 'naḥnu', e: 'we' },
        { t: 'رَجُل', r: 'rajul', e: 'man' },
        { t: 'اِمْرَأَة', r: 'imraʾa', e: 'woman' },
        { t: 'وَلَد', r: 'walad', e: 'boy' },
        { t: 'بِنْت', r: 'bint', e: 'girl' },
        { t: 'أَب', r: 'ab', e: 'father' },
        { t: 'أُمّ', r: 'umm', e: 'mother' },
        { t: 'أَخ', r: 'akh', e: 'brother' },
        { t: 'أُخْت', r: 'ukht', e: 'sister' },
        { t: 'صَديق', r: 'ṣadīq', e: 'friend' },
        { t: 'عائِلة', r: 'ʿāʾila', e: 'family' },
        { t: 'طالِب', r: 'ṭālib', e: 'student' },
        { t: 'مُعَلِّم', r: 'muʿallim', e: 'teacher' }
      ],
      sentences: [
        { t: 'أَنا طالِب', r: 'anā ṭālib', e: 'I am a student', n: 'Arabic has no word for "is" or "am" in the present. أَنا طالِب is literally "I student".' },
        { t: 'هِيَ مُعَلِّمة', r: 'hiya muʿallima', e: 'she is a teacher' },
        { t: 'هَذا صَديقي', r: 'hādhā ṣadīqī', e: 'this is my friend' },
        { t: 'عِنْدي أَخ وَأُخْت', r: 'ʿindī akh wa-ukht', e: 'I have a brother and a sister' },
        { t: 'هُوَ أَبي', r: 'huwa abī', e: 'he is my father' }
      ] },

    { id: 'ar-food', kind: 'words', title: 'Food and drink',
      blurb: 'Ordering, and saying what you like.',
      vocab: [
        { t: 'ماء', r: 'māʾ', e: 'water' },
        { t: 'خُبْز', r: 'khubz', e: 'bread' },
        { t: 'أَرُزّ', r: 'aruzz', e: 'rice' },
        { t: 'لَحْم', r: 'laḥm', e: 'meat' },
        { t: 'دَجاج', r: 'dajāj', e: 'chicken' },
        { t: 'سَمَك', r: 'samak', e: 'fish' },
        { t: 'بَيْض', r: 'bayḍ', e: 'eggs' },
        { t: 'حَليب', r: 'ḥalīb', e: 'milk' },
        { t: 'شاي', r: 'shāy', e: 'tea' },
        { t: 'قَهْوة', r: 'qahwa', e: 'coffee' },
        { t: 'عَصير', r: 'ʿaṣīr', e: 'juice' },
        { t: 'تُفّاح', r: 'tuffāḥ', e: 'apples' },
        { t: 'جُبْن', r: 'jubn', e: 'cheese' },
        { t: 'سُكَّر', r: 'sukkar', e: 'sugar' },
        { t: 'مِلْح', r: 'milḥ', e: 'salt' },
        { t: 'طَعام', r: 'ṭaʿām', e: 'food' },
        { t: 'مَطْعَم', r: 'maṭʿam', e: 'restaurant' },
        { t: 'لَذيذ', r: 'ladhīdh', e: 'delicious' }
      ],
      sentences: [
        { t: 'أُريدُ الماء', r: 'urīdu l-māʾ', e: 'I want the water' },
        { t: 'الخُبْزُ لَذيذ', r: 'al-khubzu ladhīdh', e: 'the bread is delicious', n: 'الـ al- is "the". It attaches to the front of the word.' },
        { t: 'أَشْرَبُ القَهْوة', r: 'ashrabu l-qahwa', e: 'I drink the coffee' },
        { t: 'أُحِبُّ الشاي', r: 'uḥibbu sh-shāy', e: 'I like the tea' },
        { t: 'أَيْنَ المَطْعَم ؟', r: 'ayna l-maṭʿam?', e: 'where is the restaurant ?' }
      ] },

    { id: 'ar-num', kind: 'words', title: 'Numbers',
      blurb: 'One to ten, and asking how many.',
      vocab: [
        { t: 'واحِد', r: 'wāḥid', e: 'one' },
        { t: 'اِثْنان', r: 'ithnān', e: 'two' },
        { t: 'ثَلاثة', r: 'thalātha', e: 'three' },
        { t: 'أَرْبَعة', r: 'arbaʿa', e: 'four' },
        { t: 'خَمْسة', r: 'khamsa', e: 'five' },
        { t: 'سِتّة', r: 'sitta', e: 'six' },
        { t: 'سَبْعة', r: 'sabʿa', e: 'seven' },
        { t: 'ثَمانِية', r: 'thamāniya', e: 'eight' },
        { t: 'تِسْعة', r: 'tisʿa', e: 'nine' },
        { t: 'عَشَرة', r: 'ʿashara', e: 'ten' },
        { t: 'عِشْرون', r: 'ʿishrūn', e: 'twenty' },
        { t: 'مِئة', r: 'miʾa', e: 'hundred' },
        { t: 'كَم', r: 'kam', e: 'how many' },
        { t: 'رَقَم', r: 'raqam', e: 'number' }
      ],
      sentences: [
        { t: 'عِنْدي ثَلاثة كُتُب', r: 'ʿindī thalātha kutub', e: 'I have three books' },
        { t: 'كَم عُمْرُك ؟', r: 'kam ʿumruk?', e: 'how old are you ?' },
        { t: 'أُريدُ واحِد مِن فَضْلِك', r: 'urīdu wāḥid min faḍlik', e: 'I want one please' }
      ] },

    { id: 'ar-place', kind: 'words', title: 'Places',
      blurb: 'Getting around and asking where things are.',
      vocab: [
        { t: 'بَيْت', r: 'bayt', e: 'house' },
        { t: 'مَدْرَسة', r: 'madrasa', e: 'school' },
        { t: 'سوق', r: 'sūq', e: 'market' },
        { t: 'مَدينة', r: 'madīna', e: 'city' },
        { t: 'شارِع', r: 'shāriʿ', e: 'street' },
        { t: 'مَطار', r: 'maṭār', e: 'airport' },
        { t: 'فُنْدُق', r: 'funduq', e: 'hotel' },
        { t: 'مُسْتَشْفى', r: 'mustashfā', e: 'hospital' },
        { t: 'مَكْتَب', r: 'maktab', e: 'office' },
        { t: 'سَيّارة', r: 'sayyāra', e: 'car' },
        { t: 'قِطار', r: 'qiṭār', e: 'train' },
        { t: 'طائِرة', r: 'ṭāʾira', e: 'plane' },
        { t: 'أَيْنَ', r: 'ayna', e: 'where' },
        { t: 'هُنا', r: 'hunā', e: 'here' },
        { t: 'هُناك', r: 'hunāk', e: 'there' }
      ],
      sentences: [
        { t: 'أَيْنَ السوق ؟', r: 'ayna s-sūq?', e: 'where is the market ?' },
        { t: 'البَيْتُ هُنا', r: 'al-baytu hunā', e: 'the house is here' },
        { t: 'أَذْهَبُ إِلى المَدْرَسة', r: 'adhhabu ilā l-madrasa', e: 'I go to the school' },
        { t: 'المَدينةُ كَبيرة', r: 'al-madīnatu kabīra', e: 'the city is big' }
      ] },

    { id: 'ar-verbs', kind: 'words', title: 'Everyday verbs',
      blurb: 'What you do, in the present tense.',
      vocab: [
        { t: 'أَذْهَب', r: 'adhhab', e: 'I go' },
        { t: 'أُريد', r: 'urīd', e: 'I want' },
        { t: 'أَعْرِف', r: 'aʿrif', e: 'I know' },
        { t: 'أَتَكَلَّم', r: 'atakallam', e: 'I speak' },
        { t: 'أَقْرَأ', r: 'aqraʾ', e: 'I read' },
        { t: 'أَكْتُب', r: 'aktub', e: 'I write' },
        { t: 'أَعْمَل', r: 'aʿmal', e: 'I work' },
        { t: 'أَسْكُن', r: 'askun', e: 'I live' },
        { t: 'أُحِبّ', r: 'uḥibb', e: 'I like' },
        { t: 'أَفْهَم', r: 'afham', e: 'I understand' },
        { t: 'أَدْرُس', r: 'adrus', e: 'I study' },
        { t: 'آكُل', r: 'ākul', e: 'I eat' },
        { t: 'أَشْرَب', r: 'ashrab', e: 'I drink' }
      ],
      sentences: [
        { t: 'أَتَكَلَّمُ العَرَبِيّة', r: 'atakallamu l-ʿarabiyya', e: 'I speak Arabic' },
        { t: 'لا أَفْهَم', r: 'lā afham', e: 'I do not understand', n: 'لا lā before a verb makes it negative.' },
        { t: 'أَسْكُنُ في المَدينة', r: 'askunu fī l-madīna', e: 'I live in the city' },
        { t: 'هَل تَتَكَلَّمُ الإِنْجِليزِيّة ؟', r: 'hal tatakallamu l-ingilīziyya?', e: 'do you speak English ?' },
        { t: 'نَعَم قَليلاً', r: 'naʿam, qalīlan', e: 'yes , a little' }
      ] },

    { id: 'ar-desc', kind: 'words', title: 'Describing things',
      blurb: 'Adjectives, and how they follow the noun.',
      vocab: [
        { t: 'كَبير', r: 'kabīr', e: 'big' },
        { t: 'صَغير', r: 'ṣaghīr', e: 'small' },
        { t: 'جَديد', r: 'jadīd', e: 'new' },
        { t: 'قَديم', r: 'qadīm', e: 'old' },
        { t: 'جَميل', r: 'jamīl', e: 'beautiful' },
        { t: 'سَعيد', r: 'saʿīd', e: 'happy' },
        { t: 'جَيِّد', r: 'jayyid', e: 'good' },
        { t: 'كَثير', r: 'kathīr', e: 'many' },
        { t: 'قَليل', r: 'qalīl', e: 'few' },
        { t: 'سَريع', r: 'sarīʿ', e: 'fast' },
        { t: 'بَطيء', r: 'baṭīʾ', e: 'slow' },
        { t: 'حارّ', r: 'ḥārr', e: 'hot' },
        { t: 'بارِد', r: 'bārid', e: 'cold' },
        { t: 'صَعْب', r: 'ṣaʿb', e: 'difficult' },
        { t: 'سَهْل', r: 'sahl', e: 'easy' }
      ],
      sentences: [
        { t: 'البَيْتُ كَبير', r: 'al-baytu kabīr', e: 'the house is big', n: 'The adjective comes after the noun, the opposite of English.' },
        { t: 'الماءُ بارِد', r: 'al-māʾu bārid', e: 'the water is cold' },
        { t: 'سَيّارة جَديدة', r: 'sayyāra jadīda', e: 'a new car', n: 'The ـة on جَديدة agrees with the feminine سَيّارة.' },
        { t: 'العَرَبِيّةُ سَهْلة', r: 'al-ʿarabiyyatu sahla', e: 'Arabic is easy' }
      ] },

    { id: 'ar-time', kind: 'words', title: 'Questions and time',
      blurb: 'The question words, and when things happen.',
      vocab: [
        { t: 'ما', r: 'mā', e: 'what' },
        { t: 'مَن', r: 'man', e: 'who' },
        { t: 'مَتى', r: 'matā', e: 'when' },
        { t: 'لِماذا', r: 'limādhā', e: 'why' },
        { t: 'كَيْفَ', r: 'kayfa', e: 'how' },
        { t: 'اليَوْم', r: 'al-yawm', e: 'today' },
        { t: 'غَداً', r: 'ghadan', e: 'tomorrow' },
        { t: 'أَمْس', r: 'ams', e: 'yesterday' },
        { t: 'الآن', r: 'al-ān', e: 'now' },
        { t: 'صَباح', r: 'ṣabāḥ', e: 'morning' },
        { t: 'مَساء', r: 'masāʾ', e: 'evening' },
        { t: 'لَيْل', r: 'layl', e: 'night' },
        { t: 'يَوْم', r: 'yawm', e: 'day' },
        { t: 'أُسْبوع', r: 'usbūʿ', e: 'week' },
        { t: 'ساعة', r: 'sāʿa', e: 'hour' }
      ],
      sentences: [
        { t: 'مَتى تَذْهَب ؟', r: 'matā tadhhab?', e: 'when do you go ?' },
        { t: 'أَذْهَبُ غَداً', r: 'adhhabu ghadan', e: 'I go tomorrow' },
        { t: 'كَم الساعة ؟', r: 'kam as-sāʿa?', e: 'what time is it ?' },
        { t: 'مَن هَذا ؟', r: 'man hādhā?', e: 'who is this ?' },
        { t: 'أَدْرُسُ العَرَبِيّةَ اليَوْم', r: 'adrusu l-ʿarabiyyata l-yawm', e: 'I study Arabic today' }
      ] }
  ]
};

/* -------------------------------------------------------------------- Urdu */

var URDU = {
  id: 'ur',
  name: 'Urdu',
  native: 'اردو',
  dir: 'rtl',
  speech: ['ur-PK', 'ur', 'hi-IN'],
  script: 'nastaliq',
  blurb: 'Urdu as spoken in Pakistan and northern India. Shares its script with Arabic, but almost none of its grammar.',
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
        { t: 'کیا', r: 'kyā', e: 'what' },
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
      ] }
  ]
};

var ALL = [ARABIC, URDU];

function byId(id) {
  for (var i = 0; i < ALL.length; i++) if (ALL[i].id === id) return ALL[i];
  return ALL[0];
}

/* Every vocabulary item in a course, for building plausible wrong answers. */
function allVocab(course) {
  var out = [];
  course.units.forEach(function (u) {
    (u.vocab || []).forEach(function (v) { out.push(v); });
  });
  return out;
}

/* Sanity checks, run by the test script and at startup in the console. */
function verify() {
  var problems = [];
  ALL.forEach(function (course) {
    var seenUnit = {}, seenWord = {};
    course.units.forEach(function (u) {
      if (seenUnit[u.id]) problems.push(course.id + ': duplicate unit id ' + u.id);
      seenUnit[u.id] = true;
      if (u.kind === 'alphabet') {
        Array.prototype.forEach.call(u.letters, function (ch) {
          if (!Alphabet.byChar(course.id, ch)) {
            problems.push(u.id + ': letter ' + ch + ' is not in the ' + course.id + ' alphabet');
          }
        });
        return;
      }
      if (!u.vocab || u.vocab.length < 4) problems.push(u.id + ': needs at least 4 words');
      (u.vocab || []).forEach(function (v) {
        if (!v.t || !v.r || !v.e) problems.push(u.id + ': incomplete entry ' + JSON.stringify(v));
        if (seenWord[v.t]) problems.push(course.id + ': "' + v.t + '" appears in two units');
        seenWord[v.t] = true;
      });
      (u.sentences || []).forEach(function (s) {
        if (!s.t || !s.e) { problems.push(u.id + ': incomplete sentence'); return; }
        /* Word-bank exercises tokenise on spaces, so a sentence with only one
           token cannot be built and a mismatch in count is usually a typo. */
        if (s.t.split(' ').length < 2) problems.push(u.id + ': sentence "' + s.t + '" has nothing to build');
        if (s.e.split(' ').length < 2) problems.push(u.id + ': English "' + s.e + '" has nothing to build');
      });
    });
  });
  return problems;
}

return { ALL: ALL, ARABIC: ARABIC, URDU: URDU, byId: byId, allVocab: allVocab, verify: verify };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = Courses;
