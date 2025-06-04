
'use server';
/**
 * @fileOverview An AI-powered project idea generator.
 *
 * - generateProjectIdea - A function that generates a unique project idea based on user keywords.
 * - ProjectIdeaInput - The input type for the generateProjectIdea function.
 * - ProjectIdeaOutput - The return type for the generateProjectIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectIdeaInputSchema = z.object({
  keywords: z.string().describe('User-provided keywords related to their mood, interests, or technologies they want to explore (e.g., "creative, web3, games" or "learning, python, data visualization").'),
});
export type ProjectIdeaInput = z.infer<typeof ProjectIdeaInputSchema>;

const ProjectIdeaOutputSchema = z.object({
  projectName: z.string().describe('A catchy and unique name for the generated project idea.'),
  projectDescription: z.string().describe('A concise (1-3 sentences) description of the project concept, highlighting its unique aspects.'),
  suggestedTech: z.array(z.string()).describe('A list of suggested technologies relevant to the project idea. Examples: ["React", "Next.js", "Python", "Firebase"].'),
  tagline: z.string().describe('A short, punchy tagline or elevator pitch for the project (max 10 words).'),
});
export type ProjectIdeaOutput = z.infer<typeof ProjectIdeaOutputSchema>;

export async function generateProjectIdea(input: ProjectIdeaInput): Promise<ProjectIdeaOutput> {
  return projectIdeaGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectIdeaGeneratorPrompt',
  input: {schema: ProjectIdeaInputSchema},
  output: {schema: ProjectIdeaOutputSchema},
  prompt: `You are an AI assistant designed to help users brainstorm unique, impressive, and innovative project ideas. The user will provide some keywords.
Your goal is to transform these keywords into a compelling project concept.

The portfolio owner, Vivek Kailash Deshmukh, has skills in:
- Frontend: React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS.
- Backend: Node.js, Express.js, Firebase Functions.
- Databases: Firebase Firestore, MongoDB, SQL.
- Tools & AI: Git & GitHub, Genkit, Docker, Vercel, REST APIs, GraphQL.

Your task is to:
1.  Generate a **catchy and unique project name**.
2.  Provide a **concise (1-3 sentences) description** of the project concept. Emphasize what makes it innovative or different.
3.  Suggest a **relevant tech stack (3-5 technologies)**. If appropriate and aligned with the idea, try to include some of Vivek's known skills (listed above) to subtly showcase his expertise. However, prioritize relevance to the generated idea.
4.  Create a **short, punchy tagline** or elevator pitch for the project (maximum 10 words).
5.  The overall idea should feel fresh, modern, and not a common tutorial project. Aim for something that would genuinely impress someone.

User Keywords: {{{keywords}}}

Please provide the output in the specified structured format. Ensure the suggested tech stack is an array of strings.
Example for "retro gaming, pixel art, web":
Project Name: PixelVault Arcade
Description: A community-driven platform where users can submit, play, and rate new indie pixel art games with a retro aesthetic. Features weekly game jams and artist showcases.
Suggested Tech: ["Next.js", "Firebase Firestore", "Tailwind CSS", "PixiJS"]
Tagline: Your portal to new retro gaming adventures!
`,
});

const projectIdeaGeneratorFlow = ai.defineFlow(
  {
    name: 'projectIdeaGeneratorFlow',
    inputSchema: ProjectIdeaInputSchema,
    outputSchema: ProjectIdeaOutputSchema,
  },
  async input => {
    if (!input.keywords || input.keywords.trim() === "") {
        throw new Error("Keywords cannot be empty.");
    }
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("The AI failed to generate an idea. Please try again with different keywords.");
    }
    return output;
  }
);
