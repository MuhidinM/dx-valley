

import Head from "next/head";
import Footer from "@/components/footer";
import Socials from "@/components/socials";
import Navbar from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
        <Head>
          <link rel='icon' href='/DX.ico' sizes='any' />
        </Head>
  return (
    <div>
      <div className='lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-slate-50 dark:bg-gray-900'>
        <Socials />
        <Navbar />
        {children}
      </div>
      <div className=' bg-coopBlue'>
        <Footer />
      </div>
    </div>
  );
}
