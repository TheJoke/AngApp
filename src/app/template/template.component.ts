import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';
import { ProfilModalComponent } from '../profil-modal/profil-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{
  isLoggedIn : boolean =false;
  constructor(private auth:AuthService,private router:Router,private dialog:MatDialog){}
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

  getUserid():number{
    return this.auth.getUserId();
  }
  openModal(memberId: number) {
    this.dialog.open(ProfilModalComponent, {
      width: '400px',
      data: { id: memberId } // Passez l'ID du membre
    });
  }
}
