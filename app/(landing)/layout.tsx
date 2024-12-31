

import Footer from "@/components/footer";
import Socials from "@/components/socials";
import Navbar from "@/components/navbar";
import ScrollToTopButton from "@/components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <div>
      <div className='lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-slate-50 dark:bg-gray-900'>
        <Socials />
        <Navbar />
        {children}
      </div>
      <div className=' bg-coopBlue'>
      <ScrollToTopButton />
        <Footer />
      </div>
    </div>
  );
}
