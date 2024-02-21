import { BienImmobilier } from "./immobilier";
import { AppartementInterface } from "../types";

export class Appartement extends BienImmobilier {
  #etage;
  #balcon;
  #ascenseur;
  #type = "appartement";

  constructor({
    ville,
    pays,
    prestataire,
    duree,
    prix,
    photoUrl,
    etage,
    balcon,
    ascenseur,
  }: AppartementInterface) {
    super({
      ville,
      pays,
      prestataire,
      duree,
      prix,
      photoUrl,
    });
    this.#etage = etage;
    this.#balcon = balcon;
    this.#ascenseur = ascenseur;
  }

  get type() {
    return this.#type;
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
