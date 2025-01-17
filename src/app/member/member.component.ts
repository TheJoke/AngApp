import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/Models/member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{
dataSource :Member[] =[];
etudiants: Member[] = [];
enseignants: Member[] = [];
displayedColumns1: string[] = []
displayedColumns2: string[] = []

isLoggedIn: boolean = false

constructor(private MS: MemberService,private router:Router,private dialog:MatDialog,private auth:AuthService){}

ngOnInit():void
{
  //appler la fonction du service getAllMembers() (injection de dépendances: permet au composants/autres services d'utiliser le service en crayant une instance privée du service dans le contructeur du service/composant )
  //attendre e résultat 
  //une fois on recoit le res => l'affecter dans la datasource
  this.MS.getAllMembers().subscribe((members)=>{
    //action post résultat
    //members représente la réponse de getAllMembers qui représente le tableau des Members
    if(this.isLoggedIn && this.isAdmin()){
      this.displayedColumns1 = ['id', 'cin', 'nom', 'prenom', 'diplome',  'email', 'crud'] ; 
      this.displayedColumns2 = ['id', 'cin', 'nom', 'prenom', 'grade', 'etablissement', 'email','crud'];
    }
    else{
      this.displayedColumns1 = ['id', 'cin', 'nom', 'prenom', 'diplome',  'email'] ; 
      this.displayedColumns2 = ['id', 'cin', 'nom', 'prenom', 'grade', 'etablissement', 'email'];
    }
    this.dataSource = members;
    this.etudiants = members.filter((m) => m.type === 'etd');
    this.enseignants = members.filter((m) => m.type === 'ens');
    
  })
  this.auth.authStatusListener();
    this.isLoggedIn = this.auth.getLoginStatus();
}
delete(id:string):void{
//1) lancer la boite de dialogue (Confirmcomponent)
const dialogRef = this.dialog.open(ConfirmComponent);

//2) attendre le res de l'utilisateur
dialogRef.afterClosed().subscribe((response)=>{
  if (response){
    this.MS.deleteMember(id).subscribe(()=>{
      this.MS.getAllMembers().subscribe((members)=>{
        //action post résultat
        //members représente la réponse de getAllMembers qui représente le tableau des Members
        this.dataSource = members;
        this.etudiants = members.filter((m) => m.type === 'etd');
        this.enseignants = members.filter((m) => m.type === 'ens');;
    })
    })
  }
})
  
}
isLogged(): boolean {
  return this.isLoggedIn;
}
isAdmin():boolean{
  return this.auth.getUserRole()=="admin";
}
}