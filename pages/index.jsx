import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
// import Testimonials from '@/components/Testimonials';
import Testimonials from '@/components/Review';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { BlurFade } from '@/components/magicui/blur-fade';

export default function Home() {
  return (
    <>
      <Head>
        <title>Staff Booster</title>
        <meta name="description" content="Professional consulting services to help your business grow and succeed in today's competitive market." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      <BlurFade delay={0.2} inView/>
      <main >
        <ScrollProgress className='' />
        <BlurFade delay={0.4} inView/>
        <Hero />
        <BlurFade delay={0.6} inView/>
        <About />
        <Services />
        <Testimonials />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}