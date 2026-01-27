import { redirect } from "react-router-dom";
import { store } from "../../app/store";

export async function protectedLoader() {
  const { isAuthenticated } = store.getState().auth;

  if (!isAuthenticated) {
    throw redirect("/login");
  }

  return null;
}
