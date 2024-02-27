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
    <button class="add-button">Ajouter une annonce</button>
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
      <p>${annonce.type}</p>
      <p>${annonce.prestataire}</p>
      <p>${annonce.duree}</p>
      <p><span class="bold">${annonce.prix}</span> par jour</p>
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

    if ("etages" in annonce) {
      const maison = annonce as unknown as MaisonInterface;
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("annonce-card-details");

      detailsDiv.innerHTML = `
      <div class="annonce-card-details-group">
        <img src="/assets/stairs.png" alt="stairs icon" style={width: 20px;} />
        <p class="secondary-fields">${maison.etages}</p>
      </div>
      <div class="annonce-card-details-group">
        <img src="/assets/tree.png" alt="garden icon" style={width: 20px;} />
        <p class="secondary-fields">${maison.jardin ? "✅" : "❌"}</p>
      </div>
      <div class="annonce-card-details-group">
        <img src="/assets/private-garage.png" alt="garage icon" style={width: 20px;} />
        <p class="secondary-fields">${maison.garage ? "✅" : "❌"}</p>
      </div>
      `;
      detailsContainer.appendChild(detailsDiv);
    } else if ("etage" in annonce) {
      const appartement = annonce as unknown as AppartementInterface;
      detailsContainer.innerHTML += `
      <p class="secondary-fields">N°étage: ${appartement.etage}</p>
      <p class="secondary-fields">Balcon: ${
        appartement.balcon ? "✅" : "❌"
      }</p>
      <p class="secondary-fields">Ascenseur: ${
        appartement.ascenseur ? "✅" : "❌"
      }</p>
      `;
    } else if ("places" in annonce) {
      const garage = annonce as unknown as GarageInterface;
      detailsContainer.innerHTML += `
      <p class="secondary-fields">Places: ${garage.places}</p>
      <p class="secondary-fields">Outils: ${garage.outils ? "✅" : "❌"}</p>
      <p class="secondary-fields">Ouverture: ${garage.ouverture}</p>
      `;
    }

    annonceCard.appendChild(image);
    annonceCard.appendChild(detailsContainer);
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
  <p class="admin-annonce-card-type">${listing.type}</p>
  <p class="admin-annonce-card-prestataire">${listing.prestataire}</p>
  <p class="admin-annonce-card-duree">${listing.duree}</p>
  <p class="admin-annonce-card-prix">${listing.prix}</p>
  <div class="admin-annonce-card-buttons-container">
    <button class="edit-button">modifier</button>
    <button class="delete-button">supprimer</button>
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
