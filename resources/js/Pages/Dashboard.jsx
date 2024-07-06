import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalUser from "@/Components/ModalUser";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputSelect from "@/Components/InputSelect";  // Adicione essa linha

import SecondaryButton from "@/Components/SecondaryButton";
import CardClient from "@/Components/CardClient";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard({ auth }) {
    const [clientes, setClientes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        animal: "",
        nome_animal: "",
        raca_animal: "",
        servico: "",
    });

    const servicoOptions = [
        { value: '', label: 'Selecione um serviço' },
        { value: 'banho', label: 'Banho' },
        { value: 'tosa', label: 'Tosa' },
        { value: 'consulta', label: 'Consulta' },
    ];

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await axios.get("/listarAnimaisDoUsuarioLogado");
            setClientes(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.post("/criarAnimais", formData);
            setOpenModal(false);
            fetchClientes();
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/usuarios/${id}`);
            fetchClientes();
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Agenda" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                    <div className="p-6 bg-gray-100">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Agenda</h2>
                        <PrimaryButton
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            onClick={() => setOpenModal(true)}
                        >
                            Novo Cliente +
                        </PrimaryButton>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clientes.map((cliente) => (
                                <div key={cliente.id} className="bg-white shadow rounded-lg p-4">
                                    <CardClient {...cliente} />
                                    <button
                                        className="mt-4 text-red-600 hover:text-red-800"
                                        onClick={() => deleteUser(cliente.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalUser isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                <h1 className="text-2xl font-bold mb-5 text-gray-900">Cadastrar Cliente</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    <div>
                        <InputLabel htmlFor="nome" value="Nome:" />
                        <TextInput
                            id="nome"
                            name="nome"
                            className="mt-1 block w-full"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="Email:" />
                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1 block w-full"
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
                            className="mt-1 block w-full"
                            value={formData.cpf}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="telefone" value="Número de telefone:" />
                        <TextInput
                            id="telefone"
                            name="telefone"
                            className="mt-1 block w-full"
                            value={formData.telefone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="animal" value="Animal:" />
                        <TextInput
                            id="animal"
                            name="animal"
                            className="mt-1 block w-full"
                            value={formData.animal}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="nome_animal" value="Nome do Animal:" />
                        <TextInput
                            id="nome_animal"
                            name="nome_animal"
                            className="mt-1 block w-full"
                            value={formData.nome_animal}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="raca_animal" value="Raça:" />
                        <TextInput
                            id="raca_animal"
                            name="raca_animal"
                            className="mt-1 block w-full"
                            value={formData.raca_animal}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="servico" value="Serviço:" />
                        <InputSelect
                            id="servico"
                            name="servico"
                            value={formData.servico}
                            onChange={handleChange}
                            options={servicoOptions}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <SecondaryButton
                        className="w-200 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4"
                        onClick={handleSubmit}
                    >
                        Adicionar Novo Cliente
                    </SecondaryButton>
                </div>
            </ModalUser>
        </AuthenticatedLayout>
    );
}
