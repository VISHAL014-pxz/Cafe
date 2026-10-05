import React from 'react';
import { CafeTable, ZoneId } from '../types/cafe';
import { Users, Sparkles, Check, Sun, Coffee, BookOpen, Wind } from 'lucide-react';

interface TableFloorPlanProps {
  tables: CafeTable[];
  selectedTableId: string | null;
  onSelectTable: (table: CafeTable) => void;
  filterZone?: ZoneId | 'all';
  partySize?: number;
  interactive?: boolean;
}

export const TableFloorPlan: React.FC<TableFloorPlanProps> = ({
  tables,
  selectedTableId,
  onSelectTable,
  filterZone = 'all',
  partySize = 2,
  interactive = true
}) => {
  const getZoneIcon = (zone: ZoneId) => {
    switch (zone) {
      case 'conservatory': return <Sun className="w-4 h-4 text-[#D97706]" />;
      case 'bar': return <Coffee className="w-4 h-4 text-[#B45309]" />;
      case 'alcove': return <BookOpen className="w-4 h-4 text-[#4E5D42]" />;
      case 'terrace': return <Wind className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#E8E1D7] rounded-2xl p-5 sm:p-7 shadow-xs">
      
      {/* Floor Plan Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E8E1D7]">
        <div>
          <h3 className="text-lg font-display font-medium text-[#24211E]">
            Interactive Architectural Floor Plan
          </h3>
          <p className="text-xs text-[#736558] mt-0.5">
            Select a table matching your party size. Hover to inspect zone features.
          </p>
        </div>

        {/* Legend (Unboxed text with dots) */}
        <div className="flex items-center gap-4 text-xs text-[#6B5D50]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white border-2 border-[#34261C]"></span>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#34261C]"></span>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#E0D7CC] border border-[#C5B8A8]"></span>
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* 4 Architectural Floor Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Zone 1: The Sunlit Conservatory */}
        <div className={`p-4 rounded-xl border transition-all ${
          filterZone === 'conservatory' || filterZone === 'all'
            ? 'bg-[#F7F4EC] border-[#DDD5C5]'
            : 'bg-black/5 border-transparent opacity-40'
        }`}>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E6DECE]">
            <div className="flex items-center gap-2">
              {getZoneIcon('conservatory')}
              <span className="text-xs font-semibold text-[#24211E] uppercase tracking-wide">The Sunlit Conservatory</span>
            </div>
            <span className="text-[11px] text-[#7A6B5C]">Glass Atrium & Olive Garden</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tables.filter(t => t.zone === 'conservatory').map(t => (
              <TableCard
                key={t.id}
                table={t}
                isSelected={selectedTableId === t.id}
                onSelect={() => interactive && onSelectTable(t)}
                partySize={partySize}
                interactive={interactive}
              />
            ))}
          </div>
        </div>

        {/* Zone 2: The Espresso & Roaster Bar */}
        <div className={`p-4 rounded-xl border transition-all ${
          filterZone === 'bar' || filterZone === 'all'
            ? 'bg-[#F9F5F0] border-[#E2D8CC]'
            : 'bg-black/5 border-transparent opacity-40'
        }`}>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E6DECE]">
            <div className="flex items-center gap-2">
              {getZoneIcon('bar')}
              <span className="text-xs font-semibold text-[#24211E] uppercase tracking-wide">Espresso & Roaster Bar</span>
            </div>
            <span className="text-[11px] text-[#7A6B5C]">Front Counter & Roaster</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tables.filter(t => t.zone === 'bar').map(t => (
              <TableCard
                key={t.id}
                table={t}
                isSelected={selectedTableId === t.id}
                onSelect={() => interactive && onSelectTable(t)}
                partySize={partySize}
                interactive={interactive}
              />
            ))}
          </div>
        </div>

        {/* Zone 3: The Library Alcove */}
        <div className={`p-4 rounded-xl border transition-all ${
          filterZone === 'alcove' || filterZone === 'all'
            ? 'bg-[#F3F5F2] border-[#D6DDD4]'
            : 'bg-black/5 border-transparent opacity-40'
        }`}>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#DEE5DB]">
            <div className="flex items-center gap-2">
              {getZoneIcon('alcove')}
              <span className="text-xs font-semibold text-[#24211E] uppercase tracking-wide">The Library Alcove</span>
            </div>
            <span className="text-[11px] text-[#7A6B5C]">Velvet Banquettes & Books</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tables.filter(t => t.zone === 'alcove').map(t => (
              <TableCard
                key={t.id}
                table={t}
                isSelected={selectedTableId === t.id}
                onSelect={() => interactive && onSelectTable(t)}
                partySize={partySize}
                interactive={interactive}
              />
            ))}
          </div>
        </div>

        {/* Zone 4: The Cobblestone Terrace */}
        <div className={`p-4 rounded-xl border transition-all ${
          filterZone === 'terrace' || filterZone === 'all'
            ? 'bg-[#F2F5F8] border-[#D4DCE5]'
            : 'bg-black/5 border-transparent opacity-40'
        }`}>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#D8E1EC]">
            <div className="flex items-center gap-2">
              {getZoneIcon('terrace')}
              <span className="text-xs font-semibold text-[#24211E] uppercase tracking-wide">The Cobblestone Terrace</span>
            </div>
            <span className="text-[11px] text-[#7A6B5C]">Open Air & Herb Planters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tables.filter(t => t.zone === 'terrace').map(t => (
              <TableCard
                key={t.id}
                table={t}
                isSelected={selectedTableId === t.id}
                onSelect={() => interactive && onSelectTable(t)}
                partySize={partySize}
                interactive={interactive}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Selected Table Callout Banner */}
      {selectedTableId && (
        <div className="mt-5 p-3.5 rounded-xl bg-[#34261C] text-white flex items-center justify-between text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#F59E0B]" />
            <span>
              Table selected: <strong className="font-semibold text-white">Table {tables.find(t => t.id === selectedTableId)?.tableNumber} ({tables.find(t => t.id === selectedTableId)?.name})</strong>
            </span>
          </div>
          <span className="text-[#D5C7B7]">
            Seats up to {tables.find(t => t.id === selectedTableId)?.capacity} guests
          </span>
        </div>
      )}

    </div>
  );
};

interface TableCardProps {
  table: CafeTable;
  isSelected: boolean;
  onSelect: () => void;
  partySize: number;
  interactive: boolean;
}

const TableCard: React.FC<TableCardProps> = ({ table, isSelected, onSelect, partySize, interactive }) => {
  const isAvailable = table.status === 'available';
  const fitsParty = table.capacity >= partySize;

  let cardClasses = 'p-3 rounded-lg border text-left flex flex-col justify-between transition-all min-h-[92px] ';

  if (!isAvailable) {
    cardClasses += 'bg-[#ECE5DC] border-[#DDD3C7] text-[#8C7D70] cursor-not-allowed opacity-60';
  } else if (isSelected) {
    cardClasses += 'bg-[#34261C] border-[#34261C] text-white shadow-sm ring-2 ring-[#B45309]';
  } else {
    cardClasses += 'bg-white border-[#E0D8CE] hover:border-[#34261C] text-[#24211E] cursor-pointer hover:shadow-xs';
  }

  return (
    <button
      type="button"
      disabled={!isAvailable || !interactive}
      onClick={onSelect}
      className={cardClasses}
      title={`${table.name} · Seats ${table.capacity} guests`}
    >
      <div className="flex items-start justify-between w-full">
        <div>
          <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-[#F59E0B]' : 'text-[#8A796A]'}`}>
            T-{table.tableNumber}
          </span>
          <h4 className="text-xs font-semibold leading-tight line-clamp-1">{table.name}</h4>
        </div>
        
        {/* Capacity badge */}
        <div className={`flex items-center gap-0.5 text-[11px] font-mono tabular-nums ${isSelected ? 'text-[#E5DDCF]' : 'text-[#6B5D50]'}`}>
          <Users className="w-3 h-3" />
          <span>{table.capacity}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px]">
        <span className={isSelected ? 'text-[#D8CCC0]' : 'text-[#7A6B5C]'}>
          {table.shape === 'booth' ? 'Plush Booth' : table.shape === 'round' ? 'Round Bistro' : 'Long Table'}
        </span>
        
        {/* Status text */}
        <span>
          {!isAvailable ? (
            <span className="font-medium text-[#7A6B5C]">Occupied</span>
          ) : isSelected ? (
            <span className="font-semibold text-[#F59E0B] flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Selected
            </span>
          ) : !fitsParty ? (
            <span className="text-[#B45309]">Seats {table.capacity}</span>
          ) : (
            <span className="text-[#16A34A] font-medium">Available</span>
          )}
        </span>
      </div>
    </button>
  );
};
