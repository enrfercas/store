import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public isDesktop: boolean;

  constructor() {

    const w = window.innerWidth;
    if (w > 820){
      this.isDesktop = true;
    }else {
      this.isDesktop = false;
    }
  }
}
