import NavBar from "../../components/NavBar/NavBar";
import PrivateRoute from "../../components/auth/PrivateRoute"

function index() {
    return (
        <PrivateRoute>
            <NavBar/>
            User Dashboard
        </PrivateRoute>
    )
}

export default index
