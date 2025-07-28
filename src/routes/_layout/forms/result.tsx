import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/_layout/forms/result")({
  component: FormResultPage,
});

interface SubmissionData {
  success: boolean;
  timestamp: string;
  formData: {
    custname: string;
    custtel: string;
    custemail: string;
    size: string;
    delivery: string;
    comments: string;
  };
  url: string;
  method: string;
}

function FormResultPage() {
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('formSubmissionData');
    if (data) {
      setSubmissionData(JSON.parse(data));
      sessionStorage.removeItem('formSubmissionData');
    }
  }, []);

  if (!submissionData) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Form Submission Result</h1>
        <p className="text-muted-foreground">No submission data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <CheckCircle className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-bold">Form Submission Successful</h1>
      </div>

      <div className="border rounded-lg p-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Submitted Data</h2>
          <div className="bg-muted rounded-md p-4 space-y-2" data-testid="submission-data">
            <div><strong>Customer Name:</strong> {submissionData.formData.custname}</div>
            <div><strong>Phone Number:</strong> {submissionData.formData.custtel}</div>
            <div><strong>Email Address:</strong> {submissionData.formData.custemail}</div>
            <div><strong>Size:</strong> {submissionData.formData.size}</div>
            <div><strong>Delivery Time:</strong> {submissionData.formData.delivery}</div>
            <div><strong>Comments:</strong> {submissionData.formData.comments || 'None'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}