export interface BienImmobilierInterface {
  ville: string;
  pays: string;
  prestataire: string;
  duree: string;
  prix: number;
  photoUrl: string;
}

export interface MaisonInterface extends BienImmobilierInterface {
  etages: number;
  jardin: boolean;
  garage: boolean;
  type: "maison";
}

export interface AppartementInterface extends BienImmobilierInterface {
  etage: number;
  balcon: boolean;
  ascenseur: boolean;
  type: "appartement";
}

export interface GarageInterface extends BienImmobilierInterface {
  places: number;
  outils: boolean;
  ouverture: "clef" | "code";
  type: "garage";
}

export type TousBiens =
  | MaisonInterface
  | AppartementInterface
  | GarageInterface;
