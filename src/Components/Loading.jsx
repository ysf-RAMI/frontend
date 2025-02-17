import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
      <Typography variant="h6" color="textSecondary">
        Chargement en cours...
      </Typography>
    </Box>
  );
};

export default Loading;
