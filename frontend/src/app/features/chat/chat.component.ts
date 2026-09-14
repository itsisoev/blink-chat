import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { ChatHeaderComponent } from '@features/chat/components/chat-header/chat-header.component';
import { ChatMessageComponent } from '@features/chat/components/chat-message/chat-message.component';
import { ChatComposerComponent } from '@features/chat/components/chat-composer/chat-composer.component';

import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';
import { IUser } from '@shared/interfaces/user.interface';

import { MOCK_USER } from '../../mock-user';

@Component({
  imports: [ChatHeaderComponent, ChatMessageComponent, ChatComposerComponent],
  selector: 'app-chat',
  styleUrl: './chat.component.scss',
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly users = signal<IUser[]>(MOCK_USER);

  readonly userName = toSignal(this.route.paramMap.pipe(map((params) => params.get('name'))), {
    initialValue: null,
  });

  readonly selectedUser = computed(() =>
    this.users().find((user) => user.name === this.userName()),
  );

  onBackClicked(): void {
    this.router.navigate(['/']);
  }

  onMenuItemSelected(item: IMenuItem): void {
    switch (item.value) {
      case 'profile':
        this.openProfile();
        break;

      case 'mute':
        this.muteChat();
        break;

      case 'delete':
        this.deleteChat();
        break;
    }
  }

  private openProfile(): void {}

  private muteChat(): void {}

  private deleteChat(): void {}
}
