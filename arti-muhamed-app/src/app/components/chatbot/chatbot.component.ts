import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Chatbot } from '../../models/chatbot.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { StoredFile } from '../../models/stored-file.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatCardActions,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements OnInit {
  chatbotForm: FormGroup;
  uploadedFiles: StoredFile[] = [];

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {
    this.chatbotForm = this.fb.group({
      name: ['', Validators.required],
      personality: [0.5],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.uploadedFiles = this.localStorageService.getFiles();
  }

  showToastrMessage(
    message: string,
    status: string,
    type: 'success' | 'info',
    showClose: boolean
  ) {
    this.toastr[type](message, status, {
      closeButton: showClose,
    });
  }

  saveData(): void {
    if (this.chatbotForm.valid) {
      const chatBotData: Chatbot = this.chatbotForm.value;
      this.localStorageService.saveChatbotConfig(chatBotData);
      this.showToastrMessage(
        'Chatbot data saved successfully!',
        'Success',
        'success',
        true
      );
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length) {
      const readerPromises: Promise<StoredFile>[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        const promise = new Promise<StoredFile>((resolve, reject) => {
          reader.onload = () => {
            resolve({
              name: file.name,
              content: reader.result as string,
            });
          };
          reader.onerror = reject;
        });
        reader.readAsText(file);
        readerPromises.push(promise);
      });

      Promise.all(readerPromises).then((results) => {
        this.uploadedFiles = [...this.uploadedFiles, ...results];
        this.localStorageService.saveFiles(this.uploadedFiles);
        this.showToastrMessage(
          'Files uploaded successfully',
          'Success',
          'success',
          true
        );
      });
    }
  }

  deleteFile(name: string): void {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f.name !== name);
    this.localStorageService.removeFile(name);
    this.showToastrMessage(`Deleted "${name}"`, 'File Removed', 'info', true);
  }
}
