import { redirect } from "react-router-dom";
import { store } from "../../app/store";

export async function publicLoader() {
  const { isAuthenticated } = store.getState().auth;

  if (isAuthenticated) {
    throw redirect("/folders/root");
  }

  return null;
}
