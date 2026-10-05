import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Coffee, Wine, Croissant, Utensils, X, ChevronRight } from 'lucide-react';
import { MenuItem, DietaryTag } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

type CategoryTab = 'all' | 'coffee' | 'tea' | 'bakery' | 'brunch' | 'plates' | 'desserts';

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('all');
  const [activeDietary, setActiveDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const categories: { id: CategoryTab; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'coffee', label: 'Specialty Coffee' },
    { id: 'tea', label: 'Teas & Botanicals' },
    { id: 'bakery', label: 'Bakery & Viennoiserie' },
    { id: 'brunch', label: 'All-Day Brunch' },
    { id: 'plates', label: 'Savory Plates' },
    { id: 'desserts', label: 'Desserts & Sweets' }
  ];

  const dietaryFilters = [
    { id: 'all', label: 'All Diets' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'chef-pick', label: "Chef's Signature" }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter match
      if (activeDietary !== 'all') {
        if (!item.tags.includes(activeDietary as DietaryTag)) {
          return false;
        }
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesNotes = item.tastingNotes?.some(t => t.toLowerCase().includes(query));
        const matchesOrigin = item.origin?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesNotes && !matchesOrigin) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, activeDietary, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8E1D7] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A34B22] mb-2">
              <span>Artisanal Kitchen & Brew Bar</span>
              <span aria-hidden="true">·</span>
              <span>Spring / Summer Harvest</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#24211E] tracking-tight">
              The Seasonal Menu
            </h2>
          </div>
          <p className="text-sm text-[#736558] max-w-md leading-relaxed">
            All grain is freshly stone-milled in house. Coffee is roasted on our Diedrich IR-12. 
            Prepared fresh to order for dine-in or express counter pick-up.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Top Row: Search Input + Dietary Segmented Control */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A796A]" />
              <input
                type="text"
                placeholder="Search coffee, pastries, tasting notes, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-white rounded-lg border border-[#DDD5C7] text-[#24211E] placeholder:text-[#9C8F83] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A796A] hover:text-[#24211E]"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Segmented Buttons */}
            <div className="flex items-center gap-1 p-1 bg-[#EFE9DF] rounded-lg overflow-x-auto">
              {dietaryFilters.map((df) => (
                <button
                  key={df.id}
                  onClick={() => setActiveDietary(df.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    activeDietary === df.id
                      ? 'bg-white text-[#24211E] shadow-xs'
                      : 'text-[#6B5E52] hover:text-[#24211E]'
                  }`}
                >
                  {df.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Category Horizontal Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#34261C] text-white shadow-xs'
                    : 'bg-[#F2ECE3] text-[#594C40] hover:bg-[#EAE2D7] hover:text-[#24211E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Results Count & Active Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-[#7A6B5C] mb-6">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="font-semibold text-[#24211E] tabular-nums">{filteredItems.length}</strong> items</span>
            {(activeCategory !== 'all' || activeDietary !== 'all' || searchQuery) && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveDietary('all');
                    setSearchQuery('');
                  }}
                  className="text-[#A34B22] underline hover:opacity-80"
                >
                  Reset filters
                </button>
              </>
            )}
          </div>
          <span className="hidden sm:inline">Click any dish to customize milks, flavors & order</span>
        </div>

        {/* Menu Items Grid: 3-column desktop layout with generous whitespace */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group relative bg-white rounded-xl border border-[#E5DDD2] overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {/* Visual Header Photo Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#241A13]">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${item.visualTheme.bgGradient} flex items-center justify-center text-white/80`}>
                      <Coffee className="w-10 h-10 stroke-1" />
                    </div>
                  )}

                  {/* Gradient Scrim for Contrast & Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top line metadata overlay (unboxed text with text shadow) */}
                  <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-xs text-white/90 font-medium z-10 drop-shadow-xs">
                    <span className="uppercase tracking-wider text-[11px] font-semibold text-white/95">
                      {item.category}
                    </span>
                    {item.calories && (
                      <span className="tabular-nums font-mono text-[11px] text-white/80">
                        {item.calories} kcal
                      </span>
                    )}
                  </div>

                  {/* Bottom line tag & origin overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-10">
                    <div className="min-w-0 pr-2">
                      {item.origin && (
                        <p className="text-[11px] text-white/85 truncate leading-tight drop-shadow-xs">
                          {item.origin}
                        </p>
                      )}
                    </div>
                    {item.tags.includes('signature') && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FDE047] flex items-center gap-1 drop-shadow-xs shrink-0">
                        <Sparkles className="w-3 h-3" />
                        Signature
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Item Name & Price Baseline */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-[#24211E] group-hover:text-[#A34B22] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-base font-semibold font-mono tabular-nums text-[#24211E]">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Prose Description */}
                    <p className="text-xs text-[#5E5042] line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Tasting notes / unboxed text separators */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="text-[11px] text-[#7A6B5C] mb-3 line-clamp-1">
                        <span>{item.tastingNotes.join(' · ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Action Row */}
                  <div className="pt-3 border-t border-[#F2ECE3] flex items-center justify-between mt-auto">
                    {/* Dietary indicators as clean unboxed text */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8A796A]">
                      {item.tags.includes('vegan') && <span>Vegan</span>}
                      {item.tags.includes('vegan') && item.tags.includes('gluten-free') && <span aria-hidden="true">·</span>}
                      {item.tags.includes('gluten-free') && <span>Gluten-Free</span>}
                      {item.tags.includes('vegetarian') && !item.tags.includes('vegan') && <span>Vegetarian</span>}
                    </div>

                    {/* Quick Add Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAdd(item);
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg text-[#34261C] bg-[#F4EFE6] hover:bg-[#34261C] hover:text-white transition-all flex items-center gap-1"
                      title="Quick add to order with standard options"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-xl border border-[#E5DDD2] p-8">
            <p className="text-base font-medium text-[#24211E] mb-1">No offerings match your filter</p>
            <p className="text-xs text-[#736558] mb-4">Try clearing your search query or selecting a different dietary preference.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveDietary('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-medium text-white bg-[#34261C] rounded-lg hover:bg-[#201610]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
