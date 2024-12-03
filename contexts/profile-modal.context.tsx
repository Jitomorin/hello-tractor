import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ProfileModalContextProps {
  isProfileModalOpened: boolean;
  setIsProfileModalOpened: Dispatch<SetStateAction<boolean>>;
}

export const ProfileContext =
  React.createContext<ProfileModalContextProps | null>(null);

export function ProfileModalContextProvider<T>({
  children,
}: PropsWithChildren<T>) {
  const [isProfileModalOpened, setIsProfileModalOpened] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        isProfileModalOpened: isProfileModalOpened,
        setIsProfileModalOpened,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileModalContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfileModalContext can only be used inside ProfileModalContextProvider"
    );
  }
  return context;
}
