
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Plane, Ticket, Users, CreditCard, Check, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProgressIndicator from "./ProgressIndicator";
import SectionHeading from "./SectionHeading";
import PersonalInfoSection from "./form-sections/PersonalInfoSection";
import TravelSection from "./form-sections/TravelSection";
import TicketsSection from "./form-sections/TicketsSection";
import CompanionsSection from "./form-sections/CompanionsSection";
import PaymentSection from "./form-sections/PaymentSection";
import ValidationSection from "./form-sections/ValidationSection";
import FormHeader from "./FormHeader";

type FormSectionType = 
  | "personal" 
  | "travel" 
  | "tickets" 
  | "companions" 
  | "payment" 
  | "validation";

const TOTAL_SECTIONS = 6;

const RegistrationForm = () => {
  const [currentSection, setCurrentSection] = useState<FormSectionType>("personal");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    birthDate: "",
    gender: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
    phone: "",
    email: "",
    address: "",
    supportedTeam: false,
    teamName: "",
    
    // Travel
    needVisa: false,
    needPassport: false,
    needInsurance: false,
    otherAssistance: "",
    departureCity: "Abidjan",
    otherDepartureCity: "",
    arrivalDate: "",
    departureDate: "",
    cities: [] as string[],
    otherCity: "",
    transportOptions: [] as string[],
    accommodationOptions: [] as string[],
    additionalServices: [] as string[],
    
    // Tickets
    matchPhases: [] as string[],
    ticketCategory: "",
    supporterPack: [] as string[],
    jerseySize: "",
    
    // Companions
    hasCompanions: false,
    companions: [] as any[],
    
    // Payment
    paymentMethod: "",
    installmentPlan: "",
    documents: [] as string[],
    
    // Validation
    termsAccepted: false,
    wantsAlerts: false,
    signature: "",
    date: ""
  });
  
  const updateFormData = (section: FormSectionType, data: any) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };
  
  const goToNextSection = () => {
    const sections: FormSectionType[] = ["personal", "travel", "tickets", "companions", "payment", "validation"];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setCurrentSection(nextSection);
      setCurrentStepIndex(currentIndex + 1);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goToPreviousSection = () => {
    const sections: FormSectionType[] = ["personal", "travel", "tickets", "companions", "payment", "validation"];
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1];
      setCurrentSection(prevSection);
      setCurrentStepIndex(currentIndex - 1);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleSubmit = () => {
    // This would normally submit the form data to a backend
    console.log("Form submitted with data:", formData);
    
    toast({
      title: "Inscription réussie!",
      description: "Votre inscription à la CAN 2025 a été enregistrée avec succès.",
    });
    
    // Reset form or redirect
  };
  
  // Animation variants for page transitions
  const pageVariants = {
    initial: { 
      opacity: 0,
      x: 20
    },
    in: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    out: { 
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-morocco-sand/30 pb-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-morocco-pattern opacity-5 pointer-events-none"></div>
      
      {/* Progress indicator */}
      <ProgressIndicator steps={TOTAL_SECTIONS} currentStep={currentStepIndex} />
      
      <div className="container max-w-3xl mx-auto px-4 pt-8">
        <FormHeader />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
          >
            {currentSection === "personal" && (
              <div className="form-section">
                <SectionHeading 
                  number={1}
                  title="INFORMATIONS PERSONNELLES"
                  icon={<User size={18} className="text-morocco-red" />}
                />
                <PersonalInfoSection 
                  formData={formData}
                  updateFormData={(data) => updateFormData("personal", data)}
                  onNext={goToNextSection}
                />
              </div>
            )}
            
            {currentSection === "travel" && (
              <div className="form-section">
                <SectionHeading 
                  number={2}
                  title="ORGANISATION DU SÉJOUR"
                  icon={<Plane size={18} className="text-morocco-green" />}
                />
                <TravelSection 
                  formData={formData}
                  updateFormData={(data) => updateFormData("travel", data)}
                  onNext={goToNextSection}
                  onPrevious={goToPreviousSection}
                />
              </div>
            )}
            
            {currentSection === "tickets" && (
              <div className="form-section">
                <SectionHeading 
                  number={3}
                  title="BILLETTERIE & EXPÉRIENCE SUPPORTER"
                  icon={<Ticket size={18} className="text-morocco-gold" />}
                />
                <TicketsSection 
                  formData={formData}
                  updateFormData={(data) => updateFormData("tickets", data)}
                  onNext={goToNextSection}
                  onPrevious={goToPreviousSection}
                />
              </div>
            )}
            
            {currentSection === "companions" && (
              <div className="form-section">
                <SectionHeading 
                  number={4}
                  title="PERSONNES ACCOMPAGNANTES"
                  icon={<Users size={18} className="text-morocco-red" />}
                />
                <CompanionsSection 
                  formData={formData}
                  updateFormData={(data) => updateFormData("companions", data)}
                  onNext={goToNextSection}
                  onPrevious={goToPreviousSection}
                />
              </div>
            )}
            
            {currentSection === "payment" && (
              <div className="form-section">
                <SectionHeading 
                  number={5}
                  title="MODALITÉS DE PAIEMENT"
                  icon={<CreditCard size={18} className="text-morocco-green" />}
                />
                <PaymentSection 
                  formData={formData}
                  updateFormData={(data) => updateFormData("payment", data)}
                  onNext={goToNextSection}
                  onPrevious={goToPreviousSection}
                />
              </div>
            )}
            
            {currentSection === "validation" && (
              <div className="form-section">
                <SectionHeading 
                  number={6}
                  title="VALIDATION"
                  icon={<Check size={18} className="text-morocco-gold" />}
                />
                <ValidationSection 
                  formData={formData}
                  updateFormData={(data) => updateFormData("validation", data)}
                  onSubmit={handleSubmit}
                  onPrevious={goToPreviousSection}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Important notes */}
        <div className="mt-10 p-6 glass-card">
          <div className="flex items-start">
            <Info size={24} className="text-morocco-red mr-4 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-lg mb-2">NOTES IMPORTANTES</h4>
              <ul className="space-y-2 text-sm">
                <li>• Ce formulaire sera la première phase dans la conception, puisqu'il s'agira d'informer les voyageurs à chaque étape de l'organisation</li>
                <li>• Inscription particulière pour les entreprises, associations et autres (valable pour une population ≥10)</li>
                <li>• Les demandes de visa doivent être soumises au moins 90 jours avant le départ</li>
                <li>• Options premium (chambre single/guide) soumises à disponibilité</li>
                <li>• Contact: <a href="mailto:destination_can2025@gmail.com" className="text-morocco-green hover:underline">destination_can2025@gmail.com</a> / <a href="tel:+2250173800000" className="text-morocco-green hover:underline">+225 017 380 0000</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
