
import { ChangeEvent } from "react";
import { Ticket, ShirtIcon } from "lucide-react";
import { motion } from "framer-motion";

interface TicketsSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TicketsSection = ({ formData, updateFormData, onNext, onPrevious }: TicketsSectionProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const [category, itemName] = name.split('_');
      
      let currentItems = [...(formData[category] || [])];
      
      if (checked) {
        if (!currentItems.includes(itemName)) {
          currentItems.push(itemName);
        }
      } else {
        currentItems = currentItems.filter(item => item !== itemName);
      }
      
      updateFormData({ [category]: currentItems });
    } else if (type === 'radio') {
      updateFormData({ [name]: value });
    } else {
      updateFormData({ [name]: value });
    }
  };
  
  const validateForm = () => {
    // For simplicity, we'll assume tickets section is always valid
    // You can add validation logic here if needed
    return true;
  };
  
  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 md:p-6 rounded-xl mb-6">
        <h4 className="font-semibold text-lg mb-4">Matchs souhaités</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="matchPhases_groups"
              name="matchPhases_groups"
              checked={formData.matchPhases?.includes('groups') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-gold focus:ring-morocco-gold"
            />
            <label htmlFor="matchPhases_groups" className="ml-2">
              Phase de groupes
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="matchPhases_round16"
              name="matchPhases_round16"
              checked={formData.matchPhases?.includes('round16') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-gold focus:ring-morocco-gold"
            />
            <label htmlFor="matchPhases_round16" className="ml-2">
              1/8 finale
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="matchPhases_quarters"
              name="matchPhases_quarters"
              checked={formData.matchPhases?.includes('quarters') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-gold focus:ring-morocco-gold"
            />
            <label htmlFor="matchPhases_quarters" className="ml-2">
              1/4 finale
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="matchPhases_semis"
              name="matchPhases_semis"
              checked={formData.matchPhases?.includes('semis') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-gold focus:ring-morocco-gold"
            />
            <label htmlFor="matchPhases_semis" className="ml-2">
              Demi-finale
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="matchPhases_final"
              name="matchPhases_final"
              checked={formData.matchPhases?.includes('final') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-gold focus:ring-morocco-gold"
            />
            <label htmlFor="matchPhases_final" className="ml-2">
              Finale
            </label>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6 rounded-xl mb-6">
        <h4 className="font-semibold text-lg mb-4">Type de billet</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`ticket-option ${formData.ticketCategory === 'cat1' ? 'selected' : ''} hover-scale`}
            onClick={() => updateFormData({ ticketCategory: 'cat1' })}
          >
            <input
              type="radio"
              id="ticketCategory_cat1"
              name="ticketCategory"
              value="cat1"
              checked={formData.ticketCategory === 'cat1'}
              onChange={handleInputChange}
              className="ticket-option-radio"
            />
            <div className="ticket-chip">Premium</div>
            <div className="flex items-center justify-center mb-2">
              <Ticket size={32} className="text-morocco-gold" />
            </div>
            <h5 className="text-center font-semibold mb-1">Catégorie 1</h5>
            <p className="text-center text-gray-500 text-sm">250€</p>
          </div>
          
          <div 
            className={`ticket-option ${formData.ticketCategory === 'cat2' ? 'selected' : ''} hover-scale`}
            onClick={() => updateFormData({ ticketCategory: 'cat2' })}
          >
            <input
              type="radio"
              id="ticketCategory_cat2"
              name="ticketCategory"
              value="cat2"
              checked={formData.ticketCategory === 'cat2'}
              onChange={handleInputChange}
              className="ticket-option-radio"
            />
            <div className="ticket-chip">Standard</div>
            <div className="flex items-center justify-center mb-2">
              <Ticket size={32} className="text-morocco-green" />
            </div>
            <h5 className="text-center font-semibold mb-1">Catégorie 2</h5>
            <p className="text-center text-gray-500 text-sm">150€</p>
          </div>
          
          <div 
            className={`ticket-option ${formData.ticketCategory === 'vip' ? 'selected' : ''} hover-scale`}
            onClick={() => updateFormData({ ticketCategory: 'vip' })}
          >
            <input
              type="radio"
              id="ticketCategory_vip"
              name="ticketCategory"
              value="vip"
              checked={formData.ticketCategory === 'vip'}
              onChange={handleInputChange}
              className="ticket-option-radio"
            />
            <div className="ticket-chip bg-morocco-gold text-morocco-black">VIP</div>
            <div className="flex items-center justify-center mb-2">
              <Ticket size={32} className="text-morocco-red" />
            </div>
            <h5 className="text-center font-semibold mb-1">VIP</h5>
            <p className="text-center text-gray-500 text-sm">450€</p>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6 rounded-xl mb-6">
        <h4 className="font-semibold text-lg mb-4">
          Pack supporter (obligatoire, 75€)
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="supporterPack_jersey"
              name="supporterPack_jersey"
              checked={formData.supporterPack?.includes('jersey') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="supporterPack_jersey" className="ml-2">
              Maillot officiel CAN 2025
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="supporterPack_scarf"
              name="supporterPack_scarf"
              checked={formData.supporterPack?.includes('scarf') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="supporterPack_scarf" className="ml-2">
              Écharpe
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="supporterPack_goodies"
              name="supporterPack_goodies"
              checked={formData.supporterPack?.includes('goodies') || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="supporterPack_goodies" className="ml-2">
              Goodies exclusifs
            </label>
          </div>
        </div>
        
        {formData.supporterPack?.includes('jersey') && (
          <div className="mt-4">
            <h5 className="font-medium mb-2">Taille Maillot</h5>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <label className={`text-center border rounded-lg p-2 cursor-pointer transition-all ${formData.jerseySize === 'M' ? 'bg-morocco-sand border-morocco-gold' : 'hover:border-morocco-gold'}`}>
                <input
                  type="radio"
                  name="jerseySize"
                  value="M"
                  checked={formData.jerseySize === 'M'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                M
              </label>
              <label className={`text-center border rounded-lg p-2 cursor-pointer transition-all ${formData.jerseySize === 'L' ? 'bg-morocco-sand border-morocco-gold' : 'hover:border-morocco-gold'}`}>
                <input
                  type="radio"
                  name="jerseySize"
                  value="L"
                  checked={formData.jerseySize === 'L'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                L
              </label>
              <label className={`text-center border rounded-lg p-2 cursor-pointer transition-all ${formData.jerseySize === 'XL' ? 'bg-morocco-sand border-morocco-gold' : 'hover:border-morocco-gold'}`}>
                <input
                  type="radio"
                  name="jerseySize"
                  value="XL"
                  checked={formData.jerseySize === 'XL'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                XL
              </label>
              <label className={`text-center border rounded-lg p-2 cursor-pointer transition-all ${formData.jerseySize === 'XXL' ? 'bg-morocco-sand border-morocco-gold' : 'hover:border-morocco-gold'}`}>
                <input
                  type="radio"
                  name="jerseySize"
                  value="XXL"
                  checked={formData.jerseySize === 'XXL'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                XXL
              </label>
              <label className={`text-center border rounded-lg p-2 cursor-pointer transition-all ${formData.jerseySize === 'XXXL' ? 'bg-morocco-sand border-morocco-gold' : 'hover:border-morocco-gold'}`}>
                <input
                  type="radio"
                  name="jerseySize"
                  value="XXXL"
                  checked={formData.jerseySize === 'XXXL'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                XXXL
              </label>
              <label className={`text-center border rounded-lg p-2 cursor-pointer transition-all ${formData.jerseySize === 'Autre' ? 'bg-morocco-sand border-morocco-gold' : 'hover:border-morocco-gold'}`}>
                <input
                  type="radio"
                  name="jerseySize"
                  value="Autre"
                  checked={formData.jerseySize === 'Autre'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                Autre
              </label>
            </div>
          </div>
        )}
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

export default TicketsSection;
