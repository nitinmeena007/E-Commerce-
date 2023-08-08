import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({component: Component}) => {
    const {loading, isAuthenticated } = useSelector((state)=>state.user);
  return (
    <Fragment>
        {!loading && (
            isAuthenticated ? <Component/> : <Navigate to="/login" />
        )}
    </Fragment>
  );
}

export default ProtectedRoute
