import { PrismaClient, CefrLevel, Skill, ExerciseType, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding DuoExtra database...');

  // ─── Exam Providers ────────────────────────────
  const goethe = await prisma.examProvider.create({
    data: {
      name: 'goethe',
      displayName: 'Goethe-Institut',
      description: 'Official Goethe-Institut German language examinations',
      isActive: true,
    },
  });

  const telc = await prisma.examProvider.create({
    data: {
      name: 'telc',
      displayName: 'telc GmbH',
      description: 'telc – language tests for professional and academic purposes',
      isActive: true,
    },
  });

  // ─── Exam Definitions ─────────────────────────
  const examLevels: { level: CefrLevel; gName: string; tName: string }[] = [
    { level: 'A1', gName: 'Goethe-Zertifikat A1: Start Deutsch 1', tName: 'telc Deutsch A1' },
    { level: 'A2', gName: 'Goethe-Zertifikat A2', tName: 'telc Deutsch A2' },
    { level: 'B1', gName: 'Goethe-Zertifikat B1', tName: 'telc Deutsch B1' },
    { level: 'B2', gName: 'Goethe-Zertifikat B2', tName: 'telc Deutsch B2' },
    { level: 'C1', gName: 'Goethe-Zertifikat C1', tName: 'telc Deutsch C1 Hochschule' },
    { level: 'C2', gName: 'Goethe-Zertifikat C2: GDS', tName: 'telc Deutsch C2' },
  ];

  for (const el of examLevels) {
    const gExam = await prisma.examDefinition.create({
      data: {
        providerId: goethe.id,
        level: el.level,
        name: el.gName,
        slug: `goethe-${el.level.toLowerCase()}`,
        totalDuration: el.level === 'A1' ? 65 : el.level === 'B1' ? 190 : 250,
        passingScore: 60,
      },
    });

    // Create modules for each exam
    const modules = [
      { skill: 'READING' as Skill, name: 'Lesen', order: 1, duration: 25 },
      { skill: 'LISTENING' as Skill, name: 'Hören', order: 2, duration: 20 },
      { skill: 'WRITING' as Skill, name: 'Schreiben', order: 3, duration: 25 },
      { skill: 'SPEAKING' as Skill, name: 'Sprechen', order: 4, duration: 15 },
    ];

    for (const mod of modules) {
      await prisma.examModule.create({
        data: {
          examId: gExam.id,
          skill: mod.skill,
          name: mod.name,
          orderIndex: mod.order,
          duration: mod.duration,
        },
      });
    }

    await prisma.examDefinition.create({
      data: {
        providerId: telc.id,
        level: el.level,
        name: el.tName,
        slug: `telc-${el.level.toLowerCase()}`,
        totalDuration: el.level === 'A1' ? 70 : el.level === 'B1' ? 150 : 210,
        passingScore: 60,
      },
    });
  }

  // ─── Learning Pathways ─────────────────────────
  const cefrLevels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  for (const level of cefrLevels) {
    const pathway = await prisma.pathway.create({
      data: {
        type: 'CEFR_GENERAL',
        level,
        title: `German ${level} — Complete Course`,
        slug: `german-${level.toLowerCase()}-complete`,
        description: `Master German at CEFR ${level} level with comprehensive lessons covering all skills.`,
        orderIndex: cefrLevels.indexOf(level),
        isPublished: true,
      },
    });

    // Create units for this pathway
    const unitNames = [
      'Getting Started', 'Everyday Life', 'Communication Basics',
      'Grammar Foundations', 'Vocabulary Building', 'Exam Practice',
    ];

    for (let u = 0; u < unitNames.length; u++) {
      const unit = await prisma.pathwayUnit.create({
        data: {
          pathwayId: pathway.id,
          title: `${level} — ${unitNames[u]}`,
          orderIndex: u,
        },
      });

      // Create 3 lessons per unit
      for (let l = 0; l < 3; l++) {
        await prisma.lesson.create({
          data: {
            unitId: unit.id,
            title: `${level} ${unitNames[u]} — Lesson ${l + 1}`,
            slug: `${level.toLowerCase()}-${unitNames[u].toLowerCase().replace(/\s+/g, '-')}-${l + 1}`,
            type: l === 0 ? 'structured' : l === 1 ? 'grammar' : 'drill',
            skill: l === 0 ? 'READING' : l === 1 ? 'GRAMMAR' : 'VOCABULARY',
            level,
            estimatedMinutes: 10,
            xpReward: 15,
            isPublished: true,
            orderIndex: l,
          },
        });
      }
    }
  }

  // ─── Grammar Topics ────────────────────────────
  const grammarTopics = [
    { title: 'Definite & Indefinite Articles', slug: 'articles', category: 'articles', level: 'A1' as CefrLevel, explanation: 'German has three genders: masculine (der), feminine (die), and neuter (das). The indefinite articles are ein/eine/ein.' },
    { title: 'Noun Gender Rules', slug: 'noun-gender', category: 'articles', level: 'A1' as CefrLevel, explanation: 'While German noun gender must often be memorized, there are patterns: words ending in -ung, -heit, -keit, -schaft are feminine; words ending in -chen, -lein are neuter.' },
    { title: 'Nominative Case', slug: 'nominative', category: 'cases', level: 'A1' as CefrLevel, explanation: 'The nominative case is used for the subject of a sentence. Der Mann liest ein Buch. (The man reads a book.)' },
    { title: 'Accusative Case', slug: 'accusative', category: 'cases', level: 'A1' as CefrLevel, explanation: 'The accusative is used for the direct object. Ich sehe den Mann. Only masculine articles change: der→den, ein→einen.' },
    { title: 'Dative Case', slug: 'dative', category: 'cases', level: 'A2' as CefrLevel, explanation: 'The dative marks the indirect object. Ich gebe dem Mann das Buch. Dem/der/dem, einem/einer/einem.' },
    { title: 'Present Tense Verbs', slug: 'present-tense', category: 'verbs', level: 'A1' as CefrLevel, explanation: 'German present tense conjugation: ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en.' },
    { title: 'Perfekt (Present Perfect)', slug: 'perfekt', category: 'verbs', level: 'A2' as CefrLevel, explanation: 'Perfekt uses haben or sein + past participle. Ich habe gegessen. Ich bin gefahren.' },
    { title: 'Modal Verbs', slug: 'modal-verbs', category: 'verbs', level: 'A2' as CefrLevel, explanation: 'können (can), müssen (must), dürfen (may), sollen (should), wollen (want), mögen (like). Modal verb goes in position 2, infinitive at end.' },
    { title: 'Separable Verbs', slug: 'separable-verbs', category: 'verbs', level: 'A2' as CefrLevel, explanation: 'Separable prefix verbs split in main clauses: anfangen → Ich fange morgen an. The prefix goes to the end.' },
    { title: 'Prepositions with Accusative', slug: 'prepositions-acc', category: 'prepositions', level: 'A2' as CefrLevel, explanation: 'durch, für, gegen, ohne, um always take accusative case.' },
    { title: 'Prepositions with Dative', slug: 'prepositions-dat', category: 'A2' as any, explanation: 'aus, bei, mit, nach, seit, von, zu always take dative case.' },
    { title: 'Wechselpräpositionen', slug: 'two-way-prepositions', category: 'prepositions', level: 'B1' as CefrLevel, explanation: 'Two-way prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen) take accusative for movement and dative for location.' },
    { title: 'Relative Clauses', slug: 'relative-clauses', category: 'sentence_structure', level: 'B1' as CefrLevel, explanation: 'Relative pronouns (der, die, das, etc.) introduce subordinate clauses. The verb goes to the end: Der Mann, der hier wohnt, ist nett.' },
    { title: 'Konjunktiv II', slug: 'konjunktiv-ii', category: 'verbs', level: 'B2' as CefrLevel, explanation: 'Konjunktiv II expresses wishes, hypotheticals, polite requests. Wenn ich reich wäre, würde ich reisen.' },
    { title: 'Passive Voice', slug: 'passive', category: 'verbs', level: 'B2' as CefrLevel, explanation: 'Passive uses werden + past participle. Das Haus wird gebaut. (The house is being built.)' },
  ];

  for (let i = 0; i < grammarTopics.length; i++) {
    await prisma.grammarTopic.create({
      data: { ...grammarTopics[i], orderIndex: i, isPublished: true },
    });
  }

  // ─── Vocabulary Items ──────────────────────────
  const vocabItems = [
    { word: 'das Haus', translation: 'house', gender: 'neuter', plural: 'Häuser', level: 'A1' as CefrLevel, partOfSpeech: 'noun', topicTags: ['housing'] },
    { word: 'die Straße', translation: 'street', gender: 'feminine', plural: 'Straßen', level: 'A1' as CefrLevel, partOfSpeech: 'noun', topicTags: ['city'] },
    { word: 'der Arzt', translation: 'doctor', gender: 'masculine', plural: 'Ärzte', level: 'A1' as CefrLevel, partOfSpeech: 'noun', topicTags: ['health'] },
    { word: 'sprechen', translation: 'to speak', level: 'A1' as CefrLevel, partOfSpeech: 'verb', exampleSentence: 'Ich spreche Deutsch.' },
    { word: 'verstehen', translation: 'to understand', level: 'A1' as CefrLevel, partOfSpeech: 'verb', exampleSentence: 'Verstehen Sie mich?' },
    { word: 'die Wohnung', translation: 'apartment', gender: 'feminine', plural: 'Wohnungen', level: 'A2' as CefrLevel, partOfSpeech: 'noun', topicTags: ['housing'] },
    { word: 'der Termin', translation: 'appointment', gender: 'masculine', plural: 'Termine', level: 'A2' as CefrLevel, partOfSpeech: 'noun', topicTags: ['bureaucracy'] },
    { word: 'beantragen', translation: 'to apply for', level: 'B1' as CefrLevel, partOfSpeech: 'verb', exampleSentence: 'Ich möchte einen Reisepass beantragen.' },
    { word: 'die Versicherung', translation: 'insurance', gender: 'feminine', level: 'B1' as CefrLevel, partOfSpeech: 'noun', topicTags: ['bureaucracy', 'work'] },
    { word: 'die Bewerbung', translation: 'application (job)', gender: 'feminine', level: 'B1' as CefrLevel, partOfSpeech: 'noun', topicTags: ['work'] },
    { word: 'berücksichtigen', translation: 'to consider/take into account', level: 'B2' as CefrLevel, partOfSpeech: 'verb' },
    { word: 'die Nachhaltigkeit', translation: 'sustainability', gender: 'feminine', level: 'B2' as CefrLevel, partOfSpeech: 'noun' },
    { word: 'die Auseinandersetzung', translation: 'dispute/confrontation', gender: 'feminine', level: 'C1' as CefrLevel, partOfSpeech: 'noun' },
  ];

  for (const v of vocabItems) {
    await prisma.vocabularyItem.create({
      data: { ...v, isPublished: true, frequency: vocabItems.indexOf(v) + 1 },
    });
  }

  // ─── Sample Exercises ──────────────────────────
  const exercises = [
    {
      type: 'MCQ' as ExerciseType,
      skill: 'GRAMMAR' as Skill,
      level: 'A1' as CefrLevel,
      prompt: 'Wählen Sie den richtigen Artikel: ___ Haus ist groß.',
      content: { options: ['Der', 'Die', 'Das', 'Ein'] },
      answerKey: { correct: 'Das' },
      explanation: '"Haus" is a neuter noun, so it takes the article "das".',
      tags: ['articles', 'gender'],
      difficulty: 1,
    },
    {
      type: 'FILL_BLANK' as ExerciseType,
      skill: 'GRAMMAR' as Skill,
      level: 'A2' as CefrLevel,
      prompt: 'Ich ___ (gehen) gestern ins Kino.',
      content: { blanks: [{ position: 1, expected: 'bin gegangen' }] },
      answerKey: { correct: 'bin gegangen' },
      explanation: 'Perfekt of "gehen" uses "sein" as auxiliary: bin gegangen.',
      tags: ['perfekt', 'verbs'],
      difficulty: 2,
    },
    {
      type: 'LISTENING_MCQ' as ExerciseType,
      skill: 'LISTENING' as Skill,
      level: 'A1' as CefrLevel,
      prompt: 'Was bestellt die Frau?',
      content: { audioRef: 'listening/a1/restaurant-01.mp3', options: ['Kaffee', 'Tee', 'Wasser', 'Saft'] },
      answerKey: { correct: 'Kaffee' },
      difficulty: 1,
    },
    {
      type: 'READING_MCQ' as ExerciseType,
      skill: 'READING' as Skill,
      level: 'B1' as CefrLevel,
      prompt: 'Lesen Sie den Text und beantworten Sie die Frage: Warum ist Maria umgezogen?',
      content: {
        passage: 'Maria wohnte drei Jahre in München. Letztes Jahr hat sie eine neue Stelle in Hamburg gefunden. Deshalb ist sie umgezogen. Die neue Wohnung ist kleiner, aber die Miete ist günstiger.',
        options: ['Wegen einer neuen Arbeit', 'Wegen der Miete', 'Wegen ihrer Familie', 'Wegen des Wetters'],
      },
      answerKey: { correct: 'Wegen einer neuen Arbeit' },
      explanation: 'The text says she found a new job (Stelle) in Hamburg, which is why she moved.',
      difficulty: 3,
    },
    {
      type: 'SENTENCE_ORDER' as ExerciseType,
      skill: 'GRAMMAR' as Skill,
      level: 'A2' as CefrLevel,
      prompt: 'Ordnen Sie die Wörter zu einem Satz:',
      content: { words: ['ich', 'morgen', 'kann', 'leider', 'kommen', 'nicht'] },
      answerKey: { correct: 'Ich kann morgen leider nicht kommen.' },
      difficulty: 2,
    },
  ];

  for (const ex of exercises) {
    await prisma.exercise.create({
      data: { ...ex, isPublished: true, xpValue: 5 },
    });
  }

  // ─── Conversations (Original Speaking Content) ─
  const conversations = [
    {
      title: 'Beim Arzt — Termin machen',
      slug: 'arzt-termin-machen',
      scenario: 'doctor_visit',
      level: 'A2' as CefrLevel,
      formality: 'formal',
      description: 'Making a doctor appointment by phone',
      turns: [
        { speakerRole: 'Sprechstundenhilfe', text: 'Praxis Dr. Müller, guten Tag. Was kann ich für Sie tun?', orderIndex: 0 },
        { speakerRole: 'Patient', text: 'Guten Tag, ich möchte bitte einen Termin machen.', orderIndex: 1 },
        { speakerRole: 'Sprechstundenhilfe', text: 'Was haben Sie für Beschwerden?', orderIndex: 2 },
        { speakerRole: 'Patient', text: 'Ich habe seit drei Tagen Halsschmerzen und Fieber.', orderIndex: 3 },
        { speakerRole: 'Sprechstundenhilfe', text: 'Können Sie morgen um 10 Uhr kommen?', orderIndex: 4 },
        { speakerRole: 'Patient', text: 'Ja, das passt. Vielen Dank!', orderIndex: 5 },
        { speakerRole: 'Sprechstundenhilfe', text: 'Bitte bringen Sie Ihre Versicherungskarte mit. Auf Wiederhören!', orderIndex: 6 },
      ],
      keyPhrases: [
        { phrase: 'Ich möchte einen Termin machen', translation: 'I would like to make an appointment' },
        { phrase: 'Was haben Sie für Beschwerden?', translation: 'What complaints do you have?' },
        { phrase: 'Bringen Sie Ihre Versicherungskarte mit', translation: 'Bring your insurance card along' },
      ],
    },
    {
      title: 'Wohnungssuche — Besichtigungstermin',
      slug: 'wohnung-besichtigung',
      scenario: 'apartment_search',
      level: 'B1' as CefrLevel,
      formality: 'formal',
      description: 'Calling about an apartment listing to arrange a viewing',
      turns: [
        { speakerRole: 'Mieter', text: 'Guten Tag, ich rufe wegen der Wohnung in der Schillerstraße an. Ist die noch frei?', orderIndex: 0 },
        { speakerRole: 'Vermieter', text: 'Ja, die Wohnung ist noch verfügbar. Sie hat zwei Zimmer, Küche und Bad.', orderIndex: 1 },
        { speakerRole: 'Mieter', text: 'Wie hoch ist die Miete?', orderIndex: 2 },
        { speakerRole: 'Vermieter', text: 'Die Kaltmiete beträgt 650 Euro, dazu kommen ungefähr 200 Euro Nebenkosten.', orderIndex: 3 },
        { speakerRole: 'Mieter', text: 'Kann ich die Wohnung besichtigen?', orderIndex: 4 },
        { speakerRole: 'Vermieter', text: 'Natürlich. Passt Ihnen Samstag um 14 Uhr?', orderIndex: 5 },
        { speakerRole: 'Mieter', text: 'Ja, perfekt. Welche Unterlagen soll ich mitbringen?', orderIndex: 6 },
        { speakerRole: 'Vermieter', text: 'Bitte bringen Sie Ihre letzte Gehaltsabrechnung und eine Schufa-Auskunft mit.', orderIndex: 7 },
      ],
      keyPhrases: [
        { phrase: 'Ist die noch frei?', translation: 'Is it still available?' },
        { phrase: 'Wie hoch ist die Miete?', translation: 'How much is the rent?' },
        { phrase: 'Kann ich die Wohnung besichtigen?', translation: 'Can I view the apartment?' },
        { phrase: 'Kaltmiete / Nebenkosten', translation: 'Cold rent / additional costs' },
        { phrase: 'Schufa-Auskunft', translation: 'Credit report' },
      ],
    },
    {
      title: 'Am Bahnhof — Fahrkarte kaufen',
      slug: 'bahnhof-fahrkarte',
      scenario: 'train_station',
      level: 'A1' as CefrLevel,
      formality: 'formal',
      description: 'Buying a train ticket at the station counter',
      turns: [
        { speakerRole: 'Reisender', text: 'Guten Tag, ich möchte eine Fahrkarte nach Berlin kaufen.', orderIndex: 0 },
        { speakerRole: 'Mitarbeiter', text: 'Einfach oder hin und zurück?', orderIndex: 1 },
        { speakerRole: 'Reisender', text: 'Hin und zurück, bitte.', orderIndex: 2 },
        { speakerRole: 'Mitarbeiter', text: 'Wann möchten Sie fahren?', orderIndex: 3 },
        { speakerRole: 'Reisender', text: 'Morgen früh, wenn möglich.', orderIndex: 4 },
        { speakerRole: 'Mitarbeiter', text: 'Es gibt einen Zug um 8:15 Uhr. Das macht 79 Euro. Erste oder zweite Klasse?', orderIndex: 5 },
        { speakerRole: 'Reisender', text: 'Zweite Klasse, bitte. Von welchem Gleis fährt der Zug?', orderIndex: 6 },
        { speakerRole: 'Mitarbeiter', text: 'Gleis 7. Gute Reise!', orderIndex: 7 },
      ],
      keyPhrases: [
        { phrase: 'eine Fahrkarte kaufen', translation: 'to buy a ticket' },
        { phrase: 'einfach oder hin und zurück', translation: 'one way or round trip' },
        { phrase: 'Von welchem Gleis?', translation: 'From which platform?' },
      ],
    },
    {
      title: 'Beim Ausländeramt — Aufenthaltstitel verlängern',
      slug: 'auslaenderamt-aufenthaltstitel',
      scenario: 'immigration_office',
      level: 'B1' as CefrLevel,
      formality: 'formal',
      description: 'Visiting the immigration office to renew a residence permit',
      turns: [
        { speakerRole: 'Beamter', text: 'Guten Tag, was kann ich für Sie tun?', orderIndex: 0 },
        { speakerRole: 'Antragsteller', text: 'Guten Tag, ich möchte meinen Aufenthaltstitel verlängern. Er läuft nächsten Monat ab.', orderIndex: 1 },
        { speakerRole: 'Beamter', text: 'Haben Sie alle Unterlagen dabei? Ich brauche Ihren Pass, Meldebescheinigung, Arbeitsvertrag und Krankenversicherungsnachweis.', orderIndex: 2 },
        { speakerRole: 'Antragsteller', text: 'Ja, hier sind alle Unterlagen.', orderIndex: 3 },
        { speakerRole: 'Beamter', text: 'Gut. Die Bearbeitungszeit beträgt circa vier Wochen. Sie bekommen eine Fiktionsbescheinigung als Überbrückung.', orderIndex: 4 },
        { speakerRole: 'Antragsteller', text: 'Was kostet die Verlängerung?', orderIndex: 5 },
        { speakerRole: 'Beamter', text: 'Die Gebühr beträgt 93 Euro. Sie können bar oder mit Karte bezahlen.', orderIndex: 6 },
      ],
      keyPhrases: [
        { phrase: 'Aufenthaltstitel verlängern', translation: 'to renew a residence permit' },
        { phrase: 'Meldebescheinigung', translation: 'registration certificate' },
        { phrase: 'Fiktionsbescheinigung', translation: 'fictional certificate (temporary permit bridge)' },
        { phrase: 'Bearbeitungszeit', translation: 'processing time' },
      ],
    },
    {
      title: 'Vorstellungsgespräch — Selbstvorstellung',
      slug: 'vorstellungsgespraech',
      scenario: 'job_interview',
      level: 'B2' as CefrLevel,
      formality: 'formal',
      description: 'Introducing yourself in a job interview',
      turns: [
        { speakerRole: 'Personalleiter', text: 'Herzlich willkommen! Bitte erzählen Sie uns etwas über sich.', orderIndex: 0 },
        { speakerRole: 'Bewerber', text: 'Vielen Dank. Mein Name ist Ana Silva, ich bin 28 Jahre alt und komme ursprünglich aus Brasilien. Seit drei Jahren lebe ich in Deutschland.', orderIndex: 1 },
        { speakerRole: 'Bewerber', text: 'Ich habe Betriebswirtschaft an der Universität São Paulo studiert und danach ein Jahr bei einer deutschen Firma in Brasilien gearbeitet.', orderIndex: 2 },
        { speakerRole: 'Personalleiter', text: 'Warum möchten Sie bei uns arbeiten?', orderIndex: 3 },
        { speakerRole: 'Bewerber', text: 'Ihre Firma ist bekannt für innovative Projekte im Bereich erneuerbare Energien. Das interessiert mich sehr, weil ich in diesem Bereich Erfahrung habe.', orderIndex: 4 },
        { speakerRole: 'Personalleiter', text: 'Was sind Ihre Stärken?', orderIndex: 5 },
        { speakerRole: 'Bewerber', text: 'Ich bin teamfähig, gut organisiert und arbeite gern an komplexen Aufgaben. Außerdem spreche ich vier Sprachen fließend.', orderIndex: 6 },
      ],
      keyPhrases: [
        { phrase: 'Erzählen Sie uns etwas über sich', translation: 'Tell us something about yourself' },
        { phrase: 'Warum möchten Sie bei uns arbeiten?', translation: 'Why do you want to work for us?' },
        { phrase: 'Was sind Ihre Stärken?', translation: 'What are your strengths?' },
        { phrase: 'teamfähig', translation: 'team-oriented / good at teamwork' },
      ],
    },
  ];

  for (const conv of conversations) {
    const { turns, keyPhrases, ...convData } = conv;
    const created = await prisma.conversation.create({
      data: {
        ...convData,
        isPublished: true,
        turns: { create: turns },
        keyPhrases: { create: keyPhrases.map((kp) => ({ ...kp, isKeyPhrase: true })) },
      },
    });
  }

  // ─── Badges ────────────────────────────────────
  const badges = [
    { name: 'first_lesson', displayName: 'First Steps', description: 'Complete your first lesson', category: 'milestone', criteria: { type: 'lessons', threshold: 1 } },
    { name: 'streak_7', displayName: 'Week Warrior', description: 'Maintain a 7-day streak', category: 'streak', criteria: { type: 'streak', threshold: 7 } },
    { name: 'streak_30', displayName: 'Monthly Master', description: 'Maintain a 30-day streak', category: 'streak', criteria: { type: 'streak', threshold: 30 } },
    { name: 'xp_100', displayName: 'Century Club', description: 'Earn 100 XP', category: 'milestone', criteria: { type: 'xp_total', threshold: 100 } },
    { name: 'xp_1000', displayName: 'XP Powerhouse', description: 'Earn 1,000 XP', category: 'milestone', criteria: { type: 'xp_total', threshold: 1000 } },
    { name: 'vocab_50', displayName: 'Word Collector', description: 'Learn 50 vocabulary items', category: 'skill', criteria: { type: 'vocab_learned', threshold: 50 } },
    { name: 'mock_first', displayName: 'Exam Ready', description: 'Complete your first mock exam', category: 'exam', criteria: { type: 'mock_complete', threshold: 1 } },
  ];

  for (const badge of badges) {
    await prisma.badge.create({ data: badge });
  }

  // ─── Writing Prompts ───────────────────────────
  const writingPrompts = [
    {
      title: 'E-Mail: Termin absagen',
      promptText: 'Sie haben einen Arzttermin am Freitag um 15 Uhr. Sie können nicht kommen, weil Sie arbeiten müssen. Schreiben Sie eine E-Mail an die Arztpraxis. Sagen Sie den Termin ab und bitten Sie um einen neuen Termin.',
      textType: 'email',
      level: 'A2' as CefrLevel,
      provider: 'goethe',
      minWords: 30,
      maxWords: 60,
    },
    {
      title: 'Beschwerde: Nachbar',
      promptText: 'Ihr Nachbar macht jede Nacht bis 2 Uhr laute Musik. Sie haben schon zweimal mit ihm gesprochen, aber es hat sich nichts geändert. Schreiben Sie einen Brief an die Hausverwaltung.',
      textType: 'complaint',
      level: 'B1' as CefrLevel,
      provider: 'goethe',
      minWords: 80,
      maxWords: 120,
    },
    {
      title: 'Meinungstext: Homeoffice',
      promptText: 'Schreiben Sie Ihre Meinung zum Thema "Sollten alle Arbeitnehmer das Recht auf Homeoffice haben?" Nennen Sie Vor- und Nachteile und begründen Sie Ihre Meinung.',
      textType: 'opinion',
      level: 'B2' as CefrLevel,
      minWords: 150,
      maxWords: 250,
    },
  ];

  for (const wp of writingPrompts) {
    await prisma.writingPrompt.create({ data: { ...wp, isPublished: true } });
  }

  // ─── Speaking Prompts ──────────────────────────
  const speakingPrompts = [
    {
      title: 'Sich vorstellen',
      promptText: 'Stellen Sie sich vor: Name, Alter, Herkunft, Beruf, Hobbys.',
      taskType: 'monologue',
      level: 'A1' as CefrLevel,
      timeLimitSecs: 60,
    },
    {
      title: 'Bildbeschreibung: Marktplatz',
      promptText: 'Beschreiben Sie das Bild. Was sehen Sie? Was passiert?',
      taskType: 'describe_picture',
      level: 'B1' as CefrLevel,
      timeLimitSecs: 90,
    },
    {
      title: 'Rollenspiel: Restaurant',
      promptText: 'Sie sind im Restaurant. Bestellen Sie etwas zu essen und zu trinken. Fragen Sie nach der Rechnung.',
      taskType: 'roleplay',
      level: 'A2' as CefrLevel,
      timeLimitSecs: 120,
    },
  ];

  for (const sp of speakingPrompts) {
    await prisma.speakingPrompt.create({ data: { ...sp, isPublished: true } });
  }

  // ─── Rubrics ───────────────────────────────────
  await prisma.rubric.create({
    data: {
      name: 'Goethe B1 Writing Rubric',
      skill: 'WRITING',
      level: 'B1',
      provider: 'goethe',
      maxScore: 20,
      isPublished: true,
      criteria: [
        { name: 'Task Achievement', maxPoints: 5, descriptors: ['Fully addresses all points', 'Partially addresses points', 'Does not address task'] },
        { name: 'Coherence & Organization', maxPoints: 5, descriptors: ['Well-structured with connectors', 'Some structure', 'No clear structure'] },
        { name: 'Grammar', maxPoints: 5, descriptors: ['B1-level grammar mostly correct', 'Some errors but understandable', 'Frequent errors hindering comprehension'] },
        { name: 'Vocabulary', maxPoints: 5, descriptors: ['Appropriate B1 vocabulary', 'Limited but adequate', 'Insufficient vocabulary'] },
      ],
    },
  });

  // ─── Admin User ────────────────────────────────
  const adminHash = await bcrypt.hash('admin123!', 12);
  await prisma.user.create({
    data: {
      email: 'admin@duoextra.com',
      passwordHash: adminHash,
      role: 'SUPER_ADMIN',
      emailVerified: true,
      profile: { create: { displayName: 'DuoExtra Admin' } },
      streaks: { create: {} },
      subscription: { create: { plan: 'PREMIUM_YEARLY' } },
    },
  });

  // Demo learner
  const learnerHash = await bcrypt.hash('learner123!', 12);
  await prisma.user.create({
    data: {
      email: 'demo@duoextra.com',
      passwordHash: learnerHash,
      role: 'LEARNER',
      emailVerified: true,
      profile: {
        create: {
          displayName: 'Demo Learner',
          currentLevel: 'A2',
          targetLevel: 'B1',
          dailyGoalMinutes: 20,
        },
      },
      goals: {
        create: {
          targetProvider: 'goethe',
          targetLevel: 'B1',
          dailyGoalMinutes: 20,
          dailyGoalXp: 50,
        },
      },
      onboarding: {
        create: {
          completedAt: new Date(),
          nativeLanguage: 'en',
          learningPurpose: 'exam',
          examProvider: 'goethe',
          targetLevel: 'B1',
          placementScore: 0.45,
          placementLevel: 'A2',
        },
      },
      streaks: { create: { currentStreak: 5, longestStreak: 12, lastActiveDate: new Date() } },
      subscription: { create: { plan: 'FREE' } },
    },
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
