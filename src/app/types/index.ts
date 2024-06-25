export type IProductId = string | number | `${string}-${string}-${string}-${string}-${string}`
export interface IProduct {
  name: string
  price: number
  amount: number
  id: IProductId
}

export interface IProductsResponse {
  products: IProduct[]
}

export interface ISrc {
  original: string
  large2x: string
  large: string
  medium: string
  small: string
  portrait: string
  landscape: string
  tiny: string
}

export interface IPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: ISrc
  liked: boolean
  alt: string
}

export interface IPexelResponse {
  page: number
  per_page: number
  photos: IPhoto[]
  total_results: number
  next_page: string
}

export interface ICartProduct extends IProduct {
  quantity: number
}

export interface ICartState {
  products: ICartProduct[]
  total: number
  addProduct: (product: ICartProduct) => void
  deleteProduct: (product: ICartProduct) => void
  updateProductQuantity: (productId: IProductId, quantity: number) => void
  calculateTotal: () => void
  initCart: () => void
  saveCart: () => void
  manageCart: (product: ICartProduct, action: 'add' | 'remove') => void
  clearCart: () => void
}

export interface IProductsStore {
  products: IProduct[]
  fetchProducts: () => void
  purchase: (products: ICartProduct[]) => void
  addProducts: (products: IProduct[]) => void
  addProduct: (product: IProduct) => void
}
