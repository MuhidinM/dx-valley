/** @format */
import Image from "next/image";
import incubationPhoto from "@/public/image/incubation-center.png";
import DeboPhoto from "@/public/image/companies/debbo.png";
import SouqpassPhoto from "@/public/image/companies/souqpass.png";
import Coopayroll from "@/public/image/companies/payroll.png";
import Michu from "@/public/image/companies/MICHU.png";
import Reconcillation from "@/public/image/companies/recon.png";
import Coopstream from "@/public/image/companies/coop-stream.png";
import Diaspora from "@/public/image/companies/diaspora.png";
import Innovation from "@/public/image/innovation-hub.png";
import VSLAPhoto from "@/public/image/companies/VSLA-image.png";
import HeroImage1 from "@/public/image/hero1.jpg";
import HeroImage2 from "@/public/image/hero2.jpg";
import HeroImage3 from "@/public/image/hero3.jpg";
import HeroImage4 from "@/public/image/hero4.jpg";
import equbImage from "@/public/image/companies/equb.png";
import coopAmbition from "@/public/image/companies/coopAmbition.png";
import entrepreneur from "@/public/image/entrepreneur.png";
import relationship from "@/public/image/relationship.png";
import business from "@/public/image/business.png";

export const SouqpassImage = () => <Image src={SouqpassPhoto} alt="souqpass" />;
export const CoopayrollImage = () => (
  <Image src={Coopayroll} alt="coopayroll" />
);
export const DiasporaImage = () => <Image src={Diaspora} alt="diaspora" />;

export const MichuImage = () => <Image src={Michu} alt="michu" />;
export const ReconcillationImage = () => (
  <Image src={Reconcillation} alt="reconcillation" />
);
export const CoopstreamImage = () => (
  <Image src={Coopstream} alt="coopstream" />
);

export const VSLAImage = () => <Image src={VSLAPhoto} alt="coopstream" />;

export const overview = [
  {
    description:
      "Dx Valley is a platform that facilitates innovation and collaboration. It provides an interactive platform for innovation and collaboration.",
  },
];

export const SVG1 = () => <Image src={incubationPhoto} alt="incubation" />;

export const DeboImage = () => (
  <Image src={DeboPhoto} alt="Debo crowdfund platform" />
);

export const SVG2 = () => <Image src={Innovation} alt="reconcillation" />;

export const features = [
  {
    title: "Pre Incubation",
    content:
      "Before entering our incubation center, startups must submit their proposals following the provided instructions. This ensures we understand your vision and can tailor our support to meet your specific needs.",
    srcImage:
      "https://media.istockphoto.com/id/2160446868/photo/document-management-system-concept-businessman-working-laptop-virtual-screen-icons-folder-and.jpg?s=612x612&w=0&k=20&c=5JSrBpWPI102Gl2dNUWu6yqRmFw8-3Q0Vk1jt8TXuN8=",
  },
  {
    title: "During Incubation",
    content:
      "During incubation, startups thrive in an environment that turns ideas into viable businesses. We offer investor networks, hands-on training in hard and soft skills, and collaborative spaces that spark innovation. Our mission is to equip entrepreneurs with the resources and support they need to refine their concepts and prepare for market success.",
    srcImage:
      "https://plus.unsplash.com/premium_photo-1661416307260-5013ab7adc3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2dyYW1tZXIlMjBsYWJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Post Incubation",
    content:
      "After the incubation period, startups transition to the next phase of their journey. We continue to support them through follow-up mentorship, networking opportunities, and resources to ensure a smooth transition to scaling their business. Our aim is to help startups sustain their success, navigate new challenges, and achieve long-term growth.",
    srcImage:
      "https://media.istockphoto.com/id/1465094822/photo/business-development-discussion-panel.jpg?s=612x612&w=0&k=20&c=EI-XUIFv0aPKkGqoLLeDYW-3di49ULhH1hT3N7Xl1VE=",
  },
];

export const stats = [
  {
    img: business,
    value: "73",
    label: "Incubated Projects",
  },

  {
    img: relationship,
    value: "17",
    label: "Partnerships",
  },

  {
    img: entrepreneur,
    value: "4",
    label: "Launched StartUps",
  },
  // { value: "10", label: "Open Seats" },
  {
    img: business,
    value: "21",
    label: "Trainers",
  },
];

export const reviews = [
  {
    id: 1,
    img: <Image src={SouqpassPhoto} width={100} alt="Souq Pass" />,
    name: "Review One",
    link: "www.google.com",
  },
  {
    id: 2,
    img: <Image src={DeboPhoto} width={100} alt="Deboo" />,
    name: "Review Two",
    link: "www.google.com",
  },
  {
    id: 3,
    img: <Image src={Coopstream} width={100} alt="Coop Stream" />,
    name: "Review Three",
    link: "www.google.com",
  },
  {
    id: 4,
    img: <Image src={Michu} width={100} alt="Michu" />,
    name: "",
    link: "",
  },
  {
    id: 5,
    img: <Image src={Diaspora} width={100} alt="Diaspora Banking" />,
    name: "",
    link: "",
  },
  {
    id: 6,
    img: <Image src={VSLAPhoto} width={55} alt="VSLA" />,
    name: "",
    link: "",
  },
  {
    id: 7,
    img: <Image src={Coopayroll} width={100} alt="Coop PayRoll" />,
    name: "",
    link: "",
  },
  {
    id: 8,
    img: <Image src={Reconcillation} width={100} alt="Coop Reconciliation" />,
    name: "",
    link: "",
  },
  {
    id: 9,
    img: <Image src={equbImage} width={100} alt="equb" />,
    name: "",
    link: "",
  },
  {
    id: 10,
    img: <Image src={coopAmbition} width={50} alt="coop-ambition" />,
    name: "",
    link: "",
  },
];

export const heroImages = [
  {
    src: HeroImage1,
    alt: "Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita fugit 1",
    linkTitle: "Button 1",
    link: "/test",
  },
  {
    src: HeroImage2,
    alt: "Image 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita fugit 2",
    linkTitle: "Button 2",
    link: "/test",
  },
  {
    src: HeroImage3,
    alt: "Image 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita fugit 3",
    linkTitle: "Button 3",
    link: "/test",
  },
  {
    src: HeroImage4,
    alt: "Image 4",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita fugit 4",
    linkTitle: "Button 4",
    link: "/test",
  },
];
export const divisions = [
  {
    title: "Innovation Hub",
    href: "/innovationhub",
  },
  {
    title: "Incubation Lab",
    href: "/incubationcenter",
  },
  {
    title: "Coop Bank",
    href: "https://coopbankoromia.com.et/about/",
  },
];

export const collaborations = [
  {
    href: "/organizations",
    title: "Organizations",
  },
  {
    href: "/trainers",
    title: "Trainers",
    description: "Collab with Trainers",
  },
  {
    href: "/media",
    title: "Media",
  },
  {
    href: "/stakeholders",
    title: "Stakeholders",
  },
];

export const events = [
  {
    href: "/training",
    title: "Training Areas",
  },
  {
    href: "/contests",
    title: "Contests",
  },
  {
    href: "/showcase",
    title: "Showcase",
  },
];

export const otherLinks = [
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Call For StartUps",
    href: "/call",
  },
  {
    title: "Licence Registration",
    href: "licence",
  },
  {
    title: "Stake Holders",
    href: "/stakeholders",
  },
  {
    title: "Funding",
    href: "licence",
  },
  {
    title: "Social Media",
    href: "/socialmedia",
  },
  {
    title: "Projects",
    href: "licence",
  },
  {
    title: "Events",
    href: "/events",
  },
  {
    title: "Filtering Criterias",
    href: "licence",
  },
  {
    title: "Gallery",
    href: "/gallery",
  },
];

export const focusArea = [
  {
    image:
      "https://modernofficesystems.com/wp-content/uploads/Farm-One-0021-HighRes_preview.jpeg",
    tab: "Agro-tech",
    contentTitle: "Agricultural Technology",
    contentDesc:
      "In the agrotech sector, our incubation program is dedicated to advancing agricultural technologies that enhance productivity and sustainability. We support startups in creating innovative smart farming solutions, integrating technology with traditional agricultural practices, and addressing challenges such as resource management and climate adaptation. Our focus includes developing solutions for precision agriculture, farm automation, and supply chain optimization. We provide expertise in navigating industry-specific regulations and connecting with stakeholders to drive technological advancements in agriculture.",
  },
  {
    image:
      "https://lifeboat.com/blog.images/artificial-intelligence-construction-technologys-next-frontier.jpg",
    tab: "Artificial intelligence",
    contentTitle: "Artificial intelligence",
    contentDesc:
      "For startups focused on artificial intelligence, our program offers comprehensive guidance on developing and implementing cutting-edge AI technologies. We assist in optimizing machine learning models, managing and analyzing large datasets, and integrating AI solutions into practical applications. Our support extends to addressing ethical considerations and ensuring responsible AI practices. We provide hands-on training with the latest AI tools and technologies, strategic insights for scaling AI solutions, and practical advice on navigating the competitive landscape of AI development.",
  },
  {
    image:
      "https://th.bing.com/th/id/OIP._3ThLmnK_OYZA0q6XonRxgHaEc?w=263&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    tab: "Fintech",
    contentTitle: "Financial Technology",
    contentDesc:
      "Our incubation program provides startups in the fintech sector with specialized expertise to navigate the complexities of financial technologies. We offer in-depth support in developing and refining innovative payment solutions, ensuring regulatory compliance, and leveraging emerging technologies. Our program also focuses on crafting effective market entry strategies, connecting startups with potential investors, and refining business models to address the evolving needs of the financial industry. We aim to empower fintech startups to drive financial innovation and achieve sustainable growth.",
  },
];

export const objectives = [
  {
    icon: "",
    description:
      "Objectives Discription explaining the purposes of the collaorations between the different parties",
  },
  // {
  //   icon: "",
  //   description: "",
  // },
];
