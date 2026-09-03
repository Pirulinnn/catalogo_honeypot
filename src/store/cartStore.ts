import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const FREE_DELIVERY_THRESHOLD = 20.0;
export const DEFAULT_DELIVERY_FEE = 3.0;

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight: string;
}

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  deliveryMethod: DeliveryMethod;

  // Acciones
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;

  // Getters / Cálculos derivados seguros
  getTotalItems: () => number;
  getTotalPrice: () => number; // Subtotal por retrocompatibilidad
  getSubtotal: () => number;
  getIsFreeDelivery: () => boolean;
  getAmountForFreeDelivery: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

// Selectores derivados reactivos seguros contra null/undefined
export const selectSubtotal = (state?: CartState): number =>
  (state?.items || []).reduce(
    (sum, i) => sum + (Number(i?.price) || 0) * (Number(i?.quantity) || 0),
    0
  );

export const selectIsFreeDelivery = (state?: CartState): boolean =>
  selectSubtotal(state) >= FREE_DELIVERY_THRESHOLD;

export const selectAmountForFreeDelivery = (state?: CartState): number =>
  Math.max(0, Number((FREE_DELIVERY_THRESHOLD - selectSubtotal(state)).toFixed(2)));

export const selectDeliveryFee = (state?: CartState): number => {
  return 0;
};

export const selectTotal = (state?: CartState): number =>
  Number(selectSubtotal(state).toFixed(2));

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      deliveryMethod: 'delivery',

      addItem: (item) => {
        const currentItems = get()?.items || [];
        const existing = currentItems.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
          });
        }
        set({ isOpen: true });
      },

      removeItem: (id) => {
        set({
          items: (get()?.items || []).filter((i) => i.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: (get()?.items || []).map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method || 'delivery' }),

      getTotalItems: () =>
        (get()?.items || []).reduce((sum, i) => sum + (Number(i?.quantity) || 0), 0),

      getSubtotal: () => selectSubtotal(get()),

      getTotalPrice: () => get().getSubtotal(),

      getIsFreeDelivery: () => selectIsFreeDelivery(get()),

      getAmountForFreeDelivery: () => selectAmountForFreeDelivery(get()),

      getDeliveryFee: () => selectDeliveryFee(get()),

      getTotal: () => selectTotal(get()),
    }),
    {
      name: 'honeypot-cart',
      partialize: (state) => ({
        items: state.items || [],
        deliveryMethod: state.deliveryMethod || 'delivery',
      }),
    }
  )
);
