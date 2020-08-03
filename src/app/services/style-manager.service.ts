import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleManagerService {

  constructor() { }

  setStyle(key: string, path: string) {
    document.getElementById(key).setAttribute("href", "../"+path);
  }
}
