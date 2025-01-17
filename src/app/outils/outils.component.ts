import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Outils } from 'src/Models/outils';
import { OutilsService } from 'src/Services/outils.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { OutilModalComponent } from '../outil-modal/outil-modal.component';
import { AuthService } from 'src/Services/AuthService';

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.css']
})
export class OutilsComponent implements OnInit{
  dataSource : Outils[]= [];
  displayColumns: string[] = []
  isLoggedIn: boolean = false

  constructor(private OS :OutilsService, private dialog:MatDialog,private auth:AuthService){}
  ngOnInit(): void {
    this.OS.getAllOutils().subscribe((response)=>{
      if(this.isLoggedIn){
        this.displayColumns = ["id","date","source","crud"] ; 
      }
      else{
        this.displayColumns = ["id","date","source"];
      }
      this.dataSource = response;
    })
    this.auth.authStatusListener();
    this.isLoggedIn = this.auth.getLoginStatus();
  }

  delete(id:string): void{
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe((response)=>{
      if (response){
        this.OS.deleteOutil(id).subscribe(()=>{
          this.OS.getAllOutils().subscribe((response)=>{
            this.dataSource = response;
          })
        })
      }
    })
  }
  open():void{
      const dialogRef = this.dialog.open(OutilModalComponent,{
        data:{ name: 'austin' },
      });
      dialogRef.afterClosed().subscribe((result)=>{
        this.OS.addOutil(result).subscribe(()=>{
          this.OS.getAllOutils().subscribe((data)=>{
            this.dataSource = data;
          })
        })
      })
    }

  open1(id:string):void{ //edit
        const dialogConfig = new MatDialogConfig();
    
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
    
        dialogConfig.data = {id};
    
        const dialogRef = this.dialog.open(OutilModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data)=>{
          if (data){
            this.OS.updateOutil(id,data).subscribe(()=>{
              this.OS.getAllOutils().subscribe((response)=>{
                this.dataSource = response
                })
            })
          }
          else{
            this.OS.getAllOutils().subscribe((response)=>{
              this.dataSource = response
              })
          }
    
        })
      }
      isLogged(): boolean {
        return this.isLoggedIn;
      }
}
