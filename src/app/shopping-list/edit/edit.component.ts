import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild("nameInput") nameInput?: ElementRef;
  @ViewChild("amountInput") amountInput?: ElementRef;
  @Output() add = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addNewIngredient() {

    if(this.nameInput?.nativeElement.value.length > 1 && this.amountInput?.nativeElement.value > 0) {
      this.add.emit(new Ingredient(this.nameInput?.nativeElement.value.trim(), this.amountInput?.nativeElement.value));
    }
  }

}
