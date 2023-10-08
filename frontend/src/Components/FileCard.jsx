import { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const FileCard = ({ data, index, onDeleteClick }) => {
    const [showLink, setShowLink] = useState(false);

    const handleViewClick = () => {
        // Open the original link in a new tab when "View" button is clicked
        window.open(data.originalLink, '_blank');
    };

    const handleDeleteClick = () => {
        onDeleteClick(index);
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(data.shortLink);
    };

    return (
        <div className="file-card">
            <div
                className="file-name"
                onMouseEnter={() => setShowLink(true)}
                onMouseLeave={() => setShowLink(false)}
            >
                {showLink ? (
                    <>
                        <span className="link-ellipsis">
                            {data.shortLink.length > 50 ? data.shortLink.substring(0, 50) + '...' : data.shortLink}
                        </span>
                        <Tooltip title="Click to copy">
                            <FileCopyIcon
                                style={{ cursor: 'pointer', marginLeft: '4px' }}
                                onClick={handleCopyClick}
                            />
                        </Tooltip>
                    </>
                ) : (
                    data.originalName
                )}
            </div>
            <div className="file-actions">
                <Button variant="contained" color="primary" onClick={handleViewClick}>
                    View
                </Button>
                <a href={data.originalLink} download={data.originalName} target='_blank'>
                    <Button variant="contained" color="success">
                        Download
                    </Button>
                </a>
                <Button variant="contained" color="error" onClick={handleDeleteClick}>
                    Delete
                </Button>
            </div>
        </div >
    );
};

export default FileCard;
