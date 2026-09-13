import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';

export const PROFILE_MENU_CONST: IMenuItem[] = [
  {
    label: 'Profile',
    icon: 'person',
    value: 'profile',
  },
  {
    label: 'Settings',
    icon: 'settings',
    value: 'settings',
  },
  {
    label: 'Dark mode',
    icon: 'dark_mode',
    value: 'theme',
  },
  {
    label: 'Logout',
    icon: 'logout',
    value: 'logout',
  },
];
