import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const Route = createFileRoute("/_layout/forms/")({
  component: FormInteractionTest,
});

interface FormData {
  custname: string;
  custtel: string;
  custemail: string;
  size: string;
  delivery: string;
  comments: string;
}

function FormInteractionTest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    custname: "",
    custtel: "",
    custemail: "",
    size: "",
    delivery: "",
    comments: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form submit handler called");
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    try {
      console.log("Processing form submission with data:", formData);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store form data in sessionStorage and navigate to result page
      const submissionData = {
        success: true,
        timestamp: new Date().toISOString(),
        formData: { ...formData },
        url: window.location.href,
        method: "POST",
      };
      
      console.log("Storing in sessionStorage:", submissionData);
      sessionStorage.setItem('formSubmissionData', JSON.stringify(submissionData));
      
      console.log("Navigating to result page");
      navigate({ to: "/forms/result" });
    } catch (err) {
      console.error("Form submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Customer Information Form</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4" data-testid="customer-form">
        <div className="space-y-2">
          <Label htmlFor="custname">Customer Name *</Label>
          <Input
            id="custname"
            name="custname"
            type="text"
            placeholder="Enter your full name"
            value={formData.custname}
            onChange={(e) => handleInputChange("custname", e.target.value)}
            required
            data-testid="custname-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="custtel">Phone Number *</Label>
          <Input
            id="custtel"
            name="custtel"
            type="tel"
            placeholder="123-456-7890"
            value={formData.custtel}
            onChange={(e) => handleInputChange("custtel", e.target.value)}
            required
            data-testid="custtel-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="custemail">Email Address *</Label>
          <Input
            id="custemail"
            name="custemail"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.custemail}
            onChange={(e) => handleInputChange("custemail", e.target.value)}
            required
            data-testid="custemail-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Size *</Label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={(e) => handleInputChange("size", e.target.value)}
            required
            data-testid="size-select"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select size...</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="space-y-3">
          <Label>Delivery Time *</Label>
          <div className="space-y-2">
            {["morning", "afternoon", "evening"].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`delivery-${time}`}
                  name="delivery"
                  value={time}
                  checked={formData.delivery === time}
                  onChange={(e) => handleInputChange("delivery", e.target.value)}
                  required
                  data-testid={`delivery-${time}-radio`}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <Label htmlFor={`delivery-${time}`} className="text-sm font-normal">
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Additional Comments</Label>
          <textarea
            id="comments"
            name="comments"
            placeholder="Enter any additional comments..."
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            data-testid="comments-textarea"
            rows={4}
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting}
          data-testid="submit-button"
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Form"}
        </Button>
      </form>
    </div>
  );
}