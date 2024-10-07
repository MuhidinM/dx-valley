// menu constants interface
interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ImageAttributes {
  name: string;
  url: string;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
}
// call for proposal link automate
interface CallProposalLink {
  title: string;
  description: string;
  button_name: string;
  href: string;
}

// common for image attribute
interface ImageData {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail: ImageFormat;
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
  };
}

interface Link {
  id: number;
  href: string;
  title: string;
  description: string;
}

interface Highlight {
  id: number;
  href: string;
  title: string;
  description: string;
  img: ImageData;
  links: Link[];
}

interface MenuItemAttributes {
  trigger: string;
  highlight: Highlight;
}

export interface MenuItem {
  id: number;
  trigger: string;
  highlight: Highlight;
}

export interface MenuItemApiResponse {
  data: MenuItem[];
}

// footers interface
interface FooterLink {
  id: number;
  link: string;
  href: string;
}

export interface FooterItems {
  data: {
    id: number;

    title: string;
    description: string;
    divisions: FooterLink[];
    collaboration: FooterLink[];
    events: FooterLink[];
    otherlinks: FooterLink[];
    logo_white: ImageData;
    logo_black: ImageData;
  };
}
export interface FooterData {
  title: string;
  description: string;
  divisions: {
    link: string;
    href: string;
  }[];
  collaboration: {
    link: string;
    href: string;
  }[];
  events: {
    link: string;
    href: string;
  }[];
  otherlinks: {
    link: string;
    href: string;
  }[];
  logo_white: {
    small: string;
    medium: string;
    large: string;
  };
  logo_black: {
    small: string;
    medium: string;
    large: string;
  };
}

// interfaces for training tab
interface CardLink {
  id: number;
  href: string;
  title: string;
}

interface Card {
  id: number;
  title: string;
  description: string;
  link: CardLink;
  img: ImageData;
}

export interface CardData {
  title: string;
  description: string;
  link: {
    title: string;
    href: string;
  };
  img: string;
}

export interface TrainingData {
  cards: {
    title: string;
    description: string;
    link: {
      title: string;
      href: string;
    };
    img: string;
  }[];
  proposal: CallProposalLink;
}
export interface TrainingResponse {
  data: {
    id: number;
    cards: Card[];
    proposal: CallProposalLink;
  };
}

// interfaces for organization tab
export interface OrgData {
  overview: string;
  cards: CardData[];
  proposal: CallProposalLink;
}
export interface OrgResponse {
  data: {
    id: number;
    overview: string;
    cards: Card[];
    proposal: CallProposalLink;
  };
}

// interfaces for showcases tab
interface Names {
  name: string;
}

interface Incubated {
  projectName: string;
  small_description: string;
  long_description: string;
  launched: Date;
  published: Date;
  investors: Names[];
  founders: Names[];
  img_1: ImageData;
  img_2: ImageData;
  link: CardLink;
}
export interface ShowCaseData {
  projectName: string;
  small_description: string;
  long_description: string;
  launched: Date;
  published: Date;
  investors: Names[];
  founders: Names[];
  img_1: string;
  img_2: string;
  link: {
    href: string;
    title: string;
  };
}

export interface ShowCaseResponse {
  data: {
    id: number;
    incubated: Incubated[];
  }[];
}

// interfaces for incubation
interface CardNoLink {
  title: string;
  description: string;
  img: ImageData;
}
export interface CardNoLinkData {
  title: string;
  description: string;
  img: string;
}
export interface IncubationData {
  intro: CardNoLinkData;
  incubation_process: CardNoLinkData[];
  offers: CardNoLinkData[];
  training: CardNoLinkData[];
  focus: CardNoLinkData[];
  proposal: CallProposalLink;
}
export interface IncubationResponse {
  data: {
    id: number;
    intro: CardNoLink;
    incubation_process: CardNoLink[];
    offers: CardNoLink[];
    training: CardNoLink[];
    focus: CardNoLink[];
    proposal: CallProposalLink;
  };
}

// interfaces for innovation
export interface Address {
  description: string;
  phone: string;
  email: string;
  address: string;
}
export interface InnovationData {
  intro: CardNoLinkData;
  companies: CardNoLinkData[];
  howeworks: CardNoLinkData[];
  gallery: CardData[];
  connect: Address;
  proposal: CallProposalLink;
}
export interface InnovationResponse {
  data: {
    id: number;
    intro: CardNoLink;
    companies: CardNoLink[];
    howeworks: CardNoLink[];
    gallery: Card[];
    connect: Address;
    proposal: CallProposalLink;
  };
}

// interfaces for home-page
interface BgLink {
  title: string;
  href: string;
  background_is_orange: boolean;
}
[];
export interface JoinUs {
  text_1: string;
  text_2: string;
  text_3: string;
  buttons: BgLink[];
}
export interface Videos {
  title: string;
  youtubeId: string;
  thumbnail_link: string;
}
export interface News {
  title: string;
  date: Date;
  news_link: string;
  description: string;
  img_link: string;
}
interface Events {
  title: string;
  link: string;
  date: Date;
}
export interface Update {
  title: string;
  description: string;
  link: string;
  img: ImageData;
  events: Events[];
}
export interface UpdateData {
  title: string;
  description: string;
  link: string;
  img: string;
  events: Events[];
}
export interface Vision {
  title: string;
  description: string;
}
export interface HomePageData {
  motto_title: string;
  slider: CardData[];
  stats: CardNoLinkData[];
  delivered: CardData[];
  update: UpdateData[];
  vision: Vision;
  videos: Videos[];
  news: News[];
  joinus: JoinUs;
  connect: Address;
  proposal: CallProposalLink;
}
export interface HomePageResponse {
  data: {
    id: number;
    motto_title: string;
    slider: Card[];
    stats: CardNoLink[];
    delivered: Card[];
    update: Update[];
    vision: Vision;
    videos: Videos[];
    joinus: JoinUs;
    news: News[];
    connect: Address;
    proposal: CallProposalLink;
  };
}
// interface Social 
export interface Social {
  is_visible: boolean;
  url: string;
  media: string;
}

export interface SocialResponse {
  data: {
    id: number;
    socials: Social[]
  }[];
}

// interface for gallery
export interface GalleryData {
  type: string;
  title: string;
  description: string;
  img: string;
}

export interface GalleryResponse {
  data: {
    id: number;
    type: string;
    gallery: CardNoLink;
  }[];
}
