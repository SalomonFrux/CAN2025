import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FileCheck, User } from "lucide-react"; // Replace Passport with FileCheck
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PersonalInfoSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

const PersonalInfoSection = ({ formData, updateFormData, onNext }: PersonalInfoSectionProps) => {
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [birthDate, setBirthDate] = useState(formData.birthDate || "");
  const [gender, setGender] = useState(formData.gender || "");
  const [nationality, setNationality] = useState(formData.nationality || "");
  const [passportNumber, setPassportNumber] = useState(formData.passportNumber || "");
  const [passportExpiry, setPassportExpiry] = useState(formData.passportExpiry || "");
  const [phone, setPhone] = useState(formData.phone || "");
  const [email, setEmail] = useState(formData.email || "");
  const [address, setAddress] = useState(formData.address || "");
  const [supportedTeam, setSupportedTeam] = useState(formData.supportedTeam || false);
  const [teamName, setTeamName] = useState(formData.teamName || "");

  const handleSubmit = () => {
    updateFormData({
      fullName,
      birthDate,
      gender,
      nationality,
      passportNumber,
      passportExpiry,
      phone,
      email,
      address,
      supportedTeam,
      teamName
    });
    onNext();
  };

  return (
    <div className="space-y-6 glass-card p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom et Prénom(s)</Label>
          <Input
            id="fullName"
            placeholder="Entrez votre nom complet"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate">Date de naissance</Label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Sexe</Label>
          <RadioGroup
            defaultValue={gender}
            onValueChange={setGender}
            className="flex items-center space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="gender-male" />
              <Label htmlFor="gender-male">Masculin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="gender-female" />
              <Label htmlFor="gender-female">Féminin</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationalité</Label>
          <Input
            id="nationality"
            placeholder="Votre nationalité"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passportNumber">Numéro de passeport</Label>
          <Input
            id="passportNumber"
            placeholder="Numéro de votre passeport"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passportExpiry">Date d'expiration du passeport</Label>
          <Input
            id="passportExpiry"
            type="date"
            value={passportExpiry}
            onChange={(e) => setPassportExpiry(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de téléphone</Label>
          <Input
            id="phone"
            placeholder="Votre numéro de téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="Votre adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Adresse de résidence</Label>
          <Input
            id="address"
            placeholder="Votre adresse de résidence"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="supportedTeam"
            className="h-5 w-5 rounded text-morocco-red focus:ring-morocco-red"
            checked={supportedTeam}
            onChange={(e) => setSupportedTeam(e.target.checked)}
          />
          <Label htmlFor="supportedTeam" className="font-normal">
            Êtes-vous supporter d'une équipe en particulier ?
          </Label>
        </div>

        {supportedTeam && (
          <div className="space-y-2">
            <Label htmlFor="teamName">Nom de l'équipe supportée</Label>
            <Input
              id="teamName"
              placeholder="Entrez le nom de votre équipe"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={handleSubmit} className="bg-morocco-red text-white py-3 px-6 rounded-md hover:bg-morocco-red/90 transition-colors duration-200">
        Suivant
      </button>
    </div>
  );
};

export default PersonalInfoSection;
