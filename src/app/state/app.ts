import { create } from 'zustand'
import { ICartProduct, IProduct, IProductsResponse, IProductsStore } from '../types'
import { devtools } from 'zustand/middleware'

const INITIAL_STATE = {
  products: [],
}

const useAppStore = create<IProductsStore>()(
  devtools((set, get) => ({
    ...INITIAL_STATE,
    fetchProducts: async () => {
      let tempProducts: IProduct[] = []
      const localProducts = localStorage.getItem('products')
      if (!localProducts) {
        const response = await fetch('/api/data')
        const responseJson: IProductsResponse = await response.json()
        const { products = [] } = responseJson
        localStorage.setItem('products', JSON.stringify(products))
        tempProducts = products
      } else {
        tempProducts = JSON.parse(localProducts)
      }
      set({
        products: [...tempProducts],
      })
    },
    addProducts: (products: IProduct[]) => {
      set({
        products: [...products],
      })
    },
    addProduct: (product: IProduct) => {
      const { products } = get()
      const localProducts = localStorage.getItem('products')
      if (localProducts) {
        const parsedProduct = JSON.parse(localProducts)
        const newProducts = [...parsedProduct, product]
        localStorage.setItem('products', JSON.stringify(newProducts))
        set({
          products: [...products, product],
        })
      }
    },
    purchase: (products: ICartProduct[]) => {
      const localProducts = get().products
      if (localProducts.length === 0) {
        return
      }
      const newProducts = localProducts.map((product: IProduct) => {
        const productInCart = products.find((p) => p.id === product.id)
        if (productInCart) {
          return {
            ...product,
            amount: product.amount - productInCart.quantity,
          }
        }
        return product
      })
      localStorage.setItem('products', JSON.stringify(newProducts))
      set({
        products: [...newProducts],
      })
    },
  })),
)
export default useAppStore
