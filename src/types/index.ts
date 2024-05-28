export interface ChatMessage {
  id: string;
  created_at: string;
  user_id: string;
  entry: string;
  speaker: 'user' | 'ai';
  chat_id?: string;
  isLoading?: boolean;
}
