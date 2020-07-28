import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';
import jwt from "jsonwebtoken";
import SignUp from './components/auth/SignUp';
import Products from './components/products/Products';
import { Provider } from 'react-redux';
import store from './redux/store';
import NewProduct from './components/products/NewProduct';
import EditProduct from './components/products/EditProduct';
import FindProduct from './components/products/FindProduct';
import ProductDetail from './components/products/ProductDetail';

function App() {

  const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      try {
        const user = jwt.verify(token, 'MY-SECRET-KEY-2020');

        return user;
      } catch (error) {
        return null;
      }
    };

    return (
      <Route
        {...rest}
        render={(props) => {
          const user = checkToken();
          if (user) {
            const found = roles.find((role) => role === user.role);

            if (found) {

              return (

                <Component {...props} user={checkToken()} />

              );
            } else {
              return <Redirect to={{ pathname: '/products', state: { from: props.location } }} />;
            }
          } else {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
          }
        }}
      />
    );
  };






  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/sign-up" component={SignUp} />
            <PrivateRoute exact path="/products" roles={['cliente', 'admin']} component={Products} />
            <PrivateRoute exact path="/new-product" roles={['admin']} component={NewProduct} />
            <PrivateRoute exact path="/edit-product/:id" roles={['admin']} component={EditProduct} />
            <PrivateRoute exact path="/find-product" roles={['admin']} component={FindProduct} />
            <PrivateRoute exact path="/product-detail/:id" roles={['cliente', 'admin']} component={ProductDetail} />
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
