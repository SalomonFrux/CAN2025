
import { useState, ChangeEvent } from "react";
import { Users, UserPlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CompanionsSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CompanionsSection = ({ formData, updateFormData, onNext, onPrevious }: CompanionsSectionProps) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox' || type === 'radio') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name === 'hasCompanions') {
        updateFormData({ hasCompanions: checked });
        
        // If unchecked, clear companions list
        if (!checked) {
          updateFormData({ companions: [] });
        }
      }
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
  
  const handleCompanionChange = (index: number, field: string, value: any) => {
    const updatedCompanions = [...formData.companions];
    updatedCompanions[index] = {
      ...updatedCompanions[index],
      [field]: value
    };
    
    updateFormData({ companions: updatedCompanions });
  };
  
  const addCompanion = () => {
    const newCompanion = {
      fullName: "",
      birthDate: "",
      gender: "",
      nationality: "",
      phone: "",
      email: "",
      address: "",
      relation: ""
    };
    
    updateFormData({ 
      companions: [...(formData.companions || []), newCompanion]
    });
  };
  
  const removeCompanion = (index: number) => {
    const updatedCompanions = [...formData.companions];
    updatedCompanions.splice(index, 1);
    updateFormData({ companions: updatedCompanions });
  };
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // If has companions is checked but no companions added
    if (formData.hasCompanions && (!formData.companions || formData.companions.length === 0)) {
      newErrors.companions = "Veuillez ajouter au moins une personne accompagnante";
    }
    
    // Validate each companion's required fields if there are any companions
    if (formData.companions && formData.companions.length > 0) {
      formData.companions.forEach((companion: any, index: number) => {
        if (!companion.fullName?.trim()) {
          newErrors[`companion_${index}_fullName`] = "Nom complet requis";
        }
        
        if (!companion.relation) {
          newErrors[`companion_${index}_relation`] = "Relation requise";
        }
      });
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
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 md:p-6 rounded-xl mb-6">
        <h4 className="font-semibold text-lg mb-4">Personnes accompagnantes</h4>
        
        <div className="space-y-3">
          <div className="flex items-center mb-4">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="hasCompanions"
                checked={formData.hasCompanions === true}
                onChange={() => updateFormData({ hasCompanions: true })}
                className="form-radio h-4 w-4 text-morocco-red"
              />
              <span className="ml-2">Oui</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="hasCompanions"
                checked={formData.hasCompanions === false}
                onChange={() => updateFormData({ hasCompanions: false })}
                className="form-radio h-4 w-4 text-morocco-red"
              />
              <span className="ml-2">Non</span>
            </label>
          </div>
          
          {formData.hasCompanions && (
            <div className="space-y-4">
              {formData.companions && formData.companions.map((companion: any, index: number) => (
                <div key={index} className="glass-card p-4 rounded-lg relative">
                  <button 
                    type="button" 
                    onClick={() => removeCompanion(index)} 
                    className="absolute top-2 right-2 text-morocco-red hover:bg-red-50 p-1 rounded-full"
                  >
                    <X size={18} />
                  </button>
                  
                  <h5 className="font-medium mb-2">Personne {index + 1}</h5>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-input-wrapper">
                      <label className="form-label">Nom complet</label>
                      <input
                        type="text"
                        value={companion.fullName || ''}
                        onChange={(e) => handleCompanionChange(index, 'fullName', e.target.value)}
                        className={`form-input ${errors[`companion_${index}_fullName`] ? 'border-red-500' : ''}`}
                        placeholder="Nom complet"
                      />
                      {errors[`companion_${index}_fullName`] && 
                        <p className="text-red-500 text-xs mt-1 error-message">{errors[`companion_${index}_fullName`]}</p>
                      }
                    </div>
                    
                    <div className="form-input-wrapper">
                      <label className="form-label">Nationalité</label>
                      <input
                        type="text"
                        value={companion.nationality || ''}
                        onChange={(e) => handleCompanionChange(index, 'nationality', e.target.value)}
                        className="form-input"
                        placeholder="Nationalité"
                      />
                    </div>
                    
                    <div className="form-input-wrapper">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={companion.email || ''}
                        onChange={(e) => handleCompanionChange(index, 'email', e.target.value)}
                        className="form-input"
                        placeholder="Email"
                      />
                    </div>
                    
                    <div className="form-input-wrapper">
                      <label className="form-label">Téléphone</label>
                      <input
                        type="tel"
                        value={companion.phone || ''}
                        onChange={(e) => handleCompanionChange(index, 'phone', e.target.value)}
                        className="form-input"
                        placeholder="+XXX XXXXXXXX"
                      />
                    </div>
                    
                    <div className="form-input-wrapper">
                      <label className="form-label">Lien de parenté</label>
                      <select
                        value={companion.relation || ''}
                        onChange={(e) => handleCompanionChange(index, 'relation', e.target.value)}
                        className={`form-input ${errors[`companion_${index}_relation`] ? 'border-red-500' : ''}`}
                      >
                        <option value="">Sélectionnez</option>
                        <option value="Conjoint">Conjoint(e)</option>
                        <option value="Enfant">Enfant</option>
                        <option value="Parent">Parent</option>
                        <option value="Ami">Ami(e)</option>
                        <option value="Autre">Autre</option>
                      </select>
                      {errors[`companion_${index}_relation`] && 
                        <p className="text-red-500 text-xs mt-1 error-message">{errors[`companion_${index}_relation`]}</p>
                      }
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                onClick={addCompanion}
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 py-2 border-dashed border-gray-300 hover:border-morocco-red hover:text-morocco-red"
              >
                <UserPlus size={18} />
                <span>Ajouter une personne</span>
              </Button>
              
              {errors.companions && <p className="text-red-500 text-xs mt-1 error-message">{errors.companions}</p>}
            </div>
          )}
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
          onClick={handleNext}
        >
          Suivant
        </motion.button>
      </div>
    </div>
  );
};

export default CompanionsSection;
