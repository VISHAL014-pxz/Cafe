import React, { useState } from 'react';
import { X, Search, Calendar, Clock, Users, Trash2, Download, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { CafeTable, Reservation } from '../types/cafe';
import { DINING_ZONES } from '../data/menuData';
import { downloadCalendarInvite } from '../utils/calendar';

interface MyReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  tables: CafeTable[];
  onCancelReservation: (reservationId: string) => void;
}

export const MyReservationsModal: React.FC<MyReservationsModalProps> = ({
  isOpen,
  onClose,
  reservations,
  tables,
  onCancelReservation
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const filteredReservations = reservations.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      r.confirmationCode.toLowerCase().includes(q) ||
      r.guestName.toLowerCase().includes(q) ||
      r.guestEmail.toLowerCase().includes(q)
    );
  });

  const handleCancelClick = (id: string) => {
    onCancelReservation(id);
    setCancellingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E1D7] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8E1D7] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#A34B22] font-semibold block mb-0.5">
              Guest Portal
            </span>
            <h3 className="text-xl font-display font-medium text-[#24211E]">
              Manage Your Table Bookings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#736558] hover:text-[#24211E] hover:bg-[#F2ECE3] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-5 border-b border-[#E8E1D7] bg-[#F7F2EA]">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A796A]" />
            <input
              type="text"
              placeholder="Search by Confirmation Code (e.g. VS-8241) or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white rounded-lg border border-[#DDD5C7] text-[#24211E] placeholder:text-[#9C8F83] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
            />
          </div>
        </div>

        {/* Bookings List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {filteredReservations.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="w-10 h-10 text-[#B8AB9C] mx-auto mb-3 stroke-1" />
              <h4 className="text-sm font-medium text-[#24211E] mb-1">No reservations found</h4>
              <p className="text-xs text-[#736558] max-w-sm mx-auto">
                {searchQuery ? 'Try checking your reference code for typos.' : 'You have no active table reservations at Velvet & Stone.'}
              </p>
            </div>
          ) : (
            filteredReservations.map((res) => {
              const zone = DINING_ZONES.find(z => z.id === res.zoneId);
              const table = tables.find(t => t.id === res.tableId);
              const isCancelled = res.status === 'cancelled';

              return (
                <div
                  key={res.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isCancelled 
                      ? 'bg-[#EFEAE2] border-[#DDD5C7] opacity-60' 
                      : 'bg-white border-[#E0D8CE] shadow-xs'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between pb-3 border-b border-[#F0EAE1]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-mono font-bold text-[#24211E] tabular-nums">
                          {res.confirmationCode}
                        </span>
                        <span className="text-xs text-[#7A6B5C]">· {res.guestName}</span>
                      </div>
                      <div className="text-xs text-[#8A796A] mt-0.5">{res.guestEmail} · {res.guestPhone}</div>
                    </div>

                    {/* Status indicator unboxed text */}
                    <div>
                      {isCancelled ? (
                        <span className="text-xs font-semibold text-[#DC2626]">Cancelled</span>
                      ) : res.status === 'seated' ? (
                        <span className="text-xs font-semibold text-[#2563EB]">Currently Seated</span>
                      ) : (
                        <span className="text-xs font-semibold text-[#16A34A]">Confirmed</span>
                      )}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 text-xs">
                    <div>
                      <span className="text-[#8A796A] block text-[11px]">Date</span>
                      <span className="font-semibold text-[#24211E] font-mono">{res.date}</span>
                    </div>
                    <div>
                      <span className="text-[#8A796A] block text-[11px]">Time</span>
                      <span className="font-semibold text-[#24211E] font-mono">{res.time}</span>
                    </div>
                    <div>
                      <span className="text-[#8A796A] block text-[11px]">Party</span>
                      <span className="font-semibold text-[#24211E]">{res.partySize} Guests</span>
                    </div>
                    <div>
                      <span className="text-[#8A796A] block text-[11px]">Table & Zone</span>
                      <span className="font-semibold text-[#24211E]">
                        T-{table?.tableNumber || '?'} ({zone?.name.replace('The ', '')})
                      </span>
                    </div>
                  </div>

                  {res.specialRequests && (
                    <div className="py-2 text-xs text-[#6B5D50] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EDE6DC] mb-3">
                      <strong>Notes: </strong> {res.specialRequests}
                    </div>
                  )}

                  {/* Actions */}
                  {!isCancelled && (
                    <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => downloadCalendarInvite(res)}
                        className="text-xs text-[#34261C] hover:text-[#A34B22] font-medium flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Invite (.ics)</span>
                      </button>

                      {cancellingId === res.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#DC2626]">Confirm cancel?</span>
                          <button
                            type="button"
                            onClick={() => handleCancelClick(res.id)}
                            className="px-2.5 py-1 text-xs bg-[#DC2626] text-white rounded hover:bg-[#B91C1C]"
                          >
                            Yes, Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => setCancellingId(null)}
                            className="px-2 py-1 text-xs border border-[#DDD5C7] rounded hover:bg-[#FAF8F5]"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCancellingId(res.id)}
                          className="text-xs text-[#DC2626] hover:text-[#991B1B] font-medium flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel Booking</span>
                        </button>
                      )}
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E1D7] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-[#34261C] rounded-lg hover:bg-[#201610]"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
