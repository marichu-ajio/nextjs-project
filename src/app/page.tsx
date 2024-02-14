'use client'
import React from 'react';
import Link from 'next/link';
import {Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {User, useUsers} from '@/app/hooks/userHooks'; // Import the User interface

export default function Home() {
    const {users, error, isLoading} = useUsers();

    if (error) return <div>failed to load</div>;
    if (isLoading) return <div>loading...</div>;

    return (
        <Container>
            <h1 className='text-3xl text-blue-500 text-center pt-10 font-bold underline'>List Users</h1>
            <Link href="/user/create" className='text-xl text-blue-500 text-center p-1 font-bold underline'>
                <Button variant="contained" color="warning">
                    Create User
                </Button>
            </Link>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>Modify</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user: User) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.created_at}</TableCell>
                                <TableCell>{user.updated_at}</TableCell>
                                <TableCell>
                                    <Link href={`user/edit/${user.id}`}>
                                        <Button variant="contained" color="warning">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Link href={`user/read/${user.id}`}>
                                        <Button variant="contained" color="warning">
                                            View
                                        </Button>
                                    </Link>
                                    <Link href={`user/delete/${user.id}`}>
                                        <Button variant="contained" color="error">
                                            Delete
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}