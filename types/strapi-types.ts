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
  
  interface ImageData {
    data: {
      id: number;
      attributes: ImageAttributes;
    } | null;
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
    attributes: MenuItemAttributes;
  }
  
  export interface MenuItemApiResponse {
    data: MenuItem[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }