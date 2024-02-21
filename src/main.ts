import { fakeAnnoncesMaisons } from "./fixtures.ts";
import { Maison } from "./classes/maison.ts";
import { MaisonInterface } from "./types.ts";
injectMaisonListing(fakeAnnoncesMaisons);

function injectMaisonListing(listings: any) {
  const annonceContainer = document.querySelector(".annonces");
  // console.log(annonceContainer);
  listings.forEach((annonce: any) => {
    const annonceCard = document.createElement("div");
    annonceCard.classList.add("annonce-card");

    const image = document.createElement("img");
    image.draggable = false;
    image.src = annonce.photoUrl;
    image.alt = annonce.ville + " maison";

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
    price.innerHTML += " par nuit";

    detailsContainer.appendChild(location);
    detailsContainer.appendChild(prestataire);
    detailsContainer.appendChild(dates);
    detailsContainer.appendChild(price);

    annonceCard.appendChild(image);
    annonceCard.appendChild(detailsContainer);
    if (annonceContainer) annonceContainer.appendChild(annonceCard);
  });
}

const maisonForm = document.getElementById("maisonForm") as HTMLFormElement;

console.log(maisonForm);

maisonForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);

  const formData = new FormData(maisonForm);

  const ville = formData.get("ville")?.toString();
  const pays = formData.get("pays")?.toString(); // Add ?.toString() here
  const prestataire = formData.get("prestataire")?.toString(); // Add ?.toString() here
  const duree = formData.get("duree")?.toString(); // Add ?.toString() here
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

  console.log("Ville:", ville);
  console.log("Pays:", pays);
  console.log("Prestataire:", prestataire);
  console.log("Duree:", duree);
  console.log("Prix:", prix);
  console.log("Etages:", etages);
  console.log("Jardin:", jardin);
  console.log("Garage:", garage);

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
      console.log(newMaison);
      saveMaisonLocalStorage(newMaisonData);
    };

    reader.readAsDataURL(file);
  } else {
    const newMaison = new Maison(newMaisonData);
    console.log(newMaison);
    saveMaisonLocalStorage(newMaisonData);
  }
});

function saveMaisonLocalStorage(newMaisonData: MaisonInterface) {
  // Check if the maisons array exists in localStorage
  let maisons: any[] = JSON.parse(localStorage.getItem("maisons") || "[]");

  // Add the new maison object to the maisons array
  maisons.push(newMaisonData);

  // Save the updated maisons array back to localStorage
  localStorage.setItem("maisons", JSON.stringify(maisons));
}
