import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Theme } from "../../../models/theme.model";
import { ThemeService } from "../../../services/theme.service";


@Component({
  selector: 'theme-menu',
  templateUrl: './theme-menu.component.html',
  styleUrls: ['./theme-menu.component.css']
})
export class ThemeMenuComponent {

  @Input() theme: Array<Theme>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  changeTheme(themeToSet) {
    this.themeChange.emit(themeToSet);
  }  

}
