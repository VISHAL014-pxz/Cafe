import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Coffee, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { CartItem, OrderReceipt } from '../types/cafe';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: OrderReceipt) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const [serviceType, setServiceType] = useState<'dine_in' | 'pickup'>('pickup');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const subtotal = items.reduce((acc, it) => acc + it.itemTotal, 0);
  const tax = subtotal * 0.0825; // 8.25% sales tax
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!customerName.trim()) {
      setValidationError('Please enter your name for the order.');
      return;
    }

    if (serviceType === 'dine_in' && !tableNumber.trim()) {
      setValidationError('Please enter your table number for dine-in delivery.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = 'VS-' + Math.floor(1000 + Math.random() * 9000);
      const newOrder: OrderReceipt = {
        orderId: 'ord-' + Date.now(),
        orderNumber,
        items: [...items],
        subtotal,
        tax,
        total,
        serviceType,
        tableNumber: serviceType === 'dine_in' ? tableNumber : undefined,
        estimatedPickupMinutes: serviceType === 'pickup' ? 12 : undefined,
        customerName,
        customerPhone,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'brewing'
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClearCart();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8E1D7] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E1D7] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#34261C]" />
            <h3 className="text-lg font-display font-medium text-[#24211E]">
              Your Cafe Order
            </h3>
            <span className="text-xs text-[#7A6B5C] font-mono tabular-nums">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#736558] hover:text-[#24211E] hover:bg-[#F2ECE3] rounded-lg transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#8C7B6D] mb-4">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h4 className="text-base font-medium text-[#24211E] mb-1">Your bag is empty</h4>
            <p className="text-xs text-[#736558] max-w-xs mb-6">
              Browse our handcrafted coffees, morning viennoiserie, and sourdough plates.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-medium text-white bg-[#34261C] rounded-lg hover:bg-[#201610]"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Service Type Toggle (Functional Buttons) */}
            <div className="p-1 bg-[#ECE5DB] rounded-lg grid grid-cols-2 gap-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setServiceType('pickup')}
                className={`py-2 px-3 rounded-md transition-all ${
                  serviceType === 'pickup'
                    ? 'bg-white text-[#24211E] shadow-xs'
                    : 'text-[#695D52] hover:text-[#24211E]'
                }`}
              >
                Express Counter Pick-Up (12 min)
              </button>
              <button
                type="button"
                onClick={() => setServiceType('dine_in')}
                className={`py-2 px-3 rounded-md transition-all ${
                  serviceType === 'dine_in'
                    ? 'bg-white text-[#24211E] shadow-xs'
                    : 'text-[#695D52] hover:text-[#24211E]'
                }`}
              >
                Dine-In Table Delivery
              </button>
            </div>

            {/* Itemized List */}
            <div className="divide-y divide-[#EBE4DA]">
              {items.map((cartItem) => (
                <div key={cartItem.cartItemId} className="py-3 flex gap-3 items-start">
                  
                  {/* Thumbnail Image */}
                  <img
                    src={cartItem.menuItem.image}
                    alt={cartItem.menuItem.name}
                    className="w-14 h-14 rounded-lg object-cover bg-[#E8DFD3] shrink-0 border border-[#DDD5C7]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-[#24211E] truncate">
                        {cartItem.menuItem.name}
                      </h4>
                      <span className="text-xs font-mono tabular-nums font-semibold text-[#24211E]">
                        ${cartItem.itemTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Customizations summary */}
                    <div className="text-[11px] text-[#7A6B5C] mt-0.5 space-y-0.5">
                      {cartItem.customization.milk && (
                        <div>Milk: {cartItem.customization.milk}</div>
                      )}
                      {cartItem.customization.sweetness && (
                        <div>Sweetness: {cartItem.customization.sweetness}</div>
                      )}
                      {cartItem.customization.selectedAdditions && cartItem.customization.selectedAdditions.length > 0 && (
                        <div>Extra: {cartItem.customization.selectedAdditions.join(', ')}</div>
                      )}
                      {cartItem.customization.specialInstructions && (
                        <div className="italic text-[#945638]">Note: "{cartItem.customization.specialInstructions}"</div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-[#DDD5C7] rounded bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                          className="p-1 text-[#695D52] hover:bg-[#F2ECE3]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-[#24211E]">
                          {cartItem.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                          className="p-1 text-[#695D52] hover:bg-[#F2ECE3]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(cartItem.cartItemId)}
                        className="text-xs text-[#A34B22] hover:text-[#7A3415] flex items-center gap-1"
                        aria-label="Remove item from order"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* Customer Information Inputs */}
            <div className="pt-4 border-t border-[#E8E1D7] space-y-3 bg-[#F4EFE7] p-3.5 rounded-xl">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-[#6E5F52]">
                Order Details
              </h5>

              {serviceType === 'dine_in' && (
                <div>
                  <label className="block text-[11px] font-medium text-[#5E5145] mb-1">
                    Your Table Number (1 - 12) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Table 4"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white rounded border border-[#D5C9BA] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-medium text-[#5E5145] mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Julian Chen"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white rounded border border-[#D5C9BA] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#5E5145] mb-1">
                  Mobile Number (for pickup SMS updates)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. (555) 234-5678"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white rounded border border-[#D5C9BA] focus:outline-hidden focus:ring-1 focus:ring-[#34261C]"
                />
              </div>

              {validationError && (
                <p className="text-xs text-[#DC2626] font-medium">{validationError}</p>
              )}
            </div>

          </div>
        )}

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8E1D7] bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-[#6B5D50]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8.25%)</span>
                <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE2D6] text-sm font-semibold text-[#24211E]">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-[#34261C] hover:bg-[#201610] text-white text-xs sm:text-sm font-medium rounded-lg shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Preparing Order Ticket...</span>
              ) : (
                <>
                  <span>
                    {serviceType === 'dine_in' ? 'Send Order to Bar & Kitchen' : 'Place Express Counter Order'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-[#8C7C6E]">
              Payment collected seamlessly at table / counter upon fulfillment.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
