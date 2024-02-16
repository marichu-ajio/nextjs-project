'use client'
import React from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/navigation';
import {Button, Container, Paper, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useDeleteUser} from '@/app/hooks/userHooks';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface DeleteUserForm {
    confirmation: boolean;
}

export default function DeleteUser({params}: { params: { id: number } }) {
    const router = useRouter();
    const {data: user, error, isLoading} = useSWR<User>(`/api/user/${params.id}`, fetcher);
    const {deleteUser, isLoading: deleteLoading} = useDeleteUser(params.id, {
        onSuccess: () => router.push('/'),
    });

    const {register, handleSubmit} = useForm<DeleteUserForm>();

    const onSubmit: SubmitHandler<DeleteUserForm> = (data) => {
        if (data.confirmation) {
            deleteUser();
        }
    };

    if (error) return <div>Failed to load</div>;
    if (isLoading || deleteLoading) return <div>Loading...</div>;

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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        <input
                            type="checkbox"
                            {...register('confirmation', {required: 'Please confirm the deletion'})}
                        />
                        Confirm deletion
                    </label>

                    <Button type="submit" variant="contained" color="secondary">
                        Remove User
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
