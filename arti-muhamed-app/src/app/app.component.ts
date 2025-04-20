import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ChatSimulatorComponent } from './components/chat-simulator/chat-simulator.component';
import { HeaderComponent } from './components/header/header.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatbotComponent,
    ChatSimulatorComponent,
    HeaderComponent,
    ChatWidgetComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'arti-muhamed-app';
}
