import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { IMenuItem } from '@shared/ui-components/ui-menu/ui-menu.interface';

@Component({
  imports: [MatButtonModule, MatMenuModule, MatIcon],
  selector: 'app-ui-menu',
  templateUrl: './ui-menu.component.html',
})
export class UiMenuComponent {
  readonly items = input.required<IMenuItem[]>();
  readonly itemSelected = output<IMenuItem>();
}
