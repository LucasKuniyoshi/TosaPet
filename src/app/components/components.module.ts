import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PetshopComponent } from './petshop/petshop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SectionsComponent } from './sections/sections.component';



@NgModule({
  declarations: [PetshopComponent, SectionsComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [PetshopComponent, SectionsComponent]
})
export class ComponentsModule { }
