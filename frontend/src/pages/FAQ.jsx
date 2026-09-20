import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = React.useState(null);

  const faqs = [
    {
      question: "How much does a shuttle from Hibiscus Coast to Auckland Airport cost?",
      answer: "Our premium airport shuttle service starts from $120 for Orewa to Auckland Airport. Pricing varies based on pickup location, number of passengers, and service level. Use our online booking system for instant pricing."
    },
    {
      question: "What areas do you service on the Hibiscus Coast?",
      answer: "We provide premium transport services throughout the Hibiscus Coast including Orewa, Whangaparaoa, Silverdale, Red Beach, Gulf Harbour, Stanmore Bay, and surrounding areas. We also service North Shore suburbs."
    },
    {
      question: "How far in advance should I book my airport transfer?",
      answer: "We recommend booking at least 24 hours in advance to guarantee your preferred pickup time. However, we accept same-day bookings subject to availability. Our premium service ensures reliable scheduling."
    },
    {
      question: "What makes your service different from other shuttle companies?",
      answer: "Hibiscus to Airport offers premium transportation with luxury Toyota Hiace vehicles, professional uniformed drivers, flight monitoring, complimentary Wi-Fi, and guaranteed pickup times. Unlike basic shuttle services, we focus on comfort and reliability."
    },
    {
      question: "Do you provide 24/7 airport transfer service?",
      answer: "Yes, we operate 24 hours a day, 7 days a week to accommodate all flight schedules including early morning and late-night departures. Our professional drivers are available around the clock."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We offer free cancellation up to 24 hours before your scheduled pickup time. Cancellations made less than 24 hours in advance may incur a fee. Full terms available during booking."
    },
    {
      question: "Do you accommodate large groups or families?",
      answer: "Our luxury Toyota Hiace vehicles accommodate up to 11 passengers with luggage. For larger groups, we can arrange multiple vehicles. All our vehicles meet safety standards and provide comfortable seating."
    },
    {
      question: "How do I track my booking or contact the driver?",
      answer: "After booking, you'll receive a confirmation email with your booking reference and driver contact details. On pickup day, our professional driver will contact you with vehicle details and exact arrival time."
    }
  ];

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="Frequently Asked Questions"
        description="Common questions about Hibiscus to Airport shuttle service - pricing, service areas, booking, cancellation policy, and more."
        path="/faq"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Book an Airport Shuttle from Hibiscus Coast to Auckland Airport",
          "description": "Step-by-step guide to booking a private airport shuttle from the Hibiscus Coast to Auckland Airport.",
          "step": [
            {"@type": "HowToStep", "position": 1, "name": "Visit the booking page", "text": "Go to hibiscustoairport.co.nz/booking and enter your pickup address."},
            {"@type": "HowToStep", "position": 2, "name": "Select date and time", "text": "Choose your travel date, pickup time, and number of passengers."},
            {"@type": "HowToStep", "position": 3, "name": "Get instant price", "text": "The system calculates your fare based on distance. No surge pricing."},
            {"@type": "HowToStep", "position": 4, "name": "Confirm and pay", "text": "Pay securely via Stripe or choose cash payment to the driver."},
            {"@type": "HowToStep", "position": 5, "name": "Receive confirmation", "text": "Get instant email and SMS confirmation with your booking reference."}
          ],
          "totalTime": "PT2M"
        })}</script>
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Everything you need to know about our premium airport shuttle service from Hibiscus Coast to Auckland Airport.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-start hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleItem(index)}
                >
                  <h3
                    className="text-lg font-semibold text-gray-900 pr-4"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openItem === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openItem === index && (
                  <div
                    className="px-6 pb-6 text-gray-700 leading-relaxed"
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <div itemProp="text">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16 bg-gradient-to-br from-gold to-amber-500 rounded-2xl p-8 text-black">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6">
              Our premium customer service team is here to help with any additional questions about your airport transfer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@bookaride.co.nz"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Email info@bookaride.co.nz
              </a>
              <a
                href="/book-now"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Book Online
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;