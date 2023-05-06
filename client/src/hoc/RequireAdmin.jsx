import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAdmin = ({children}) => {
    const user = useSelector((state) => state.user);

    if(user.role !== "ADMIN") {
        return <Navigate to='/'/>
    }

    return children;
}

export default RequireAdmin;