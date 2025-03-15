
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface CompanionsSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CompanionsSection = ({ formData, updateFormData, onNext, onPrevious }: CompanionsSectionProps) => {
  const [hasCompanions, setHasCompanions] = useState(formData.hasCompanions || false);
  const [companions, setCompanions] = useState(formData.companions || [{ 
    name: "", 
    birthDate: "", 
    gender: "", 
    nationality: "", 
    phone: "", 
    email: "", 
    address: "", 
    relation: [] 
  }]);

  const handleCompanionChange = (index: number, field: string, value: any) => {
    const updatedCompanions = [...companions];
    updatedCompanions[index] = {
      ...updatedCompanions[index],
      [field]: value
    };
    setCompanions(updatedCompanions);
  };

  const handleRelationChange = (index: number, relation: string, checked: boolean) => {
    const updatedCompanions = [...companions];
    const currentRelations = updatedCompanions[index].relation || [];
    
    if (checked) {
      updatedCompanions[index].relation = [...currentRelations, relation];
    } else {
      updatedCompanions[index].relation = currentRelations.filter((r: string) => r !== relation);
    }
    
    setCompanions(updatedCompanions);
  };

  const addCompanion = () => {
    setCompanions([...companions, { 
      name: "", 
      birthDate: "", 
      gender: "", 
      nationality: "", 
      phone: "", 
      email: "", 
      address: "", 
      relation: [] 
    }]);
  };

  const removeCompanion = (index: number) => {
    const updatedCompanions = [...companions];
    updatedCompanions.splice(index, 1);
    setCompanions(updatedCompanions);
  };

  const handleSubmit = () => {
    updateFormData({
      hasCompanions,
      companions
    });
    onNext();
  };

  return (
    <div className="space-y-6 glass-card p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="hasCompanions">Personnes accompagnantes</Label>
          <RadioGroup
            value={hasCompanions ? "yes" : "no"}
            onValueChange={(value) => setHasCompanions(value === "yes")}
            className="flex items-center space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="hasCompanions-yes" />
              <Label htmlFor="hasCompanions-yes">Oui</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="hasCompanions-no" />
              <Label htmlFor="hasCompanions-no">Non</Label>
            </div>
          </RadioGroup>
        </div>

        {hasCompanions && (
          <div className="space-y-6 mt-4">
            {companions.map((companion: any, index: number) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4 bg-white/50 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium">Accompagnant {index + 1}</h4>
                  {companions.length > 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeCompanion(index)}
                      className="text-morocco-red hover:text-red-700"
                    >
                      Supprimer
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`companion-name-${index}`}>Nom et Prénom(s)</Label>
                    <Input
                      id={`companion-name-${index}`}
                      value={companion.name}
                      onChange={(e) => handleCompanionChange(index, 'name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`companion-birthdate-${index}`}>Date de naissance</Label>
                    <Input
                      id={`companion-birthdate-${index}`}
                      type="date"
                      value={companion.birthDate}
                      onChange={(e) => handleCompanionChange(index, 'birthDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sexe</Label>
                    <RadioGroup
                      value={companion.gender}
                      onValueChange={(value) => handleCompanionChange(index, 'gender', value)}
                      className="flex items-center space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id={`companion-gender-male-${index}`} />
                        <Label htmlFor={`companion-gender-male-${index}`}>Masculin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id={`companion-gender-female-${index}`} />
                        <Label htmlFor={`companion-gender-female-${index}`}>Féminin</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`companion-nationality-${index}`}>Nationalité</Label>
                    <Input
                      id={`companion-nationality-${index}`}
                      value={companion.nationality}
                      onChange={(e) => handleCompanionChange(index, 'nationality', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`companion-phone-${index}`}>Numéro de téléphone</Label>
                    <Input
                      id={`companion-phone-${index}`}
                      value={companion.phone}
                      onChange={(e) => handleCompanionChange(index, 'phone', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`companion-email-${index}`}>Adresse e-mail</Label>
                    <Input
                      id={`companion-email-${index}`}
                      type="email"
                      value={companion.email}
                      onChange={(e) => handleCompanionChange(index, 'email', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`companion-address-${index}`}>Adresse de résidence</Label>
                    <Input
                      id={`companion-address-${index}`}
                      value={companion.address}
                      onChange={(e) => handleCompanionChange(index, 'address', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Lien</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Conjoint(e)", "Enfant", "Parent", "Ami"].map((relation) => (
                        <div key={relation} className="flex items-center space-x-2">
                          <Checkbox
                            id={`relation-${relation}-${index}`}
                            checked={(companion.relation || []).includes(relation)}
                            onCheckedChange={(checked) => 
                              handleRelationChange(index, relation, checked as boolean)
                            }
                          />
                          <Label htmlFor={`relation-${relation}-${index}`}>{relation}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={addCompanion}
              className="w-full mt-4 border-dashed border-2"
            >
              + Ajouter un autre accompagnant
            </Button>
          </div>
        )}
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

export default CompanionsSection;
