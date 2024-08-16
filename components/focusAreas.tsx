"use client";
import { useState } from 'react';

const FocusAreas = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, title: 'Education' },
        { id: 1, title: 'In-session Training' },
        { id: 2, title: 'Experience' },
        { id: 3, title: 'Interview' },
    ];

    const contents = [
        {
            id: 0,
            img: 'https://images.pexels.com/photos/5088009/pexels-photo-5088009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            title: 'Lorem ipsum dolor',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos accusantium itaque amet ducimus, magni iure a repudiandae molestias nemo voluptatibus voluptas earum excepturi architecto, iusto necessitatibus sequi perferendis veritatis! Voluptatem?',
        },
        {
            id: 1,
            img: 'https://images.pexels.com/photos/5865862/pexels-photo-5865862.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            title: 'Lorem ipsum dolor',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos accusantium itaque amet ducimus, magni iure a repudiandae molestias nemo voluptatibus voluptas earum excepturi architecto, iusto necessitatibus sequi perferendis veritatis! Voluptatem?',
        },
        {
            id: 2,
            img: 'https://images.pexels.com/photos/3761308/pexels-photo-3761308.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Lorem ipsum dolor',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos accusantium itaque amet ducimus, magni iure a repudiandae molestias nemo voluptatibus voluptas earum excepturi architecto, iusto necessitatibus sequi perferendis veritatis! Voluptatem?',
        },
        {
            id: 3,
            img: 'https://images.pexels.com/photos/5336951/pexels-photo-5336951.jpeg?auto=compress&cs=tinysrgb&w=800',
            title: 'Lorem ipsum dolor',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos accusantium itaque amet ducimus, magni iure a repudiandae molestias nemo voluptatibus voluptas earum excepturi architecto, iusto necessitatibus sequi perferendis veritatis! Voluptatem?',
        },
    ];

    return (
        <div className="bg-gray-50 text-gray-200">
            <ul className="tabs flex w-4/5 h-24 space-x-2 mx-auto mt-12 shadow-lg rounded-lg overflow-hidden mb-4">
                {tabs.map((tab) => (
                    <li
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`cursor-pointer  flex-1 flex items-center justify-center shadow-lg transition duration-500 ease-in-out ${activeTab === tab.id
                            ? 'bg-orange-500 text-gray-900 shadow-md rounded-lg'
                            : 'bg-coopBlue text-gray-900 rounded-lg'
                            }`}
                    >
                        {tab.title}
                    </li>
                ))}
            </ul>

            <div className="contents w-4/5 mx-auto mt-12 flex flex-wrap justify-between gap-8 ">
                {contents.map((content) => (
                    <div
                        key={content.id}
                        className={`box flex flex-col md:flex-row gap-5 p-6 bg-gray-100 shadow-lg rounded-lg transition-transform duration-1200 ease-in-out ${activeTab === content.id ? 'opacity-100' : 'hidden opacity-0'
                            }`}
                    >
                        <img
                            src={content.img}
                            alt={content.title}
                            className="w-full md:w-1/2 rounded-lg"
                        />
                        <div>
                            <h3 className="text-2xl font-bold mb-5 text-gray-900">{content.title}</h3>
                            <p className="text-gray-700">{content.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FocusAreas;