import { Maison } from "./classes/maison.ts";
import { Appartement } from "./classes/appartement.ts";
import { BienImmobilier } from "./classes/immobilier.ts";

const bien = new BienImmobilier({
  titre: "super bien",
  prestataire: "Professionnel",
  duree: "1-5 janvier",
  prix: 100,
  photoUrl: "lien",
});

// console.log(bien);

const maison = new Maison({
  titre: "super maison",
  prestataire: "Particulier",
  duree: "4-8 mai",
  prix: 350,
  photoUrl: "super url",
  etages: 3,
  jardin: true,
  garage: true,
});

// console.log(maison);

const appartement = new Appartement({
  titre: " super appartement",
  prestataire: "Professionnel",
  duree: "10 mai - 20 mai",
  prix: 250,
  photoUrl: " super url",
  etage: 3,
  balcon: false,
  ascenseur: true,
});

// console.log(appartement);
