import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import cs from 'classnames';

const OverlayContext = createContext<{
  open: boolean;
  setOpen: (b: boolean) => void;
}>({
  open: false,
  setOpen: () => undefined,
});

export function Overlay({
  children,
}: React.PropsWithChildren<any>): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <OverlayContext.Provider value={{ open, setOpen }}>
      <div className={cs('overlay', { open })}>{children}</div>
    </OverlayContext.Provider>
  );
}
const Trigger: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const { setOpen, open } = useContext(OverlayContext);
  return (
    <div className="overlay-trigger" onClick={() => setOpen(!open)}>
      {children}
    </div>
  );
};
const Content: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const { open } = useContext(OverlayContext);
  return open ? <div className="overlay-content">{children}</div> : null;
};

Overlay.Trigger = Trigger;
Overlay.Content = Content;
