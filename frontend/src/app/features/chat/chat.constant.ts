import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';

export const CHAT_HEADER_MENU_ITEMS: IMenuItem[] = [
  {
    label: 'View profile',
    icon: 'person',
    value: 'profile',
  },
  {
    label: 'Mute notifications',
    icon: 'notifications_off',
    value: 'mute',
  },
  {
    label: 'Delete chat',
    icon: 'delete',
    value: 'delete',
  },
];
