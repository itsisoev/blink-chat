import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';

export const CHAT_MESSAGE_MENU_ITEMS: IMenuItem[] = [
  {
    label: 'Edit message',
    icon: 'edit',
    value: 'edit',
  },
  {
    label: 'Delete message',
    icon: 'delete',
    value: 'delete',
  },
];
