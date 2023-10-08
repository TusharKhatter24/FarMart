import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginUser } from "../Utils/actions";
import { register } from "../Utils/api";
import CustomSnackbar from "../Common/Snackbar";
import { TextField, Button, Typography, Container, CssBaseline } from '@mui/material';

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
        <Container component="main" maxWidth="xs">
            <CustomSnackbar
                open={openSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
            <div className="form-container">
                <Typography component="h1" variant="h5">
                    Registration
                </Typography>
                <form className="form-container" onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit-button"
                    >
                        Register
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Register;
