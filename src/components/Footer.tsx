import React, { useState } from 'react';
import { ArrowRight, Check, Coffee } from 'lucide-react';

interface FooterProps {
  onOpenLookup: () => void;
  onToggleHostMode: () => void;
  isHostMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLookup, onToggleHostMode, isHostMode }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#241A13] text-[#FAF8F5] pt-16 pb-12 border-t border-[#3D2C20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-display font-medium text-white block">
              Velvet & Stone
            </span>
            <p className="text-xs sm:text-sm text-[#C5B8A8] leading-relaxed max-w-sm">
              Artisan specialty coffee roastery, living greenhouse conservatory, and sourdough kitchen. 
              Dedicated to slow mornings and convivial tables.
            </p>
            <div className="text-xs text-[#9E8E7D] pt-1">
              428 Elmwood Promenade, Metropolis · (555) 789-2104
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3 text-xs sm:text-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
              Experience
            </span>
            <ul className="space-y-2 text-[#C5B8A8]">
              <li><a href="#menu" className="hover:text-white transition-colors">Seasonal Menu</a></li>
              <li><a href="#reservations" className="hover:text-white transition-colors">Table Booking</a></li>
              <li><a href="#floorplan" className="hover:text-white transition-colors">Floor Plan & Zones</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Our Ethos</a></li>
              <li><a href="#hours" className="hover:text-white transition-colors">Hours & Location</a></li>
            </ul>
          </div>

          {/* Guest Services */}
          <div className="md:col-span-2 space-y-3 text-xs sm:text-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
              Hospitality
            </span>
            <ul className="space-y-2 text-[#C5B8A8]">
              <li>
                <button 
                  onClick={onOpenLookup} 
                  className="hover:text-white transition-colors text-left"
                >
                  Find My Booking
                </button>
              </li>
              <li>
                <a href="#hours" className="hover:text-white transition-colors">
                  Private Gatherings
                </a>
              </li>
              <li>
                <button 
                  onClick={onToggleHostMode} 
                  className="hover:text-[#F59E0B] transition-colors text-left text-[#A89887]"
                >
                  {isHostMode ? 'Exit Host Stand' : 'Host Stand (Staff)'}
                </button>
              </li>
              <li><span className="opacity-70">Gift Cards (At Counter)</span></li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block">
              The Seasonal Letter
            </span>
            <p className="text-xs text-[#C5B8A8] leading-relaxed">
              Receive quarterly notices on new coffee arrivals, private dining seatings, and seasonal pastry releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-white/10 text-xs text-[#10B981] flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Thank you. You are on the private tasting list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-[#8C7D70] focus:outline-hidden focus:ring-1 focus:ring-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#C29E2F] text-[#241A13] font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A7A6B] gap-4">
          <div>
            © {new Date().getFullYear()} Velvet & Stone Roastery & Kitchen. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Downtown Arts District</span>
            <span aria-hidden="true">·</span>
            <span>Single Origin & Hearth Baked</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
