import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  LogOut, Search, Download, Plus, Mail, Trash2, Edit, Eye, X,
  Calendar, DollarSign, CheckCircle, Clock, Users, BarChart3,
  Settings, RefreshCw, Car, Phone, MapPin, FileText, Bell,
  Upload, Copy, MessageSquare, AlertTriangle, Send, CreditCard,
  ChevronRight, Home, Tag, Archive, Menu, ExternalLink
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

import { BACKEND_URL } from '../config';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('bookings');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [stats, setStats] = useState({ 
    total: 0, 
    pending: 0, 
    confirmed: 0, 
    totalRevenue: 0 
  });

  // Driver form state
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [driverForm, setDriverForm] = useState({ name: '', phone: '', email: '', vehicle: '', license: '' });
  const [editingDriver, setEditingDriver] = useState(null);
  
  // Promo code state
  const [promoCodes, setPromoCodes] = useState([]);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoForm, setPromoForm] = useState({
    code: '', discount_type: 'percentage', discount_value: '', 
    min_booking_amount: '', max_uses: '', expiry_date: '', description: ''
  });
  const [editingPromo, setEditingPromo] = useState(null);
  
  // Driver Assignment Preview state
  const [showAssignPreview, setShowAssignPreview] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [driverPayout, setDriverPayout] = useState('');
  const [driverNotes, setDriverNotes] = useState('');
  const [assigningDriver, setAssigningDriver] = useState(false);
  
  // CSV Import state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef(null);

  // Deleted bookings state
  const [deletedBookings, setDeletedBookings] = useState([]);
  const [restoringId, setRestoringId] = useState(null);
  
  // Google Calendar state
  const [calendarAuthorized, setCalendarAuthorized] = useState(false);
  const [authorizingCalendar, setAuthorizingCalendar] = useState(false);

  // Check calendar authorization status on mount
  useEffect(() => {
    const checkCalendarStatus = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await axios.get(`${BACKEND_URL}/api/calendar/status`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCalendarAuthorized(response.data.authorized);
      } catch {
        // Non-critical — calendar status check failed silently
      }
    };
    checkCalendarStatus();
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('calendar_authorized') === 'true') {
      setCalendarAuthorized(true);
      toast({ title: 'Success!', description: 'Google Calendar has been authorized successfully.' });
      window.history.replaceState({}, '', '/admin/dashboard');
    }
    if (urlParams.get('calendar_error')) {
      toast({ title: 'Authorization Failed', description: urlParams.get('calendar_error'), variant: 'destructive' });
      window.history.replaceState({}, '', '/admin/dashboard');
    }
  }, []);

  const handleCalendarAuthorization = async () => {
    try {
      setAuthorizingCalendar(true);
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${BACKEND_URL}/api/calendar/auth/url`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.href = response.data.authorization_url;
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to start calendar authorization', variant: 'destructive' });
      setAuthorizingCalendar(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const timestamp = Date.now();
      const response = await axios.get(`${BACKEND_URL}/api/bookings?_t=${timestamp}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      const fetchedBookings = response.data.bookings || [];
      setBookings(fetchedBookings);

      const total = fetchedBookings.length;
      const pending = fetchedBookings.filter(b => b.status === 'pending').length;
      const confirmed = fetchedBookings.filter(b => b.status === 'confirmed').length;
      const totalRevenue = fetchedBookings
        .filter(b => b.payment_status === 'paid')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      
      setStats({ total, pending, confirmed, totalRevenue });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
        return;
      }
      toast({ title: 'Error', description: 'Failed to fetch bookings', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchPromoCodes = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${BACKEND_URL}/api/promo-codes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPromoCodes(response.data);
    } catch {
      // Promo codes fetch failed — non-critical
    }
  };

  const savePromoCode = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const data = {
        ...promoForm,
        discount_value: parseFloat(promoForm.discount_value) || 0,
        min_booking_amount: parseFloat(promoForm.min_booking_amount) || 0,
        max_uses: promoForm.max_uses ? parseInt(promoForm.max_uses) : null,
        active: true
      };
      
      if (editingPromo) {
        await axios.put(`${BACKEND_URL}/api/promo-codes/${editingPromo.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: 'Updated', description: 'Promo code updated successfully' });
      } else {
        await axios.post(`${BACKEND_URL}/api/promo-codes`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: 'Created', description: 'Promo code created successfully' });
      }
      
      setShowPromoModal(false);
      setEditingPromo(null);
      setPromoForm({ code: '', discount_type: 'percentage', discount_value: '', min_booking_amount: '', max_uses: '', expiry_date: '', description: '' });
      fetchPromoCodes();
    } catch (error) {
      toast({ title: 'Error', description: error.response?.data?.detail || 'Failed to save promo code', variant: 'destructive' });
    }
  };

  const deletePromoCode = async (promoId) => {
    if (!window.confirm('Delete this promo code?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${BACKEND_URL}/api/promo-codes/${promoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Deleted', description: 'Promo code deleted' });
      fetchPromoCodes();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete promo code', variant: 'destructive' });
    }
  };

  const fetchDeletedBookings = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${BACKEND_URL}/api/bookings/deleted/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeletedBookings(response.data);
    } catch {
      // Deleted bookings fetch failed — non-critical
    }
  };

  const restoreBooking = async (bookingId) => {
    try {
      setRestoringId(bookingId);
      const token = localStorage.getItem('admin_token');
      await axios.post(`${BACKEND_URL}/api/bookings/restore/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Restored', description: 'Booking has been restored' });
      fetchDeletedBookings();
      fetchBookings();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to restore booking', variant: 'destructive' });
    } finally {
      setRestoringId(null);
    }
  };

  const permanentlyDelete = async (bookingId) => {
    if (!window.confirm('Permanently delete? This cannot be undone!')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${BACKEND_URL}/api/bookings/permanent/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Deleted', description: 'Booking permanently removed' });
      fetchDeletedBookings();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete booking', variant: 'destructive' });
    }
  };

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const timestamp = Date.now();
      const response = await axios.get(`${BACKEND_URL}/api/drivers?_t=${timestamp}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      setDrivers(response.data.drivers || []);
    } catch {
      // Drivers fetch failed — non-critical
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(b => 
        b.name?.toLowerCase().includes(term) ||
        b.email?.toLowerCase().includes(term) ||
        b.phone?.toLowerCase().includes(term) ||
        b.booking_ref?.toLowerCase().includes(term) ||
        b.pickupAddress?.toLowerCase().includes(term) ||
        b.dropoffAddress?.toLowerCase().includes(term)
      );
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      dateA.setHours(0, 0, 0, 0);
      dateB.setHours(0, 0, 0, 0);
      
      const isPastA = dateA < today;
      const isPastB = dateB < today;
      
      if (isPastA && !isPastB) return 1;
      if (!isPastA && isPastB) return -1;
      
      if (!isPastA && !isPastB) {
        const fullDateA = new Date(a.date + 'T' + (a.time || '00:00'));
        const fullDateB = new Date(b.date + 'T' + (b.time || '00:00'));
        return fullDateA - fullDateB;
      }
      
      if (isPastA && isPastB) {
        const fullDateA = new Date(a.date + 'T' + (a.time || '00:00'));
        const fullDateB = new Date(b.date + 'T' + (b.time || '00:00'));
        return fullDateB - fullDateA;
      }
      
      return 0;
    });
    
    setFilteredBookings(filtered);
  };

  const getDateStatus = (dateStr) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const bookingDate = new Date(dateStr);
    bookingDate.setHours(0, 0, 0, 0);
    
    if (bookingDate.getTime() === today.getTime()) return 'today';
    if (bookingDate.getTime() === tomorrow.getTime()) return 'tomorrow';
    if (bookingDate < today) return 'past';
    return 'future';
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchBookings();
    fetchDrivers();
    fetchDeletedBookings();
    fetchPromoCodes();
    
    const refreshInterval = setInterval(() => {
      fetchBookings();
      fetchDrivers();
      fetchDeletedBookings();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, [navigate]);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, bookings]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    await fetchDrivers();
    await fetchDeletedBookings();
    setRefreshing(false);
    toast({ title: 'Refreshed', description: 'Data updated' });
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Cancel this booking?\n\nThe customer will be notified via SMS and Email.')) return;
    
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${BACKEND_URL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Booking Cancelled', description: 'Customer notified via SMS and Email' });
      fetchBookings();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to cancel booking', variant: 'destructive' });
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.patch(`${BACKEND_URL}/api/bookings/${bookingId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: 'Updated', description: `Status changed to ${newStatus}` });
      fetchBookings();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    }
  };

  const handlePaymentStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.patch(`${BACKEND_URL}/api/bookings/${bookingId}`, 
        { payment_status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: 'Updated', description: `Payment status changed to ${newStatus}` });
      fetchBookings();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update payment status', variant: 'destructive' });
    }
  };

  const handleSendPaymentLink = async (booking) => {
    if (booking.payment_status === 'paid') {
      toast({ title: 'Already Paid', description: 'This booking has already been paid.' });
      return;
    }
    
    toast({ title: 'Sending...', description: 'Creating payment link...' });
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.post(`${BACKEND_URL}/api/bookings/${booking.id}/send-payment-link`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Payment Link Sent', description: response.data.message });
      fetchBookings();
    } catch (error) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to send payment link', variant: 'destructive' });
    }
  };

  const handleSyncAllCalendar = async () => {
    toast({ title: 'Syncing...', description: 'Syncing bookings to Google Calendar' });
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.post(`${BACKEND_URL}/api/calendar/sync-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Calendar Synced', description: response.data.message });
    } catch (error) {
      if (error.response?.status === 401) {
        toast({ title: 'Not Authorized', description: 'Please authorize Google Calendar first', variant: 'destructive' });
      } else {
        toast({ title: 'Sync Failed', description: error.response?.data?.detail || 'Failed to sync', variant: 'destructive' });
      }
    }
  };

  const exportCSV = () => {
    const headers = ['Ref', 'Date', 'Time', 'Customer', 'Email', 'Phone', 'Pickup', 'Dropoff', 'Passengers', 'Price', 'Payment', 'Status'];
    const rows = filteredBookings.map(b => [
      b.booking_ref || 'N/A', b.date, b.time, b.name, b.email, b.phone,
      b.pickupAddress, b.dropoffAddress, b.passengers, b.totalPrice, b.payment_status, b.status
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast({ title: 'Exported', description: 'CSV file downloaded' });
  };

  const downloadImportTemplate = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(`${BACKEND_URL}/api/bookings/import/template`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'booking_import_template.csv';
      a.click();
      toast({ title: 'Downloaded', description: 'Template file ready' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to download template', variant: 'destructive' });
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.csv')) {
      toast({ title: 'Error', description: 'Please upload a CSV file', variant: 'destructive' });
      return;
    }
    
    setImporting(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        toast({ title: 'Error', description: 'CSV file appears to be empty', variant: 'destructive' });
        setImporting(false);
        return;
      }
      
      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
      const rows = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
        if (values.length > 0) {
          const row = {};
          headers.forEach((header, index) => {
            row[header] = (values[index] || '').replace(/"/g, '').trim();
          });
          rows.push(row);
        }
      }
      
      if (rows.length === 0) {
        toast({ title: 'Error', description: 'No valid data found', variant: 'destructive' });
        setImporting(false);
        return;
      }
      
      const token = localStorage.getItem('admin_token');
      const response = await axios.post(`${BACKEND_URL}/api/bookings/import/csv`, 
        { rows },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({ title: 'Import Successful', description: `${response.data.imported_count} bookings imported` });
      fetchBookings();
      setShowImportModal(false);
    } catch (error) {
      toast({ title: 'Import Error', description: error.response?.data?.detail || 'Failed to import', variant: 'destructive' });
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    if (dateStr.includes('/')) return dateStr;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-NZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getDayOfWeek = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-NZ', { weekday: 'short' });
    } catch {
      return '';
    }
  };

  const handleSaveDriver = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (editingDriver) {
        await axios.put(`${BACKEND_URL}/api/drivers/${editingDriver.id}`, driverForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: 'Success', description: 'Driver updated' });
      } else {
        await axios.post(`${BACKEND_URL}/api/drivers`, driverForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast({ title: 'Success', description: 'Driver added' });
      }
      setShowDriverModal(false);
      setDriverForm({ name: '', phone: '', email: '', vehicle: '', license: '' });
      setEditingDriver(null);
      fetchDrivers();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save driver', variant: 'destructive' });
    }
  };

  const handleDeleteDriver = async (driverId) => {
    if (!window.confirm('Delete this driver?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`${BACKEND_URL}/api/drivers/${driverId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Success', description: 'Driver deleted' });
      fetchDrivers();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete driver', variant: 'destructive' });
    }
  };

  const openViewDetails = (booking) => {
    setSelectedBooking(booking);
    setSelectedDriverId(booking.assigned_driver_id || '');
    setDriverPayout(booking.driver_payout || (booking.totalPrice ? (booking.totalPrice * 0.8).toFixed(2) : ''));
    setDriverNotes('');
    setShowDetailsModal(true);
  };

  const handleAssignDriver = async (bookingId) => {
    if (!selectedDriverId) {
      toast({ title: 'Error', description: 'Please select a driver', variant: 'destructive' });
      return;
    }
    try {
      setAssigningDriver(true);
      const token = localStorage.getItem('admin_token');
      await axios.post(`${BACKEND_URL}/api/bookings/${bookingId}/assign-driver`, {
        driver_id: selectedDriverId,
        driver_payout: parseFloat(driverPayout) || 0,
        notes_to_driver: driverNotes
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Driver Assigned', description: 'Driver has been notified' });
      await fetchBookings();
      // Update selected booking with fresh data
      const updatedBookings = (await axios.get(`${BACKEND_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
      })).data.bookings || [];
      const updated = updatedBookings.find(b => b.id === bookingId);
      if (updated) {
        setSelectedBooking(updated);
        setSelectedDriverId(updated.assigned_driver_id || '');
        setDriverPayout(updated.driver_payout || '');
      }
    } catch (error) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to assign driver', variant: 'destructive' });
    } finally {
      setAssigningDriver(false);
    }
  };

  const handleUnassignDriver = async (bookingId) => {
    if (!window.confirm('Unassign driver from this booking?')) return;
    try {
      setAssigningDriver(true);
      const token = localStorage.getItem('admin_token');
      await axios.post(`${BACKEND_URL}/api/bookings/${bookingId}/unassign-driver`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({ title: 'Driver Unassigned', description: 'Driver has been removed from this booking' });
      await fetchBookings();
      const updatedBookings = (await axios.get(`${BACKEND_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
      })).data.bookings || [];
      const updated = updatedBookings.find(b => b.id === bookingId);
      if (updated) {
        setSelectedBooking(updated);
        setSelectedDriverId('');
        setDriverPayout(updated.totalPrice ? (updated.totalPrice * 0.8).toFixed(2) : '');
      }
    } catch (error) {
      toast({ title: 'Error', description: error.response?.data?.error || 'Failed to unassign driver', variant: 'destructive' });
    } finally {
      setAssigningDriver(false);
    }
  };

  // Navigation items
  const navItems = [
    { id: 'bookings', label: 'Bookings', icon: Calendar, count: stats.total },
    { id: 'deleted', label: 'Deleted', icon: Trash2, count: deletedBookings.length },
    { id: 'drivers', label: 'Drivers', icon: Car, count: drivers.length },
    { id: 'promos', label: 'Promo Codes', icon: Tag, count: promoCodes.length },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="text-lg font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  // Get today's bookings for quick view
  const todayBookings = bookings.filter(b => getDateStatus(b.date) === 'today');
  const tomorrowBookings = bookings.filter(b => getDateStatus(b.date) === 'tomorrow');
  const returnTrips = bookings.filter(b => b.returnTrip && b.status !== 'cancelled' && b.status !== 'completed');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 fixed h-full z-40`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-semibold text-slate-800">Hibiscus Admin</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`${sidebarCollapsed ? 'mx-auto' : 'ml-auto'} p-2 hover:bg-slate-100 rounded-lg transition-colors`}
          >
            <Menu className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-amber-50 text-amber-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-amber-600' : ''}`} />
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === item.id 
                        ? 'bg-amber-200 text-amber-800' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button
            onClick={() => navigate('/admin/change-password')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Settings</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-slate-800">
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              className={`${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handleSyncAllCalendar}
              variant="outline"
              size="sm"
              className="border-slate-200"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Sync Calendar
            </Button>
            
            <Button
              onClick={() => navigate('/admin/create-booking')}
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Total Bookings</p>
                      <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-slate-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Pending</p>
                      <p className="text-3xl font-bold text-amber-600 mt-1">{stats.pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Confirmed</p>
                      <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.confirmed}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Revenue</p>
                      <p className="text-3xl font-bold text-slate-800 mt-1">${stats.totalRevenue.toFixed(0)}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Alerts */}
              {(todayBookings.length > 0 || tomorrowBookings.length > 0 || returnTrips.length > 0) && (
                <div className="grid grid-cols-3 gap-4">
                  {todayBookings.length > 0 && (
                    <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-100 text-sm font-medium">Today</p>
                          <p className="text-2xl font-bold mt-1">{todayBookings.length} bookings</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-200" />
                      </div>
                    </div>
                  )}
                  
                  {tomorrowBookings.length > 0 && (
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm font-medium">Tomorrow</p>
                          <p className="text-2xl font-bold mt-1">{tomorrowBookings.length} bookings</p>
                        </div>
                        <Clock className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  )}
                  
                  {returnTrips.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm font-medium">Return Trips</p>
                          <p className="text-2xl font-bold mt-1">{returnTrips.length} pending</p>
                        </div>
                        <RefreshCw className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Search and Filters */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
                      />
                    </div>
                    
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowImportModal(true)} className="border-slate-200">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" size="sm" onClick={exportCSV} className="border-slate-200">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Bookings Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Route</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Driver</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredBookings.map((booking) => {
                        const dateStatus = getDateStatus(booking.date);
                        const isPast = dateStatus === 'past';
                        
                        return (
                          <tr key={booking.id} className={`hover:bg-slate-50 transition-colors ${isPast ? 'opacity-50' : ''}`}>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-800">#{booking.booking_ref}</span>
                                {dateStatus === 'today' && (
                                  <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-semibold rounded">TODAY</span>
                                )}
                                {dateStatus === 'tomorrow' && (
                                  <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-semibold rounded">TOMORROW</span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {formatDate(booking.date)} · {booking.time}
                                {booking.returnTrip && <span className="ml-1 text-purple-600">+Return</span>}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-slate-800">{booking.name}</div>
                              <div className="text-xs text-slate-500">{booking.phone}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-slate-600 truncate max-w-[200px]" title={booking.pickupAddress}>
                                {booking.pickupAddress?.split(',')[0]}
                              </div>
                              <div className="text-xs text-slate-400 flex items-center gap-1">
                                <ChevronRight className="w-3 h-3" />
                                <span className="truncate max-w-[180px]" title={booking.dropoffAddress}>
                                  {booking.dropoffAddress?.split(',')[0]}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {booking.assigned_driver_name ? (
                                <span className="text-sm text-slate-700">{booking.assigned_driver_name.split(' ')[0]}</span>
                              ) : (
                                <span className="text-sm text-slate-400">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                className={`text-xs px-2.5 py-1 rounded-full font-medium border-0 cursor-pointer ${
                                  booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                                  booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                  booking.status === 'cancelled' ? 'bg-slate-100 text-slate-500' :
                                  'bg-amber-100 text-amber-700'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="font-semibold text-slate-800">${booking.totalPrice?.toFixed(0) || '0'}</div>
                              <div className={`text-xs ${booking.payment_status === 'paid' ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {booking.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => openViewDetails(booking)}
                                  className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                  title="View"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => navigate(`/admin/edit-booking/${booking.id}`)}
                                  className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {booking.payment_status !== 'paid' && (
                                  <button
                                    onClick={() => handleSendPaymentLink(booking)}
                                    className="p-1.5 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                    title="Send Payment Link"
                                  >
                                    <CreditCard className="w-4 h-4" />
                                  </button>
                                )}
                                {booking.status !== 'cancelled' && (
                                  <button
                                    onClick={() => handleDelete(booking.id)}
                                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Cancel Booking"
                                    data-testid={`cancel-booking-${booking.id}`}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  
                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                      <p className="text-slate-500">No bookings found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Deleted Tab */}
          {activeTab === 'deleted' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-800">Deleted Bookings</h2>
                <p className="text-sm text-slate-500">Recover accidentally deleted bookings or remove them permanently</p>
              </div>
              
              {deletedBookings.length === 0 ? (
                <div className="p-12 text-center">
                  <Trash2 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500">No deleted bookings</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {deletedBookings.map((booking) => (
                    <div key={booking.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <div className="font-medium text-slate-800">#{booking.booking_ref} - {booking.name}</div>
                        <div className="text-sm text-slate-500">{formatDate(booking.date)} · {booking.time}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Deleted: {new Date(booking.deletedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => restoreBooking(booking.id)}
                          disabled={restoringId === booking.id}
                          size="sm"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          {restoringId === booking.id ? 'Restoring...' : 'Restore'}
                        </Button>
                        <Button
                          onClick={() => permanentlyDelete(booking.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Delete Forever
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Driver Management</h2>
                  <p className="text-sm text-slate-500">Manage your fleet drivers</p>
                </div>
                <Button
                  onClick={() => {
                    setDriverForm({ name: '', phone: '', email: '', vehicle: '', license: '' });
                    setEditingDriver(null);
                    setShowDriverModal(true);
                  }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Driver
                </Button>
              </div>

              {drivers.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Car className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500 mb-4">No drivers yet</p>
                  <Button onClick={() => setShowDriverModal(true)} variant="outline">
                    Add Your First Driver
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Car className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setDriverForm(driver);
                              setEditingDriver(driver);
                              setShowDriverModal(true);
                            }}
                            className="p-2 hover:bg-slate-100 rounded-lg"
                          >
                            <Edit className="w-4 h-4 text-slate-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteDriver(driver.id)}
                            className="p-2 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{driver.name}</h3>
                      <div className="space-y-1 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          {driver.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          {driver.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-slate-400" />
                          {driver.vehicle}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Promos Tab */}
          {activeTab === 'promos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">Promo Codes</h2>
                  <p className="text-sm text-slate-500">Create and manage discount codes</p>
                </div>
                <Button
                  onClick={() => {
                    setEditingPromo(null);
                    setPromoForm({ code: '', discount_type: 'percentage', discount_value: '', min_booking_amount: '', max_uses: '', expiry_date: '', description: '' });
                    setShowPromoModal(true);
                  }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Promo
                </Button>
              </div>

              {promoCodes.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Tag className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500 mb-4">No promo codes yet</p>
                  <Button onClick={() => setShowPromoModal(true)} variant="outline">
                    Create Your First Promo
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Code</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Discount</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Usage</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Expiry</th>
                        <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {promoCodes.map((promo) => (
                        <tr key={promo.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <span className="font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded">
                              {promo.code}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-amber-600 font-medium">
                              {promo.discount_type === 'percentage' ? `${promo.discount_value}%` : `$${promo.discount_value}`}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {promo.current_uses || 0} / {promo.max_uses || '∞'}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {promo.expiry_date ? formatDate(promo.expiry_date) : 'No expiry'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => {
                                setEditingPromo(promo);
                                setPromoForm(promo);
                                setShowPromoModal(true);
                              }}
                              className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePromoCode(promo.id)}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg ml-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (() => {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

            const activeBookings = bookings.filter(b => b.status !== 'cancelled');
            const totalBookingsValue = activeBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
            const paidAmount = bookings.filter(b => b.payment_status === 'paid').reduce((sum, b) => sum + (b.totalPrice || 0), 0);
            const pendingPayment = totalBookingsValue - paidAmount;
            const todayCount = bookings.filter(b => {
              const d = new Date(b.date); d.setHours(0,0,0,0);
              return d.getTime() === today.getTime();
            }).length;
            const weekCount = bookings.filter(b => {
              const d = new Date(b.date); d.setHours(0,0,0,0);
              return d >= startOfWeek && d <= today;
            }).length;
            const monthRevenue = bookings
              .filter(b => { const d = new Date(b.date); return d >= startOfMonth && b.payment_status === 'paid'; })
              .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

            // Popular routes - group by first word of pickup address
            const routeCounts = {};
            activeBookings.forEach(b => {
              if (b.pickupAddress) {
                const suburb = b.pickupAddress.split(',')[0].trim();
                routeCounts[suburb] = (routeCounts[suburb] || 0) + 1;
              }
            });
            const popularRoutes = Object.entries(routeCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8);
            const maxRouteCount = popularRoutes.length > 0 ? popularRoutes[0][1] : 1;

            // Booking trends - last 7 days
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
              const d = new Date(today);
              d.setDate(today.getDate() - i);
              const dateStr = d.toISOString().split('T')[0];
              const dayLabel = d.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric' });
              const count = bookings.filter(b => b.date === dateStr).length;
              last7Days.push({ dateStr, dayLabel, count });
            }
            const maxDayCount = Math.max(...last7Days.map(d => d.count), 1);

            return (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800">Analytics Overview</h2>

              {/* Revenue Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Value</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">${totalBookingsValue.toFixed(0)}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Paid</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">${paidAmount.toFixed(0)}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Pending Payment</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">${pendingPayment.toFixed(0)}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Today</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{todayCount} <span className="text-sm font-normal text-slate-500">bookings</span></p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">This Week</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{weekCount} <span className="text-sm font-normal text-slate-500">bookings</span></p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Month Revenue</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">${monthRevenue.toFixed(0)}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Booking Status Distribution */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-medium text-slate-800 mb-4">Booking Status Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Pending', value: stats.pending, color: 'bg-amber-500' },
                      { label: 'Confirmed', value: stats.confirmed, color: 'bg-emerald-500' },
                      { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, color: 'bg-blue-500' },
                      { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: 'bg-slate-400' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm text-slate-600">{item.label}</span>
                          </div>
                          <span className="font-semibold text-slate-800">{item.value}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color} transition-all`}
                            style={{ width: `${stats.total > 0 ? (item.value / stats.total * 100) : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Status */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-medium text-slate-800 mb-4">Payment Status</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Paid', value: bookings.filter(b => b.payment_status === 'paid').length, color: 'bg-emerald-500' },
                      { label: 'Unpaid', value: bookings.filter(b => b.payment_status !== 'paid').length, color: 'bg-red-500' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm text-slate-600">{item.label}</span>
                          </div>
                          <span className="font-semibold text-slate-800">{item.value}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color} transition-all`}
                            style={{ width: `${bookings.length > 0 ? (item.value / bookings.length * 100) : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Total Revenue</span>
                      <span className="text-2xl font-bold text-amber-600">${stats.totalRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Booking Trends - Last 7 Days */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-medium text-slate-800 mb-4">Booking Trends (Last 7 Days)</h3>
                  <div className="flex items-end gap-2 h-40">
                    {last7Days.map((day) => (
                      <div key={day.dateStr} className="flex-1 flex flex-col items-center justify-end h-full">
                        <span className="text-xs font-semibold text-slate-700 mb-1">{day.count}</span>
                        <div
                          className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-md transition-all min-h-[4px]"
                          style={{ height: `${Math.max((day.count / maxDayCount) * 100, 3)}%` }}
                        ></div>
                        <span className="text-[10px] text-slate-500 mt-2 text-center leading-tight">{day.dayLabel}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Routes */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-medium text-slate-800 mb-4">Popular Pickup Locations</h3>
                  {popularRoutes.length === 0 ? (
                    <p className="text-sm text-slate-500">No booking data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {popularRoutes.map(([suburb, count]) => (
                        <div key={suburb}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-600 truncate max-w-[200px]" title={suburb}>{suburb}</span>
                            <span className="text-sm font-semibold text-slate-800">{count}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
                              style={{ width: `${(count / maxRouteCount) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {!calendarAuthorized && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-800">Google Calendar Not Connected</h3>
                      <p className="text-sm text-amber-700 mt-1">
                        Connect your Google Calendar to automatically sync all bookings.
                      </p>
                      <Button
                        onClick={handleCalendarAuthorization}
                        disabled={authorizingCalendar}
                        className="mt-3 bg-amber-500 hover:bg-amber-600 text-white"
                        size="sm"
                      >
                        {authorizingCalendar ? 'Connecting...' : 'Connect Google Calendar'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            );
          })()}
        </div>
      </main>

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">Booking Details</h2>
                <p className="text-amber-600 font-medium">#{selectedBooking.booking_ref}</p>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  Customer
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name</span>
                    <span className="font-medium text-slate-800">{selectedBooking.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email</span>
                    <span className="font-medium text-slate-800">{selectedBooking.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-medium text-slate-800">{selectedBooking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Trip Info */}
              <div>
                <h3 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  Trip Details
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  <div>
                    <span className="text-xs text-slate-500">Pickup</span>
                    <p className="font-medium text-slate-800">{selectedBooking.pickupAddress}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Drop-off</span>
                    <p className="font-medium text-slate-800">{selectedBooking.dropoffAddress}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-200">
                    <div>
                      <span className="text-xs text-slate-500">Date</span>
                      <p className="font-medium text-slate-800">{formatDate(selectedBooking.date)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Time</span>
                      <p className="font-medium text-slate-800">{selectedBooking.time}</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500">Passengers</span>
                      <p className="font-medium text-slate-800">{selectedBooking.passengers}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  Payment
                </h3>
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Total Amount</span>
                    <span className="text-2xl font-bold text-slate-800">${selectedBooking.totalPrice?.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedBooking.payment_status === 'paid' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedBooking.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Driver Assignment */}
              <div>
                <h3 className="font-medium text-slate-800 mb-3 flex items-center gap-2">
                  <Car className="w-4 h-4 text-amber-600" />
                  Driver Assignment
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 space-y-4">
                  {/* Current driver info */}
                  {selectedBooking.assigned_driver_name ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <Car className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{selectedBooking.assigned_driver_name}</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              selectedBooking.driver_accepted === true
                                ? 'bg-emerald-100 text-emerald-700'
                                : selectedBooking.driver_accepted === false
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-amber-100 text-amber-700'
                            }`}>
                              {selectedBooking.driver_accepted === true ? 'Accepted' :
                               selectedBooking.driver_accepted === false ? 'Declined' : 'Pending'}
                            </span>
                            {selectedBooking.driver_payout && (
                              <span className="text-xs text-slate-500">Payout: ${parseFloat(selectedBooking.driver_payout).toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleUnassignDriver(selectedBooking.id)}
                        disabled={assigningDriver}
                        size="sm"
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        {assigningDriver ? 'Processing...' : 'Unassign'}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No driver assigned</p>
                  )}

                  {/* Assignment form */}
                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {selectedBooking.assigned_driver_name ? 'Reassign to Driver' : 'Select Driver'}
                      </label>
                      <select
                        value={selectedDriverId}
                        onChange={(e) => setSelectedDriverId(e.target.value)}
                        className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="">-- Select a driver --</option>
                        {drivers.map(d => (
                          <option key={d.id} value={d.id}>{d.name} ({d.vehicle})</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Payout (NZD)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={driverPayout}
                          onChange={(e) => setDriverPayout(e.target.value)}
                          placeholder="0.00"
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Notes to Driver</label>
                        <Input
                          value={driverNotes}
                          onChange={(e) => setDriverNotes(e.target.value)}
                          placeholder="Optional notes..."
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAssignDriver(selectedBooking.id)}
                      disabled={assigningDriver || !selectedDriverId}
                      size="sm"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white disabled:opacity-50"
                    >
                      {assigningDriver ? 'Assigning...' : selectedBooking.assigned_driver_name ? 'Reassign Driver' : 'Assign Driver'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div>
                  <h3 className="font-medium text-slate-800 mb-3">Notes</h3>
                  <p className="text-slate-600 bg-slate-50 rounded-xl p-4">{selectedBooking.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <Button
                onClick={() => {
                  setShowDetailsModal(false);
                  navigate(`/admin/edit-booking/${selectedBooking.id}`);
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Booking
              </Button>
              {selectedBooking.payment_status !== 'paid' && (
                <Button
                  onClick={() => {
                    handleSendPaymentLink(selectedBooking);
                    setShowDetailsModal(false);
                  }}
                  variant="outline"
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Send Payment Link
                </Button>
              )}
              {selectedBooking.status !== 'cancelled' && (
                <Button
                  onClick={() => {
                    handleDelete(selectedBooking.id);
                    setShowDetailsModal(false);
                  }}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  data-testid="cancel-booking-modal-btn"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Driver Modal */}
      {showDriverModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                {editingDriver ? 'Edit Driver' : 'Add Driver'}
              </h2>
              <button onClick={() => setShowDriverModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <Input
                  value={driverForm.name}
                  onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <Input
                  value={driverForm.phone}
                  onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })}
                  placeholder="+64 21 xxx xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={driverForm.email}
                  onChange={(e) => setDriverForm({ ...driverForm, email: e.target.value })}
                  placeholder="driver@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle</label>
                <Input
                  value={driverForm.vehicle}
                  onChange={(e) => setDriverForm({ ...driverForm, vehicle: e.target.value })}
                  placeholder="Toyota Hiace 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">License</label>
                <Input
                  value={driverForm.license}
                  onChange={(e) => setDriverForm({ ...driverForm, license: e.target.value })}
                  placeholder="ABC123"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <Button onClick={handleSaveDriver} className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                {editingDriver ? 'Update' : 'Add'} Driver
              </Button>
              <Button onClick={() => setShowDriverModal(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Promo Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                {editingPromo ? 'Edit Promo Code' : 'Create Promo Code'}
              </h2>
              <button onClick={() => setShowPromoModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Code</label>
                <Input
                  value={promoForm.code}
                  onChange={(e) => setPromoForm({...promoForm, code: e.target.value.toUpperCase()})}
                  placeholder="SUMMER20"
                  className="font-mono uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select
                    value={promoForm.discount_type}
                    onChange={(e) => setPromoForm({...promoForm, discount_type: e.target.value})}
                    className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
                  <Input
                    type="number"
                    value={promoForm.discount_value}
                    onChange={(e) => setPromoForm({...promoForm, discount_value: e.target.value})}
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Min. Amount</label>
                  <Input
                    type="number"
                    value={promoForm.min_booking_amount}
                    onChange={(e) => setPromoForm({...promoForm, min_booking_amount: e.target.value})}
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Max Uses</label>
                  <Input
                    type="number"
                    value={promoForm.max_uses}
                    onChange={(e) => setPromoForm({...promoForm, max_uses: e.target.value})}
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                <Input
                  type="date"
                  value={promoForm.expiry_date}
                  onChange={(e) => setPromoForm({...promoForm, expiry_date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <Input
                  value={promoForm.description}
                  onChange={(e) => setPromoForm({...promoForm, description: e.target.value})}
                  placeholder="Summer holiday special"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <Button onClick={savePromoCode} className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                {editingPromo ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => setShowPromoModal(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-600" />
                Import Bookings
              </h2>
              <button onClick={() => setShowImportModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-medium text-blue-800 mb-2">Step 1: Download Template</h4>
                <p className="text-sm text-blue-600 mb-3">Get the CSV template with all required columns</p>
                <Button onClick={downloadImportTemplate} variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-4">
                <h4 className="font-medium text-amber-800 mb-2">Step 2: Fill In Data</h4>
                <p className="text-sm text-amber-600">Add your bookings to the template and save as CSV</p>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-4">
                <h4 className="font-medium text-emerald-800 mb-2">Step 3: Upload</h4>
                <p className="text-sm text-emerald-600 mb-3">Select your completed CSV file</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label 
                  htmlFor="csv-upload"
                  className={`inline-flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                    importing 
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {importing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Choose CSV File
                    </>
                  )}
                </label>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100">
              <Button onClick={() => setShowImportModal(false)} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
