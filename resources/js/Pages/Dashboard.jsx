import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalUser from "@/Components/ModalUser";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputSelect from "@/Components/InputSelect";
import SecondaryButton from "@/Components/SecondaryButton";
import CardClient from "@/Components/CardClient";
import axios from "axios";
import { useState, useEffect } from "react";

const initialFormData = {
    nome: "", email: "", data: "", cpf: "", telefone: "",
    animal: "", nome_animal: "", raca_animal: "", servico: "",
};

const servicoOptions = [
    { value: '', label: 'Selecione um serviço' },
    { value: 'banho', label: 'Banho' },
    { value: 'tosa', label: 'Tosa' },
    { value: 'consulta', label: 'Consulta' },
];

export default function Dashboard({ auth }) {
    const [clientes, setClientes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => { fetchClientes(); }, []);

    const fetchClientes = async () => {
        try {
            const { data } = await axios.get("/listarAnimaisDoUsuarioLogado");
            setClientes(data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value });
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

    const handleFilter = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/filtrarAnimais", formData);
            setClientes(data);
        } catch (error) {
            console.error("Erro ao filtrar:", error);
        }
    };

    const renderInput = (id, name, type = "text", label) => (
        <div>
            <InputLabel htmlFor={id} value={label} />
            <TextInput id={id} name={name} type={type} className="mt-1 block w-full" value={formData[name]} onChange={handleChange} />
        </div>
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Agenda" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                    <div className="p-6 bg-gray-100">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">Agenda</h2>
                        <PrimaryButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={() => setOpenModal(true)}>Novo Cliente +</PrimaryButton>
                        <form onSubmit={handleFilter} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderInput("nomeFilter", "nome", "text", "Filtrar por nome:")}
                            {renderInput("emailFilter", "email", "email", "Filtrar por email:")}
                            {renderInput("dataFilter", "data", "date", "Filtrar por data:")}
                            {renderInput("cpfFilter", "cpf", "text", "Filtrar por CPF:")}
                            {renderInput("telefoneFilter", "telefone", "text", "Filtrar por telefone:")}
                            {renderInput("animalFilter", "animal", "text", "Filtrar por animal:")}
                            {renderInput("nomeAnimalFilter", "nome_animal", "text", "Filtrar por nome do animal:")}
                            {renderInput("racaAnimalFilter", "raca_animal", "text", "Filtrar por raça:")}
                            <div>
                                <InputLabel htmlFor="servicoFilter" value="Filtrar por serviço:" />
                                <InputSelect id="servicoFilter" name="servico" value={formData.servico} onChange={handleChange} options={servicoOptions} />
                            </div>
                            <div className="w-full flex justify-center">
                                <SecondaryButton type="submit" className="w-200 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4">Filtrar</SecondaryButton>
                            </div>
                        </form>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clientes.map(cliente => (
                                <div key={cliente.id} className="bg-white shadow rounded-lg p-4">
                                    <CardClient {...cliente} />
                                    <button className="mt-4 text-red-600 hover:text-red-800" onClick={() => deleteUser(cliente.id)}>Excluir</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalUser isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                <h1 className="text-2xl font-bold mb-5 text-gray-900">Cadastrar Cliente</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {renderInput("nome", "nome", "text", "Nome:")}
                    {renderInput("email", "email", "email", "Email:")}
                    {renderInput("cpf", "cpf", "number", "CPF:")}
                    {renderInput("telefone", "telefone", "text", "Número de telefone:")}
                    {renderInput("animal", "animal", "text", "Animal:")}
                    {renderInput("nome_animal", "nome_animal", "text", "Nome do Animal:")}
                    {renderInput("raca_animal", "raca_animal", "text", "Raça:")}
                    <div>
                        <InputLabel htmlFor="servico" value="Serviço:" />
                        <InputSelect id="servico" name="servico" value={formData.servico} onChange={handleChange} options={servicoOptions} />
                    </div>
                    {renderInput("data", "data", "date", "Data:")}
                </div>
                <div className="w-full flex justify-center">
                    <SecondaryButton className="w-200 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4" onClick={handleSubmit}>Adicionar Novo Cliente</SecondaryButton>
                </div>
            </ModalUser>
        </AuthenticatedLayout>
    );
}
