import React, { useState } from 'react';
import { X, ShieldCheck, Users, Check, Clock, UserCheck, AlertCircle, Plus, Calendar } from 'lucide-react';
import { CafeTable, Reservation, TableStatus } from '../types/cafe';
import { DINING_ZONES } from '../data/menuData';

interface HostStandDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  tables: CafeTable[];
  reservations: Reservation[];
  onUpdateTableStatus: (tableId: string, status: TableStatus) => void;
  onSeatReservation: (reservationId: string, tableId: string) => void;
  onAddWalkIn: (guestName: string, partySize: number, tableId: string) => void;
}

export const HostStandDashboard: React.FC<HostStandDashboardProps> = ({
  isOpen,
  onClose,
  tables,
  reservations,
  onUpdateTableStatus,
  onSeatReservation,
  onAddWalkIn
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'tables' | 'reservations' | 'walkin'>('tables');
  
  // Walk-in form state
  const [walkInName, setWalkInName] = useState('Walk-In Guest');
  const [walkInParty, setWalkInParty] = useState(2);
  const [walkInTableId, setWalkInTableId] = useState(
    tables.find(t => t.status === 'available')?.id || tables[0]?.id
  );

  const availableCount = tables.filter(t => t.status === 'available').length;
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;
  const reservedCount = tables.filter(t => t.status === 'reserved').length;

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInTableId) return;
    onAddWalkIn(walkInName, walkInParty, walkInTableId);
    setWalkInName('Walk-In Guest');
    setActiveTab('tables');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#D5C9BA] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 bg-[#251A13] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-white/10 text-[#F59E0B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-display font-medium text-white">
                  Maître D' & Host Stand Control
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#16A34A] text-white">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-[#C5B8A8]">
                Real-time floor occupancy, seating queues, and table turn management.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close host stand"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metric Bar (Unboxed text with numbers) */}
        <div className="bg-[#EFEAE2] border-b border-[#DDD5C7] px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[#7A6B5C] block text-[11px]">Total Tables</span>
              <span className="font-mono font-bold text-base text-[#24211E] tabular-nums">{tables.length}</span>
            </div>
            <div>
              <span className="text-[#16A34A] block text-[11px] font-medium">Available</span>
              <span className="font-mono font-bold text-base text-[#16A34A] tabular-nums">{availableCount}</span>
            </div>
            <div>
              <span className="text-[#B45309] block text-[11px] font-medium">Occupied</span>
              <span className="font-mono font-bold text-base text-[#B45309] tabular-nums">{occupiedCount}</span>
            </div>
            <div>
              <span className="text-[#2563EB] block text-[11px] font-medium">Reserved</span>
              <span className="font-mono font-bold text-base text-[#2563EB] tabular-nums">{reservedCount}</span>
            </div>
          </div>

          {/* Navigation Sub-Tabs (Functional Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-[#D5C9BA]">
            <button
              onClick={() => setActiveTab('tables')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'tables' ? 'bg-[#34261C] text-white' : 'text-[#635549] hover:text-[#24211E]'
              }`}
            >
              Floor & Tables
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'reservations' ? 'bg-[#34261C] text-white' : 'text-[#635549] hover:text-[#24211E]'
              }`}
            >
              Reservations Queue ({reservations.filter(r => r.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setActiveTab('walkin')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
                activeTab === 'walkin' ? 'bg-[#34261C] text-white' : 'text-[#635549] hover:text-[#24211E]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Seat Walk-In</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Floor & Tables Grid */}
        {activeTab === 'tables' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tables.map((table) => {
                const zone = DINING_ZONES.find(z => z.id === table.zone);
                return (
                  <div
                    key={table.id}
                    className="p-4 bg-white rounded-xl border border-[#E0D8CE] shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-[#8A796A] tracking-wider">
                            Table {table.tableNumber}
                          </span>
                          <h4 className="text-sm font-semibold text-[#24211E]">{table.name}</h4>
                          <span className="text-[11px] text-[#A34B22] block">{zone?.name.replace('The ', '')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-mono tabular-nums text-[#6B5D50]">
                          <Users className="w-3.5 h-3.5" />
                          <span>{table.capacity}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-[11px] text-[#7A6B5C]">
                        {table.features.join(' · ')}
                      </div>
                    </div>

                    {/* Status change actions */}
                    <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                      <span className="text-xs font-medium">
                        {table.status === 'available' && <span className="text-[#16A34A]">Available</span>}
                        {table.status === 'occupied' && <span className="text-[#B45309]">Occupied</span>}
                        {table.status === 'reserved' && <span className="text-[#2563EB]">Reserved</span>}
                      </span>

                      <div className="flex items-center gap-1">
                        {table.status !== 'available' && (
                          <button
                            type="button"
                            onClick={() => onUpdateTableStatus(table.id, 'available')}
                            className="px-2 py-1 text-[11px] font-medium bg-[#F2ECE3] text-[#473B30] hover:bg-[#E2D8CC] rounded"
                            title="Reset to available"
                          >
                            Free
                          </button>
                        )}
                        {table.status !== 'occupied' && (
                          <button
                            type="button"
                            onClick={() => onUpdateTableStatus(table.id, 'occupied')}
                            className="px-2 py-1 text-[11px] font-medium bg-[#FAF2E8] text-[#8C3C15] hover:bg-[#F2E2D0] rounded"
                            title="Seat party"
                          >
                            Seat
                          </button>
                        )}
                        {table.status !== 'reserved' && (
                          <button
                            type="button"
                            onClick={() => onUpdateTableStatus(table.id, 'reserved')}
                            className="px-2 py-1 text-[11px] font-medium bg-[#EFF6FF] text-[#1E40AF] hover:bg-[#DBEAFE] rounded"
                            title="Mark reserved"
                          >
                            Hold
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Reservations Queue */}
        {activeTab === 'reservations' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-3">
            {reservations.filter(r => r.status !== 'cancelled').length === 0 ? (
              <div className="text-center py-12 text-[#736558]">
                No active reservations for today.
              </div>
            ) : (
              reservations.filter(r => r.status !== 'cancelled').map((res) => {
                const table = tables.find(t => t.id === res.tableId);
                const zone = DINING_ZONES.find(z => z.id === res.zoneId);

                return (
                  <div
                    key={res.id}
                    className="p-4 bg-white rounded-xl border border-[#E0D8CE] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#24211E]">{res.confirmationCode}</span>
                        <span className="font-semibold text-sm text-[#24211E]">{res.guestName}</span>
                        <span className="text-xs text-[#7A6B5C]">({res.partySize} guests)</span>
                      </div>
                      <div className="text-xs text-[#736558] mt-1 flex items-center gap-2">
                        <span>{res.date} @ <strong className="font-mono">{res.time}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>Table {table?.tableNumber} ({zone?.name.replace('The ', '')})</span>
                        {res.occasion && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="capitalize text-[#A34B22] font-medium">{res.occasion.replace('_', ' ')}</span>
                          </>
                        )}
                      </div>
                      {res.specialRequests && (
                        <div className="mt-1 text-[11px] text-[#695D52] italic">
                          "{res.specialRequests}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {res.status === 'seated' ? (
                        <span className="px-3 py-1.5 text-xs font-semibold text-[#16A34A] bg-[#DCFCE7] rounded-lg">
                          Guest Seated
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSeatReservation(res.id, res.tableId)}
                          className="px-4 py-2 text-xs font-medium text-white bg-[#34261C] hover:bg-[#201610] rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Seat Party Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: Walk-In Seating */}
        {activeTab === 'walkin' && (
          <form onSubmit={handleWalkInSubmit} className="p-6 overflow-y-auto flex-1 max-w-xl mx-auto w-full space-y-4">
            <h4 className="text-base font-semibold text-[#24211E]">
              Seat Walk-In Party Immediately
            </h4>

            <div>
              <label className="block text-xs font-medium text-[#5E5145] mb-1">
                Guest / Party Name
              </label>
              <input
                type="text"
                required
                value={walkInName}
                onChange={(e) => setWalkInName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#DDD5C7] bg-white text-[#24211E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#5E5145] mb-1">
                  Party Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={walkInParty}
                  onChange={(e) => setWalkInParty(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#DDD5C7] bg-white text-[#24211E]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5E5145] mb-1">
                  Assign Table
                </label>
                <select
                  value={walkInTableId}
                  onChange={(e) => setWalkInTableId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-[#DDD5C7] bg-white text-[#24211E]"
                >
                  {tables.map(t => (
                    <option key={t.id} value={t.id}>
                      T-{t.tableNumber}: {t.name} (Seats {t.capacity}) - {t.status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#34261C] hover:bg-[#201610] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors mt-4"
            >
              Confirm Walk-In & Seat Table
            </button>
          </form>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E1D7] flex justify-between items-center text-xs text-[#7A6B5C]">
          <span>Velvet & Stone Staff Console</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#24211E] bg-[#F2ECE3] hover:bg-[#E5DDCF] rounded-lg transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
