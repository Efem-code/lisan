/* Lisan — the Korean course.
 *
 * Taught in the 해요 (haeyo) polite style, which is what you actually use with
 * almost everyone: shopkeepers, colleagues, people you have just met. The
 * blunter 반말 and the very formal 합니다 style are mentioned where they matter
 * but not drilled — using the wrong level is the one mistake that lands badly.
 *
 * Every entry carries Revised Romanisation in `r` and a plain respelling in
 * `p`, because RR is a spelling system rather than a pronunciation guide: it
 * writes 어 as "eo" and 으 as "eu", neither of which an English reader will
 * guess. Korean has no stress accent, so no syllable is marked — keep them
 * even.
 */
(function () {
'use strict';

var KOREAN = {
  id: 'ko',
  name: 'Korean',
  native: '한국어',
  dir: 'ltr',
  script: 'hangul',
  speech: ['ko-KR', 'ko'],
  romanized: true,
  hasAlphabet: true,
  order: 6,
  blurb: 'Korean in the everyday polite style. Hangul is the easiest writing system in the app — most people read it within a week.',
  grammar: {
    wordOrder: 'Korean puts the verb at the very end, always: 저는 밥을 먹어요 is "I rice eat". ' +
               'Everything before the verb can move around, because particles mark the role of each word.',
    genderNote: 'No gender, no plurals to worry about, no articles. The work is done by particles and by verb endings.'
  },
  units: [

  { id: 'ko-a1', kind: 'alphabet', title: 'Hangul 1', letters: 'ㄱㄴㄷㄹㅁㅂㅅ',
    blurb: 'The seven plain consonants. Each is a picture of the mouth making it.' },
  { id: 'ko-a2', kind: 'alphabet', title: 'Hangul 2', letters: 'ㅇㅈㅊㅋㅌㅍㅎ',
    blurb: 'The rest of the consonants — mostly the first seven with a stroke added.' },
  { id: 'ko-a3', kind: 'alphabet', title: 'Hangul 3', letters: 'ㅏㅑㅓㅕㅗ',
    blurb: 'The first vowels. A line plus a stroke, and two strokes means a y in front.' },
  { id: 'ko-a4', kind: 'alphabet', title: 'Hangul 4', letters: 'ㅛㅜㅠㅡㅣ',
    blurb: 'The last five. After this you can read any Korean word aloud.' },

  { id: 'ko-greet', kind: 'words', title: 'Greetings',
    blurb: 'Enough to be polite from the first minute.',
    vocab: [
      { t: '안녕하세요', r: 'annyeonghaseyo', p: 'ahn-nyuhng-ha-se-yo', e: 'hello', n: 'Works for hello, good morning and good evening, at any hour.' },
      { t: '안녕히 가세요', r: 'annyeonghi gaseyo', p: 'ahn-nyuhng-hee ga-se-yo', e: 'goodbye', n: 'Said to the person leaving. If you are the one leaving, say 안녕히 계세요.' },
      { t: '감사합니다', r: 'gamsahamnida', p: 'gam-sa-ham-ni-da', e: 'thank you' },
      { t: '고마워요', r: 'gomawoyo', p: 'go-ma-wuh-yo', e: 'thanks', n: 'Warmer and less formal than 감사합니다.' },
      { t: '죄송합니다', r: 'joesonghamnida', p: 'jway-song-ham-ni-da', e: 'I am sorry' },
      { t: '실례합니다', r: 'sillyehamnida', p: 'shil-lye-ham-ni-da', e: 'excuse me' },
      { t: '네', r: 'ne', p: 'neh', e: 'yes' },
      { t: '아니요', r: 'aniyo', p: 'a-ni-yo', e: 'no' },
      { t: '괜찮아요', r: 'gwaenchanayo', p: 'gwen-cha-na-yo', e: 'it is fine' },
      { t: '반갑습니다', r: 'bangapseumnida', p: 'ban-gap-seum-ni-da', e: 'pleased to meet you' },
      { t: '잘 지내요', r: 'jal jinaeyo', p: 'jal ji-ne-yo', e: 'I am well' },
      { t: '이름', r: 'ireum', p: 'ee-reum', e: 'name' },
      { t: '다시', r: 'dasi', p: 'da-shi', e: 'again' },
      { t: '천천히', r: 'cheoncheonhi', p: 'chuhn-chuhn-hee', e: 'slowly' }
    ],
    sentences: [
      { t: '안녕하세요 ?', r: 'annyeonghaseyo?', p: 'ahn-nyuhng-ha-se-yo', e: 'hello ?' },
      { t: '잘 지내요 ?', r: 'jal jinaeyo?', p: 'jal ji-ne-yo', e: 'are you well ?' },
      { t: '이름이 뭐예요 ?', r: 'ireumi mwoyeyo?', p: 'ee-reu-mee mwuh-ye-yo', e: 'what is your name ?' },
      { t: '제 이름은 안나예요', r: 'je ireumeun annayeyo', p: 'je ee-reu-meun an-na-ye-yo', e: 'my name is Anna' },
      { t: '다시 말해 주세요', r: 'dasi malhae juseyo', p: 'da-shi mal-he ju-se-yo', e: 'please say it again' },
      { t: '천천히 말해 주세요', r: 'cheoncheonhi malhae juseyo', p: 'chuhn-chuhn-hee mal-he ju-se-yo', e: 'please speak slowly' }
    ] },

  { id: 'ko-people', kind: 'words', title: 'People and particles',
    blurb: 'Who is doing what — and the little markers that say so.',
    vocab: [
      { t: '저', r: 'jeo', p: 'juh', e: 'I', n: 'The humble form, used with anyone you are being polite to. 나 na is the casual one.' },
      { t: '저는', r: 'jeoneun', p: 'juh-neun', e: 'as for me', n: '는/은 marks the topic — what the sentence is about.' },
      { t: '사람', r: 'saram', p: 'sa-ram', e: 'person' },
      { t: '친구', r: 'chingu', p: 'chin-gu', e: 'friend' },
      { t: '남자', r: 'namja', p: 'nam-ja', e: 'man' },
      { t: '여자', r: 'yeoja', p: 'yuh-ja', e: 'woman' },
      { t: '아이', r: 'ai', p: 'ah-ee', e: 'child' },
      { t: '학생', r: 'haksaeng', p: 'hak-seng', e: 'student' },
      { t: '선생님', r: 'seonsaengnim', p: 'suhn-seng-nim', e: 'teacher', n: '-님 is an honorific. Never drop it from 선생님.' },
      { t: '누구', r: 'nugu', p: 'nu-gu', e: 'who' },
      { t: '은/는', r: 'eun/neun', p: 'eun / neun', e: 'topic marker', n: '은 after a consonant, 는 after a vowel. It marks what the sentence is about.' },
      { t: '이/가', r: 'i/ga', p: 'ee / ga', e: 'subject marker', n: '이 after a consonant, 가 after a vowel. It marks who is doing it.' },
      { t: '을/를', r: 'eul/reul', p: 'eul / reul', e: 'object marker', n: '을 after a consonant, 를 after a vowel. It marks what receives the action.' },
      { t: '우리', r: 'uri', p: 'oo-ree', e: 'we' },
      { t: '씨', r: 'ssi', p: 'ssi', e: 'Mr or Ms', n: 'Goes after the given name: 안나 씨. Never used about yourself.' }
    ],
    sentences: [
      { t: '저는 학생이에요', r: 'jeoneun haksaengieyo', p: 'juh-neun hak-seng-ee-e-yo', e: 'I am a student' },
      { t: '저 사람은 친구예요', r: 'jeo sarameun chinguyeyo', p: 'juh sa-ra-meun chin-gu-ye-yo', e: 'that person is a friend' },
      { t: '우리는 친구예요', r: 'urineun chinguyeyo', p: 'oo-ree-neun chin-gu-ye-yo', e: 'we are friends' },
      { t: '선생님이 좋아요', r: 'seonsaengnimi joayo', p: 'suhn-seng-ni-mee jo-ah-yo', e: 'the teacher is good' },
      { t: '저 여자는 누구예요 ?', r: 'jeo yeojaneun nuguyeyo?', p: 'juh yuh-ja-neun nu-gu-ye-yo', e: 'who is that woman ?' }
    ] },

  { id: 'ko-be', kind: 'words', title: 'To be, and to have',
    blurb: '이에요 for what something is, 있어요 for what exists.',
    vocab: [
      { t: '이에요', r: 'ieyo', p: 'ee-e-yo', e: 'it is', n: 'After a consonant. After a vowel it becomes 예요.' },
      { t: '예요', r: 'yeyo', p: 'ye-yo', e: 'it is' },
      { t: '아니에요', r: 'anieyo', p: 'a-nee-e-yo', e: 'it is not' },
      { t: '있어요', r: 'isseoyo', p: 'ee-ssuh-yo', e: 'there is', n: 'Covers both "there is" and "I have".' },
      { t: '없어요', r: 'eopseoyo', p: 'uhp-ssuh-yo', e: 'there is not' },
      { t: '한국', r: 'hanguk', p: 'han-guk', e: 'Korea' },
      { t: '한국어', r: 'hangugeo', p: 'han-gu-guh', e: 'Korean language' },
      { t: '캐나다', r: 'kaenada', p: 'ke-na-da', e: 'Canada' },
      { t: '영어', r: 'yeongeo', p: 'yuhng-uh', e: 'English language' },
      { t: '의사', r: 'uisa', p: 'ui-sa', e: 'doctor' },
      { t: '회사원', r: 'hoesawon', p: 'hway-sa-wuhn', e: 'office worker' },
      { t: '무엇', r: 'mueot', p: 'moo-uht', e: 'what', n: 'Usually shortened to 뭐 in speech.' },
      { t: '이것', r: 'igeot', p: 'ee-guht', e: 'this thing' },
      { t: '그것', r: 'geugeot', p: 'geu-guht', e: 'that thing' }
    ],
    sentences: [
      { t: '저는 캐나다 사람이에요', r: 'jeoneun kaenada saramieyo', p: 'juh-neun ke-na-da sa-ra-mee-e-yo', e: 'I am Canadian' },
      { t: '이것은 뭐예요 ?', r: 'igeoseun mwoyeyo?', p: 'ee-guh-seun mwuh-ye-yo', e: 'what is this ?' },
      { t: '시간이 없어요', r: 'sigani eopseoyo', p: 'shi-ga-nee uhp-ssuh-yo', e: 'there is no time' },
      { t: '친구가 있어요', r: 'chinguga isseoyo', p: 'chin-gu-ga ee-ssuh-yo', e: 'I have a friend' },
      { t: '저는 의사가 아니에요', r: 'jeoneun uisaga anieyo', p: 'juh-neun ui-sa-ga a-nee-e-yo', e: 'I am not a doctor' }
    ] },

  { id: 'ko-family', kind: 'words', title: 'Family',
    blurb: 'The people you mention most.',
    vocab: [
      { t: '가족', r: 'gajok', p: 'ga-jok', e: 'family' },
      { t: '아버지', r: 'abeoji', p: 'a-buh-ji', e: 'father' },
      { t: '어머니', r: 'eomeoni', p: 'uh-muh-ni', e: 'mother' },
      { t: '형', r: 'hyeong', p: 'hyuhng', e: 'older brother', n: 'What a man calls his older brother. A woman says 오빠.' },
      { t: '누나', r: 'nuna', p: 'nu-na', e: 'older sister', n: 'What a man calls his older sister. A woman says 언니.' },
      { t: '동생', r: 'dongsaeng', p: 'dong-seng', e: 'younger sibling', n: 'One word for both. Korean cares about older and younger, not about brother and sister.' },
      { t: '아들', r: 'adeul', p: 'a-deul', e: 'son' },
      { t: '딸', r: 'ttal', p: 'ttal', e: 'daughter' },
      { t: '할아버지', r: 'harabeoji', p: 'ha-ra-buh-ji', e: 'grandfather' },
      { t: '할머니', r: 'halmeoni', p: 'hal-muh-ni', e: 'grandmother' },
      { t: '아내', r: 'anae', p: 'a-ne', e: 'wife' },
      { t: '남편', r: 'nampyeon', p: 'nam-pyuhn', e: 'husband' },
      { t: '제', r: 'je', p: 'je', e: 'my', n: 'The humble form of 내. Use it whenever you use 저.' },
      { t: '명', r: 'myeong', p: 'myuhng', e: 'counter for people', n: 'Korean counts things with a counter word: 두 명, "two people".' }
    ],
    sentences: [
      { t: '제 가족은 캐나다에 있어요', r: 'je gajogeun kaenadae isseoyo', p: 'je ga-jo-geun ke-na-da-e ee-ssuh-yo', e: 'my family is in Canada' },
      { t: '동생이 두 명 있어요', r: 'dongsaengi du myeong isseoyo', p: 'dong-seng-ee du myuhng ee-ssuh-yo', e: 'I have two younger siblings' },
      { t: '어머니는 선생님이에요', r: 'eomeonineun seonsaengnimieyo', p: 'uh-muh-ni-neun suhn-seng-ni-mee-e-yo', e: 'my mother is a teacher' },
      { t: '아버지가 의사예요', r: 'abeojiga uisayeyo', p: 'a-buh-ji-ga ui-sa-ye-yo', e: 'my father is a doctor' }
    ] },

  { id: 'ko-num', kind: 'words', title: 'Numbers',
    blurb: 'Korean has two counting systems. You need both.',
    vocab: [
      { t: '하나', r: 'hana', p: 'ha-na', e: 'one', n: 'Native Korean numbers, used for counting things and for hours.' },
      { t: '둘', r: 'dul', p: 'dool', e: 'two' },
      { t: '셋', r: 'set', p: 'set', e: 'three' },
      { t: '넷', r: 'net', p: 'net', e: 'four' },
      { t: '다섯', r: 'daseot', p: 'da-suht', e: 'five' },
      { t: '일', r: 'il', p: 'eel', e: 'one sino', n: 'Sino-Korean numbers, used for money, dates, minutes and phone numbers.' },
      { t: '이', r: 'i', p: 'ee', e: 'two sino' },
      { t: '삼', r: 'sam', p: 'sam', e: 'three sino' },
      { t: '사', r: 'sa', p: 'sa', e: 'four sino' },
      { t: '오', r: 'o', p: 'oh', e: 'five sino' },
      { t: '십', r: 'sip', p: 'ship', e: 'ten sino' },
      { t: '백', r: 'baek', p: 'bek', e: 'hundred' },
      { t: '천', r: 'cheon', p: 'chuhn', e: 'thousand' },
      { t: '개', r: 'gae', p: 'ge', e: 'counter for things' },
      { t: '살', r: 'sal', p: 'sal', e: 'years of age' }
    ],
    sentences: [
      { t: '커피 두 개 주세요', r: 'keopi du gae juseyo', p: 'kuh-pee du ge ju-se-yo', e: 'two coffees please' },
      { t: '저는 서른 살이에요', r: 'jeoneun seoreun sarieyo', p: 'juh-neun suh-reun sa-ree-e-yo', e: 'I am thirty years old' },
      { t: '오천 원이에요', r: 'ocheon wonieyo', p: 'oh-chuhn wuh-nee-e-yo', e: 'it is five thousand won' },
      { t: '몇 개 있어요 ?', r: 'myeot gae isseoyo?', p: 'myuht ge ee-ssuh-yo', e: 'how many are there ?' }
    ] },

  { id: 'ko-food', kind: 'words', title: 'Food and drink',
    blurb: 'Ordering, and saying what you like.',
    vocab: [
      { t: '물', r: 'mul', p: 'mool', e: 'water' },
      { t: '밥', r: 'bap', p: 'bap', e: 'rice', n: 'Also means "a meal" — 밥 먹었어요? is how you ask "have you eaten?"' },
      { t: '고기', r: 'gogi', p: 'go-gi', e: 'meat' },
      { t: '닭고기', r: 'dakgogi', p: 'dak-go-gi', e: 'chicken' },
      { t: '생선', r: 'saengseon', p: 'seng-suhn', e: 'fish' },
      { t: '계란', r: 'gyeran', p: 'gye-ran', e: 'egg' },
      { t: '우유', r: 'uyu', p: 'oo-yu', e: 'milk' },
      { t: '커피', r: 'keopi', p: 'kuh-pee', e: 'coffee' },
      { t: '차', r: 'cha', p: 'cha', e: 'tea' },
      { t: '사과', r: 'sagwa', p: 'sa-gwa', e: 'apple' },
      { t: '김치', r: 'gimchi', p: 'gim-chi', e: 'kimchi' },
      { t: '소금', r: 'sogeum', p: 'so-geum', e: 'salt' },
      { t: '음식', r: 'eumsik', p: 'eum-shik', e: 'food' },
      { t: '식당', r: 'sikdang', p: 'shik-dang', e: 'restaurant' },
      { t: '먹어요', r: 'meogeoyo', p: 'muh-guh-yo', e: 'I eat' },
      { t: '마셔요', r: 'masyeoyo', p: 'ma-shuh-yo', e: 'I drink' },
      { t: '맛있어요', r: 'masisseoyo', p: 'ma-shi-ssuh-yo', e: 'it is delicious' },
      { t: '주세요', r: 'juseyo', p: 'ju-se-yo', e: 'please give me', n: 'The single most useful phrase for ordering anything.' }
    ],
    sentences: [
      { t: '물 주세요', r: 'mul juseyo', p: 'mool ju-se-yo', e: 'water please' },
      { t: '김치가 맛있어요', r: 'gimchiga masisseoyo', p: 'gim-chi-ga ma-shi-ssuh-yo', e: 'the kimchi is delicious' },
      { t: '저는 고기를 안 먹어요', r: 'jeoneun gogireul an meogeoyo', p: 'juh-neun go-gi-reul an muh-guh-yo', e: 'I do not eat meat', n: '안 before the verb makes it negative.' },
      { t: '커피를 마셔요', r: 'keopireul masyeoyo', p: 'kuh-pee-reul ma-shuh-yo', e: 'I drink coffee' },
      { t: '뭐 먹을 거예요 ?', r: 'mwo meogeul geoyeyo?', p: 'mwuh muh-geul guh-ye-yo', e: 'what will you eat ?' }
    ] },

  { id: 'ko-places', kind: 'words', title: 'Places',
    blurb: 'Where things are, and the particles that say so.',
    vocab: [
      { t: '집', r: 'jip', p: 'jip', e: 'house' },
      { t: '학교', r: 'hakgyo', p: 'hak-kyo', e: 'school' },
      { t: '시장', r: 'sijang', p: 'shi-jang', e: 'market' },
      { t: '도시', r: 'dosi', p: 'do-shi', e: 'city' },
      { t: '길', r: 'gil', p: 'gil', e: 'road' },
      { t: '호텔', r: 'hotel', p: 'ho-tel', e: 'hotel' },
      { t: '병원', r: 'byeongwon', p: 'byuhng-wuhn', e: 'hospital' },
      { t: '사무실', r: 'samusil', p: 'sa-moo-shil', e: 'office' },
      { t: '가게', r: 'gage', p: 'ga-ge', e: 'shop' },
      { t: '화장실', r: 'hwajangsil', p: 'hwa-jang-shil', e: 'toilet' },
      { t: '여기', r: 'yeogi', p: 'yuh-gi', e: 'here' },
      { t: '거기', r: 'geogi', p: 'guh-gi', e: 'there' },
      { t: '어디', r: 'eodi', p: 'uh-di', e: 'where' },
      { t: '에', r: 'e', p: 'e', e: 'at', n: 'Marks a destination or a location: 학교에 가요, "I go to school".' },
      { t: '에서', r: 'eseo', p: 'e-suh', e: 'from', n: 'Marks where an action happens, or where you came from.' },
      { t: '옆', r: 'yeop', p: 'yuhp', e: 'beside' }
    ],
    sentences: [
      { t: '화장실이 어디예요 ?', r: 'hwajangsiri eodiyeyo?', p: 'hwa-jang-shi-ree uh-di-ye-yo', e: 'where is the toilet ?' },
      { t: '저는 집에 있어요', r: 'jeoneun jibe isseoyo', p: 'juh-neun ji-be ee-ssuh-yo', e: 'I am at home' },
      { t: '학교에 가요', r: 'hakgyoe gayo', p: 'hak-kyo-e ga-yo', e: 'I go to school' },
      { t: '시장에서 사요', r: 'sijangeseo sayo', p: 'shi-jang-e-suh sa-yo', e: 'I buy it at the market' },
      { t: '가게가 여기 있어요', r: 'gagega yeogi isseoyo', p: 'ga-ge-ga yuh-gi ee-ssuh-yo', e: 'the shop is here' }
    ] },

  { id: 'ko-verbs', kind: 'words', title: 'Everyday verbs',
    blurb: 'The polite present, which ends in 요.',
    vocab: [
      { t: '가요', r: 'gayo', p: 'ga-yo', e: 'I go' },
      { t: '와요', r: 'wayo', p: 'wa-yo', e: 'I come' },
      { t: '해요', r: 'haeyo', p: 'he-yo', e: 'I do', n: 'From 하다. Sticks onto nouns to make verbs: 공부해요, "I study".' },
      { t: '봐요', r: 'bwayo', p: 'bwa-yo', e: 'I see' },
      { t: '알아요', r: 'arayo', p: 'a-ra-yo', e: 'I know' },
      { t: '몰라요', r: 'mollayo', p: 'mol-la-yo', e: 'I do not know' },
      { t: '말해요', r: 'malhaeyo', p: 'mal-he-yo', e: 'I speak' },
      { t: '살아요', r: 'sarayo', p: 'sa-ra-yo', e: 'I live' },
      { t: '일해요', r: 'ilhaeyo', p: 'eel-he-yo', e: 'I work' },
      { t: '읽어요', r: 'ilgeoyo', p: 'eel-guh-yo', e: 'I read' },
      { t: '써요', r: 'sseoyo', p: 'ssuh-yo', e: 'I write' },
      { t: '좋아해요', r: 'joahaeyo', p: 'jo-ah-he-yo', e: 'I like' },
      { t: '원해요', r: 'wonhaeyo', p: 'wuhn-he-yo', e: 'I want' },
      { t: '이해해요', r: 'ihaehaeyo', p: 'ee-he-he-yo', e: 'I understand' },
      { t: '안', r: 'an', p: 'an', e: 'not' },
      { t: '공부해요', r: 'gongbuhaeyo', p: 'gong-bu-he-yo', e: 'I study' }
    ],
    sentences: [
      { t: '한국어를 조금 말해요', r: 'hangugeoreul jogeum malhaeyo', p: 'han-gu-guh-reul jo-geum mal-he-yo', e: 'I speak a little Korean' },
      { t: '저는 이해 안 해요', r: 'jeoneun ihae an haeyo', p: 'juh-neun ee-he an he-yo', e: 'I do not understand' },
      { t: '영어를 말해요 ?', r: 'yeongeoreul malhaeyo?', p: 'yuhng-uh-reul mal-he-yo', e: 'do you speak English ?' },
      { t: '사무실에서 일해요', r: 'samusireseo ilhaeyo', p: 'sa-moo-shi-re-suh eel-he-yo', e: 'I work in an office' },
      { t: '한국어를 공부해요', r: 'hangugeoreul gongbuhaeyo', p: 'han-gu-guh-reul gong-bu-he-yo', e: 'I study Korean' },
      { t: '저는 김치를 좋아해요', r: 'jeoneun gimchireul joahaeyo', p: 'juh-neun gim-chi-reul jo-ah-he-yo', e: 'I like kimchi' }
    ] },

  { id: 'ko-desc', kind: 'words', title: 'Describing things',
    blurb: 'Korean adjectives are verbs. They conjugate and they go last.',
    vocab: [
      { t: '커요', r: 'keoyo', p: 'kuh-yo', e: 'it is big' },
      { t: '작아요', r: 'jagayo', p: 'ja-ga-yo', e: 'it is small' },
      { t: '좋아요', r: 'joayo', p: 'jo-ah-yo', e: 'it is good' },
      { t: '나빠요', r: 'nappayo', p: 'nap-pa-yo', e: 'it is bad' },
      { t: '새', r: 'sae', p: 'se', e: 'new' },
      { t: '비싸요', r: 'bissayo', p: 'bi-ssa-yo', e: 'it is expensive' },
      { t: '싸요', r: 'ssayo', p: 'ssa-yo', e: 'it is cheap' },
      { t: '쉬워요', r: 'swiwoyo', p: 'shwi-wuh-yo', e: 'it is easy' },
      { t: '어려워요', r: 'eoryeowoyo', p: 'uh-ryuh-wuh-yo', e: 'it is difficult' },
      { t: '빨라요', r: 'ppallayo', p: 'ppal-la-yo', e: 'it is fast' },
      { t: '느려요', r: 'neuryeoyo', p: 'neu-ryuh-yo', e: 'it is slow' },
      { t: '뜨거워요', r: 'tteugeowoyo', p: 'tteu-guh-wuh-yo', e: 'it is hot' },
      { t: '차가워요', r: 'chagawoyo', p: 'cha-ga-wuh-yo', e: 'it is cold' },
      { t: '예뻐요', r: 'yeppeoyo', p: 'ye-ppuh-yo', e: 'it is pretty' },
      { t: '많이', r: 'mani', p: 'ma-ni', e: 'a lot' },
      { t: '조금', r: 'jogeum', p: 'jo-geum', e: 'a little' },
      { t: '아주', r: 'aju', p: 'a-ju', e: 'very' }
    ],
    sentences: [
      { t: '집이 아주 커요', r: 'jibi aju keoyo', p: 'ji-bee a-ju kuh-yo', e: 'the house is very big' },
      { t: '한국어는 어려워요', r: 'hangugeoneun eoryeowoyo', p: 'han-gu-guh-neun uh-ryuh-wuh-yo', e: 'Korean is difficult' },
      { t: '커피가 뜨거워요', r: 'keopiga tteugeowoyo', p: 'kuh-pee-ga tteu-guh-wuh-yo', e: 'the coffee is hot' },
      { t: '이거 너무 비싸요', r: 'igeo neomu bissayo', p: 'ee-guh nuh-mu bi-ssa-yo', e: 'this is too expensive' },
      { t: '날씨가 좋아요', r: 'nalssiga joayo', p: 'nal-ssi-ga jo-ah-yo', e: 'the weather is good' }
    ] },

  { id: 'ko-quest', kind: 'words', title: 'Questions',
    blurb: 'Asking things. The word order does not change — only the tone.',
    vocab: [
      { t: '뭐', r: 'mwo', p: 'mwuh', e: 'what' },
      { t: '언제', r: 'eonje', p: 'uhn-je', e: 'when' },
      { t: '왜', r: 'wae', p: 'we', e: 'why' },
      { t: '어떻게', r: 'eotteoke', p: 'uh-ttuh-ke', e: 'how' },
      { t: '얼마', r: 'eolma', p: 'uhl-ma', e: 'how much' },
      { t: '몇', r: 'myeot', p: 'myuht', e: 'how many' },
      { t: '어느', r: 'eoneu', p: 'uh-neu', e: 'which' },
      { t: '왜냐하면', r: 'waenyahamyeon', p: 'we-nya-ha-myuhn', e: 'because' },
      { t: '항상', r: 'hangsang', p: 'hang-sang', e: 'always' },
      { t: '절대', r: 'jeoldae', p: 'juhl-de', e: 'never' },
      { t: '지금', r: 'jigeum', p: 'ji-geum', e: 'now' },
      { t: '자주', r: 'jaju', p: 'ja-ju', e: 'often' },
      { t: '가끔', r: 'gakkeum', p: 'ga-kkeum', e: 'sometimes' },
      { t: '벌써', r: 'beolsseo', p: 'buhl-ssuh', e: 'already' },
      { t: '아직', r: 'ajik', p: 'a-jik', e: 'still' }
    ],
    sentences: [
      { t: '이거 뭐예요 ?', r: 'igeo mwoyeyo?', p: 'ee-guh mwuh-ye-yo', e: 'what is this ?' },
      { t: '왜 안 와요 ?', r: 'wae an wayo?', p: 'we an wa-yo', e: 'why are you not coming ?' },
      { t: '얼마예요 ?', r: 'eolmayeyo?', p: 'uhl-ma-ye-yo', e: 'how much is it ?' },
      { t: '언제 가요 ?', r: 'eonje gayo?', p: 'uhn-je ga-yo', e: 'when do you go ?' },
      { t: '저는 고기를 절대 안 먹어요', r: 'jeoneun gogireul jeoldae an meogeoyo', p: 'juh-neun go-gi-reul juhl-de an muh-guh-yo', e: 'I never eat meat' }
    ] },

  { id: 'ko-time', kind: 'words', title: 'Time and days',
    blurb: 'Telling the time, and saying when.',
    vocab: [
      { t: '오늘', r: 'oneul', p: 'oh-neul', e: 'today' },
      { t: '내일', r: 'naeil', p: 'ne-eel', e: 'tomorrow' },
      { t: '어제', r: 'eoje', p: 'uh-je', e: 'yesterday' },
      { t: '시간', r: 'sigan', p: 'shi-gan', e: 'time' },
      { t: '시', r: 'si', p: 'shi', e: 'o\'clock' },
      { t: '분', r: 'bun', p: 'boon', e: 'minute' },
      { t: '날', r: 'nal', p: 'nal', e: 'day' },
      { t: '주', r: 'ju', p: 'ju', e: 'week' },
      { t: '달', r: 'dal', p: 'dal', e: 'month' },
      { t: '년', r: 'nyeon', p: 'nyuhn', e: 'year' },
      { t: '월요일', r: 'woryoil', p: 'wuh-ryo-eel', e: 'Monday', n: 'Days end in 요일. 월 is moon, 화 fire, 수 water — the same series as Japanese.' },
      { t: '화요일', r: 'hwayoil', p: 'hwa-yo-eel', e: 'Tuesday' },
      { t: '금요일', r: 'geumyoil', p: 'geu-myo-eel', e: 'Friday' },
      { t: '토요일', r: 'toyoil', p: 'to-yo-eel', e: 'Saturday' },
      { t: '일요일', r: 'iryoil', p: 'ee-ryo-eel', e: 'Sunday' },
      { t: '아침', r: 'achim', p: 'a-chim', e: 'morning' },
      { t: '저녁', r: 'jeonyeok', p: 'juh-nyuhk', e: 'evening' },
      { t: '밤', r: 'bam', p: 'bam', e: 'night' }
    ],
    sentences: [
      { t: '지금 몇 시예요 ?', r: 'jigeum myeot siyeyo?', p: 'ji-geum myuht shi-ye-yo', e: 'what time is it now ?' },
      { t: '오늘은 월요일이에요', r: 'oneureun woryoirieyo', p: 'oh-neu-reun wuh-ryo-ee-ree-e-yo', e: 'today is Monday' },
      { t: '아침에 일해요', r: 'achime ilhaeyo', p: 'a-chi-me eel-he-yo', e: 'I work in the morning' },
      { t: '내일 봐요', r: 'naeil bwayo', p: 'ne-eel bwa-yo', e: 'see you tomorrow' },
      { t: '저녁에 시간 있어요 ?', r: 'jeonyeoge sigan isseoyo?', p: 'juh-nyuh-ge shi-gan ee-ssuh-yo', e: 'do you have time in the evening ?' }
    ] },

  { id: 'ko-shop', kind: 'words', title: 'Shopping and money',
    blurb: 'Buying things and asking the price.',
    vocab: [
      { t: '돈', r: 'don', p: 'don', e: 'money' },
      { t: '원', r: 'won', p: 'wuhn', e: 'won' },
      { t: '카드', r: 'kadeu', p: 'ka-deu', e: 'card' },
      { t: '사요', r: 'sayo', p: 'sa-yo', e: 'I buy' },
      { t: '팔아요', r: 'parayo', p: 'pa-ra-yo', e: 'I sell' },
      { t: '옷', r: 'ot', p: 'ot', e: 'clothes' },
      { t: '신발', r: 'sinbal', p: 'shin-bal', e: 'shoes' },
      { t: '가방', r: 'gabang', p: 'ga-bang', e: 'bag' },
      { t: '선물', r: 'seonmul', p: 'suhn-mool', e: 'gift' },
      { t: '열려요', r: 'yeollyeoyo', p: 'yuhl-lyuh-yo', e: 'it is open' },
      { t: '닫혀요', r: 'dadhyeoyo', p: 'da-chyuh-yo', e: 'it is closed' },
      { t: '공짜', r: 'gongjja', p: 'gong-jja', e: 'free of charge' },
      { t: '다른', r: 'dareun', p: 'da-reun', e: 'another' },
      { t: '너무', r: 'neomu', p: 'nuh-mu', e: 'too much' },
      { t: '이거', r: 'igeo', p: 'ee-guh', e: 'this one' }
    ],
    sentences: [
      { t: '이 옷 얼마예요 ?', r: 'i ot eolmayeyo?', p: 'ee ot uhl-ma-ye-yo', e: 'how much are these clothes ?' },
      { t: '카드로 낼게요', r: 'kadeuro naelgeyo', p: 'ka-deu-ro nel-ge-yo', e: 'I will pay by card' },
      { t: '너무 비싸요', r: 'neomu bissayo', p: 'nuh-mu bi-ssa-yo', e: 'it is too expensive' },
      { t: '가게가 닫혀요', r: 'gagega dadhyeoyo', p: 'ga-ge-ga da-chyuh-yo', e: 'the shop is closed' },
      { t: '선물을 사요', r: 'seonmureul sayo', p: 'suhn-mu-reul sa-yo', e: 'I am buying a gift' }
    ] },

  { id: 'ko-travel', kind: 'words', title: 'Travel',
    blurb: 'Getting from one place to another.',
    vocab: [
      { t: '자동차', r: 'jadongcha', p: 'ja-dong-cha', e: 'car', n: 'Often shortened to just 차 — the same syllable as 차 "tea".' },
      { t: '기차', r: 'gicha', p: 'gi-cha', e: 'train' },
      { t: '비행기', r: 'bihaenggi', p: 'bi-heng-gi', e: 'aeroplane' },
      { t: '공항', r: 'gonghang', p: 'gong-hang', e: 'airport' },
      { t: '표', r: 'pyo', p: 'pyo', e: 'ticket' },
      { t: '짐', r: 'jim', p: 'jim', e: 'luggage' },
      { t: '여행', r: 'yeohaeng', p: 'yuh-heng', e: 'trip' },
      { t: '역', r: 'yeok', p: 'yuhk', e: 'station' },
      { t: '버스', r: 'beoseu', p: 'buh-seu', e: 'bus' },
      { t: '지하철', r: 'jihacheol', p: 'ji-ha-chuhl', e: 'subway' },
      { t: '도착해요', r: 'dochakhaeyo', p: 'do-cha-ke-yo', e: 'I arrive' },
      { t: '출발해요', r: 'chulbalhaeyo', p: 'chul-bal-he-yo', e: 'I depart' },
      { t: '기다려요', r: 'gidaryeoyo', p: 'gi-da-ryuh-yo', e: 'I wait' },
      { t: '걸어요', r: 'georeoyo', p: 'guh-ruh-yo', e: 'I walk' },
      { t: '나라', r: 'nara', p: 'na-ra', e: 'country' },
      { t: '세계', r: 'segye', p: 'se-gye', e: 'world' }
    ],
    sentences: [
      { t: '기차가 언제 출발해요 ?', r: 'gichaga eonje chulbalhaeyo?', p: 'gi-cha-ga uhn-je chul-bal-he-yo', e: 'when does the train depart ?' },
      { t: '공항이 어디예요 ?', r: 'gonghangi eodiyeyo?', p: 'gong-hang-ee uh-di-ye-yo', e: 'where is the airport ?' },
      { t: '표 한 장 주세요', r: 'pyo han jang juseyo', p: 'pyo han jang ju-se-yo', e: 'one ticket please' },
      { t: '지하철로 가요', r: 'jihacheollo gayo', p: 'ji-ha-chuhl-lo ga-yo', e: 'I go by subway' },
      { t: '여기에서 기다려요', r: 'yeogieseo gidaryeoyo', p: 'yuh-gi-e-suh gi-da-ryuh-yo', e: 'I wait here' }
    ] },

  { id: 'ko-past', kind: 'words', title: 'The past',
    blurb: 'Add 었/았 before the ending and you are in the past.',
    vocab: [
      { t: '갔어요', r: 'gasseoyo', p: 'ga-ssuh-yo', e: 'I went', n: '가요 becomes 갔어요. The pattern is regular once you see it.' },
      { t: '왔어요', r: 'wasseoyo', p: 'wa-ssuh-yo', e: 'I came' },
      { t: '했어요', r: 'haesseoyo', p: 'he-ssuh-yo', e: 'I did' },
      { t: '먹었어요', r: 'meogeosseoyo', p: 'muh-guh-ssuh-yo', e: 'I ate' },
      { t: '봤어요', r: 'bwasseoyo', p: 'bwa-ssuh-yo', e: 'I saw' },
      { t: '말했어요', r: 'malhaesseoyo', p: 'mal-he-ssuh-yo', e: 'I said' },
      { t: '있었어요', r: 'isseosseoyo', p: 'ee-ssuh-ssuh-yo', e: 'there was' },
      { t: '태어났어요', r: 'taeeonasseoyo', p: 'te-uh-na-ssuh-yo', e: 'I was born' },
      { t: '만났어요', r: 'mannasseoyo', p: 'man-na-ssuh-yo', e: 'I met' },
      { t: '잊었어요', r: 'ijeosseoyo', p: 'ee-juh-ssuh-yo', e: 'I forgot' },
      { t: '지난주', r: 'jinanju', p: 'ji-nan-ju', e: 'last week' },
      { t: '전에', r: 'jeone', p: 'juh-ne', e: 'before' },
      { t: '후에', r: 'hue', p: 'hu-e', e: 'after' },
      { t: '처음', r: 'cheoeum', p: 'chuh-eum', e: 'the first time' }
    ],
    sentences: [
      { t: '어제 시장에 갔어요', r: 'eoje sijange gasseoyo', p: 'uh-je shi-jang-e ga-ssuh-yo', e: 'yesterday I went to the market' },
      { t: '식당에서 먹었어요', r: 'sikdangeseo meogeosseoyo', p: 'shik-dang-e-suh muh-guh-ssuh-yo', e: 'I ate at the restaurant' },
      { t: '뭐 했어요 ?', r: 'mwo haesseoyo?', p: 'mwuh he-ssuh-yo', e: 'what did you do ?' },
      { t: '캐나다에서 태어났어요', r: 'kaenadaeseo taeeonasseoyo', p: 'ke-na-da-e-suh te-uh-na-ssuh-yo', e: 'I was born in Canada' },
      { t: '이름을 잊었어요', r: 'ireumeul ijeosseoyo', p: 'ee-reu-meul ee-juh-ssuh-yo', e: 'I forgot the name' }
    ] },

  { id: 'ko-feel', kind: 'words', title: 'Feelings and opinions',
    blurb: 'Saying what you think.',
    vocab: [
      { t: '행복해요', r: 'haengbokhaeyo', p: 'heng-bo-ke-yo', e: 'I am happy' },
      { t: '슬퍼요', r: 'seulpeoyo', p: 'seul-puh-yo', e: 'I am sad' },
      { t: '화나요', r: 'hwanayo', p: 'hwa-na-yo', e: 'I am angry' },
      { t: '피곤해요', r: 'pigonhaeyo', p: 'pi-gon-he-yo', e: 'I am tired' },
      { t: '바빠요', r: 'bappayo', p: 'ba-ppa-yo', e: 'I am busy' },
      { t: '생각해요', r: 'saenggakhaeyo', p: 'seng-ga-ke-yo', e: 'I think' },
      { t: '믿어요', r: 'mideoyo', p: 'mi-duh-yo', e: 'I believe' },
      { t: '사랑해요', r: 'saranghaeyo', p: 'sa-rang-he-yo', e: 'I love' },
      { t: '싫어해요', r: 'sireohaeyo', p: 'shi-ruh-he-yo', e: 'I dislike' },
      { t: '생각', r: 'saenggak', p: 'seng-gak', e: 'idea' },
      { t: '맞아요', r: 'majayo', p: 'ma-ja-yo', e: 'that is right' },
      { t: '재미있어요', r: 'jaemiisseoyo', p: 'je-mi-ee-ssuh-yo', e: 'it is fun' },
      { t: '지루해요', r: 'jiruhaeyo', p: 'ji-ru-he-yo', e: 'it is boring' },
      { t: '미안해요', r: 'mianhaeyo', p: 'mi-an-he-yo', e: 'sorry' }
    ],
    sentences: [
      { t: '저는 행복해요', r: 'jeoneun haengbokhaeyo', p: 'juh-neun heng-bo-ke-yo', e: 'I am happy' },
      { t: '오늘 너무 피곤해요', r: 'oneul neomu pigonhaeyo', p: 'oh-neul nuh-mu pi-gon-he-yo', e: 'today I am very tired' },
      { t: '이 영화는 재미있어요', r: 'i yeonghwaneun jaemiisseoyo', p: 'ee yuhng-hwa-neun je-mi-ee-ssuh-yo', e: 'this film is fun' },
      { t: '맞아요 , 좋은 생각이에요', r: 'majayo, joeun saenggagieyo', p: 'ma-ja-yo jo-eun seng-ga-gee-e-yo', e: 'that is right , it is a good idea' },
      { t: '어떻게 생각해요 ?', r: 'eotteoke saenggakhaeyo?', p: 'uh-ttuh-ke seng-ga-ke-yo', e: 'what do you think ?' }
    ] },

  { id: 'ko-work', kind: 'words', title: 'Work and study',
    blurb: 'What you do, and what you are learning.',
    vocab: [
      { t: '직업', r: 'jigeop', p: 'ji-guhp', e: 'occupation' },
      { t: '회사', r: 'hoesa', p: 'hway-sa', e: 'company' },
      { t: '회의', r: 'hoeui', p: 'hway-ee', e: 'meeting' },
      { t: '이메일', r: 'imeil', p: 'ee-me-eel', e: 'email' },
      { t: '대학교', r: 'daehakgyo', p: 'de-hak-kyo', e: 'university' },
      { t: '수업', r: 'sueop', p: 'su-uhp', e: 'class' },
      { t: '시험', r: 'siheom', p: 'shi-huhm', e: 'exam' },
      { t: '질문', r: 'jilmun', p: 'jil-mun', e: 'question' },
      { t: '대답', r: 'daedap', p: 'de-dap', e: 'answer' },
      { t: '배워요', r: 'baewoyo', p: 'be-wuh-yo', e: 'I learn' },
      { t: '가르쳐요', r: 'gareuchyeoyo', p: 'ga-reu-chyuh-yo', e: 'I teach' },
      { t: '연습해요', r: 'yeonseuphaeyo', p: 'yuhn-seu-pe-yo', e: 'I practise' },
      { t: '단어', r: 'daneo', p: 'da-nuh', e: 'word' },
      { t: '말', r: 'mal', p: 'mal', e: 'language' }
    ],
    sentences: [
      { t: '한국어를 매일 배워요', r: 'hangugeoreul maeil baewoyo', p: 'han-gu-guh-reul me-eel be-wuh-yo', e: 'I learn Korean every day' },
      { t: '세 시에 회의가 있어요', r: 'se sie hoeuiga isseoyo', p: 'se shi-e hway-ee-ga ee-ssuh-yo', e: 'I have a meeting at three' },
      { t: '무슨 일을 해요 ?', r: 'museun ireul haeyo?', p: 'mu-seun ee-reul he-yo', e: 'what work do you do ?' },
      { t: '대답을 몰라요', r: 'daedabeul mollayo', p: 'de-da-beul mol-la-yo', e: 'I do not know the answer' },
      { t: '매일 연습해요', r: 'maeil yeonseuphaeyo', p: 'me-eel yuhn-seu-pe-yo', e: 'I practise every day' }
    ] },

  { id: 'ko-connect', kind: 'words', title: 'Putting sentences together',
    blurb: 'The joins that turn phrases into speech.',
    vocab: [
      { t: '그리고', r: 'geurigo', p: 'geu-ri-go', e: 'and' },
      { t: '하지만', r: 'hajiman', p: 'ha-ji-man', e: 'but' },
      { t: '그런데', r: 'geureonde', p: 'geu-ruhn-de', e: 'however' },
      { t: '또는', r: 'ttoneun', p: 'tto-neun', e: 'or' },
      { t: '그래서', r: 'geuraeseo', p: 'geu-re-suh', e: 'so' },
      { t: '만약', r: 'manyak', p: 'ma-nyak', e: 'if' },
      { t: '그럼', r: 'geureom', p: 'geu-ruhm', e: 'then' },
      { t: '같이', r: 'gachi', p: 'ga-chi', e: 'together', n: 'Written 같이 but said "ga-chi" — ㅌ before 이 turns into a ch sound.' },
      { t: '없이', r: 'eopsi', p: 'uhp-shi', e: 'without' },
      { t: '까지', r: 'kkaji', p: 'kka-ji', e: 'until' },
      { t: '부터', r: 'buteo', p: 'bu-tuh', e: 'from' },
      { t: '도', r: 'do', p: 'do', e: 'also', n: 'Attaches to the word: 저도, "me too".' },
      { t: '무엇인가', r: 'mueosinga', p: 'mu-uh-shin-ga', e: 'something' },
      { t: '아무것도', r: 'amugeotdo', p: 'a-mu-guht-tto', e: 'nothing' }
    ],
    sentences: [
      { t: '가고 싶어요 하지만 피곤해요', r: 'gago sipeoyo hajiman pigonhaeyo', p: 'ga-go shi-puh-yo ha-ji-man pi-gon-he-yo', e: 'I want to go but I am tired' },
      { t: '커피 그리고 빵 주세요', r: 'keopi geurigo ppang juseyo', p: 'kuh-pee geu-ri-go ppang ju-se-yo', e: 'coffee and bread please' },
      { t: '같이 먹어요', r: 'gachi meogeoyo', p: 'ga-chi muh-guh-yo', e: 'let us eat together' },
      { t: '저도 한국어를 배워요', r: 'jeodo hangugeoreul baewoyo', p: 'juh-do han-gu-guh-reul be-wuh-yo', e: 'I also learn Korean' },
      { t: '커피 없이 못 살아요', r: 'keopi eopsi mot sarayo', p: 'kuh-pee uhp-shi mot sa-ra-yo', e: 'I cannot live without coffee' }
    ] }

  ]
};

Courses.register(KOREAN);
})();
