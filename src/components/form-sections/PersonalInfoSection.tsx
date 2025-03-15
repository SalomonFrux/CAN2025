
import { useState, ChangeEvent } from "react";
import { User, Calendar, Flag, Passport, Phone, Mail, MapPin, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PersonalInfoSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

const PersonalInfoSection = ({ formData, updateFormData, onNext }: PersonalInfoSectionProps) => {
  const [date, setDate] = useState<Date | undefined>(formData.birthDate ? new Date(formData.birthDate) : undefined);
  const [passportExpiryDate, setPassportExpiryDate] = useState<Date | undefined>(formData.passportExpiry ? new Date(formData.passportExpiry) : undefined);
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      updateFormData({ [name]: checked });
    } else {
      updateFormData({ [name]: value });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Veuillez saisir votre nom complet";
    }
    
    if (!date) {
      newErrors.birthDate = "Veuillez sélectionner votre date de naissance";
    }
    
    if (!formData.gender) {
      newErrors.gender = "Veuillez sélectionner votre sexe";
    }
    
    if (!formData.nationality?.trim()) {
      newErrors.nationality = "Veuillez saisir votre nationalité";
    }
    
    if (!formData.passportNumber?.trim()) {
      newErrors.passportNumber = "Veuillez saisir votre numéro de passeport";
    }
    
    if (!passportExpiryDate) {
      newErrors.passportExpiry = "Veuillez sélectionner la date d'expiration de votre passeport";
    }
    
    if (!formData.phone?.trim()) {
      newErrors.phone = "Veuillez saisir votre numéro de téléphone";
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = "Veuillez saisir votre adresse email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Veuillez saisir une adresse email valide";
    }
    
    if (!formData.address?.trim()) {
      newErrors.address = "Veuillez saisir votre adresse";
    }
    
    // If supportedTeam is checked, teamName is required
    if (formData.supportedTeam && !formData.teamName?.trim()) {
      newErrors.teamName = "Veuillez saisir le nom de l'équipe supportée";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateForm()) {
      onNext();
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-4">
      <motion.div 
        className="form-input-wrapper"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="fullName" className="form-label">
          Nom complet
        </label>
        <div className="relative">
          <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName || ''}
            onChange={handleInputChange}
            className={`form-input pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
            placeholder="Entrez votre nom complet"
          />
        </div>
        {errors.fullName && <p className="text-red-500 text-xs mt-1 error-message">{errors.fullName}</p>}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="form-input-wrapper"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="birthDate" className="form-label">
            Date de naissance
          </label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full pl-10 justify-start text-left font-normal ${errors.birthDate ? 'border-red-500' : ''}`}
                >
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {date ? (
                    format(date, "dd/MM/yyyy")
                  ) : (
                    <span className="text-gray-400">Sélectionnez votre date de naissance</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    updateFormData({ birthDate: date ? date.toISOString() : "" });
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          {errors.birthDate && <p className="text-red-500 text-xs mt-1 error-message">{errors.birthDate}</p>}
        </motion.div>
        
        <motion.div 
          className="form-input-wrapper"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <label className="form-label">Sexe</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Homme"
                checked={formData.gender === "Homme"}
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-morocco-red"
              />
              <span className="ml-2">Homme</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Femme"
                checked={formData.gender === "Femme"}
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-morocco-red"
              />
              <span className="ml-2">Femme</span>
            </label>
          </div>
          {errors.gender && <p className="text-red-500 text-xs mt-1 error-message">{errors.gender}</p>}
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="form-input-wrapper"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="nationality" className="form-label">
            Nationalité
          </label>
          <div className="relative">
            <Flag size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality || ''}
              onChange={handleInputChange}
              className={`form-input pl-10 ${errors.nationality ? 'border-red-500' : ''}`}
              placeholder="Entrez votre nationalité"
            />
          </div>
          {errors.nationality && <p className="text-red-500 text-xs mt-1 error-message">{errors.nationality}</p>}
        </motion.div>
        
        <motion.div 
          className="form-input-wrapper" 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <label htmlFor="passportNumber" className="form-label">
            Numéro de passeport
          </label>
          <div className="relative">
            <Passport size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="passportNumber"
              name="passportNumber"
              value={formData.passportNumber || ''}
              onChange={handleInputChange}
              className={`form-input pl-10 ${errors.passportNumber ? 'border-red-500' : ''}`}
              placeholder="Entrez votre numéro de passeport"
            />
          </div>
          {errors.passportNumber && <p className="text-red-500 text-xs mt-1 error-message">{errors.passportNumber}</p>}
        </motion.div>
      </div>
      
      <motion.div 
        className="form-input-wrapper"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <label htmlFor="passportExpiry" className="form-label">
          Expiration passeport (valide 6 mois après le départ)
        </label>
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full pl-10 justify-start text-left font-normal ${errors.passportExpiry ? 'border-red-500' : ''}`}
              >
                <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {passportExpiryDate ? (
                  format(passportExpiryDate, "dd/MM/yyyy")
                ) : (
                  <span className="text-gray-400">Sélectionnez la date d'expiration</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={passportExpiryDate}
                onSelect={(date) => {
                  setPassportExpiryDate(date);
                  updateFormData({ passportExpiry: date ? date.toISOString() : "" });
                }}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        {errors.passportExpiry && <p className="text-red-500 text-xs mt-1 error-message">{errors.passportExpiry}</p>}
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="form-input-wrapper"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          <label htmlFor="phone" className="form-label">
            Téléphone/WhatsApp
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              className={`form-input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="+XXX XXXXXXXX"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1 error-message">{errors.phone}</p>}
        </motion.div>
        
        <motion.div 
          className="form-input-wrapper"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="exemple@email.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1 error-message">{errors.email}</p>}
        </motion.div>
      </div>
      
      <motion.div 
        className="form-input-wrapper"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.9 }}
      >
        <label htmlFor="address" className="form-label">
          Adresse (Ville/Pays)
        </label>
        <div className="relative">
          <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleInputChange}
            className={`form-input pl-10 ${errors.address ? 'border-red-500' : ''}`}
            placeholder="Ville, Pays"
          />
        </div>
        {errors.address && <p className="text-red-500 text-xs mt-1 error-message">{errors.address}</p>}
      </motion.div>
      
      <motion.div 
        className="form-input-wrapper"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        <label className="form-label">
          Équipe supportée
        </label>
        <div className="flex items-center mb-2">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="supportedTeam"
              checked={formData.supportedTeam === true}
              onChange={() => updateFormData({ supportedTeam: true })}
              className="form-radio h-4 w-4 text-morocco-red"
            />
            <span className="ml-2">Oui</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="supportedTeam"
              checked={formData.supportedTeam === false}
              onChange={() => updateFormData({ supportedTeam: false })}
              className="form-radio h-4 w-4 text-morocco-red"
            />
            <span className="ml-2">Non</span>
          </label>
        </div>
        
        {formData.supportedTeam && (
          <div className="relative mt-2">
            <UserCheck size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName || ''}
              onChange={handleInputChange}
              className={`form-input pl-10 ${errors.teamName ? 'border-red-500' : ''}`}
              placeholder="Laquelle?"
            />
            {errors.teamName && <p className="text-red-500 text-xs mt-1 error-message">{errors.teamName}</p>}
          </div>
        )}
      </motion.div>
      
      <div className="mt-8 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="morocco-button"
          onClick={handleNext}
        >
          Suivant
        </motion.button>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
