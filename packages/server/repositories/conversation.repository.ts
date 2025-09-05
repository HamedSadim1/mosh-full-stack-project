// conversationId to lastResponseId mapping
// In de pruduction, gebruikt een database zoals Redis of PostgreSQL
const conversations = new Map<string, string>();

export const conversationRepository = {
  getLastResponseId(conversationId: string): string | undefined {
    return conversations.get(conversationId);
  },
  setLastResponseId(conversationId: string, responseId: string) {
    conversations.set(conversationId, responseId);
  },
};
