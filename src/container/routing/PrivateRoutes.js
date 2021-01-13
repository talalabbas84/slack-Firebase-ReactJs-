import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

export default PrivateRoute;
