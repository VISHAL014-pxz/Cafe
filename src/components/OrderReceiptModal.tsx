import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, ShoppingBag, Coffee, ArrowRight } from 'lucide-react';
import { OrderReceipt } from '../types/cafe';

interface OrderReceiptModalProps {
  order: OrderReceipt | null;
  onClose: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const [orderStage, setOrderStage] = useState<'received' | 'brewing' | 'ready'>('brewing');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderStage('ready');
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E1D7] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-[#34261C] text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white mx-auto flex items-center justify-center mb-3 shadow-md">
            <CheckCircle className="w-6 h-6" />
          </div>

          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block mb-1">
            Order Dispatched to Barista
          </span>
          <h3 className="text-xl font-display font-medium text-white">
            Thank you, {order.customerName}
          </h3>
          <p className="text-xs text-[#C5B8A8] mt-1 font-mono tabular-nums">
            Order #{order.orderNumber} · {order.createdAt}
          </p>
        </div>

        {/* Live Progress Tracker */}
        <div className="p-4 bg-[#F2EDE4] border-b border-[#E0D8CE]">
          <div className="text-[11px] font-semibold text-[#544639] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Kitchen & Bar Status</span>
            <span className="text-[#A34B22] capitalize font-mono">
              {orderStage === 'brewing' ? 'Brewing & Plating' : 'Ready at Counter'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2 rounded bg-white border border-[#DDD3C5]">
              <span className="block font-bold text-[#16A34A]">✓ Received</span>
              <span className="text-[#8A796A] text-[9px]">Ticket printed</span>
            </div>
            <div className={`p-2 rounded border transition-colors ${
              orderStage === 'brewing' 
                ? 'bg-[#34261C] text-white border-[#34261C]' 
                : 'bg-white border-[#DDD3C5] text-[#16A34A]'
            }`}>
              <span className="block font-bold">
                {orderStage === 'brewing' ? '● In Progress' : '✓ Prepared'}
              </span>
              <span className="text-[9px] opacity-80">Extraction & Bake</span>
            </div>
            <div className={`p-2 rounded border transition-colors ${
              orderStage === 'ready' 
                ? 'bg-[#16A34A] text-white border-[#16A34A]' 
                : 'bg-white border-[#DDD3C5] text-[#8A796A]'
            }`}>
              <span className="block font-bold">
                {orderStage === 'ready' ? '★ Ready' : '3. Ready'}
              </span>
              <span className="text-[9px] opacity-80">
                {order.serviceType === 'dine_in' ? `Table ${order.tableNumber}` : 'Counter Pickup'}
              </span>
            </div>
          </div>
        </div>

        {/* Itemized Receipt */}
        <div className="p-5 overflow-y-auto max-h-60 space-y-3 text-xs">
          <div className="text-[#7A6B5C] flex items-center justify-between pb-2 border-b border-[#E8E1D7]">
            <span>Item</span>
            <span>Price</span>
          </div>

          <div className="divide-y divide-[#F0EAE1]">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-10 h-10 rounded-md object-cover bg-[#E8DFD3] shrink-0 border border-[#DDD5C7]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-semibold text-[#24211E] truncate">
                      {item.quantity}x {item.menuItem.name}
                    </div>
                    {item.customization.milk && (
                      <div className="text-[11px] text-[#8A796A]">Milk: {item.customization.milk}</div>
                    )}
                    {item.customization.selectedAdditions && item.customization.selectedAdditions.length > 0 && (
                      <div className="text-[11px] text-[#8A796A]">
                        +{item.customization.selectedAdditions.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
                <span className="font-mono font-medium text-[#24211E] tabular-nums shrink-0 pt-0.5">
                  ${item.itemTotal.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E1D7] space-y-1 font-mono text-xs">
            <div className="flex justify-between text-[#7A6B5C]">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#7A6B5C]">
              <span>Tax (8.25%)</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#24211E] pt-1 border-t border-[#E0D8CE]">
              <span>Total Paid / Due</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E8E1D7] flex items-center justify-between">
          <span className="text-xs text-[#7A6B5C]">
            {order.serviceType === 'dine_in' 
              ? `Delivery to Table ${order.tableNumber}` 
              : `Express Pickup in ~${order.estimatedPickupMinutes || 12} min`
            }
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#34261C] hover:bg-[#201610] text-white text-xs font-medium rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
