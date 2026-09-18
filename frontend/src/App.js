import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";

// --- Eagerly loaded (critical path) ---
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";

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

// Payment / booking pages
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
const MyBooking = lazy(() => import("./pages/MyBooking"));

// Driver / tracking pages
const DriverPortal = lazy(() => import("./pages/DriverPortal"));
const DriverJobResponse = lazy(() => import("./pages/DriverJobResponse"));
const DriverTracking = lazy(() => import("./pages/DriverTracking"));
const CustomerTracking = lazy(() => import("./pages/CustomerTracking"));
const FlightTracker = lazy(() => import("./pages/FlightTracker"));

// --- Admin pages ---
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminShell = lazy(() => import("./admin/AdminShell"));
const Cockpit = lazy(() => import("./admin/Cockpit"));
const RealAdminBookings = lazy(() => import("./pages/AdminDashboard"));
const AdminCreateBooking = lazy(() => import("./pages/AdminCreateBooking"));
const AdminEditBooking = lazy(() => import("./pages/AdminEditBooking"));
const AdminResetPassword = lazy(() => import("./pages/AdminResetPassword"));
const AdminSEO = lazy(() => import("./pages/AdminSEO"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));

/**
 * Simple auth check: if an admin token exists in localStorage the user is
 * considered logged in.  The actual token is validated server-side on every
 * API call, so this is purely a UX guard.
 */
function RequireAuth({ children }) {
  const token = localStorage.getItem("admin_token") || localStorage.getItem("HIBI_ADMIN_TOKEN");
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function AdminRoutes() {
  return (
    <Routes>
      {/* Login — always accessible */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Redirect bare /admin to /admin/bookings */}
      <Route path="/admin" element={<Navigate to="/admin/bookings" replace />} />

      {/* Protected admin pages */}
      <Route
        path="/admin/bookings"
        element={
          <RequireAuth>
            <AdminShell>
              <RealAdminBookings />
            </AdminShell>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth>
            <AdminShell>
              <RealAdminBookings />
            </AdminShell>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/cockpit"
        element={
          <RequireAuth>
            <AdminShell>
              <Cockpit />
            </AdminShell>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/create-booking"
        element={
          <RequireAuth>
            <AdminShell>
              <AdminCreateBooking />
            </AdminShell>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/edit-booking/:id"
        element={
          <RequireAuth>
            <AdminShell>
              <AdminEditBooking />
            </AdminShell>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/reset-password"
        element={
          <RequireAuth>
            <AdminShell>
              <AdminResetPassword />
            </AdminShell>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/change-password"
        element={
          <RequireAuth>
            <AdminShell>
              <ChangePassword />
            </AdminShell>
          </RequireAuth>
        }
      />

      <Route
        path="/admin/seo"
        element={
          <RequireAuth>
            <AdminShell>
              <AdminSEO />
            </AdminShell>
          </RequireAuth>
        }
      />

      {/* Catch-all for unknown /admin/* paths */}
      <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      {/* Home — full landing page with Hero, Services, Fleet, About, Contact */}
      <Route path="/" element={<HomePage />} />
      <Route path="/service-areas" element={<ServiceAreas />} />

      {/* Booking */}
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/book-now" element={<BookingPage />} />

      {/* FAQ */}
      <Route path="/faq" element={<FAQ />} />

      {/* Payment & Booking Lookup */}
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/my-booking" element={<MyBooking />} />

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

      {/* Driver / tracking pages */}
      <Route path="/driver-portal" element={<DriverPortal />} />
      <Route path="/driver/job/:bookingId" element={<DriverJobResponse />} />
      <Route path="/driver-tracking" element={<DriverTracking />} />
      <Route path="/customer-tracking" element={<CustomerTracking />} />
      <Route path="/tracking/:trackingRef" element={<CustomerTracking />} />
      <Route path="/flight-tracker" element={<FlightTracker />} />

      {/* Catch-all: redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RouterSwitch() {
  const loc = useLocation();
  const path = loc?.pathname || "/";
  if (path.startsWith("/admin")) return <AdminRoutes />;
  return <PublicRoutes />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div></div>}>
            <RouterSwitch />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
