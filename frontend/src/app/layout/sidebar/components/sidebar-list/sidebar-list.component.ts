import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { IUser } from '@shared/interfaces/user.interface';

@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-sidebar-list',
  styleUrl: './sidebar-list.component.scss',
  templateUrl: './sidebar-list.component.html',
})
export class SidebarListComponent {
  items = input.required<IUser[]>();

  itemSelected = output<IUser>();
  findFriendsClicked = output<void>();

  onItemClick(item: IUser): void {
    this.itemSelected.emit(item);
  }

  onFindFriendsClick(): void {
    this.findFriendsClicked.emit();
  }
}
