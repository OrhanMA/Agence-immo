import { Maison } from "../classes/maison";
import { Appartement } from "../classes/appartement";
import { Garage } from "../classes/garage";
import { navigateSection } from "../dom/helper";

function saveObjectToLocalStorage(
  localStorageItemName: string,
  newDataObject: Maison | Appartement | Garage
) {
  let array: any[] = JSON.parse(
    localStorage.getItem(localStorageItemName) || "[]"
  );
  array.push(newDataObject.toJSON());
  localStorage.setItem(localStorageItemName, JSON.stringify(array));
  navigateSection("home");
  window.location.reload();
}

export function handlePhotoAndSave(
  photoInputID: string,
  classeInstance: Maison | Garage | Appartement,
  localStorageArrayName: string
) {
  const photoInput = document.getElementById(photoInputID) as HTMLInputElement;
  let file;
  let photoUrl: string | null = null;
  if (photoInput.files) {
    file = photoInput.files[0];
  }
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        photoUrl = event.target.result as string;
        classeInstance.photoUrl = photoUrl;
      }
      saveObjectToLocalStorage(localStorageArrayName, classeInstance);
    };

    reader.readAsDataURL(file);
  } else {
    saveObjectToLocalStorage(localStorageArrayName, classeInstance);
  }
}
