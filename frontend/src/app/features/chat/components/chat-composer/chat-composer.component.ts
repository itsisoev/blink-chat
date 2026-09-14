import { Component, output } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatFormField, MatInput, MatIcon, MatButton],
  selector: 'app-chat-composer',
  styleUrl: './chat-composer.component.scss',
  templateUrl: './chat-composer.component.html',
})
export class ChatComposerComponent {
  readonly messageSent = output<string>();

  onSendMessage(input: HTMLInputElement): void {
    const message = input.value.trim();
    if (!message) {
      return;
    }
    this.messageSent.emit(message);
    input.value = '';
  }
}
