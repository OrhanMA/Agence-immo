import { BienImmobilier } from "./immobilier";
import { MaisonInterface } from "../types";

export class Maison extends BienImmobilier {
  #etages;
  #jardin;
  #garage;
  #type = "maison";
  constructor({
    ville,
    pays,
    prestataire,
    duree,
    prix,
    photoUrl,
    etages = 1,
    jardin,
    garage,
  }: MaisonInterface) {
    super({ ville, pays, prestataire, duree, prix, photoUrl });
    this.#etages = etages;
    this.#jardin = jardin;
    this.#garage = garage;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      etages: this.#etages,
      jardin: this.#jardin,
      garage: this.#garage,
      type: this.#type,
    };
  }

  get type() {
    return this.#type;
  }

  get etages() {
    return this.#etages;
  }

  set etages(etages: number) {
    this.#etages = etages;
  }

  get jardin() {
    return this.#jardin;
  }

  set jardin(jardin: boolean) {
    this.#jardin = jardin;
  }

  get garage() {
    return this.#garage;
  }

  set garage(garage: boolean) {
    this.#garage = garage;
  }
}
