import { BienImmobilier } from "./immobilier";
import { AppartementInterface } from "../types";

export class Appartement extends BienImmobilier {
  #etage;
  #balcon;
  #ascenseur;

  constructor({
    titre,
    prestataire,
    duree,
    prix,
    photoUrl,
    etage,
    balcon,
    ascenseur,
  }: AppartementInterface) {
    super({ titre, prestataire, duree, prix, photoUrl });
    this.#etage = etage;
    this.#balcon = balcon;
    this.#ascenseur = ascenseur;
  }

  get etage() {
    return this.#etage;
  }

  set etage(etage: number) {
    this.#etage = etage;
  }

  get balcon() {
    return this.#balcon;
  }

  set balcon(balcon: boolean) {
    this.#balcon = balcon;
  }

  get ascenseur() {
    return this.#ascenseur;
  }

  set ascenseur(ascenseur: boolean) {
    this.#ascenseur = ascenseur;
  }
}
