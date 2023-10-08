import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Link style={{marginRight: 'auto'}} to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/files">Files</Link>
        </div>
    );
};

export default Header;