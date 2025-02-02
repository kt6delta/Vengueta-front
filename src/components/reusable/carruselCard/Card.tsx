import React from 'react'

interface CardProps {
  card: {
    id: number;
    title: string;
    description: string;
  };
}

export const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className='h-full w-[400px] m-2 flex-shrink-0 cursor-pointer'>
    <div className="rounded-3xl overflow-hidden mb-4 relative h-[250px]">
        <img src={`./tciclista${card.id}.avif`} alt={card.title} 
            className="w-full h-full object-cover" // Ajusta el tamaño y asegura que la imagen cubra el espacio sin perder proporciones
        />
        <span className='absolute top-3 left-4 border border-blue-200 text-lg rounded-xl px-4 py-2 font-semibold capitalize bg-blue-100'>
					{card.title}
				</span>
    </div>
    <div className="px-4 flex gap-4 justify-center">
        <h2 className='text-xl font-bold text-slate-800 leading-7 whitespace-normal '>
            {card.title}
        </h2>
    </div>
</div>
  )
}
