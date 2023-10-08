import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { upload, files, deleteFile } from "../Utils/api";
import CustomSnackbar from '../Common/Snackbar';
import FileCard from './FileCard';
import { Button, Input } from '@mui/material';

const Files = () => {

  const isLoggedIn = useSelector((state) => state?.login?.isLoggedIn);
  const userId = useSelector((state) => state?.login?.userId);

  const [selectedFile, setSelectedFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [filesArray, setFiles] = useState([{}]);

  const fetchFiles = async () => {
    try {
      const response = await files(userId);
      if (response.status === 200) {
        setFiles(response.data.files);
      }
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

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
        setFiles(response.data.files);
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

  const handleDeleteClick = async (fileIdx) => {
    try {
      // Send a request to delete the file by ID
      const response = await deleteFile(fileIdx, userId);

      if (response.status === 200) {
        setSnackbarSeverity('success');
        setSnackbarMessage('File deleted successfully.');
        setOpenSnackbar(true);
        // Fetch the updated list of files after deletion
        setFiles(response.data.files);
      }
    } catch (error) {
      console.error('File delete error:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('File deletion failed.');
      setOpenSnackbar(true);
    }
  };


  return (
    <div className="files-container">
      {isLoggedIn ?
        <div className='files'>
          <h3 className="files-heading">Your Files</h3>
          {filesArray.length > 0 ?
            filesArray.map((file, index) => (
              <FileCard data={file} index={index} onDeleteClick={handleDeleteClick} />
            ))
            :
            <div style={{margin: '30px 0'}}>Start Uploading your files</div>
          }
          <div className="file-upload">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{marginBottom: '20px'}}
            />
            <Button
              variant="contained"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
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
    </div>
  );
}

export default Files;
