import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FileCheck, Plane } from "lucide-react"; // Replace Passport with FileCheck
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TravelSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TravelSection = ({ formData, updateFormData, onNext, onPrevious }: TravelSectionProps) => {
  const [needVisa, setNeedVisa] = useState(formData.needVisa || false);
  const [needPassport, setNeedPassport] = useState(formData.needPassport || false);
  const [needInsurance, setNeedInsurance] = useState(formData.needInsurance || false);
  const [otherAssistance, setOtherAssistance] = useState(formData.otherAssistance || "");
  const [departureCity, setDepartureCity] = useState(formData.departureCity || "Abidjan");
  const [otherDepartureCity, setOtherDepartureCity] = useState(formData.otherDepartureCity || "");
  const [arrivalDate, setArrivalDate] = useState(formData.arrivalDate || "");
  const [departureDate, setDepartureDate] = useState(formData.departureDate || "");
  const [cities, setCities] = useState<string[]>(formData.cities || []);
  const [otherCity, setOtherCity] = useState(formData.otherCity || "");
  const [transportOptions, setTransportOptions] = useState<string[]>(formData.transportOptions || []);
  const [accommodationOptions, setAccommodationOptions] = useState<string[]>(formData.accommodationOptions || []);
  const [additionalServices, setAdditionalServices] = useState<string[]>(formData.additionalServices || []);

  const handleCityChange = (city: string, checked: boolean) => {
    if (checked) {
      setCities([...cities, city]);
    } else {
      setCities(cities.filter(c => c !== city));
    }
  };

  const handleTransportChange = (transport: string, checked: boolean) => {
    if (checked) {
      setTransportOptions([...transportOptions, transport]);
    } else {
      setTransportOptions(transportOptions.filter(t => t !== transport));
    }
  };

  const handleAccommodationChange = (accommodation: string, checked: boolean) => {
    if (checked) {
      setAccommodationOptions([...accommodationOptions, accommodation]);
    } else {
      setAccommodationOptions(accommodationOptions.filter(a => a !== accommodation));
    }
  };

  const handleAdditionalServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setAdditionalServices([...additionalServices, service]);
    } else {
      setAdditionalServices(additionalServices.filter(s => s !== service));
    }
  };

  const handleSubmit = () => {
    updateFormData({
      needVisa,
      needPassport,
      needInsurance,
      otherAssistance,
      departureCity,
      otherDepartureCity,
      arrivalDate,
      departureDate,
      cities,
      otherCity,
      transportOptions,
      accommodationOptions,
      additionalServices
    });
    onNext();
  };

  return (
    <div className="space-y-6 glass-card p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="needVisa">Besoin de visa</Label>
          <Checkbox
            id="needVisa"
            checked={needVisa}
            onCheckedChange={(checked) => setNeedVisa(checked as boolean)}
          />
        </div>

        <div>
          <Label htmlFor="needPassport">Besoin de passeport</Label>
          <Checkbox
            id="needPassport"
            checked={needPassport}
            onCheckedChange={(checked) => setNeedPassport(checked as boolean)}
          />
        </div>

        <div>
          <Label htmlFor="needInsurance">Besoin d'assurance voyage</Label>
          <Checkbox
            id="needInsurance"
            checked={needInsurance}
            onCheckedChange={(checked) => setNeedInsurance(checked as boolean)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherAssistance">Autres besoins d'assistance</Label>
          <Textarea
            id="otherAssistance"
            placeholder="Décrivez vos besoins spécifiques"
            value={otherAssistance}
            onChange={(e) => setOtherAssistance(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureCity">Ville de départ</Label>
          <select
            id="departureCity"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          >
            <option value="Abidjan">Abidjan</option>
            <option value="Dakar">Dakar</option>
            <option value="Bamako">Bamako</option>
            <option value="Other">Autre</option>
          </select>
        </div>

        {departureCity === "Other" && (
          <div className="space-y-2">
            <Label htmlFor="otherDepartureCity">Autre ville de départ</Label>
            <Input
              id="otherDepartureCity"
              placeholder="Précisez la ville de départ"
              value={otherDepartureCity}
              onChange={(e) => setOtherDepartureCity(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="arrivalDate">Date d'arrivée</Label>
          <Input
            id="arrivalDate"
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureDate">Date de départ</Label>
          <Input
            id="departureDate"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">Villes à visiter</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Casablanca", "Marrakech", "Fès", "Tanger"].map((city) => (
              <div key={city} className="flex items-center space-x-3">
                <Checkbox
                  id={`city-${city}`}
                  checked={cities.includes(city)}
                  onCheckedChange={(checked) => handleCityChange(city, checked as boolean)}
                />
                <Label htmlFor={`city-${city}`} className="font-normal">
                  {city}
                </Label>
              </div>
            ))}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="city-other"
                checked={cities.includes("other")}
                onCheckedChange={(checked) => handleCityChange("other", checked as boolean)}
              />
              <Label htmlFor="city-other" className="font-normal">
                Autre
              </Label>
            </div>
          </div>
        </div>

        {cities.includes("other") && (
          <div className="space-y-2">
            <Label htmlFor="otherCity">Autre ville à visiter</Label>
            <Input
              id="otherCity"
              placeholder="Précisez la ville"
              value={otherCity}
              onChange={(e) => setOtherCity(e.target.value)}
            />
          </div>
        )}

        <div className="space-y-4">
          <Label className="text-lg font-medium">Options de transport</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Avion", "Train", "Bus", "Voiture de location"].map((transport) => (
              <div key={transport} className="flex items-center space-x-3">
                <Checkbox
                  id={`transport-${transport}`}
                  checked={transportOptions.includes(transport)}
                  onCheckedChange={(checked) => handleTransportChange(transport, checked as boolean)}
                />
                <Label htmlFor={`transport-${transport}`} className="font-normal">
                  {transport}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">Options d'hébergement</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Hôtel", "Riad", "Appartement", "Auberge"].map((accommodation) => (
              <div key={accommodation} className="flex items-center space-x-3">
                <Checkbox
                  id={`accommodation-${accommodation}`}
                  checked={accommodationOptions.includes(accommodation)}
                  onCheckedChange={(checked) => handleAccommodationChange(accommodation, checked as boolean)}
                />
                <Label htmlFor={`accommodation-${accommodation}`} className="font-normal">
                  {accommodation}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">Services additionnels</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Guide touristique", "Traducteur", "Chauffeur privé", "Excursions"].map((service) => (
              <div key={service} className="flex items-center space-x-3">
                <Checkbox
                  id={`service-${service}`}
                  checked={additionalServices.includes(service)}
                  onCheckedChange={(checked) => handleAdditionalServiceChange(service, checked as boolean)}
                />
                <Label htmlFor={`service-${service}`} className="font-normal">
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Suivant
        </Button>
      </div>
    </div>
  );
};

export default TravelSection;
