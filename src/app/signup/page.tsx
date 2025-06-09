"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { basicDetailsFields, creativeRoles, finalPhotographerFields, finalVehiclesFields, finalVideographerFields, type CreativeRole } from "@/components/signup/SignupFlow";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type FormData = Record<string, string | File[] | null>;

// Form container component
const FormContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("flex flex-col space-y-4 w-full", className)}>
      {children}
    </div>
  );
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<"userType" | "roleSelection" | "questions">("userType");
  const setUserType = useState<"agent" | "client" | "talent" | null>(null)[1];
  const [selectedRoles, setSelectedRoles] = useState<CreativeRole[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [currentRole, setCurrentRole] = useState<CreativeRole | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter roles based on search term
  const filteredRoles = creativeRoles.filter(role => 
    role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserTypeSelection = (type: "agent" | "client" | "talent") => {
    setUserType(type);
    if (type === "client") {
      // Client role not available yet
      return;
    }
    if (type === "agent" || type === "talent") {
      setStep("roleSelection");
    }
  };

const handleRoleToggle = (role: CreativeRole) => {
  console.log("Toggling role:", role);
  console.log("Selected roles before toggle:", selectedRoles);

  if (selectedRoles.includes(role)) {
    setSelectedRoles(selectedRoles.filter(r => r !== role));
  } else {
    const updatedRoles = [...selectedRoles, role];
    if (!updatedRoles.includes("Basic Details")) {
      updatedRoles.unshift("Basic Details");
    }
    setSelectedRoles(updatedRoles);
  }
};



  const handleRoleConfirm = () => {
    if (selectedRoles.length > 0) {
      setCurrentRole(selectedRoles[0]); // Start with the first role
      setStep("questions");
    }
   
  };

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file uploads
    const files = e.target.files ? Array.from(e.target.files) : [];
    console.log("File selected:", files);
  };

const handleSubmit = async ( ) => {
 
  
  console.log("Form submitted:", formData);

  try {
    const response = await fetch("https://api.sheetbest.com/sheets/fed5974d-ea39-40fd-8504-8118e38d5718", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log("✅ Form data submitted successfully");

      alert(
        "Thank you for submitting. Your profile is in review. We will email you if your application is successful / once it's public."
      );

      // Optional: reset form
      // setFormData(initialFormData); // make sure you have this defined

      // Optional: redirect after delay
      // router.push('/');
    } else {
      console.error("❌ Failed to submit form data");
      alert("There was a problem submitting your application. Please try again later.");
    }
  } catch (error) {
    console.error("🚨 Error submitting data:", error);
    alert("An error occurred. Please check your network and try again.");
  }
};


  const getFieldsForCurrentRole = () => {
    if (currentRole === "PHOTOGRAPHER") return finalPhotographerFields;
    if (currentRole === "VIDEOGRAPHER") return finalVideographerFields;
    if (currentRole === "VEHICLE OWNER") {
      return  finalVehiclesFields

    }
    if (currentRole === "Basic Details") {
      return  basicDetailsFields
    }
    return [];
  };

  // Fix the Form Event conversion
  const handleNextRole = () => {
    const currentIndex = selectedRoles.indexOf(currentRole!);
    if (currentIndex < selectedRoles.length - 1) {
      setCurrentRole(selectedRoles[currentIndex + 1]);
    } else {
      // All roles completed - just call handleSubmit directly
      console.log("Form submitted:", formData);
      handleSubmit()
      // Prepare data for submission
      
      
      // Show success message
      alert("Thank you for submitting. Your profile is in review. We will email you if your application is successful / once it's public.");
      
      // Redirect to home page
     // router.push('/');
    }
  };

  const goBack = () => {
    if (step === "roleSelection") {
      setStep("userType");
    } else if (step === "questions") {
      setStep("roleSelection");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white border-b border-gray-200 px-4 py-4 md:px-12 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push('/')}
            className="text-2xl md:text-3xl font-semibold tracking-wide uppercase"
          >
            Sourced
          </button>
          
          <div className="flex items-center">
            {/* Support Button */}
            {/* <button 
              onClick={() => window.open('mailto:support@sourced.com', '_blank')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Support"
            >
              <HelpCircle className="h-5 w-5 text-gray-700" />
            </button> */}
            
            {step !== "userType" && (
              <button 
                onClick={goBack}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-20 pb-20 px-4 md:px-12">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "userType" && (
              <motion.div
                key="userType"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-8"
              >
                <h1 className="text-3xl font-bold mb-6 text-center">Join As</h1>
                <p className="text-gray-600 mb-8 text-center max-w-md mx-auto">
                  I Am...
                </p>
                
                <div className="flex flex-col space-y-4 max-w-md mx-auto">
                  <button
                    onClick={() => handleUserTypeSelection("agent")}
                    className="w-full text-left py-4 px-5 border border-gray-300 rounded-xl hover:border-black hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-medium block">AGENT</span>
                        <span className="text-sm text-gray-500">Find and hire top talent/providers</span>
                      </div>
                      <div className="text-2xl">›</div>
                    </div>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => handleUserTypeSelection("talent")}
                      className="w-full text-left py-4 px-5 border border-gray-300 rounded-xl hover:border-black hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-medium block">TALENT/PROVIDER</span>
                          <span className="text-sm text-gray-500">Showcase your work and get hired</span>
                        </div>
                        <div className="text-2xl">›</div>
                      </div>
                    </button>
                  </div>
                  
                  <div className="relative">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="w-full text-left py-4 px-5 border border-gray-300 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-between"
                            disabled
                          >
                            <div>
                              <span className="text-xl font-medium block">CLIENT</span>
                              <span className="text-sm">Work with an agent to find talent</span>
                            </div>
                            <div className="flex items-center">
                              <HelpCircle className="h-5 w-5 text-gray-400 mr-2" />
                              <span className="text-2xl">›</span>
                            </div>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent 
                          className="backdrop-blur-sm text-black/60 bg-black/5 z-50 rounded-full"
                          side="top"
                        >
                          COMING SOON!
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  
                </div>
                
                {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 justify-center mt-12">
                  <button className="px-5 py-2 text-center bg-black text-white text-sm rounded-full font-semibold tracking-wider flex items-center justify-center">
                    <span className="mr-2">Login with Instagram</span>
                  </button>
                  <button className="px-5 py-2 text-center bg-black text-white text-sm rounded-full font-semibold tracking-wider flex items-center justify-center">
                    <span className="mr-2">Login with Google</span>
                  </button>
                </div> */}
              </motion.div>
            )}

            {step === "roleSelection" && (
              <motion.div
                key="roleSelection"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-8"
              >
                <h1 className="text-3xl font-bold mb-6 text-center">I&apos;m a...</h1>
                <p className="text-gray-600 mb-8 text-center max-w-md mx-auto">
                  Check what  applies to you
                </p>
                
                {/* Selected roles - pill tags */}
                {selectedRoles.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2 max-w-lg mx-auto">
                    {selectedRoles.map(role => (
                      ( role != "Basic Details" && <div
                        key={role}
                        className="inline-flex items-center rounded-full py-1.5 px-3 bg-gray-100 gap-1 border border-gray-200"
                      >
                        <span className="text-sm font-medium">{role}</span>
                        <button
                          onClick={() => handleRoleToggle(role)}
                          className="rounded-full w-5 h-5 inline-flex items-center justify-center hover:bg-gray-200"
                          aria-label={`Remove ${role}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>)
                    ))}
                  </div>
                )}
                
                {/* Search input */}
                <div className="relative mb-4 max-w-lg mx-auto">
                  <input
                    type="text"
                    placeholder="Search roles..."
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                
                {/* Role list */}
                <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-xl mb-6 max-w-lg mx-auto">
                  {filteredRoles.map((role) => (
                    <div
                      key={role}
                      className={`border-b border-gray-200 last:border-b-0 ${
                        role !== "PHOTOGRAPHER" && role !== "VIDEOGRAPHER" &&  role !== "VEHICLE OWNER" ? "opacity-50" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleRoleToggle(role)}
                        className={`w-full text-left py-3.5 px-4 flex items-center justify-between ${
                          selectedRoles.includes(role) ? "bg-black text-white" : "hover:bg-gray-50"
                        }`}
                        disabled={role !== "PHOTOGRAPHER" && role !== "VIDEOGRAPHER" && role !== "VEHICLE OWNER"}
                      >
                        <span className="text-base font-medium">{role}</span>
                        {selectedRoles.includes(role) && (
                          <Check className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleRoleConfirm}
                    disabled={selectedRoles.length === 0}
                    className={cn(
                      "py-3 px-8 bg-black text-white uppercase font-semibold tracking-wide rounded-lg",
                      selectedRoles.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800 transition-colors"
                    )}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === "questions" && currentRole && (
              <motion.div
                key={`questions-${currentRole}`}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="max-w-2xl mx-auto">
                  <h1 className="text-2xl font-bold uppercase mb-6 text-center">
                    {`${currentRole} Profile Information`}
                  </h1>
                  
                  {/* Role tabs */}
                  <div className="flex mb-6 border-b border-gray-200">
                   
                    {selectedRoles.map(role => (

                      <button
                        key={role}
                        className={`py-3 px-5 font-medium ${
                          currentRole === role 
                            ? "border-b-2 border-black text-black" 
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                        onClick={() => setCurrentRole(role)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  
                  {/* Form fields */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {getFieldsForCurrentRole().map((field) => (
                        <FormContainer key={field.name}>
                          <label 
                            htmlFor={field.name} 
                            className="block text-sm font-medium text-gray-700 uppercase tracking-wide"
                          >
                            {field.label} {field.isOptional && <span className="text-gray-400">(Optional)</span>}
                          </label>
                          
                          {field.type === "textarea" ? (
                            <textarea
                              id={field.name}
                              name={field.name}
                              placeholder={field.placeholder}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                            />
                          ) : field.type === "file" ? (
                            <div className="mt-1">
                              <label htmlFor={field.name} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {field.placeholder}
                                  </p>
                                </div>
                                <input 
                                  id={field.name} 
                                  name={field.name}
                                  type="file" 
                                  multiple
                                  className="hidden" 
                                  onChange={handleFileChange} 
                                />
                              </label>
                            </div>
                          )
                          :
                          field.type === "select" ? (
                            <select
                              id={field.name}
                              name={field.name}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                            >
                              {field.options?.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )
                          :
                          field.type === "group" ? (
                           <>
                           {field?.fields?.map(subField => (
                            <div key={subField.name} className="flex flex-col space-y-2">
                                <label 
                                  htmlFor={subField.name} 
                                  className="block text-sm font-medium text-gray-700 uppercase tracking-wide"
                                >
                                  {subField.label} {subField.isOptional && <span className="text-gray-400">(Optional)</span>}
                                </label>
                                
                                {subField.type === "textarea" ? (
                                  <textarea
                                    id={subField.name}
                                    name={subField.name}
                                    placeholder={subField.placeholder}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                                  />
                                ) : subField.type === "file" ? (
                                  <div className="mt-1">
                                    <label htmlFor={subField.name} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <p className="mb-2 text-sm text-gray-500">
                                          <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {subField.placeholder}
                                        </p>
                                      </div>
                                      <input 
                                        id={subField.name} 
                                        name={subField.name}
                                        type="file" 
                                        multiple
                                        className="hidden" 
                                        onChange={handleFileChange} 
                                      />
                                    </label>
                                  </div>
                                )
                                :
                                subField.type === "select" ? (
                                  <select
                                    id={subField.name}
                                    name={subField.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                                  >
                                    {subField.options?.map(option => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                )
                                :
                                (
                                  <input
                                    id={subField.name}
                                    name={subField.name}
                                    type={subField.type}
                                    placeholder={subField.placeholder}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                                  />
                                )}
                              </div>
                           ))}
                           </>
                          )
                           : (
                            <input
                              id={field.name}
                              name={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black focus:ring-1 focus:ring-black"
                            />
                          )}
                        </FormContainer>
                      ))}
                      
                      <div className="pt-4">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            required
                          />
                          <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                            I have read and accept the{" "}
                            <a href="#" className="underline font-semibold text-black">Privacy Policy</a>,{" "}
                            <a href="#" className="underline font-semibold text-black">Licensing Agreement</a> and all{" "}
                            <a href="#" className="underline font-semibold text-black">Terms and Conditions</a>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pt-6 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNextRole}
                          className="py-3 px-8 bg-black text-white uppercase font-semibold tracking-wide rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          {currentRole === selectedRoles[selectedRoles.length - 1] ? "Submit" : "Next"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
} 