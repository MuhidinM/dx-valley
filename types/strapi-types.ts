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
  // common for image attribute 
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

  // footers interface

  interface FooterLink {
    id: number,
    link: string,
    href: string
  }
  
  export interface FooterItems {
    data : {
        id: number,
        attributes: {
            title: string,
            description: string,
            divisions: FooterLink[],
            collaboration: FooterLink[],
            events: FooterLink[],
            otherlinks: FooterLink[],
            logo_white: ImageData,
            logo_black: ImageData
        }
    }
  }
  export interface FooterData {
    title: string,
    description: string,
    divisions: {
        link: string,
        href: string
      }[],
    collaboration: {
        link: string,
        href: string
      }[],
    events: {
        link: string,
        href: string
      }[],
    otherlinks: {
        link: string,
        href: string
      }[],
    logo_white: {
      small: string,
      medium: string,
      large: string
    },
    logo_black:  {
      small: string,
      medium: string,
      large: string
    },
}