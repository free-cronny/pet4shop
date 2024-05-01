import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalUser from "@/Components/ModalUser";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const getAllUsers = () => {
        axios
            .get("/users")
            .then(function (response) {
                // Manipule os dados retornados aqui
                setUsers(response.data); // Exemplo: exibe os dados no console
                setLoading(false);
            })
            .catch(function (error) {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <PrimaryButton
                                className="bg-lime-500 hover:bg-green-700 focus:bg-lime-700 active:bg-emerald-900 "
                                onClick={() => setOpenModal(true)}
                            >
                                Novo Cliente +
                            </PrimaryButton>
                            <ModalUser
                                isOpen={openModal}
                                setModalOpen={() => setOpenModal(!openModal)}
                            >
                                <h1 className="flex flex-col items-center justify-center text-2xl font-bold mb-5">
                                    <span>Cadastrar</span>
                                </h1>

                                <div>
                                    <InputLabel  htmlFor="name" value="Nome:" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        className="mt-3 block w-full"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email:"
                                    />

                                    <TextInput
                                        id="email"
                                        name="email"
                                        className="mt-3 block w-full"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cpf" value="CPF:" />

                                    <TextInput
                                        id="cpf"
                                        name="cpf"
                                        className="mt-3 block w-full"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="phone"
                                        value="Número de telefone:"
                                    />

                                    <TextInput
                                        id="phone"
                                        name="phone"
                                        className="mt-3 block w-full"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="nameanimal"
                                        value="Animal:"
                                    />

                                    <TextInput
                                        id="nameanimal"
                                        name="nameanimal"
                                        className="mt-3 block w-full"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="namepet"
                                        value="Nome do Animal:"
                                    />

                                    <TextInput
                                        id="namepet"
                                        name="namepet"
                                        className="mt-3 block w-full"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="race" value="Raça:" />

                                    <TextInput
                                        id="race"
                                        name="race"
                                        className="mt-3 block w-full"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="service"
                                        value="Serviço:"
                                    />

                                    <TextInput
                                        id="service"
                                        name="service"
                                        className="mt-3 block w-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <SecondaryButton className="mt-7 bg-lime-500 hover:bg-green-700 text-white">
                                        Novo Cliente
                                    </SecondaryButton>
                                </div>
                            </ModalUser>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
