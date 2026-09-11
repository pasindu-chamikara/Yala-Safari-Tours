import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'Privacy Policy | Yala Safari Tours',
  description: 'Our privacy policy and how we handle your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      <Navbar />

      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
          Privacy Policy
        </h1>
        <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
          <p>
            At Yala Safari Tours, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and payment details when you book a safari, contact us, or register an account on our website.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process your bookings and manage your account.</li>
            <li>Communicate with you regarding your tour, updates, or customer support.</li>
            <li>Improve our website, services, and overall customer experience.</li>
            <li>Send promotional emails (you can opt-out at any time).</li>
          </ul>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your data is stored securely and is only accessible by authorized personnel.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">4. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at info@yalasafaritours.com.
          </p>
        </div>
      </section>
    </main>
  );
}
