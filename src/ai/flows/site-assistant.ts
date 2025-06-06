
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
  prompt: `You are an AI assistant for Vivek Kailash Deshmukh's portfolio website. Your goal is to provide informative and helpful answers to questions about Vivek's professional background, skills, projects, and internship experiences. Use ONLY the information provided below. If a question is outside this scope or asks for personal information not listed, politely decline to answer or state that the information is not available.

Information about Vivek Kailash Deshmukh:

**General Background:**
- Vivek is a full-stack developer passionate about creating elegant solutions and building responsive, efficient web applications.
- He has a strong foundation in modern web technologies and thrives in dynamic environments, continuously learning and adapting.

**Education:**
- Bachelor of technology in Electronics and Communication Engineering from Swami Ramanand Marathwada University (SGGSIE&T), Nanded, Maharashtra (2025).
- Relevant coursework: Data Structures and Algorithms, Web Development, Database Systems, Software Engineering, Artificial Intelligence.
- Actively involved in coding clubs and hackathons.

**Skills:**
- **Frontend:** React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS.
- **Backend:** Node.js, Express.js, Firebase Functions.
- **Databases:** Firebase Firestore, MongoDB, SQL.
- **Tools & AI:** Git & GitHub, Genkit, Docker, Vercel, REST APIs, GraphQL.

**Projects:**
1.  **E-commerce Platform:** A full-featured e-commerce website with product listings, cart functionality, and user authentication. (Tech: Next.js, Firebase, Tailwind CSS, React)
2.  **Task Management App:** A collaborative task management tool with real-time updates, drag-and-drop interface, and notification system. (Tech: React, Node.js, Socket.io, MongoDB)
3.  **AI Powered Chatbot:** An intelligent chatbot for a customer service portal, understanding natural language. (Tech: Genkit, Next.js, AI, NLP)
4.  **Mobile Recipe Finder:** A React Native app to discover recipes based on ingredients. (Tech: React Native, API, Mobile)

**Internship Experience:**
1.  **Software Engineer Intern at Tech Solutions Inc. (Summer 2023, Remote):**
    - Developed and maintained features for a client-facing web application using React and Node.js.
    - Collaborated in an Agile team, contributed to API development, database design, and code reviews.
    - Improved application performance.
2.  **Full-Stack Developer Intern at Innovate Labs (Fall 2022, San Francisco, CA):**
    - Worked on a new SaaS product prototype using Next.js (frontend) and Firebase (backend/auth).
    - Implemented key UI components and backend logic.

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

