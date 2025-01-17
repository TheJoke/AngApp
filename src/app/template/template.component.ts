import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  isLoggedIn : boolean =false;
  constructor(private AS:AuthService,private router:Router){}
  logout():void{
    this.isLoggedIn=false;
    this.AS.doLogout().then(()=>{
      this.router.navigate(['']);
    })
  }
  login(): void {
    this.isLoggedIn = true;
    this.router.navigate(['login/']);
  }
  
}
