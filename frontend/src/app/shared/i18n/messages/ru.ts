import { IMessageDictionary } from '@shared/i18n/messages/message-dictionary.type';

export const RU_MESSAGES: IMessageDictionary = {
  USER_REGISTERED: 'Регистрация прошла успешно',
  USER_NOT_FOUND: 'Пользователь не найден',
  USERNAME_ALREADY_EXISTS: 'Это имя пользователя уже занято',

  VALIDATION_ERROR: 'Проверьте правильность введённых данных',
  INTERNAL_SERVER_ERROR: 'Внутренняя ошибка сервера',
  NOT_FOUND: 'Запрашиваемый ресурс не найден',

  USER_LOGGED_IN: 'Вы успешно вошли',
  USER_LOGGED_OUT: 'Вы вышли из аккаунта',
  TOKEN_REFRESHED: 'Сессия обновлена',
  INVALID_CREDENTIALS: 'Неверное имя пользователя или пароль',
  UNAUTHORIZED: 'Необходимо авторизоваться',
  TOKEN_EXPIRED: 'Сессия истекла. Войдите снова',
  INVALID_REFRESH_TOKEN: 'Не удалось обновить сессию',
};
