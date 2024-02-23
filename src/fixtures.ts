import { Maison } from "./classes/maison.ts";
import { Appartement } from "./classes/appartement.ts";
import { Garage } from "./classes/garage.ts";
import { Credentials } from "./types.ts";
export const credentials: Credentials = {
  identifiant: "admin",
  password: "admin",
};

const maison = new Maison({
  ville: "super maison",
  pays: "France",
  prestataire: "Particulier",
  duree: "4-8 mai",
  prix: 350,
  photoUrl: "super url",
  etages: 3,
  jardin: true,
  garage: true,
  type: "maison",
});

// console.log(maison);

const appartement = new Appartement({
  ville: " super appartement",
  pays: "France",
  prestataire: "Professionnel",
  duree: "10 mai - 20 mai",
  prix: 250,
  photoUrl: " super url",
  etage: 3,
  balcon: false,
  ascenseur: true,
  type: "appartement",
});

// console.log(appartement);

const garage = new Garage({
  ville: "Paris",
  pays: "France",
  prestataire: "Professionnel",
  duree: "1 juil. 1 sept.",
  prix: 70,
  photoUrl: "super url",
  places: 1,
  outils: true,
  ouverture: "code",
  type: "garage",
});

// console.log(garage);

export const fakeAnnoncesMaisons = [
  {
    ville: "Valletot",
    pays: "France",
    prestataire: "Particulier",
    duree: "6-13 juil.",
    prix: 270,
    photoUrl: "/public/assets/images/valletot.webp",
    etages: 2,
    jardin: true,
    garage: false,
    type: "maison",
  },
  {
    ville: "L'etang-la-ville",
    pays: "France",
    prestataire: "Particulier",
    duree: "1-8 juil.",
    prix: 621,
    photoUrl: "/public/assets/images/etang.webp",
    etages: 3,
    jardin: true,
    garage: true,
    type: "maison",
  },
  {
    ville: "Champcueil",
    pays: "France",
    prestataire: "Professionnel",
    duree: "1-6 mars",
    prix: 1400,
    photoUrl: "/public/assets/images/champcueil.webp",
    etages: 2,
    jardin: true,
    garage: true,
    type: "maison",
  },
  {
    ville: "Lavilletertre",
    pays: "France",
    prestataire: "Professionnel",
    duree: "3-8 mars",
    prix: 289,
    photoUrl: "/public/assets/images/lavilletertre.webp",
    etages: 1,
    jardin: true,
    garage: false,
    type: "maison",
  },
];
