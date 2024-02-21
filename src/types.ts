export interface BienImmobilierInterface {
  titre: string;
  prestataire: string;
  duree: string;
  prix: number;
  photoUrl: string;
}

export interface MaisonInterface extends BienImmobilierInterface {
  etages: number;
  jardin: boolean;
  garage: boolean;
}

export interface AppartementInterface extends BienImmobilierInterface {
  etage: number;
  balcon: boolean;
  ascenseur: boolean;
}
