import Button from '@mui/material/Button';

const FileCard = ({ data, index, onDeleteClick }) => {
    const handleViewClick = () => {
        // Open the original link in a new tab when "View" button is clicked
        window.open(data.originalLink, '_blank');
    };

    const handleDownloadClick = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = data.originalLink;
        downloadLink.download = data.originalName;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleDeleteClick = () => {
        onDeleteClick(index);
    };

    return (
        <div className="file-card">
            <span className="file-name">{data.originalName}</span>
            <div className="file-actions">
                <Button variant="contained" color="primary" onClick={handleViewClick}>
                    View
                </Button>
                <Button variant="contained" color="success" onClick={handleDownloadClick}>
                    Download
                </Button>
                <Button variant="contained" color="error" onClick={handleDeleteClick}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default FileCard;
