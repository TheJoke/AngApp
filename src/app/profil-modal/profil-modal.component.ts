import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/Models/member';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-profil-modal',
  templateUrl: './profil-modal.component.html',
  styleUrls: ['./profil-modal.component.css']
})
export class ProfilModalComponent implements OnInit {
  id!: string;
  member!: Member | null; // Stocker les données du membre
  isLoading: boolean = true; // Indicateur de chargement
  errorMessage: string | null = null; // Gestion des erreurs

  constructor(
    public dialogRef: MatDialogRef<ProfilModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private memberService: MemberService
  ) {
    this.id = data.id; // Récupérer l'ID du membre
  }

  ngOnInit(): void {
    this.loadMemberData();
  }

  // Méthode pour charger les données
  private loadMemberData() {
    this.memberService.getMemberById(this.id).subscribe({
      next: (data) => {
        this.member = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des données.';
        this.isLoading = false;
      }
    });
  }

  // Méthode pour fermer la modale
  closeModal() {
    this.dialogRef.close();
  }
}
