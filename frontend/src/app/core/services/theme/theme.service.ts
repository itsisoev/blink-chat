import { Service, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Service()
export class ThemeService {
  private readonly storageKey = 'blink-chat-theme';

  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  toggle(): void {
    const theme = this.theme() === 'light' ? 'dark' : 'light';

    this.theme.set(theme);
    this.applyTheme(theme);

    localStorage.setItem(this.storageKey, theme);
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private getInitialTheme(): Theme {
    const storedTheme = localStorage.getItem(this.storageKey);

    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }

    return 'light';
  }
}
