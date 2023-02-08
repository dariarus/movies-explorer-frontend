import React, {FunctionComponent} from "react";
import {Route, Redirect} from "react-router-dom";

import {useSelector} from "../../services/types/hooks";
import {TProtectedRouteProps} from "../../services/types/props-types";

export const ProtectedRoute: FunctionComponent<TProtectedRouteProps> = ({children, ...rest}) => {
  const {userDataState} = useSelector(state => {
    return state
  });

  return (
    <Route
      {...rest} // это пропсы path и exact
      // render - пропс компонента Route. Исп-ся как функция, в св.с чем избег-ся лишни рендеринг. Вызыв-ся при совпадении URL
      render={({location}) =>
        (userDataState.isAuthorized)
          ? (children)
          : (
              <Redirect // Если пользователь не isAuthorized, происходит переадресация на роут /signin
                // Передадим в пропс to не строку, а объект.
                to={{
                  // Маршрут, на который произойдёт переадресация
                  pathname: '/',
                  // В from сохраним текущий маршрут
                  state: {from: location}
                }} // все это после авторизации даст переадресацию на страницу, которую изначально открыл польз-ль, не будучи автор-ым
              />)
      }
    />
  );
}
