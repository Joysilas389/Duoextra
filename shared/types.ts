// ─── CEFR & Enums ─────────────────────────────
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type Skill = 'LISTENING' | 'READING' | 'WRITING' | 'SPEAKING' | 'GRAMMAR' | 'VOCABULARY' | 'PRONUNCIATION';
export type UserRole = 'GUEST' | 'LEARNER' | 'PREMIUM_LEARNER' | 'TUTOR' | 'REVIEWER' | 'CONTENT_EDITOR' | 'INSTITUTION_MANAGER' | 'SUPER_ADMIN';

// ─── User ────────────────────────────────────
export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile?: UserProfile;
  goals?: UserGoal;
  subscription?: Subscription;
}

export interface UserProfile {
  displayName?: string;
  avatarUrl?: string;
  nativeLanguage: string;
  timezone: string;
  currentLevel: CefrLevel;
  targetLevel?: CefrLevel;
  targetExamProvider?: string;
  dailyGoalMinutes: number;
}

export interface UserGoal {
  targetProvider?: string;
  targetLevel?: CefrLevel;
  targetExamDate?: string;
  dailyGoalMinutes: number;
  dailyGoalXp: number;
  weeklyGoalDays: number;
  focusSkills: string[];
}

// ─── Exam ────────────────────────────────────
export interface ExamProvider {
  id: string;
  name: string;
  displayName: string;
  description?: string;
}

export interface ExamDefinition {
  id: string;
  provider: ExamProvider;
  level: CefrLevel;
  name: string;
  slug: string;
  totalDuration?: number;
  passingScore?: number;
  modules: ExamModule[];
}

export interface ExamModule {
  id: string;
  skill: Skill;
  name: string;
  orderIndex: number;
  duration?: number;
  totalPoints?: number;
}

// ─── Pathway & Lesson ────────────────────────
export interface Pathway {
  id: string;
  type: string;
  level?: CefrLevel;
  title: string;
  slug: string;
  description?: string;
  units: PathwayUnit[];
}

export interface PathwayUnit {
  id: string;
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  type: string;
  skill?: Skill;
  level?: CefrLevel;
  estimatedMinutes?: number;
  xpReward: number;
  steps?: LessonStep[];
}

export interface LessonStep {
  id: string;
  orderIndex: number;
  type: string;
  content: Record<string, any>;
  exercise?: Exercise;
}

// ─── Exercise ────────────────────────────────
export interface Exercise {
  id: string;
  type: string;
  skill?: Skill;
  level?: CefrLevel;
  prompt: string;
  instructions?: string;
  content: Record<string, any>;
  answerKey?: Record<string, any>;
  explanation?: string;
  hints: string[];
  difficulty: number;
}

// ─── Vocabulary ──────────────────────────────
export interface VocabularyItem {
  id: string;
  word: string;
  translation?: string;
  partOfSpeech?: string;
  gender?: string;
  plural?: string;
  exampleSentence?: string;
  audioUrl?: string;
  level?: CefrLevel;
  collocations: string[];
  synonyms: string[];
}

export interface VocabularyReview {
  id: string;
  vocabId: string;
  vocab: VocabularyItem;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: string;
  status: 'learning' | 'reviewing' | 'mastered';
}

// ─── Conversation ────────────────────────────
export interface Conversation {
  id: string;
  title: string;
  slug: string;
  scenario: string;
  level?: CefrLevel;
  formality: string;
  description?: string;
  turns: ConversationTurn[];
  keyPhrases: ConversationPhrase[];
}

export interface ConversationTurn {
  speakerRole: string;
  speakerName?: string;
  text: string;
  audioUrl?: string;
  translation?: string;
  orderIndex: number;
}

export interface ConversationPhrase {
  phrase: string;
  translation?: string;
  usage?: string;
}

// ─── Submission & Feedback ───────────────────
export interface Submission {
  id: string;
  userId: string;
  type: string;
  content?: Record<string, any>;
  score?: number;
  status: string;
  writingFeedback?: WritingFeedback[];
  speakingFeedback?: SpeakingFeedback[];
}

export interface WritingFeedback {
  taskAchievement?: number;
  organization?: number;
  coherence?: number;
  grammarAccuracy?: number;
  vocabularyRange?: number;
  overallScore?: number;
  cefrEstimate?: CefrLevel;
  suggestions?: Record<string, any>;
  generalFeedback?: string;
}

export interface SpeakingFeedback {
  pronunciation?: number;
  fluency?: number;
  grammarAccuracy?: number;
  vocabularyRange?: number;
  overallScore?: number;
  cefrEstimate?: CefrLevel;
  transcript?: string;
  feedback?: string;
}

// ─── Gamification ────────────────────────────
export interface Badge {
  id: string;
  name: string;
  displayName: string;
  description: string;
  imageUrl?: string;
  category: string;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: string;
}

// ─── Subscription ────────────────────────────
export interface Subscription {
  id: string;
  plan: 'FREE' | 'PREMIUM_MONTHLY' | 'PREMIUM_YEARLY' | 'INSTITUTION' | 'TRIAL';
  status: string;
  startDate: string;
  endDate?: string;
}

// ─── Dashboard ───────────────────────────────
export interface DashboardData {
  user: User;
  streak: Streak;
  todayXp: number;
  totalXp: number;
  vocabDueCount: number;
  unresolvedMistakes: number;
  recentActivity: ProgressRecord[];
}

export interface ProgressRecord {
  id: string;
  type: string;
  xpEarned: number;
  accuracy?: number;
  timeSpent?: number;
  createdAt: string;
}
