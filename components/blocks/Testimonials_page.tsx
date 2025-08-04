"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  rating: number;
}

interface TestimonialPageProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  autoplay?: boolean;
  className?: string;
}

const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      className={cn(
        "w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-20",
        className
      )}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-20">
        <div className="order-2 md:order-1">
          <div className="relative h-64 sm:h-72 md:h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 20
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div className="h-full w-full rounded-3xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl font-bold text-blue-600">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4 order-1 md:order-2">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              {Array.from({ length: testimonials[active].rating }).map(
                (_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400"
                  />
                )
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-base sm:text-lg text-muted-foreground mt-4 sm:mt-6 md:mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-3 sm:gap-4 pt-6 sm:pt-8 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-secondary flex items-center justify-center group/button hover:bg-secondary/80 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-secondary flex items-center justify-center group/button hover:bg-secondary/80 transition-colors"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsColumn = ({
  testimonials,
  duration = 10,
  className,
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ quote, name, designation, rating }, i) => (
                <div
                  className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full bg-card"
                  key={i}
                >
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Quote className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    {Array.from({ length: rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    {quote}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-xs sm:text-sm">
                        {name}
                      </div>
                      <div className="leading-4 sm:leading-5 opacity-60 tracking-tight text-xs">
                        {designation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const AvatarGroupWithTooltips = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="bg-background flex items-center justify-center rounded-full border p-1">
        <div className="flex items-center relative">
          {testimonials.slice(0, 4).map((testimonial, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "relative hover:z-10",
                    index > 0 && "-ml-1 sm:-ml-2"
                  )}
                >
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg border-2 border-background">
                    <AvatarFallback className="text-xs sm:text-sm bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="font-medium text-xs sm:text-sm"
              >
                {testimonial.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

const TestimonialsPage = ({
  testimonials = [
    {
      quote:
        "This platform changed my career path. I was struggling to land interviews, but the personalized tips and resume support helped me get a job at a leading tech startup.",
      name: "Priya Mehta",
      designation: "Front-End Developer",
      rating: 5,
    },
    {
      quote:
        "The job recommendations were spot on. I found roles that truly matched my interests and skills. I'm now working in a role I love and growing fast!",
      name: "Rahul Verma",
      designation: "Digital Marketing Executive",
      rating: 4,
    },
    {
      quote:
        "This site gave me the confidence to switch careers. The mock interviews were exactly what I needed to prepare for real-world challenges.",
      name: "Aman Khurana",
      designation: "Data Analyst",
      rating: 5,
    },
    {
      quote:
        "I used this site to shift from a support role to HR. The role-based preparation resources really made a difference.",
      name: "Aarti Sharma",
      designation: "Human Resources Associate",
      rating: 5,
    },
    {
      quote:
        "As a fresher, I was nervous. But the mentoring sessions and job-matching tools helped me start my career in content writing with confidence.",
      name: " Ritika Bansal",
      designation: " Content Writer",
      rating: 4,
    },
  ],
  title = "What Our Customers Say",
  subtitle = "Trusted by thousands of teams worldwide",
  badgeText = "Testimonials",
  autoplay = true,
  className,
}: TestimonialPageProps) => {
  const firstColumn = testimonials.slice(0, 2);
  const secondColumn = testimonials.slice(2, 4);
  const thirdColumn = testimonials.slice(4, 6);

  return (
    <div
      className={cn(
        "min-h-screen bg-background w-full overflow-x-hidden",
        className
      )}
    >
      {/* Header Section */}
      <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 mt-12">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center w-full"
          >
            <div className="space-y-2 sm:space-y-4 w-full">
              <div className="inline-block rounded-lg bg-[wheat] px-2 sm:px-3 py-1 text-xs sm:text-sm text-primary-foreground">
                {badgeText}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight px-2">
                {title}
              </h1>
              <p className="w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground px-2 leading-relaxed">
                {subtitle}
              </p>
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8">
              <AvatarGroupWithTooltips testimonials={testimonials} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Hero Testimonials */}
      <section className="w-full py-8 sm:py-12 bg-secondary">
        <AnimatedTestimonials testimonials={testimonials} autoplay={autoplay} />
      </section>

      {/* Grid Testimonials */}
      <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 flex justify-center items-center">
        <div className="w-full max-w-7xl px-4 md:px-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, idx) => (
                            <Star
                              key={idx}
                              className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm sm:text-base text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto pt-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {testimonial.designation}
                        </p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="h-2px bg-gray-600 my-4 w-full"></div>
      {/* Animated Columns */}
      <section className="bg-background py-12 sm:py-16 md:py-20 relative bg-secondary">
        <div className="container z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center max-w-[90%] sm:max-w-[540px] mx-auto mb-8 sm:mb-10"
          >
            <div className="flex justify-center">
              <div className="border py-1 px-3 sm:px-4 rounded-lg text-xs sm:text-sm">
                More Reviews
              </div>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tighter mt-4 sm:mt-5 text-center">
              Join thousands of satisfied customers
            </h2>
            <p className="text-center mt-3 sm:mt-5 opacity-75 text-sm sm:text-base px-4">
              See what makes our platform the choice of industry leaders.
            </p>
          </motion.div>

          <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[500px] sm:max-h-[600px] md:max-h-[740px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
