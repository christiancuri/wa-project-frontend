import React from 'react';
import { NavLink } from 'react-router-dom';

import cs from 'classnames';

import { usePrivateLayout } from '../context';
import st from './sidebar.module.scss';

export const Sidebar: React.FC<React.HTMLAttributes<any>> = ({
  className,
  ...props
}) => {
  const { isSidebarOpen, toggleSidebar } = usePrivateLayout();

  const links: Array<
    [string, { label: string; icon: string; href: string }[]]
  > = [
    [
      'App',
      [
        { label: 'Dashboard', icon: 'fa-chart-pie', href: '/' },
        { label: 'Exames', icon: 'fa-user-check', href: '/exams' },
        {
          label: 'Labaratórios',
          icon: 'fa-user-lock',
          href: '/labs',
        },
      ],
    ],
  ];

  return (
    <div
      {...props}
      className={cs(className, st.sidebar, { [st.open]: isSidebarOpen })}
    >
      <div className={cs(st.content, 'border-1 surface-3')}>
        <div className="flex flex-col h-full">
          <div className={cs(st.mobileToggle)}>
            <button type="button" onClick={() => toggleSidebar(false)}>
              <i className="fa fa-times" />
            </button>
          </div>

          <div className="flex flex-col space-y-8">
            {links.map(([group, items]) => (
              <div key={group} className="flex flex-col space-y-1">
                <p className="ml-3 heading-1">{group}</p>
                {items.map(({ label, icon, href }, index) => (
                  <NavLink
                    to={href}
                    className="mb-1 nav-link"
                    key={index}
                    activeClassName="active"
                  >
                    <i className={cs(icon, 'fad')} />
                    {label}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
