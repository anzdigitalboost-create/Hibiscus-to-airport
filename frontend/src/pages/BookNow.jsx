import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Clock, Mail, Phone, User, Wrench, Plane, CheckCircle, Luggage, ShieldCheck, Lock } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { CustomDatePicker, CustomTimePicker } from '../components/DateTimePicker';
import TrustBadges from '../components/TrustBadges';
import GoogleAddressInput from '../components/GoogleAddressInput';
import { API } from '../config/api';
import { trackEvent, getAttribution } from '../lib/analytics';

const DROPOFF_QUICK_ADDRESSES = [
  { label: 'Auckland Airport', address: 'Auckland Airport, Ray Emery Drive, Mangere, Auckland 2022, New Zealand' },
  { label: 'Auckland Domestic', address: 'Auckland Airport, Ray Emery Drive, Mangere, Auckland 2022, New Zealand' },
];

export const BookNow = () => {
  const { i18n } = useTranslation();

  const [formData, setFormData] = useState({
    serviceType: '',
    pickupAddress: '',
    dropoffAddress: '',
    date: '',
    time: '',
    passengers: '1',
    vipAirportPickup: false,
    oversizedLuggage: false,
    cabinBags: 0,
    checkedBags: 0,
    oversizedLuggageCount: 0,
    childSeats: 0,
    boosterSeats: 0,
    goldCard: false,
    // Single flight number and time for outbound
    flightNumber: '',
    flightTime: '',
    // Return trip - simplified to just date, time, and one flight number
    returnDate: '',
    returnTime: '',
    returnFlightNumber: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    acceptedTerms: false,
    paymentMethod: 'card',
    notificationPreference: 'both'
  });

  // Returning customer
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);

  useEffect(() => {
    const savedCustomer = localStorage.getItem('bookaride_customer');
    if (savedCustomer) {
      try {
        const customer = JSON.parse(savedCustomer);
        setFormData(prev => ({
          ...prev,
          name: customer.name || '',
          email: customer.email || '',
          phone: customer.phone || ''
        }));
        setIsReturningCustomer(true);
      } catch (e) {
        console.error('Error loading saved customer:', e);
      }
    }
  }, []);

  const saveCustomerDetails = () => {
    if (formData.name && formData.email) {
      localStorage.setItem('bookaride_customer', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        lastBooking: new Date().toISOString()
      }));
    }
  };

  const clearSavedCustomer = () => {
    localStorage.removeItem('bookaride_customer');
    setFormData(prev => ({ ...prev, name: '', email: '', phone: '' }));
    setIsReturningCustomer(false);
  };

  // Date/Time picker states
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [flightTimePicker, setFlightTimePicker] = useState(null);
  const [returnDatePicker, setReturnDatePicker] = useState(null);
  const [returnTimePicker, setReturnTimePicker] = useState(null);

  const [pricing, setPricing] = useState({
    distance: 0,
    basePrice: 0,
    airportFee: 0,
    oversizedLuggageFee: 0,
    childSeatFee: 0,
    passengerFee: 0,
    stripeFee: 0,
    subtotal: 0,
    totalPrice: 0,
    fareVersion: null,
    calculating: false
  });

  // NOTE: the promo code UI was removed deliberately. /api/validate-promo
  // returned a discount and the page told the customer "You saved $X", but the
  // discount was never subtracted from the amount charged, never sent to the
  // server with the booking, and the code's use_count was never incremented —
  // so customers were told they had saved money and then billed in full.
  // Do NOT re-add the input until discounts are applied server-side in
  // api/bookings.js, which is the only place the charged price is decided.

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const finalTotal = pricing.totalPrice;

  const serviceOptions = [
    { value: 'airport-transfer', label: 'Airport Transfer' },
    { value: 'private-transfer', label: 'Private Transfer' }
  ];

  // Calculate price when key fields change
  const priceCalcRef = useRef(0); // Guard against stale API responses
  const priceCalcTimerRef = useRef(null);
  useEffect(() => {
    if (formData.pickupAddress && formData.dropoffAddress && formData.serviceType) {
      // Debounce price calculation to avoid hammering API when multiple fields change at once
      if (priceCalcTimerRef.current) clearTimeout(priceCalcTimerRef.current);
      priceCalcTimerRef.current = setTimeout(() => {
        calculatePrice();
      }, 400);
    }
    return () => clearTimeout(priceCalcTimerRef.current);
  }, [formData.pickupAddress, formData.dropoffAddress, formData.passengers, formData.serviceType, formData.returnDate, formData.returnTime, formData.vipAirportPickup, formData.oversizedLuggage, formData.cabinBags, formData.checkedBags, formData.oversizedLuggageCount, formData.childSeats, formData.boosterSeats, formData.goldCard]);

  const calculatePrice = async () => {
    const requestId = ++priceCalcRef.current;
    setPricing(prev => ({ ...prev, calculating: true }));

    try {
      const hasReturnTrip = !!(formData.returnDate && formData.returnTime);
      const response = await axios.post(`${API}/calculate-price`, {
        serviceType: formData.serviceType,
        pickupAddress: formData.pickupAddress,
        dropoffAddress: formData.dropoffAddress,
        passengers: parseInt(formData.passengers) || 1,
        vipAirportPickup: formData.vipAirportPickup,
        oversizedLuggage: formData.oversizedLuggage,
        cabinBags: formData.cabinBags,
        checkedBags: formData.checkedBags,
        oversizedLuggageCount: formData.oversizedLuggageCount,
        childSeats: formData.childSeats,
        boosterSeats: formData.boosterSeats,
        goldCard: formData.goldCard,
        bookReturn: hasReturnTrip
      }, { timeout: 12000 });

      // Discard stale response if a newer request was fired
      if (requestId !== priceCalcRef.current) return;

      const data = response.data;
      setPricing({
        distance: data.distance,
        basePrice: data.basePrice,
        airportFee: data.airportFee,
        oversizedLuggageFee: data.oversizedLuggageFee,
        childSeatFee: data.childSeatFee,
        passengerFee: data.passengerFee,
        stripeFee: data.stripeFee ?? Math.round(((data.subtotal * 0.029) + 0.30) * 100) / 100,
        subtotal: data.subtotal,
        totalPrice: data.totalPrice,
        // Passed through on the booking so the server can restore the
        // admin-only fuel breakdown on the saved record.
        fareVersion: data.fareVersion || null,
        calculating: false
      });
      trackEvent('quote_calculated');
    } catch (error) {
      if (requestId !== priceCalcRef.current) return;
      console.error('Error calculating price:', error);
      setPricing(prev => ({ ...prev, calculating: false }));
      toast.error('Unable to calculate distance. Please check addresses.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double-submit while processing
    if (isProcessingPayment) return;

    if (!formData.serviceType) { toast.error('Please select a service type'); return; }
    if (!formData.pickupAddress || !formData.dropoffAddress) { toast.error('Please enter both pickup and drop-off addresses'); return; }
    if (!formData.date || !formData.time) { toast.error('Please select pickup date and time'); return; }
    if (!formData.name || !formData.email || !formData.phone) { toast.error('Please fill in all contact information'); return; }

    // Validate return trip fields
    const hasReturnTrip = !!(formData.returnDate && formData.returnTime);
    const isAirportTransfer = formData.serviceType?.toLowerCase().includes('airport');

    // Catch case where customer enters return flight number but forgets date/time
    if (formData.returnFlightNumber && formData.returnFlightNumber.trim() && !hasReturnTrip) {
      toast.error('You entered a return flight number but no return date and time. Please add return date and time, or clear the flight number for a one-way trip.');
      return;
    }

    if (isAirportTransfer && hasReturnTrip) {
      if (!formData.returnFlightNumber || !formData.returnFlightNumber.trim()) {
        toast.error('Flight number is mandatory for return trips. Bookings without flight numbers may face cancellation.');
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { toast.error('Please enter a valid email address'); return; }
    if (pricing.totalPrice === 0) { toast.error('Please wait for price calculation to complete'); return; }

    setIsProcessingPayment(true);

    try {
      // Map simplified fields to backend-expected fields for compatibility
      const bookingData = {
        ...formData,
        bookReturn: hasReturnTrip,
        // Map simplified flight fields to backend-expected fields
        departureFlightNumber: formData.flightNumber,
        arrivalFlightNumber: formData.flightNumber,
        flightArrivalNumber: formData.flightNumber,
        flightArrivalTime: formData.flightTime,
        flightDepartureNumber: formData.flightNumber,
        flightDepartureTime: formData.flightTime,
        // Map returnFlightNumber to the field the backend expects
        returnDepartureFlightNumber: formData.returnFlightNumber,
        returnFlightNumber: formData.returnFlightNumber,
        pricing: pricing,
        status: 'pending',
        language: i18n.language,
        // First-touch attribution: which SEO page earned this booking.
        attribution: getAttribution(),
        createdAt: new Date()
      };

      trackEvent('booking_submitted');
      const bookingResponse = await axios.post(`${API}/bookings`, bookingData, { timeout: 15000 });
      const booking = bookingResponse.data;

      saveCustomerDetails();

      try {
        const checkoutResponse = await axios.post(`${API}/payment/create-checkout`, {
          booking_id: booking.id,
          origin_url: window.location.origin
        }, { timeout: 15000 });
        if (checkoutResponse.data?.url) {
          window.location.href = checkoutResponse.data.url;
        } else {
          setIsProcessingPayment(false);
          toast.success(`Booking #${booking.referenceNumber || booking.id?.slice(0, 8)} created! We'll email you a payment link shortly.`);
        }
      } catch (paymentError) {
        setIsProcessingPayment(false);
        const ref = booking?.referenceNumber || booking?.id?.slice(0, 8);
        toast.success(`Booking #${ref} created! Payment redirect failed - we'll contact you with payment details.`);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setIsProcessingPayment(false);
      const status = error.response?.status;
      const data = error.response?.data || {};
      const detail = data.detail ?? data.message ?? data.error;
      let msg = 'Failed to submit booking. Please try again.';
      if (!error.response) {
        msg = 'Cannot reach server. Check your connection or try again later.';
      } else if (Array.isArray(detail)) {
        const parts = detail.map((e) => {
          const field = Array.isArray(e.loc) ? e.loc[e.loc.length - 1] : null;
          return field && e.msg ? `${field}: ${e.msg}` : (e.msg || e.loc?.join('.'));
        }).filter(Boolean);
        msg = parts.length ? parts.slice(0, 3).join('. ') : msg;
      } else if (typeof detail === 'string' && detail.trim()) {
        msg = detail;
      } else if (status === 404) {
        msg = 'Booking service unavailable. Please contact us.';
      } else if (status) {
        msg = `Booking failed (${status}). ${typeof detail === 'string' ? detail : 'Please try again.'}`;
      }
      toast.error(msg);
    }
  };

  if (siteConfig.maintenanceMode === true) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <SEO title="Under Maintenance - Book A Ride NZ" description="Online booking is temporarily under maintenance." canonical="/book-now" />
        <div className="max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 mb-8">
            <Wrench className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Under Maintenance</h1>
          <p className="text-xl text-gray-300 mb-8">
            Online booking is temporarily unavailable while we update our systems. Please call or email us to make your booking.
          </p>
          <div className="space-y-4 text-gray-400">
            <p><a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">{siteConfig.email}</a></p>
            {siteConfig.phone && <p><a href={`tel:${siteConfig.phone}`} className="text-gold hover:underline">{siteConfig.phone}</a></p>}
          </div>
          <Link to="/" className="inline-block mt-10 px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {isProcessingPayment && <LoadingSpinner message="Processing your booking..." />}
      <SEO
        title="Book Your Airport Shuttle Now - Instant Quote & Online Booking"
        description="Book your airport shuttle online with instant live pricing. Auckland, Hamilton, Whangarei airport transfers. Easy online booking, secure payment, live price calculator. Book your shuttle service now!"
        keywords="book airport shuttle, book airport transfer, online shuttle booking, airport shuttle booking online, instant quote shuttle, book shuttle Auckland, airport transfer booking, shuttle service booking"
        canonical="/book-now"
      />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80&fm=webp"
            alt="Road trip scenic drive"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="bg-gold/20 text-gold text-sm font-semibold px-4 py-2 rounded-full border border-gold/30">
                INSTANT ONLINE BOOKING
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Book Your <span className="text-gold">Ride</span>
            </h1>
            <p className="text-xl text-white/80">
              Get instant pricing with our live calculator - No hidden fees
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar — Conversion boosters */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Fixed Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Free Cancellation (24hr)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Flight Monitoring Included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">24/7 Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-2 border-gray-200 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h2>

                      {/* Service Type */}
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="serviceType" className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span>Service Type *</span>
                        </Label>
                        <Select onValueChange={(value) => handleSelectChange('serviceType', value)} required>
                          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-gold">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Pickup Address */}
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="pickupAddress" className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span>Pickup Location *</span>
                        </Label>
                        <GoogleAddressInput
                          id="pickupAddress"
                          value={formData.pickupAddress}
                          onChange={(val) => setFormData(prev => ({ ...prev, pickupAddress: val }))}
                          onSelect={(val) => setFormData(prev => ({ ...prev, pickupAddress: val }))}
                          placeholder="Start typing your address..."
                          required
                        />
                      </div>

                      {/* Drop-off Address */}
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="dropoffAddress" className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span>Drop-off Location *</span>
                        </Label>
                        {/* Quick address buttons */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {DROPOFF_QUICK_ADDRESSES.map((qa, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, dropoffAddress: qa.address }))}
                              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                                formData.dropoffAddress === qa.address
                                  ? 'bg-gold text-black border-gold'
                                  : 'bg-white text-gray-600 border-gray-300 hover:border-gold hover:text-gold'
                              }`}
                            >
                              {qa.label}
                            </button>
                          ))}
                        </div>
                        <GoogleAddressInput
                          id="dropoffAddress"
                          value={formData.dropoffAddress}
                          onChange={(val) => setFormData(prev => ({ ...prev, dropoffAddress: val }))}
                          onSelect={(val) => setFormData(prev => ({ ...prev, dropoffAddress: val }))}
                          placeholder="Start typing destination..."
                          required
                        />
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                          <Label className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gold" />
                            <span>Pickup Date *</span>
                          </Label>
                          <CustomDatePicker
                            selected={pickupDate}
                            onChange={(date) => {
                              setPickupDate(date);
                              if (date) {
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');
                                setFormData(prev => ({ ...prev, date: `${year}-${month}-${day}` }));
                              }
                            }}
                            placeholder="Select pickup date"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gold" />
                            <span>Pickup Time *</span>
                          </Label>
                          <CustomTimePicker
                            selected={pickupTime}
                            onChange={(time) => {
                              setPickupTime(time);
                              if (time) {
                                const hours = time.getHours().toString().padStart(2, '0');
                                const minutes = time.getMinutes().toString().padStart(2, '0');
                                setFormData(prev => ({ ...prev, time: `${hours}:${minutes}` }));
                              }
                            }}
                            placeholder="Select pickup time"
                            required
                          />
                        </div>
                      </div>

                      {/* Passengers */}
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="passengers" className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gold" />
                          <span>Number of Passengers *</span>
                        </Label>
                        <Select
                          value={formData.passengers}
                          onValueChange={(value) => handleSelectChange('passengers', value)}
                          required
                        >
                          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-gold">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10,11].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mt-1">1st passenger included. 2nd passenger +$10; groups of 3 or more +$15 per additional passenger</p>
                      </div>

                      {/* VIP Parking Service */}
                      <div className="mb-6 bg-gold/5 p-4 rounded-lg border border-gold/20">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="vipAirportPickup"
                            checked={formData.vipAirportPickup}
                            onChange={(e) => setFormData(prev => ({ ...prev, vipAirportPickup: e.target.checked }))}
                            className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor="vipAirportPickup" className="cursor-pointer font-semibold text-gray-900">
                              VIP Parking Service - $15
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">Driver meets you outside door eleven</p>
                          </div>
                        </div>
                      </div>

                      {/* Luggage — quantities so we can size the vehicle */}
                      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <Label className="font-semibold text-gray-900 flex items-center gap-2">
                          <Luggage className="w-4 h-4" /> Luggage
                        </Label>
                        <p className="text-xs text-gray-600 mt-1 mb-3">
                          Tell us what you're bringing so we send a vehicle with enough room.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { key: 'cabinBags', label: 'Cabin bags', hint: 'Carry-on size' },
                            { key: 'checkedBags', label: 'Checked luggage', hint: '24–28 inch' },
                            { key: 'oversizedLuggageCount', label: 'Large / oversized', hint: 'Bikes, skis, golf' },
                          ].map((item) => (
                            <div key={item.key}>
                              <Label htmlFor={item.key} className="text-sm text-gray-800">{item.label}</Label>
                              <Input
                                id={item.key}
                                type="number"
                                min="0"
                                max="20"
                                inputMode="numeric"
                                value={formData[item.key]}
                                onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  [item.key]: Math.max(0, Math.min(20, parseInt(e.target.value, 10) || 0)),
                                }))}
                                className="mt-1"
                              />
                              <p className="text-[11px] text-gray-500 mt-1">{item.hint}</p>
                            </div>
                          ))}
                        </div>

                        {parseInt(formData.oversizedLuggageCount, 10) > 0 && (
                          <div className="mt-3 bg-amber-50 border border-amber-300 rounded-lg p-3">
                            <p className="text-sm text-amber-900">
                              Large or oversized items (e.g. bicycles, golf bags, surfboards, skis, oversized
                              equipment, etc.) may require additional vehicle space and/or incur additional
                              charges. Please <Link to="/contact" className="underline font-semibold">contact us</Link> before
                              booking so we can confirm availability and pricing.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Child restraints */}
                      <div className="mb-6 bg-green-50 p-4 rounded-lg border border-green-200">
                        <Label className="font-semibold text-gray-900">Child seats — $10 each</Label>
                        <p className="text-xs text-gray-600 mt-1 mb-3">
                          Fitted by your driver. NZ law requires an approved restraint for children under 7.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { key: 'childSeats', label: 'Child seat' },
                            { key: 'boosterSeats', label: 'Booster seat' },
                          ].map((item) => (
                            <div key={item.key}>
                              <Label htmlFor={item.key} className="text-sm text-gray-800">{item.label}</Label>
                              <Input
                                id={item.key}
                                type="number"
                                min="0"
                                max="6"
                                inputMode="numeric"
                                value={formData[item.key]}
                                onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  [item.key]: Math.max(0, Math.min(6, parseInt(e.target.value, 10) || 0)),
                                }))}
                                className="mt-1"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gold Card Discount */}
                      <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="goldCard"
                            checked={formData.goldCard}
                            onChange={(e) => setFormData(prev => ({ ...prev, goldCard: e.target.checked }))}
                            className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor="goldCard" className="cursor-pointer font-semibold text-gray-900">
                              Gold Card holder — 10% discount
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">SuperGold Card or other eligible Gold Card</p>
                          </div>
                        </div>
                      </div>

                      {/* Flight Details & Return Journey */}
                      <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Flight Details</h3>
                        <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded mb-4">
                          <strong>Important:</strong> Flight numbers are required for airport pickups so our driver can meet you on time.
                        </p>

                        {/* Flight Number and Flight Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="flightNumber" className="flex items-center space-x-2">
                              <Plane className="w-4 h-4 text-gold" />
                              <span>Flight Number</span>
                            </Label>
                            <Input
                              id="flightNumber"
                              name="flightNumber"
                              value={formData.flightNumber}
                              onChange={handleChange}
                              placeholder="e.g., NZ123"
                              className="transition-all duration-200 focus:ring-2 focus:ring-gold"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gold" />
                              <span>Flight Time</span>
                            </Label>
                            <CustomTimePicker
                              selected={flightTimePicker}
                              onChange={(time) => {
                                setFlightTimePicker(time);
                                if (time) {
                                  const hours = time.getHours().toString().padStart(2, '0');
                                  const minutes = time.getMinutes().toString().padStart(2, '0');
                                  setFormData(prev => ({ ...prev, flightTime: `${hours}:${minutes}` }));
                                }
                              }}
                              placeholder="Select flight time"
                            />
                          </div>
                        </div>

                        {/* Return Journey */}
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-md font-semibold text-gray-800 mb-1">Return Journey <span className="text-sm font-normal text-gray-500">(Optional - leave blank for one-way)</span></h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 mt-3">
                            <div className="space-y-2">
                              <Label className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gold" />
                                <span>Return Date</span>
                              </Label>
                              <CustomDatePicker
                                selected={returnDatePicker}
                                onChange={(date) => {
                                  setReturnDatePicker(date);
                                  if (date) {
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    setFormData(prev => ({ ...prev, returnDate: `${year}-${month}-${day}` }));
                                  }
                                }}
                                placeholder="Select return date"
                                minDate={pickupDate || new Date()}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gold" />
                                <span>Return Time</span>
                              </Label>
                              <CustomTimePicker
                                selected={returnTimePicker}
                                onChange={(time) => {
                                  setReturnTimePicker(time);
                                  if (time) {
                                    const hours = time.getHours().toString().padStart(2, '0');
                                    const minutes = time.getMinutes().toString().padStart(2, '0');
                                    setFormData(prev => ({ ...prev, returnTime: `${hours}:${minutes}` }));
                                  }
                                }}
                                placeholder="Select return time"
                              />
                            </div>
                          </div>

                          {/* Return flight number */}
                          <div className="space-y-2">
                            <Label htmlFor="returnFlightNumber" className="flex items-center space-x-2">
                              <Plane className="w-4 h-4 text-gold" />
                              <span>Return Flight Number <span className="text-sm font-normal text-gray-500">(Required if booking return)</span></span>
                            </Label>
                            <Input
                              id="returnFlightNumber"
                              name="returnFlightNumber"
                              value={formData.returnFlightNumber}
                              onChange={handleChange}
                              placeholder="e.g., NZ456"
                              className="transition-all duration-200 focus:ring-2 focus:ring-gold"
                            />
                          </div>

                          <p className="text-xs text-gray-600 mt-4">
                            Return trip will be from <strong>{formData.dropoffAddress || 'drop-off location'}</strong> back to <strong>{formData.pickupAddress || 'pickup location'}</strong>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="border-2 border-gray-200 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                        {isReturningCustomer && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-600 font-medium">Welcome back!</span>
                            <button type="button" onClick={clearSavedCustomer} className="text-xs text-gray-400 hover:text-red-500 underline">Not you?</button>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gold" />
                            <span>Full Name *</span>
                          </Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="transition-all duration-200 focus:ring-2 focus:ring-gold" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gold" />
                              <span>Email *</span>
                            </Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required className="transition-all duration-200 focus:ring-2 focus:ring-gold" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gold" />
                              <span>Phone *</span>
                            </Label>
                            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="021 123 4567" required className="transition-all duration-200 focus:ring-2 focus:ring-gold" />
                          </div>
                        </div>

                        {/* Notification Preference */}
                        <div className="space-y-2">
                          <Label className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-gold" />
                            <span>Confirmation Preference</span>
                          </Label>
                          <div className="flex gap-4">
                            {[
                              { value: 'both', label: 'Email + SMS' },
                              { value: 'email', label: 'Email only' },
                              { value: 'sms', label: 'SMS only' }
                            ].map(opt => (
                              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="notificationPreference"
                                  value={opt.value}
                                  checked={formData.notificationPreference === opt.value}
                                  onChange={handleChange}
                                  className="text-gold focus:ring-gold"
                                />
                                <span className="text-sm text-gray-700">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Special Requests / Notes</Label>
                          <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any special requirements or notes..." rows={3} className="transition-all duration-200 focus:ring-2 focus:ring-gold" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Price Summary - Right Side */}
                <div className="lg:col-span-1">
                  <Card className="border-2 border-gold/30 sticky top-24 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-2 mb-6">
                        <DollarSign className="w-6 h-6 text-gold" />
                        <h2 className="text-2xl font-bold text-gray-900">Price Estimate</h2>
                      </div>

                      {pricing.calculating ? (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
                          <p className="text-gray-600">Calculating your quote...</p>
                        </div>
                      ) : pricing.totalPrice > 0 ? (
                        <div className="space-y-4">
                          <div className="text-center py-6">
                            <p className="text-gray-600 mb-2">Your Quote</p>
                            <span className="text-5xl font-bold text-gold">${finalTotal.toFixed(2)}</span>
                            <p className="text-gray-500 text-sm mt-2">NZD - Fixed Price, No Hidden Fees</p>
                          </div>

                          {/* Price Breakdown */}
                          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Trip fare</span>
                              <span className="font-medium">
                                ${pricing.subtotal.toFixed(2)}
                              </span>
                            </div>
                            {pricing.stripeFee > 0 && (
                              <div className="flex justify-between text-gray-500">
                                <span>Card processing fee</span>
                                <span>${pricing.stripeFee.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between border-t pt-2 font-semibold">
                              <span>Total</span>
                              <span className="text-gold">${finalTotal.toFixed(2)}</span>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-600">
                              {formData.passengers} passenger{parseInt(formData.passengers) > 1 ? 's' : ''}
                              {(formData.returnDate && formData.returnTime) && ' · Return trip (both ways included)'}
                            </p>
                          </div>

                          {/* Route summary */}
                          {formData.pickupAddress && formData.dropoffAddress && (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2" data-testid="route-map-container">
                              <p className="text-sm font-medium text-gray-700">Your route</p>
                              <p className="text-sm text-gray-600">Pickup: {formData.pickupAddress}</p>
                              <p className="text-sm text-gray-600">Drop-off: {formData.dropoffAddress}</p>
                            </div>
                          )}

                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-gray-500 mb-4">
                            {formData.pickupAddress && formData.dropoffAddress && !formData.serviceType
                              ? 'Choose a service type above to see your price'
                              : 'Enter addresses to see price estimate'}
                          </p>
                        </div>
                      )}

                      <div className="mt-6">
                        <TrustBadges variant="payment" />
                      </div>

                      {/* Secure Payment Info — card marks are inline SVG, never
                          hotlinked: the Wikimedia logos this used to load are
                          blocked, which left bare "VisaMastercard" alt text. */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <ShieldCheck className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-gray-800">Secure Payment</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Pay securely with credit/debit card</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-md px-2.5 py-1.5">
                            <svg viewBox="0 0 24 24" className="w-7 h-4" role="img" aria-label="Visa" fill="#1A1F71">
                              <path d="M9.5 4h5l3.5 8-3.5 8h-5l3.5-8z"/>
                              <path d="M4 4h5l3.5 8L9 20H4l3.5-8z" fill="#FF5F00"/>
                            </svg>
                            <span className="text-xs font-medium text-gray-700">Visa</span>
                          </span>
                          <span className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-md px-2.5 py-1.5">
                            <svg viewBox="0 0 24 24" className="w-7 h-4" role="img" aria-label="Mastercard">
                              <circle cx="9" cy="12" r="7" fill="#EB001B"/>
                              <circle cx="15" cy="12" r="7" fill="#F79E1B"/>
                              <path d="M12 6.5a7 7 0 000 11 7 7 0 000-11z" fill="#FF5F00"/>
                            </svg>
                            <span className="text-xs font-medium text-gray-700">Mastercard</span>
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400 ml-1">
                            <Lock className="w-3 h-3" />
                            Powered by Stripe
                          </span>
                        </div>
                      </div>

                      {/* Cancellation terms must be shown BEFORE payment — a fee
                          the customer never saw is very hard to enforce. */}
                      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-700">
                        <p className="font-semibold text-gray-900 mb-2">Cancellation policy — please read before booking</p>
                        <ul className="space-y-1">
                          <li>• <strong>48+ hours' notice:</strong> full refund of the fare</li>
                          <li>• <strong>24–48 hours:</strong> 75% refunded &nbsp;·&nbsp; <strong>12–24 hours:</strong> 50% refunded</li>
                          <li>• <strong>4–12 hours:</strong> 25% refunded &nbsp;·&nbsp; <strong>under 4 hours or no-show:</strong> no refund</li>
                          <li>• Payment processing fees are non-refundable on cancellation.</li>
                          <li>• Free changes with 12+ hours' notice. Flight delays are covered when you give us your flight number.</li>
                        </ul>
                        <label className="flex items-start gap-2 mt-3 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={formData.acceptedTerms}
                            onChange={(e) => setFormData(prev => ({ ...prev, acceptedTerms: e.target.checked }))}
                            className="w-4 h-4 mt-0.5 text-gold border-gray-300 rounded focus:ring-gold"
                          />
                          <span>
                            I have read and accept the{' '}
                            <Link to="/terms-and-conditions" target="_blank" className="underline font-semibold text-gray-900">
                              Terms &amp; Conditions
                            </Link>{' '}
                            and the cancellation policy above.
                          </span>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full mt-4 bg-gold hover:bg-gold/90 text-black font-semibold py-6 text-lg transition-colors duration-200"
                        disabled={pricing.calculating || pricing.totalPrice === 0 || isProcessingPayment || !formData.acceptedTerms}
                      >
                        {isProcessingPayment ? 'Processing...' : 'Book Now'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookNow;
