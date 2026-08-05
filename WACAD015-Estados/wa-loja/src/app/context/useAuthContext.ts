import { useContext } from "react";
import { AuthContext } from "../state/AuthProvider";

export function useAuthContext() {
  return useContext(AuthContext);
}