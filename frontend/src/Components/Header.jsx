import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logoutUser } from "../Utils/actions";

const Header = () => {

    const isLoggedIn = useSelector((state) => state?.login?.isLoggedIn);

    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="header">
            <Link style={{ marginRight: 'auto' }} to="/" className="link">Home</Link>
            {!isLoggedIn && <Link to="/login" className="link">Login</Link>}
            {!isLoggedIn && <Link to="/register" className="link">Register</Link>}
            {isLoggedIn && !location.pathname.includes('files') && <Link to="/files" className="link">Files</Link>}
            {isLoggedIn && <Link to="/" onClick={logout} className="link">Logout</Link>}
        </div>
    );
};

export default Header;