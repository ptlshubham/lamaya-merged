import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ...
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CategoryService } from './category.service';

import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    JwBootstrapSwitchNg2Module,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    ColorPickerModule,
    RouterModule.forChild([
      {
        path:'category',
        component:CategoryComponent
      }
    ])
  ],
  providers: [
    CategoryService
  ],
  
})
export class CategoryModule { }
