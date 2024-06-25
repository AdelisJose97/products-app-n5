'use client'
import { useEffect } from 'react'
import styles from '../../styles/page.module.css'
import useAppStore from '@/app/state/app'
import useCartStore from '@/app/state/cart'
import Product from '../Product/Product'

export default function ProductList() {
  const fetchProducts = useAppStore((store) => store.fetchProducts)
  const initCart = useCartStore((store) => store.initCart)
  const products = useAppStore((store) => store.products)

  useEffect(() => {
    fetchProducts()
    initCart()
  }, [])

  return (
    <div className={styles.prodctList}>
      {products.map((product) => {
        return <Product key={product.id} {...product} />
      })}
    </div>
  )
}
