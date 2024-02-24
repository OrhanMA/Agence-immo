import { BienImmobilierInterface } from "../types";

export class BienImmobilier {
  #ville;
  #pays;
  #prestataire;
  #duree;
  #prix;
  #photoUrl;

  constructor({
    ville,
    pays,
    prestataire,
    duree,
    prix,
    photoUrl,
  }: BienImmobilierInterface) {
    this.#ville = ville;
    this.#pays = pays;
    this.#prestataire = prestataire;
    this.#duree = duree;
    this.#prix = prix;
    this.#photoUrl = photoUrl;
  }
  toJSON() {
    return {
      ville: this.#ville,
      pays: this.#pays,
      prestataire: this.#prestataire,
      duree: this.#duree,
      prix: this.#prix,
      photoUrl: this.#photoUrl,
    };
  }
  get pays(): string {
    return this.#pays;
  }

  set pays(pays: string) {
    this.#pays = pays;
  }

  get prestataire(): string {
    return this.#prestataire;
  }

  set prestataire(prestataire: string) {
    this.#prestataire = prestataire;
  }

  get ville(): string {
    return this.#ville;
  }

  set ville(ville: string) {
    this.#ville = ville;
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
