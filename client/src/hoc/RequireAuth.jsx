import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const user = useSelector((state) => state.user);
    let isAuth = user.isAuthenticated;

    if(!isAuth) {
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children;
}

export default RequireAuth;