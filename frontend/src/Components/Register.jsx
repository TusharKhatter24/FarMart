import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from "../Utils/actions";
import { register } from "../Utils/api";
import CustomSnackbar from "../Common/Snackbar";

const Register = () => {

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            // Some fields are empty
            setSnackbarSeverity('error');
            setSnackbarMessage('Some fields are empty.');
            setOpenSnackbar(true);
            return; // Do not send data to the server
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            // Email format is invalid
            setSnackbarSeverity('error');
            setSnackbarMessage('Email format is invalid.');
            setOpenSnackbar(true);
            return; // Do not send data to the server
        }

        try {
            const response = await register(formData);
            if (response.status === 200) {
                dispatch(loginUser(response.data.userId));
                setSnackbarSeverity('success');
                setSnackbarMessage('Registration successful!');
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Registration failed.');
            setOpenSnackbar(true);
            console.error("Registration failed:", error);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
        if (snackbarSeverity === 'success') navigate('/files');
    };

    return (
        <div className="register">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <p>Email</p>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <p>Password</p>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            <CustomSnackbar
                open={openSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </div>
    );
};

export default Register;
