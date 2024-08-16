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
            text: 'hehakjhjadfadjcimus, magni iure a repudiandae molestias nemo voluptatibus voluptas earum excepturi architecto, iusto necessitatibus sequi perferendis veritatis! Voluptatem?',
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
      <div className='bg-gray-50 text-gray-900'>
        <div className='mx-auto max-w-screen-sm text-center mt-12'>
          <h2 className='mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white'>
            Focus Areas
          </h2>
        </div>
        <ul className='tabs flex flex-row w-full md:w-4/5 h-auto md:h-12 mx-auto mt-6 mb-4 md:mt-12 justify-center gap-12 '>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer flex-1 md:flex-none text-center py-2 px-3 md:px-4 transition duration-900 ease-in-out ${
                activeTab === tab.id
                  ? "border-b-2 border-coopOrange font-semibold"
                  : "border-b-2 border-transparent hover:border-gray-300"
              }`}>
              <h3 className='text-lg md:text-l font-bold'> {tab.title} </h3>
            </li>
          ))}
        </ul>

        <div className='contents w-full md:w-4/5 mx-auto mt-6 md:mt-12 flex flex-wrap justify-between gap-4 md:gap-8'>
          {contents.map((content) => (
            <div
              key={content.id}
              className={`box flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-white shadow-sm rounded-lg transition-transform duration-800 ease-in-out ${
                activeTab === content.id ? "opacity-100" : "hidden opacity-0"
              }`}>
              <img
                src={content.img}
                alt={content.title}
                className='w-full md:w-1/2 rounded-lg'
              />
              <div className='text-center md:text-left ml-10'>
                <h3 className='text-xl md:text-2xl font-bold mb-3 md:mb-5'>
                  {content.title}
                </h3>
                <p className='text-gray-700'>{content.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default FocusAreas;