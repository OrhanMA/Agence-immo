import { BienImmobilierInterface } from "../types";

export class BienImmobilier {
  #titre;
  #prestataire;
  #duree;
  #prix;
  #photoUrl;

  constructor({
    titre,
    prestataire,
    duree,
    prix,
    photoUrl,
  }: BienImmobilierInterface) {
    this.#titre = titre;
    this.#prestataire = prestataire;
    this.#duree = duree;
    this.#prix = prix;
    this.#photoUrl = photoUrl;
  }

  get prestataire(): string {
    return this.#prestataire;
  }

  set prestataire(prestataire: string) {
    this.#prestataire = prestataire;
  }

  get titre(): string {
    return this.#titre;
  }

  set titre(titre: string) {
    this.#titre = titre;
  }

  get duree(): string {
    return this.#duree;
  }

  set duree(duree: string) {
    this.#duree = duree;
  }

  get prix(): number {
    return this.#prix;
  }

  set prix(duree: number) {
    this.#prix = duree;
  }

  get photoUrl(): string {
    return this.#photoUrl;
  }

  set photoUrl(duree: string) {
    this.#photoUrl = duree;
  }
}
