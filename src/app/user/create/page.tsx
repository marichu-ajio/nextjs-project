'use client'
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Button, Container, TextField, Typography} from '@mui/material';
import {useSaveUser} from '@/app/hooks/userHooks';

interface FormData {
    name: string;
}

export default function CreateUser(): JSX.Element {
    // Initialize react-hook-form with register instead of createUser
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormData>();

    // Custom hook for saving user
    const {isLoading, saveUser} = useSaveUser();

    // Submit handler
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (data.name.trim() !== '') {
            await saveUser({name: data.name}, {
                onSuccess: () => {
                    // Any additional logic on success
                },
                onError: (error) => {
                    // Handle error if needed
                    console.error(error);
                },
            });
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                Create
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('name', {required: 'Name is required'})}
                    onChange={(e) => setValue('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </Container>
    );
}
