import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  imports: [RouterOutlet, SidebarComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly themeService = inject(ThemeService);

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    {
      initialValue: null,
    },
  );

  readonly showSidebar = computed(() => {
    const navigationEnd = this.navigationEnd();

    if (!navigationEnd) {
      return false;
    }

    let route = this.activatedRoute.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data['showSidebar'] !== false;
  });

  readonly isChatRoute = computed(() => {
    const navigationEnd = this.navigationEnd();

    if (!navigationEnd) {
      return false;
    }

    return navigationEnd.urlAfterRedirects.startsWith('/chat/');
  });
}
