import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@layout/sidebar/sidebar.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';


@Component({
  imports: [RouterOutlet, SidebarComponent, SidebarComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  readonly isChatRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.startsWith('/chat/')),
    ),
    {
      initialValue: this.router.url.startsWith('/chat/'),
    },
  );
}
