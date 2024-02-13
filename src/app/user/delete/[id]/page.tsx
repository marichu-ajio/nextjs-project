'use client'
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { Button, Container, Typography, Paper } from '@mui/material';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export default function DeleteUser({ params }: { params: { id: number } }) {
    const router = useRouter();
    const { data: user, error, isLoading } = useSWR<User>(`/api/user/${params.id}`, fetcher);

    const deleteUser = (id: number) => {
        fetch(`/api/user/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success > 0) {
                    alert(data.message);
                    router.push('/');
                }
            });
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <Container maxWidth="md">
            <Paper elevation={3} className="p-4">
                <Typography variant="h3" component="div" gutterBottom>
                    Read User
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                    {user?.name}
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    ID: {user?.id}
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    Created At: {user?.created_at}
                </Typography>
                <Typography variant="body1" component="div" gutterBottom>
                    Updated At: {user?.updated_at}
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => deleteUser(params.id)}>
                    Remove User
                </Button>
            </Paper>
        </Container>
    );
}
