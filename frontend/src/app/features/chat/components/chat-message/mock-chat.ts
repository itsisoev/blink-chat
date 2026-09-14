import { IChatMessage } from '@features/chat/components/chat-message/chat-message.interface';

export const MOCK_CHAT_MESSAGES: IChatMessage[] = [
  {
    uuid: 'msg-001',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'Hey! How are you doing?',
    createdAt: '2026-09-14T09:12:00',
  },
  {
    uuid: 'msg-002',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'Hey! I’m doing pretty well. Just working on my project right now.',
    createdAt: '2026-09-14T09:14:00',
  },
  {
    uuid: 'msg-003',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'Nice! What are you working on?',
    createdAt: '2026-09-14T09:15:00',
  },
  {
    uuid: 'msg-004',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'I’m building a small chat application with Angular and TypeScript. I’m trying to keep the architecture clean and simple.',
    createdAt: '2026-09-14T09:17:00',
  },
  {
    uuid: 'msg-005',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'That sounds interesting. Are you using any state management library?',
    createdAt: '2026-09-14T09:18:00',
  },
  {
    uuid: 'msg-006',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'Not for now. I’m using Angular Signals and services. I think it’s enough for this project.',
    createdAt: '2026-09-14T09:20:00',
  },
  {
    uuid: 'msg-007',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'Yeah, that makes sense. Using a state management library for everything can sometimes make a small application more complicated than it needs to be.',
    createdAt: '2026-09-14T09:22:00',
  },
  {
    uuid: 'msg-008',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'Exactly. I want to understand the application first and add more abstractions only when they are actually needed.',
    createdAt: '2026-09-14T09:24:00',
  },
  {
    uuid: 'msg-009',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'I like that approach. How is the responsive layout going?',
    createdAt: '2026-09-14T09:26:00',
  },
  {
    uuid: 'msg-010',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'Pretty good. On desktop I have the sidebar on the left and the chat on the right. On mobile the sidebar becomes the main screen, and when you open a chat, the chat takes the whole screen.',
    createdAt: '2026-09-14T09:28:00',
  },
  {
    uuid: 'msg-011',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'That sounds much better for mobile. Did you add a back button to the chat header?',
    createdAt: '2026-09-14T09:30:00',
  },
  {
    uuid: 'msg-012',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'Yes. It only appears on mobile and tablet. When I click it, I navigate back to the user list.',
    createdAt: '2026-09-14T09:31:00',
  },
  {
    uuid: 'msg-013',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'Perfect. What are you planning to work on next?',
    createdAt: '2026-09-14T09:33:00',
  },
  {
    uuid: 'msg-014',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'I’m working on the message composer now. After that I want to connect the messages to a proper state and eventually add a backend.',
    createdAt: '2026-09-14T09:35:00',
  },
  {
    uuid: 'msg-015',
    senderUuid: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    text: 'Sounds like a good plan. Keep the first version simple and add features step by step.',
    createdAt: '2026-09-14T09:37:00',
  },
  {
    uuid: 'msg-016',
    senderUuid: '550e8400-e29b-41d4-a716-446655440000',
    text: 'Yeah, that’s exactly what I’m trying to do.',
    createdAt: '2026-09-14T09:39:00',
  },
];
