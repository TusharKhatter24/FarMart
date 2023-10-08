import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Welcome to DocAccess Pro
      </Typography>
      <Typography variant="body1">
        Upload your documents and access them anytime, anywhere.
      </Typography>
    </Box>
  );
};

export default Home;
