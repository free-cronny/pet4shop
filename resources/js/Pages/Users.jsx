import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function Users({ auth, teste }) {

    const [users, setUsers] = useState(teste.usuarios);

    const updatePrivilegeUser = (privilege, id) => {
        axios.put(`/updatePrivilege/${id}`, {
            privilege: privilege
        })
            .then(response => {
                setUsers(teste.usuarios);
            })
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Usuários" />
            {users.map(user => (
                <div key={user.id}>
                    <p style={{ color: user.role == 'usuario' ? 'blue' : 'red' }}>{user.name}</p>
                    <p>{user.email}</p>

                    <button onClick={() => updatePrivilegeUser('admin', user.id)}>Atualizar</button>
                </div>
            ))}

        </AuthenticatedLayout>
    )
}