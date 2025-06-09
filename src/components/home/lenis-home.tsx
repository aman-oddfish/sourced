/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDownLeft, Share2Icon, Twitter, Facebook, Linkedin, Copy, HelpCircle, Headset, ChevronDown, ArrowUpRight } from "lucide-react";
import { VelocityScroll } from '../magicui/scroll-based-velocity';
import { creato_display, GarmondI } from '../../../fonts';
import { DarkHoverButton, InteractiveHoverButton } from '../magicui/interactive-hover-button';
import { MorphingText } from '../magicui/morphing-text';
import { Timeline } from '../ui/timeline';
import { HowItWorksSection } from '../ui/timeline-home';
import { WordRotate } from '../magicui/word-rotate';
import { Footer } from '../footer';
import { AuroraText } from '../magicui/aurora-text';
import { ModelsSection } from './models';
import Header2 from '../header/header2';
import TextMask from '../ui/mask';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import SignupFlow from '../signup/SignupFlow';
import React, { lazy, Suspense } from 'react';
// Import the WhySourcedSection component lazily
const WhySourcedSection = lazy(() => import('./why-sourced').then(mod => ({ default: mod.WhySourcedSection })));

// Premium sticky scroll reveal animation variant
const stickyRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

const textVariants = {
  rest: { opacity: 1, x: 0 },
  hover: { opacity: 1, x: 0 },
};

const arrowVariants = {
  rest: { opacity: 0, x: -8, y: 8, rotate: 0 },
  hover: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const handleShare = async (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = "Check out Sourced - Find & Hire Top Creatives!";

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'clipboard':
        await navigator.clipboard.writeText(shareUrl);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
        break;
    }
  };

  // Modified Lenis scroll tracking to pause scrolling when modal is open
  const lenis = useLenis(({ scroll }) => {
    if (!modalOpen) {
      console.log("Scroll position:", scroll);
    }
  });

  React.useEffect(() => {
    if (modalOpen && lenis) {
      document.body.classList.add('modal-open');
      lenis.stop();
    } else if (lenis) {
      document.body.classList.remove('modal-open');
      lenis.start();
    }
  }, [modalOpen, lenis]);

  const models = [
    {
      name: "James Harrison",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      category: "PHOTOGRAPHER",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "NUXT3, GSAP, PRISMIC"
    },
    {
      name: "SUI HAN",
      image: "https://xcbbarwznolppjnnyxpf.supabase.co/storage/v1/object/public/public_images//m1.png",
      category: "MODEL",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "NUXT3, GSAP, THREEJS"
    },
    {
      name: "Kori Mato",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      category: "SOUND DESIGN",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "REACT, THREEJS"
    },
    {
      name: "ajay seth",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      category: "EXPERIMENTAL ART",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "NUXT3, GSAP, WEBGL"
    }
  ];

  useEffect(() => {
    const checkTawk = setInterval(() => {
      if (window.Tawk_API) {
        setIsLoaded(true);
        clearInterval(checkTawk);
      }
    }, 500);
    return () => clearInterval(checkTawk);
  }, []);

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
    }
  };
    

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 100); // adjust scroll trigger
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <ReactLenis root options={{ gestureOrientation: 'vertical', smoothWheel: !modalOpen, touchMultiplier: modalOpen ? 0 : 1 }}>
      <div className={`relative min-h-screen ${modalOpen ? 'pointer-events-none' : ''}`}>
        {/* Subtle texture background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('http://www.transparenttextures.com/patterns/noisy.png')",
            backgroundRepeat: "repeat",
            opacity: 0.28,
          }}
        />

        <main className={`bg-white text-black min-h-screen  ${creato_display.className}`} >
          <div className="max-w-screen mx-auto">

            {/* Default Header */}
            
           {!showStickyHeader &&  <header
               className="flex justify-between items-center py-6   md:px-12 px-4  z-50   fixed top-0 left-0 w-full backdrop-blur-md"
                
               
             >
               <h1 className="text-2xl md:text-3xl font-semibold tracking-wide uppercase">
                 SOURCED
               </h1>
               
               
               
               <div className="flex items-center space-x-4">
               <div className="hidden md:flex items-center space-x-8">
                 <nav className="bg-white bg-opacity-90 backdrop-blur-md rounded-md px-6 py-2 flex space-x-6">
                   {/* How It Works Dropdown */}
                   <div className="static group">
                     <button className="flex items-center text-black-500 group-hover:text-black transition-colors text-sm md:text-sm font-semibold tracking-wide uppercase">
                       HOW IT WORKS 
                       {/* <ChevronDown className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180" /> */}
                     </button>
                     
                     {/* Full-width dropdown - simplified list style */}
                     <div className="absolute left-0 top-full w-full bg-white z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border-t border-gray-200 transform translate-y-0">
                       <div className="max-w-screen mx-auto">
                         <div className="w-full flex flex-col">
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             For Talent
                           </a>
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             For Agents
                           </a>
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Pricing
                           </a>
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Security
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* Company Dropdown */}
                   <div className="static group">
                     <button className="flex items-center text-sm md:text-sm font-semibold tracking-wide uppercase text-black-500 group-hover:text-black transition-colors">
                       COMPANY 
                       {/* <ChevronDown className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180" /> */}
                     </button>
                     
                     {/* Full-width dropdown - simplified list style */}
                     <div className="absolute left-0 top-full w-full bg-white z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border-t border-gray-200 transform translate-y-0">
                       <div className="max-w-screen mx-auto">
                         <div className="w-full flex flex-col">
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             About
                           </a>
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Information
                           </a>
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Team
                           </a>
                           <a href="#" className="w-full text-1xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Careers
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* Legal Dropdown */}
                   <div className="static group d-none">
                     <button className="flex items-center text-2xl md:text-3xl font-semibold tracking-wide uppercase text-gray-500 group-hover:text-black transition-colors">
                       LEGAL(3)
                       {/* <ChevronDown className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180" /> */}
                     </button>
                     
                     {/* Full-width dropdown - simplified list style */}
                     <div className="absolute left-0 top-full w-full bg-white z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border-t border-gray-200 transform translate-y-0">
                       <div className="max-w-screen mx-auto">
                         <div className="w-full flex flex-col">
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Terms & Conditions
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Privacy Policy
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Licensing
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* <a href='#' className="text-sm font-medium text-gray-500 hover:text-black transition-colors">CONTACT</a> */}
                 </nav>
               </div>
                 
                 {/* Support Button */}
                 <button 
                   // onClick={() => window.open('mailto:support@sourced.com', '_blank')}
                   className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                   aria-label="Support"
                   onClick={openChat}
                   disabled={!isLoaded}
                 >
                   <Headset className="h-6 w-6 text-gray-700  rounded-full p-1" />
                 </button>
                 
                 <InteractiveHoverButton className='uppercase md:hidden ml-4' onClick={() => setShowPopup(!showPopup)}>
                   Menu
                 </InteractiveHoverButton>
                 {showPopup && (
                   <div className="absolute right-0 mt-2 w-48 bg-[#EAE7E3] shadow-lg rounded-lg p-4 z-10">
                     <p className="text-gray-700">More features coming soon!</p>
                   </div>
                 )}
               </div>
             </header>}

             {/* Sticky Header */}
            { showStickyHeader &&  <motion.header
               className="flex justify-between items-center py-6   md:px-12 px-4  z-50   fixed top-0 left-0 w-full backdrop-blur-md"
               
               whileInView="visible"
               variants={stickyRevealVariants}
               viewport={{ once: true, amount: 0.2 }}
               initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
             >
               <div className='innerHeader flex items-center justify-between 
               border-b border-black
               pb-4 md:pb-4    
               w-full'>
                     <h1 className="text-2xl md:text-3xl font-semibold tracking-wide uppercase">
                 O
               </h1>
               
               
               
               <div className="flex items-center space-x-4">
               <div className="hidden md:flex items-center space-x-8">
                 <nav className="  bg-opacity-50 backdrop-blur-md   px-6 py-2 flex space-x-6">
                   {/* How It Works Dropdown */}
                   <div className="static group">
                     <button className="flex items-center text-black-500 group-hover:text-black transition-colors text-sm md:text-sm font-semibold tracking-wide uppercase">
                       HOW IT WORKS 
                       {/* <ChevronDown className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180" /> */}
                     </button>
                     
                     {/* Full-width dropdown - simplified list style */}
                     <div className="absolute left-0 top-full w-full bg-white z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border-t border-gray-200 transform translate-y-0">
                       <div className="max-w-screen mx-auto">
                         <div className="w-full flex flex-col">
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             For Talent
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             For Agents
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Pricing
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Security
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* Company Dropdown */}
                   <div className="static group">
                     <button className="flex items-center text-sm md:text-sm font-semibold tracking-wide uppercase text-black-500 group-hover:text-black transition-colors">
                       COMPANY 
                       {/* <ChevronDown className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180" /> */}
                     </button>
                     
                     {/* Full-width dropdown - simplified list style */}
                     <div className="absolute left-0 top-full w-full bg-white z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border-t border-gray-200 transform translate-y-0">
                       <div className="max-w-screen mx-auto">
                         <div className="w-full flex flex-col">
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             About
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Information
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Team
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Careers
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* Legal Dropdown */}
                   <div className="static group d-none">
                     <button className="flex items-center text-2xl md:text-3xl font-semibold tracking-wide uppercase text-gray-500 group-hover:text-black transition-colors">
                       LEGAL(3)
                       {/* <ChevronDown className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:rotate-180" /> */}
                     </button>
                     
                     {/* Full-width dropdown - simplified list style */}
                     <div className="absolute left-0 top-full w-full bg-white z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 border-t border-gray-200 transform translate-y-0">
                       <div className="max-w-screen mx-auto">
                         <div className="w-full flex flex-col">
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Terms & Conditions
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Privacy Policy
                           </a>
                           <a href="#" className="w-full text-4xl font-bold hover:text-black text-black py-6 border-b border-gray-200 px-12 hover:bg-gray-50 transition-colors">
                             Licensing
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                   
                   {/* <a href='#' className="text-sm font-medium text-gray-500 hover:text-black transition-colors">CONTACT</a> */}
                 </nav>
               </div>
                 
                 {/* Support Button */}
                 <button 
                   // onClick={() => window.open('mailto:support@sourced.com', '_blank')}
                   className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                   aria-label="Support"
                   onClick={openChat}
                   disabled={!isLoaded}
                 >
                   <Headset className="h-6 w-6 text-gray-700  rounded-full p-1" />
                 </button>
                 
                 <InteractiveHoverButton className='uppercase md:hidden ml-4' onClick={() => setShowPopup(!showPopup)}>
                   Menu
                 </InteractiveHoverButton>
                 {showPopup && (
                   <div className="absolute right-0 mt-2 w-48 bg-[#EAE7E3] shadow-lg rounded-lg p-4 z-10">
                     <p className="text-gray-700">More features coming soon!</p>
                   </div>
                 )}
               </div>
               </div>
             </motion.header>}

            {/* Hero Section */}
            <motion.section
              className="relative flex flex-col items-center justify-center h-[80vh] md:h-screen w-full text-center"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-[80vh] md:h-screen">
                <Image
                  src="/image.png"
                  alt="Creative Network"
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
                <VelocityScroll
                  numRows={1}
                  defaultVelocity={0.8}
                  className={`absolute bottom-20 text-2xl text-[#c0c0c0] tracking-normal font-thin italic ${GarmondI.className}`}
                >
                  Launching Soon.
                </VelocityScroll>
              </div>
              {/* Hero Content */}
              <div className="relative z-10">
                <h2 className="text-3xl md:text-6xl font-bold leading-tight tracking-wide text-white uppercase text-center">
                Manage. Book. Create.
                </h2>
                <MorphingText
                  className='text-center uppercase tracking-wide text-white'
                  texts={["Photographer",
                          "Videographer",
                          "VEHICLE OWNER",
                          "MODEL",
                          "INFLUENCER",
                          "ACTOR",
                          "STYLIST",
                          "HAIR STYLIST",
                          "MAKEUP ARTIST",
                          "EQUIPTMENT",
                          "LOCATION",
                          "OTHER"]}
                />
                <p className={`text-lg md:text-xl text-gray-500 -translate-y-5 ${GarmondI.className}`}>
                Sourced simplifies creative connections
                </p>
                {/* CTA Buttons */}
                <div className="flex items-center justify-center mt-8">
                  <div className="w-full max-w-xs md:max-w-none flex justify-center">
                    <SignupFlow onOpenChange={setModalOpen} />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Why Sourced Section */}
            
            <motion.section
              className="w-full py-12 pb-0"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <WhySourcedSection />
              </Suspense>
            </motion.section>

            {/* Models Section */}
            {/* <motion.section
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ModelsSection models={models} />
            </motion.section> */}

            {/* How It Works */}
            {/* <motion.section
              className="flex justify-center w-full py-12"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="max-w-5xl w-full">
                <HowItWorksSection />
              </div>
            </motion.section> */}

            

            {/* Join Now Drawer */}
            <motion.div
              className='flex w-full items-center justify-center gap-2'
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* <SignupFlow onOpenChange={setModalOpen} /> */}
              
              <Drawer>
                <DrawerTrigger>
                  <div className="group relative w-auto cursor-pointer overflow-hidden rounded-full  p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter">
                    <div className="flex items-center justify-center text-center gap-2">
                      {/* <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:-translate-x-20 md:group-hover:-translate-x-10"></div> */}
                      <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-black">
                        <Share2Icon className="h-8 w-8"/>
                      </span>
                    </div>
                    <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-black opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                      {/* <span>Share </span> */}
                      <Share2Icon className="h-8 w-8"/>
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-screen-md p-6">
                    <DrawerTitle className="text-center mt-4">Share Sourced</DrawerTitle>
                    <DrawerDescription className="text-center mt-2">
                      Share this platform with your network
                    </DrawerDescription>
                    <div className="flex flex-col gap-4 mt-6">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Share on Twitter
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>Twitter</span>
                          <Twitter className="h-4 w-4"/>
                        </div>
                      </button>

                      <button
                        onClick={() => handleShare('facebook')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Share on Facebook
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>Facebook</span>
                          <Facebook className="h-4 w-4"/>
                        </div>
                      </button>

                      <button
                        onClick={() => handleShare('linkedin')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Share on LinkedIn
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>LinkedIn</span>
                          <Linkedin className="h-4 w-4"/>
                        </div>
                      </button>

                      <button
                        onClick={() => handleShare('clipboard')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Copy Link
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>Copy</span>
                          <Copy className="h-4 w-4"/>
                        </div>
                      </button>
                      
                      {showShareSuccess && (
                        <div className="text-center text-green-600 mt-2">
                          Link copied to clipboard!
                        </div>
                      )}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </motion.div>

            {/* Footer */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Footer />
            </motion.section>

          </div>
        </main>
      </div>
    </ReactLenis>
  );
}
