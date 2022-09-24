import { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    let history = useHistory();
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        history.push('/login')
        return <></>;
    }

    return children;
};

export default PrivateRoute;