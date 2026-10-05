import React from 'react';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Coffee, Award, Compass } from 'lucide-react';

interface HeroProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick, onExploreMenuClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Unboxed Metadata Header (No pills!) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#7A6B5E] mb-4">
              <span>Artisan Roastery</span>
              <span aria-hidden="true">·</span>
              <span>Sourdough Bakery</span>
              <span aria-hidden="true">·</span>
              <span>Seasonal Kitchen</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#A34B22] font-semibold">Michelin Guide Recommended</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#24211E] tracking-tight leading-[1.12] mb-6 [text-wrap:balance]">
              Crafted coffee, slow food, and sacred morning rituals.
            </h1>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-[#5E544C] leading-relaxed max-w-2xl mb-8">
              A serene culinary haven nestled between sunlit olive trees and book-lined velvet alcoves. 
              We roast single-origin micro-lots on site, bake heritage grains at daybreak, and celebrate 
              the timeless art of leisurely dining.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onReserveClick}
                className="px-6 py-3.5 text-sm font-medium text-white bg-[#34261C] hover:bg-[#201610] rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={onExploreMenuClick}
                className="px-6 py-3.5 text-sm font-medium text-[#24211E] bg-[#EFE9DF] hover:bg-[#E5DDCF] border border-[#DDD4C5] rounded-lg transition-all flex items-center gap-2"
              >
                <span>Explore Seasonal Menu</span>
                <ArrowRight className="w-4 h-4 text-[#7A6B5E]" />
              </button>
            </div>

            {/* Operating status & Address (Unboxed quiet text) */}
            <div className="pt-6 border-t border-[#E8E1D7] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#736558]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                <span className="font-medium text-[#24211E]">Open Today</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">7:30 AM – 9:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#A34B22]" />
                <span>428 Elmwood Promenade, Metropolis</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Anchor (Artisanal Composition) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#2D2118] via-[#38281E] to-[#1C120C] text-[#FAF8F5] p-7 sm:p-9 shadow-xl border border-[#4A3728]">
              
              {/* Subtle architectural atmosphere graphic */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#D97706]/15 via-transparent to-transparent pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Morning Service Live</p>
                  <h3 className="text-xl font-display font-medium text-white">Daily Roast & Hearth Batch</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                  <Coffee className="w-5 h-5" />
                </div>
              </div>

              {/* Showcase highlights */}
              <div className="space-y-4 mb-6">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between text-xs text-[#E5DDCF] mb-1">
                    <span className="font-semibold text-white">Single-Origin Espresso</span>
                    <span className="font-mono text-[#D4AF37] tabular-nums">$6.50</span>
                  </div>
                  <p className="text-xs text-[#C2B5A5] leading-relaxed">
                    Ethiopia Yirgacheffe Heirloom · Notes of jasmine blossom, bergamot, white peach
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between text-xs text-[#E5DDCF] mb-1">
                    <span className="font-semibold text-white">Cultured Sourdough Tartine</span>
                    <span className="font-mono text-[#D4AF37] tabular-nums">$15.50</span>
                  </div>
                  <p className="text-xs text-[#C2B5A5] leading-relaxed">
                    Italian Stracciatella, fresh smashed avocado, Aleppo chili flakes, microgreens
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between text-xs text-[#E5DDCF] mb-1">
                    <span className="font-semibold text-white">Viennoiserie Batch</span>
                    <span className="font-mono text-[#D4AF37] tabular-nums">$4.75</span>
                  </div>
                  <p className="text-xs text-[#C2B5A5] leading-relaxed">
                    AOP Normandy butter flaky croissant pulled hot from the oven at 6:00 AM
                  </p>
                </div>
              </div>

              {/* Card Footer with Seating zones snapshot */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#C2B5A5]">
                <span>4 Distinct Dining Spaces</span>
                <span className="flex items-center gap-1.5 text-[#F59E0B] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-time Table Booking Available</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
