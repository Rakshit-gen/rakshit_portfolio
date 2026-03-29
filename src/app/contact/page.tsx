import { ContactSection } from "@/components/contact/contact-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Rakshit Sisodiya",
  description: "Get in touch — open to opportunities and collaboration.",
};

export default function ContactPage() {
  return (
    <div className="page-transition pt-20 sm:pt-24 pb-12 sm:pb-16">
      <ContactSection />
    </div>
  );
}
