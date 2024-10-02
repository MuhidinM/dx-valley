'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CardData {
  id: number
  imageUrl: string
  title: string
  description: string
  siteUrl: string
}

const CardWithModal: React.FC<CardData> = ({ imageUrl, title, description, siteUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const truncateDescription = (text: string, lines: number = 5) => {
    return (
      <div
        className="line-clamp-5 overflow-hidden"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: lines,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {text}
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
      <div className="md:flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={200}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
        <div className="mt-2">{truncateDescription(description)}</div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => window.open(siteUrl, '_blank')}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Visit Site
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Read More
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setIsModalOpen(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
              <div className="mt-2">
                <Image
                  src={imageUrl}
                  alt={title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover mb-4"
                />
                <p className="text-sm text-gray-500">{description}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.open(siteUrl, '_blank')}
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  Visit Site
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Dummy data
const cardData: CardData[] = [
  {
    id: 1,
    imageUrl: '/placeholder.svg?height=200&width=400',
    title: 'Exploring Nature',
    description: 'Discover the beauty of untouched landscapes and diverse ecosystems. From lush rainforests to arid deserts, our planet offers a myriad of natural wonders waiting to be explored. Join us on a journey through the most breathtaking locations, learning about local flora and fauna, and understanding the delicate balance of nature.',
    siteUrl: 'https://example.com/nature'
  },
  {
    id: 2,
    imageUrl: '/placeholder.svg?height=200&width=400',
    title: 'Future of Technology',
    description: 'Dive into the cutting-edge world of technology and innovation. From artificial intelligence and quantum computing to biotechnology and space exploration, we cover the latest advancements that are shaping our future. Learn about groundbreaking research, emerging trends, and the potential impact of these technologies on society and everyday life.',
    siteUrl: 'https://example.com/tech'
  },

]

export default function CardGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cardData.map((card) => (
          <CardWithModal key={card.id} {...card} />
        ))}
      </div>
    </div>
  )
}