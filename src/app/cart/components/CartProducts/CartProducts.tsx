import useCartStore from '@/app/state/cart'
import React from 'react'
import ProductRow from '../Product/Product'
import styles from '../../styles/cart.module.css'
import { Button } from '@/app/components/Product/styled/Buttons'
import { useRouter } from 'next/navigation'

function CartProducts() {
  const router = useRouter()
  const { products } = useCartStore()
  return (
    <>
      {products.length > 0 ? (
        products.map((product) => <ProductRow key={product.id} {...product} />)
      ) : (
        <div className={styles.emptyCart}>
          <p>There are no products</p>
          <Button hashover onClick={() => router.push('/')}>
            Go to products
          </Button>
        </div>
      )}
    </>
  )
}

export default CartProducts
