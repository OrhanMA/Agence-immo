import { TousBiens, Bien, Prix } from "../types";

// Fonction pour récupérer les annonces en fonction du filtre sélectionné
export function getListingByFilter(
  bienFilter: Bien,
  prixFilter: Prix
): TousBiens[] {
  let data: TousBiens[] = [];
  switch (bienFilter) {
    case "maisons":
      data = JSON.parse(localStorage.getItem("maisons") || "[]");
      break;
    case "appartements":
      data = JSON.parse(localStorage.getItem("appartements") || "[]");
      break;
    case "garages":
      data = JSON.parse(localStorage.getItem("garages") || "[]");
      break;
    case "tous":
      data = getAllListings(); // Récupérer toutes les annonces
      break;
    default:
      data = getAllListings(); // Par défaut, récupérer toutes les annonces
      break;
  }
  if (prixFilter === "prix -") {
    data = data.sort((a, b) => a.prix - b.prix); // Tri des annonces par prix croissant
  } else {
    data = data.sort((a, b) => b.prix - a.prix); // Tri des annonces par prix décroissant
  }
  return data;
}

// Fonction pour récupérer toutes les annonces
export function getAllListings(): TousBiens[] {
  const maisons = JSON.parse(localStorage.getItem("maisons") || "[]");
  const appartements = JSON.parse(localStorage.getItem("appartements") || "[]");
  const garages = JSON.parse(localStorage.getItem("garages") || "[]");
  return [...maisons, ...appartements, ...garages];
}

export function getCommonFields(formData: FormData) {
  const ville = formData.get("ville")?.toString() || "";
  const pays = formData.get("pays")?.toString() || "";
  const prestataire = formData.get("prestataire")?.toString() || "";
  const duree = formData.get("duree")?.toString() || "";
  const prix = Number(formData.get("prix"));

  return { ville, pays, prestataire, duree, prix };
}

export function findListing(stringifiedListing: string): TousBiens | null {
  const localStorageListings = getAllListings();
  // ici je compare les objets avec stringify car les objets dans js ne sont pas des data types primaires et donc ils ne se comparent pas par valeur mais par référence.
  // https://www.freecodecamp.org/news/javascript-comparison-operators-how-to-compare-objects-for-equality-in-js/

  const searchResult = localStorageListings.find(
    (listing) => JSON.stringify(listing) === stringifiedListing
  );
  if (searchResult === null || searchResult === undefined) {
    return null;
  } else {
    return searchResult;
  }
}

function getListingByType(type: string) {
  const arrayKey = type + "s";
  const array = JSON.parse(localStorage.getItem(arrayKey) || "[]");
  return array;
}

export function deleteListing(listing: TousBiens) {
  const listingType = listing.type;
  const listingTypeArray: TousBiens[] = getListingByType(listingType);
  const newTypeArray = listingTypeArray.filter(
    (annonce) => JSON.stringify(annonce) !== JSON.stringify(listing)
  );
  localStorage.setItem(listingType + "s", JSON.stringify(newTypeArray));
}
