"use client"
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HiringConsultancyServicesDemo from '@/components/blocks/Services_page';
import { ScrollProgress } from '@/components/magicui/scroll-progress';

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Our Services - Staff Booster</title>
        <meta name="description" content="Explore the range of services offered by Staff Booster to help your business succeed." />
      </Head>
      
      <Navbar />
      <main>
        <ScrollProgress />
        <HiringConsultancyServicesDemo />
      </main>
      <Footer />
    </>
  );
}