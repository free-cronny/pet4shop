import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard({ auth }) {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);




    const getAllUsers = () => {
        axios.get('/users')
            .then(function (response) {
                // Manipule os dados retornados aqui
                setUsers(response.data); // Exemplo: exibe os dados no console
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllUsers();
    }, []);


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>


                        {loading ? (
                            <div className="p-6 text-gray-900">Loading...</div>
                        ) : (
                            users && users.map((user) => (
                                <div key={user.id}>
                                    <div className="p-6 text-gray-900">{user.name}</div>
                                    <div className="p-6 text-gray-900">{user.email}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
