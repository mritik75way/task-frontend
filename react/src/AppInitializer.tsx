import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setAuth, setLoading, logout } from "./features/auth/auth.slice";
import api from "./services/axios";


const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  useEffect(() => {
  const initAuth = async () => {
  try {
    const { data } = await api.post("/auth/refresh"); 
    
    if (data.accessToken && data.user) {
      dispatch(setAuth({ user: data.user, accessToken: data.accessToken }));
    } else {
      dispatch(logout());
    }
  } catch {
    dispatch(logout()); 
  } finally {
    dispatch(setLoading(false));
  }
};

  initAuth();
}, [dispatch]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
};

export default AppInitializer;
