import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

// --- Eagerly loaded (critical path) ---
import HomePage from "./pages/HomePage";
// Shared booking system: BookNow and PaymentSuccess are copied verbatim from
// bookaride.co.nz (see scripts/sync-booking.mjs) and talk to its API via the
// /api rewrite in vercel.json. Never edit them here.
import { BookNow } from "./pages/BookNow";

// --- Lazy loaded public pages ---
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const FAQ = lazy(() => import("./pages/FAQ"));

// Suburb shuttle pages
const OrewaShuttle = lazy(() => import("./pages/OrewaShuttle"));
const OrewaToAirport = lazy(() => import("./pages/OrewaToAirport"));
const SilverdaleShuttle = lazy(() => import("./pages/SilverdaleShuttle"));
const WhangaparaoaShuttle = lazy(() => import("./pages/WhangaparaoaShuttle"));
const RedBeachShuttle = lazy(() => import("./pages/RedBeachShuttle"));
const GulfHarbourShuttle = lazy(() => import("./pages/GulfHarbourShuttle"));
const StanmoreBayShuttle = lazy(() => import("./pages/StanmoreBayShuttle"));
const ArklesBayShuttle = lazy(() => import("./pages/ArklesBayShuttle"));
const ArmyBayShuttle = lazy(() => import("./pages/ArmyBayShuttle"));
const HatfieldsBeachShuttle = lazy(() => import("./pages/HatfieldsBeachShuttle"));
const ManlyShuttle = lazy(() => import("./pages/ManlyShuttle"));
const AlbanyShuttle = lazy(() => import("./pages/AlbanyShuttle"));
const TakapunaShuttle = lazy(() => import("./pages/TakapunaShuttle"));
const BrownsBayShuttle = lazy(() => import("./pages/BrownsBayShuttle"));
const MairangiBayShuttle = lazy(() => import("./pages/MairangiBayShuttle"));
const DevonportShuttle = lazy(() => import("./pages/DevonportShuttle"));
const DairyFlatAirportShuttle = lazy(() => import("./pages/DairyFlatAirportShuttle"));
const WarkworthAirportShuttle = lazy(() => import("./pages/WarkworthAirportShuttle"));
const MillwaterAirportShuttle = lazy(() => import("./pages/MillwaterAirportShuttle"));
const OmahaAirportShuttle = lazy(() => import("./pages/OmahaAirportShuttle"));
const PuhoiAirportShuttle = lazy(() => import("./pages/PuhoiAirportShuttle"));
const SnellsBeachAirportShuttle = lazy(() => import("./pages/SnellsBeachAirportShuttle"));
const WellsfordAirportShuttle = lazy(() => import("./pages/WellsfordAirportShuttle"));
const LeighAirportShuttle = lazy(() => import("./pages/LeighAirportShuttle"));

// Service type pages
const AucklandAirportTransfers = lazy(() => import("./pages/AucklandAirportTransfers"));
const CorporateTransfers = lazy(() => import("./pages/CorporateTransfers"));
const StudentAirportTransfers = lazy(() => import("./pages/StudentAirportTransfers"));
const ExecutiveAirportTransfers = lazy(() => import("./pages/ExecutiveAirportTransfers"));
const FamilyAirportShuttle = lazy(() => import("./pages/FamilyAirportShuttle"));
const BusinessAirportTransfer = lazy(() => import("./pages/BusinessAirportTransfer"));
const CruiseTransfers = lazy(() => import("./pages/CruiseTransfers"));
const BestAirportShuttle = lazy(() => import("./pages/BestAirportShuttle"));
const HibiscusShuttlesAlternative = lazy(() => import("./pages/HibiscusShuttlesAlternative"));
const LocalAirportShuttle = lazy(() => import("./pages/LocalAirportShuttle"));
const AirportShuttleOrewa = lazy(() => import("./pages/AirportShuttleOrewa"));
const LateNightAirportShuttle = lazy(() => import("./pages/LateNightAirportShuttle"));
const EarlyMorningShuttle = lazy(() => import("./pages/EarlyMorningShuttle"));
const EarlyMorningFlightShuttle = lazy(() => import("./pages/EarlyMorningFlightShuttle"));
const AirportArrivals = lazy(() => import("./pages/AirportArrivals"));
const NorthShoreAirportShuttle = lazy(() => import("./pages/NorthShoreAirportShuttle"));

// School pages
const OrewaCollegeShuttle = lazy(() => import("./pages/OrewaCollegeShuttle"));
const WhangaparaoaCollegeShuttle = lazy(() => import("./pages/WhangaparaoaCollegeShuttle"));
const KingswaySchoolShuttle = lazy(() => import("./pages/KingswaySchoolShuttle"));
const LongBayCollegeShuttle = lazy(() => import("./pages/LongBayCollegeShuttle"));
const RangitotoCollegeShuttle = lazy(() => import("./pages/RangitotoCollegeShuttle"));

// Matakana pages
const MatakanaShuttle = lazy(() => import("./pages/MatakanaShuttle"));
const MatakanaEventsShuttle = lazy(() => import("./pages/MatakanaEventsShuttle"));
const MatakanaConcertShuttle = lazy(() => import("./pages/MatakanaConcertShuttle"));
const MatakanaFarmersMarketShuttle = lazy(() => import("./pages/MatakanaFarmersMarketShuttle"));
const MatakanaWineryShuttle = lazy(() => import("./pages/MatakanaWineryShuttle"));
const MatakanaVillageShuttle = lazy(() => import("./pages/MatakanaVillageShuttle"));

// Payment pages
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));

/** Site chrome around the shared (mirrored) booking pages. */
function SiteFrame({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      {/* Home — full landing page with Hero, Services, Fleet, About, Contact */}
      <Route path="/" element={<HomePage />} />
      <Route path="/service-areas" element={<ServiceAreas />} />

      {/* Booking — shared bookaride.co.nz booking system */}
      <Route path="/book-now" element={<SiteFrame><BookNow /></SiteFrame>} />
      <Route path="/booking" element={<Navigate to="/book-now" replace />} />

      {/* FAQ */}
      <Route path="/faq" element={<FAQ />} />

      {/* Payment — Stripe returns to /payment-success (shared API contract) */}
      <Route path="/payment-success" element={<SiteFrame><PaymentSuccess /></SiteFrame>} />
      <Route path="/payment/success" element={<SiteFrame><PaymentSuccess /></SiteFrame>} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />

      {/* Suburb shuttle pages - Hibiscus Coast */}
      <Route path="/orewa-airport-shuttle" element={<OrewaShuttle />} />
      <Route path="/orewa-to-auckland-airport-shuttle" element={<OrewaToAirport />} />
      <Route path="/silverdale-airport-shuttle" element={<SilverdaleShuttle />} />
      <Route path="/whangaparaoa-airport-shuttle" element={<WhangaparaoaShuttle />} />
      <Route path="/red-beach-airport-shuttle" element={<RedBeachShuttle />} />
      <Route path="/gulf-harbour-airport-shuttle" element={<GulfHarbourShuttle />} />
      <Route path="/stanmore-bay-airport-shuttle" element={<StanmoreBayShuttle />} />
      <Route path="/arkles-bay-airport-shuttle" element={<ArklesBayShuttle />} />
      <Route path="/army-bay-airport-shuttle" element={<ArmyBayShuttle />} />
      <Route path="/hatfields-beach-airport-shuttle" element={<HatfieldsBeachShuttle />} />
      <Route path="/dairy-flat-airport-shuttle" element={<DairyFlatAirportShuttle />} />
      <Route path="/millwater-airport-shuttle" element={<MillwaterAirportShuttle />} />

      {/* North Shore suburbs */}
      <Route path="/manly-airport-shuttle" element={<ManlyShuttle />} />
      <Route path="/albany-airport-shuttle" element={<AlbanyShuttle />} />
      <Route path="/takapuna-airport-shuttle" element={<TakapunaShuttle />} />
      <Route path="/browns-bay-airport-shuttle" element={<BrownsBayShuttle />} />
      <Route path="/mairangi-bay-airport-shuttle" element={<MairangiBayShuttle />} />
      <Route path="/devonport-airport-shuttle" element={<DevonportShuttle />} />

      {/* Northern towns */}
      <Route path="/warkworth-airport-shuttle" element={<WarkworthAirportShuttle />} />
      <Route path="/wellsford-airport-shuttle" element={<WellsfordAirportShuttle />} />
      <Route path="/leigh-airport-shuttle" element={<LeighAirportShuttle />} />
      <Route path="/omaha-airport-shuttle" element={<OmahaAirportShuttle />} />
      <Route path="/puhoi-airport-shuttle" element={<PuhoiAirportShuttle />} />
      <Route path="/snells-beach-airport-shuttle" element={<SnellsBeachAirportShuttle />} />

      {/* Service type pages */}
      <Route path="/auckland-airport-transfers" element={<AucklandAirportTransfers />} />
      <Route path="/corporate-airport-transfers" element={<CorporateTransfers />} />
      <Route path="/student-airport-transfers" element={<StudentAirportTransfers />} />
      <Route path="/executive-airport-transfers" element={<ExecutiveAirportTransfers />} />
      <Route path="/family-airport-shuttle" element={<FamilyAirportShuttle />} />
      <Route path="/business-airport-transfer" element={<BusinessAirportTransfer />} />
      <Route path="/cruise-ship-transfers" element={<CruiseTransfers />} />
      <Route path="/best-airport-shuttle-hibiscus-coast" element={<BestAirportShuttle />} />
      <Route path="/hibiscus-shuttles-alternative" element={<HibiscusShuttlesAlternative />} />
      <Route path="/local-airport-shuttle" element={<LocalAirportShuttle />} />
      <Route path="/airport-shuttle-orewa" element={<AirportShuttleOrewa />} />
      <Route path="/late-night-airport-shuttle" element={<LateNightAirportShuttle />} />
      <Route path="/early-morning-airport-shuttle" element={<EarlyMorningShuttle />} />
      <Route path="/early-morning-flight-shuttle" element={<EarlyMorningFlightShuttle />} />
      <Route path="/airport-arrivals" element={<AirportArrivals />} />
      <Route path="/north-shore-airport-shuttle" element={<NorthShoreAirportShuttle />} />

      {/* School pages */}
      <Route path="/orewa-college-airport-shuttle" element={<OrewaCollegeShuttle />} />
      <Route path="/whangaparaoa-college-airport-shuttle" element={<WhangaparaoaCollegeShuttle />} />
      <Route path="/kingsway-school-airport-shuttle" element={<KingswaySchoolShuttle />} />
      <Route path="/long-bay-college-airport-shuttle" element={<LongBayCollegeShuttle />} />
      <Route path="/rangitoto-college-airport-shuttle" element={<RangitotoCollegeShuttle />} />

      {/* Matakana pages */}
      <Route path="/matakana-shuttle" element={<MatakanaShuttle />} />
      <Route path="/matakana-events-shuttle" element={<MatakanaEventsShuttle />} />
      <Route path="/matakana-concert-shuttle" element={<MatakanaConcertShuttle />} />
      <Route path="/matakana-farmers-market-shuttle" element={<MatakanaFarmersMarketShuttle />} />
      <Route path="/matakana-winery-shuttle" element={<MatakanaWineryShuttle />} />
      <Route path="/matakana-village-shuttle" element={<MatakanaVillageShuttle />} />

      {/* Catch-all: redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <Toaster />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div></div>}>
            <PublicRoutes />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
