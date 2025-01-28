import { useContext } from "react";
import { Authentication } from "../AuthProvider/AuthProvider";

const useAuth = () => {
  const auth = useContext(Authentication);
  return auth;
};

export default useAuth;
