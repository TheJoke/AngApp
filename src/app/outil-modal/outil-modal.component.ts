import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Outils } from 'src/Models/outils';
import { OutilsService } from 'src/Services/outils.service';

@Component({
  selector: 'app-outil-modal',
  templateUrl: './outil-modal.component.html',
  styleUrls: ['./outil-modal.component.css']
})
export class OutilModalComponent {
  id!:string;
  
    constructor(public dialogRef: MatDialogRef<OutilModalComponent>, @Inject(MAT_DIALOG_DATA) data:any,private OS:OutilsService){
      this.id = data.id;
      console.log(this.id)
      if(!!this.id){
        this.OS.getOutilById(this.id).subscribe((outil)=>{
          this.initForm1(outil)
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
          date : new FormControl(null,[Validators.required]),
          source : new FormControl(null,[Validators.required]),

        })
      }
  
  initForm1(outil:Outils):void{
      this.form = new FormGroup({
        date : new FormControl(outil.date,[Validators.required]),
        source: new FormControl(outil.source,[Validators.required]),
        
      })
    }
  
      
      save() {
        this.dialogRef.close(this.form.value);
      }
      close() {
          this.dialogRef.close();
      }
}
