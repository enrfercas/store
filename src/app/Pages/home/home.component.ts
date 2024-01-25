import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public value: string = 'Search a product';
  public categories: string[] = ['computer', 'cell phone', 'keyboard'];

  @ViewChild('menuCategories') menuCategories: MatSelectionList | undefined;

  constructor() {}

  ngOnInit(): void {}

  // Esta función se puede llamar para obtener los valores seleccionados
  getSelectedCategories(): string[] | void {
    if (this.menuCategories) {
      return this.menuCategories.selectedOptions.selected.map((option: MatListOption) => option.value);
    }
  }

  showArray() {
    let array = this.getSelectedCategories();
    console.log(array);
  }
}
