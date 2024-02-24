// import { fakeAnnoncesMaisons } from "./fixtures.ts";
import { Maison } from "./classes/maison.ts";
import {
  AppartementInterface,
  GarageInterface,
  MaisonInterface,
  Credentials,
  Bien,
  Prix,
} from "./types.ts";
import { Appartement } from "./classes/appartement.ts";
import { Garage } from "./classes/garage.ts";
import { getListingByFilter, getAllListings } from "./listing/helper.ts";
import {
  handleMobileMenu,
  handleTypeChange,
  injectListing,
  navigateSection,
  navigateToSectionOnClick,
  showSelectedForm,
  toggleFilterDialog,
  updateCategoryStyle,
} from "./dom/helper.ts";
import { credentials } from "./fixtures.ts";
import { saveObjectToLocalStorage } from "./storage/helper.ts";
import {
  handleConnexionSubmission,
  getClientCredentials,
} from "./connexion/helper.ts";
export let authenticated = false;
const createContainer = document.querySelector(".create-container");
export const createForms = createContainer?.querySelectorAll("form");
window.onload = () => {
  injectListing(getAllListings());
  navigateSection("home");
};
export const typeSelect = document.querySelector(
  "#typeSelect"
) as HTMLSelectElement;
showSelectedForm(typeSelect?.value);

let filtreMobilePrix: Prix = "prix -";

export let filtreMobileType: Bien = "tous";

export const mobileNavList = document.querySelector(
  ".mobileNavList"
) as HTMLUListElement;
const maisonForm = document.getElementById("maisonForm") as HTMLFormElement;
const garageForm = document.getElementById("garageForm") as HTMLFormElement;
const appartementForm = document.getElementById(
  "appartementForm"
) as HTMLFormElement;
const connexionForm = document.getElementById(
  "connexionForm"
) as HTMLFormElement;
const mobileFilterCloseButton = document.querySelector(
  ".mobile-filter-close-button"
) as HTMLButtonElement;
const mobileFilterChoiceButtons = document.querySelectorAll(
  ".mobile-filter-choice"
) as NodeListOf<HTMLButtonElement>;
const headerFiltersButtons = document.querySelectorAll(".headerFilterButton");
mobileNavList.style.display = "none";
const mobileMenuButton = document.querySelector(".mobileMenuButton");
const buttonsToHome = document.querySelectorAll(".buttonsToHome");
const buttonsToCreate = document.querySelectorAll(".buttonsToCreate");
const buttonToConnexion = document.querySelectorAll(".buttonsToConnexion");
const mobileFilterTrigger = document.querySelector(
  ".mobile-trigger"
) as HTMLButtonElement;
const filtersDialog = document.querySelector(
  ".filters-dialog"
) as HTMLDivElement;
const priceButtons = document.querySelectorAll(
  ".price-filter"
) as NodeListOf<HTMLButtonElement>;

filtersDialog.style.display = "none";

mobileMenuButton?.addEventListener("click", () => {
  handleMobileMenu();
});

typeSelect.addEventListener("change", () => {
  handleTypeChange();
});

buttonsToHome.forEach((button) => {
  navigateToSectionOnClick(button, "home");
});
buttonsToCreate.forEach((button) => {
  navigateToSectionOnClick(button, "create");
});
buttonToConnexion.forEach((button) => {
  navigateToSectionOnClick(button, "connection");
});
mobileFilterTrigger.addEventListener("click", () => {
  toggleFilterDialog(filtersDialog);
});

priceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const priceFilter = button.textContent?.toLowerCase() as Prix;
    if (priceFilter) filtreMobilePrix = priceFilter;
    injectListing(getListingByFilter(filtreMobileType, filtreMobilePrix));
    updateCategoryStyle();
  });
});

mobileFilterCloseButton.addEventListener("click", () => {
  filtersDialog.style.display = "none";
});

headerFiltersButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filtre = button.textContent?.toLowerCase();
    switch (filtre) {
      case "maisons":
        filtreMobileType = "maisons";
        break;
      case "appartements":
        filtreMobileType = "appartements";
        break;
      case "garages":
        filtreMobileType = "garages";
        break;
      default:
        filtreMobileType = "tous";
        break;
    }
    const filteredListing = getListingByFilter(
      filtreMobileType,
      filtreMobilePrix
    );
    injectListing(filteredListing);
    updateCategoryStyle();
    navigateSection("home");
  });
});
mobileFilterChoiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filtre = button.textContent?.toLowerCase();
    switch (filtre) {
      case "maisons":
        filtreMobileType = "maisons";
        break;
      case "appartements":
        filtreMobileType = "appartements";
        break;
      case "garages":
        filtreMobileType = "garages";
        break;
      case "prix -":
        filtreMobilePrix = "prix -";
        break;
      case "prix +":
        filtreMobilePrix = "prix +";
        break;
      default:
        filtreMobileType = "tous";
        break;
    }

    const filteredListing = getListingByFilter(
      filtreMobileType,
      filtreMobilePrix
    );
    injectListing(filteredListing);
    filtersDialog.style.display = "none";
  });
});

connexionForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const clientCredentials = getClientCredentials(connexionForm);
  const authResponse = handleConnexionSubmission(
    clientCredentials,
    credentials
  );
  if (authResponse === true) {
    authenticated = true;
    navigateSection("admin");
  } else {
    alert("Identifiants incorrects.");
  }
});

function getCommonFields(formData: FormData) {
  const ville = formData.get("ville")?.toString() || "";
  const pays = formData.get("pays")?.toString() || "";
  const prestataire = formData.get("prestataire")?.toString() || "";
  const duree = formData.get("duree")?.toString() || "";
  const prix = Number(formData.get("prix"));

  return { ville, pays, prestataire, duree, prix };
}

garageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(garageForm);
  const { ville, pays, prestataire, duree, prix } = getCommonFields(formData);

  const places = formData.get("places");
  const outils = formData.get("outils") === "on";
  const ouverture = formData.get("ouverture")?.toString();

  const photoInput = document.getElementById("garagePhoto") as HTMLInputElement;
  let file;
  if (photoInput.files) {
    file = photoInput.files[0];
  }

  const newGarage = new Garage({
    ...{ ville, pays, prestataire, duree, prix },
    photoUrl: "",
    places: places ? Number(places) : 1,
    outils,
    ouverture:
      ouverture === "code" || ouverture === "clef" ? ouverture : "code",
    type: "garage",
  });

  let photoUrl: string | null = null;
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        photoUrl = event.target.result as string;
        newGarage.photoUrl = photoUrl;
      }
      saveObjectToLocalStorage("garages", newGarage);
    };

    reader.readAsDataURL(file);
  } else {
    saveObjectToLocalStorage("garages", newGarage);
  }
});

appartementForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(appartementForm);
  const { ville, pays, prestataire, duree, prix } = getCommonFields(formData);

  const etage = formData.get("etage");
  const balcon = formData.get("balcon") === "on";
  const ascenseur = formData.get("ascenseur") === "on";

  const photoInput = document.getElementById(
    "appartementPhoto"
  ) as HTMLInputElement;
  let file;
  if (photoInput.files) {
    file = photoInput.files[0];
  }

  const newAppartement = new Appartement({
    ...{ ville, pays, prestataire, duree, prix },
    photoUrl: "",
    etage: etage ? Number(etage) : 1,
    balcon,
    ascenseur,
    type: "appartement",
  });

  let photoUrl: string | null = null;
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        photoUrl = event.target.result as string;
        newAppartement.photoUrl = photoUrl;
      }
      saveObjectToLocalStorage("appartements", newAppartement);
    };

    reader.readAsDataURL(file);
  } else {
    saveObjectToLocalStorage("appartements", newAppartement);
  }
});

maisonForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(maisonForm);
  const { ville, pays, prestataire, duree, prix } = getCommonFields(formData);

  const etages = formData.get("etages");
  const jardin = formData.get("jardin") === "on";
  const garage = formData.get("garage") === "on";

  const photoInput = document.getElementById("maisonPhoto") as HTMLInputElement;
  let file;
  if (photoInput.files) {
    file = photoInput.files[0];
  }

  const newMaison = new Maison({
    ...{ ville, pays, prestataire, duree, prix },
    photoUrl: "",
    etages: etages ? Number(etages) : 1,
    jardin,
    garage,
    type: "maison",
  });

  let photoUrl: string | null = null;
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        photoUrl = event.target.result as string;
        newMaison.photoUrl = photoUrl;
      }
      saveObjectToLocalStorage("maisons", newMaison);
    };

    reader.readAsDataURL(file);
  } else {
    saveObjectToLocalStorage("maisons", newMaison);
  }
});
