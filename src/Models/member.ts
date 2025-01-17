export interface Member
{
    id:number,
    cin:string,
    nom: string,
    prenom: string,
    type:string,
    cv: string,
    dateNaissance:string
    email:string,
    password:string,
    photo :string,
    dateInscription:Date,
    diplome:string
    encadrant:Member,
    grade:string,
    etablissement:string
}
