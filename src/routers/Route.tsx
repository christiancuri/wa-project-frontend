import React from 'react';
import { ExtractRouteParams } from 'react-router';
import { Route as BaseRoute, RouteProps, Switch } from 'react-router-dom';

export interface RouteConfig<
  Path extends string = string,
  Params extends { [K: string]: string | undefined } = ExtractRouteParams<
    Path,
    string
  >,
> extends RouteProps<Path, Params> {
  routes?: RouteConfig[];
  component: React.FC<any>;
}

export const Route: React.FC<RouteConfig> = ({
  component: Component,
  routes,
  path,
  ...props
}) => {
  return (
    <BaseRoute
      {...props}
      path={path || '/'}
      render={() => (
        <Component>
          {routes && (
            <Switch>
              {routes.map((item, index) => (
                <Route key={index} {...item} path={`${path}/${item.path}`} />
              ))}
            </Switch>
          )}
        </Component>
      )}
    />
  );
};
