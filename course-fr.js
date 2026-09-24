/* Lisan — the French course.
 *
 * Standard metropolitan French. Quebec pronunciation differs noticeably but
 * the written language is the same, which is what is taught here.
 *
 * Every entry carries an explicit `p` respelling. French is the one language
 * in the app where the spelling genuinely cannot be turned into sound by rule:
 * final consonants fall silent, vowels nasalise, and "eaux" is one sound. A
 * generator would be wrong often enough to teach the wrong pronunciation,
 * which is worse than no guide at all.
 *
 * In the respellings: `ahn`, `ohn`, `an` and `uhn` are nasal — the vowel goes
 * through the nose and the n is not really pronounced. `ew` is the tight u of
 * `tu`, made with rounded lips. `zh` is the s in "measure". `r` is made in the
 * throat, not with the tongue.
 */
(function () {
'use strict';

var FRENCH = {
  id: 'fr',
  name: 'French',
  native: 'Français',
  dir: 'ltr',
  script: 'latin',
  speech: ['fr-CA', 'fr-FR', 'fr'],
  gendered: true,
  order: 4,
  blurb: 'Standard French — one of Canada\'s two official languages, and the one most useful at home.',
  grammar: {
    wordOrder: 'French puts most adjectives after the noun (une maison blanche) and always keeps ' +
               'the subject pronoun, unlike Spanish. Negation wraps the verb: ne ... pas.',
    articles: { m: 'le', f: 'la' },
    genderNote: 'There is no reliable rule. Learn the article with the noun — "le livre", never just ' +
                '"livre" — because a noun without its gender is only half learned.'
  },
  units: [

  { id: 'fr-greet', kind: 'words', title: 'Greetings',
    blurb: 'Opening and closing a conversation politely.',
    vocab: [
      { t: 'bonjour', e: 'hello', p: 'bohn-ZHOOR' },
      { t: 'bonsoir', e: 'good evening', p: 'bohn-SWAHR' },
      { t: 'salut', e: 'hi', p: 'sah-LEW', n: 'Informal, for friends. Bonjour is always safe.' },
      { t: 'au revoir', e: 'goodbye', p: 'oh ruh-VWAHR' },
      { t: 'merci', e: 'thank you', p: 'mehr-SEE' },
      { t: 'de rien', e: 'you are welcome', p: 'duh RYAN' },
      { t: 's\'il vous plaît', e: 'please', p: 'seel voo PLEH' },
      { t: 'pardon', e: 'sorry', p: 'pahr-DOHN' },
      { t: 'excusez-moi', e: 'excuse me', p: 'ehks-kew-zay MWAH' },
      { t: 'oui', e: 'yes', p: 'WEE' },
      { t: 'non', e: 'no', p: 'NOHN' },
      { t: 'peut-être', e: 'maybe', p: 'puh-TETR' },
      { t: 'bien', e: 'well', p: 'BYAN' },
      { t: 'enchanté', e: 'pleased to meet you', p: 'ahn-shahn-TAY' },
      { t: 'à bientôt', e: 'see you soon', p: 'ah byan-TOH' },
      { t: 'bonne nuit', e: 'good night', p: 'bohn NWEE' },
      { t: 'monsieur', e: 'sir', p: 'muh-SYUH', n: 'Said "muh-syuh" — the first s is silent.' },
      { t: 'madame', e: 'madam', p: 'mah-DAHM' }
    ],
    sentences: [
      { t: 'Comment allez-vous ?', e: 'how are you ?', p: 'koh-mahn tah-lay VOO' },
      { t: 'Je vais bien , merci', e: 'I am well , thank you', p: 'zhuh veh BYAN mehr-SEE' },
      { t: 'Comment tu t\'appelles ?', e: 'what is your name ?', p: 'koh-mahn tew tah-PELL' },
      { t: 'Je m\'appelle Marie', e: 'my name is Marie', p: 'zhuh mah-PELL mah-REE' },
      { t: 'Enchanté de vous rencontrer', e: 'pleased to meet you', p: 'ahn-shahn-TAY duh voo rahn-kohn-TRAY' },
      { t: 'Bonjour , madame', e: 'hello , madam', p: 'bohn-ZHOOR mah-DAHM' },
      { t: 'Merci beaucoup', e: 'thank you very much', p: 'mehr-SEE boh-KOO' }
    ] },

  { id: 'fr-people', kind: 'words', title: 'People',
    blurb: 'Pronouns, and who you are talking about.',
    vocab: [
      { t: 'je', e: 'I', p: 'ZHUH' },
      { t: 'tu', e: 'you', p: 'TEW', n: 'Informal. Use vous with strangers and anyone older or senior.' },
      { t: 'vous', e: 'you formal', p: 'VOO' },
      { t: 'il', e: 'he', p: 'EEL' },
      { t: 'elle', e: 'she', p: 'ELL' },
      { t: 'nous', e: 'we', p: 'NOO' },
      { t: 'ils', e: 'they', p: 'EEL', n: 'Said exactly like il — the s is silent. Only writing shows the plural.' },
      { t: 'l\'homme', e: 'the man', p: 'LOHM', g: 'm' },
      { t: 'la femme', e: 'the woman', p: 'lah FAHM', g: 'f', n: 'Said "fahm", not "fem". The same word also means "wife".' },
      { t: 'le garçon', e: 'the boy', p: 'luh gahr-SOHN', g: 'm' },
      { t: 'la fille', e: 'the girl', p: 'lah FEE', g: 'f', n: 'Also means "daughter" — ma fille is my daughter.' },
      { t: 'l\'ami', e: 'the friend', p: 'lah-MEE', g: 'm' },
      { t: 'l\'enfant', e: 'the child', p: 'lahn-FAHN', g: 'm' },
      { t: 'les gens', e: 'the people', p: 'lay ZHAHN' },
      { t: 'le voisin', e: 'the neighbour', p: 'luh vwah-ZAN', g: 'm' },
      { t: 'le nom', e: 'the name', p: 'luh NOHN', g: 'm' },
      { t: 'quelqu\'un', e: 'someone', p: 'kel-KUHN' },
      { t: 'tout le monde', e: 'everyone', p: 'too luh MOHND' }
    ],
    sentences: [
      { t: 'Je suis étudiant', e: 'I am a student', p: 'zhuh swee zay-tew-DYAHN', n: 'French drops "a" before a job: je suis étudiant, not je suis un étudiant.' },
      { t: 'Elle est mon amie', e: 'she is my friend', p: 'ell eh mohn nah-MEE' },
      { t: 'Il est très gentil', e: 'he is very kind', p: 'eel eh treh zhahn-TEE' },
      { t: 'Nous sommes amis', e: 'we are friends', p: 'noo sohm zah-MEE' },
      { t: 'Qui est cette femme ?', e: 'who is that woman ?', p: 'kee eh set FAHM' },
      { t: 'Mon voisin parle français', e: 'my neighbour speaks French', p: 'mohn vwah-ZAN pahrl frahn-SEH' }
    ] },

  { id: 'fr-etre', kind: 'words', title: 'To be and to have',
    blurb: 'être and avoir. Everything else is built on these two.',
    vocab: [
      { t: 'être', e: 'to be', p: 'ETR' },
      { t: 'je suis', e: 'I am', p: 'zhuh SWEE' },
      { t: 'tu es', e: 'you are', p: 'tew EH' },
      { t: 'il est', e: 'he is', p: 'eel EH' },
      { t: 'nous sommes', e: 'we are', p: 'noo SOHM' },
      { t: 'ils sont', e: 'they are', p: 'eel SOHN' },
      { t: 'avoir', e: 'to have', p: 'ah-VWAHR' },
      { t: 'j\'ai', e: 'I have', p: 'ZHAY' },
      { t: 'tu as', e: 'you have', p: 'tew AH' },
      { t: 'il a', e: 'he has', p: 'eel AH' },
      { t: 'nous avons', e: 'we have', p: 'noo zah-VOHN' },
      { t: 'ils ont', e: 'they have', p: 'eel ZOHN' },
      { t: 'canadien', e: 'Canadian', p: 'kah-nah-DYAN' },
      { t: 'français', e: 'French', p: 'frahn-SEH' },
      { t: 'le professeur', e: 'the teacher', p: 'luh proh-feh-SUHR', g: 'm' },
      { t: 'le médecin', e: 'the doctor', p: 'luh mayd-SAN', g: 'm' },
      { t: 'fatigué', e: 'tired', p: 'fah-tee-GAY' },
      { t: 'occupé', e: 'busy', p: 'oh-kew-PAY' }
    ],
    sentences: [
      { t: 'Je suis canadien', e: 'I am Canadian', p: 'zhuh swee kah-nah-DYAN' },
      { t: 'J\'ai deux frères', e: 'I have two brothers', p: 'zhay duh FREHR' },
      { t: 'Elle est professeur', e: 'she is a teacher', p: 'ell eh proh-feh-SUHR' },
      { t: 'Je suis très fatigué', e: 'I am very tired', p: 'zhuh swee treh fah-tee-GAY' },
      { t: 'Nous avons faim', e: 'we are hungry', p: 'noo zah-vohn FAN', n: 'French *has* hunger: avoir faim. Also avoir soif, avoir froid, avoir raison.' },
      { t: 'Il a vingt ans', e: 'he is twenty years old', p: 'eel ah van TAHN' },
      { t: 'Vous êtes occupé ?', e: 'are you busy ?', p: 'voo zet oh-kew-PAY' }
    ] },

  { id: 'fr-family', kind: 'words', title: 'Family',
    blurb: 'The people you mention most.',
    vocab: [
      { t: 'la famille', e: 'the family', p: 'lah fah-MEE', g: 'f' },
      { t: 'le père', e: 'the father', p: 'luh PEHR', g: 'm' },
      { t: 'la mère', e: 'the mother', p: 'lah MEHR', g: 'f' },
      { t: 'le frère', e: 'the brother', p: 'luh FREHR', g: 'm' },
      { t: 'la sœur', e: 'the sister', p: 'lah SUHR', g: 'f' },
      { t: 'le fils', e: 'the son', p: 'luh FEESS', g: 'm', n: 'The l is silent but the s is pronounced — "feess", not "fee".' },
      { t: 'la tante', e: 'the aunt', p: 'lah TAHNT', g: 'f' },
      { t: 'les parents', e: 'the parents', p: 'lay pah-RAHN' },
      { t: 'le grand-père', e: 'the grandfather', p: 'luh grahn-PEHR', g: 'm' },
      { t: 'la grand-mère', e: 'the grandmother', p: 'lah grahn-MEHR', g: 'f' },
      { t: 'le mari', e: 'the husband', p: 'luh mah-REE', g: 'm' },
      { t: 'le cousin', e: 'the cousin', p: 'luh koo-ZAN', g: 'm' },
      { t: 'l\'oncle', e: 'the uncle', p: 'LOHNKL', g: 'm' },
      { t: 'mon', e: 'my', p: 'MOHN' },
      { t: 'ton', e: 'your', p: 'TOHN' },
      { t: 'son', e: 'his', p: 'SOHN', n: 'Means his *and* her — it agrees with the thing owned, not the owner.' },
      { t: 'notre', e: 'our', p: 'NOTR' },
      { t: 'leur', e: 'their', p: 'LUHR' }
    ],
    sentences: [
      { t: 'J\'ai une sœur', e: 'I have one sister', p: 'zhay ewn SUHR' },
      { t: 'Ma mère s\'appelle Anne', e: 'my mother is called Anne', p: 'mah mehr sah-PELL AHN' },
      { t: 'Mes parents habitent ici', e: 'my parents live here', p: 'may pah-rahn zah-BEET ee-SEE' },
      { t: 'Tu as des frères ?', e: 'do you have brothers ?', p: 'tew ah day FREHR' },
      { t: 'Son père est médecin', e: 'his father is a doctor', p: 'sohn pehr eh mayd-SAN' },
      { t: 'Notre famille est grande', e: 'our family is big', p: 'notr fah-mee eh GRAHND' }
    ] },

  { id: 'fr-num', kind: 'words', title: 'Numbers',
    blurb: 'One to a hundred. The seventies get strange.',
    vocab: [
      { t: 'un', e: 'one', p: 'UHN' },
      { t: 'deux', e: 'two', p: 'DUH' },
      { t: 'trois', e: 'three', p: 'TRWAH' },
      { t: 'quatre', e: 'four', p: 'KATR' },
      { t: 'cinq', e: 'five', p: 'SANK' },
      { t: 'six', e: 'six', p: 'SEESS' },
      { t: 'sept', e: 'seven', p: 'SET' },
      { t: 'huit', e: 'eight', p: 'WEET' },
      { t: 'neuf', e: 'nine', p: 'NUHF' },
      { t: 'dix', e: 'ten', p: 'DEESS' },
      { t: 'onze', e: 'eleven', p: 'OHNZ' },
      { t: 'douze', e: 'twelve', p: 'DOOZ' },
      { t: 'vingt', e: 'twenty', p: 'VAN' },
      { t: 'trente', e: 'thirty', p: 'TRAHNT' },
      { t: 'cinquante', e: 'fifty', p: 'san-KAHNT' },
      { t: 'soixante-dix', e: 'seventy', p: 'swah-sahnt DEESS', n: 'Literally "sixty-ten". Then eighty is quatre-vingts, "four twenties".' },
      { t: 'cent', e: 'one hundred', p: 'SAHN' },
      { t: 'beaucoup', e: 'a lot', p: 'boh-KOO' },
      { t: 'un peu', e: 'a little', p: 'uhn PUH' },
      { t: 'premier', e: 'first', p: 'pruh-MYAY' }
    ],
    sentences: [
      { t: 'J\'ai trente ans', e: 'I am thirty years old', p: 'zhay trahnt AHN' },
      { t: 'Ça coûte dix euros', e: 'it costs ten euros', p: 'sah koot dee ZUH-roh' },
      { t: 'Il y a trois personnes', e: 'there are three people', p: 'eel ee ah trwah pehr-SOHN', n: 'Il y a is "there is" and "there are" — said "eel-ee-ah", often crushed to "ya".' },
      { t: 'Je voudrais deux , merci', e: 'I would like two , thank you', p: 'zhuh voo-dreh DUH mehr-SEE' },
      { t: 'Quel âge as-tu ?', e: 'how old are you ?', p: 'kel ahzh ah TEW' }
    ] },

  { id: 'fr-food', kind: 'words', title: 'Food and drink',
    blurb: 'Ordering, and saying what you like.',
    vocab: [
      { t: 'l\'eau', e: 'the water', p: 'LOH', g: 'f' },
      { t: 'le pain', e: 'the bread', p: 'luh PAN', g: 'm' },
      { t: 'le fromage', e: 'the cheese', p: 'luh froh-MAHZH', g: 'm' },
      { t: 'la viande', e: 'the meat', p: 'lah VYAHND', g: 'f' },
      { t: 'le poulet', e: 'the chicken', p: 'luh poo-LEH', g: 'm' },
      { t: 'le poisson', e: 'the fish', p: 'luh pwah-SOHN', g: 'm' },
      { t: 'l\'œuf', e: 'the egg', p: 'LUHF', g: 'm' },
      { t: 'le lait', e: 'the milk', p: 'luh LEH', g: 'm' },
      { t: 'le café', e: 'the coffee', p: 'luh kah-FAY', g: 'm' },
      { t: 'le thé', e: 'the tea', p: 'luh TAY', g: 'm' },
      { t: 'le vin', e: 'the wine', p: 'luh VAN', g: 'm' },
      { t: 'la pomme', e: 'the apple', p: 'lah POHM', g: 'f' },
      { t: 'le riz', e: 'the rice', p: 'luh REE', g: 'm' },
      { t: 'le sel', e: 'the salt', p: 'luh SEL', g: 'm' },
      { t: 'le repas', e: 'the meal', p: 'luh ruh-PAH', g: 'm' },
      { t: 'le restaurant', e: 'the restaurant', p: 'luh res-toh-RAHN', g: 'm' },
      { t: 'l\'addition', e: 'the bill', p: 'lah-dee-SYOHN', g: 'f' },
      { t: 'manger', e: 'to eat', p: 'mahn-ZHAY' },
      { t: 'boire', e: 'to drink', p: 'BWAHR' },
      { t: 'délicieux', e: 'delicious', p: 'day-lee-SYUH' }
    ],
    sentences: [
      { t: 'Je voudrais un café', e: 'I would like a coffee', p: 'zhuh voo-dreh zuhn kah-FAY', n: 'Je voudrais is the polite way to order. Je veux is blunt.' },
      { t: 'Le pain est délicieux', e: 'the bread is delicious', p: 'luh pan eh day-lee-SYUH' },
      { t: 'Je ne mange pas de viande', e: 'I do not eat meat', p: 'zhuh nuh mahnzh pah duh VYAHND', n: 'Negation wraps the verb: ne before, pas after.' },
      { t: 'L\'addition , s\'il vous plaît', e: 'the bill , please', p: 'lah-dee-syohn seel voo PLEH' },
      { t: 'Qu\'est-ce que tu veux manger ?', e: 'what do you want to eat ?', p: 'kess kuh tew vuh mahn-ZHAY' },
      { t: 'J\'aime le fromage', e: 'I like cheese', p: 'zhem luh froh-MAHZH' }
    ] },

  { id: 'fr-places', kind: 'words', title: 'Places',
    blurb: 'Where things are, and how to ask.',
    vocab: [
      { t: 'la maison', e: 'the house', p: 'lah meh-ZOHN', g: 'f' },
      { t: 'l\'école', e: 'the school', p: 'lay-KOHL', g: 'f' },
      { t: 'le marché', e: 'the market', p: 'luh mahr-SHAY', g: 'm' },
      { t: 'la ville', e: 'the city', p: 'lah VEEL', g: 'f' },
      { t: 'la rue', e: 'the street', p: 'lah REW', g: 'f' },
      { t: 'l\'hôtel', e: 'the hotel', p: 'loh-TEL', g: 'm' },
      { t: 'l\'hôpital', e: 'the hospital', p: 'loh-pee-TAHL', g: 'm' },
      { t: 'le bureau', e: 'the office', p: 'luh bew-ROH', g: 'm' },
      { t: 'le magasin', e: 'the shop', p: 'luh mah-gah-ZAN', g: 'm' },
      { t: 'les toilettes', e: 'the toilet', p: 'lay twah-LET' },
      { t: 'ici', e: 'here', p: 'ee-SEE' },
      { t: 'là', e: 'there', p: 'LAH' },
      { t: 'près', e: 'near', p: 'PREH' },
      { t: 'loin', e: 'far', p: 'LWAN' },
      { t: 'à droite', e: 'to the right', p: 'ah DRWAHT' },
      { t: 'à gauche', e: 'to the left', p: 'ah GOHSH' },
      { t: 'dans', e: 'in', p: 'DAHN' },
      { t: 'avec', e: 'with', p: 'ah-VEK' }
    ],
    sentences: [
      { t: 'Où sont les toilettes ?', e: 'where is the toilet ?', p: 'oo sohn lay twah-LET' },
      { t: 'Le marché est près d\'ici', e: 'the market is near here', p: 'luh mahr-shay eh preh dee-SEE' },
      { t: 'J\'habite dans une grande ville', e: 'I live in a big city', p: 'zhah-beet dahn zewn grahnd VEEL' },
      { t: 'C\'est à droite', e: 'it is to the right', p: 'seh tah DRWAHT' },
      { t: 'Je vais à l\'école', e: 'I go to school', p: 'zhuh veh zah lay-KOHL' },
      { t: 'C\'est loin d\'ici ?', e: 'is it far from here ?', p: 'seh lwan dee-SEE' }
    ] },

  { id: 'fr-verbs', kind: 'words', title: 'Everyday verbs',
    blurb: 'The present tense, and the endings that carry it.',
    vocab: [
      { t: 'parler', e: 'to speak', p: 'pahr-LAY', n: 'An -er verb: je parle, tu parles, il parle — all three said identically.' },
      { t: 'je parle', e: 'I speak', p: 'zhuh PAHRL' },
      { t: 'aller', e: 'to go', p: 'ah-LAY' },
      { t: 'je vais', e: 'I go', p: 'zhuh VEH' },
      { t: 'faire', e: 'to do', p: 'FEHR' },
      { t: 'je fais', e: 'I do', p: 'zhuh FEH' },
      { t: 'vouloir', e: 'to want', p: 'voo-LWAHR' },
      { t: 'je veux', e: 'I want', p: 'zhuh VUH' },
      { t: 'pouvoir', e: 'to be able to', p: 'poo-VWAHR' },
      { t: 'je peux', e: 'I can', p: 'zhuh PUH' },
      { t: 'savoir', e: 'to know', p: 'sah-VWAHR' },
      { t: 'je sais', e: 'I know', p: 'zhuh SEH' },
      { t: 'habiter', e: 'to live', p: 'ah-bee-TAY' },
      { t: 'travailler', e: 'to work', p: 'trah-vah-YAY' },
      { t: 'comprendre', e: 'to understand', p: 'kohn-PRAHNDR' },
      { t: 'lire', e: 'to read', p: 'LEER' },
      { t: 'écrire', e: 'to write', p: 'ay-KREER' },
      { t: 'venir', e: 'to come', p: 'vuh-NEER' }
    ],
    sentences: [
      { t: 'Je parle un peu français', e: 'I speak a little French', p: 'zhuh pahrl uhn puh frahn-SEH' },
      { t: 'Je ne comprends pas', e: 'I do not understand', p: 'zhuh nuh kohn-prahn PAH' },
      { t: 'Tu parles anglais ?', e: 'do you speak English ?', p: 'tew pahrl zahn-GLEH' },
      { t: 'Je travaille dans un bureau', e: 'I work in an office', p: 'zhuh trah-vahy dahn zuhn bew-ROH' },
      { t: 'Je veux apprendre le français', e: 'I want to learn French', p: 'zhuh vuh ah-prahndr luh frahn-SEH' },
      { t: 'Qu\'est-ce que tu fais ?', e: 'what are you doing ?', p: 'kess kuh tew FEH' }
    ] },

  { id: 'fr-desc', kind: 'words', title: 'Describing things',
    blurb: 'Adjectives, and making them agree.',
    vocab: [
      { t: 'grand', e: 'big', p: 'GRAHN' },
      { t: 'petit', e: 'small', p: 'puh-TEE' },
      { t: 'nouveau', e: 'new', p: 'noo-VOH' },
      { t: 'vieux', e: 'old', p: 'VYUH' },
      { t: 'bon', e: 'good', p: 'BOHN' },
      { t: 'mauvais', e: 'bad', p: 'moh-VEH' },
      { t: 'beau', e: 'beautiful', p: 'BOH' },
      { t: 'cher', e: 'expensive', p: 'SHEHR' },
      { t: 'facile', e: 'easy', p: 'fah-SEEL' },
      { t: 'difficile', e: 'difficult', p: 'dee-fee-SEEL' },
      { t: 'rapide', e: 'fast', p: 'rah-PEED' },
      { t: 'lent', e: 'slow', p: 'LAHN' },
      { t: 'chaud', e: 'hot', p: 'SHOH' },
      { t: 'froid', e: 'cold', p: 'FRWAH' },
      { t: 'long', e: 'long', p: 'LOHN' },
      { t: 'content', e: 'pleased', p: 'kohn-TAHN' },
      { t: 'très', e: 'very', p: 'TREH' },
      { t: 'plus', e: 'more', p: 'PLEW' }
    ],
    sentences: [
      { t: 'La maison est très grande', e: 'the house is very big', p: 'lah meh-zohn eh treh GRAHND', n: 'Grand becomes grande for a feminine noun — and now the d is pronounced.' },
      { t: 'C\'est un beau livre', e: 'it is a beautiful book', p: 'seh tuhn boh LEEVR' },
      { t: 'Le français n\'est pas difficile', e: 'French is not difficult', p: 'luh frahn-seh neh pah dee-fee-SEEL' },
      { t: 'Ce café est trop chaud', e: 'this coffee is too hot', p: 'suh kah-fay eh troh SHOH' },
      { t: 'Ma voiture est vieille', e: 'my car is old', p: 'mah vwah-tewr eh VYAY' }
    ] },

  { id: 'fr-quest', kind: 'words', title: 'Questions',
    blurb: 'Asking things, in the three ways French allows.',
    vocab: [
      { t: 'qui', e: 'who', p: 'KEE' },
      { t: 'quoi', e: 'what', p: 'KWAH' },
      { t: 'où', e: 'where', p: 'OO' },
      { t: 'quand', e: 'when', p: 'KAHN' },
      { t: 'pourquoi', e: 'why', p: 'poor-KWAH' },
      { t: 'comment', e: 'how', p: 'koh-MAHN' },
      { t: 'combien', e: 'how much', p: 'kohn-BYAN' },
      { t: 'quel', e: 'which', p: 'KEL' },
      { t: 'parce que', e: 'because', p: 'pahrs KUH' },
      { t: 'est-ce que', e: 'question marker', p: 'ess KUH', n: 'Put est-ce que in front of a statement and it becomes a question.' },
      { t: 'toujours', e: 'always', p: 'too-ZHOOR' },
      { t: 'jamais', e: 'never', p: 'zhah-MEH' },
      { t: 'maintenant', e: 'now', p: 'mant-NAHN' },
      { t: 'souvent', e: 'often', p: 'soo-VAHN' },
      { t: 'déjà', e: 'already', p: 'day-ZHAH' },
      { t: 'encore', e: 'again', p: 'ahn-KOHR' }
    ],
    sentences: [
      { t: 'Qu\'est-ce que c\'est ?', e: 'what is this ?', p: 'kess kuh SEH' },
      { t: 'Pourquoi tu ne viens pas ?', e: 'why are you not coming ?', p: 'poor-kwah tew nuh vyan PAH' },
      { t: 'Parce que je suis occupé', e: 'because I am busy', p: 'pahrs kuh zhuh swee zoh-kew-PAY' },
      { t: 'Combien ça coûte ?', e: 'how much does it cost ?', p: 'kohn-byan sah KOOT' },
      { t: 'Quand est-ce que tu arrives ?', e: 'when do you arrive ?', p: 'kahn tess kuh tew ah-REEV' },
      { t: 'Je ne fume jamais', e: 'I never smoke', p: 'zhuh nuh fewm zhah-MEH' }
    ] },

  { id: 'fr-time', kind: 'words', title: 'Time and days',
    blurb: 'Telling the time, and saying when.',
    vocab: [
      { t: 'aujourd\'hui', e: 'today', p: 'oh-zhoor-DWEE' },
      { t: 'demain', e: 'tomorrow', p: 'duh-MAN' },
      { t: 'hier', e: 'yesterday', p: 'ee-YEHR' },
      { t: 'l\'heure', e: 'the hour', p: 'LUHR', g: 'f', n: 'The h is silent, so it is l\'heure and "une heure" links as "ewn UHR".' },
      { t: 'le jour', e: 'the day', p: 'luh ZHOOR', g: 'm' },
      { t: 'la semaine', e: 'the week', p: 'lah suh-MEN', g: 'f' },
      { t: 'le mois', e: 'the month', p: 'luh MWAH', g: 'm' },
      { t: 'l\'année', e: 'the year', p: 'lah-NAY', g: 'f' },
      { t: 'lundi', e: 'Monday', p: 'luhn-DEE' },
      { t: 'mardi', e: 'Tuesday', p: 'mahr-DEE' },
      { t: 'mercredi', e: 'Wednesday', p: 'mehr-kruh-DEE' },
      { t: 'jeudi', e: 'Thursday', p: 'zhuh-DEE' },
      { t: 'vendredi', e: 'Friday', p: 'vahn-druh-DEE' },
      { t: 'samedi', e: 'Saturday', p: 'sahm-DEE' },
      { t: 'dimanche', e: 'Sunday', p: 'dee-MAHNSH' },
      { t: 'le matin', e: 'the morning', p: 'luh mah-TAN', g: 'm' },
      { t: 'le soir', e: 'the evening', p: 'luh SWAHR', g: 'm' },
      { t: 'tard', e: 'late', p: 'TAHR' }
    ],
    sentences: [
      { t: 'Quelle heure est-il ?', e: 'what time is it ?', p: 'kel uhr eh TEEL' },
      { t: 'Aujourd\'hui c\'est lundi', e: 'today is Monday', p: 'oh-zhoor-dwee seh luhn-DEE', n: 'Days are not capitalised in French.' },
      { t: 'Je travaille le matin', e: 'I work in the morning', p: 'zhuh trah-vahy luh mah-TAN' },
      { t: 'À demain !', e: 'see you tomorrow !', p: 'ah duh-MAN' },
      { t: 'Je suis en retard', e: 'I am late', p: 'zhuh swee zahn ruh-TAHR' },
      { t: 'La réunion est vendredi', e: 'the meeting is on Friday', p: 'lah ray-ew-nyohn eh vahn-druh-DEE' }
    ] },

  { id: 'fr-shop', kind: 'words', title: 'Shopping and money',
    blurb: 'Buying things and asking the price.',
    vocab: [
      { t: 'l\'argent', e: 'the money', p: 'lahr-ZHAHN', g: 'm' },
      { t: 'le prix', e: 'the price', p: 'luh PREE', g: 'm' },
      { t: 'la carte', e: 'the card', p: 'lah KAHRT', g: 'f' },
      { t: 'acheter', e: 'to buy', p: 'ahsh-TAY' },
      { t: 'vendre', e: 'to sell', p: 'VAHNDR' },
      { t: 'payer', e: 'to pay', p: 'peh-YAY' },
      { t: 'coûter', e: 'to cost', p: 'koo-TAY' },
      { t: 'les vêtements', e: 'the clothes', p: 'lay vet-MAHN' },
      { t: 'la chemise', e: 'the shirt', p: 'lah shuh-MEEZ', g: 'f' },
      { t: 'les chaussures', e: 'the shoes', p: 'lay shoh-SEWR' },
      { t: 'le sac', e: 'the bag', p: 'luh SAHK', g: 'm' },
      { t: 'le cadeau', e: 'the gift', p: 'luh kah-DOH', g: 'm' },
      { t: 'ouvert', e: 'open', p: 'oo-VEHR' },
      { t: 'fermé', e: 'closed', p: 'fehr-MAY' },
      { t: 'gratuit', e: 'free of charge', p: 'grah-TWEE' },
      { t: 'autre', e: 'another', p: 'OHTR' },
      { t: 'trop', e: 'too much', p: 'TROH' },
      { t: 'assez', e: 'enough', p: 'ah-SAY' }
    ],
    sentences: [
      { t: 'Combien coûte cette chemise ?', e: 'how much does this shirt cost ?', p: 'kohn-byan koot set shuh-MEEZ' },
      { t: 'Je voudrais payer par carte', e: 'I would like to pay by card', p: 'zhuh voo-dreh peh-yay pahr KAHRT' },
      { t: 'C\'est trop cher', e: 'it is too expensive', p: 'seh troh SHEHR' },
      { t: 'Le magasin est fermé', e: 'the shop is closed', p: 'luh mah-gah-zan eh fehr-MAY' },
      { t: 'Je cherche un cadeau', e: 'I am looking for a gift', p: 'zhuh shehrsh uhn kah-DOH' },
      { t: 'Vous avez une autre taille ?', e: 'do you have another size ?', p: 'voo zah-vay ewn ohtr TAHY' }
    ] },

  { id: 'fr-home', kind: 'words', title: 'Home and routine',
    blurb: 'The house, and the shape of a day.',
    vocab: [
      { t: 'la porte', e: 'the door', p: 'lah PORT', g: 'f' },
      { t: 'la fenêtre', e: 'the window', p: 'lah fuh-NETR', g: 'f' },
      { t: 'la table', e: 'the table', p: 'lah TAHBL', g: 'f' },
      { t: 'la chaise', e: 'the chair', p: 'lah SHEZ', g: 'f' },
      { t: 'le lit', e: 'the bed', p: 'luh LEE', g: 'm' },
      { t: 'la cuisine', e: 'the kitchen', p: 'lah kwee-ZEEN', g: 'f' },
      { t: 'la chambre', e: 'the bedroom', p: 'lah SHAHNBR', g: 'f' },
      { t: 'la clé', e: 'the key', p: 'lah KLAY', g: 'f' },
      { t: 'le livre', e: 'the book', p: 'luh LEEVR', g: 'm' },
      { t: 'dormir', e: 'to sleep', p: 'dor-MEER' },
      { t: 'se réveiller', e: 'to wake up', p: 'suh ray-veh-YAY' },
      { t: 'laver', e: 'to wash', p: 'lah-VAY' },
      { t: 'nettoyer', e: 'to clean', p: 'neh-twah-YAY' },
      { t: 'cuisiner', e: 'to cook', p: 'kwee-zee-NAY' },
      { t: 'se reposer', e: 'to rest', p: 'suh ruh-poh-ZAY' },
      { t: 'ouvrir', e: 'to open', p: 'oo-VREER' },
      { t: 'fermer', e: 'to close', p: 'fehr-MAY' },
      { t: 'chercher', e: 'to look for', p: 'shehr-SHAY' }
    ],
    sentences: [
      { t: 'Je me réveille à sept heures', e: 'I wake up at seven', p: 'zhuh muh ray-vehy ah set UHR', n: 'Reflexive: literally "I wake myself".' },
      { t: 'Je cuisine tous les jours', e: 'I cook every day', p: 'zhuh kwee-zeen too lay ZHOOR' },
      { t: 'Le livre est sur la table', e: 'the book is on the table', p: 'luh leevr eh sewr lah TAHBL' },
      { t: 'Tu peux ouvrir la fenêtre ?', e: 'can you open the window ?', p: 'tew puh oo-vreer lah fuh-NETR' },
      { t: 'Je cherche mes clés', e: 'I am looking for my keys', p: 'zhuh shehrsh may KLAY' },
      { t: 'Je vais me reposer', e: 'I am going to rest', p: 'zhuh veh muh ruh-poh-ZAY' }
    ] },

  { id: 'fr-travel', kind: 'words', title: 'Travel',
    blurb: 'Getting from one place to another.',
    vocab: [
      { t: 'la voiture', e: 'the car', p: 'lah vwah-TEWR', g: 'f' },
      { t: 'le train', e: 'the train', p: 'luh TRAN', g: 'm' },
      { t: 'l\'avion', e: 'the aeroplane', p: 'lah-VYOHN', g: 'm' },
      { t: 'l\'aéroport', e: 'the airport', p: 'lah-ay-roh-POR', g: 'm' },
      { t: 'le billet', e: 'the ticket', p: 'luh bee-YEH', g: 'm' },
      { t: 'la valise', e: 'the suitcase', p: 'lah vah-LEEZ', g: 'f' },
      { t: 'le voyage', e: 'the trip', p: 'luh vwah-YAHZH', g: 'm' },
      { t: 'la gare', e: 'the station', p: 'lah GAHR', g: 'f' },
      { t: 'la carte routière', e: 'the map', p: 'lah kahrt roo-TYEHR', g: 'f' },
      { t: 'voyager', e: 'to travel', p: 'vwah-yah-ZHAY' },
      { t: 'arriver', e: 'to arrive', p: 'ah-ree-VAY' },
      { t: 'partir', e: 'to leave', p: 'pahr-TEER' },
      { t: 'attendre', e: 'to wait', p: 'ah-TAHNDR' },
      { t: 'perdre', e: 'to lose', p: 'PEHRDR' },
      { t: 'marcher', e: 'to walk', p: 'mahr-SHAY' },
      { t: 'le pays', e: 'the country', p: 'luh peh-EE', g: 'm' },
      { t: 'la route', e: 'the road', p: 'lah ROOT', g: 'f' },
      { t: 'le monde', e: 'the world', p: 'luh MOHND', g: 'm' }
    ],
    sentences: [
      { t: 'À quelle heure part le train ?', e: 'what time does the train leave ?', p: 'ah kel uhr pahr luh TRAN' },
      { t: 'J\'ai perdu ma valise', e: 'I lost my suitcase', p: 'zhay pehr-dew mah vah-LEEZ' },
      { t: 'Je voudrais un billet pour Paris', e: 'I would like a ticket to Paris', p: 'zhuh voo-dreh zuhn bee-yeh poor pah-REE' },
      { t: 'L\'avion arrive à neuf heures', e: 'the aeroplane arrives at nine', p: 'lah-vyohn ah-reev ah nuh VUHR' },
      { t: 'Nous allons voyager en train', e: 'we are going to travel by train', p: 'noo zah-lohn vwah-yah-zhay ahn TRAN' },
      { t: 'Où est la gare ?', e: 'where is the station ?', p: 'oo eh lah GAHR' }
    ] },

  { id: 'fr-past', kind: 'words', title: 'The past',
    blurb: 'The passé composé — have + participle, as in English.',
    vocab: [
      { t: 'j\'ai mangé', e: 'I ate', p: 'zhay mahn-ZHAY', n: 'avoir + past participle. Literally "I have eaten", used for both.' },
      { t: 'j\'ai fait', e: 'I did', p: 'zhay FEH' },
      { t: 'j\'ai vu', e: 'I saw', p: 'zhay VEW' },
      { t: 'j\'ai dit', e: 'I said', p: 'zhay DEE' },
      { t: 'j\'ai pris', e: 'I took', p: 'zhay PREE' },
      { t: 'je suis allé', e: 'I went', p: 'zhuh swee zah-LAY', n: 'Verbs of coming and going use être, not avoir — and the participle then agrees: allée for a woman.' },
      { t: 'je suis venu', e: 'I came', p: 'zhuh swee vuh-NEW' },
      { t: 'j\'étais', e: 'I was', p: 'zhay-TEH' },
      { t: 'j\'avais', e: 'I had', p: 'zhah-VEH' },
      { t: 'hier soir', e: 'last night', p: 'ee-yehr SWAHR' },
      { t: 'la semaine dernière', e: 'last week', p: 'lah suh-men dehr-NYEHR' },
      { t: 'avant', e: 'before', p: 'ah-VAHN' },
      { t: 'après', e: 'after', p: 'ah-PREH' },
      { t: 'naître', e: 'to be born', p: 'NETR' },
      { t: 'rencontrer', e: 'to meet', p: 'rahn-kohn-TRAY' },
      { t: 'oublier', e: 'to forget', p: 'oo-blee-YAY' }
    ],
    sentences: [
      { t: 'Hier je suis allé au marché', e: 'yesterday I went to the market', p: 'ee-yehr zhuh swee zah-lay oh mahr-SHAY' },
      { t: 'J\'ai mangé au restaurant', e: 'I ate at the restaurant', p: 'zhay mahn-zhay oh res-toh-RAHN' },
      { t: 'Qu\'est-ce que tu as fait ?', e: 'what did you do ?', p: 'kess kuh tew ah FEH' },
      { t: 'Je n\'ai rien dit', e: 'I said nothing', p: 'zhuh nay ryan DEE' },
      { t: 'Je suis né au Canada', e: 'I was born in Canada', p: 'zhuh swee nay oh kah-nah-DAH' },
      { t: 'J\'ai oublié son nom', e: 'I forgot his name', p: 'zhay oo-blee-yay sohn NOHN' }
    ] },

  { id: 'fr-future', kind: 'words', title: 'Plans and the future',
    blurb: 'What you are going to do.',
    vocab: [
      { t: 'je vais faire', e: 'I am going to do', p: 'zhuh veh FEHR', n: 'aller + infinitive, exactly like English "going to".' },
      { t: 'tu vas', e: 'you are going to', p: 'tew VAH' },
      { t: 'nous allons', e: 'we are going to', p: 'noo zah-LOHN' },
      { t: 'devoir', e: 'to have to', p: 'duh-VWAHR' },
      { t: 'je dois', e: 'I must', p: 'zhuh DWAH' },
      { t: 'essayer', e: 'to try', p: 'eh-seh-YAY' },
      { t: 'commencer', e: 'to begin', p: 'koh-mahn-SAY' },
      { t: 'finir', e: 'to finish', p: 'fee-NEER' },
      { t: 'continuer', e: 'to continue', p: 'kohn-tee-new-AY' },
      { t: 'le projet', e: 'the plan', p: 'luh proh-ZHEH', g: 'm' },
      { t: 'bientôt', e: 'soon', p: 'byan-TOH' },
      { t: 'plus tard', e: 'later', p: 'plew TAHR' },
      { t: 'prochain', e: 'next', p: 'proh-SHAN' },
      { t: 'ensemble', e: 'together', p: 'ahn-SAHNBL' },
      { t: 'espérer', e: 'to hope', p: 'ehs-pay-RAY' },
      { t: 'aider', e: 'to help', p: 'eh-DAY' }
    ],
    sentences: [
      { t: 'Je vais étudier le français', e: 'I am going to study French', p: 'zhuh veh zay-tew-dyay luh frahn-SEH' },
      { t: 'Tu peux m\'aider ?', e: 'can you help me ?', p: 'tew puh meh-DAY' },
      { t: 'Je dois travailler demain', e: 'I must work tomorrow', p: 'zhuh dwah trah-vah-yay duh-MAN' },
      { t: 'Nous allons manger ensemble', e: 'we are going to eat together', p: 'noo zah-lohn mahn-zhay ahn-SAHNBL' },
      { t: 'Le mois prochain je voyage', e: 'next month I travel', p: 'luh mwah proh-shan zhuh vwah-YAHZH' },
      { t: 'J\'espère te voir bientôt', e: 'I hope to see you soon', p: 'zhehs-pehr tuh vwahr byan-TOH' }
    ] },

  { id: 'fr-body', kind: 'words', title: 'Health and the body',
    blurb: 'Saying what hurts.',
    vocab: [
      { t: 'la tête', e: 'the head', p: 'lah TET', g: 'f' },
      { t: 'l\'œil', e: 'the eye', p: 'LUHY', g: 'm', n: 'The plural is completely different: les yeux, "lay ZYUH".' },
      { t: 'la bouche', e: 'the mouth', p: 'lah BOOSH', g: 'f' },
      { t: 'la main', e: 'the hand', p: 'lah MAN', g: 'f' },
      { t: 'le pied', e: 'the foot', p: 'luh PYAY', g: 'm' },
      { t: 'le bras', e: 'the arm', p: 'luh BRAH', g: 'm' },
      { t: 'la jambe', e: 'the leg', p: 'lah ZHAHNB', g: 'f' },
      { t: 'le ventre', e: 'the stomach', p: 'luh VAHNTR', g: 'm' },
      { t: 'le dos', e: 'the back', p: 'luh DOH', g: 'm' },
      { t: 'le cœur', e: 'the heart', p: 'luh KUHR', g: 'm' },
      { t: 'malade', e: 'ill', p: 'mah-LAHD' },
      { t: 'la douleur', e: 'the pain', p: 'lah doo-LUHR', g: 'f' },
      { t: 'la pharmacie', e: 'the pharmacy', p: 'lah fahr-mah-SEE', g: 'f' },
      { t: 'le rendez-vous', e: 'the appointment', p: 'luh rahn-day VOO', g: 'm' },
      { t: 'se sentir', e: 'to feel', p: 'suh sahn-TEER' },
      { t: 'avoir mal', e: 'to be in pain', p: 'ah-vwahr MAHL', n: 'J\'ai mal à la tête — literally "I have pain at the head".' }
    ],
    sentences: [
      { t: 'J\'ai mal à la tête', e: 'my head hurts', p: 'zhay mahl ah lah TET' },
      { t: 'Je suis malade aujourd\'hui', e: 'I am ill today', p: 'zhuh swee mah-lahd oh-zhoor-DWEE' },
      { t: 'Comment tu te sens ?', e: 'how do you feel ?', p: 'koh-mahn tew tuh SAHN' },
      { t: 'Je cherche une pharmacie', e: 'I am looking for a pharmacy', p: 'zhuh shehrsh ewn fahr-mah-SEE' },
      { t: 'J\'ai un rendez-vous demain', e: 'I have an appointment tomorrow', p: 'zhay uhn rahn-day-voo duh-MAN' }
    ] },

  { id: 'fr-weather', kind: 'words', title: 'Weather and seasons',
    blurb: 'Small talk, everywhere.',
    vocab: [
      { t: 'le temps', e: 'the weather', p: 'luh TAHN', g: 'm', n: 'Also means "time": je n\'ai pas le temps.' },
      { t: 'le soleil', e: 'the sun', p: 'luh soh-LEHY', g: 'm' },
      { t: 'la pluie', e: 'the rain', p: 'lah PLWEE', g: 'f' },
      { t: 'la neige', e: 'the snow', p: 'lah NEZH', g: 'f' },
      { t: 'le vent', e: 'the wind', p: 'luh VAHN', g: 'm' },
      { t: 'le nuage', e: 'the cloud', p: 'luh new-AHZH', g: 'm' },
      { t: 'l\'hiver', e: 'the winter', p: 'lee-VEHR', g: 'm' },
      { t: 'le printemps', e: 'the spring', p: 'luh pran-TAHN', g: 'm' },
      { t: 'l\'été', e: 'the summer', p: 'lay-TAY', g: 'm' },
      { t: 'l\'automne', e: 'the autumn', p: 'loh-TOHN', g: 'm' },
      { t: 'pleuvoir', e: 'to rain', p: 'pluh-VWAHR' },
      { t: 'neiger', e: 'to snow', p: 'neh-ZHAY' },
      { t: 'il fait', e: 'it is', p: 'eel FEH', n: 'Weather uses faire: il fait froid, il fait beau. Literally "it makes cold".' },
      { t: 'dehors', e: 'outside', p: 'duh-OR' },
      { t: 'dedans', e: 'inside', p: 'duh-DAHN' }
    ],
    sentences: [
      { t: 'Il fait très froid aujourd\'hui', e: 'it is very cold today', p: 'eel feh treh frwah oh-zhoor-DWEE' },
      { t: 'Il pleut dehors', e: 'it is raining outside', p: 'eel pluh duh-OR' },
      { t: 'En hiver il neige beaucoup', e: 'in winter it snows a lot', p: 'ahn nee-vehr eel nezh boh-KOO' },
      { t: 'Quel temps fait-il ?', e: 'what is the weather like ?', p: 'kel tahn feh TEEL' },
      { t: 'J\'aime le printemps', e: 'I like the spring', p: 'zhem luh pran-TAHN' }
    ] },

  { id: 'fr-feel', kind: 'words', title: 'Feelings and opinions',
    blurb: 'Saying what you think.',
    vocab: [
      { t: 'heureux', e: 'happy', p: 'uh-RUH' },
      { t: 'triste', e: 'sad', p: 'TREEST' },
      { t: 'fâché', e: 'angry', p: 'fah-SHAY' },
      { t: 'inquiet', e: 'worried', p: 'an-KYEH' },
      { t: 'calme', e: 'calm', p: 'KAHLM' },
      { t: 'penser', e: 'to think', p: 'pahn-SAY' },
      { t: 'je pense', e: 'I think', p: 'zhuh PAHNS' },
      { t: 'croire', e: 'to believe', p: 'KRWAHR' },
      { t: 'aimer', e: 'to like', p: 'eh-MAY', n: 'Also "to love". J\'aime le café is "I like coffee"; je t\'aime is "I love you".' },
      { t: 'adorer', e: 'to love', p: 'ah-doh-RAY' },
      { t: 'préférer', e: 'to prefer', p: 'pray-fay-RAY' },
      { t: 'détester', e: 'to hate', p: 'day-tes-TAY' },
      { t: 'l\'idée', e: 'the idea', p: 'lee-DAY', g: 'f' },
      { t: 'la vérité', e: 'the truth', p: 'lah vay-ree-TAY', g: 'f' },
      { t: 'd\'accord', e: 'agreed', p: 'dah-KOR' },
      { t: 'génial', e: 'great', p: 'zhay-NYAHL' },
      { t: 'ennuyeux', e: 'boring', p: 'ahn-nwee-YUH' }
    ],
    sentences: [
      { t: 'Je pense que tu as raison', e: 'I think you are right', p: 'zhuh pahns kuh tew ah reh-ZOHN' },
      { t: 'J\'adore cet endroit', e: 'I love this place', p: 'zhah-dor set ahn-DRWAH' },
      { t: 'Je suis très heureux', e: 'I am very happy', p: 'zhuh swee treh zuh-RUH' },
      { t: 'Je ne suis pas d\'accord', e: 'I do not agree', p: 'zhuh nuh swee pah dah-KOR' },
      { t: 'Qu\'est-ce que tu penses ?', e: 'what do you think ?', p: 'kess kuh tew PAHNS' },
      { t: 'Je préfère le thé', e: 'I prefer tea', p: 'zhuh pray-fehr luh TAY' }
    ] },

  { id: 'fr-work', kind: 'words', title: 'Work and study',
    blurb: 'What you do, and what you are learning.',
    vocab: [
      { t: 'le travail', e: 'the job', p: 'luh trah-VAHY', g: 'm' },
      { t: 'l\'entreprise', e: 'the company', p: 'lahn-truh-PREEZ', g: 'f' },
      { t: 'le patron', e: 'the boss', p: 'luh pah-TROHN', g: 'm' },
      { t: 'la réunion', e: 'the meeting', p: 'lah ray-ew-NYOHN', g: 'f' },
      { t: 'le courriel', e: 'the email', p: 'luh koo-RYEL', g: 'm', n: 'The Quebec word. France says le mail or l\'e-mail.' },
      { t: 'l\'université', e: 'the university', p: 'lew-nee-vehr-see-TAY', g: 'f' },
      { t: 'le cours', e: 'the class', p: 'luh KOOR', g: 'm' },
      { t: 'l\'examen', e: 'the exam', p: 'lehg-zah-MAN', g: 'm' },
      { t: 'la question', e: 'the question', p: 'lah kehs-TYOHN', g: 'f' },
      { t: 'la réponse', e: 'the answer', p: 'lah ray-POHNS', g: 'f' },
      { t: 'étudier', e: 'to study', p: 'ay-tew-DYAY' },
      { t: 'apprendre', e: 'to learn', p: 'ah-PRAHNDR' },
      { t: 'enseigner', e: 'to teach', p: 'ahn-seh-NYAY' },
      { t: 'pratiquer', e: 'to practise', p: 'prah-tee-KAY' },
      { t: 'le mot', e: 'the word', p: 'luh MOH', g: 'm' },
      { t: 'la langue', e: 'the language', p: 'lah LAHNG', g: 'f', n: 'Also means "tongue".' }
    ],
    sentences: [
      { t: 'J\'étudie le français tous les jours', e: 'I study French every day', p: 'zhay-tew-dee luh frahn-seh too lay ZHOOR' },
      { t: 'J\'ai une réunion à trois heures', e: 'I have a meeting at three', p: 'zhay ewn ray-ew-nyohn ah trwah ZUHR' },
      { t: 'Quel est ton travail ?', e: 'what is your job ?', p: 'kel eh tohn trah-VAHY' },
      { t: 'Je veux apprendre une autre langue', e: 'I want to learn another language', p: 'zhuh vuh ah-prahndr ewn ohtr LAHNG' },
      { t: 'Je ne sais pas la réponse', e: 'I do not know the answer', p: 'zhuh nuh seh pah lah ray-POHNS' }
    ] },

  { id: 'fr-connect', kind: 'words', title: 'Putting sentences together',
    blurb: 'The small words that turn phrases into speech.',
    vocab: [
      { t: 'et', e: 'and', p: 'AY' },
      { t: 'mais', e: 'but', p: 'MEH' },
      { t: 'ou', e: 'or', p: 'OO' },
      { t: 'si', e: 'if', p: 'SEE' },
      { t: 'donc', e: 'so', p: 'DOHNK' },
      { t: 'alors', e: 'then', p: 'ah-LOR' },
      { t: 'aussi', e: 'also', p: 'oh-SEE' },
      { t: 'pourtant', e: 'however', p: 'poor-TAHN' },
      { t: 'pendant', e: 'during', p: 'pahn-DAHN' },
      { t: 'sans', e: 'without', p: 'SAHN' },
      { t: 'pour', e: 'for', p: 'POOR' },
      { t: 'chez', e: 'at the home of', p: 'SHAY', n: 'No English equivalent: chez moi is "at my place", chez le médecin is "at the doctor\'s".' },
      { t: 'jusqu\'à', e: 'until', p: 'zhews-KAH' },
      { t: 'depuis', e: 'since', p: 'duh-PWEE' },
      { t: 'quelque chose', e: 'something', p: 'kel-kuh SHOHZ' },
      { t: 'rien', e: 'nothing', p: 'RYAN' }
    ],
    sentences: [
      { t: 'Je veux venir mais je suis fatigué', e: 'I want to come but I am tired', p: 'zhuh vuh vuh-neer meh zhuh swee fah-tee-GAY' },
      { t: 'S\'il pleut , je reste ici', e: 'if it rains , I stay here', p: 'seel pluh zhuh rest ee-SEE' },
      { t: 'J\'étudie le français parce que j\'aime ça', e: 'I study French because I like it', p: 'zhay-tew-dee luh frahn-seh pahrs kuh zhem SAH' },
      { t: 'On mange chez moi ce soir', e: 'we are eating at my place tonight', p: 'ohn mahnzh shay mwah suh SWAHR' },
      { t: 'Je ne peux pas vivre sans café', e: 'I cannot live without coffee', p: 'zhuh nuh puh pah veevr sahn kah-FAY' },
      { t: 'Il travaille ici depuis deux ans', e: 'he has worked here for two years', p: 'eel trah-vahy ee-see duh-pwee duh ZAHN' }
    ] }

  ]
};

Courses.register(FRENCH);
})();
