import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { getCustomerSubmission } from "~/server-functions/customer-form";

export const Route = createFileRoute("/_layout/forms/result/$submissionId")({
  component: FormResultPage,
});

interface SubmissionData {
  custname: string;
  custtel: string;
  custemail: string;
  size: string;
  delivery: string;
  comments: string | null;
  createdAt: Date;
}

function FormResultPage() {
  const { submissionId } = Route.useParams();
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const result = await getCustomerSubmission({
          data: { id: parseInt(submissionId) }
        });
        
        if (result.success && result.submission) {
          setSubmissionData(result.submission);
        }
      } catch (err) {
        console.error('Error fetching submission:', err);
        setError(err instanceof Error ? err.message : 'Failed to load submission');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubmission();
  }, [submissionId]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Form Submission Result</h1>
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error || !submissionData) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Form Submission Result</h1>
        <div className="p-3 rounded-md flex items-center gap-2 bg-red-50 text-red-700 border border-red-200">
          <AlertCircle className="h-4 w-4" />
          <span>{error || 'Submission not found'}</span>
        </div>
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
            <div><strong>Submission ID:</strong> {submissionId}</div>
            <div><strong>Customer Name:</strong> {submissionData.custname}</div>
            <div><strong>Phone Number:</strong> {submissionData.custtel}</div>
            <div><strong>Email Address:</strong> {submissionData.custemail}</div>
            <div><strong>Size:</strong> {submissionData.size}</div>
            <div><strong>Delivery Time:</strong> {submissionData.delivery}</div>
            <div><strong>Comments:</strong> {submissionData.comments || 'None'}</div>
            <div><strong>Submitted At:</strong> {new Date(submissionData.createdAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}