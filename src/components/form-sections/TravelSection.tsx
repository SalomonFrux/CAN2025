
import { useState, ChangeEvent } from "react";
import { Passport, Plane, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TravelSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TravelSection = ({ formData, updateFormData, onNext, onPrevious }: TravelSectionProps) => {
  const [arrivalDate, setArrivalDate] = useState<Date | undefined>(
    formData.arrivalDate ? new Date(formData.arrivalDate) : undefined
  );
  
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    formData.departureDate ? new Date(formData.departureDate) : undefined
  );
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      if (name === 'needVisa' || name === 'needPassport' || name === 'needInsurance') {
        updateFormData({ [name]: checked });
      } else if (name.startsWith('city_') || name.startsWith('transport_') || name.startsWith('accommodation_') || name.startsWith('additional_')) {
        const [category, itemName] = name.split('_');
        let currentItems = [...(formData[`${category}Options`] || [])];
        
        if (checked) {
          if (!currentItems.includes(itemName)) {
            currentItems.push(itemName);
          }
        } else {
          currentItems = currentItems.filter(item => item !== itemName);
        }
        
        updateFormData({ [`${category}Options`]: currentItems });
      }
    } else if (name === 'departureCity') {
      if (value === 'Autre') {
        updateFormData({ departureCity: value, otherDepartureCity: '' });
      } else {
        updateFormData({ departureCity: value });
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
    
    if (formData.departureCity === 'Autre' && !formData.otherDepartureCity?.trim()) {
      newErrors.otherDepartureCity = "Veuillez spécifier votre ville de départ";
    }
    
    if (!arrivalDate) {
      newErrors.arrivalDate = "Veuillez sélectionner une date d'arrivée";
    }
    
    if (!departureDate) {
      newErrors.departureDate = "Veuillez sélectionner une date de départ";
    }
    
    if (arrivalDate && departureDate && arrivalDate > departureDate) {
      newErrors.departureDate = "La date de départ doit être après la date d'arrivée";
    }
    
    const cities = formData.cities || [];
    if (cities.length === 0) {
      newErrors.cities = "Veuillez sélectionner au moins une ville de séjour";
    }
    
    const transportOptions = formData.transportOptions || [];
    if (transportOptions.length === 0) {
      newErrors.transportOptions = "Veuillez sélectionner au moins une option de transport";
    }
    
    const accommodationOptions = formData.accommodationOptions || [];
    if (accommodationOptions.length === 0) {
      newErrors.accommodationOptions = "Veuillez sélectionner au moins une option d'hébergement";
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
  
  const handleCityChange = (cityName: string, checked: boolean) => {
    let updatedCities = [...(formData.cities || [])];
    
    if (checked) {
      if (!updatedCities.includes(cityName)) {
        updatedCities.push(cityName);
      }
    } else {
      updatedCities = updatedCities.filter(city => city !== cityName);
    }
    
    updateFormData({ cities: updatedCities });
    
    // Clear error when user selects a city
    if (errors.cities) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.cities;
        return newErrors;
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 md:p-6 rounded-xl mb-6">
        <h4 className="font-semibold text-lg mb-4">A. Préparation administrative</h4>
        <div className="space-y-3">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="needVisa"
              name="needVisa"
              checked={formData.needVisa || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="needVisa" className="ml-2">
              Demande de visa marocain (joindre copie passeport)
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="needPassport"
              name="needPassport"
              checked={formData.needPassport || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="needPassport" className="ml-2">
              Renouvellement de passeport
            </label>
          </div>
          
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="needInsurance"
              name="needInsurance"
              checked={formData.needInsurance || false}
              onChange={handleInputChange}
              className="rounded text-morocco-red focus:ring-morocco-red"
            />
            <label htmlFor="needInsurance" className="ml-2">
              Assurance voyage
            </label>
          </div>
          
          <div className="form-input-wrapper mt-3">
            <label htmlFor="otherAssistance" className="form-label">
              Autre
            </label>
            <div className="relative">
              <Passport size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="otherAssistance"
                name="otherAssistance"
                value={formData.otherAssistance || ''}
                onChange={handleInputChange}
                className="form-input pl-10"
                placeholder="Précisez si autre besoin"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6 rounded-xl mb-6">
        <h4 className="font-semibold text-lg mb-4">B. Options de voyage</h4>
        
        <div className="form-input-wrapper">
          <label htmlFor="departureCity" className="form-label">
            Ville de départ
          </label>
          <div className="relative">
            <Plane size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              id="departureCity"
              name="departureCity"
              value={formData.departureCity || 'Abidjan'}
              onChange={handleInputChange}
              className="form-input pl-10 appearance-none"
            >
              <option value="Abidjan">Abidjan</option>
              <option value="Autre">Autre</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {formData.departureCity === 'Autre' && (
          <div className="form-input-wrapper mt-2">
            <label htmlFor="otherDepartureCity" className="form-label">
              Précisez
            </label>
            <div className="relative">
              <Plane size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="otherDepartureCity"
                name="otherDepartureCity"
                value={formData.otherDepartureCity || ''}
                onChange={handleInputChange}
                className={`form-input pl-10 ${errors.otherDepartureCity ? 'border-red-500' : ''}`}
                placeholder="Précisez votre ville de départ"
              />
            </div>
            {errors.otherDepartureCity && <p className="text-red-500 text-xs mt-1 error-message">{errors.otherDepartureCity}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-input-wrapper">
            <label htmlFor="arrivalDate" className="form-label">
              Date d'arrivée au Maroc
            </label>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full pl-10 justify-start text-left font-normal ${errors.arrivalDate ? 'border-red-500' : ''}`}
                  >
                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {arrivalDate ? (
                      format(arrivalDate, "dd/MM/yyyy")
                    ) : (
                      <span className="text-gray-400">Sélectionnez la date d'arrivée</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={arrivalDate}
                    onSelect={(date) => {
                      setArrivalDate(date);
                      updateFormData({ arrivalDate: date ? date.toISOString() : "" });
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            {errors.arrivalDate && <p className="text-red-500 text-xs mt-1 error-message">{errors.arrivalDate}</p>}
          </div>
          
          <div className="form-input-wrapper">
            <label htmlFor="departureDate" className="form-label">
              Date de départ
            </label>
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full pl-10 justify-start text-left font-normal ${errors.departureDate ? 'border-red-500' : ''}`}
                  >
                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {departureDate ? (
                      format(departureDate, "dd/MM/yyyy")
                    ) : (
                      <span className="text-gray-400">Sélectionnez la date de départ</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={departureDate}
                    onSelect={(date) => {
                      setDepartureDate(date);
                      updateFormData({ departureDate: date ? date.toISOString() : "" });
                    }}
                    disabled={(date) => arrivalDate ? date < arrivalDate : false}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            {errors.departureDate && <p className="text-red-500 text-xs mt-1 error-message">{errors.departureDate}</p>}
          </div>
        </div>
        
        <div className="form-input-wrapper mt-4">
          <label className="form-label">
            Ville(s) de séjour
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="city_casablanca"
                checked={formData.cities?.includes('Casablanca') || false}
                onChange={(e) => handleCityChange('Casablanca', e.target.checked)}
                className="rounded text-morocco-red focus:ring-morocco-red"
              />
              <label htmlFor="city_casablanca" className="ml-2">
                Casablanca
              </label>
            </div>
            
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="city_rabat"
                checked={formData.cities?.includes('Rabat') || false}
                onChange={(e) => handleCityChange('Rabat', e.target.checked)}
                className="rounded text-morocco-red focus:ring-morocco-red"
              />
              <label htmlFor="city_rabat" className="ml-2">
                Rabat
              </label>
            </div>
            
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="city_marrakech"
                checked={formData.cities?.includes('Marrakech') || false}
                onChange={(e) => handleCityChange('Marrakech', e.target.checked)}
                className="rounded text-morocco-red focus:ring-morocco-red"
              />
              <label htmlFor="city_marrakech" className="ml-2">
                Marrakech
              </label>
            </div>
            
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="city_other"
                checked={formData.cities?.includes('Autre') || false}
                onChange={(e) => handleCityChange('Autre', e.target.checked)}
                className="rounded text-morocco-red focus:ring-morocco-red"
              />
              <label htmlFor="city_other" className="ml-2">
                Autre
              </label>
            </div>
          </div>
          
          {formData.cities?.includes('Autre') && (
            <div className="mt-2 relative">
              <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="otherCity"
                name="otherCity"
                value={formData.otherCity || ''}
                onChange={handleInputChange}
                className="form-input pl-10"
                placeholder="Précisez la ville"
              />
            </div>
          )}
          
          {errors.cities && <p className="text-red-500 text-xs mt-1 error-message">{errors.cities}</p>}
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6 rounded-xl">
        <h4 className="font-semibold text-lg mb-4">C. Services inclus</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-medium mb-2">Transport</h5>
            <div className="space-y-2">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="transport_vol_economique"
                  name="transport_vol_economique"
                  checked={formData.transportOptions?.includes('vol_economique') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-green focus:ring-morocco-green"
                />
                <label htmlFor="transport_vol_economique" className="ml-2">
                  Vol A/R Économique
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="transport_vol_premium"
                  name="transport_vol_premium"
                  checked={formData.transportOptions?.includes('vol_premium') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-green focus:ring-morocco-green"
                />
                <label htmlFor="transport_vol_premium" className="ml-2">
                  Vol A/R Premium
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="transport_navette_stade"
                  name="transport_navette_stade"
                  checked={formData.transportOptions?.includes('navette_stade') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-green focus:ring-morocco-green"
                />
                <label htmlFor="transport_navette_stade" className="ml-2">
                  Navette quotidienne stade
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="transport_vip"
                  name="transport_vip"
                  checked={formData.transportOptions?.includes('vip') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-green focus:ring-morocco-green"
                />
                <label htmlFor="transport_vip" className="ml-2">
                  Transport VIP
                </label>
              </div>
            </div>
            {errors.transportOptions && <p className="text-red-500 text-xs mt-1 error-message">{errors.transportOptions}</p>}
          </div>
          
          <div>
            <h5 className="font-medium mb-2">Hébergement</h5>
            <div className="space-y-2">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="accommodation_hotel_5"
                  name="accommodation_hotel_5"
                  checked={formData.accommodationOptions?.includes('hotel_5') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-gold focus:ring-morocco-gold"
                />
                <label htmlFor="accommodation_hotel_5" className="ml-2">
                  Hôtel 5★
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="accommodation_hotel_4"
                  name="accommodation_hotel_4"
                  checked={formData.accommodationOptions?.includes('hotel_4') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-gold focus:ring-morocco-gold"
                />
                <label htmlFor="accommodation_hotel_4" className="ml-2">
                  Hôtel 4★
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="accommodation_hotel_3"
                  name="accommodation_hotel_3"
                  checked={formData.accommodationOptions?.includes('hotel_3') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-gold focus:ring-morocco-gold"
                />
                <label htmlFor="accommodation_hotel_3" className="ml-2">
                  Hôtel 3★
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="accommodation_appartement"
                  name="accommodation_appartement"
                  checked={formData.accommodationOptions?.includes('appartement') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-gold focus:ring-morocco-gold"
                />
                <label htmlFor="accommodation_appartement" className="ml-2">
                  Appartement
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="accommodation_colocation"
                  name="accommodation_colocation"
                  checked={formData.accommodationOptions?.includes('colocation') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-gold focus:ring-morocco-gold"
                />
                <label htmlFor="accommodation_colocation" className="ml-2">
                  Colocation
                </label>
              </div>
            </div>
            {errors.accommodationOptions && <p className="text-red-500 text-xs mt-1 error-message">{errors.accommodationOptions}</p>}
          </div>
          
          <div>
            <h5 className="font-medium mb-2">Supplément</h5>
            <div className="space-y-2">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="additional_guide"
                  name="additional_guide"
                  checked={formData.additionalServices?.includes('guide') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-red focus:ring-morocco-red"
                />
                <label htmlFor="additional_guide" className="ml-2">
                  Guide bilingue
                </label>
              </div>
              
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="additional_sim"
                  name="additional_sim"
                  checked={formData.additionalServices?.includes('sim') || false}
                  onChange={handleInputChange}
                  className="rounded text-morocco-red focus:ring-morocco-red"
                />
                <label htmlFor="additional_sim" className="ml-2">
                  SIM Maroc Telecom
                </label>
              </div>
            </div>
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
          onClick={handleNext}
        >
          Suivant
        </motion.button>
      </div>
    </div>
  );
};

export default TravelSection;
