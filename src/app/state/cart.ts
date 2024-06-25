import { create } from 'zustand'
import { ICartProduct, ICartState, IProductId } from '../types'
import { devtools } from 'zustand/middleware'

const INITIAL_STATE = {
  products: [],
  total: 0,
}

const useCartStore = create<ICartState>()(
  devtools((set, get) => ({
    ...INITIAL_STATE,
    initCart: () => {
      const { calculateTotal } = get()
      const rawProducts = localStorage.getItem('cart')
      if (rawProducts) {
        const products = JSON.parse(rawProducts)
        set({ products })
      }
      calculateTotal()
    },
    addProduct: (product: ICartProduct) => {
      const { saveCart, products } = get()
      const existingProduct = products.some((cartProduct) => cartProduct.id === product.id)
      if (existingProduct) {
        alert('Error, this products exists in cart')
        return
      }
      set((state) => ({
        products: [...state.products, product],
        total: state.total + product.price,
      }))
      saveCart()
    },
    manageCart: (product: ICartProduct, action: 'add' | 'remove') => {
      const { calculateTotal, saveCart } = get()
      let qty = product.quantity
      if (action === 'add') {
        qty += 1
      }
      if (action === 'remove') {
        qty -= 1
      }

      if (qty === 0) {
        set((state) => ({
          products: state.products.filter((stateProduct) => stateProduct.id !== product.id),
        }))
      } else {
        set((state) => ({
          products: state.products.map((stateProduct) => {
            if (stateProduct.id === product.id) {
              return {
                ...product,
                quantity: qty,
              }
            }
            return stateProduct
          }),
        }))
      }
      calculateTotal()
      saveCart()
    },
    deleteProduct: (product: ICartProduct) => {
      const { saveCart } = get()
      set((state) => ({
        products: state.products.filter((stateProduct) => stateProduct.id !== product.id),
        total: state.total - product.price,
      }))
      saveCart()
    },
    updateProductQuantity: (productId: IProductId, quantity: number) => {
      const { products, calculateTotal, saveCart } = get()
      if (quantity > 0) {
        const newProducts = products.map((stateProduct) => {
          if (stateProduct.id === productId) {
            return {
              ...stateProduct,
              quantity,
            }
          }
          return stateProduct
        })

        set({
          products: newProducts,
        })
        calculateTotal()
        saveCart()
      }
    },
    calculateTotal: () => {
      const { products } = get()
      const newTotal = products.reduce((acc, product) => acc + product.quantity * product.price, 0)
      set({
        total: newTotal,
      })
    },
    saveCart: () => {
      const { products } = get()
      localStorage.setItem('cart', JSON.stringify(products))
    },
    clearCart: () => {
      set({
        products: [],
        total: 0,
      })
      localStorage.removeItem('cart')
    },
  })),
)
export default useCartStore
