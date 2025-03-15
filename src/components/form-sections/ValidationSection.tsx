
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ValidationSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onSubmit: () => void;
  onPrevious: () => void;
}

const ValidationSection = ({ formData, updateFormData, onSubmit, onPrevious }: ValidationSectionProps) => {
  const [termsAccepted, setTermsAccepted] = useState<boolean>(formData.termsAccepted || false);
  const [wantsAlerts, setWantsAlerts] = useState<boolean>(formData.wantsAlerts || false);
  const [signature, setSignature] = useState<string>(formData.signature || "");
  const [date, setDate] = useState<string>(formData.date || new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (!termsAccepted) {
      alert("Veuillez accepter les conditions générales de vente.");
      return;
    }
    
    if (!signature) {
      alert("Veuillez signer le formulaire.");
      return;
    }
    
    updateFormData({
      termsAccepted,
      wantsAlerts,
      signature,
      date
    });
    
    onSubmit();
  };

  return (
    <div className="space-y-6 glass-card p-6">
      <div className="space-y-8">
        <div className="rounded-lg p-4 bg-morocco-gold/10 border border-morocco-gold/20">
          <h3 className="text-lg font-medium mb-4">Résumé de votre demande</h3>
          <p className="text-sm text-gray-600 mb-2">
            Avant de finaliser votre inscription, veuillez vérifier les informations que vous avez fournies.
          </p>
          <p className="text-sm text-gray-600">
            Une fois votre inscription validée, vous recevrez un email de confirmation avec les détails de votre inscription et les prochaines étapes.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="font-normal">
              J'accepte les conditions générales de vente et la politique de confidentialité
            </Label>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="alerts"
              checked={wantsAlerts}
              onCheckedChange={(checked) => setWantsAlerts(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="alerts" className="font-normal">
              Je souhaite recevoir les alertes matchs et offres exclusives
            </Label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signature">Signature électronique</Label>
            <Textarea 
              id="signature"
              placeholder="Tapez votre nom complet pour signer"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="min-h-[60px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        <Button type="button" onClick={handleSubmit} className="bg-morocco-green hover:bg-morocco-green/90">
          Soumettre l'inscription
        </Button>
      </div>
    </div>
  );
};

export default ValidationSection;
