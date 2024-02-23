import {
  MaisonInterface,
  AppartementInterface,
  GarageInterface,
} from "../types";
import { navigateSection } from "../dom/helper";

export function saveObjectToLocalStorage(
  localStorageItemName: string,
  newData: MaisonInterface | AppartementInterface | GarageInterface
) {
  let array: any[] = JSON.parse(
    localStorage.getItem(localStorageItemName) || "[]"
  );

  array.push(newData);

  localStorage.setItem(localStorageItemName, JSON.stringify(array));

  navigateSection("home");
  window.location.reload();
}
