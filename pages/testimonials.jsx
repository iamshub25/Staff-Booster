import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TestimonialPage from '@/components/blocks/Testimonials_page';
import { ScrollProgress } from '@/components/magicui/scroll-progress';

export default function TestimonialsPage() {
  return (
    <>
      <Head>
        <title>Testimonials - Staff Booster</title>
        <meta name="description" content="See what our clients say about Staff Booster's services and solutions." />
      </Head>
      
      <Navbar/>
      <main>
        <ScrollProgress />
        <TestimonialPage />
      </main>
      <Footer />
    </>
  );
}