import React from 'react';

interface CardProps {
  card: {
    id: number;
    title: string;
    description: string;
  };
}

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="w-[400px] h-[250px] flex-shrink-0 rounded-3xl overflow-hidden m-2">
      <img 
        src={`/espacio${card.id}.jpg`} // Asegúrate de que las imágenes estén en la carpeta `public`
        alt={card.title} 
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder.jpg'; // Imagen de respaldo si la original falla
        }}
      />
    </div>
  );
};
