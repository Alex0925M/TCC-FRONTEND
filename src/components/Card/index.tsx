import React from 'react';
import { Card } from 'flowbite-react';

const CardComponent = () => {
  return (
    <Card
      imgSrc="https://via.placeholder.com/400"
      className="max-w-sm"
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
        Título do Cartão
      </h5>
      <p className="font-normal text-gray-700">
        Este é um exemplo de um cartão utilizando Flowbite-React.
      </p>
      <button className="mt-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700">
        Ação
      </button>
    </Card>
  );
};

export default CardComponent;
