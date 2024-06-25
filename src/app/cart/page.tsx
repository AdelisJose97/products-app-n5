'use client'
import useCartStore from '../state/cart'
import styles from './styles/cart.module.css'
import Total from './components/Total/Total'
import CartProducts from './components/CartProducts/CartProducts'
import ClearCart from './components/ClearCart/ClearCart'

export default function Cart() {
  const { products } = useCartStore()
  const productsQuantity = products.reduce((acc, product) => acc + product.quantity, 0)

  return (
    <div className={styles.cartContainer}>
      <h2>
        Cart <span>({productsQuantity} products)</span>
      </h2>
      <div className={styles.cartDetails}>
        <section className={styles.cartProducts}>
          {products.length > 0 && <ClearCart />}
          <CartProducts />
        </section>
        <section className={styles.cartResumeSection}>
          <Total />
        </section>
      </div>
    </div>
  )
}
