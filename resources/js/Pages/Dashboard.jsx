import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalUser from "@/Components/ModalUser";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import CardClient from "@/Components/CardClient";
import axios from "axios";
import { useState } from "react";

export default function Dashboard({ auth }) {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: 0,
        telefone: "",
        animal: "",
        nome_animal: "",
        raca_animal: "",
        servico: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        axios
            .post("/usuarios", formData)
            .then((response) => {
                console.log(response.data);
                setOpenModal(false);
                // Atualize os dados da lista de usuários ou faça uma nova chamada para atualizá-la
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
                                    <InputLabel htmlFor="nome" value="Nome:" />
                                    <TextInput
                                        id="nome"
                                        name="nome"
                                        className="mt-3 block w-full"
                                        value={formData.nome}
                                        onChange={handleChange}
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
                                        type="email"
                                        className="mt-3 block w-full"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cpf" value="CPF:" />
                                    <TextInput
                                        id="cpf"
                                        name="cpf"
                                        type="number"
                                        className="mt-3 block w-full"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="telefone"
                                        value="Número de telefone:"
                                    />
                                    <TextInput
                                        id="telefone"
                                        name="telefone"
                                        className="mt-3 block w-full"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="animal"
                                        value="Animal:"
                                    />
                                    <TextInput
                                        id="animal"
                                        name="animal"
                                        className="mt-3 block w-full"
                                        value={formData.animal}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="nome_animal"
                                        value="Nome do Animal:"
                                    />
                                    <TextInput
                                        id="nome_animal"
                                        name="nome_animal"
                                        className="mt-3 block w-full"
                                        value={formData.nome_animal}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="raca_animal"
                                        value="Raça:"
                                    />
                                    <TextInput
                                        id="raca_animal"
                                        name="raca_animal"
                                        className="mt-3 block w-full"
                                        value={formData.raca_animal}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="servico"
                                        value="Serviço:"
                                    />
                                    <TextInput
                                        id="servico"
                                        name="servico"
                                        className="mt-3 block w-full"
                                        value={formData.servico}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    <SecondaryButton
                                        className="mt-7 bg-lime-500 hover:bg-green-700 text-white"
                                        onClick={handleSubmit}
                                    >
                                        Adicionar Novo Cliente
                                    </SecondaryButton>
                                </div>
                            </ModalUser>
                            <div
                                className="flex overflow-x-auto flex-wrap justify-center -m-1"
                                style={{ scrollbarWidth: "thin" }}
                            >
                                <div className="m-1">
                                    <CardClient />
                                </div>
                                <div className="m-1">
                                    <CardClient />
                                </div>
                                <div className="m-1">
                                    <CardClient />
                                </div>
                                <div className="m-1">
                                    <CardClient />
                                </div>
                                <div className="m-1">
                                    <CardClient />
                                </div>
                                <div className="m-1">
                                    <CardClient />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
