export interface ChatMessage {
  id?: number;
  sender: string;
  content: string;
  timestamp?: string;
  type?: 'CHAT' | 'JOIN' | 'LEAVE';
}
