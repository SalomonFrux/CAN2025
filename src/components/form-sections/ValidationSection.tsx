
import { useState, ChangeEvent } from "react";
import { Check, AlertTriangle, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h4 className="text-lg font-semibold">Récapitulatif</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <User size={16} />
                Informations personnelles
              </h5>
              <p className="text-base">{formData.fullName || "Non spécifié"}</p>
              <p className="text-base">{formData.email || "Non spécifié"}</p>
              <p className="text-base">{formData.phone || "Non spécifié"}</p>
              <p className="text-base">{formData.nationality || "Non spécifié"}</p>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar size={16} />
                Voyage
              </h5>
              <p className="text-base">
                {formData.departureCity === 'Autre' 
                  ? formData.otherDepartureCity
                  : formData.departureCity || "Non spécifié"
                }
              </p>
              <p className="text-base">
                {formData.arrivalDate && format(new Date(formData.arrivalDate), "dd/MM/yyyy")} - 
                {formData.departureDate && format(new Date(formData.departureDate), "dd/MM/yyyy")}
              </p>
              <p className="text-base">
                Villes: {formData.cities?.join(', ') || "Non spécifié"}
              </p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted || false}
                onCheckedChange={(checked) => {
                  updateFormData({ termsAccepted: checked === true });
                  if (errors.termsAccepted) {
                    setErrors(prev => {
                      const newErrors = {...prev};
                      delete newErrors.termsAccepted;
                      return newErrors;
                    });
                  }
                }}
                className="mt-1"
              />
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="termsAccepted"
                  className={errors.termsAccepted ? "text-destructive" : ""}
                >
                  J'accepte les conditions générales de vente
                </Label>
                {errors.termsAccepted && (
                  <p className="text-xs text-destructive error-message">{errors.termsAccepted}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="wantsAlerts"
                name="wantsAlerts"
                checked={formData.wantsAlerts || false}
                onCheckedChange={(checked) => {
                  updateFormData({ wantsAlerts: checked === true });
                }}
                className="mt-1"
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="wantsAlerts">
                  Je souhaite recevoir les alertes matchs/offres exclusives
                </Label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <Label htmlFor="signature" className={errors.signature ? "text-destructive" : ""}>
              Signature électronique
            </Label>
            <Input
              id="signature"
              name="signature"
              value={formData.signature || ''}
              onChange={handleInputChange}
              className={errors.signature ? "border-destructive" : ""}
              placeholder="Tapez votre nom complet"
            />
            {errors.signature && (
              <p className="text-xs text-destructive error-message">{errors.signature}</p>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
            <div className="flex">
              <AlertTriangle size={20} className="text-destructive mr-2 flex-shrink-0" />
              <p className="text-sm">
                En validant ce formulaire, vous confirmez l'exactitude des informations fournies. 
                Un conseiller vous contactera dans les plus brefs délais pour finaliser votre réservation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="transition-all duration-300 hover:translate-x-[-2px]"
        >
          Précédent
        </Button>
        
        <Button 
          onClick={handleSubmit}
          className="transition-all duration-300 hover:translate-y-[-2px]"
        >
          Valider mon inscription
        </Button>
      </div>
    </div>
  );
};

export default ValidationSection;
