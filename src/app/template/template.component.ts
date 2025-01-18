import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{
  isLoggedIn : boolean =false;
  constructor(private auth:AuthService,private router:Router){}
  ngOnInit(): void {
    this.auth.authStatusListener().subscribe((status) => {
      this.isLoggedIn = status;  // Met à jour isLoggedIn en fonction du statut
    });
  }
  logout():void{
    this.auth.doLogout().then(()=>{
      this.router.navigate(['']);
    })
  }
  login(): void {
    this.router.navigate(['/login']);
    console.log(this.isLoggedIn);
  }

  isLogged(): boolean {
    return this.isLoggedIn;
  }
  isAdmin():boolean{
    return this.auth.getUserRole()=="admin";
  }
}
