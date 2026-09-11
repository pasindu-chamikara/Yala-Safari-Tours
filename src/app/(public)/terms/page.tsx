import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'Terms & Conditions | Yala Safari Tours',
  description: 'Terms and conditions for booking and using our services.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-stone-50 font-sans">
      <Navbar />

      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
          Terms & Conditions
        </h1>
        <div className="prose prose-stone max-w-none text-stone-600 space-y-6">
          <p>
            Welcome to Yala Safari Tours. By accessing our website and booking our services, you agree to be bound by the following Terms & Conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">1. Booking and Reservations</h2>
          <p>
            All bookings are subject to availability. To secure a booking, you must provide accurate personal information. We reserve the right to decline or cancel any booking at our discretion.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">2. Payments and Cancellations</h2>
          <p>
            Payment terms will be communicated during the booking process. Cancellations made within the specified notice period (typically 7 days prior to the safari) may be eligible for a full or partial refund. Cancellations made outside this period may incur fees.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">3. Wildlife and Safari Rules</h2>
          <p>
            Our safaris operate in natural, wild environments. We cannot guarantee specific wildlife sightings. All guests must strictly adhere to the instructions of our guides and park rangers to ensure safety and minimize disruption to the animals.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">4. Liability</h2>
          <p>
            While we take every precaution to ensure your safety, Yala Safari Tours is not liable for any injury, loss, or damage to personal property that may occur during the safari or on park premises.
          </p>

          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">5. Changes to Itinerary</h2>
          <p>
            We reserve the right to alter the itinerary or cancel a safari due to extreme weather, safety concerns, or park closures. In such cases, we will offer alternative arrangements or a refund.
          </p>
          
          <h2 className="text-2xl font-bold text-stone-800 mt-8 mb-4">6. Contact Information</h2>
          <p>
            For any queries regarding these Terms & Conditions, please reach out to us via our Contact page or at info@yalasafaritours.com.
          </p>
        </div>
      </section>
    </main>
  );
}
