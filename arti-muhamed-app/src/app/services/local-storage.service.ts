import { Injectable } from '@angular/core';
import { Chatbot } from '../models/chatbot.model';
import { StoredFile } from '../models/stored-file.model';
import { ChatMessage } from '../models/chat-message.model';

const LOCAL_STORAGE_KEY = 'chatbot_config';
const FILES_KEY = 'files_config';
const CHAT_HISTORY_KEY = 'chat_history';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveChatbotConfig(chatbot: Chatbot) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatbot));
  }

  getChatbotConfig(): Chatbot | null {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearChatbotConfig(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  saveFiles(files: StoredFile[]): void {
    localStorage.setItem(FILES_KEY, JSON.stringify(files));
  }

  getFiles(): StoredFile[] {
    const files = localStorage.getItem(FILES_KEY);
    return files ? JSON.parse(files) : [];
  }

  removeFile(name: string): void {
    const saved_files = this.getFiles().filter((f) => f.name !== name);
    this.saveFiles(saved_files);
  }

  saveChatHistory(history: ChatMessage[]): void {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
  }

  getChatHistory(): ChatMessage[] {
    const data = localStorage.getItem(CHAT_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  }

  clearChatHistory(): void {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  }
}
