import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, ShieldCheck, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenLookup: () => void;
  onToggleHostMode: () => void;
  isHostMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenLookup,
  onToggleHostMode,
  isHostMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-[#24211E] hover:opacity-90 transition-opacity"
          >
            Velvet & Stone
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5E544C]">
            <a href="#menu" className="hover:text-[#24211E] transition-colors">Menu</a>
            <a href="#reservations" className="hover:text-[#24211E] transition-colors">Reserve a Table</a>
            <a href="#floorplan" className="hover:text-[#24211E] transition-colors">Floor Plan</a>
            <a href="#story" className="hover:text-[#24211E] transition-colors">Our Ethos</a>
            <a href="#hours" className="hover:text-[#24211E] transition-colors">Hours & Visit</a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Find Booking Button (quiet text button) */}
            <button
              onClick={onOpenLookup}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#736558] hover:text-[#24211E] hover:bg-[#F2ECE3] rounded transition-colors whitespace-nowrap"
              title="Lookup your existing reservation"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Booking</span>
            </button>

            {/* Host Stand toggle */}
            <button
              onClick={onToggleHostMode}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                isHostMode 
                  ? 'bg-[#3F2B1D] text-white shadow-xs' 
                  : 'text-[#736558] hover:bg-[#F2ECE3] hover:text-[#24211E]'
              }`}
              title="Host Stand floor view for cafe staff"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isHostMode ? 'Host Stand Active' : 'Staff Mode'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#24211E] hover:bg-[#F0EAE0] rounded-lg transition-colors"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#24211E]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#A34B22] text-white text-[10px] font-semibold flex items-center justify-center rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action: Book a Table */}
            <button
              onClick={onOpenReservation}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#34261C] hover:bg-[#201610] rounded-lg transition-all shadow-xs hover:shadow-sm whitespace-nowrap"
            >
              Book a Table
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#24211E] hover:bg-[#F0EAE0] rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E1D7] flex flex-col gap-3">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#24211E] hover:bg-[#F0EAE0] rounded"
            >
              Menu
            </a>
            <a 
              href="#reservations" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#24211E] hover:bg-[#F0EAE0] rounded"
            >
              Reserve a Table
            </a>
            <a 
              href="#floorplan" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#24211E] hover:bg-[#F0EAE0] rounded"
            >
              Floor Plan & Zones
            </a>
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#24211E] hover:bg-[#F0EAE0] rounded"
            >
              Our Ethos & Roastery
            </a>
            <a 
              href="#hours" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-base font-medium text-[#24211E] hover:bg-[#F0EAE0] rounded"
            >
              Hours & Location
            </a>
            <div className="pt-2 border-t border-[#E8E1D7] flex items-center justify-between px-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookup();
                }}
                className="text-sm font-medium text-[#736558] hover:text-[#24211E]"
              >
                Find My Booking
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleHostMode();
                }}
                className="text-sm font-medium text-[#A34B22]"
              >
                {isHostMode ? 'Exit Staff Mode' : 'Staff Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
