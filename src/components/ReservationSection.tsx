import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { CafeTable, DiningZone, MealPeriod, ZoneId } from '../types/cafe';
import { DINING_ZONES } from '../data/menuData';
import { TableFloorPlan } from './TableFloorPlan';

interface ReservationSectionProps {
  tables: CafeTable[];
  onOpenBookingModal: (initialData?: {
    date: string;
    time: string;
    mealPeriod: MealPeriod;
    partySize: number;
    zoneId: ZoneId;
    tableId: string;
  }) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  tables,
  onOpenBookingModal
}) => {
  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  const [selectedDate, setSelectedDate] = useState(today);
  const [partySize, setPartySize] = useState(2);
  const [mealPeriod, setMealPeriod] = useState<MealPeriod>('brunch');
  const [selectedTime, setSelectedTime] = useState('11:30');
  const [selectedZone, setSelectedZone] = useState<ZoneId | 'all'>('all');
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

  const mealPeriods: { id: MealPeriod; label: string; hours: string; defaultTime: string }[] = [
    { id: 'breakfast', label: 'Morning Coffee & Hearth', hours: '07:30 – 11:00', defaultTime: '09:00' },
    { id: 'brunch', label: 'Artisan Brunch', hours: '11:00 – 14:30', defaultTime: '11:30' },
    { id: 'afternoon_tea', label: 'High Tea & Botanicals', hours: '14:30 – 17:00', defaultTime: '15:30' },
    { id: 'dinner', label: 'Evening Plates & Wine', hours: '17:00 – 21:30', defaultTime: '19:00' }
  ];

  const getTimeSlotsForPeriod = (period: MealPeriod) => {
    switch (period) {
      case 'breakfast': return ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'];
      case 'brunch': return ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
      case 'afternoon_tea': return ['14:30', '15:00', '15:30', '16:00', '16:30'];
      case 'dinner': return ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
    }
  };

  const handlePeriodChange = (p: MealPeriod) => {
    setMealPeriod(p);
    const slots = getTimeSlotsForPeriod(p);
    if (!slots.includes(selectedTime)) {
      setSelectedTime(slots[0]);
    }
  };

  const handleTableSelect = (table: CafeTable) => {
    setSelectedTableId(table.id);
  };

  const handleProceedBooking = () => {
    // Pick first available table matching criteria if none selected
    let targetTableId = selectedTableId;
    if (!targetTableId) {
      const candidate = tables.find(t => 
        t.status === 'available' && 
        t.capacity >= partySize && 
        (selectedZone === 'all' || t.zone === selectedZone)
      );
      if (candidate) {
        targetTableId = candidate.id;
      } else {
        // Fallback to first available table
        const anyAvail = tables.find(t => t.status === 'available');
        targetTableId = anyAvail ? anyAvail.id : tables[0].id;
      }
    }

    const matchedTable = tables.find(t => t.id === targetTableId);
    const finalZone = matchedTable ? matchedTable.zone : (selectedZone === 'all' ? 'conservatory' : selectedZone);

    onOpenBookingModal({
      date: selectedDate,
      time: selectedTime,
      mealPeriod,
      partySize,
      zoneId: finalZone,
      tableId: targetTableId
    });
  };

  return (
    <section id="reservations" className="py-16 sm:py-24 bg-[#F5EFE6] border-t border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A34B22] mb-2">
            <span>Direct Reservations</span>
            <span aria-hidden="true">·</span>
            <span>Instant Confirmation</span>
            <span aria-hidden="true">·</span>
            <span>No Booking Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#24211E] tracking-tight mb-4">
            Reserve Your Table
          </h2>
          <p className="text-base text-[#6B5D50] leading-relaxed">
            Choose your preferred dining atmosphere, date, and time. We hold reservations for 15 minutes 
            and welcome celebrations with bespoke hospitality touches.
          </p>
        </div>

        {/* Interactive Reservation Controls Card */}
        <div className="bg-white rounded-2xl border border-[#E5DDD2] shadow-sm p-6 sm:p-8 mb-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-[#EAE2D6]">
            
            {/* Control 1: Dining Date */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#34261C]" />
                <span>Date</span>
              </label>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-lg border border-[#DDD5C7] text-[#24211E] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
              />
            </div>

            {/* Control 2: Party Size */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#34261C]" />
                <span>Party Size</span>
              </label>
              <div className="flex items-center rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] p-1">
                <button
                  type="button"
                  onClick={() => setPartySize(Math.max(1, partySize - 1))}
                  className="px-3 py-1.5 text-xs font-semibold text-[#544639] hover:bg-white rounded"
                >
                  -
                </button>
                <span className="flex-1 text-center text-xs sm:text-sm font-semibold text-[#24211E] font-mono tabular-nums">
                  {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                </span>
                <button
                  type="button"
                  onClick={() => setPartySize(Math.min(10, partySize + 1))}
                  className="px-3 py-1.5 text-xs font-semibold text-[#544639] hover:bg-white rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Control 3: Dining Zone Filter */}
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2">
                Preferred Dining Zone
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                <button
                  type="button"
                  onClick={() => setSelectedZone('all')}
                  className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    selectedZone === 'all'
                      ? 'bg-[#34261C] text-white'
                      : 'bg-[#F4EFE6] text-[#635549] hover:text-[#24211E]'
                  }`}
                >
                  All Zones
                </button>
                {DINING_ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZone(zone.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                      selectedZone === zone.id
                        ? 'bg-[#34261C] text-white'
                        : 'bg-[#F4EFE6] text-[#635549] hover:text-[#24211E]'
                    }`}
                  >
                    {zone.name.replace('The ', '')}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Meal Periods & Time Slots */}
          <div className="pt-6 space-y-4">
            
            {/* Meal Period Tabs */}
            <div className="flex flex-wrap gap-2">
              {mealPeriods.map((mp) => (
                <button
                  key={mp.id}
                  type="button"
                  onClick={() => handlePeriodChange(mp.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all text-left border ${
                    mealPeriod === mp.id
                      ? 'bg-[#FAF2E8] border-[#A34B22] text-[#692C10] shadow-xs'
                      : 'bg-white border-[#E0D8CE] text-[#635549] hover:border-[#8A796A]'
                  }`}
                >
                  <span className="font-semibold block">{mp.label}</span>
                  <span className="text-[10px] text-[#8C7D70]">{mp.hours}</span>
                </button>
              ))}
            </div>

            {/* Time Slot Buttons */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#34261C]" />
                <span>Available Seating Times</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {getTimeSlotsForPeriod(mealPeriod).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3.5 py-2 text-xs font-mono font-medium rounded-lg tabular-nums transition-all border ${
                      selectedTime === slot
                        ? 'bg-[#34261C] text-white border-[#34261C] shadow-xs'
                        : 'bg-white text-[#24211E] border-[#DDD5C7] hover:border-[#34261C]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Floor Plan Display */}
        <div id="floorplan" className="mb-10">
          <TableFloorPlan
            tables={tables}
            selectedTableId={selectedTableId}
            onSelectTable={handleTableSelect}
            filterZone={selectedZone}
            partySize={partySize}
            interactive={true}
          />
        </div>

        {/* Primary CTA Bar */}
        <div className="p-6 bg-white rounded-2xl border border-[#E5DDD2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-semibold text-[#24211E]">
              {selectedTableId 
                ? `Ready to reserve Table ${tables.find(t => t.id === selectedTableId)?.tableNumber} on ${selectedDate} at ${selectedTime}`
                : `Ready for ${partySize} ${partySize === 1 ? 'guest' : 'guests'} on ${selectedDate} at ${selectedTime}`
              }
            </h4>
            <p className="text-xs text-[#7A6B5C] mt-0.5">
              Select or let our maître d’ assign your preferred table instantly.
            </p>
          </div>

          <button
            type="button"
            onClick={handleProceedBooking}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#34261C] hover:bg-[#201610] text-white text-xs sm:text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Complete Guest Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
