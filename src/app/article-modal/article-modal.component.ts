import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Article } from 'src/Models/article';
import { ArticleService } from 'src/Services/article.service';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.css']
})
export class ArticleModalComponent implements OnInit {
  id!:string;

  constructor(public dialogRef: MatDialogRef<ArticleModalComponent>, @Inject(MAT_DIALOG_DATA) data:any,private AS:ArticleService){
    this.id = data.id;
    console.log(this.id)
    if(!!this.id){
      this.AS.getArticleById(this.id).subscribe((article)=>{
        this.initForm1(article)
      })
    }
    else {
      this.initForm()
    }
  }
  form!:FormGroup

  ngOnInit(): void {
      this.initForm();
  }
  initForm():void{
      this.form = new FormGroup({
        titre : new FormControl(null,[Validators.required]),
        type : new FormControl(null,[Validators.required]),
        lien: new FormControl(null,[]),
        date : new FormControl(null,[Validators.required]),
        sourcePdf : new FormControl(null,[Validators.required]),
        
      })
    }

initForm1(article:Article):void{
    this.form = new FormGroup({
      titre : new FormControl(article.titre,[Validators.required]),
      type : new FormControl(article.type,[Validators.required]),
      lien: new FormControl(article.lien,[]),
      date : new FormControl(article.date,[Validators.required]),
      sourcePdf: new FormControl(article.sourcePdf,[Validators.required]),
      
    })
  }

    
    save() {
      this.dialogRef.close(this.form.value);
    }
    close() {
        this.dialogRef.close();
    }
  
}
