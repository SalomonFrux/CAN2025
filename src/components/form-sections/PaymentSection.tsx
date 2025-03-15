
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface PaymentSectionProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PaymentSection = ({ formData, updateFormData, onNext, onPrevious }: PaymentSectionProps) => {
  const [paymentMethods, setPaymentMethods] = useState<string[]>(formData.paymentMethod ? [formData.paymentMethod] : []);
  const [installmentPlan, setInstallmentPlan] = useState<string>(formData.installmentPlan || "");
  const [documents, setDocuments] = useState<string[]>(formData.documents || []);

  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    if (checked) {
      setPaymentMethods([...paymentMethods, method]);
    } else {
      setPaymentMethods(paymentMethods.filter(m => m !== method));
    }
  };

  const handleInstallmentPlanChange = (plan: string, checked: boolean) => {
    if (checked) {
      setInstallmentPlan(plan);
    } else {
      setInstallmentPlan("");
    }
  };

  const handleDocumentChange = (doc: string, checked: boolean) => {
    if (checked) {
      setDocuments([...documents, doc]);
    } else {
      setDocuments(documents.filter(d => d !== doc));
    }
  };

  const handleSubmit = () => {
    updateFormData({
      paymentMethod: paymentMethods.join(", "),
      installmentPlan,
      documents
    });
    onNext();
  };

  return (
    <div className="space-y-6 glass-card p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-lg font-medium">Méthode de paiement</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Carte bancaire", "PayPal", "Mobile Money", "Virement"].map((method) => (
              <div key={method} className="flex items-center space-x-3">
                <Checkbox 
                  id={`payment-method-${method}`}
                  checked={paymentMethods.includes(method)}
                  onCheckedChange={(checked) => handlePaymentMethodChange(method, checked as boolean)}
                />
                <Label htmlFor={`payment-method-${method}`} className="font-normal">
                  {method}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">Paiement échelonné</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { value: "2 fois", label: "2 fois" },
              { value: "3 fois", label: "3 fois (+5% de frais)" }
            ].map((plan) => (
              <div key={plan.value} className="flex items-center space-x-3">
                <Checkbox 
                  id={`installment-${plan.value}`}
                  checked={installmentPlan === plan.value}
                  onCheckedChange={(checked) => handleInstallmentPlanChange(plan.value, checked as boolean)}
                />
                <Label htmlFor={`installment-${plan.value}`} className="font-normal">
                  {plan.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">Documents requis</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Copie passeport", "Justificatif de domicile"].map((doc) => (
              <div key={doc} className="flex items-center space-x-3">
                <Checkbox 
                  id={`document-${doc}`}
                  checked={documents.includes(doc)}
                  onCheckedChange={(checked) => handleDocumentChange(doc, checked as boolean)}
                />
                <Label htmlFor={`document-${doc}`} className="font-normal">
                  {doc}
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

export default PaymentSection;
