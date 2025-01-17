import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { deleteApp } from 'firebase/app';
import { Outils } from 'src/Models/outils';
import { OutilsService } from 'src/Services/outils.service';

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.css']
})
export class OutilFormComponent implements OnInit{
  form! :FormGroup;
  constructor(private OS:OutilsService,private router:Router,private route:ActivatedRoute) { };

  ngOnInit(): void {
    const idCourant = this.route.snapshot.params["id"];
    if (!!idCourant){
      this.OS.getOutilById(idCourant).subscribe((response)=>{
        this.form =new FormGroup({
          id : new FormControl(idCourant),
          date : new FormControl(response.date),
          source : new FormControl(response.source)
          })
      })
    }
    else{
      this.initForm();
    }
  }
  initForm():void{
    this.form = new FormGroup({
      id: new FormControl(null,[Validators.required]),
      source: new FormControl(null,[Validators.required])
    })
  }
  submit():void{
    const x: Outils = {...this.form.value,date:new Date().toISOString()};
    const idCourant = this.route.snapshot.params["id"]
    if (!!idCourant){
      this.OS.updateOutil(idCourant,x).subscribe(()=>{
        this.router.navigate(['/outils']);
      })
    }
    else{
      this.OS.addOutil(x).subscribe(()=>{
        this.router.navigate(['/outils']);
      })
    }
  }
}
