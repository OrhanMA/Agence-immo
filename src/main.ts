// import { fakeAnnoncesMaisons } from "./fixtures.ts";
import { Maison } from "./classes/maison.ts";
import {
  AppartementInterface,
  BienImmobilierInterface,
  GarageInterface,
  MaisonInterface,
} from "./types.ts";
import { Appartement } from "./classes/appartement.ts";
import { Garage } from "./classes/garage.ts";

window.onload = () => {
  const maisonsData = JSON.parse(localStorage.getItem("maisons") || "[]");
  const appartementsData = JSON.parse(
    localStorage.getItem("appartements") || "[]"
  );
  const garagesData = JSON.parse(localStorage.getItem("garages") || "[]");

  // Fusionnez les données de tous les types de biens en un seul tableau
  const listing = [...maisonsData, ...appartementsData, ...garagesData];
  // console.log(listing);

  injectListing(listing);
};

function injectListing<T extends BienImmobilierInterface>(listings: T[]) {
  console.log(listings);

  const annonceContainer = document.querySelector(".annonces");
  if (annonceContainer) annonceContainer.innerHTML = "";

  if (listings.length === 0) {
    console.log("aucune annonce pour le moment");
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
  listings.forEach((annonce: T) => {
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
    detailsContainer.appendChild(prestataire);
    detailsContainer.appendChild(dates);
    detailsContainer.appendChild(price);

    // Ajouter du contenu spécifique en fonction du type d'annonce
    if ("etages" in annonce) {
      const maison = annonce as unknown as MaisonInterface;
      const etages = document.createElement("p");
      etages.textContent = `Nombre d'étages: ${maison.etages}`;
      const jardin = document.createElement("p");
      jardin.textContent = `Jardin: ${maison.jardin ? "Oui" : "Non"}`;
      const garage = document.createElement("p");
      garage.textContent = `Garage: ${maison.garage ? "Oui" : "Non"}`;
      detailsContainer.appendChild(etages);
      detailsContainer.appendChild(jardin);
      detailsContainer.appendChild(garage);
    } else if ("etage" in annonce) {
      const appartement = annonce as unknown as AppartementInterface;
      const etage = document.createElement("p");
      etage.textContent = `Étage: ${appartement.etage}`;
      const balcon = document.createElement("p");
      balcon.textContent = `Balcon: ${appartement.balcon ? "Oui" : "Non"}`;
      const ascenseur = document.createElement("p");
      ascenseur.textContent = `Ascenseur: ${
        appartement.ascenseur ? "Oui" : "Non"
      }`;
      detailsContainer.appendChild(etage);
      detailsContainer.appendChild(balcon);
      detailsContainer.appendChild(ascenseur);
    } else if ("places" in annonce) {
      const garage = annonce as unknown as GarageInterface;
      const places = document.createElement("p");
      places.textContent = `Nombre de places de parking: ${garage.places}`;
      const outils = document.createElement("p");
      outils.textContent = `Outils disponibles: ${
        garage.outils ? "Oui" : "Non"
      }`;
      const ouverture = document.createElement("p");
      ouverture.textContent = `Moyen d'ouverture: ${garage.ouverture}`;
      detailsContainer.appendChild(places);
      detailsContainer.appendChild(outils);
      detailsContainer.appendChild(ouverture);
    }

    annonceCard.appendChild(image);
    annonceCard.appendChild(detailsContainer);
    if (annonceContainer) annonceContainer.appendChild(annonceCard);
  });
}

const maisonForm = document.getElementById("maisonForm") as HTMLFormElement;
const garageForm = document.getElementById("garageForm") as HTMLFormElement;
const appartementForm = document.getElementById(
  "appartementForm"
) as HTMLFormElement;

garageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(garageForm);
  const ville = formData.get("ville")?.toString();
  const pays = formData.get("pays")?.toString();
  const prestataire = formData.get("prestataire")?.toString();
  const duree = formData.get("duree")?.toString();
  const prix = formData.get("prix");
  const places = formData.get("places");
  const outils = formData.get("outils") === "on";
  const ouverture = formData.get("ouverture")?.toString();
  // console.log(prestataire);

  const photoInput = document.getElementById("garagePhoto") as HTMLInputElement;
  let file;
  if (photoInput.files) {
    file = photoInput.files[0];
  }

  const newGarageData: GarageInterface = {
    ville: ville || "",
    pays: pays || "",
    prestataire: prestataire || "",
    duree: duree || "",
    prix: Number(prix),
    photoUrl: "",
    places: places ? Number(places) : 1,
    outils,
    ouverture:
      ouverture === "code" || ouverture === "clef" ? ouverture : "code",
    type: "garage",
  };

  let photoUrl: string | null = null;
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        photoUrl = event.target.result as string;
        newGarageData.photoUrl = photoUrl; // Update photoUrl if file is found
      }
      const newGarage = new Garage(newGarageData);
      // console.log(newGarage);
      saveObjectToLocalStorage("garages", newGarageData);
    };

    reader.readAsDataURL(file);
  } else {
    const newGarage = new Garage(newGarageData);
    // console.log(newGarage);
    saveObjectToLocalStorage("garages", newGarageData);
  }
});

appartementForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(appartementForm);
  const ville = formData.get("ville")?.toString();
  const pays = formData.get("pays")?.toString();
  const prestataire = formData.get("prestataire")?.toString();
  const duree = formData.get("duree")?.toString();
  const prix = formData.get("prix");
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

  const newAppartementData: AppartementInterface = {
    ville: ville || "",
    pays: pays || "",
    prestataire: prestataire || "",
    duree: duree || "",
    prix: Number(prix),
    photoUrl: "",
    etage: etage ? Number(etage) : 1,
    balcon,
    ascenseur,
    type: "appartement",
  };

  let photoUrl: string | null = null;
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        photoUrl = event.target.result as string;
        newAppartementData.photoUrl = photoUrl; // Update photoUrl if file is found
      }
      const newAppartement = new Appartement(newAppartementData);
      // console.log(newAppartement);
      saveObjectToLocalStorage("appartements", newAppartementData);
    };

    reader.readAsDataURL(file);
  } else {
    const newAppartement = new Appartement(newAppartementData);
    // console.log(newAppartement);
    saveObjectToLocalStorage("appartements", newAppartementData);
  }
});

maisonForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(maisonForm);

  const ville = formData.get("ville")?.toString();
  const pays = formData.get("pays")?.toString();
  const prestataire = formData.get("prestataire")?.toString();
  const duree = formData.get("duree")?.toString();
  const prix = formData.get("prix");
  const etages = formData.get("etages");
  const jardin = formData.get("jardin") === "on"; // Convert "on" to boolean
  const garage = formData.get("garage") === "on"; // Convert "on" to boolean

  // Read the uploaded file
  const photoInput = document.getElementById("maisonPhoto") as HTMLInputElement;
  let file;
  if (photoInput.files) {
    file = photoInput.files[0];
  }

  const newMaisonData: MaisonInterface = {
    ville: ville || "",
    pays: pays || "",
    prestataire: prestataire || "",
    duree: duree || "",
    prix: Number(prix),
    photoUrl: "", // Initialize with empty string
    etages: etages ? Number(etages) : 1,
    jardin,
    garage,
    type: "maison", // Ensure that the type matches the one defined in MaisonInterface
  };

  let photoUrl: string | null = null;
  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        photoUrl = event.target.result as string;
        newMaisonData.photoUrl = photoUrl; // Update photoUrl if file is found
      }
      const newMaison = new Maison(newMaisonData);
      // console.log(newMaison);
      saveObjectToLocalStorage("maisons", newMaisonData);
    };

    reader.readAsDataURL(file);
  } else {
    const newMaison = new Maison(newMaisonData);
    // console.log(newMaison);
    saveObjectToLocalStorage("maisons", newMaisonData);
  }
});

function saveObjectToLocalStorage(
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

function navigateSection(section: string) {
  document.querySelectorAll(".page").forEach((page: any) => {
    page.style.display = "none"; // Hide all pages
  });

  const pageId = section + "Page";
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = "block"; // Show the selected page
  }
}
