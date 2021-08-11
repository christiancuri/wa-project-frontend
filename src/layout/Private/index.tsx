import React from 'react';

import cs from 'classnames';

import { PrivateLayoutContextProvider } from './context';
import { Navbar } from './Navbar';
import st from './private.module.scss';
import { Sidebar } from './Sidebar';

export const PrivateLayout: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <PrivateLayoutContextProvider>
      <div className={cs(st.private)}>
        <Navbar className={st.navbar} />
        <Sidebar className={st.sidebar} />
        <div className={cs(st.content, 'flex-1 p-6 surface-1')}>{children}</div>
      </div>
    </PrivateLayoutContextProvider>
  );
};
