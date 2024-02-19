import React from 'react';
import {CircularProgress, Container, Paper, Typography} from "@mui/material";

interface LoadingComponentProps {
    error: Error | null;
    isLoading: boolean;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({error, isLoading}) => {
    if (error) {
        return (
            <Container maxWidth="md">
                <Paper elevation={3} className="p-4">
                    <Typography variant="h5" component="div" gutterBottom>
                        Failed to load
                    </Typography>
                    <Typography color="error">Error: {error.message}</Typography>
                </Paper>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container maxWidth="md">
                <Paper elevation={3} className="p-4">
                    <Typography variant="h5" component="div" gutterBottom>
                        Loading...
                    </Typography>
                    <CircularProgress/>
                </Paper>
            </Container>
        );
    }

    return <></>;
};

export default LoadingComponent;
