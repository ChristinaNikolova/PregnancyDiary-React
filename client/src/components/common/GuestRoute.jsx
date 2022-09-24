import { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { AuthContext } from '../../contexts/AuthContext';

const GuestRoute = ({ children }) => {
    let history = useHistory();
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        history.push('/')
        return <></>;
    }

    return children;
};

export default GuestRoute;