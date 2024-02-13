'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { TextField, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export default function EditUser({ params }: { params: { id: number } }) {
    const router = useRouter();
    const [name, setName] = useState('');
    const { data: user, error, isLoading } = useSWR<User>(`/api/user/${params.id}`, fetcher);

    useEffect(() => {
        console.log("user ", params, fetcher)
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const saveData = (e: React.FormEvent) => {
        e.preventDefault();
        if (name !== '') {
            const data = {
                name: name,
            };

            fetch(`/api/user/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success > 0) {
                        alert(data.message);
                        router.push('/');
                    }
                });
        }
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
                <form onSubmit={saveData}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
