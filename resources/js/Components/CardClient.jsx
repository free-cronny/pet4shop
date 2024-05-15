import React from "react";

export default function CardClient() {
    return (
        <div className="w-full h-full flex  mt-10">
            <div className="bg-green-600 w-[300px] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 overflow-x-auto pl-1 pr-2">
                <h2 className="text-lg font-bold mb-4 text-center text-white border-b-[2px] border-white">Cliente</h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-white pr-5">
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">Nome:</h4>
                        <p className="text-sm">Cawan Henrique</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">Email:</h4>
                        <p className="text-sm">cawancnd@gmail.com</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">CPF:</h4>
                        <p className="text-sm">44237999874</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">Telefone:</h4>
                        <p className="text-sm">13991585506</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">Animal:</h4>
                        <p className="text-sm">Cachorro</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">Nome do Animal:</h4>
                        <p className="text-sm">Yaska</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">Raça:</h4>
                        <p className="text-sm">Vira-Lata</p>
                    </div>
                    <div className="text-center">
                        <h4 className="text-sm font-bold mb-1 border-b-[2px] border-white">Serviço:</h4>
                        <p className="text-sm">Banho e tosa.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
