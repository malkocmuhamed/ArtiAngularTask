export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  created_timestamp: Date;
}
