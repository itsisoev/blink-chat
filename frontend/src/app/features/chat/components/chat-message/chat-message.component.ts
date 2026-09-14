import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';
import { UiMenuComponent } from '@shared/ui-components/ui-menu/ui-menu.component';
import { IChatMessage } from '@features/chat/components/chat-message/chat-message.interface';
import { MOCK_CHAT_MESSAGES } from '@features/chat/components/chat-message/mock-chat';
import { CHAT_MESSAGE_MENU_ITEMS } from '@features/chat/components/chat-message/chat-message.constant';

const CURRENT_USER_UUID = '550e8400-e29b-41d4-a716-446655440000';

@Component({
  selector: 'app-chat-message',
  imports: [DatePipe, UiMenuComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  readonly messages = signal<IChatMessage[]>(MOCK_CHAT_MESSAGES);

  readonly currentUserUuid = CURRENT_USER_UUID;

  readonly messageMenuItems = CHAT_MESSAGE_MENU_ITEMS;

  readonly selectedMessage = signal<IChatMessage | null>(null);

  readonly messageGroups = computed(() =>
    this.messages().map((message) => ({
      ...message,
      isOwn: message.senderUuid === this.currentUserUuid,
    })),
  );

  onMessageMenuClicked(message: IChatMessage): void {
    this.selectedMessage.set(message);
  }

  onMenuItemSelected(item: IMenuItem): void {
    const message = this.selectedMessage();

    if (!message) {
      return;
    }

    switch (item.value) {
      case 'edit':
        this.editMessage(message);
        break;

      case 'delete':
        this.deleteMessage(message);
        break;
    }
  }

  private editMessage(message: IChatMessage): void {
    console.log('Edit message:', message);
  }

  private deleteMessage(message: IChatMessage): void {
    this.messages.update((messages) => messages.filter((item) => item.uuid !== message.uuid));

    this.selectedMessage.set(null);
  }
}
