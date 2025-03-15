
import { useState, ChangeEvent } from "react";
import { Check, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface ValidationSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onSubmit: () => void;
  onPrevious: () => void;
}

const ValidationSection = ({ formData, updateFormData, onSubmit, onPrevious }: ValidationSectionProps) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    
    if (type === 'checkbox') {
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
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Vous devez accepter les conditions générales de vente";
    }
    
    if (!formData.signature?.trim()) {
      newErrors.signature = "Veuillez signer le formulaire";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Set today's date if not already set
      if (!formData.date) {
        updateFormData({ date: new Date().toISOString() });
      }
      onSubmit();
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 md:p-6 rounded-xl mb-6">
        <h4 className="font-semibold text-lg mb-4">Récapitulatif</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="validation-info-block">
            <h5 className="font-semibold">Informations personnelles</h5>
            <p>{formData.fullName}</p>
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
            <p>{formData.nationality}</p>
          </div>
          
          <div className="validation-info-block">
            <h5 className="font-semibold">Voyage</h5>
            <p>
              {formData.departureCity === 'Autre' 
                ? formData.otherDepartureCity
                : formData.departureCity
              }
            </p>
            <p>
              {formData.arrivalDate && format(new Date(formData.arrivalDate), "dd/MM/yyyy")} - 
              {formData.departureDate && format(new Date(formData.departureDate), "dd/MM/yyyy")}
            </p>
            <p>
              Villes: {formData.cities?.join(', ')}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted || false}
              onChange={handleInputChange}
              className={`rounded text-morocco-gold focus:ring-morocco-gold ${errors.termsAccepted ? 'border-red-500' : ''}`}
            />
            <label htmlFor="termsAccepted" className="ml-2">
              J'accepte les conditions générales de vente
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-500 text-xs mt-1 error-message">{errors.termsAccepted}</p>}
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="wantsAlerts"
              name="wantsAlerts"
              checked={formData.wantsAlerts || false}
              onChange={handleInputChange}
              className="rounded text-morocco-gold focus:ring-morocco-gold"
            />
            <label htmlFor="wantsAlerts" className="ml-2">
              Je souhaite recevoir les alertes matchs/offres exclusives
            </label>
          </div>
        </div>
        
        <div className="form-input-wrapper">
          <label htmlFor="signature" className="form-label">
            Signature électronique
          </label>
          <input
            type="text"
            id="signature"
            name="signature"
            value={formData.signature || ''}
            onChange={handleInputChange}
            className={`form-input ${errors.signature ? 'border-red-500' : ''}`}
            placeholder="Tapez votre nom complet"
          />
          {errors.signature && <p className="text-red-500 text-xs mt-1 error-message">{errors.signature}</p>}
        </div>
        
        <div className="mt-4 p-4 bg-morocco-red/10 rounded-lg">
          <div className="flex">
            <AlertTriangle size={20} className="text-morocco-red mr-2 flex-shrink-0" />
            <p className="text-sm">
              En validant ce formulaire, vous confirmez l'exactitude des informations fournies. 
              Un conseiller vous contactera dans les plus brefs délais pour finaliser votre réservation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="morocco-button-secondary"
          onClick={onPrevious}
        >
          Précédent
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="morocco-button"
          onClick={handleSubmit}
        >
          Valider mon inscription
        </motion.button>
      </div>
    </div>
  );
};

export default ValidationSection;
