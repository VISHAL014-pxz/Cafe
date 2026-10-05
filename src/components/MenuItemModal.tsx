import React, { useState } from 'react';
import { X, Plus, Minus, Check, Coffee, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem, CartCustomization } from '../types/cafe';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, customization: CartCustomization, itemTotal: number) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState(item.options?.milks?.[0] || '');
  const [selectedSweetness, setSelectedSweetness] = useState(item.options?.sweetness?.[0] || '');
  const [selectedTemp, setSelectedTemp] = useState(item.options?.temperatures?.[0] || '');
  const [selectedAdditions, setSelectedAdditions] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Compute additions cost
  const additionsTotal = selectedAdditions.reduce((acc, addName) => {
    const found = item.options?.additions?.find(a => a.name === addName);
    return acc + (found ? found.price : 0);
  }, 0);

  // Milk surcharge check
  let milkSurcharge = 0;
  if (selectedMilk.includes('+0.75')) milkSurcharge = 0.75;
  if (selectedMilk.includes('+1.00')) milkSurcharge = 1.00;

  const unitPrice = item.price + additionsTotal + milkSurcharge;
  const totalPrice = unitPrice * quantity;

  const handleToggleAddition = (name: string) => {
    setSelectedAdditions(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleAddToCart = () => {
    setAddedAnimation(true);
    onAddToCart(
      item,
      quantity,
      {
        milk: selectedMilk,
        sweetness: selectedSweetness,
        temperature: selectedTemp,
        selectedAdditions,
        specialInstructions
      },
      totalPrice
    );
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E1D7] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        <div className={`p-6 bg-gradient-to-r ${item.visualTheme.bgGradient} text-white relative flex-shrink-0`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#E5DDCF] mb-2 font-medium">
            <span>{item.category.toUpperCase()}</span>
            {item.caffeineLevel && (
              <>
                <span aria-hidden="true">·</span>
                <span>{item.caffeineLevel} Caffeine</span>
              </>
            )}
            {item.calories && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{item.calories} kcal</span>
              </>
            )}
          </div>

          <h3 className="text-2xl font-display font-medium text-white mb-2 leading-tight">
            {item.name}
          </h3>

          <div className="text-xl font-mono font-semibold text-[#F59E0B] tabular-nums">
            ${item.price.toFixed(2)}
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#382D24]">
          
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-1.5">Description</h4>
            <p className="text-[#4F4337] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Origin & Tasting Notes */}
          {item.origin && (
            <div className="p-3.5 rounded-xl bg-[#F2EDE4] border border-[#E5DDD2]">
              <div className="text-xs font-medium text-[#736353] mb-1">Terroir & Origin</div>
              <p className="text-[#2C231B] font-medium">{item.origin}</p>
              {item.tastingNotes && item.tastingNotes.length > 0 && (
                <div className="mt-2 text-xs text-[#5E5042] flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-[#736353]">Notes:</span>
                  <span>{item.tastingNotes.join(' · ')}</span>
                </div>
              )}
            </div>
          )}

          {/* Allergens Unboxed */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="text-xs text-[#7A6B5C] flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#A34B22] shrink-0" />
              <span>
                <strong className="font-medium text-[#4A3D31]">Allergens: </strong>
                {item.allergens.join(', ')}
              </span>
            </div>
          )}

          {/* Customization Options */}
          {item.options && (
            <div className="space-y-4 pt-4 border-t border-[#E8E1D7]">
              
              {/* Milk Options */}
              {item.options.milks && item.options.milks.length > 0 && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2">
                    Choice of Milk
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.options.milks.map((milk) => (
                      <button
                        key={milk}
                        type="button"
                        onClick={() => setSelectedMilk(milk)}
                        className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-all border ${
                          selectedMilk === milk
                            ? 'bg-[#34261C] text-white border-[#34261C] shadow-xs'
                            : 'bg-white text-[#382D24] border-[#DDD5C7] hover:border-[#34261C]'
                        }`}
                      >
                        {milk}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweetness Options */}
              {item.options.sweetness && item.options.sweetness.length > 0 && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2">
                    Sweetness
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {item.options.sweetness.map((sweet) => (
                      <button
                        key={sweet}
                        type="button"
                        onClick={() => setSelectedSweetness(sweet)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                          selectedSweetness === sweet
                            ? 'bg-[#34261C] text-white border-[#34261C]'
                            : 'bg-white text-[#382D24] border-[#DDD5C7] hover:border-[#34261C]'
                        }`}
                      >
                        {sweet}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Temperature */}
              {item.options.temperatures && item.options.temperatures.length > 0 && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2">
                    Serving Style
                  </label>
                  <div className="flex gap-2">
                    {item.options.temperatures.map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setSelectedTemp(temp)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                          selectedTemp === temp
                            ? 'bg-[#34261C] text-white border-[#34261C]'
                            : 'bg-white text-[#382D24] border-[#DDD5C7] hover:border-[#34261C]'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Additions */}
              {item.options.additions && item.options.additions.length > 0 && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-2">
                    Additions & Upgrades
                  </label>
                  <div className="space-y-1.5">
                    {item.options.additions.map((addition) => {
                      const isSelected = selectedAdditions.includes(addition.name);
                      return (
                        <button
                          key={addition.name}
                          type="button"
                          onClick={() => handleToggleAddition(addition.name)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-all border ${
                            isSelected
                              ? 'bg-[#FAF1E8] border-[#A34B22] text-[#6E2E10]'
                              : 'bg-white border-[#DDD5C7] text-[#382D24] hover:border-[#8A796A]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isSelected ? 'bg-[#A34B22] border-[#A34B22] text-white' : 'border-[#B8AB9C]'
                            }`}>
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span>{addition.name}</span>
                          </div>
                          <span className="font-mono tabular-nums">+${addition.price.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8A796A] font-semibold mb-1.5">
                  Barista / Kitchen Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra hot, lightly toasted, dressing on side"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-white text-[#24211E] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
                />
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F5EFE6] border-t border-[#E8E1D7] flex items-center justify-between gap-4 flex-shrink-0">
          
          {/* Quantity Stepper */}
          <div className="flex items-center bg-white border border-[#D5C9BA] rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2.5 text-[#544639] hover:bg-[#EFE7DC] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-semibold font-mono tabular-nums text-[#24211E]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2.5 text-[#544639] hover:bg-[#EFE7DC] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 py-3 px-5 text-sm font-medium rounded-lg text-white transition-all shadow-xs flex items-center justify-between ${
              addedAnimation ? 'bg-[#15803D]' : 'bg-[#34261C] hover:bg-[#201610]'
            }`}
          >
            <span>{addedAnimation ? 'Added to Order!' : 'Add to Order'}</span>
            <span className="font-mono tabular-nums">${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
