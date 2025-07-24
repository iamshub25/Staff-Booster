import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModernAboutUsSection from '@/components/blocks/about_us';
import { ScrollProgress } from '@/components/magicui/scroll-progress';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Staff Booster</title>
        <meta name="description" content="Learn more about Staff Booster and our mission to help businesses grow." />
      </Head>
      
      <Navbar />
      <main>
        <ScrollProgress />
        <ModernAboutUsSection />
      </main>
      <Footer />
    </>
  );
}