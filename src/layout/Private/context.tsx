import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from 'react';

interface Context {
  isSidebarOpen: boolean;
  toggleSidebar: (b: boolean) => void;
}

export const PrivateLayoutContext = createContext<Context>({
  isSidebarOpen: false,
  toggleSidebar: () => undefined,
});

export function PrivateLayoutContextProvider({
  children,
}: PropsWithChildren<any>): ReactElement {
  const [isSidebarOpen, toggleSidebar] = useState(false);

  return (
    <PrivateLayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </PrivateLayoutContext.Provider>
  );
}

export function usePrivateLayout(): Context {
  return useContext(PrivateLayoutContext);
}
