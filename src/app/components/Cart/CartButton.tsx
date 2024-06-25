'use client'
import useCartStore from '@/app/state/cart'
import styles from './styles/cart.module.css'
import Link from 'next/link'
import { Cart } from '@/app/icons/cart'

export default function CartButton() {
  const products = useCartStore((state) => state.products)
  const total = useCartStore((state) => state.total)
  const productsQuantity = products.reduce((acc, product) => acc + product.quantity, 0)
  return (
    <Link href="/cart" className={styles.cart} title="Go to cart">
      <div className={styles.iconContainer}>
        <Cart />
        <span data-testid="cart-quantity">{productsQuantity}</span>
      </div>
      <p>${total}</p>
    </Link>
  )
}
