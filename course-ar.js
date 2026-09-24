/* Lisan — the Arabic course.
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

var ARABIC = {
  id: 'ar',
  name: 'Arabic',
  native: 'العربية',
  dir: 'rtl',
  speech: ['ar-SA', 'ar-EG', 'ar'],
  script: 'naskh',
  romanized: true,
  hasAlphabet: true,
  order: 1,
  blurb: 'Modern Standard Arabic — the written and formal language shared across the Arab world.',
  grammar: {
    wordOrder: 'Arabic puts the adjective after the noun (البَيْتُ كَبير, "the house big"), and there is no word for "is" in the present tense.'
  },
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
      ] },

    { id: 'ar-shop', kind: 'words', title: 'Shopping and money',
      blurb: 'Buying things, and asking the price.',
      vocab: [
        { t: 'مال', r: 'māl', e: 'money' },
        { t: 'سِعْر', r: 'siʿr', e: 'price' },
        { t: 'بِطاقة', r: 'biṭāqa', e: 'card' },
        { t: 'أَشْتَري', r: 'ashtarī', e: 'I buy' },
        { t: 'أَبيع', r: 'abīʿ', e: 'I sell' },
        { t: 'أَدْفَع', r: 'adfaʿ', e: 'I pay' },
        { t: 'مَلابِس', r: 'malābis', e: 'clothes' },
        { t: 'قَميص', r: 'qamīṣ', e: 'shirt' },
        { t: 'حِذاء', r: 'ḥidhāʾ', e: 'shoe' },
        { t: 'حَقيبة', r: 'ḥaqība', e: 'bag' },
        { t: 'هَدِيّة', r: 'hadiyya', e: 'gift' },
        { t: 'مَفْتوح', r: 'maftūḥ', e: 'open' },
        { t: 'مُغْلَق', r: 'mughlaq', e: 'closed' },
        { t: 'مَجّاني', r: 'majjānī', e: 'free of charge' },
        { t: 'آخَر', r: 'ākhar', e: 'another' },
        { t: 'غالي', r: 'ghālī', e: 'expensive' },
        { t: 'رَخيص', r: 'rakhīṣ', e: 'cheap' }
      ],
      sentences: [
        { t: 'كَم سِعْر هَذا القَميص ؟', r: 'kam siʿr hādhā l-qamīṣ?', e: 'how much is this shirt ?' },
        { t: 'أُريدُ أَن أَدْفَع بِالبِطاقة', r: 'urīdu an adfaʿ bi-l-biṭāqa', e: 'I want to pay by card' },
        { t: 'هَذا غالي جِدّاً', r: 'hādhā ghālī jiddan', e: 'this is very expensive' },
        { t: 'المَحَلُّ مُغْلَق', r: 'al-maḥallu mughlaq', e: 'the shop is closed' },
        { t: 'أَشْتَري هَدِيّة', r: 'ashtarī hadiyya', e: 'I am buying a gift' }
      ] },

    { id: 'ar-home', kind: 'words', title: 'Home and routine',
      blurb: 'The house, and the shape of a day.',
      vocab: [
        { t: 'باب', r: 'bāb', e: 'door' },
        { t: 'نافِذة', r: 'nāfidha', e: 'window' },
        { t: 'طاوِلة', r: 'ṭāwila', e: 'table' },
        { t: 'كُرْسي', r: 'kursī', e: 'chair' },
        { t: 'سَرير', r: 'sarīr', e: 'bed' },
        { t: 'مَطْبَخ', r: 'maṭbakh', e: 'kitchen' },
        { t: 'غُرْفة', r: 'ghurfa', e: 'room' },
        { t: 'مِفْتاح', r: 'miftāḥ', e: 'key' },
        { t: 'كِتاب', r: 'kitāb', e: 'book' },
        { t: 'أَنام', r: 'anām', e: 'I sleep' },
        { t: 'أَسْتَيْقِظ', r: 'astayqiẓ', e: 'I wake up' },
        { t: 'أَغْسِل', r: 'aghsil', e: 'I wash' },
        { t: 'أُنَظِّف', r: 'unaẓẓif', e: 'I clean' },
        { t: 'أَطْبُخ', r: 'aṭbukh', e: 'I cook' },
        { t: 'أَفْتَح', r: 'aftaḥ', e: 'I open' },
        { t: 'أُغْلِق', r: 'ughliq', e: 'I close' },
        { t: 'أَبْحَث', r: 'abḥath', e: 'I search' }
      ],
      sentences: [
        { t: 'أَسْتَيْقِظُ في السابِعة', r: 'astayqiẓu fī s-sābiʿa', e: 'I wake up at seven' },
        { t: 'أَطْبُخُ كُلَّ يَوْم', r: 'aṭbukhu kulla yawm', e: 'I cook every day' },
        { t: 'الكِتابُ عَلى الطاوِلة', r: 'al-kitābu ʿalā ṭ-ṭāwila', e: 'the book is on the table' },
        { t: 'أَبْحَثُ عَن مِفْتاحي', r: 'abḥathu ʿan miftāḥī', e: 'I am looking for my key' },
        { t: 'هَل يُمْكِنُكَ أَن تَفْتَحَ النافِذة ؟', r: 'hal yumkinuka an taftaḥa n-nāfidha?', e: 'can you open the window ?' }
      ] },

    { id: 'ar-travel', kind: 'words', title: 'Travel',
      blurb: 'Getting from one place to another.',
      vocab: [
        { t: 'تَذْكِرة', r: 'tadhkira', e: 'ticket' },
        { t: 'حَقيبة سَفَر', r: 'ḥaqībat safar', e: 'suitcase' },
        { t: 'رِحْلة', r: 'riḥla', e: 'trip' },
        { t: 'مَحَطّة', r: 'maḥaṭṭa', e: 'station' },
        { t: 'خَريطة', r: 'kharīṭa', e: 'map' },
        { t: 'أُسافِر', r: 'usāfir', e: 'I travel' },
        { t: 'أَصِل', r: 'aṣil', e: 'I arrive' },
        { t: 'أُغادِر', r: 'ughādir', e: 'I depart' },
        { t: 'أَنْتَظِر', r: 'antaẓir', e: 'I wait' },
        { t: 'أَمْشي', r: 'amshī', e: 'I walk' },
        { t: 'بَلَد', r: 'balad', e: 'country' },
        { t: 'عالَم', r: 'ʿālam', e: 'world' },
        { t: 'جَواز سَفَر', r: 'jawāz safar', e: 'passport' },
        { t: 'فُنْدُقي', r: 'funduqī', e: 'my hotel' },
        { t: 'بَعيد', r: 'baʿīd', e: 'distant' },
        { t: 'قَريب', r: 'qarīb', e: 'nearby' }
      ],
      sentences: [
        { t: 'مَتى يُغادِرُ القِطار ؟', r: 'matā yughādiru l-qiṭār?', e: 'when does the train leave ?' },
        { t: 'أُريدُ تَذْكِرة إِلى القاهِرة', r: 'urīdu tadhkira ilā l-Qāhira', e: 'I want a ticket to Cairo' },
        { t: 'أَيْنَ المَحَطّة ؟', r: 'ayna l-maḥaṭṭa?', e: 'where is the station ?' },
        { t: 'أَضَعْتُ حَقيبَتي', r: 'aḍaʿtu ḥaqībatī', e: 'I lost my bag' },
        { t: 'سَأُسافِرُ غَداً', r: 'saʾusāfiru ghadan', e: 'I will travel tomorrow' }
      ] },

    { id: 'ar-past', kind: 'words', title: 'The past',
      blurb: 'Saying what happened. Arabic marks the past with prefixes and endings.',
      vocab: [
        { t: 'ذَهَبْت', r: 'dhahabtu', e: 'I went' },
        { t: 'أَكَلْت', r: 'akaltu', e: 'I ate' },
        { t: 'شَرِبْت', r: 'sharibtu', e: 'I drank' },
        { t: 'رَأَيْت', r: 'raʾaytu', e: 'I saw' },
        { t: 'قُلْت', r: 'qultu', e: 'I said' },
        { t: 'فَعَلْت', r: 'faʿaltu', e: 'I did' },
        { t: 'كُنْت', r: 'kuntu', e: 'I was' },
        { t: 'كانَ', r: 'kāna', e: 'he was', n: 'كانَ is the only way Arabic says "was" — the present has no verb at all.' },
        { t: 'وُلِدْت', r: 'wulidtu', e: 'I was born' },
        { t: 'قابَلْت', r: 'qābaltu', e: 'I met' },
        { t: 'نَسيت', r: 'nasītu', e: 'I forgot' },
        { t: 'اللَّيْلة الماضِية', r: 'al-layla l-māḍiya', e: 'last night' },
        { t: 'الأُسْبوع الماضي', r: 'al-usbūʿ al-māḍī', e: 'last week' },
        { t: 'قَبْل', r: 'qabl', e: 'before' },
        { t: 'بَعْد', r: 'baʿd', e: 'after' }
      ],
      sentences: [
        { t: 'أَمْس ذَهَبْتُ إِلى السوق', r: 'ams dhahabtu ilā s-sūq', e: 'yesterday I went to the market' },
        { t: 'أَكَلْتُ في المَطْعَم', r: 'akaltu fī l-maṭʿam', e: 'I ate at the restaurant' },
        { t: 'ماذا فَعَلْتَ ؟', r: 'mādhā faʿalta?', e: 'what did you do ?' },
        { t: 'وُلِدْتُ في كَنَدا', r: 'wulidtu fī Kanadā', e: 'I was born in Canada' },
        { t: 'نَسيتُ اسْمَه', r: 'nasītu ismah', e: 'I forgot his name' }
      ] },

    { id: 'ar-future', kind: 'words', title: 'Plans and the future',
      blurb: 'One letter turns the present into the future.',
      vocab: [
        { t: 'سَوْفَ', r: 'sawfa', e: 'will', n: 'Put سَـ or سَوْفَ in front of a present verb and it becomes the future: سَأَذْهَب, "I will go".' },
        { t: 'سَأَذْهَب', r: 'saʾadhhab', e: 'I will go' },
        { t: 'يَجِب', r: 'yajib', e: 'must' },
        { t: 'أَسْتَطيع', r: 'astaṭīʿ', e: 'I am able' },
        { t: 'أُحاوِل', r: 'uḥāwil', e: 'I try' },
        { t: 'أَبْدَأ', r: 'abdaʾ', e: 'I begin' },
        { t: 'أَنْتَهي', r: 'antahī', e: 'I finish' },
        { t: 'خُطّة', r: 'khuṭṭa', e: 'plan' },
        { t: 'قَريباً', r: 'qarīban', e: 'soon' },
        { t: 'لاحِقاً', r: 'lāḥiqan', e: 'later' },
        { t: 'القادِم', r: 'al-qādim', e: 'next' },
        { t: 'مَعاً', r: 'maʿan', e: 'together' },
        { t: 'آمُل', r: 'āmul', e: 'I hope' },
        { t: 'أُساعِد', r: 'usāʿid', e: 'I help' }
      ],
      sentences: [
        { t: 'سَأَدْرُسُ العَرَبِيّة', r: 'saʾadrusu l-ʿarabiyya', e: 'I will study Arabic' },
        { t: 'هَل يُمْكِنُكَ مُساعَدَتي ؟', r: 'hal yumkinuka musāʿadatī?', e: 'can you help me ?' },
        { t: 'يَجِبُ أَن أَعْمَلَ غَداً', r: 'yajibu an aʿmala ghadan', e: 'I must work tomorrow' },
        { t: 'سَنَأْكُلُ مَعاً', r: 'sanaʾkulu maʿan', e: 'we will eat together' },
        { t: 'آمُلُ أَن أَراكَ قَريباً', r: 'āmulu an arāka qarīban', e: 'I hope to see you soon' }
      ] },

    { id: 'ar-body', kind: 'words', title: 'Health and the body',
      blurb: 'Saying what hurts.',
      vocab: [
        { t: 'رَأْس', r: 'raʾs', e: 'head' },
        { t: 'عَيْن', r: 'ʿayn', e: 'eye' },
        { t: 'فَم', r: 'fam', e: 'mouth' },
        { t: 'يَد', r: 'yad', e: 'hand' },
        { t: 'قَدَم', r: 'qadam', e: 'foot' },
        { t: 'ذِراع', r: 'dhirāʿ', e: 'arm' },
        { t: 'ساق', r: 'sāq', e: 'leg' },
        { t: 'بَطْن', r: 'baṭn', e: 'stomach' },
        { t: 'ظَهْر', r: 'ẓahr', e: 'back' },
        { t: 'قَلْب', r: 'qalb', e: 'heart' },
        { t: 'مَريض', r: 'marīḍ', e: 'ill' },
        { t: 'أَلَم', r: 'alam', e: 'pain' },
        { t: 'صَيْدَلِيّة', r: 'ṣaydaliyya', e: 'pharmacy' },
        { t: 'دَواء', r: 'dawāʾ', e: 'medicine' },
        { t: 'مَوْعِد', r: 'mawʿid', e: 'appointment' },
        { t: 'أَشْعُر', r: 'ashʿur', e: 'I feel' }
      ],
      sentences: [
        { t: 'رَأْسي يُؤْلِمُني', r: 'raʾsī yuʾlimunī', e: 'my head hurts' },
        { t: 'أَنا مَريضٌ اليَوْم', r: 'anā marīḍun al-yawm', e: 'I am ill today' },
        { t: 'كَيْفَ تَشْعُر ؟', r: 'kayfa tashʿur?', e: 'how do you feel ?' },
        { t: 'أَبْحَثُ عَن صَيْدَلِيّة', r: 'abḥathu ʿan ṣaydaliyya', e: 'I am looking for a pharmacy' },
        { t: 'عِنْدي مَوْعِدٌ غَداً', r: 'ʿindī mawʿidun ghadan', e: 'I have an appointment tomorrow' }
      ] },

    { id: 'ar-weather', kind: 'words', title: 'Weather and seasons',
      blurb: 'Small talk, everywhere.',
      vocab: [
        { t: 'طَقْس', r: 'ṭaqs', e: 'weather' },
        { t: 'شَمْس', r: 'shams', e: 'sun' },
        { t: 'مَطَر', r: 'maṭar', e: 'rain' },
        { t: 'ثَلْج', r: 'thalj', e: 'snow' },
        { t: 'ريح', r: 'rīḥ', e: 'wind' },
        { t: 'سَحاب', r: 'saḥāb', e: 'cloud' },
        { t: 'شِتاء', r: 'shitāʾ', e: 'winter' },
        { t: 'رَبيع', r: 'rabīʿ', e: 'spring' },
        { t: 'صَيْف', r: 'ṣayf', e: 'summer' },
        { t: 'خَريف', r: 'kharīf', e: 'autumn' },
        { t: 'تُمْطِر', r: 'tumṭir', e: 'it rains' },
        { t: 'دافِئ', r: 'dāfiʾ', e: 'warm' },
        { t: 'خارِج', r: 'khārij', e: 'outside' },
        { t: 'داخِل', r: 'dākhil', e: 'inside' }
      ],
      sentences: [
        { t: 'الطَّقْسُ بارِدٌ جِدّاً اليَوْم', r: 'aṭ-ṭaqsu bāridun jiddan al-yawm', e: 'the weather is very cold today' },
        { t: 'تُمْطِرُ في الخارِج', r: 'tumṭiru fī l-khārij', e: 'it is raining outside' },
        { t: 'في الشِّتاءِ يَنْزِلُ الثَّلْج', r: 'fī sh-shitāʾi yanzilu th-thalj', e: 'in winter the snow falls' },
        { t: 'كَيْفَ الطَّقْس ؟', r: 'kayfa ṭ-ṭaqs?', e: 'what is the weather like ?' },
        { t: 'أُحِبُّ الرَّبيع', r: 'uḥibbu r-rabīʿ', e: 'I like the spring' }
      ] },

    { id: 'ar-feel', kind: 'words', title: 'Feelings and opinions',
      blurb: 'Saying what you think.',
      vocab: [
        { t: 'حَزين', r: 'ḥazīn', e: 'sad' },
        { t: 'غاضِب', r: 'ghāḍib', e: 'angry' },
        { t: 'قَلِق', r: 'qaliq', e: 'worried' },
        { t: 'هادِئ', r: 'hādiʾ', e: 'calm' },
        { t: 'مُتْعَب', r: 'mutʿab', e: 'tired' },
        { t: 'أَظُنّ', r: 'aẓunn', e: 'I think' },
        { t: 'أَعْتَقِد', r: 'aʿtaqid', e: 'I believe' },
        { t: 'أُفَضِّل', r: 'ufaḍḍil', e: 'I prefer' },
        { t: 'أَكْرَه', r: 'akrah', e: 'I hate' },
        { t: 'فِكْرة', r: 'fikra', e: 'idea' },
        { t: 'حَقيقة', r: 'ḥaqīqa', e: 'truth' },
        { t: 'مُوافِق', r: 'muwāfiq', e: 'in agreement' },
        { t: 'رائِع', r: 'rāʾiʿ', e: 'wonderful' },
        { t: 'مُمِلّ', r: 'mumill', e: 'boring' }
      ],
      sentences: [
        { t: 'أَظُنُّ أَنَّكَ عَلى حَقّ', r: 'aẓunnu annaka ʿalā ḥaqq', e: 'I think you are right' },
        { t: 'أَنا سَعيدٌ جِدّاً', r: 'anā saʿīdun jiddan', e: 'I am very happy' },
        { t: 'لَسْتُ مُوافِقاً', r: 'lastu muwāfiqan', e: 'I do not agree' },
        { t: 'ما رَأْيُك ؟', r: 'mā raʾyuk?', e: 'what is your opinion ?' },
        { t: 'أُفَضِّلُ الشاي', r: 'ufaḍḍilu sh-shāy', e: 'I prefer tea' }
      ] },

    { id: 'ar-work', kind: 'words', title: 'Work and study',
      blurb: 'What you do, and what you are learning.',
      vocab: [
        { t: 'عَمَل', r: 'ʿamal', e: 'work' },
        { t: 'شَرِكة', r: 'sharika', e: 'company' },
        { t: 'مُدير', r: 'mudīr', e: 'manager' },
        { t: 'اِجْتِماع', r: 'ijtimāʿ', e: 'meeting' },
        { t: 'بَريد', r: 'barīd', e: 'mail' },
        { t: 'جامِعة', r: 'jāmiʿa', e: 'university' },
        { t: 'دَرْس', r: 'dars', e: 'lesson' },
        { t: 'اِمْتِحان', r: 'imtiḥān', e: 'exam' },
        { t: 'سُؤال', r: 'suʾāl', e: 'question' },
        { t: 'جَواب', r: 'jawāb', e: 'answer' },
        { t: 'أَتَعَلَّم', r: 'ataʿallam', e: 'I learn' },
        { t: 'أُعَلِّم', r: 'uʿallim', e: 'I teach' },
        { t: 'أَتَمَرَّن', r: 'atamarran', e: 'I practise' },
        { t: 'كَلِمة', r: 'kalima', e: 'word' },
        { t: 'لُغة', r: 'lugha', e: 'language' }
      ],
      sentences: [
        { t: 'أَتَعَلَّمُ العَرَبِيّةَ كُلَّ يَوْم', r: 'ataʿallamu l-ʿarabiyyata kulla yawm', e: 'I learn Arabic every day' },
        { t: 'عِنْدي اِجْتِماعٌ في الثالِثة', r: 'ʿindī ijtimāʿun fī th-thālitha', e: 'I have a meeting at three' },
        { t: 'ما هُوَ عَمَلُك ؟', r: 'mā huwa ʿamaluk?', e: 'what is your work ?' },
        { t: 'لا أَعْرِفُ الجَواب', r: 'lā aʿrifu l-jawāb', e: 'I do not know the answer' },
        { t: 'أُريدُ تَعَلُّمَ لُغةٍ أُخْرى', r: 'urīdu taʿallum lughatin ukhrā', e: 'I want to learn another language' }
      ] },

    { id: 'ar-connect', kind: 'words', title: 'Putting sentences together',
      blurb: 'The small words that turn phrases into speech.',
      vocab: [
        { t: 'وَ', r: 'wa', e: 'and', n: 'Written attached to the next word: وَأَنا, "and I".' },
        { t: 'لَكِن', r: 'lākin', e: 'but' },
        { t: 'أَو', r: 'aw', e: 'or' },
        { t: 'إِذا', r: 'idhā', e: 'if' },
        { t: 'لِأَنَّ', r: 'liʾanna', e: 'because' },
        { t: 'لِذَلِك', r: 'li-dhālik', e: 'therefore' },
        { t: 'أَيْضاً', r: 'ayḍan', e: 'also' },
        { t: 'مَعَ ذَلِك', r: 'maʿa dhālik', e: 'nevertheless' },
        { t: 'بَيْنَما', r: 'baynamā', e: 'while' },
        { t: 'بِدون', r: 'bidūn', e: 'without' },
        { t: 'مِن أَجْل', r: 'min ajl', e: 'for the sake of' },
        { t: 'حَتّى', r: 'ḥattā', e: 'until' },
        { t: 'مُنْذ', r: 'mundhu', e: 'since' },
        { t: 'شَيْء', r: 'shayʾ', e: 'thing' },
        { t: 'لا شَيْء', r: 'lā shayʾ', e: 'nothing' }
      ],
      sentences: [
        { t: 'أُريدُ الذَّهاب لَكِنّي مُتْعَب', r: 'urīdu dh-dhahāb lākinnī mutʿab', e: 'I want to go but I am tired' },
        { t: 'إِذا أَمْطَرَت أَبْقى هُنا', r: 'idhā amṭarat abqā hunā', e: 'if it rains I stay here' },
        { t: 'أَدْرُسُ العَرَبِيّةَ لِأَنَّني أُحِبُّها', r: 'adrusu l-ʿarabiyyata liʾannanī uḥibbuhā', e: 'I study Arabic because I like it' },
        { t: 'لا أَسْتَطيعُ العَيْشَ بِدونِ قَهْوة', r: 'lā astaṭīʿu l-ʿaysha bidūni qahwa', e: 'I cannot live without coffee' },
        { t: 'نَتَكَلَّمُ عَن الرِّحْلة', r: 'natakallamu ʿan ar-riḥla', e: 'we are talking about the trip' }
      ] }

  ]
};

Courses.register(ARABIC);
})();
