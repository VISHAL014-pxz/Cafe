import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Car, Train, Wifi, ChevronDown, ChevronUp, CheckCircle, Send } from 'lucide-react';

export const LocationHoursSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [privateEventSubmitted, setPrivateEventSubmitted] = useState(false);
  const [eventData, setEventData] = useState({ name: '', email: '', date: '', guests: '20', message: '' });

  const faqs = [
    {
      q: 'How long do you hold reservations if we are running late?',
      a: 'We hold tables for 15 minutes past your reserved time. If you anticipate arriving later, simply call our host stand at (555) 789-2104 or text your confirmation code and we will gladly hold your placement.'
    },
    {
      q: 'Are pets welcomed in the dining spaces?',
      a: 'Leashed and well-behaved dogs are warmly welcomed on our heated Cobblestone Terrace. We provide fresh water bowls and house-baked peanut butter oat biscuits upon request.'
    },
    {
      q: 'What is your laptop and remote work policy?',
      a: 'Remote work with laptops and power outlets is warmly supported at the Espresso Bar and Cobblestone Terrace on Monday through Friday. To preserve a leisurely communal ambiance, the Sunlit Conservatory and Library Alcove remain laptop-free zones on weekends and evenings.'
    },
    {
      q: 'Can dietary restrictions and allergies be accommodated?',
      a: 'Absolutely. We offer certified gluten-free bread substitutions, a wide array of house-crafted nut and oat milks (Oatly, pistachio, almond), and vegan tartines. Please note your requirements in the reservation booking notes.'
    },
    {
      q: 'Do you host private gatherings, buyouts, or cupping workshops?',
      a: 'Yes! We host intimate private dinners, wedding rehearsal brunches, and private barista cupping workshops for groups of 10 to 65 guests. Submit the inquiry form below or speak with our events coordinator.'
    }
  ];

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPrivateEventSubmitted(true);
  };

  return (
    <section id="hours" className="py-20 sm:py-28 bg-[#F5EFE6] border-t border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A34B22] mb-2">
            <span>Visit Velvet & Stone</span>
            <span aria-hidden="true">·</span>
            <span>Metropolis Arts Quarter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#24211E] tracking-tight mb-4">
            Hours & Location
          </h2>
          <p className="text-base text-[#6B5D50] leading-relaxed">
            Conveniently situated in the historic promenade, steps away from the civic art museum and botanic gardens.
          </p>
        </div>

        {/* 2-Column Location & Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Hours Schedule Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5DDD2] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#34261C] mb-4">
                <Clock className="w-4 h-4 text-[#A34B22]" />
                <span>Operating Schedule</span>
              </div>

              <div className="divide-y divide-[#F0EAE0] text-xs sm:text-sm">
                <div className="py-3 flex justify-between items-center">
                  <span className="font-medium text-[#24211E]">Monday – Thursday</span>
                  <span className="font-mono tabular-nums text-[#6B5D50]">7:30 AM – 9:00 PM</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="font-medium text-[#24211E]">Friday</span>
                  <span className="font-mono tabular-nums text-[#6B5D50]">7:30 AM – 10:00 PM</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="font-medium text-[#24211E]">Saturday (Full Hearth & Brunch)</span>
                  <span className="font-mono tabular-nums text-[#6B5D50]">8:00 AM – 10:00 PM</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="font-medium text-[#24211E]">Sunday</span>
                  <span className="font-mono tabular-nums text-[#6B5D50]">8:00 AM – 8:30 PM</span>
                </div>
              </div>

              {/* Service Periods */}
              <div className="mt-6 pt-5 border-t border-[#F0EAE0] space-y-1.5 text-xs text-[#7A6B5C]">
                <div><strong className="text-[#34261C]">Hearth & Morning Pastry: </strong> Daily from opening</div>
                <div><strong className="text-[#34261C]">Artisan Brunch: </strong> 11:00 AM – 2:30 PM daily</div>
                <div><strong className="text-[#34261C]">Evening Small Plates & Natural Wine: </strong> From 5:00 PM</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center justify-between text-xs text-[#7A6B5C]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                <span className="font-medium text-[#24211E]">Kitchen Open Daily</span>
              </span>
              <span>Holidays may vary</span>
            </div>
          </div>

          {/* Right Column: Address, Map Graphic & Transit */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DDD2] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#34261C] mb-4">
                <MapPin className="w-4 h-4 text-[#A34B22]" />
                <span>Finding Us</span>
              </div>

              {/* Address details */}
              <div className="mb-6">
                <h4 className="text-xl font-display font-medium text-[#24211E] mb-1">
                  428 Elmwood Promenade
                </h4>
                <p className="text-xs sm:text-sm text-[#5E5042]">
                  Metropolis, CA 90210 · Corner of 4th & Elmwood (Opposite the Conservatory Fountain)
                </p>
              </div>

              {/* Stylized Map Viewport */}
              <div className="relative rounded-xl overflow-hidden bg-[#E8E1D5] border border-[#DDD3C5] p-6 mb-6">
                <div className="space-y-2 text-xs text-[#544639]">
                  <div className="font-bold text-[#24211E] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#A34B22]" />
                    <span>Velvet & Stone Roastery & Kitchen</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Historic limestone building with green awnings and outdoor wrought-iron tables.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#6B5D50]">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#A34B22]" />
                    <span>(555) 789-2104</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#A34B22]" />
                    <span>table@velvetandstone.cafe</span>
                  </span>
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5E5042]">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE5DA]">
                  <Car className="w-4 h-4 text-[#34261C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-[#24211E] block mb-0.5">Parking & Valet</strong>
                    <span>Complimentary 2-hour validated parking at the Elmwood Garage across the promenade.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF8F5] border border-[#EDE5DA]">
                  <Train className="w-4 h-4 text-[#34261C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-[#24211E] block mb-0.5">Public Transit</strong>
                    <span>2 blocks north of Promenade Metro Station (Red & Blue lines). Elmwood bus stop #14.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center justify-between text-xs text-[#7A6B5C]">
              <span>Wheelchair accessible throughout</span>
              <span>High-speed guest fiber Wi-Fi available</span>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-display font-medium text-[#24211E] mb-6 text-center">
            Frequently Inquired
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#E5DDD2] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#24211E] hover:text-[#A34B22] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#8A796A] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#8A796A] shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-[#5E5042] leading-relaxed border-t border-[#F5EFE7] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
