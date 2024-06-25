'use client'
import React, { useState } from 'react'
import AddProductForm from './components/AddProductForm/AddProductForm'
import styles from './styles/product.module.css'
import { Button } from '../components/Product/styled/Buttons'
import { useRouter } from 'next/navigation'

function Product() {
  const router = useRouter()
  const [created, setCreated] = useState(false)

  const handleCreated = (status: boolean) => {
    setCreated(status)
  }

  return (
    <div className={styles.container}>
      {!created ? (
        <AddProductForm handleCreated={handleCreated} />
      ) : (
        <div className={styles.createdContainer}>
          <h3>Successfully created product</h3>
          <Button onClick={() => setCreated(false)} hashover>
            Keep creating
          </Button>
          <span>or</span>
          <Button onClick={() => router.push('/')} hashover>
            Go to products
          </Button>
        </div>
      )}
    </div>
  )
}

export default Product
