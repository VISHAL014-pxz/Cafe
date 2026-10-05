import React from 'react';
import { Coffee, Flame, Heart, Compass, Sparkles, Feather } from 'lucide-react';
import { DINING_ZONES } from '../data/menuData';

export const AmbianceStorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 sm:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A34B22] mb-3">
            <span>Philosophy & Terroir</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2018</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#24211E] tracking-tight mb-6">
            Where deliberate craft meets relaxed warmth.
          </h2>
          <p className="text-base sm:text-lg text-[#5E5042] leading-relaxed">
            Velvet & Stone was founded on a simple conviction: that our daily rituals deserve reverence. 
            We roast small batches twice weekly to preserve the delicate floral aromatics of each terroir, 
            mill heritage grain by hand for morning sourdoughs, and design each space so you can slow down and linger.
          </p>
        </div>

        {/* 3 Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="p-8 rounded-2xl bg-white border border-[#E5DDD2] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF2E8] text-[#A34B22] flex items-center justify-center mb-6">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-medium text-[#24211E] mb-3">
                Direct-Trade Micro-Roasting
              </h3>
              <p className="text-xs sm:text-sm text-[#5E5042] leading-relaxed">
                We partner directly with smallholder coffee farms across Ethiopia, Colombia, and Guatemala, 
                paying 180% above Fair Trade minimums. Every roast profile is calibrated by our Head Roaster 
                to highlight origin sweetness.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#F2ECE3] text-xs font-mono text-[#8A796A]">
              Diedrich IR-12 · Batch Tested
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E5DDD2] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#F4F7F2] text-[#4E5D42] flex items-center justify-center mb-6">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-medium text-[#24211E] mb-3">
                Heritage Sourdough Bakery
              </h3>
              <p className="text-xs sm:text-sm text-[#5E5042] leading-relaxed">
                Our levain starter has been fed daily for 7 years. Baked using certified organic heritage grains 
                stone-milled on site, French AOP butter from Normandy, and slow 36-hour cold fermentations.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#F2ECE3] text-xs font-mono text-[#8A796A]">
              36hr Ferment · Wild Starter
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-[#E5DDD2] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#F2F5F8] text-[#2563EB] flex items-center justify-center mb-6">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-medium text-[#24211E] mb-3">
                Intentional Space & Sound
              </h3>
              <p className="text-xs sm:text-sm text-[#5E5042] leading-relaxed">
                From custom walnut banquettes upholstered in mohair velvet to our living greenhouse atrium 
                and gentle vinyl acoustics, each zone is architected to foster genuine human connection.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#F2ECE3] text-xs font-mono text-[#8A796A]">
              Bespoke Acoustics · Natural Light
            </div>
          </div>

        </div>

        {/* The 4 Dining Environments Showcase */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E8E1D7] gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A34B22] block mb-1">
                Spatial Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#24211E]">
                Four Distinct Dining Atmospheres
              </h3>
            </div>
            <p className="text-xs text-[#736558] max-w-sm">
              Each room carries its own light, cadence, and acoustic quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DINING_ZONES.map((zone) => (
              <div
                key={zone.id}
                className="bg-white rounded-xl border border-[#E5DDD2] p-5 flex flex-col justify-between shadow-xs hover:border-[#34261C] transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A34B22] block mb-1">
                    {zone.capacity}
                  </span>
                  <h4 className="text-base font-semibold text-[#24211E] mb-1">
                    {zone.name}
                  </h4>
                  <p className="text-xs text-[#8A796A] mb-3">
                    {zone.subtitle}
                  </p>
                  <p className="text-xs text-[#5E5042] leading-relaxed mb-4">
                    {zone.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2ECE3] text-[11px] text-[#7A6B5C]">
                  <strong className="text-[#34261C]">Ideal for: </strong>
                  {zone.idealFor}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
