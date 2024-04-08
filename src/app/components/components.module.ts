import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PetshopComponent } from './petshop/petshop.component';



@NgModule({
  declarations: [PetshopComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [PetshopComponent]
})
export class ComponentsModule { }
