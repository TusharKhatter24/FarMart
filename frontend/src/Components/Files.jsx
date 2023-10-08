import { useSelector } from 'react-redux';
import { useState } from 'react';
import { upload } from "../Utils/api";
import CustomSnackbar from '../Common/Snackbar';

const Files = () => {

  const isLoggedIn = useSelector((state) => state?.login?.isLoggedIn);
  const userId = useSelector((state) => state?.login?.userId);

  const [selectedFile, setSelectedFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please select a file to upload.');
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', userId);

    try {
      const response = await upload(formData);
      if (response.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('File uploaded successfully.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      if (error.response) {
        // Server returned an error response
        setSnackbarSeverity('error');
        setSnackbarMessage(error.response.data.message || 'File upload failed.');
        setOpenSnackbar(true);
      } else {
        // Request failed (e.g., network error)
        console.error('File upload failed:', error.message);
      }
    }
    setSelectedFile(null);
  };

  return (
    <>
      {isLoggedIn ?
        <div className='files'>
          <h2>Files Page</h2>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
        :
        <div>Please Login / Register</div>
      }
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
}

export default Files;
