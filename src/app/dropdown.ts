import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

/** @title Fixed sidenav */
@Component({
  selector: 'app-dropdown',
  templateUrl: './app.component.html',
  styleUrls: ['./sidenav-fixed-example.css'],

})
export class SidenavFixedComponent {
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });
  }
}
