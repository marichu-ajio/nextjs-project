'use client'
import React from 'react';
import { Button, CircularProgress, Container, Paper, TextField, Typography } from '@mui/material';
import useSWR from 'swr';
import { useSaveEditUserData } from '@/app/hooks/userHooks';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export default function EditUser({ params }: { params: { id: number } }) {
    const { data: user, error, isLoading } = useSWR<User>(`/api/user/${params.id}`, fetcher);
    const { name, setName, isLoading: saveEditLoading, saveEditUserData } = useSaveEditUserData(params.id);

    React.useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user, setName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        saveEditUserData({
            onSuccess: () => {
                // Any additional logic on success
            },
            onError: (errorMsg) => {
                // Handle error if needed
                console.error(errorMsg);
            },
        });
    };

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
                    <CircularProgress />
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={3} className="p-4">
                <Typography variant="h3" component="div" gutterBottom>
                    Edit User
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={saveEditLoading}>
                        {saveEditLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}