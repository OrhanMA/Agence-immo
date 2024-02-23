import { Credentials } from "../types";

export function handleConnexionSubmission(
  clientCredentials: Credentials,
  serverCredentials: Credentials
) {
  if (
    serverCredentials.identifiant === clientCredentials.identifiant &&
    serverCredentials.password === clientCredentials.password
  ) {
    // console.log("Correct credentials. Logging in...");
    return true;
  } else {
    // console.log("Incorrect credentials.");
    return false;
  }
}

export function getClientCredentials(form: HTMLFormElement) {
  const data = new FormData(form);
  const clientCredentials: Credentials = {
    identifiant: data.get("identifiant")?.toString() as string,
    password: data.get("password")?.toString() as string,
  };
  return clientCredentials;
}
