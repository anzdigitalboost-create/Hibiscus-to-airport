import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import axios from 'axios';
import { 
  MapPin, Clock, Users, DollarSign, Plane, 
  CheckCircle, XCircle, AlertCircle, Car, Phone
} from 'lucide-react';

import { BACKEND_URL } from '../config';


// Format date in NZ format (DD/MM/YYYY)
const formatDateNZ = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const weekday = date.toLocaleDateString('en-NZ', { weekday: 'long' });
    return `${weekday}, ${day}/${month}/${year}`;
  } catch {
    return dateStr;
  }
};

const DriverJobResponse = () => {
  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [response, setResponse] = useState(null); // 'accepted' | 'declined'
  const [declineReason, setDeclineReason] = useState('');
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [bookingId, token]);

  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/driver/job/${bookingId}?token=${token}`);
      setJob(res.data);
      
      // Check if already responded
      if (res.data.driver_accepted === true) {
        setResponse('accepted');
      } else if (res.data.driver_accepted === false) {
        setResponse('declined');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    setResponding(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/driver/job/${bookingId}/respond`, {
        token,
        accepted: true
      });
      setResponse('accepted');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to accept job');
    } finally {
      setResponding(false);
    }
  };

  const handleDecline = async () => {
    setResponding(true);
    try {
      await axios.post(`${BACKEND_URL}/api/driver/job/${bookingId}/respond`, {
        token,
        accepted: false,
        decline_reason: declineReason
      });
      setResponse('declined');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to decline job');
    } finally {
      setResponding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Already responded
  if (response) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          {response === 'accepted' ? (
            <>
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Accepted!</h1>
              <p className="text-gray-600 mb-6">
                You have accepted this job. You will receive the tracking link before the pickup time.
              </p>
              <div className="bg-green-50 rounded-xl p-4 text-left mb-6">
                <p className="font-semibold text-green-800">{job?.booking_ref}</p>
                <p className="text-green-700">{formatDateNZ(job?.date)} at {job?.time}</p>
                <p className="text-green-600 text-sm mt-1">{job?.pickup_address}</p>
              </div>
              <Button
                onClick={() => window.location.href = `/driver/track/${bookingId}`}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Car className="w-4 h-4 mr-2" />
                Go to Tracking Page
              </Button>
            </>
          ) : (
            <>
              <XCircle className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Declined</h1>
              <p className="text-gray-600">
                You have declined this job. The admin has been notified.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-t-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Car className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 font-semibold">NEW JOB</span>
          </div>
          <h1 className="text-2xl font-bold">{job?.booking_ref}</h1>
        </div>

        {/* Payout Banner */}
        <div className="bg-amber-400 text-black p-6 text-center">
          <p className="text-sm font-medium opacity-80">YOUR PAYOUT</p>
          <p className="text-4xl font-bold">${job?.driver_payout?.toFixed(2)}</p>
        </div>

        {/* Job Details */}
        <div className="bg-white p-6 space-y-4">
          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">{formatDateNZ(job?.date)}</p>
              <p className="text-gray-600">Pickup at {job?.time}</p>
            </div>
          </div>

          {/* Pickup */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase">Pickup</p>
              <p className="font-medium text-gray-900">{job?.pickup_address}</p>
            </div>
          </div>

          {/* Dropoff */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase">Drop-off</p>
              <p className="font-medium text-gray-900">{job?.dropoff_address}</p>
            </div>
          </div>

          {/* Passengers */}
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase">Passengers</p>
              <p className="font-medium text-gray-900">{job?.passengers}</p>
            </div>
          </div>

          {/* Customer */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-purple-500 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase">Customer</p>
              <p className="font-medium text-gray-900">{job?.customer_name}</p>
              <p className="text-gray-600">{job?.customer_phone}</p>
            </div>
          </div>

          {/* Flight Info */}
          {(job?.flight_info?.departure_flight || job?.flight_info?.arrival_flight) && (
            <div className="flex items-start gap-3">
              <Plane className="w-5 h-5 text-sky-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase">Flight Info</p>
                {job?.flight_info?.departure_flight && (
                  <p className="text-gray-900">Departure: {job.flight_info.departure_flight} at {job.flight_info.departure_time}</p>
                )}
                {job?.flight_info?.arrival_flight && (
                  <p className="text-gray-900">Arrival: {job.flight_info.arrival_flight} at {job.flight_info.arrival_time}</p>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {job?.driver_notes && (
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-blue-600 uppercase font-medium mb-1">Notes from Admin</p>
              <p className="text-blue-900">{job.driver_notes}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white border-t p-6 rounded-b-2xl shadow-lg">
          {showDeclineForm ? (
            <div className="space-y-4">
              <p className="font-medium text-gray-900">Why are you declining?</p>
              <Textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Optional: Enter reason..."
                rows={3}
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowDeclineForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleDecline}
                  disabled={responding}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {responding ? 'Declining...' : 'Confirm Decline'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                onClick={handleAccept}
                disabled={responding}
                className="w-full h-14 text-lg bg-green-600 hover:bg-green-700 text-white"
              >
                {responding ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    ACCEPT JOB
                  </span>
                )}
              </Button>
              <Button
                onClick={() => setShowDeclineForm(true)}
                disabled={responding}
                variant="outline"
                className="w-full h-12 text-gray-600 border-gray-300"
              >
                <XCircle className="w-5 h-5 mr-2" />
                Decline
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverJobResponse;
