import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/Models/member';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  isEtudiant = false;
  isEnseignant = false;
  currentId: string | null = null;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.currentId = this.activatedRoute.snapshot.params['id'];
    console.log(this.currentId);

    if (this.currentId) {
      this.loadMemberData();
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cv: new FormControl(''),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      
      dateNaissance: new FormControl('', [Validators.required]),
      photo: new FormControl(''),
      diplome: new FormControl(''),
      grade: new FormControl(''),
      etablissement: new FormControl('')
    });

    // Écouter les changements du champ type
    this.form.get('type')?.valueChanges.subscribe(value => {
      this.updateMemberType(value);
    });
  }

  private loadMemberData(): void {
    this.memberService.getMemberById(this.currentId!).subscribe({
      next: (member) => {
        if (!member) {
          console.warn('Member data is empty or null');
          return;
        }
  
        // Mettez à jour d'abord le champ `type` pour déclencher les validateurs appropriés
        this.form.get('type')?.setValue(member.type);
        this.updateMemberType(member.type);
  
        // Mettez à jour les autres champs du formulaire
        this.form.patchValue({
          cin: member.cin,
          nom: member.nom,
          prenom: member.prenom,
          email: member.email,
          dateNaissance: member.dateNaissance,
          diplome: member.diplome || '',
          grade: member.grade || '',
          etablissement: member.etablissement || '',
        });
  
        // Gestion des fichiers : CV et photo
        if (member.cv) {
          this.form.patchValue({ cv: member.cv }); // Si c'est une URL, vous pouvez le gérer comme une chaîne
        }
        if (member.photo) {
          this.form.patchValue({ photo: member.photo }); // Idem pour les photos
        }
      },
      error: (error) => {
        console.error('Error loading member:', error);
      },
    });
  }
  
  

  private updateMemberType(type: string): void {
    this.isEtudiant = type === 'etd';
    this.isEnseignant = type === 'ens';

    // Mise à jour des validateurs selon le type
    if (this.isEtudiant) {
      this.form.get('diplome')?.setValidators([Validators.required]);
      this.form.get('encadrant')?.setValidators([Validators.required]);
      this.form.get('grade')?.clearValidators();
    } else if (this.isEnseignant) {
      this.form.get('grade')?.setValidators([Validators.required]);
      this.form.get('diplome')?.clearValidators();
      this.form.get('encadrant')?.clearValidators();
    }

    // Mise à jour de l'état des validateurs
    this.form.get('diplome')?.updateValueAndValidity();
    this.form.get('encadrant')?.updateValueAndValidity();
    this.form.get('grade')?.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const memberData: Member = {
      ...this.form.value,
      createdDate: new Date().toISOString()
    };

    const request$ = this.currentId
      ? this.updateMember(memberData)
      : this.addMember(memberData);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/member']);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
      }
    });
  }

  private updateMember(member: Member) {
    return this.isEtudiant
      ? this.memberService.updateEtudiant(member, this.currentId!)
      : this.memberService.updateEnseignant(member, this.currentId!);
  }

  private addMember(member: Member) {
    return this.isEtudiant
      ? this.memberService.addEtudiant(member)
      : this.memberService.addEnseignant(member);
  }
  onFileChange(event: Event, type: 'cv' | 'photo'): void {
    const element = event.target as HTMLInputElement;
    const file: File | null = element.files ? element.files[0] : null;
    
    if (file) {
      // Mettre à jour le contrôle du formulaire
      this.form.patchValue({
        [type]: file
      });
  
      // Marquer le champ comme touché
      this.form.get(type)?.markAsTouched();
    }
  }
}