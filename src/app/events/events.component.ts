import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventService } from 'src/Services/event.service';
import { ModalComponent } from '../modal/modal.component';
import { Event } from 'src/Models/evenement';
import { DialogRef } from '@angular/cdk/dialog';
import { AuthService } from 'src/Services/AuthService';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  datasource : Event[] =[];
  isLoggedIn: boolean = false
  displayedColumns: string[] = []

  constructor(private ES:EventService,private dialog:MatDialog,private auth:AuthService){}
  ngOnInit():void{
    this.ES.getAll().subscribe((response)=>{
      if(this.isLoggedIn){
        this.displayedColumns = ["id","titre","dateDebut","dateFin","lieu","crud"] ; 
      }
      else{
        this.displayedColumns = ["id","titre","dateDebut","dateFin","lieu"];
      }
    this.datasource = response
    })
    this.auth.authStatusListener();
    this.isLoggedIn = this.auth.getLoginStatus();
  }
  open():void{
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { name: 'austin' },
    });
    //recuperer les données du modal
    dialogRef.afterClosed().subscribe((data)=>{
      this.ES.addEvent(data).subscribe(()=>{
        this.ES.getAll().subscribe((response)=>{
          this.datasource = response
          })
      })
    })
  }
  open1(id:string):void{ //edit
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {id};

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      if (data){
        this.ES.update(data,id).subscribe(()=>{
          this.ES.getAll().subscribe((response)=>{
            this.datasource = response
            })
        })
      }
      else{
        this.ES.getAll().subscribe((response)=>{
          this.datasource = response
          })
      }

    })
  }
  delete(id:string):void{
    this.ES.delete(id).subscribe(()=>{
      this.ES.getAll().subscribe((response)=>{
        this.datasource = response
      })
    })
  }


  
}
