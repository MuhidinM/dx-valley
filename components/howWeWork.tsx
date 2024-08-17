import Image from 'next/image';
import React from 'react';

const HowWeWorkSection = () => {
    return (
            <div className='container mx-auto px-40 items-center justify-center'>
        <section className="relative py-10 lg:py-20" >
            <div className="container mx-auto py-10">
                <h3 className="text-4xl font-semibold text-center mb-12">
                                     <span className="text-coopBlue">How</span> We Work
                                </h3>


                <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center   ">
                    <div className="lg:w-1/3 w-full mb-8 lg:mb-3">
                            <Image src="/image/doctor.png" alt="" className="rounded-full" width={300} height={300} id="image1" />
                    </div>
                    <div className="lg:w-2/3 w-full relative">
                        <div className="flex items-center mb-4">
                            <span className="h-4 w-4 bg-coopBlue rounded-full"></span>
                            <h4 className="text-2xl font-semibold ml-4" id="title1">IDEATION</h4>
                        </div>
                        <p className="mt-5 mb-3" id="description_11">
                            Donec mi nulla, auctor nec sem a, ornare auctor m faucibus orci luctus et ultrices posuere cubilia
                            Curai. Sed mi tortor, commodo a felis in, fringilla tincidunt nulla.
                        </p>
                        <p id="description_12">
                            fringilla tincidunt nulla onec mi nulla, auctor nec sem a, ornare auctor m faucibus orci luctus et
                            ultrices posuere cubilia Curai. Sed mi tortor, commodo a felis in.
                        </p>
                            <div className="process-direction">
                                <svg className="absolute" width="100%" height="300%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="100" stroke="#4bafe8" strokeWidth="3" strokeDasharray="5,5" />
                            </svg>
</div>
                    </div>
                </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center my-20">
                    <div className="lg:w-2/3 w-full relative">
                        <div className="flex items-center mb-4">
                            <h4 className="text-2xl font-semibold mr-4" id="title2">Prototyping</h4>
                            <span className="h-4 w-4 bg-coopBlue rounded-full"></span>
                        </div>
                        <ul className="mt-5 mb-3 list-none" id="work_1">
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Cras justo odio
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Dapibus ac facilisis
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Morbi leo risus
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Porta ac consectetur
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Vestibulum at eros
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/3 w-full">
                        <Image src="/image/doctor.png" alt="" className="rounded-full" width={300} height={300} id="image2" />
                    </div>
                </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center mb-20">
                    <div className="lg:w-1/3 w-full mb-8 lg:mb-0">
                            <Image src="/image/doctor.png" alt="" className="rounded-full" width={300} height={300} id="image3" />
                    </div>
                    <div className="lg:w-2/3 w-full relative">
                        <div className="flex items-center mb-4">
                            <span className="h-4 w-4 bg-coopBlue rounded-full"></span>
                            <h4 className="text-2xl font-semibold ml-4" id="title3">Production</h4>
                        </div>
                        <p className="mt-5 mb-3" id="description_21">
                            Fringilla tincidunt nulla onec mi nulla, auctor nec sem a, ornare auctor m faucibus orci luctus et
                            ultrices posuere cubilia Curai. Sed mi tortor, commodo a felis in.
                        </p>
                        <p id="description_22">
                            Donec mi nulla, auctor nec sem a, ornare auctor m faucibus orci luctus et ultrices posuere cubilia
                            Curai. Sed mi tortor, commodo a felis in, fringilla tincidunt nulla.
                        </p>
                        <div className="process-direction2"></div>
                    </div>
                </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
                    <div className="lg:w-2/3 w-full relative">
                        <div className="flex items-center mb-4">
                            <h4 className="text-2xl font-semibold mr-4" id="title4">Evaluation</h4>
                            <span className="h-4 w-4 bg-coopBlue rounded-full"></span>
                        </div>
                        <ul className="mt-5 mb-3 list-none" id="work_2">
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Cras justo odio
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Dapibus ac facilisis
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Morbi leo risus
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Porta ac consectetur
                            </li>
                            <li className="flex items-center mb-2">
                                <i className="fas fa-check mr-3"></i>Vestibulum at eros
                            </li>
                        </ul>
                        <div className="process-direction-last"></div>
                    </div>
                    <div className="lg:w-1/3 w-full">
                            <Image src="/image/doctor.png" alt="" className="rounded-full" width={300} height={300} id="image4" />
                    </div>
                </div>
            </div>
        </section>

            </div>    
);
};

export default HowWeWorkSection;
