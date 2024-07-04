import React from "react";

const InfoItem = ({ title, value }) => (
  <div className="flex justify-between items-center border-b-[2px] py-2">
    <h4 className="text-sm font-bold">{title}:</h4>
    <p className="text-sm">{value}</p>
  </div>
);

export default function CardClient({ nome, email, cpf, telefone, animal, nomeanimal, racaanimal, servico }) {
  const infoItems = [
    { title: "Nome", value: nome },
    { title: "Email", value: email },
    { title: "CPF", value: cpf },
    { title: "Telefone", value: telefone },
    { title: "Animal", value: animal },
    { title: "Nome do Animal", value: nomeanimal },
    { title: "Raça", value: racaanimal },
    { title: "Serviço", value: servico }
  ];

  return (
    <div className="w-full border-black h-[450px] flex mt-10 justify-center">
      <div className="w-[550px] rounded-lg px-8 pt-6 pb-8 mb-4 overflow-x-auto pl-1 pr-2">
        <h2 className="text-xl font-bold mb-4 text-center text-black border-b-[2px] border-white">Cliente</h2>
        <div className="text-black">
          {infoItems.map((item, index) => (
            <InfoItem key={index} title={item.title} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
