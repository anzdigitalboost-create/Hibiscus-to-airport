import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageMeta from '../components/PageMeta';
import { Button } from '../components/ui/button';
import { Plane, Clock, Shield, DollarSign, MapPin, Users, Star, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How far in advance should I book a North Shore airport shuttle?',
    a: 'We recommend booking at least 24 hours ahead to guarantee your preferred pickup time, especially for early morning flights. However, we accept same-day bookings subject to availability. Our online booking system provides instant confirmation so you know your ride is secured.',
  },
  {
    q: 'Do you offer return transfers from Auckland Airport to the North Shore?',
    a: 'Absolutely. We provide both departures and arrivals transfers. For airport pickups, we monitor your flight in real time so your driver is waiting when you land — even if your flight is delayed. We cover both the domestic and international terminals at Auckland Airport.',
  },
  {
    q: 'What is the difference between your private shuttle and a shared airport shuttle?',
    a: 'Our service is a private, door-to-door transfer. Unlike shared shuttles that make multiple stops and can add 30–60 minutes to your journey, you travel directly from your North Shore address to the airport terminal. No detours, no waiting for other passengers, and no cramped seating.',
  },
  {
    q: 'Can you accommodate large groups or extra luggage from the North Shore?',
    a: 'Yes. Our Toyota Hiace fleet comfortably seats up to 11 passengers with generous luggage space. For families travelling with car seats, surfboards, golf clubs, or oversized luggage, just mention it when booking and we will make sure there is room.',
  },
  {
    q: 'Is there surge pricing for early morning or late night North Shore pickups?',
    a: 'No. We operate 24/7 with flat-rate pricing — the fare you see at booking is the fare you pay, whether your flight departs at 5 am or 11 pm. There are no hidden fees, no surge multipliers, and no credit card surcharges.',
  },
];

const suburbs = [
  { name: 'Albany', link: '/albany-airport-shuttle', price: '$85', time: '~45 min' },
  { name: 'Takapuna', link: '/takapuna-airport-shuttle', price: '$90', time: '~50 min' },
  { name: 'Browns Bay', link: '/browns-bay-airport-shuttle', price: '$90', time: '~50 min' },
  { name: 'Devonport', link: '/devonport-airport-shuttle', price: '$95', time: '~55 min' },
  { name: 'Mairangi Bay', link: '/mairangi-bay-airport-shuttle', price: '$90', time: '~50 min' },
  { name: 'Birkenhead', link: null, price: '$90', time: '~45 min' },
  { name: 'Northcote', link: null, price: '$90', time: '~45 min' },
  { name: 'Glenfield', link: null, price: '$85', time: '~45 min' },
  { name: 'Milford', link: null, price: '$90', time: '~50 min' },
  { name: 'Beach Haven', link: null, price: '$90', time: '~45 min' },
  { name: 'Castor Bay', link: null, price: '$90', time: '~50 min' },
  { name: 'Campbells Bay', link: null, price: '$90', time: '~50 min' },
  { name: 'Sunnynook', link: null, price: '$85', time: '~45 min' },
  { name: 'Forrest Hill', link: null, price: '$90', time: '~50 min' },
];

const NorthShoreAirportShuttle = () => {
  const [openFaq, setOpenFaq] = React.useState(null);

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  return (
    <div className="min-h-screen bg-white">
      <PageMeta
        title="North Shore Airport Shuttle | Door-to-Door Auckland Airport Transfers"
        description="Private airport shuttle from North Shore Auckland to Auckland Airport. Door-to-door service from Takapuna, Albany, Browns Bay, Devonport & all North Shore suburbs. Flat rates, no surge pricing. Book online 24/7."
        path="/north-shore-airport-shuttle"
      />

      {/* FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            North Shore Airport Shuttle{' '}
            <span className="block text-gold mt-3">to Auckland Airport</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Private, door-to-door airport transfers from every North Shore suburb. Flat rates, professional drivers, and 24/7 availability — including early morning and late night flights.
          </p>
          <Link to="/book-now">
            <Button className="bg-gold hover:bg-amber-500 text-black font-bold text-lg px-8 py-6">
              Book Your North Shore Airport Transfer
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Door-to-Door</h3>
              <p className="text-gray-600">Picked up right at your North Shore address</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">24/7 Service</h3>
              <p className="text-gray-600">Early morning, late night — we never close</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">No Surge Pricing</h3>
              <p className="text-gray-600">Flat rates guaranteed, day or night</p>
            </div>
            <div className="text-center">
              <Plane className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Flight Tracking</h3>
              <p className="text-gray-600">We monitor your flight for delay-proof pickups</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Trusted North Shore Airport Shuttle Service</h2>
            <p>
              Getting from the North Shore to Auckland Airport should not be stressful. Whether you live in Takapuna, Albany, Browns Bay, Devonport, or anywhere in between, Hibiscus to Airport provides a reliable, comfortable, and affordable private airport shuttle that picks you up at your front door and delivers you straight to the terminal.
            </p>
            <p>
              Unlike shared shuttle services that zigzag across Auckland collecting passengers, our North Shore airport transfer is a direct, private ride. That means no unnecessary stops, no sitting in a cramped van with strangers, and no anxiety about missing your flight because the driver is running behind schedule. You set the pickup time, and we are there — guaranteed.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Door-to-Door Service from Every North Shore Suburb</h2>
            <p>
              We cover the full North Shore, from the harbour-side streets of Devonport to the northern reaches of Albany and everywhere in between. Our drivers know the North Shore roads inside out, including the best routes to avoid congestion on the Northern Motorway and Harbour Bridge during peak hours.
            </p>
            <p>
              Suburbs we serve include <strong>Takapuna</strong>, <strong>Devonport</strong>, <strong>Browns Bay</strong>, <strong>Mairangi Bay</strong>, <strong>Albany</strong>, <strong>Birkenhead</strong>, <strong>Northcote</strong>, <strong>Glenfield</strong>, <strong>Beach Haven</strong>, <strong>Milford</strong>, <strong>Castor Bay</strong>, <strong>Campbells Bay</strong>, <strong>Sunnynook</strong>, and <strong>Forrest Hill</strong>. No matter where you are on the Shore, we will come to you.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">North Shore to Auckland Airport — Travel Times</h2>
            <p>
              Auckland Airport sits roughly 45 to 60 minutes from most North Shore suburbs, depending on traffic and your exact location. From Albany and Glenfield, the trip via the Northern Motorway and SH20 typically takes around 45 minutes outside peak hours. From Takapuna, Milford, and the East Coast Bays suburbs like Browns Bay and Mairangi Bay, expect around 50 minutes. Devonport, being the furthest south on the peninsula, is about 55 minutes from the airport.
            </p>
            <p>
              During morning rush hour (6:30–9:00 am) and evening peak (4:00–6:30 pm), add 15–20 minutes. Our drivers factor traffic conditions into every pickup schedule, so we always build in a comfortable buffer. You will arrive at the airport with time to spare — not scrambling through check-in.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Choose a Private Shuttle Over Shared Rides?</h2>
            <p>
              Shared airport shuttles — like the old SuperShuttle model — might seem cheaper at first glance, but the hidden costs add up quickly. A shared ride from the North Shore to Auckland Airport typically involves 3–5 additional stops, adding 30 to 60 minutes onto your journey. That means waking up even earlier for a dawn flight, or sitting in a van for well over an hour when the direct drive is under 50 minutes.
            </p>
            <p>
              With Hibiscus to Airport, you get a private, direct transfer at a flat rate. There is no per-person pricing — our fares are per trip, which means families and small groups often pay less than they would on a shared shuttle. You also get the comfort of a modern Toyota Hiace with air conditioning, plenty of luggage space, and a professional driver in business attire.
            </p>
            <p>
              Rideshare apps like Uber can work for airport runs, but pricing is unpredictable. A ride that costs $65 on a quiet Tuesday afternoon might surge to $120 on a Friday evening or during a rain storm. Our flat-rate pricing means the quote you receive at booking is exactly what you pay — no surprises, no surge multipliers, no cancellation anxiety.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">24/7 Availability — Including Early Morning Flights</h2>
            <p>
              Many North Shore residents fly out on early morning domestic and international departures. Flights to Queenstown, Wellington, and Christchurch often leave before 7 am, which means a 4:30 or 5:00 am pickup from the North Shore. We operate around the clock, 365 days a year, including public holidays. There is no "too early" and no "too late" for our service.
            </p>
            <p>
              For late-night arrivals, we track your incoming flight in real time. If your plane lands at midnight or later, your driver will be in the arrivals area ready to help with luggage and get you home to the North Shore as quickly as possible. No standing in a taxi queue, no waiting for a rideshare that may or may not show up.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Our Fleet and Drivers</h2>
            <p>
              We run a fleet of well-maintained Toyota Hiace vans — spacious, clean, and comfortable with room for up to 11 passengers and their luggage. Every vehicle is regularly serviced, fully insured, and equipped with air conditioning and USB charging ports. Whether you are travelling solo with a carry-on or as a family of six with suitcases, surfboards, and a car seat, we have the space.
            </p>
            <p>
              Our drivers are locals who know the North Shore intimately. They are professionally presented in business attire, hold all required licences and endorsements, and are trained to provide a premium experience from the moment they arrive at your door. Expect a friendly greeting, help with luggage, and a smooth, safe drive to the airport.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">North Shore Airport Shuttle Prices</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Flat-rate fares from North Shore suburbs to Auckland Airport. Price is per trip, not per person — great value for couples and families.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {suburbs.map((s) => (
              <div key={s.name} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {s.link ? (
                      <Link to={s.link} className="hover:text-gold transition-colors">{s.name}</Link>
                    ) : (
                      s.name
                    )}
                  </h3>
                  <span className="text-gold font-bold text-xl">{s.price}</span>
                </div>
                <p className="text-sm text-gray-500">Travel time: {s.time}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Prices are indicative starting fares. Final price confirmed at booking based on exact pickup address. All fares include GST.
          </p>
        </div>
      </section>

      {/* Internal Links to Suburb Pages */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore North Shore Suburb Shuttle Pages</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/albany-airport-shuttle" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gold hover:text-black transition-colors font-semibold">
              Albany Airport Shuttle
            </Link>
            <Link to="/takapuna-airport-shuttle" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gold hover:text-black transition-colors font-semibold">
              Takapuna Airport Shuttle
            </Link>
            <Link to="/browns-bay-airport-shuttle" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gold hover:text-black transition-colors font-semibold">
              Browns Bay Airport Shuttle
            </Link>
            <Link to="/devonport-airport-shuttle" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gold hover:text-black transition-colors font-semibold">
              Devonport Airport Shuttle
            </Link>
            <Link to="/mairangi-bay-airport-shuttle" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gold hover:text-black transition-colors font-semibold">
              Mairangi Bay Airport Shuttle
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">North Shore Airport Shuttle — Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ready to Book Your <span className="text-gold">North Shore Airport Transfer</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Flat rates, professional drivers, and door-to-door service from any North Shore suburb. Book online in under two minutes.
          </p>
          <Link to="/book-now">
            <Button className="bg-gold hover:bg-amber-500 text-black font-bold text-lg px-10 py-6">
              Book Your North Shore Airport Transfer
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NorthShoreAirportShuttle;
