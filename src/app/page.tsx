'use client'
import Link from 'next/link';
import useSWR from 'swr';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

interface User {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const { data: users, error, isLoading } = useSWR<User[]>(
      '/api/user',
      (url: string) => fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          }),
      {
        onError: (error) => {
          console.error('Error fetching data:', error);
        },
      }
  );
  const handleDelete = (id: number) => {
    // Implement your delete logic here
  };

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

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
              {users?.map((user) => (
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
                        <Link href={`user/delete/${user.id}`}>
                            <Button variant="contained" color="error">
                                Delete
                            </Button>
                        </Link>
                      {/* Additional modify actions */}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
  );
}
