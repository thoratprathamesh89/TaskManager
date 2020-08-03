import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs";
import { Theme } from "../../models/theme.model";
import { ThemeService } from "../../services/theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title : string;
  
  theme$: Observable<Array<Theme>> = this.themeService.getThemeOptions();

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.setTheme("deeppurple-amber");
  }

  themeChangeHandler(themeToSet) {
    this.themeService.setTheme(themeToSet);
  }

}
