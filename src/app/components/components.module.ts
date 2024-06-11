import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PetshopComponent } from './petshop/petshop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SectionsComponent } from './sections/sections.component';
import { SearchbarComponent } from './searchbar/searchbar.component';



@NgModule({
  declarations: [PetshopComponent, SectionsComponent, SearchbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [PetshopComponent, SectionsComponent, SearchbarComponent]
})
export class ComponentsModule { }
