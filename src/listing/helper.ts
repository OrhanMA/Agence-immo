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
