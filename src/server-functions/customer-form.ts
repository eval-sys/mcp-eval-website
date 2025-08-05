import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { db, customerSubmissions } from '~/db';
import { eq } from 'drizzle-orm';

// Validation schema for form data
const customerFormSchema = z.object({
  custname: z.string().min(1, 'Customer name is required').max(255),
  custtel: z.string().min(1, 'Phone number is required').max(50),
  custemail: z.string().email('Invalid email address').max(255),
  size: z.enum(['small', 'medium', 'large'], {
    errorMap: () => ({ message: 'Size must be small, medium, or large' })
  }),
  delivery: z.enum(['morning', 'afternoon', 'evening'], {
    errorMap: () => ({ message: 'Delivery time must be morning, afternoon, or evening' })
  }),
  comments: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

// Server function to submit customer form
export const submitCustomerForm = createServerFn()
  .validator(customerFormSchema)
  .handler(async ({ data }) => {
    try {
      // Insert into database
      const [submission] = await db
        .insert(customerSubmissions)
        .values({
          custname: data.custname,
          custtel: data.custtel,
          custemail: data.custemail,
          size: data.size,
          delivery: data.delivery,
          comments: data.comments || null,
        })
        .returning();

      return {
        success: true,
        submissionId: submission.id,
        timestamp: submission.createdAt,
      };
    } catch (error) {
      console.error('Error saving customer form:', error);
      throw new Error('Failed to save form submission');
    }
  });

// Server function to get customer submission by ID
export const getCustomerSubmission = createServerFn()
  .validator(z.object({
    id: z.number().positive(),
  }))
  .handler(async ({ data }) => {
    try {
      const [submission] = await db
        .select()
        .from(customerSubmissions)
        .where(eq(customerSubmissions.id, data.id))
        .limit(1);

      if (!submission) {
        throw new Error('Submission not found');
      }

      return {
        success: true,
        submission: {
          id: submission.id,
          custname: submission.custname,
          custtel: submission.custtel,
          custemail: submission.custemail,
          size: submission.size,
          delivery: submission.delivery,
          comments: submission.comments,
          createdAt: submission.createdAt,
        },
      };
    } catch (error) {
      console.error('Error fetching customer submission:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch submission');
    }
  });