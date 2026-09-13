import { Component, computed, inject, signal } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ISidebar } from '@layout/sidebar/sidebar.interface';
import { ThemeService } from '@core/services/theme/theme.service';
import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';
import { UiMenuComponent } from '@shared/ui-components/ui-menu/ui-menu.component';
import { PROFILE_MENU_CONST } from '@layout/sidebar/sidebar.constant';

@Component({
  imports: [MatFormField, MatLabel, MatInput, MatIcon, UiMenuComponent],
  selector: 'app-sidebar',
  styleUrl: './sidebar.component.scss',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private readonly themeService = inject(ThemeService);

  readonly users = signal<ISidebar[]>([
    {
      uuid: 1,
      name: 'Daler',
      avatar: 'https://i.pravatar.cc/150?img=12',
      online: true,
    },
    {
      uuid: 2,
      name: 'Alex',
      avatar: 'https://i.pravatar.cc/150?img=3',
      online: true,
    },
    {
      uuid: 3,
      name: 'John',
      avatar: 'https://i.pravatar.cc/150?img=5',
      online: false,
    },
    {
      uuid: 4,
      name: 'Sarah',
      avatar: 'https://i.pravatar.cc/150?img=9',
      online: true,
    },
    {
      uuid: 5,
      name: 'Michael',
      avatar: 'https://i.pravatar.cc/150?img=11',
      online: false,
    },
    {
      uuid: 6,
      name: 'Emma',
      avatar: 'https://i.pravatar.cc/150?img=16',
      online: true,
    },
    {
      uuid: 7,
      name: 'Daniel',
      avatar: 'https://i.pravatar.cc/150?img=13',
      online: true,
    },
    {
      uuid: 8,
      name: 'Olivia',
      avatar: 'https://i.pravatar.cc/150?img=23',
      online: false,
    },
    {
      uuid: 9,
      name: 'James',
      avatar: 'https://i.pravatar.cc/150?img=15',
      online: true,
    },
    {
      uuid: 10,
      name: 'Sophia',
      avatar: 'https://i.pravatar.cc/150?img=32',
      online: true,
    },
    {
      uuid: 11,
      name: 'William',
      avatar: 'https://i.pravatar.cc/150?img=14',
      online: false,
    },
    {
      uuid: 12,
      name: 'Emily',
      avatar: 'https://i.pravatar.cc/150?img=25',
      online: true,
    },
    {
      uuid: 13,
      name: 'Robert',
      avatar: 'https://i.pravatar.cc/150?img=17',
      online: false,
    },
    {
      uuid: 14,
      name: 'Isabella',
      avatar: 'https://i.pravatar.cc/150?img=26',
      online: true,
    },
    {
      uuid: 15,
      name: 'David',
      avatar: 'https://i.pravatar.cc/150?img=18',
      online: true,
    },
    {
      uuid: 16,
      name: 'Mia',
      avatar: 'https://i.pravatar.cc/150?img=27',
      online: false,
    },
    {
      uuid: 17,
      name: 'Christopher',
      avatar: 'https://i.pravatar.cc/150?img=19',
      online: true,
    },
    {
      uuid: 18,
      name: 'Charlotte',
      avatar: 'https://i.pravatar.cc/150?img=28',
      online: false,
    },
    {
      uuid: 19,
      name: 'Matthew',
      avatar: 'https://i.pravatar.cc/150?img=20',
      online: true,
    },
    {
      uuid: 20,
      name: 'Amelia',
      avatar: 'https://i.pravatar.cc/150?img=29',
      online: false,
    },
  ]);

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
}
