import { findListing, getAllListings, deleteListing } from "../listing/helper";
import {
  createForms,
  authenticated,
  mobileNavList,
  typeSelect,
  filtreMobileType,
} from "../main";
import {
  AppartementInterface,
  GarageInterface,
  BienImmobilierInterface,
  MaisonInterface,
  TousBiens,
} from "../types";
export function handleMobileMenu() {
  if (mobileNavList.style.display === "none") {
    mobileNavList.style.display = "flex";
  } else {
    mobileNavList.style.display = "none";
  }
}

export function handleTypeChange() {
  showSelectedForm(typeSelect.value);
}

export function injectListing<T extends BienImmobilierInterface>(
  listings: T[]
) {
  const annonceContainer = document.querySelector(".annonces");
  if (annonceContainer) annonceContainer.innerHTML = "";

  if (listings.length === 0 && annonceContainer) {
    annonceContainer.innerHTML += `
    <p>Aucune annonce pour le moment</p>
    <button class="button-eerie">Ajouter une annonce</button>
    `;
    const button = annonceContainer.querySelector(
      "button"
    ) as HTMLButtonElement;
    button.addEventListener("click", (e) => {
      e.preventDefault();
      navigateSection("create");
    });
  }

  listings.forEach((annonce: any) => {
    const annonceCard = document.createElement("div");
    annonceCard.classList.add("annonce-card");
    const detailsContainer = document.createElement("div");

    detailsContainer.innerHTML = `
      <p>${annonce.ville}, ${annonce.pays}</p>
      <p class="secondary-fields">${annonce.type} - ${annonce.prestataire}</p>
      <p>${annonce.duree}</p>
      <p><span class="bold">${annonce.prix}€</span> par jour</p>
    `;
    const image = document.createElement("img");
    image.draggable = false;
    if (annonce.photoUrl !== "") {
      image.src = annonce.photoUrl;
      image.alt = annonce.ville + " annonce image";
    } else {
      image.src = "/assets/images/not-found.jpg";
      image.alt = "image not found picture";
    }
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("annonce-card-details");

    if ("etages" in annonce) {
      const maison = annonce as unknown as MaisonInterface;
      detailsDiv.innerHTML = `
      <p class="secondary-fields">étages: ${maison.etages}</p>
      <p class="secondary-fields">jardin: ${maison.jardin ? "oui" : "non"}</p>
      <p class="secondary-fields">garage: ${maison.garage ? "oui" : "non"}</p>
      `;
    } else if ("etage" in annonce) {
      const appartement = annonce as unknown as AppartementInterface;
      detailsDiv.innerHTML += `
      <p class="secondary-fields">n°étage: ${appartement.etage}</p>
      <p class="secondary-fields">balcon: ${
        appartement.balcon ? "oui" : "non"
      }</p>
      <p class="secondary-fields">ascenseur: ${
        appartement.ascenseur ? "oui" : "non"
      }</p>
      `;
    } else if ("places" in annonce) {
      const garage = annonce as unknown as GarageInterface;
      detailsDiv.innerHTML += `
      <p class="secondary-fields">places: ${garage.places}</p>
      <p class="secondary-fields">outils: ${garage.outils ? "oui" : "non"}</p>
      <p class="secondary-fields">ouverture: ${garage.ouverture}</p>
      `;
    }

    annonceCard.appendChild(image);
    annonceCard.appendChild(detailsContainer);
    detailsContainer.appendChild(detailsDiv);
    if (annonceContainer) annonceContainer.appendChild(annonceCard);
  });
}

export function navigateSection(section: string) {
  if (section === "connection" && authenticated === true) {
    navigateSection("admin");
    return;
  }
  document.querySelectorAll(".page").forEach((page: any) => {
    page.style.display = "none";
  });

  // après que la connexion soit validée, injection et redirection vers admin
  if (section === "admin") {
    handleAdminNavigation();
  }
  const pageId = section + "Page";
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = "block";
  }
}

function injectAdminContent(
  listings: TousBiens[],
  annoncesDiv: HTMLDivElement
) {
  const targetDiv = annoncesDiv;
  listings.forEach((listing) => {
    const div = document.createElement("div");
    div.classList.add("admin-annonce-card");
    const commonInfoCard = createAnnonceCard(listing);
    div.appendChild(commonInfoCard);
    targetDiv.appendChild(div);
  });
}

function handleAdminNavigation() {
  const listings = getAllListings();
  const adminAnnoncesContainer = document.querySelector(
    ".admin-annonces-container"
  ) as HTMLDivElement;
  adminAnnoncesContainer.innerHTML = "";
  injectAdminContent(listings, adminAnnoncesContainer);
  const deleteButtons = document.querySelectorAll(
    ".delete-button"
  ) as NodeListOf<HTMLButtonElement>;

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const deletePopup = document.querySelector(
        ".delete-popup"
      ) as HTMLDivElement;
      deletePopup.style.display = "flex";
      const confirmDeletionButton = document.querySelector(
        ".confirmDeletionButton"
      ) as HTMLButtonElement;
      const annulationButton = document.querySelector(
        ".annulationButton"
      ) as HTMLButtonElement;
      confirmDeletionButton.addEventListener("click", () => {
        deletePopup.style.display = "none";
        const stringifiedListing = button.dataset.object as string;
        const foundListing = findListing(stringifiedListing);
        if (foundListing !== null) {
          deleteListing(foundListing);
          if (adminAnnoncesContainer) adminAnnoncesContainer.innerHTML = "";
          navigateSection("admin");
        }
      });
      annulationButton.addEventListener("click", () => {
        deletePopup.style.display = "none";
        navigateSection("admin");
      });
    });
  });
}

function createAnnonceCard(listing: TousBiens) {
  const div = document.createElement("div");
  div.innerHTML = `
  <img class="admin-annonce-card-image" src="${
    listing.photoUrl !== "" ? listing.photoUrl : "/assets/images/not-found.jpg"
  }" />
  <p class="admin-annonce-card-location">${listing.ville}, ${listing.pays}</p>
  <p class="admin-annonce-card-type secondary-fields">${listing.type} - ${
    listing.prestataire
  }</p>
  <p class="admin-annonce-card-duree">${listing.duree}</p>
  <p class="admin-annonce-card-prix">${listing.prix}€ par jour</p>
  <div class="admin-annonce-card-buttons-container">
    <button class="edit-button button-eerie">modifier</button>
    <button class="delete-button button-pink">supprimer</button>
  </div>
  `;
  const editButton = div.querySelector(".edit-button") as HTMLButtonElement;
  const deleteButton = div.querySelector(".delete-button") as HTMLButtonElement;
  deleteButton.dataset.object = JSON.stringify(listing);
  editButton.addEventListener("click", () => {
    navigateSection("edit");
  });

  return div;
}

export function showSelectedForm(type: string) {
  const selectedForm = document.querySelector(`#${type}Form`);
  createForms?.forEach((form) => {
    if (form === selectedForm) {
      form.style.display = "flex";
    } else {
      form.style.display = "none";
    }
  });
}

export function updateCategoryStyle() {
  const buttons = document.querySelectorAll(
    ".mainNav button"
  ) as NodeListOf<HTMLButtonElement>;
  if (buttons) {
    buttons.forEach((button) => {
      if (button.textContent) {
        if (button.textContent.toLowerCase() === filtreMobileType) {
          button.style.color = "var(--pink)";
          button.style.fontWeight = "500";
        } else {
          if (button.textContent.toLowerCase() === "tous") {
            button.style.fontWeight = "500";
          }
          button.style.color = "black";
          button.style.fontWeight = "300";
        }
      }
    });
  }
}

export function toggleFilterDialog(filtersDialog: HTMLDivElement) {
  if (filtersDialog) {
    if (filtersDialog.style.display === "none") {
      filtersDialog.style.display = "flex";
    } else {
      filtersDialog.style.display = "none";
    }
  }
}

export function navigateToSectionOnClick(button: Element, section: string) {
  button.addEventListener("click", () => {
    navigateSection(section);
    if (mobileNavList.style.display != "none") handleMobileMenu();
  });
}
