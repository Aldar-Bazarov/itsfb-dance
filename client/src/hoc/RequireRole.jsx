import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAdmin = ({children, role}) => {
    const user = useSelector((state) => state.user);

    if(user.role !== role) {
        return <Navigate to='/'/>
    }

    return children;
}

export default RequireAdmin;