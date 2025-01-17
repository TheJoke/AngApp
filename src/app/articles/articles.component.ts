import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Article } from 'src/Models/article';
import { ArticleService } from 'src/Services/article.service';
import { ModalComponent } from '../modal/modal.component';
import { ArticleModalComponent } from '../article-modal/article-modal.component';
import { AuthService } from 'src/Services/AuthService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  datasource : Article[] = [];
  displayedColumns: string[] = []
  isLoggedIn: boolean = false

  constructor(private AS:ArticleService,private dialog:MatDialog,private auth:AuthService){}
  ngOnInit(): void {
      this.AS.getAllArticles().subscribe((data) => {
        if(this.isLoggedIn){
          this.displayedColumns = ['id', 'titre', 'type', 'lien','date','sourcePdf','crud'] ; 
        }
        else{
          this.displayedColumns = ['id', 'titre', 'type', 'lien','date','sourcePdf'];
        }
        this.datasource = data;
      })
      this.auth.authStatusListener();
      this.isLoggedIn = this.auth.getLoginStatus();
  }
  open():void{
    const dialogRef = this.dialog.open(ArticleModalComponent,{
      data:{ name: 'austin' },

    });
    dialogRef.afterClosed().subscribe((result)=>{
      this.AS.addArticle(result).subscribe(()=>{
        this.AS.getAllArticles().subscribe((data)=>{
          this.datasource = data;
        })
      })
    })
  }
  open1(id:string):void{ //edit
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
  
      dialogConfig.data = {id};
  
      const dialogRef = this.dialog.open(ArticleModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data)=>{
        if (data){
          this.AS.updateArticle(data,id).subscribe(()=>{
            this.AS.getAllArticles().subscribe((response)=>{
              this.datasource = response
              })
          })
        }
        else{
          this.AS.getAllArticles().subscribe((response)=>{
            this.datasource = response
            })
        }
  
      })
    }
    delete(id:string):void{
      this.AS.deleteArticle(id).subscribe(()=>{
        this.AS.getAllArticles().subscribe((data)=>{
          this.datasource = data;
        })
      })
    }
    isLogged(): boolean {
      return this.isLoggedIn;
    }
}
