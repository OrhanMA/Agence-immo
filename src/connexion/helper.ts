import { Credentials } from "../types";

export function handleConnexionSubmission(
  clientCredentials: Credentials,
  serverCredentials: Credentials
): boolean {
  if (
    serverCredentials.identifiant === clientCredentials.identifiant &&
    serverCredentials.password === clientCredentials.password
  ) {
    return true;
  } else {
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

export function handleLoginError(
  credentialsPopupDiv: HTMLDivElement,
  retryLoginButton: HTMLButtonElement,
  domHelper: any,
  connexionForm: HTMLFormElement
) {
  credentialsPopupDiv.style.display = "flex";
  retryLoginButton.addEventListener("click", () => {
    domHelper.navigateSection("connection");
    credentialsPopupDiv.style.display = "none";
    const connexionFormInputs = connexionForm.querySelectorAll(
      "input"
    ) as NodeListOf<HTMLInputElement>;
    connexionFormInputs.forEach((input) => {
      input.value = "";
    });
    connexionFormInputs[0].focus();
  });
}
