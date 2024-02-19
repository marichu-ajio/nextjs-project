// userHooks.ts
import {useState} from 'react';
import useSWR from 'swr';
import {useRouter} from 'next/navigation';

export interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export function useGetAllUser() {
    const {data: users, error, isLoading} = useSWR<User[]>(
        '/api/user',
        (url: string) =>
            fetch(url).then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            }),
        {
            onError: (error: Error) => {
                console.error('Error fetching data:', error);
            },
        }
    );

    return {
        users,
        error,
        isLoading,
    };
}

export function useFetchUser(id: number) {
    // const {data: user, error, isLoading} = useSWR<User>(
    //     `/api/user/${id}`,
    //     (url: string) => fetch(url).then((res) => res.json())
    // );

    const {data: user, error, isLoading} = useSWR<User>(
        `/api/user/${id}`,
        (url: string) => fetch(url).then((res) => res.json())
    );
    return {
        user,
        error,
        isLoading,
    };
}

interface SaveUserOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useSaveUser() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const saveUser = async (data: { name: string }, options?: SaveUserOptions) => {
        try {
            setIsLoading(true);

            const response = await fetch(`/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            setIsLoading(false);

            if (responseData.success > 0) {
                alert(responseData.message);
                router.push('/');
                if (options?.onSuccess) {
                    options.onSuccess();
                }
            } else {
                if (options?.onError) {
                    options.onError(responseData.message);
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);

            if (options?.onError) {
                options.onError('An error occurred while saving the data.');
            }
        }
    };

    return {
        name,
        setName,
        isLoading,
        saveUser,
    };
}

interface SaveEditUserOptions {
    name: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useSaveEditUserData(userId: number) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const saveEditUserData = async (options?: SaveEditUserOptions) => {
        try {
            setIsLoading(true);

            if (options?.name !== '') {
                const data = {
                    name: options?.name,
                };

                const response = await fetch(`/api/user/${userId}`, {
                    method: 'PUT', headers: {
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify(data),
                });

                console.log("response ", response)
                const responseData = await response.json();
                setIsLoading(false);

                if (responseData.success > 0) {
                    alert(responseData.message);
                    router.push('/');
                    if (options?.onSuccess) {
                        options.onSuccess();
                    }
                } else {
                    if (options?.onError) {
                        options.onError(responseData.message);
                    }
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);

            if (options?.onError) {
                options.onError('An error occurred while saving the edited data.');
            }
        }
    };

    return {
        name, setName, isLoading, saveEditUserData,
    };
}

interface DeleteUserOptions {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export function useDeleteUser(id: number, options?: DeleteUserOptions) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const deleteUser = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`/api/user/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            setIsLoading(false);

            if (data.success > 0) {
                alert(data.message);
                router.push('/');
                if (options?.onSuccess) {
                    options.onSuccess();
                }
            } else {
                if (options?.onError) {
                    options.onError(data.message);
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);

            if (options?.onError) {
                options.onError('An error occurred while deleting the user.');
            }
        }
    };

    return {
        deleteUser,
        isLoading,
    };
}