import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/Services/event.service';
import { Event } from 'src/Models/evenement';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  id!:string;
  constructor(public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) data:any,private ES:EventService) { 
    this.id = data.id;
    console.log(this.id)
    if(!!this.id){
      this.ES.getEventByID(this.id).subscribe((evt)=>{
        this.initForm1(evt)
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
      dateDebut : new FormControl(null,[Validators.required]),
      dateFin: new FormControl(null,[]),
      lieu : new FormControl(null,[Validators.required]),
    })
  }
  initForm1(evt:Event):void{
    this.form = new FormGroup({
      titre : new FormControl(evt.titre,[Validators.required]),
      dateDebut : new FormControl(evt.dateDebut,[Validators.required]),
      dateFin: new FormControl(evt.dateFin,[]),
      lieu : new FormControl(evt.lieu,[Validators.required]),
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
      this.dialogRef.close();
  }

}
