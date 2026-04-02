export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string; // ISO string (JSON doesn't serialize Date)
  updatedAt: string; // ISO string
  personaId: string; // default "vesemir" for now
}

export interface ConversationsState {
  conversations: Conversation[];
  activeConversationId: string | null;
}
