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
  // console.log(listings);

  const annonceContainer = document.querySelector(".annonces");
  if (annonceContainer) annonceContainer.innerHTML = "";

  if (listings.length === 0) {
    // console.log("aucune annonce pour le moment");
    const paragraph = document.createElement("p");
    paragraph.textContent = "Aucun annonce pour le moment";
    const button = document.createElement("button");
    button.textContent = "ajouter une annonce";
    button.style.padding = "0.3rem 0.5rem";
    button.style.backgroundColor = "var(--eerie-black)";
    button.style.color = "var(--ghost-gray)";
    button.style.borderRadius = "5px";
    button.style.border = "none";
    button.addEventListener("click", (e) => {
      e.preventDefault();
      navigateSection("create");
    });
    annonceContainer?.appendChild(paragraph);
    annonceContainer?.appendChild(button);
    return;
  }

  // console.log(annonceContainer);
  listings.forEach((annonce: any) => {
    // console.log(annonce);

    const annonceCard = document.createElement("div");
    annonceCard.classList.add("annonce-card");

    const image = document.createElement("img");
    image.draggable = false;
    if (annonce.photoUrl !== "") {
      image.src = annonce.photoUrl;
      image.alt = annonce.ville + "annonce image";
    } else {
      image.src = "/assets/images/not-found.jpg";
      image.alt = "image not found picture";
    }

    const detailsContainer = document.createElement("div");

    const location = document.createElement("p");
    location.textContent = `${annonce.ville}, ${annonce.pays}`;
    const type = document.createElement("p");
    type.textContent = annonce.type;
    const prestataire = document.createElement("p");
    prestataire.textContent = annonce.prestataire;
    const dates = document.createElement("p");
    dates.textContent = annonce.duree;
    const price = document.createElement("p");
    const bold = document.createElement("span");
    bold.classList.add("bold");
    bold.textContent = `${annonce.prix}€`;
    price.appendChild(bold);
    price.innerHTML += " par jour";

    detailsContainer.appendChild(location);
    detailsContainer.appendChild(type);
    detailsContainer.appendChild(prestataire);
    detailsContainer.appendChild(dates);
    detailsContainer.appendChild(price);

    // Ajouter du contenu spécifique en fonction du type d'annonce
    if ("etages" in annonce) {
      const maison = annonce as unknown as MaisonInterface;
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("annonce-card-details");

      const etagesDiv = document.createElement("div");
      etagesDiv.classList.add("annonce-card-details-group");
      const etagesIcon = document.createElement("img");
      etagesIcon.src = "/assets/stairs.png";
      etagesIcon.alt = "stairs icon";
      etagesIcon.style.width = "20px";
      const etages = document.createElement("p");
      etages.textContent = `${maison.etages}`;

      const jardinDiv = document.createElement("div");
      jardinDiv.classList.add("annonce-card-details-group");
      const jardinIcon = document.createElement("img");
      jardinIcon.src = "/assets/tree.png";
      jardinIcon.alt = "garden icon";
      jardinIcon.style.width = "20px";
      const jardin = document.createElement("p");
      jardin.textContent = `${maison.jardin ? "✅" : "❌"}`;

      const garageDiv = document.createElement("div");
      garageDiv.classList.add("annonce-card-details-group");
      const garageIcon = document.createElement("img");
      garageIcon.src = "/assets/private-garage.png";
      garageIcon.alt = "garage icon";
      garageIcon.style.width = "20px";
      const garage = document.createElement("p");
      garage.textContent = `${maison.garage ? "✅" : "❌"}`;

      etages.classList.add("secondary-fields");
      jardin.classList.add("secondary-fields");
      garage.classList.add("secondary-fields");
      etagesDiv.appendChild(etagesIcon);
      etagesDiv.appendChild(etages);
      jardinDiv.appendChild(jardinIcon);
      jardinDiv.appendChild(jardin);
      garageDiv.appendChild(garageIcon);
      garageDiv.appendChild(garage);
      detailsDiv.appendChild(etagesDiv);
      detailsDiv.appendChild(jardinDiv);
      detailsDiv.appendChild(garageDiv);
      detailsContainer.appendChild(detailsDiv);
    } else if ("etage" in annonce) {
      const appartement = annonce as unknown as AppartementInterface;
      const etage = document.createElement("p");
      etage.textContent = `Étage: ${appartement.etage}`;
      const balcon = document.createElement("p");
      balcon.textContent = `Balcon: ${appartement.balcon ? "✅" : "❌"}`;
      const ascenseur = document.createElement("p");
      ascenseur.textContent = `Ascenseur: ${
        appartement.ascenseur ? "✅" : "❌"
      }`;
      etage.classList.add("secondary-fields");
      balcon.classList.add("secondary-fields");
      ascenseur.classList.add("secondary-fields");
      detailsContainer.appendChild(etage);
      detailsContainer.appendChild(balcon);
      detailsContainer.appendChild(ascenseur);
    } else if ("places" in annonce) {
      const garage = annonce as unknown as GarageInterface;
      const places = document.createElement("p");
      places.textContent = `Places: ${garage.places}`;
      const outils = document.createElement("p");
      outils.textContent = `Outils: ${garage.outils ? "✅" : "❌"}`;
      const ouverture = document.createElement("p");
      ouverture.textContent = `Ouverture: ${garage.ouverture}`;
      places.classList.add("secondary-fields");
      outils.classList.add("secondary-fields");
      ouverture.classList.add("secondary-fields");
      detailsContainer.appendChild(places);
      detailsContainer.appendChild(outils);
      detailsContainer.appendChild(ouverture);
    }

    annonceCard.appendChild(image);
    annonceCard.appendChild(detailsContainer);
    if (annonceContainer) annonceContainer.appendChild(annonceCard);
  });
}

export function navigateSection(section: string) {
  console.log("Navigating to section:", section);
  if (section === "connection" && authenticated === true) {
    console.log("Already authenticated. Redirecting to admin page.");
    navigateSection("admin");
    return;
  }
  document.querySelectorAll(".page").forEach((page: any) => {
    page.style.display = "none"; // Hide all pages
  });

  const pageId = section + "Page";
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = "block"; // Show the selected page
  }
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
  ) as NodeListOf<HTMLButtonElement>; // Select all category buttons
  if (buttons) {
    buttons.forEach((button) => {
      if (button.textContent) {
        if (button.textContent.toLowerCase() === filtreMobileType) {
          button.style.fontWeight = "500";
        } else {
          if (button.textContent.toLowerCase() === "tous") {
            button.style.fontWeight = "500";
          }
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
