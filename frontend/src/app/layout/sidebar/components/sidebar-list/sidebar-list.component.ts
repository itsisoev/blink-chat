import { Component, input, output } from '@angular/core';
import { ISidebar } from '@layout/sidebar/sidebar.interface';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatIcon, MatButton],
  selector: 'app-sidebar-list',
  styleUrl: './sidebar-list.component.scss',
  templateUrl: './sidebar-list.component.html',
})
export class SidebarListComponent {
  items = input.required<ISidebar[]>();

  itemSelected = output<ISidebar>();
  findFriendsClicked = output<void>();

  onItemClick(item: ISidebar): void {
    this.itemSelected.emit(item);
  }

  onFindFriendsClick(): void {
    this.findFriendsClicked.emit();
  }
}
