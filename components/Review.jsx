"use client";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "This platform changed my career path. I was struggling to land interviews, but the personalized tips and resume support helped me get a job at a leading tech startu.",
    name: " Priya Mehta",
    role: "Front-End Developer",
  },
  {
    text: "The job recommendations were spot on. I found roles that truly matched my interests and skills. I’m now working in a role I love and growing fast!.",
    name: " Rahul Verma",
    role: "Digital Marketing Executive",
  },
  {
    text: "The portfolio review feature helped me understand what companies really look for. I secured a position as a designer within 3 weeks!.",
    name: "Sneha Iyer",
    role: "UI/UX Designer",
  },
  {
    text: "This site gave me the confidence to switch careers. The mock interviews were exactly what I needed to prepare for real-world challenges.",
    name: "Aman Khurana",
    role: "Data Analyst",
  },
  {
    text: "From resume optimization to job alerts, every step was smooth. I got hired by a mid-size product company within a month.",
    name: "Neha Reddy",
    role: "Software Engineer",
  },
  {
    text: "I never thought I could land such a good role without referrals. The guidance and curated resources helped me prepare and succeed.",
    name: "Vikram Patil",
    role: "Business Analyst",
  },
  {
    text: "I used this site to shift from a support role to HR. The role-based preparation resources really made a difference.",
    name: "Aarti Sharma",
    role: "Human Resources Associate",
  },
  {
    text: "As a fresher, I was nervous. But the mentoring sessions and job-matching tools helped me start my career in content writing with confidence.",
    name: " Ritika Bansal",
    role: " Content Writer",
  },
  {
    text: "Clear roadmap, skill-building suggestions, and mock test series helped me stay focused. I landed a great DevOps job in Bangalore!.",
    name: "Manish Jaiswal",
    role: "DevOps Engineer",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


function Testimonials  ()  {
  return (
    <section id="testimonials" className="bg-secondary my-20 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-16 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default  Testimonials ;