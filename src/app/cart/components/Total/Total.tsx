'use client'
import { Button } from '@/app/components/Product/styled/Buttons'
import styles from './styles/total.module.css'
import useAppStore from '@/app/state/app'
import useCartStore from '@/app/state/cart'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Total() {
  const router = useRouter()
  const { purchase } = useAppStore()
  const { products, initCart, total, clearCart } = useCartStore()
  const deliveryCost = products?.length > 0 ? 100 : 0
  const taxes = total * 0.12
  const finalTotal = products?.length ? total + deliveryCost + taxes : 0
  const productsQuantity = products.reduce((acc, product) => acc + product.quantity, 0)

  const finalizePurchase = () => {
    if (products.length === 0) {
      alert('No hay productos en el carrito')
      return
    }
    purchase(products)
    clearCart()

    router.push('/')
  }

  useEffect(() => {
    initCart()
  }, [])
  return (
    <div className={styles.cartResume}>
      <div className={styles.cartResumeAction}>
        <Button fullWidth hashover onClick={finalizePurchase} disabled={products?.length === 0}>
          Continue to checkout
        </Button>
      </div>

      <div className={styles.cartResumeDetails}>
        <div className={styles.cartResumeRow}>
          <p>
            Subtotal <span>({productsQuantity} productos)</span>{' '}
          </p>
          <span>${total}</span>
        </div>

        <div className={styles.cartResumeRow}>
          <p>Shipping</p>
          <span>${deliveryCost}</span>
        </div>

        <div className={styles.cartResumeRow}>
          <p>Taxes</p>
          <span>${taxes}</span>
        </div>
      </div>

      <div className={styles.cartResumeTotal}>
        <div className={styles.cartResumeRow}>
          <p>Estimated total</p>
          <span>${finalTotal}</span>
        </div>
      </div>
    </div>
  )
}
