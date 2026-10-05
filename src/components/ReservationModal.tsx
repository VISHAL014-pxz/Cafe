import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Sparkles, Check, Heart, ShieldCheck } from 'lucide-react';
import { CafeTable, DiningZone, MealPeriod, Reservation, ZoneId } from '../types/cafe';
import { DINING_ZONES } from '../data/menuData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: CafeTable[];
  initialData?: {
    date: string;
    time: string;
    mealPeriod: MealPeriod;
    partySize: number;
    zoneId: ZoneId;
    tableId: string;
  };
  onConfirmReservation: (reservation: Reservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  tables,
  initialData,
  onConfirmReservation
}) => {
  if (!isOpen) return null;

  const defaultDate = initialData?.date || new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(initialData?.time || '11:30');
  const [mealPeriod, setMealPeriod] = useState<MealPeriod>(initialData?.mealPeriod || 'brunch');
  const [partySize, setPartySize] = useState(initialData?.partySize || 2);
  const [zoneId, setZoneId] = useState<ZoneId>(initialData?.zoneId || 'conservatory');
  const [tableId, setTableId] = useState(initialData?.tableId || tables[0]?.id || 'tbl-101');

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [occasion, setOccasion] = useState<'casual' | 'anniversary' | 'birthday' | 'business' | 'date_night'>('casual');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const occasions = [
    { id: 'casual', label: 'Casual Leisure' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'birthday', label: 'Birthday Celebration' },
    { id: 'date_night', label: 'Romantic Date' },
    { id: 'business', label: 'Business / Meeting' }
  ];

  const currentZone = DINING_ZONES.find(z => z.id === zoneId) || DINING_ZONES[0];
  const currentTable = tables.find(t => t.id === tableId) || tables[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      setErrorMessage('Please enter the primary guest name.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setErrorMessage('Please enter a valid confirmation email address.');
      return;
    }
    if (!guestPhone.trim()) {
      setErrorMessage('Please enter a contact phone number.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const code = 'VS-' + Math.floor(1000 + Math.random() * 9000);
      const newReservation: Reservation = {
        id: 'res-' + Date.now(),
        confirmationCode: code,
        guestName,
        guestEmail,
        guestPhone,
        date,
        time,
        mealPeriod,
        partySize,
        zoneId,
        tableId,
        specialRequests: specialRequests.trim() || undefined,
        occasion,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      setIsSubmitting(false);
      onConfirmReservation(newReservation);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E1D7] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#34261C] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-1">
            <span>Table Booking</span>
            <span aria-hidden="true">·</span>
            <span>Velvet & Stone</span>
          </div>

          <h3 className="text-2xl font-display font-medium text-white mb-2">
            Confirm Your Reservation
          </h3>

          {/* Booking Summary Strip (Unboxed text) */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#E5DDCF] pt-2 border-t border-white/10">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
              <strong className="text-white font-mono">{date}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <strong className="text-white font-mono">{time}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#F59E0B]" />
              <strong className="text-white">{partySize} {partySize === 1 ? 'Guest' : 'Guests'}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-[#F59E0B] font-medium">{currentZone.name}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm text-[#382D24]">
          
          {/* Guest Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#8A796A] font-semibold">
              Primary Guest Contact
            </h4>

            <div>
              <label className="block text-xs font-medium text-[#5E5145] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#DDD5C7] bg-white text-[#24211E] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#5E5145] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. eleanor@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#DDD5C7] bg-white text-[#24211E] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5E5145] mb-1">
                  Mobile Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (555) 234-8901"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-[#DDD5C7] bg-white text-[#24211E] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
                />
              </div>
            </div>
          </div>

          {/* Dining Occasion */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2">
              Dining Occasion
            </label>
            <div className="flex flex-wrap gap-2">
              {occasions.map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setOccasion(occ.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                    occasion === occ.id
                      ? 'bg-[#34261C] text-white border-[#34261C]'
                      : 'bg-white text-[#5E5042] border-[#DDD5C7] hover:border-[#8A796A]'
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seating / Table Assignment */}
          <div className="p-3.5 rounded-xl bg-[#F2EDE4] border border-[#E5DDD2] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#34261C]">Assigned Seating</span>
              <span className="text-[#8C7B6D]">Table {currentTable.tableNumber}</span>
            </div>
            <p className="text-xs text-[#5E5042]">
              {currentTable.name} in {currentZone.name} (Max {currentTable.capacity} guests). 
              Features: {currentTable.features.join(' · ')}.
            </p>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-1">
              Dietary Preferences & Special Requests (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Quiet booth for reading, nut allergy in party, high chair needed, anniversary surprise."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-white text-[#24211E] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
            />
          </div>

          {/* Cancellation Notice */}
          <div className="text-[11px] text-[#7A6B5C] flex items-start gap-2 pt-2 border-t border-[#E8E1D7]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
            <span>
              <strong>Flexible Policy: </strong> No deposit required. Free cancellations or party adjustments 
              available up to 1 hour before arrival.
            </span>
          </div>

          {errorMessage && (
            <p className="text-xs text-[#DC2626] font-medium">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-[#34261C] hover:bg-[#201610] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Table & Generating Pass...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#F59E0B]" />
                  <span>Confirm Table Reservation</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
