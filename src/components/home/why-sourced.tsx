"use client";

import React from "react";
import { Users, FileText, Calendar, CreditCard, ChevronDown } from "lucide-react";
import SignupFlow from "@/components/signup/SignupFlow";

const WhySourcedSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-12 ">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium">WHY SOURCED?</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-4xl md:text-6xl font-bold md:mb-0 mb-6">
              How We Make Creative<br />
              Collaborations Simple
            </h2>
            
            <div className="flex-shrink-0">
              <SignupFlow />
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        {/* <div className="w-full h-px bg-gray-200 mb-6"></div> */}
        
        {/* Simple Accordion Sections */}
        <div className="w-full">
          {/* Talent Accordion Item */}
          <div className="   p-4 pr-10 rounded-3xl bg-gray-100">
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center">
                  <Users className="h-8 w-8 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-semibold">Find and Shortlist Talent</span>
                </div>
                {/* <ChevronDown className="h-8 w-8 shrink-0 text-gray-400 transition-transform group-open:rotate-180" /> */}
                <img src="/arrow2.svg" alt="Chevron Down" className=" h-6 w-10  shrink-0 text-gray-400 transition-transform group-open:rotate-180" />

              </summary>
              <div className="  pt-4 text-base">
                <p className="text-gray-600 pl-[50px] md:pl-[300px]   text-xl md:text-2xl font-thin">
                  Discover a curated network of top creative professionals. Browse portfolios, 
                  filter by specialization, and easily shortlist the perfect collaborators 
                  for your project needs.
                </p>
              </div>
            </details>
          </div>

          {/* Job Accordion Item */}
          <div className="   p-4 pr-10 rounded-3xl bg-gray-100 mt-6">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-semibold">Post Your Job in Minutes</span>
                </div>
                {/* <ChevronDown className="h-8 w-8 shrink-0 text-gray-400 transition-transform group-open:rotate-180" /> */}
                <img src="/arrow2.svg" alt="Chevron Down" className=" h-6 w-10  shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className=" pt-4 text-base">
                      <p className="text-gray-600 pl-[50px] md:pl-[300px]   text-xl md:text-2xl font-thin">
                  Create detailed job postings in just a few clicks. Specify your project requirements, 
                  timeline, and budget, then share it with our network of talented professionals.
                </p>
              </div>
            </details>
          </div>

          {/* Booking Accordion Item */}
          <div className="border-b border-gray-200 py-4 d-none ">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-semibold">Book and Manage Seamlessly</span>
                </div>
                {/* <ChevronDown className="h-8 w-8 shrink-0 text-gray-400 transition-transform group-open:rotate-180" /> */}
                <img src="/arrow2.svg" alt="Chevron Down" className=" h-6 w-10  shrink-0 text-gray-400 transition-transform group-open:rotate-180" />

              </summary>
              <div className="pl-12 pt-4 text-base">
                <p className="text-gray-600">
                  Coordinate schedules, manage contracts, and book talent all in one place. 
                  Our platform streamlines communication and project management, 
                  so you can focus on creating amazing work together.
                </p>
              </div>
            </details>
          </div>

          {/* Payment Accordion Item */}
          <div className="border-b border-gray-200 py-4 d-none ">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="text-xl md:text-2xl font-semibold">Payment Made Simple</span>
                </div>
                {/* <ChevronDown className="h-8 w-8 shrink-0 text-gray-400 transition-transform group-open:rotate-180" /> */}
                <img src="/arrow2.svg" alt="Chevron Down" className=" h-6 w-10  shrink-0 text-gray-400 transition-transform group-open:rotate-180" />

              </summary>
              <div className="pl-12 pt-4 text-base">
                <p className="text-gray-600">
                  Handle payments securely and efficiently within the platform. Set up milestones, 
                  release funds when work is approved, and maintain a clear record of all transactions.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export { WhySourcedSection };
export default WhySourcedSection; 