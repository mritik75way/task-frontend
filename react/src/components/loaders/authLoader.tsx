import { store } from "../../app/store";
import { logout, setAuth } from "../../features/auth/auth.slice";
import api from "../../services/api";

export async function authLoader() {
  try {
    const { data } = await api.post("/auth/refresh");

    if (data?.accessToken && data?.user) {
      store.dispatch(
        setAuth({
          user: data.user,
          accessToken: data.accessToken,
        })
      );
    } else {
      store.dispatch(logout());
    }
  } catch {
    store.dispatch(logout());
  }

  return null; 
}
