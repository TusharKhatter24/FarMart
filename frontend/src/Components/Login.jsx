import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Utils/api";
import CustomSnackbar from "../Common/Snackbar";

const Login = () => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      if (response.status === 200) {
        console.log("Login Successful");
        setSnackbarSeverity('success');
        setSnackbarMessage('Login successful!');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Login failed.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    setOpenSnackbar(false);
    if (snackbarSeverity === 'success') navigate('/files');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
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

export default Login;