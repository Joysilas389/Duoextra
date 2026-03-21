// Local data store — provides content when backend endpoints aren't fully built
// This makes the app functional immediately. Backend can be swapped in later.

export const grammarTopics = [
  { id: '1', title: 'Definite & Indefinite Articles', slug: 'articles', category: 'articles', level: 'A1', explanation: 'German has three genders: masculine (der), feminine (die), and neuter (das). The indefinite articles are ein/eine/ein.\n\nMasculine: der Mann → ein Mann\nFeminine: die Frau → eine Frau\nNeuter: das Kind → ein Kind\nPlural: die Kinder (no indefinite plural)', examples: ['Der Hund ist groß. (The dog is big.)', 'Ich habe eine Katze. (I have a cat.)', 'Das Haus ist alt. (The house is old.)'] },
  { id: '2', title: 'Noun Gender Rules', slug: 'noun-gender', category: 'articles', level: 'A1', explanation: 'While German noun gender must often be memorized, there are helpful patterns:\n\nFeminine (-ung, -heit, -keit, -schaft, -tion): die Wohnung, die Freiheit\nNeuter (-chen, -lein, -ment, -um): das Mädchen, das Instrument\nMasculine (-er, -ling, -ismus): der Lehrer, der Frühling', examples: ['die Zeitung (newspaper) — ends in -ung', 'das Häuschen (little house) — ends in -chen', 'der Computer — borrowed words often masculine'] },
  { id: '3', title: 'Nominative Case', slug: 'nominative', category: 'cases', level: 'A1', explanation: 'The nominative case is used for the subject of a sentence — the person or thing doing the action.\n\nder/ein (masc), die/eine (fem), das/ein (neut), die/- (plural)', examples: ['Der Mann liest. (The man reads.)', 'Eine Frau singt. (A woman sings.)', 'Das Kind spielt. (The child plays.)'] },
  { id: '4', title: 'Accusative Case', slug: 'accusative', category: 'cases', level: 'A1', explanation: 'The accusative marks the direct object — what receives the action. Only masculine articles change: der→den, ein→einen.\n\nden/einen (masc), die/eine (fem), das/ein (neut), die/- (plural)', examples: ['Ich sehe den Mann. (I see the man.)', 'Sie kauft einen Hund. (She buys a dog.)', 'Wir essen das Brot. (We eat the bread.)'] },
  { id: '5', title: 'Dative Case', slug: 'dative', category: 'cases', level: 'A2', explanation: 'The dative marks the indirect object — to/for whom something is done.\n\ndem/einem (masc), der/einer (fem), dem/einem (neut), den+n/-n (plural)', examples: ['Ich gebe dem Mann das Buch. (I give the man the book.)', 'Sie hilft der Frau. (She helps the woman.)', 'Er dankt den Kindern. (He thanks the children.)'] },
  { id: '6', title: 'Present Tense Verbs', slug: 'present-tense', category: 'verbs', level: 'A1', explanation: 'Regular German verbs follow this pattern:\nich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en\n\nExample with "machen" (to make/do):\nich mache, du machst, er macht, wir machen, ihr macht, sie machen', examples: ['Ich lerne Deutsch. (I learn German.)', 'Du spielst Fußball. (You play football.)', 'Wir wohnen in Berlin. (We live in Berlin.)'] },
  { id: '7', title: 'Perfekt (Present Perfect)', slug: 'perfekt', category: 'verbs', level: 'A2', explanation: 'The Perfekt is the main past tense in spoken German. It uses haben or sein + past participle.\n\nhaben + ge...t (regular): Ich habe gemacht\nsein + ge...en (movement/change): Ich bin gegangen\n\nSein verbs: gehen, kommen, fahren, fliegen, laufen, schwimmen, sterben, werden', examples: ['Ich habe Deutsch gelernt. (I learned German.)', 'Sie ist nach Berlin gefahren. (She drove to Berlin.)', 'Wir haben Pizza gegessen. (We ate pizza.)'] },
  { id: '8', title: 'Modal Verbs', slug: 'modal-verbs', category: 'verbs', level: 'A2', explanation: 'Six modal verbs modify the main verb:\nkönnen (can), müssen (must), dürfen (may), sollen (should), wollen (want), mögen (like)\n\nModal verb goes in position 2, infinitive at end of sentence.', examples: ['Ich kann Deutsch sprechen. (I can speak German.)', 'Du musst jetzt gehen. (You must go now.)', 'Er will Arzt werden. (He wants to become a doctor.)'] },
  { id: '9', title: 'Separable Verbs', slug: 'separable-verbs', category: 'verbs', level: 'A2', explanation: 'Some verbs have separable prefixes (an-, auf-, aus-, ein-, mit-, zu-, etc). In main clauses, the prefix goes to the end.\n\nanfangen → Ich fange morgen an.\naufstehen → Er steht um 7 Uhr auf.\neinkaufen → Wir kaufen im Supermarkt ein.', examples: ['Ich rufe dich morgen an. (I\'ll call you tomorrow.)', 'Sie macht die Tür auf. (She opens the door.)', 'Der Zug kommt um 8 Uhr an. (The train arrives at 8.)'] },
  { id: '10', title: 'Wechselpräpositionen', slug: 'two-way-prepositions', category: 'prepositions', level: 'B1', explanation: 'Nine two-way prepositions take accusative (movement/direction) or dative (location/position):\n\nan, auf, hinter, in, neben, über, unter, vor, zwischen\n\nWohin? (Where to?) → Accusative: Ich gehe in den Park.\nWo? (Where?) → Dative: Ich bin in dem (im) Park.', examples: ['Ich stelle das Buch auf den Tisch. (I put the book on the table.) — ACC', 'Das Buch liegt auf dem Tisch. (The book is on the table.) — DAT'] },
  { id: '11', title: 'Relative Clauses', slug: 'relative-clauses', category: 'sentence_structure', level: 'B1', explanation: 'Relative pronouns introduce subordinate clauses. The verb goes to the END.\n\nThe relative pronoun matches the gender/number of the noun it refers to, but its case depends on its role in the relative clause.', examples: ['Der Mann, der hier wohnt, ist nett. (The man who lives here is nice.)', 'Die Frau, die ich kenne, ist Ärztin. (The woman whom I know is a doctor.)', 'Das Buch, das ich lese, ist spannend. (The book that I\'m reading is exciting.)'] },
  { id: '12', title: 'Konjunktiv II', slug: 'konjunktiv-ii', category: 'verbs', level: 'B2', explanation: 'Konjunktiv II expresses wishes, hypotheticals, and polite requests.\n\nwürde + infinitive (most verbs): Ich würde gern reisen.\nOwn forms (common): wäre (sein), hätte (haben), könnte, müsste, dürfte\n\nWenn ich Zeit hätte, würde ich Deutsch lernen.', examples: ['Wenn ich reich wäre, würde ich um die Welt reisen.', 'Könnten Sie mir bitte helfen?', 'Ich hätte gern einen Kaffee.'] },
];

export const vocabItems = [
  { id: '1', word: 'das Haus', translation: 'house', gender: 'neuter', plural: 'Häuser', level: 'A1', example: 'Das Haus ist groß.' },
  { id: '2', word: 'die Straße', translation: 'street', gender: 'feminine', plural: 'Straßen', level: 'A1', example: 'Die Straße ist lang.' },
  { id: '3', word: 'der Arzt', translation: 'doctor', gender: 'masculine', plural: 'Ärzte', level: 'A1', example: 'Der Arzt hilft dem Patienten.' },
  { id: '4', word: 'sprechen', translation: 'to speak', pos: 'verb', level: 'A1', example: 'Ich spreche Deutsch.' },
  { id: '5', word: 'verstehen', translation: 'to understand', pos: 'verb', level: 'A1', example: 'Verstehen Sie mich?' },
  { id: '6', word: 'die Wohnung', translation: 'apartment', gender: 'feminine', plural: 'Wohnungen', level: 'A2', example: 'Die Wohnung hat drei Zimmer.' },
  { id: '7', word: 'der Termin', translation: 'appointment', gender: 'masculine', plural: 'Termine', level: 'A2', example: 'Ich habe einen Termin beim Arzt.' },
  { id: '8', word: 'die Entschuldigung', translation: 'apology/excuse', gender: 'feminine', level: 'A1', example: 'Entschuldigung, wo ist der Bahnhof?' },
  { id: '9', word: 'beantragen', translation: 'to apply for', pos: 'verb', level: 'B1', example: 'Ich möchte einen Reisepass beantragen.' },
  { id: '10', word: 'die Versicherung', translation: 'insurance', gender: 'feminine', level: 'B1', example: 'Haben Sie eine Krankenversicherung?' },
  { id: '11', word: 'die Bewerbung', translation: 'job application', gender: 'feminine', level: 'B1', example: 'Ich schreibe eine Bewerbung.' },
  { id: '12', word: 'berücksichtigen', translation: 'to consider/take into account', pos: 'verb', level: 'B2', example: 'Wir müssen alle Faktoren berücksichtigen.' },
  { id: '13', word: 'günstig', translation: 'affordable/cheap', pos: 'adjective', level: 'A2', example: 'Das Restaurant ist sehr günstig.' },
  { id: '14', word: 'wahrscheinlich', translation: 'probably', pos: 'adverb', level: 'B1', example: 'Er kommt wahrscheinlich morgen.' },
  { id: '15', word: 'die Erfahrung', translation: 'experience', gender: 'feminine', level: 'B1', example: 'Sie hat viel Erfahrung.' },
];

export const conversations = [
  {
    id: '1', title: 'Beim Arzt — Termin machen', slug: 'arzt-termin', scenario: 'doctor_visit', level: 'A2', formality: 'formal',
    description: 'Making a doctor appointment by phone',
    turns: [
      { speaker: 'Sprechstundenhilfe', text: 'Praxis Dr. Müller, guten Tag. Was kann ich für Sie tun?', translation: 'Dr. Müller\'s office, good day. What can I do for you?' },
      { speaker: 'Patient', text: 'Guten Tag, ich möchte bitte einen Termin machen.', translation: 'Good day, I would like to make an appointment please.' },
      { speaker: 'Sprechstundenhilfe', text: 'Was haben Sie für Beschwerden?', translation: 'What complaints do you have?' },
      { speaker: 'Patient', text: 'Ich habe seit drei Tagen Halsschmerzen und Fieber.', translation: 'I\'ve had a sore throat and fever for three days.' },
      { speaker: 'Sprechstundenhilfe', text: 'Können Sie morgen um 10 Uhr kommen?', translation: 'Can you come tomorrow at 10 o\'clock?' },
      { speaker: 'Patient', text: 'Ja, das passt. Vielen Dank!', translation: 'Yes, that works. Thank you very much!' },
      { speaker: 'Sprechstundenhilfe', text: 'Bitte bringen Sie Ihre Versicherungskarte mit. Auf Wiederhören!', translation: 'Please bring your insurance card. Goodbye! (on phone)' },
    ],
    keyPhrases: ['Ich möchte einen Termin machen', 'Was haben Sie für Beschwerden?', 'Bringen Sie Ihre Versicherungskarte mit'],
  },
  {
    id: '2', title: 'Wohnungssuche — Besichtigung', slug: 'wohnung-besichtigung', scenario: 'apartment_search', level: 'B1', formality: 'formal',
    description: 'Calling about an apartment listing',
    turns: [
      { speaker: 'Mieter', text: 'Guten Tag, ich rufe wegen der Wohnung in der Schillerstraße an. Ist die noch frei?', translation: 'Good day, I\'m calling about the apartment on Schillerstraße. Is it still available?' },
      { speaker: 'Vermieter', text: 'Ja, die Wohnung ist noch verfügbar. Sie hat zwei Zimmer, Küche und Bad.', translation: 'Yes, the apartment is still available. It has two rooms, kitchen and bathroom.' },
      { speaker: 'Mieter', text: 'Wie hoch ist die Miete?', translation: 'How much is the rent?' },
      { speaker: 'Vermieter', text: 'Die Kaltmiete beträgt 650 Euro, dazu kommen ungefähr 200 Euro Nebenkosten.', translation: 'The cold rent is 650 euros, plus about 200 euros in utilities.' },
      { speaker: 'Mieter', text: 'Kann ich die Wohnung besichtigen?', translation: 'Can I view the apartment?' },
      { speaker: 'Vermieter', text: 'Natürlich. Passt Ihnen Samstag um 14 Uhr?', translation: 'Of course. Does Saturday at 2 PM work for you?' },
      { speaker: 'Mieter', text: 'Ja, perfekt. Welche Unterlagen soll ich mitbringen?', translation: 'Yes, perfect. What documents should I bring?' },
      { speaker: 'Vermieter', text: 'Bitte bringen Sie Ihre Gehaltsabrechnung und eine Schufa-Auskunft mit.', translation: 'Please bring your pay slip and a credit report.' },
    ],
    keyPhrases: ['Ist die noch frei?', 'Wie hoch ist die Miete?', 'Kaltmiete / Nebenkosten', 'Schufa-Auskunft'],
  },
  {
    id: '3', title: 'Am Bahnhof — Fahrkarte kaufen', slug: 'bahnhof-fahrkarte', scenario: 'train_station', level: 'A1', formality: 'formal',
    description: 'Buying a train ticket at the counter',
    turns: [
      { speaker: 'Reisender', text: 'Guten Tag, ich möchte eine Fahrkarte nach Berlin kaufen.', translation: 'Good day, I\'d like to buy a ticket to Berlin.' },
      { speaker: 'Mitarbeiter', text: 'Einfach oder hin und zurück?', translation: 'One way or round trip?' },
      { speaker: 'Reisender', text: 'Hin und zurück, bitte.', translation: 'Round trip, please.' },
      { speaker: 'Mitarbeiter', text: 'Wann möchten Sie fahren?', translation: 'When would you like to travel?' },
      { speaker: 'Reisender', text: 'Morgen früh, wenn möglich.', translation: 'Tomorrow morning, if possible.' },
      { speaker: 'Mitarbeiter', text: 'Es gibt einen Zug um 8:15 Uhr. Das macht 79 Euro.', translation: 'There\'s a train at 8:15. That\'ll be 79 euros.' },
      { speaker: 'Reisender', text: 'Von welchem Gleis fährt der Zug?', translation: 'From which platform does the train leave?' },
      { speaker: 'Mitarbeiter', text: 'Gleis 7. Gute Reise!', translation: 'Platform 7. Have a good trip!' },
    ],
    keyPhrases: ['eine Fahrkarte kaufen', 'einfach oder hin und zurück', 'Von welchem Gleis?'],
  },
  {
    id: '4', title: 'Beim Ausländeramt', slug: 'auslaenderamt', scenario: 'immigration_office', level: 'B1', formality: 'formal',
    description: 'Renewing a residence permit',
    turns: [
      { speaker: 'Beamter', text: 'Guten Tag, was kann ich für Sie tun?', translation: 'Good day, what can I do for you?' },
      { speaker: 'Antragsteller', text: 'Ich möchte meinen Aufenthaltstitel verlängern.', translation: 'I would like to extend my residence permit.' },
      { speaker: 'Beamter', text: 'Haben Sie alle Unterlagen dabei? Pass, Meldebescheinigung, Arbeitsvertrag?', translation: 'Do you have all documents? Passport, registration certificate, work contract?' },
      { speaker: 'Antragsteller', text: 'Ja, hier sind alle Unterlagen.', translation: 'Yes, here are all the documents.' },
      { speaker: 'Beamter', text: 'Die Bearbeitungszeit beträgt circa vier Wochen.', translation: 'Processing time is about four weeks.' },
      { speaker: 'Antragsteller', text: 'Was kostet die Verlängerung?', translation: 'How much does the renewal cost?' },
      { speaker: 'Beamter', text: 'Die Gebühr beträgt 93 Euro.', translation: 'The fee is 93 euros.' },
    ],
    keyPhrases: ['Aufenthaltstitel verlängern', 'Meldebescheinigung', 'Bearbeitungszeit'],
  },
  {
    id: '5', title: 'Vorstellungsgespräch', slug: 'vorstellungsgespraech', scenario: 'job_interview', level: 'B2', formality: 'formal',
    description: 'Job interview self-introduction',
    turns: [
      { speaker: 'Personalleiter', text: 'Herzlich willkommen! Erzählen Sie uns etwas über sich.', translation: 'Welcome! Tell us something about yourself.' },
      { speaker: 'Bewerber', text: 'Mein Name ist Ana Silva. Seit drei Jahren lebe ich in Deutschland.', translation: 'My name is Ana Silva. I\'ve been living in Germany for three years.' },
      { speaker: 'Personalleiter', text: 'Warum möchten Sie bei uns arbeiten?', translation: 'Why do you want to work for us?' },
      { speaker: 'Bewerber', text: 'Ihre Firma ist bekannt für innovative Projekte. Das interessiert mich sehr.', translation: 'Your company is known for innovative projects. That interests me very much.' },
      { speaker: 'Personalleiter', text: 'Was sind Ihre Stärken?', translation: 'What are your strengths?' },
      { speaker: 'Bewerber', text: 'Ich bin teamfähig, gut organisiert und spreche vier Sprachen fließend.', translation: 'I\'m good at teamwork, well-organized, and speak four languages fluently.' },
    ],
    keyPhrases: ['Erzählen Sie uns etwas über sich', 'Warum möchten Sie bei uns arbeiten?', 'Was sind Ihre Stärken?', 'teamfähig'],
  },
];

export const writingPrompts = [
  { id: '1', title: 'E-Mail: Termin absagen', level: 'A2', textType: 'email', promptText: 'Sie haben einen Arzttermin am Freitag um 15 Uhr. Sie können nicht kommen, weil Sie arbeiten müssen. Schreiben Sie eine E-Mail an die Arztpraxis. Sagen Sie den Termin ab und bitten Sie um einen neuen Termin.', minWords: 30, maxWords: 60 },
  { id: '2', title: 'Beschwerde: Lauter Nachbar', level: 'B1', textType: 'complaint', promptText: 'Ihr Nachbar macht jede Nacht bis 2 Uhr laute Musik. Sie haben schon zweimal mit ihm gesprochen, aber es hat sich nichts geändert. Schreiben Sie einen Brief an die Hausverwaltung.', minWords: 80, maxWords: 120 },
  { id: '3', title: 'Meinungstext: Homeoffice', level: 'B2', textType: 'opinion', promptText: 'Schreiben Sie Ihre Meinung zum Thema "Sollten alle Arbeitnehmer das Recht auf Homeoffice haben?" Nennen Sie Vor- und Nachteile.', minWords: 150, maxWords: 250 },
  { id: '4', title: 'E-Mail: Reklamation', level: 'A2', textType: 'email', promptText: 'Sie haben online eine Jacke bestellt. Die Jacke ist zu klein und hat eine andere Farbe als im Bild. Schreiben Sie eine E-Mail an den Online-Shop.', minWords: 40, maxWords: 80 },
  { id: '5', title: 'Forumsbeitrag: Deutschlernen', level: 'B1', textType: 'forum_post', promptText: 'Sie lesen in einem Forum die Frage: "Was ist der beste Weg, Deutsch zu lernen?" Schreiben Sie Ihre Erfahrungen und Tipps.', minWords: 60, maxWords: 120 },
];

export const speakingPrompts = [
  { id: '1', title: 'Sich vorstellen', level: 'A1', taskType: 'monologue', promptText: 'Stellen Sie sich vor: Name, Alter, Herkunft, Beruf, Hobbys.', timeLimit: 60 },
  { id: '2', title: 'Bildbeschreibung: Marktplatz', level: 'B1', taskType: 'describe_picture', promptText: 'Beschreiben Sie einen typischen deutschen Marktplatz. Was sehen Sie? Was passiert dort?', timeLimit: 90 },
  { id: '3', title: 'Rollenspiel: Restaurant', level: 'A2', taskType: 'roleplay', promptText: 'Sie sind im Restaurant. Bestellen Sie Essen und Getränke. Fragen Sie nach der Rechnung.', timeLimit: 120 },
  { id: '4', title: 'Meinung: Soziale Medien', level: 'B2', taskType: 'monologue', promptText: 'Was denken Sie über soziale Medien? Welche Vor- und Nachteile haben sie?', timeLimit: 120 },
];

export const badges = [
  { id: '1', name: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: true, date: '2026-03-15' },
  { id: '2', name: 'Week Warrior', description: '7-day streak', icon: '🔥', earned: true, date: '2026-03-18' },
  { id: '3', name: 'Century Club', description: 'Earn 100 XP', icon: '⚡', earned: true, date: '2026-03-19' },
  { id: '4', name: 'Word Collector', description: 'Learn 50 words', icon: '📚', earned: false },
  { id: '5', name: 'Monthly Master', description: '30-day streak', icon: '👑', earned: false },
  { id: '6', name: 'XP Powerhouse', description: 'Earn 1,000 XP', icon: '💎', earned: false },
  { id: '7', name: 'Exam Ready', description: 'Complete a mock exam', icon: '🎓', earned: false },
];
