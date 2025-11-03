import { User } from '@/types/userTypes';
import React, { useState, useTransition } from 'react'

export default function useUser() {
    const [isPending, startTransition] = useTransition()
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchAllUser = async (): Promise<User[]> => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            startTransition(() => {
                setUsers(data);
            });
            return data;
        } catch (error: any) {
            alert(error.message);
            throw error;
        }
    }

    const fetchSingleUser = async (id: string): Promise<User> => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            startTransition(() => {
                setSelectedUser(data);
            });
            return data;
        } catch (error: any) {
            alert(error.message)
            throw error
        }
    }

    return { loading: isPending, fetchAllUser, fetchSingleUser, users, selectedUser }
}
