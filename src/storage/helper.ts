// import {
//   MaisonInterface,
//   AppartementInterface,
//   GarageInterface,
// } from "../types";
import { Maison } from "../classes/maison";
import { Appartement } from "../classes/appartement";
import { Garage } from "../classes/garage";
import { navigateSection } from "../dom/helper";

export function saveObjectToLocalStorage(
  localStorageItemName: string,
  newDataObject: Maison | Appartement | Garage
) {
  console.log(newDataObject.pays);

  let array: any[] = JSON.parse(
    localStorage.getItem(localStorageItemName) || "[]"
  );

  array.push(newDataObject.toJSON());
  console.log(array);

  localStorage.setItem(localStorageItemName, JSON.stringify(array));

  navigateSection("home");
  window.location.reload();
}
