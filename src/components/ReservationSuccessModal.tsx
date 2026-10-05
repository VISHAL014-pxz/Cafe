import React, { useState } from 'react';
import { X, Check, Calendar, Clock, Users, MapPin, Download, Copy, Share2, Sparkles } from 'lucide-react';
import { CafeTable, DiningZone, Reservation } from '../types/cafe';
import { DINING_ZONES } from '../data/menuData';
import { downloadCalendarInvite } from '../utils/calendar';

interface ReservationSuccessModalProps {
  reservation: Reservation | null;
  tables: CafeTable[];
  onClose: () => void;
  onViewMyBookings: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  reservation,
  tables,
  onClose,
  onViewMyBookings
}) => {
  if (!reservation) return null;

  const [copied, setCopied] = useState(false);
  const zone = DINING_ZONES.find(z => z.id === reservation.zoneId) || DINING_ZONES[0];
  const table = tables.find(t => t.id === reservation.tableId);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reservation.confirmationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCalendar = () => {
    downloadCalendarInvite(reservation);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E1D7] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="p-6 bg-[#34261C] text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white mx-auto flex items-center justify-center mb-3 shadow-md">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
            Confirmed Reservation
          </div>
          <h3 className="text-2xl font-display font-medium text-white">
            We Look Forward to Welcoming You
          </h3>
          <p className="text-xs text-[#D8CCC0] mt-1">
            A confirmation receipt has been issued for {reservation.guestName}.
          </p>
        </div>

        {/* Digital Pass / Ticket Content */}
        <div className="p-6 space-y-6">
          
          {/* Reference Card with perforated style */}
          <div className="bg-white rounded-xl border border-[#DDD5C7] p-5 shadow-xs relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F0EAE1]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A796A] block">
                  Booking Reference
                </span>
                <span className="text-2xl font-mono font-bold text-[#24211E] tracking-wider tabular-nums">
                  {reservation.confirmationCode}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#DDD5C7] text-[#544639] hover:bg-[#FAF8F5] transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Grid Information */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-[#F0EAE1] text-xs">
              <div>
                <span className="text-[#8A796A] block text-[11px]">Date</span>
                <span className="font-semibold text-[#24211E] font-mono text-sm">{reservation.date}</span>
              </div>
              <div>
                <span className="text-[#8A796A] block text-[11px]">Seating Time</span>
                <span className="font-semibold text-[#24211E] font-mono text-sm">{reservation.time}</span>
              </div>
              <div>
                <span className="text-[#8A796A] block text-[11px]">Party Size</span>
                <span className="font-semibold text-[#24211E]">
                  {reservation.partySize} {reservation.partySize === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              <div>
                <span className="text-[#8A796A] block text-[11px]">Assigned Table</span>
                <span className="font-semibold text-[#24211E]">
                  Table {table?.tableNumber || 'Auto-Assigned'}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[#8A796A] block text-[11px]">Dining Atmosphere</span>
                <span className="font-semibold text-[#A34B22]">{zone.name}</span>
                <p className="text-[11px] text-[#736558] mt-0.5">{zone.atmosphere}</p>
              </div>
            </div>

            {/* Simulated QR Code Graphic */}
            <div className="pt-4 flex items-center justify-between text-xs text-[#7A6B5C]">
              <div className="space-y-0.5">
                <div className="font-medium text-[#24211E]">Velvet & Stone Metropolis</div>
                <div>428 Elmwood Promenade</div>
                <div className="text-[11px] text-[#A34B22]">Please show pass upon arrival</div>
              </div>

              {/* Handcrafted SVG QR vector */}
              <div className="w-16 h-16 bg-[#24211E] p-1.5 rounded-lg flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h4v4h-4v-4zm-4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm-4 4h2v4h-2v-4z" />
                </svg>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleDownloadCalendar}
              className="w-full py-3 px-4 bg-[#34261C] hover:bg-[#201610] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Add to Apple / Google Calendar (.ics)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onViewMyBookings();
              }}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F2ECE3] border border-[#DDD5C7] text-[#24211E] text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>View & Manage All Bookings</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
