'use client'
import React from 'react';
import {Button, Container, TextField, Typography} from '@mui/material';
import {useSaveUser} from '@/app/hooks/userHooks';

export default function CreateUser(): JSX.Element {
    const {name, setName, isLoading, saveUser} = useSaveUser();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name.trim() !== '') {
            await saveUser({name}, {
                onSuccess: () => {
                    // Any additional logic on success
                }, onError: (error) => {
                    // Handle error if needed
                    console.error(error);
                },
            });
        }
    };

    return (<Container maxWidth="md">
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                Create
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

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </Container>);
}