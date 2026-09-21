import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './services/chat.service';
import { ChatMessage } from './models/chat-message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  username = '';
  messageContent = '';
  messages: ChatMessage[] = [];
  connected = false;
  usernameSubmitted = false;

  private subscription!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  joinChat(): void {
    if (!this.username.trim()) return;
    this.usernameSubmitted = true;

    this.chatService.getHistory().subscribe({
      next: (history) => {
        this.messages = history;
        this.scrollToBottom();
      },
      error: () => {}
    });

    this.subscription = this.chatService.connect(this.username).subscribe({
      next: (message) => {
        this.messages.push(message);
        this.scrollToBottom();
      }
    });

    this.connected = true;
  }

  sendMessage(): void {
    if (!this.messageContent.trim()) return;

    const chatMsg: ChatMessage = {
      sender: this.username,
      content: this.messageContent.trim(),
      type: 'CHAT'
    };

    this.chatService.sendMessage(chatMsg);
    this.messageContent = '';
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  isMyMessage(msg: ChatMessage): boolean {
    return msg.sender === this.username;
  }

  formatTime(timestamp: string | undefined): string {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
