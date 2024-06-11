import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  GotoSignIn(){
    // ir para a tela de cadastro
  }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut().then((res) => {
      this.router.navigate(["signin"]);
    })
  }

}
