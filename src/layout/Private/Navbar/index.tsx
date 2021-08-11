import React from 'react';

import cs from 'classnames';

import { usePrivateLayout } from '../context';
import st from './navbar.module.scss';

export const Navbar: React.FC<React.HTMLAttributes<any>> = ({
  className,
  ...props
}) => {
  const { toggleSidebar } = usePrivateLayout();

  return (
    <div
      {...props}
      className={cs(
        className,
        st.navbar,
        'flex flex-row flex-wrap items-center p-6 border-b border-1 surface-3',
      )}
    >
      <div className="flex flex-row items-center">
        <button
          type="button"
          className="lg:hidden mr-6"
          onClick={() => toggleSidebar(true)}
        >
          <i className="fa fa-bars" />
        </button>
        <div className="hidden md:flex w-56 ">
          <img src="img/logo.png" className="w-10 flex-none" alt="logo" />
          <strong className="capitalize ml-1 flex-1">WaProject</strong>
        </div>
      </div>
    </div>
  );
};
