import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AiTutorService {
  constructor(private prisma: PrismaService) {}

  async getConversations(userId: string) {
    return this.prisma.aiConversation.findMany({
      where: { userId, isActive: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async createConversation(userId: string, mode: string) {
    const greeting = this.getGreeting(mode);
    return this.prisma.aiConversation.create({
      data: { userId, mode, title: `${mode} session`,
        messages: [{ role: 'assistant', content: greeting, timestamp: new Date().toISOString() }] },
    });
  }

  async sendMessage(userId: string, convId: string, message: string) {
    const conv = await this.prisma.aiConversation.findFirst({ where: { id: convId, userId } });
    if (!conv) throw new NotFoundException('Conversation not found');
    const messages = (conv.messages as any[]) || [];
    messages.push({ role: 'user', content: message, timestamp: new Date().toISOString() });
    // Simple rule-based response (replace with real AI API in production)
    const response = this.generateResponse(conv.mode, message);
    messages.push({ role: 'assistant', content: response, timestamp: new Date().toISOString() });
    await this.prisma.aiConversation.update({ where: { id: convId }, data: { messages } });
    return { response, conversationId: convId };
  }

  private getGreeting(mode: string): string {
    const greetings: Record<string, string> = {
      general: 'Hallo! I am your German tutor. Ask me anything about German language, grammar, vocabulary, or culture!',
      grammar: 'Willkommen! I am here to help with German grammar. Ask about cases, verb conjugation, sentence structure, or any grammar topic.',
      writing_coach: 'Guten Tag! I will help you improve your German writing. Share your text and I will give feedback on grammar, vocabulary, and style.',
      roleplay: 'Hallo! Let us practice a conversation in German. Tell me a scenario — restaurant, doctor, job interview — and we will roleplay it!',
      exam_strategy: 'Welcome! I can help you prepare for your Goethe or telc exam. Ask about strategies, timing, common mistakes, or specific exam sections.',
    };
    return greetings[mode] || greetings.general;
  }

  private generateResponse(mode: string, message: string): string {
    const lower = message.toLowerCase();
    if (lower.includes('dativ') || lower.includes('dative'))
      return 'The dative case (Dativ) is used for indirect objects and after certain prepositions: aus, bei, mit, nach, seit, von, zu. For example: "Ich gebe dem Mann das Buch." The articles change: der→dem, die→der, das→dem, die(pl)→den+n.';
    if (lower.includes('akkusativ') || lower.includes('accusative'))
      return 'The accusative case (Akkusativ) is used for direct objects. Only the masculine article changes: der→den, ein→einen. Example: "Ich sehe den Mann." Prepositions like durch, für, gegen, ohne, um always take accusative.';
    if (lower.includes('artikel') || lower.includes('article') || lower.includes('gender'))
      return 'German has three genders: masculine (der), feminine (die), neuter (das). Some tips: -ung, -heit, -keit endings are feminine. -chen, -lein endings are neuter. Days, months, seasons are masculine. You must memorize the gender with each noun!';
    if (lower.includes('konjunktiv') || lower.includes('subjunctive'))
      return 'Konjunktiv II is used for wishes, hypotheticals, and polite requests. Common forms: wäre (would be), hätte (would have), könnte (could), würde + infinitive. Example: "Wenn ich reich wäre, würde ich reisen."';
    if (lower.includes('perfekt') || lower.includes('past'))
      return 'Perfekt uses haben/sein + past participle. Most verbs use haben: "Ich habe gegessen." Verbs of movement/change use sein: "Ich bin gefahren." Past participle: ge- + stem + -t (regular) or ge- + stem + -en (irregular).';
    if (lower.includes('hallo') || lower.includes('hello') || lower.includes('hi'))
      return 'Hallo! Wie geht es Ihnen? (How are you?) This is a formal greeting. Informal: "Wie geht\'s?" You can respond: "Mir geht es gut, danke!" (I am doing well, thanks!)';
    return `That is a great question about German! In the ${mode} context: the key is consistent practice. Try to use what you learn in real situations. Would you like me to explain a specific grammar rule, give you a practice exercise, or discuss exam strategies?`;
  }
}
