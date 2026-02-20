import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string; // Composite ID: productId-size-frame
    productId: string;
    title: string;
    price: number;
    image: string;
    size: string;
    frame: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleCart: () => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (newItem) => set((state) => {
                const id = `${newItem.productId}-${newItem.size}-${newItem.frame}`;
                const existingItem = state.items.find(item => item.id === id);

                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.id === id
                                ? { ...item, quantity: item.quantity + newItem.quantity }
                                : item
                        ),
                        isOpen: true // Auto-open cart on add
                    };
                }

                return {
                    items: [...state.items, { ...newItem, id }],
                    isOpen: true
                };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter(item => item.id !== id)
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            })),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            clearCart: () => set({ items: [] })
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
        }
    )
);
