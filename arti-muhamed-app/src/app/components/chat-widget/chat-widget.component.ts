import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChatSimulatorComponent } from '../chat-simulator/chat-simulator.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ChatSimulatorComponent,
  ],
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.scss',
})
export class ChatWidgetComponent {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}
