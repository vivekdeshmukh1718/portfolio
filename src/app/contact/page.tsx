
import type { Metadata } from 'next';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactFormSection } from "@/components/sections/contact-form-section";

export const metadata: Metadata = {
  title: "Contact Me - Vivek's Digital Canvas",
  description: "Get in touch with Vivek Kailash Deshmukh. Send a message for collaborations, queries, or just to say hi!",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
