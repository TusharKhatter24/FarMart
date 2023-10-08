import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../Utils/actions";

const Header = () => {

    const isLoggedIn = useSelector((state) => state?.login?.isLoggedIn);
    const userId = useSelector((state) => state?.login?.userId);

    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="header">
            <Link style={{ marginRight: 'auto' }} to="/">Home</Link>
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {!isLoggedIn && <Link to="/register">Register</Link>}
            {isLoggedIn && <Link to="/files">Files</Link>}
            {isLoggedIn && <Link to="/" onClick={logout}>Logout</Link>}
        </div>
    );
};

export default Header;