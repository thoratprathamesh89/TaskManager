import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Theme } from "../models/theme.model";
import { StyleManagerService } from "./style-manager.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {}

  getThemeOptions(): Observable<Array<Theme>> {
    return this.http.get<Array<Theme>>("assets/theme.json");
  }

  setTheme(themeToSet) {
    this.styleManager.setStyle(
      "themeAsset",
      `assets/prebuilt-themes/${themeToSet}.css`
    );
  }
}
