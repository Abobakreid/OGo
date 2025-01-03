import { getCurrentUser } from "@/lib/appwrite";
import { router } from "expo-router";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalContextProps = {
  isLoggedIn: boolean;
  userData: any; // Replace `any` with the actual type of userData if known
  isLoading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUserData: Dispatch<SetStateAction<any>>; //
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalContextProps>({
  isLoggedIn: false,
  userData: null,
  isLoading: false,
  setIsLoggedIn: () => {},
  setUserData: () => {},
  setIsLoading: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

// Global context provider component
export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      getCurrentUser().then((userData) => {
        if (userData) {
          setIsLoggedIn(true);
          setUserData(userData);
          if (userData) {
            router.push("/home");
          }
        }
      });
    } catch (error) {
      setIsLoading(false);
      console.log("Error fetching user data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        userData,
        isLoading,
        setIsLoggedIn,
        setUserData,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
