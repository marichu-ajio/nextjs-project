'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography } from '@mui/material';

export default function CreateUser() {
    const router = useRouter();
    const [name, setName] = useState('');

    const saveData = (e: React.FormEvent) => {
        e.preventDefault();

        if (name !== '') {
            const data = {
                name: name, // Only use the name in the data object
            };

            fetch(`/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success > 0) {
                        alert(data.message);
                        router.push('/'); // Assuming you want to redirect to a user page
                    }
                });
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                Create
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
        </Container>
    );
}
