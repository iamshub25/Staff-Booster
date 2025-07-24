"use client";

import React from 'react';
import { 
  Users, 
  Search, 
  FileText, 
  TrendingUp, 
  Target, 
  Award,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface ServiceCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function ServiceCard({
  className,
  icon,
  title,
  description,
  iconClassName = "text-blue-500",
  titleClassName = "text-gray-900",
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1",
        className
      )}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={cn("p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300", iconClassName)}>
          {icon}
        </div>
        <h3 className={cn("text-xl font-semibold", titleClassName)}>
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

interface HiringConsultancyServicesProps {
  services?: ServiceCardProps[];
}

function HiringConsultancyServices({ services }: HiringConsultancyServicesProps) {
  const defaultServices = [
    {
      icon: <Search className="w-8 h-8 text-blue-600" />,
      title: "Talent Sourcing",
      description: "We identify and attract top-tier candidates through strategic sourcing methods and extensive network reach.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Recruitment Strategy",
      description: "Develop comprehensive hiring strategies tailored to your company culture and specific role requirements.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Candidate Screening",
      description: "Thorough evaluation process including skills assessment, cultural fit analysis, and background verification.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Interview Coordination",
      description: "Streamlined interview process management from scheduling to feedback collection and decision making.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Market Analysis",
      description: "Comprehensive salary benchmarking and market trend analysis to ensure competitive positioning.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Executive Search",
      description: "Specialized executive recruitment for C-level and senior management positions across industries.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Contract Staffing",
      description: "Flexible staffing solutions for temporary, contract, and project-based hiring needs.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Onboarding Support",
      description: "Comprehensive onboarding assistance to ensure smooth integration of new hires into your organization.",
      iconClassName: "bg-blue-50 group-hover:bg-blue-100"
    }
  ];

  const displayServices = services || defaultServices;

  return (
    <div className="bg-white min-h-screen w-full py-16 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Hiring Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive recruitment solutions to help you find, attract, and hire the best talent for your organization
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayServices.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              className="h-full"
            />
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let our expert consultants help you build a world-class team. Contact us today for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                <Link href="/#contact">
                  Get Started
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HiringConsultancyServicesDemo() {
  return <HiringConsultancyServices />;
}
