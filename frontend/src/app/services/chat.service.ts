import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import { ChatMessage } from '../models/chat-message.model';

// Use localhost for local development, or update with production backend URL
const isLocal = window.location.hostname === 'localhost';
const BACKEND_URL = isLocal ? 'localhost:8080' : 'YOUR_RENDER_APP.onrender.com';
const WS_SCHEME = isLocal ? 'ws' : 'wss';
const HTTP_SCHEME = isLocal ? 'http' : 'https';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client | null = null;
  private messageSubject = new Subject<ChatMessage>();
  private apiUrl = `${HTTP_SCHEME}://${BACKEND_URL}/api/messages`;

  constructor(private http: HttpClient) {}

  public connect(username: string): Observable<ChatMessage> {
    this.stompClient = new Client({
      brokerURL: `${WS_SCHEME}://${BACKEND_URL}/ws-direct`,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log('[STOMP]', str);
      }
    });

    this.stompClient.onConnect = () => {
      this.stompClient?.subscribe('/topic/public', (message: IMessage) => {
        if (message.body) {
          const chatMsg: ChatMessage = JSON.parse(message.body);
          this.messageSubject.next(chatMsg);
        }
      });

      this.stompClient?.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify({ sender: username, type: 'JOIN', content: `${username} joined the chat.` })
      });
    };

    this.stompClient.activate();
    return this.messageSubject.asObservable();
  }

  public sendMessage(message: ChatMessage): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message)
      });
    }
  }

  public getHistory(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.apiUrl);
  }

  public disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.deactivate();
    }
  }
}
