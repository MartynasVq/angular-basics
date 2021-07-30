import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private data: DataStorageService) { }

  ngOnInit(): void {
  }

  storeRecipes() {
    this.data.storeRecipes();
  }

  fetchRecipes() {
    this.data.fetchRecipes().subscribe();
  }
}
