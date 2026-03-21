import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  // Check if already seeded
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    console.log('Database already seeded, skipping.');
    return;
  }

  // Exam Providers
  const goethe = await prisma.examProvider.create({ data: { name: 'goethe', displayName: 'Goethe-Institut', description: 'Official Goethe-Institut German language examinations' } });
  const telc = await prisma.examProvider.create({ data: { name: 'telc', displayName: 'telc GmbH', description: 'telc language tests' } });

  // Exam Definitions
  for (const [level, gName, tName] of [
    ['A1', 'Goethe-Zertifikat A1', 'telc Deutsch A1'],
    ['A2', 'Goethe-Zertifikat A2', 'telc Deutsch A2'],
    ['B1', 'Goethe-Zertifikat B1', 'telc Deutsch B1'],
    ['B2', 'Goethe-Zertifikat B2', 'telc Deutsch B2'],
    ['C1', 'Goethe-Zertifikat C1', 'telc Deutsch C1 Hochschule'],
    ['C2', 'Goethe-Zertifikat C2: GDS', 'telc Deutsch C2'],
  ] as const) {
    const gExam = await prisma.examDefinition.create({
      data: { providerId: goethe.id, level: level as any, name: gName, slug: `goethe-${level.toLowerCase()}`, totalDuration: 180, passingScore: 60 },
    });
    for (const [skill, name, order] of [['READING', 'Lesen', 1], ['LISTENING', 'Hoeren', 2], ['WRITING', 'Schreiben', 3], ['SPEAKING', 'Sprechen', 4]] as const) {
      await prisma.examModule.create({ data: { examId: gExam.id, skill: skill as any, name: name as string, orderIndex: order as number, duration: 25 } });
    }
    await prisma.examDefinition.create({
      data: { providerId: telc.id, level: level as any, name: tName, slug: `telc-${level.toLowerCase()}`, totalDuration: 150, passingScore: 60 },
    });
  }

  // Pathways
  for (const [i, level] of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].entries()) {
    const pathway = await prisma.pathway.create({
      data: { type: 'CEFR_GENERAL', level: level as any, title: `German ${level} Complete Course`, slug: `german-${level.toLowerCase()}-complete`, description: `Master German at ${level} level.`, orderIndex: i, isPublished: true },
    });
    for (const [u, unitName] of ['Getting Started', 'Everyday Life', 'Communication', 'Grammar Focus', 'Vocabulary Building', 'Exam Practice'].entries()) {
      const unit = await prisma.pathwayUnit.create({ data: { pathwayId: pathway.id, title: `${level} ${unitName}`, orderIndex: u } });
      for (let l = 0; l < 3; l++) {
        await prisma.lesson.create({
          data: { unitId: unit.id, title: `${level} ${unitName} Lesson ${l + 1}`, slug: `${level.toLowerCase()}-${unitName.toLowerCase().replace(/\\s+/g, '-')}-${l + 1}`, type: l === 0 ? 'structured' : l === 1 ? 'grammar' : 'drill', skill: l === 0 ? 'READING' : l === 1 ? 'GRAMMAR' : 'VOCABULARY' as any, level: level as any, estimatedMinutes: 10, xpReward: 15, isPublished: true, orderIndex: l },
        });
      }
    }
  }

  // Grammar Topics
  for (const [i, t] of [
    { title: 'Definite & Indefinite Articles', slug: 'articles', category: 'articles', level: 'A1', explanation: 'German has three genders: masculine (der), feminine (die), and neuter (das).' },
    { title: 'Nominative Case', slug: 'nominative', category: 'cases', level: 'A1', explanation: 'The nominative case is used for the subject: Der Mann liest ein Buch.' },
    { title: 'Accusative Case', slug: 'accusative', category: 'cases', level: 'A1', explanation: 'The accusative is for the direct object: Ich sehe den Mann.' },
    { title: 'Dative Case', slug: 'dative', category: 'cases', level: 'A2', explanation: 'The dative marks the indirect object: Ich gebe dem Mann das Buch.' },
    { title: 'Present Tense Verbs', slug: 'present-tense', category: 'verbs', level: 'A1', explanation: 'German present tense: ich -e, du -st, er -t, wir -en, ihr -t, sie -en.' },
    { title: 'Perfekt (Present Perfect)', slug: 'perfekt', category: 'verbs', level: 'A2', explanation: 'Perfekt uses haben/sein + past participle: Ich habe gegessen.' },
    { title: 'Modal Verbs', slug: 'modal-verbs', category: 'verbs', level: 'A2', explanation: 'koennen, muessen, duerfen, sollen, wollen, moegen.' },
    { title: 'Separable Verbs', slug: 'separable-verbs', category: 'verbs', level: 'A2', explanation: 'anfangen: Ich fange morgen an.' },
    { title: 'Relative Clauses', slug: 'relative-clauses', category: 'sentence_structure', level: 'B1', explanation: 'Der Mann, der hier wohnt, ist nett.' },
    { title: 'Konjunktiv II', slug: 'konjunktiv-ii', category: 'verbs', level: 'B2', explanation: 'Wenn ich reich waere, wuerde ich reisen.' },
  ].entries()) {
    await prisma.grammarTopic.create({ data: { ...t, level: t.level as any, orderIndex: i, isPublished: true } });
  }

  // Vocabulary
  for (const v of [
    { word: 'das Haus', translation: 'house', gender: 'neuter', plural: 'Haeuser', level: 'A1', partOfSpeech: 'noun', exampleSentence: 'Das Haus ist gross.' },
    { word: 'die Strasse', translation: 'street', gender: 'feminine', plural: 'Strassen', level: 'A1', partOfSpeech: 'noun' },
    { word: 'der Arzt', translation: 'doctor', gender: 'masculine', plural: 'Aerzte', level: 'A1', partOfSpeech: 'noun' },
    { word: 'sprechen', translation: 'to speak', level: 'A1', partOfSpeech: 'verb', exampleSentence: 'Ich spreche Deutsch.' },
    { word: 'verstehen', translation: 'to understand', level: 'A1', partOfSpeech: 'verb', exampleSentence: 'Verstehen Sie mich?' },
    { word: 'die Wohnung', translation: 'apartment', gender: 'feminine', level: 'A2', partOfSpeech: 'noun' },
    { word: 'beantragen', translation: 'to apply for', level: 'B1', partOfSpeech: 'verb' },
    { word: 'die Versicherung', translation: 'insurance', gender: 'feminine', level: 'B1', partOfSpeech: 'noun' },
    { word: 'beruecksichtigen', translation: 'to consider', level: 'B2', partOfSpeech: 'verb' },
  ]) {
    await prisma.vocabularyItem.create({ data: { ...v, level: v.level as any, isPublished: true, frequency: 1 } });
  }

  // Conversations
  const conv1 = await prisma.conversation.create({
    data: { title: 'Beim Arzt — Termin machen', slug: 'arzt-termin', scenario: 'doctor_visit', level: 'A2', formality: 'formal', description: 'Making a doctor appointment by phone', isPublished: true },
  });
  for (const [i, t] of [
    { speakerRole: 'Sprechstundenhilfe', text: 'Praxis Dr. Mueller, guten Tag. Was kann ich fuer Sie tun?' },
    { speakerRole: 'Patient', text: 'Guten Tag, ich moechte bitte einen Termin machen.' },
    { speakerRole: 'Sprechstundenhilfe', text: 'Was haben Sie fuer Beschwerden?' },
    { speakerRole: 'Patient', text: 'Ich habe seit drei Tagen Halsschmerzen und Fieber.' },
    { speakerRole: 'Sprechstundenhilfe', text: 'Koennen Sie morgen um 10 Uhr kommen?' },
    { speakerRole: 'Patient', text: 'Ja, das passt. Vielen Dank!' },
  ].entries()) {
    await prisma.conversationTurn.create({ data: { conversationId: conv1.id, ...t, orderIndex: i } });
  }
  for (const p of [
    { phrase: 'Ich moechte einen Termin machen', translation: 'I would like to make an appointment' },
    { phrase: 'Was haben Sie fuer Beschwerden?', translation: 'What complaints do you have?' },
  ]) {
    await prisma.conversationPhrase.create({ data: { conversationId: conv1.id, ...p, isKeyPhrase: true } });
  }

  const conv2 = await prisma.conversation.create({
    data: { title: 'Am Bahnhof — Fahrkarte kaufen', slug: 'bahnhof-fahrkarte', scenario: 'train_station', level: 'A1', formality: 'formal', description: 'Buying a train ticket', isPublished: true },
  });
  for (const [i, t] of [
    { speakerRole: 'Reisender', text: 'Guten Tag, eine Fahrkarte nach Berlin bitte.' },
    { speakerRole: 'Mitarbeiter', text: 'Einfach oder hin und zurueck?' },
    { speakerRole: 'Reisender', text: 'Hin und zurueck, bitte.' },
    { speakerRole: 'Mitarbeiter', text: 'Das macht 79 Euro. Erste oder zweite Klasse?' },
    { speakerRole: 'Reisender', text: 'Zweite Klasse. Von welchem Gleis?' },
    { speakerRole: 'Mitarbeiter', text: 'Gleis 7. Gute Reise!' },
  ].entries()) {
    await prisma.conversationTurn.create({ data: { conversationId: conv2.id, ...t, orderIndex: i } });
  }

  // Writing Prompts
  for (const wp of [
    { title: 'E-Mail: Termin absagen', promptText: 'Sie haben einen Arzttermin am Freitag. Sie koennen nicht kommen. Schreiben Sie eine E-Mail.', textType: 'email', level: 'A2', minWords: 30, maxWords: 60 },
    { title: 'Beschwerde: Nachbar', promptText: 'Ihr Nachbar macht jede Nacht laute Musik. Schreiben Sie an die Hausverwaltung.', textType: 'complaint', level: 'B1', minWords: 80, maxWords: 120 },
  ]) {
    await prisma.writingPrompt.create({ data: { ...wp, level: wp.level as any, isPublished: true } });
  }

  // Speaking Prompts
  for (const sp of [
    { title: 'Sich vorstellen', promptText: 'Stellen Sie sich vor: Name, Alter, Herkunft, Beruf, Hobbys.', taskType: 'monologue', level: 'A1', timeLimitSecs: 60 },
    { title: 'Rollenspiel: Restaurant', promptText: 'Bestellen Sie im Restaurant etwas zu essen und trinken.', taskType: 'roleplay', level: 'A2', timeLimitSecs: 120 },
  ]) {
    await prisma.speakingPrompt.create({ data: { ...sp, level: sp.level as any, isPublished: true } });
  }

  // Badges
  for (const b of [
    { name: 'first_lesson', displayName: 'First Steps', description: 'Complete your first lesson', category: 'milestone', criteria: { type: 'lessons', threshold: 1 } },
    { name: 'streak_7', displayName: 'Week Warrior', description: '7-day streak', category: 'streak', criteria: { type: 'streak', threshold: 7 } },
    { name: 'xp_100', displayName: 'Century Club', description: 'Earn 100 XP', category: 'milestone', criteria: { type: 'xp_total', threshold: 100 } },
  ]) {
    await prisma.badge.create({ data: b });
  }

  // Demo user
  const bcrypt = require('bcryptjs');
  const hash = await bcrypt.hash('demo1234', 12);
  await prisma.user.create({
    data: {
      email: 'demo@duoextra.com', passwordHash: hash, role: 'LEARNER', emailVerified: true,
      profile: { create: { displayName: 'Demo Learner', currentLevel: 'A2', targetLevel: 'B1', dailyGoalMinutes: 20 } },
      goals: { create: { targetProvider: 'goethe', targetLevel: 'B1', dailyGoalMinutes: 20, dailyGoalXp: 50 } },
      streaks: { create: { currentStreak: 5, longestStreak: 12, lastActiveDate: new Date() } },
      subscription: { create: { plan: 'FREE' } },
    },
  });

  console.log('Seed completed!');
}

main().catch(e => { console.error('Seed error:', e); }).finally(() => prisma.$disconnect());
