/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { useState } from "react";
import { ArrowDownLeft, Share2Icon, Twitter, Facebook, Linkedin, Copy } from "lucide-react";
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
import SignupFormDemo from '../signup-form-demo';
import React from 'react';

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

  // Lenis scroll tracking
  useLenis(({ scroll }) => {
    console.log("Scroll position:", scroll);
  });

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

  return (
    <ReactLenis root>
      <div className="relative min-h-screen">
        {/* Subtle texture background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('http://www.transparenttextures.com/patterns/noisy.png')",
            backgroundRepeat: "repeat",
            opacity: 0.28,
          }}
        />

        <main className={`bg-white text-black min-h-screen overflow-hidden ${creato_display.className}`} >
          <div className="max-w-screen mx-auto px-4 md:px-12">

            {/* Header */}
            <motion.header
              className="flex justify-between items-center py-6 border-b border-gray-400"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h1 className="text-2xl md:text-3xl font-semibold tracking-wide uppercase">
                Sourced
              </h1>
              <div className="relative flex justify-end">
                <nav className="text-2xl font-bold md:flex items-center space-x-3 hidden uppercase">
                  <a href='#' className="text-gray-500">How it works,</a>
                  <a href='#' className="text-gray-500">Company(2),</a>
                  <a href='#' className="text-gray-900">legal,</a>
                  <a href='#' className="text-gray-500">CONTACT</a>
                </nav>
                <InteractiveHoverButton className='uppercase md:hidden' onClick={() => setShowPopup(!showPopup)}>
                  Menu
                </InteractiveHoverButton>
                {showPopup && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#EAE7E3] shadow-lg rounded-lg p-4 z-10">
                    <p className="text-gray-700">More features coming soon!</p>
                  </div>
                )}
              </div>
            </motion.header>

            {/* Hero Section */}
            <motion.section
              className="relative flex flex-col items-center justify-center h-[80vh] md:h-screen w-full text-center px-6 md:px-12"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-[80vh] md:h-screen">
                <Image
                  src="https://images.pexels.com/photos/27914238/pexels-photo-27914238/free-photo-of-portrait-of-woman-lying-down-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=900&h=600&dpr=2"
                  alt="Creative Network"
                  fill
                  style={{ objectFit: "cover" }}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-lg"></div>
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
                  Find & Hire Top
                </h2>
                <MorphingText
                  className='text-center uppercase tracking-wide text-white'
                  texts={["Influencers", "Photographers"]}
                />
                <p className={`text-lg md:text-xl text-gray-300 italic -translate-y-5 ${GarmondI.className}`}>
                  Sign up as a creative or provider
                </p>
                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-6 mt-0 md:mt-8">
                  <Drawer>
                    <DrawerTrigger>
                      <div
                        className="group relative w-auto cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:-translate-x-20 md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Get Early Access
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-primary-foreground opacity-0 transition-all duration-700 group-hover:-translate-x-5 group-hover:opacity-100">
                          <span>Get Early Access</span>
                        </div>
                      </div>
                    </DrawerTrigger>
                    <DrawerContent>
                      <div className="mx-auto w-full max-w-screen-md ">
                        <DrawerTitle className='text-center mt-4'>Sign Up & Get Early Access</DrawerTitle>
                        <DrawerDescription className='text-center mt-2'>Enter you details below or Connect your socials</DrawerDescription>
                        <SignupFormDemo />
                      </div>
                    </DrawerContent>
                  </Drawer>

                  <button
                    className="hidden md:block bg-gray-300 text-gray-600 md:px-8 py-4 rounded-full text-xs md:text-lg relative font-semibold tracking-widest uppercase"
                    disabled
                  >
                    Join as Provider
                    <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-400 text-gray-700 text-xs rounded-full opacity-0 hover:opacity-100 transition">
                      Coming Soon
                    </span>
                  </button>
                </div>
              </div>
            </motion.section>

            {/* Models Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ModelsSection models={models} />
            </motion.section>

            {/* How It Works */}
            <motion.section
              className="flex justify-center w-full py-12"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="max-w-5xl w-full">
                <HowItWorksSection />
              </div>
            </motion.section>

            {/* Join Now Drawer */}
            <motion.div
              className='flex w-full items-center justify-center gap-2'
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Drawer>
                <DrawerTrigger>
                  <div
                    className="group relative w-auto cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                  >
                    <div className="flex items-center justify-center text-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:-translate-x-20 md:group-hover:-translate-x-10"></div>
                      <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                        Join Now
                      </span>
                    </div>
                    <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-primary-foreground opacity-0 transition-all duration-700 group-hover:-translate-x-5 group-hover:opacity-100">
                      <span>Join now</span>
                      <ArrowDownLeft className="h-4 w-4"/>
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-screen-md ">
                    <DrawerTitle className='text-center mt-4'>Sign Up & Get Early Access</DrawerTitle>
                    <DrawerDescription className='text-center mt-2'>Enter you details below or Connect your socials</DrawerDescription>
                    <SignupFormDemo />
                  </div>
                </DrawerContent>
              </Drawer>
              <Drawer>
                <DrawerTrigger>
                  <div className="group relative w-auto cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter">
                    <div className="flex items-center justify-center text-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:-translate-x-20 md:group-hover:-translate-x-10"></div>
                      <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                        Share
                      </span>
                    </div>
                    <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-primary-foreground opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                      <span>Share </span>
                      <Share2Icon className="h-4 w-4"/>
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
