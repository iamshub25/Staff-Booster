"use client";
import Link from 'next/link';
import { AuroraText } from "@/components/magicui/aurora-text"
import Image from 'next/image';

export default function Hero() {
  return (
    <section id='Home' className="relative text-black min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Background" 
          fill 
          priority
          className=''
          style={{ objectFit: 'cover' }} 
        />
      </div>
      <div className="absolute inset-0 bg-white/40 z-10"></div>
      {/* Content */}
      <div className="container-custom relative z-20 py-20">
        <div className="max-w-3xl ml-6 bg-white/70 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <AuroraText className="text-6xl md:text-7xl lg:text-8xl">
              We Provide
            </AuroraText>{" "}
             Recruitment Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-black">
            Conduct a competitive analysis to understand the strengths, weaknesses, and strategies of your competitors in the recruitment market..
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#contact" className="btn btn-primary bg-accent hover:bg-yellow-500 text-gray-900">
              Get Started
            </Link>
            <Link href="/services" className="btn border-2 border-black text-black hover:bg-white hover:text-blue-900">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}