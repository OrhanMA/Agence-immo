import { BienImmobilier } from "./immobilier";
import { GarageInterface } from "../types";
export class Garage extends BienImmobilier {
  #places;
  #outils;
  #ouverture;
  #type = "garage";
  constructor({
    ville,
    pays,
    prestataire,
    duree,
    prix,
    photoUrl,
    places,
    outils,
    ouverture,
  }: GarageInterface) {
    super({ ville, pays, prestataire, duree, prix, photoUrl });
    this.#places = places;
    this.#outils = outils;
    this.#ouverture = ouverture;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      places: this.#places,
      outils: this.#outils,
      ouverture: this.#ouverture,
      type: this.#type,
    };
  }

  get type() {
    return this.#type;
  }
  get places() {
    return this.#places;
  }

  set places(places: number) {
    this.#places = places;
  }

  get outils() {
    return this.#outils;
  }

  set outils(outils: boolean) {
    this.#outils = outils;
  }

  get ouverture() {
    return this.#ouverture;
  }

  set ouverture(ouverture: "clef" | "code") {
    this.#ouverture = ouverture;
  }
}
