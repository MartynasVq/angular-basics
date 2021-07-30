import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {Form, NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Output() add = new EventEmitter<Ingredient>();
  msg: string;

  constructor() { }

  ngOnInit(): void {
  }

  addNewIngredient(form: NgForm) {
    this.msg = 'Success!';
    let formValues = form.value;
    this.add.emit(new Ingredient(formValues.name.trim(), formValues.amount));
  }

  onCloseCall() {
    this.msg = undefined;
  }

}
