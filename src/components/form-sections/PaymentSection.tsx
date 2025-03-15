
import { useState, ChangeEvent } from "react";
import { CreditCard, FileText, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface PaymentSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PaymentSection = ({ formData, updateFormData, onNext, onPrevious }: PaymentSectionProps) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name.startsWith('document_')) {
        const documentName = name.split('_')[1];
        let currentDocuments = [...(formData.documents || [])];
        
        if (checked) {
          if (!currentDocuments.includes(documentName)) {
            currentDocuments.push(documentName);
          }
        } else {
          currentDocuments = currentDocuments.filter(doc => doc !== documentName);
        }
        
        updateFormData({ documents: currentDocuments });
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
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Veuillez sélectionner une méthode de paiement";
    }
    
    if (!formData.installmentPlan) {
      newErrors.installmentPlan = "Veuillez sélectionner un plan de paiement";
    }
    
    if (!formData.documents || formData.documents.length === 0) {
      newErrors.documents = "Veuillez sélectionner au moins un document requis";
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
        <h4 className="font-semibold text-lg mb-4">Méthode de paiement</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <label className="payment-method-card">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={formData.paymentMethod === "creditCard"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`payment-method-content ${formData.paymentMethod === "creditCard" ? "border-morocco-green bg-green-50" : ""}`}>
              <CreditCard className="text-morocco-green mb-2" size={24} />
              <span>Carte bancaire</span>
            </div>
          </label>
          
          <label className="payment-method-card">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`payment-method-content ${formData.paymentMethod === "paypal" ? "border-morocco-green bg-green-50" : ""}`}>
              <CreditCard className="text-morocco-green mb-2" size={24} />
              <span>PayPal</span>
            </div>
          </label>
          
          <label className="payment-method-card">
            <input
              type="radio"
              name="paymentMethod"
              value="mobileMoney"
              checked={formData.paymentMethod === "mobileMoney"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`payment-method-content ${formData.paymentMethod === "mobileMoney" ? "border-morocco-green bg-green-50" : ""}`}>
              <CreditCard className="text-morocco-green mb-2" size={24} />
              <span>Mobile Money</span>
            </div>
          </label>
          
          <label className="payment-method-card">
            <input
              type="radio"
              name="paymentMethod"
              value="wireTransfer"
              checked={formData.paymentMethod === "wireTransfer"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`payment-method-content ${formData.paymentMethod === "wireTransfer" ? "border-morocco-green bg-green-50" : ""}`}>
              <CreditCard className="text-morocco-green mb-2" size={24} />
              <span>Virement</span>
            </div>
          </label>
        </div>
        
        {errors.paymentMethod && <p className="text-red-500 text-xs mb-4 error-message">{errors.paymentMethod}</p>}
        
        <h4 className="font-semibold text-lg mb-4">Paiement échelonné</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <label className="payment-plan-card">
            <input
              type="radio"
              name="installmentPlan"
              value="full"
              checked={formData.installmentPlan === "full"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`payment-plan-content ${formData.installmentPlan === "full" ? "border-morocco-gold bg-amber-50" : ""}`}>
              <span>Paiement intégral</span>
            </div>
          </label>
          
          <label className="payment-plan-card">
            <input
              type="radio"
              name="installmentPlan"
              value="2x"
              checked={formData.installmentPlan === "2x"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`payment-plan-content ${formData.installmentPlan === "2x" ? "border-morocco-gold bg-amber-50" : ""}`}>
              <span>Paiement en 2 fois</span>
            </div>
          </label>
          
          <label className="payment-plan-card">
            <input
              type="radio"
              name="installmentPlan"
              value="3x"
              checked={formData.installmentPlan === "3x"}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className={`payment-plan-content ${formData.installmentPlan === "3x" ? "border-morocco-gold bg-amber-50" : ""}`}>
              <span>Paiement en 3 fois <span className="text-xs text-morocco-red">(+5% frais)</span></span>
            </div>
          </label>
        </div>
        
        {errors.installmentPlan && <p className="text-red-500 text-xs mb-4 error-message">{errors.installmentPlan}</p>}
        
        <h4 className="font-semibold text-lg mb-4">Documents requis</h4>
        
        <div className="space-y-3">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="document_passport"
              name="document_passport"
              checked={formData.documents?.includes('passport') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="document_passport" className="ml-2 flex items-center">
              <FileText size={16} className="mr-2 text-morocco-red" />
              Copie du passeport
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="document_proof_address"
              name="document_proof_address"
              checked={formData.documents?.includes('proof_address') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="document_proof_address" className="ml-2 flex items-center">
              <FileText size={16} className="mr-2 text-morocco-red" />
              Justificatif de domicile
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="document_id_card"
              name="document_id_card"
              checked={formData.documents?.includes('id_card') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="document_id_card" className="ml-2 flex items-center">
              <FileText size={16} className="mr-2 text-morocco-red" />
              Carte d'identité
            </label>
          </div>
        </div>
        
        {errors.documents && <p className="text-red-500 text-xs mt-1 error-message">{errors.documents}</p>}
        
        <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg text-center">
          <Upload size={24} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">Les documents seront à télécharger ultérieurement</p>
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

export default PaymentSection;
