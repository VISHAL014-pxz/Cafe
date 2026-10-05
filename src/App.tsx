import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { MenuItemModal } from './components/MenuItemModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationSection } from './components/ReservationSection';
import { ReservationModal } from './components/ReservationModal';
import { ReservationSuccessModal } from './components/ReservationSuccessModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { HostStandDashboard } from './components/HostStandDashboard';
import { AmbianceStorySection } from './components/AmbianceStorySection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { 
  MenuItem, 
  CartItem, 
  CartCustomization, 
  CafeTable, 
  Reservation, 
  OrderReceipt, 
  MealPeriod, 
  ZoneId, 
  TableStatus 
} from './types/cafe';
import { INITIAL_TABLES, INITIAL_RESERVATIONS } from './data/tableData';

const STORAGE_KEYS = {
  TABLES: 'vs_cafe_tables_v1',
  RESERVATIONS: 'vs_cafe_reservations_v1',
  CART: 'vs_cafe_cart_v1'
};

export default function App() {
  // Load saved state or default
  const [tables, setTables] = useState<CafeTable[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TABLES);
      return saved ? JSON.parse(saved) : INITIAL_TABLES;
    } catch {
      return INITIAL_TABLES;
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
    date: string;
    time: string;
    mealPeriod: MealPeriod;
    partySize: number;
    zoneId: ZoneId;
    tableId: string;
  } | undefined>(undefined);

  const [successReservation, setSuccessReservation] = useState<Reservation | null>(null);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [isHostMode, setIsHostMode] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderReceipt | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [tables]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [cart]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Cart Actions ---
  const handleAddToCart = (
    item: MenuItem, 
    quantity: number, 
    customization: CartCustomization, 
    itemTotal: number
  ) => {
    const newItem: CartItem = {
      cartItemId: 'ci-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      menuItem: item,
      quantity,
      customization,
      itemTotal
    };

    setCart(prev => [...prev, newItem]);
    showToast(`Added ${quantity}x ${item.name} to order.`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const newItem: CartItem = {
      cartItemId: 'ci-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      menuItem: item,
      quantity: 1,
      customization: {
        milk: item.options?.milks?.[0],
        sweetness: item.options?.sweetness?.[0],
        temperature: item.options?.temperatures?.[0]
      },
      itemTotal: item.price
    };

    setCart(prev => [...prev, newItem]);
    showToast(`Added 1x ${item.name} to order.`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const unitPrice = item.itemTotal / item.quantity;
        return {
          ...item,
          quantity: newQty,
          itemTotal: unitPrice * newQty
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (order: OrderReceipt) => {
    setIsCartOpen(false);
    setActiveOrder(order);
  };

  // --- Table & Reservation Actions ---
  const handleOpenBooking = (initialData?: {
    date: string;
    time: string;
    mealPeriod: MealPeriod;
    partySize: number;
    zoneId: ZoneId;
    tableId: string;
  }) => {
    setBookingInitialData(initialData);
    setIsBookingModalOpen(true);
  };

  const handleConfirmReservation = (newRes: Reservation) => {
    setReservations(prev => [newRes, ...prev]);

    // Update table status
    setTables(prev => prev.map(tbl => {
      if (tbl.id === newRes.tableId) {
        return {
          ...tbl,
          status: 'reserved',
          currentReservationId: newRes.id
        };
      }
      return tbl;
    }));

    setSuccessReservation(newRes);
    showToast(`Reservation ${newRes.confirmationCode} confirmed!`);
  };

  const handleCancelReservation = (reservationId: string) => {
    const target = reservations.find(r => r.id === reservationId);
    if (!target) return;

    // Mark reservation as cancelled
    setReservations(prev => prev.map(r => 
      r.id === reservationId ? { ...r, status: 'cancelled' } : r
    ));

    // Release table back to available
    if (target.tableId) {
      setTables(prev => prev.map(tbl => 
        tbl.id === target.tableId ? { ...tbl, status: 'available', currentReservationId: undefined } : tbl
      ));
    }

    showToast(`Reservation ${target.confirmationCode} cancelled.`);
  };

  const handleUpdateTableStatus = (tableId: string, status: TableStatus) => {
    setTables(prev => prev.map(tbl => 
      tbl.id === tableId ? { ...tbl, status } : tbl
    ));
    showToast(`Table status updated.`);
  };

  const handleSeatReservation = (reservationId: string, tableId: string) => {
    setReservations(prev => prev.map(r => 
      r.id === reservationId ? { ...r, status: 'seated' } : r
    ));
    setTables(prev => prev.map(t => 
      t.id === tableId ? { ...t, status: 'occupied' } : t
    ));
    showToast(`Guest seated successfully.`);
  };

  const handleAddWalkIn = (guestName: string, partySize: number, tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    const code = 'WI-' + Math.floor(1000 + Math.random() * 9000);
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const newRes: Reservation = {
      id: 'res-walkin-' + Date.now(),
      confirmationCode: code,
      guestName,
      guestEmail: 'walkin@velvetandstone.cafe',
      guestPhone: 'Walk-In',
      date: today,
      time: currentTime,
      mealPeriod: 'brunch',
      partySize,
      zoneId: table ? table.zone : 'bar',
      tableId,
      status: 'seated',
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [newRes, ...prev]);
    setTables(prev => prev.map(t => 
      t.id === tableId ? { ...t, status: 'occupied', currentReservationId: newRes.id } : t
    ));
    showToast(`Walk-in guest seated at Table ${table?.tableNumber}.`);
  };

  const totalCartCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#24211E] flex flex-col font-sans selection:bg-[#34261C] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#34261C] text-white px-4 py-3 rounded-xl shadow-lg border border-[#4A3728] text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Top Bar Contract (Wordmark - Links - Primary Action) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => handleOpenBooking()}
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onToggleHostMode={() => setIsHostMode(!isHostMode)}
        isHostMode={isHostMode}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onReserveClick={() => {
            const el = document.getElementById('reservations');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreMenuClick={() => {
            const el = document.getElementById('menu');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Online Menu Section */}
        <MenuSection
          onSelectItem={(item) => setSelectedMenuItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Table Reservation & Interactive Floor Plan Section */}
        <ReservationSection
          tables={tables}
          onOpenBookingModal={handleOpenBooking}
        />

        {/* Roastery Philosophy & 4 Spatial Ambiance Atmospheres */}
        <AmbianceStorySection />

        {/* Opening Hours, Location, Transit & FAQ */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onToggleHostMode={() => setIsHostMode(!isHostMode)}
        isHostMode={isHostMode}
      />

      {/* --- MODALS & DRAWERS --- */}

      {/* Menu Item Customization Modal */}
      <MenuItemModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Online Pre-Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Table Booking Form Modal */}
      <ReservationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        tables={tables}
        initialData={bookingInitialData}
        onConfirmReservation={handleConfirmReservation}
      />

      {/* Digital Pass / Confirmation Modal */}
      <ReservationSuccessModal
        reservation={successReservation}
        tables={tables}
        onClose={() => setSuccessReservation(null)}
        onViewMyBookings={() => {
          setSuccessReservation(null);
          setIsLookupModalOpen(true);
        }}
      />

      {/* Guest Reservations Lookup & Cancellation Modal */}
      <MyReservationsModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
        reservations={reservations}
        tables={tables}
        onCancelReservation={handleCancelReservation}
      />

      {/* Staff / Maître D' Host Stand Mode Dashboard */}
      <HostStandDashboard
        isOpen={isHostMode}
        onClose={() => setIsHostMode(false)}
        tables={tables}
        reservations={reservations}
        onUpdateTableStatus={handleUpdateTableStatus}
        onSeatReservation={handleSeatReservation}
        onAddWalkIn={handleAddWalkIn}
      />

      {/* Order Dispatched & Kitchen Tracker Modal */}
      <OrderReceiptModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
      />

    </div>
  );
}
