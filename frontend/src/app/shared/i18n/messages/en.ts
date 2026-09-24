import { IMessageDictionary } from '@shared/i18n/messages/message-dictionary.type';

export const EN_MESSAGES: IMessageDictionary = {
  USER_REGISTERED: 'Registration successful',
  USER_NOT_FOUND: 'User not found',
  USERNAME_ALREADY_EXISTS: 'This username is already taken',

  VALIDATION_ERROR: 'Please check the entered data',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  NOT_FOUND: 'Requested resource not found',

  USER_LOGGED_IN: 'You have successfully logged in',
  USER_LOGGED_OUT: 'You have successfully logged out',
  TOKEN_REFRESHED: 'Session refreshed',
  INVALID_CREDENTIALS: 'Invalid username or password',
  UNAUTHORIZED: 'You need to log in',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again',
  INVALID_REFRESH_TOKEN: 'Unable to refresh your session',
};
