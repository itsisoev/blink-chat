import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';
import { UiMenuComponent } from '@shared/ui-components/ui-menu/ui-menu.component';
import { IUser } from '@shared/interfaces/user.interface';
import { CHAT_HEADER_MENU_ITEMS } from '@features/chat/chat.constant';

@Component({
  imports: [MatButtonModule, MatIcon, UiMenuComponent],
  selector: 'app-chat-header',
  styleUrl: './chat-header.component.scss',
  templateUrl: './chat-header.component.html',
})
export class ChatHeaderComponent {
  readonly user = input.required<IUser>();

  readonly menuItemSelected = output<IMenuItem>();

  readonly backClicked = output<void>();

  readonly menuItems = CHAT_HEADER_MENU_ITEMS;
}
