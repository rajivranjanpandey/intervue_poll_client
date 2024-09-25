import { Navigate, useLocation } from "react-router-dom";
import { getSessionRole, getStudentNameSession } from "../../utils/storage";

export default function RoleBasedRoute({ children }) {
    const currentRoute = useLocation();
    const storedRole = getSessionRole();
    function checkIsValidRoute() {
        let isValid = storedRole ? currentRoute.pathname.includes(storedRole) : false;
        console.log({ isValid, storedRole, currentRoute: currentRoute.pathname })
        let redirectRoute = '/';
        if (isValid) {
            console.log('ahs', currentRoute.pathname, getStudentNameSession(), currentRoute.pathname === '/student/register' && getStudentNameSession())
            if (storedRole === 'student' && (currentRoute.pathname === '/student/register' && getStudentNameSession())) {
                isValid = false;
                redirectRoute = '/student/poll';
            }
        }
        console.log({ isValid, redirectRoute });
        return { isValid, redirectRoute };
    }
    const { isValid: isRouteValid, redirectRoute } = checkIsValidRoute();
    if (isRouteValid)
        return children;
    else
        return <Navigate to={redirectRoute} />

}  