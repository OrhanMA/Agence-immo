import { Bien, Prix } from "./types.ts";
import { Maison } from "./classes/maison.ts";
import { Appartement } from "./classes/appartement.ts";
import { Garage } from "./classes/garage.ts";
import { credentials } from "./fixtures.ts";
import * as storageHelper from "./storage/helper.ts";
import * as listingHelper from "./listing/helper.ts";
import * as domHelper from "./dom/helper.ts";
import * as connexionHelper from "./connexion/helper.ts";
export let authenticated = false;
const createContainer = document.querySelector(".create-container");
export const createForms = createContainer?.querySelectorAll("form");

window.onload = () => {
  // au chargement de la page, injecte les annoncs et affiche la div homePage
  domHelper.injectListing(listingHelper.getAllListings());
  domHelper.navigateSection("home");
};
export const typeSelect = document.querySelector(
  "#typeSelect"
) as HTMLSelectElement;
domHelper.showSelectedForm(typeSelect?.value);

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
// cache le menu mobile de base
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
const credentialsPopupDiv = document.querySelector(
  ".credentialsPopup"
) as HTMLDivElement;
// cache la popup de connexion au chargement de la page
credentialsPopupDiv.style.display = "none";
const retryLoginButton = credentialsPopupDiv.querySelector(
  ".retryLoginButton"
) as HTMLButtonElement;
const deletePopup = document.querySelector(".delete-popup") as HTMLDivElement;
// cache la popup de suppresion au chargement de la page
deletePopup.style.display = "none";
// cache la la dialog pour les filters en taille mobile au chargement de la page
filtersDialog.style.display = "none";

mobileMenuButton?.addEventListener("click", () => {
  domHelper.handleMobileMenu();
});

typeSelect.addEventListener("change", () => {
  domHelper.handleTypeChange();
});

buttonsToHome.forEach((button) => {
  domHelper.navigateToSectionOnClick(button, "home");
});
buttonsToCreate.forEach((button) => {
  domHelper.navigateToSectionOnClick(button, "create");
});
buttonToConnexion.forEach((button) => {
  domHelper.navigateToSectionOnClick(button, "connection");
});
mobileFilterTrigger.addEventListener("click", () => {
  domHelper.toggleFilterDialog(filtersDialog);
});

priceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const priceFilter = button.textContent?.toLowerCase() as Prix;
    if (priceFilter) filtreMobilePrix = priceFilter;
    domHelper.injectListing(
      listingHelper.getListingByFilter(filtreMobileType, filtreMobilePrix)
    );
    domHelper.updateCategoryStyle();
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
    const filteredListing = listingHelper.getListingByFilter(
      filtreMobileType,
      filtreMobilePrix
    );
    domHelper.injectListing(filteredListing);
    domHelper.updateCategoryStyle();
    domHelper.navigateSection("home");
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

    const filteredListing = listingHelper.getListingByFilter(
      filtreMobileType,
      filtreMobilePrix
    );
    domHelper.injectListing(filteredListing);
    filtersDialog.style.display = "none";
  });
});

connexionForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const clientCredentials = connexionHelper.getClientCredentials(connexionForm);
  const authResponse = connexionHelper.handleConnexionSubmission(
    clientCredentials,
    credentials
  );
  if (authResponse === true) {
    authenticated = true;
    domHelper.navigateSection("admin");
  } else {
    connexionHelper.handleLoginError(
      credentialsPopupDiv,
      retryLoginButton,
      domHelper,
      connexionForm
    );
  }
  connexionForm.reset();
});

garageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(garageForm);
  const { ville, pays, prestataire, duree, prix } =
    listingHelper.getCommonFields(formData);

  const places = formData.get("places");
  const outils = formData.get("outils") === "on";
  const ouverture = formData.get("ouverture")?.toString();

  const newGarage = new Garage({
    ...{ ville, pays, prestataire, duree, prix },
    photoUrl: "",
    places: places ? Number(places) : 1,
    outils,
    ouverture:
      ouverture === "code" || ouverture === "clef" ? ouverture : "code",
    type: "garage",
  });

  storageHelper.handlePhotoAndSave("garagePhoto", newGarage, "garages");
  garageForm.reset();
});

appartementForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(appartementForm);
  const { ville, pays, prestataire, duree, prix } =
    listingHelper.getCommonFields(formData);

  const etage = formData.get("etage");
  const balcon = formData.get("balcon") === "on";
  const ascenseur = formData.get("ascenseur") === "on";

  const newAppartement = new Appartement({
    ...{ ville, pays, prestataire, duree, prix },
    photoUrl: "",
    etage: etage ? Number(etage) : 1,
    balcon,
    ascenseur,
    type: "appartement",
  });

  storageHelper.handlePhotoAndSave(
    "appartementPhoto",
    newAppartement,
    "appartements"
  );
  appartementForm.reset();
});

maisonForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(maisonForm);
  const { ville, pays, prestataire, duree, prix } =
    listingHelper.getCommonFields(formData);

  const etages = formData.get("etages");
  const jardin = formData.get("jardin") === "on";
  const garage = formData.get("garage") === "on";

  const newMaison = new Maison({
    ...{ ville, pays, prestataire, duree, prix },
    photoUrl: "",
    etages: etages ? Number(etages) : 1,
    jardin,
    garage,
    type: "maison",
  });

  storageHelper.handlePhotoAndSave("maisonPhoto", newMaison, "maisons");
  maisonForm.reset();
});
