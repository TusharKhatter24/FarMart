// Snackbar.js
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
            <div>
                <Alert onClose={onClose} severity={severity}>
                    {message}
                </Alert>
            </div>
        </Snackbar>
    );
};

export default CustomSnackbar;
