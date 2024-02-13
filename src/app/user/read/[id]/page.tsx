// Import Material-UI components
import React from 'react';
import useSWR from 'swr';
import { Typography, Paper, CircularProgress } from '@mui/material';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReadPage({ params }: { params: { id: number } }) {
    const { data: user, error, isLoading } = useSWR<any>(`/api/users/` + params.id, fetcher);

    if (error) return <div>Error loading user data</div>;

    return (
        <Paper elevation={3} className="w-full max-w-5xl m-auto p-4">
            <Typography variant="h4" component="h1" className="mb-4">
                User Details
            </Typography>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <div>
                    <Typography variant="h5" component="p" className="mb-2">
                        Name: {user?.name}
                    </Typography>
                    {/* Add any additional user-related information here */}
                </div>
            )}
        </Paper>
    );
}
