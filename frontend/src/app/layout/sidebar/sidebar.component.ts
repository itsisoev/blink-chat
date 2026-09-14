import { Component, computed, inject, signal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

import { ThemeService } from '@core/services/theme/theme.service';
import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';
import { UiMenuComponent } from '@shared/ui-components/ui-menu/ui-menu.component';
import { PROFILE_MENU_CONST } from '@layout/sidebar/sidebar.constant';
import { SidebarListComponent } from '@layout/sidebar/components/sidebar-list/sidebar-list.component';
import { IUser } from '@shared/interfaces/user.interface';

import { MOCK_USER } from '../../mock-user';

@Component({
  imports: [MatFormField, MatLabel, MatInput, MatIcon, UiMenuComponent, SidebarListComponent],
  selector: 'app-sidebar',
  styleUrl: './sidebar.component.scss',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly users = signal<IUser[]>(MOCK_USER);

  readonly profileMenu = computed<IMenuItem[]>(() => {
    const isDark = this.themeService.theme() === 'dark';

    return PROFILE_MENU_CONST.map((item) => {
      if (item.value !== 'theme') {
        return item;
      }

      return {
        ...item,
        label: isDark ? 'Light mode' : 'Dark mode',
        icon: isDark ? 'light_mode' : 'dark_mode',
      };
    });
  });

  onMenuItemSelected(item: IMenuItem): void {
    if (item.value === 'theme') {
      this.themeService.toggle();
    }
  }

  onUserSelected(user: IUser): void {
    this.router.navigate(['/chat', user.name]);
  }

  onFindFriendsClick(): void {
    console.log('Friends clicked');
  }
}
