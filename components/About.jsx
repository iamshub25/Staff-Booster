"use client";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 mt-12">
            Get to know Us
          </h2>
          <div className="w-[60%] md:w-[27rem] h-1 bg-primary mx-auto"></div>
          <p className="mt-2">
            We’re dedicated to connecting great talent with meaningful
            opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[27vh] md:h-[15vh] lg:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-lg w-full">
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full"
                  alt="guy working"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              we’re your partner in progress. Because when you grow, we grow.
            </h3>
            <p className="mb-4 text-gray-700">
              At our core, we’re a team driven by one mission: to make job
              hunting simpler, smarter, and more successful for everyone. We
              understand how tough and overwhelming it can be to find the right
              opportunity — which is why we built a platform that works for you.
            </p>
            <p className="mb-6 text-gray-700">
              Whether you’re a fresher, switching careers, or looking to grow in
              your current field, we offer tools and guidance tailored to your
              journey. From resume reviews to curated job matches,
              skill-building resources to mock interviews — we’ve got your back.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2">Our Mission</h4>
                <p className="text-gray-700">
                  To empower job seekers with the right tools, guidance, and
                  opportunities to build meaningful careers. We strive to make
                  the job search experience smarter, faster, and more accessible
                  for everyone.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2">Our Vision</h4>
                <p className="text-gray-700">
                  To become the most trusted career platform that bridges the
                  gap between talent and opportunity. We envision a world where
                  everyone has the support they need to achieve their career
                  goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
