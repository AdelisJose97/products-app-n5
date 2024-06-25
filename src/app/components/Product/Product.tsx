import { useEffect, useState } from 'react'
import { IProduct } from '../../types'
import styles from './styles/product.module.css'
import { Button, QuantityButton } from './styled/Buttons'
import useCartStore from '@/app/state/cart'
import { Quantities } from './styled/Quantities'
import Plus from '@/app/icons/plus'
import Minus from '@/app/icons/minus'

const TO_INCREMENT = 'increment'
const TO_DECREMENT = 'decrement'
export default function Product({ name, amount, price, id }: IProduct) {
  const MIN_QUANTITY = 1
  const [showQuantity, setShowQuantity] = useState(false)
  const [pQuantity, setPQuantity] = useState(0)
  const { addProduct, deleteProduct, updateProductQuantity, products } = useCartStore()
  const countLeft = amount - pQuantity
  const maxQuantity = pQuantity === amount
  const productAvailable = countLeft > 0

  const handleAddProduct = () => {
    if (productAvailable) {
      const productToCart = {
        name,
        amount,
        price,
        id,
        quantity: pQuantity + 1,
      }
      setPQuantity((prev) => prev + 1)
      addProduct(productToCart)
      setShowQuantity(true)
    }
  }

  const handleChangeQuantity = (action: string) => {
    if (action === TO_INCREMENT) {
      if (pQuantity < amount) {
        setPQuantity((prev) => prev + 1)
        updateProductQuantity(id, pQuantity + 1)
      }
    }
    if (action === TO_DECREMENT) {
      if (pQuantity > 0) {
        setPQuantity((prev) => prev - 1)
        updateProductQuantity(id, pQuantity - 1)
      }

      if (pQuantity === MIN_QUANTITY) {
        const productToCart = {
          name,
          amount,
          price,
          id,
          quantity: pQuantity,
        }
        setShowQuantity(false)
        deleteProduct(productToCart)
      }
    }
  }

  useEffect(() => {
    const productFromCart = products.find((product) => product.id === id)
    if (productFromCart) {
      setPQuantity(productFromCart.quantity)
      setShowQuantity(true)
    }
  }, [products, id])

  return (
    <div className={styles.container}>
      <span>$ {price}</span>
      <h3>{name}</h3>
      <p>{productAvailable ? `Available: ${countLeft}` : 'Not available'}</p>
      {!showQuantity ? (
        <Button
          hashover
          disabled={!productAvailable}
          data-testid={`cart-add-${id}`}
          onClick={() => {
            handleAddProduct()
          }}
        >
          <div className={styles.quantityContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            <span>Add</span>
          </div>
        </Button>
      ) : (
        <Quantities>
          <QuantityButton
            hashover
            data-testid={`minus-${id}`}
            onClick={(e) => {
              handleChangeQuantity(TO_DECREMENT)
            }}
          >
            <Minus />
          </QuantityButton>
          <span className={styles.quantity}>{pQuantity}</span>
          <QuantityButton
            hashover
            data-testid={`plus-${id}`}
            disabled={maxQuantity}
            onClick={(e) => {
              e.stopPropagation()
              handleChangeQuantity(TO_INCREMENT)
            }}
          >
            <Plus />
          </QuantityButton>
        </Quantities>
      )}
    </div>
  )
}
