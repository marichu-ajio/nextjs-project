'use client'
import React from 'react';
import {CircularProgress, Container, Paper, Typography} from '@mui/material';
import {useFetchUser} from '@/app/hooks/userHooks';
import LoadingComponent from "@/app/components/LoadingComponent";

export default function ReadPage({params}: { params: { id: number } }) {
    const {user, error, isLoading} = useFetchUser(params.id);

    if (error) return <div>Error loading user data</div>;

    return (
        <Container maxWidth="md">
            {isLoading ?
                <LoadingComponent error={error} isLoading={isLoading}></LoadingComponent>
                :
                <Paper elevation={3} className="p-4">
                    <Typography variant="h4" component="h1" className="mb-4">
                        User Details
                    </Typography>

                    {isLoading ? (
                        <CircularProgress/>
                    ) : (
                        <div>
                            <Typography variant="h5" component="p" className="mb-2">
                                Name: {user?.name}
                            </Typography>
                        </div>
                    )}
                </Paper>
            }

        </Container>
    );
}
