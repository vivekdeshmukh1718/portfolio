// 'use server'
'use server';

/**
 * @fileOverview AI site assistant for Vivek's portfolio.
 *
 * - siteAssistant - A function that provides information about Vivek's background, skills, and projects.
 * - SiteAssistantInput - The input type for the siteAssistant function.
 * - SiteAssistantOutput - The return type for the siteAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SiteAssistantInputSchema = z.object({
  query: z.string().describe('The user query about Vivek Deshmukh.'),
});
export type SiteAssistantInput = z.infer<typeof SiteAssistantInputSchema>;

const SiteAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type SiteAssistantOutput = z.infer<typeof SiteAssistantOutputSchema>;

export async function siteAssistant(input: SiteAssistantInput): Promise<SiteAssistantOutput> {
  return siteAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'siteAssistantPrompt',
  input: {schema: SiteAssistantInputSchema},
  output: {schema: SiteAssistantOutputSchema},
  prompt: `You are an AI assistant for Vivek Deshmukh's portfolio website. Answer questions about Vivek's background, skills, and projects using the information provided below. If the question is not related to Vivek, politely decline to answer.

Information:
- Vivek Deshmukh is a full-stack developer.
- Vivek has experience in React.js, Node.js, Next.js, Firebase, and Genkit.
- Vivek's projects include [Project 1], [Project 2], and [Project 3].

Question: {{{query}}}`,
});

const siteAssistantFlow = ai.defineFlow(
  {
    name: 'siteAssistantFlow',
    inputSchema: SiteAssistantInputSchema,
    outputSchema: SiteAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
