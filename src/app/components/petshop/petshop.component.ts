import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-petshop',
  templateUrl: './petshop.component.html',
  styleUrls: ['./petshop.component.scss'],
})
export class PetshopComponent  implements OnInit {
  @Input() petshop: any;

  constructor() { }

  ngOnInit() {}

}
