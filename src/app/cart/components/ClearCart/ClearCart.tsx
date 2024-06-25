import useCartStore from '@/app/state/cart'
import styles from '../../styles/cart.module.css'

function ClearCart() {
  const { clearCart } = useCartStore()
  return (
    <button onClick={clearCart} className={styles.clear}>
      Clear
    </button>
  )
}

export default ClearCart
