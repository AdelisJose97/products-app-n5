import { ICartProduct } from '@/app/types'
import styles from './styles/product.module.css'
import useCartStore from '@/app/state/cart'
import { Quantities } from '@/app/components/Product/styled/Quantities'
import { QuantityButton } from '@/app/components/Product/styled/Buttons'
import Plus from '@/app/icons/plus'
import Minus from '@/app/icons/minus'

export default function ProductRow(product: ICartProduct) {
  const { name, amount, price, quantity } = product
  const { manageCart } = useCartStore()
  const countLeft = amount - quantity
  const canAdd = countLeft > 0

  return (
    <div className={styles.productCart}>
      <div className={styles.productDetail}>
        <p>{name}</p>
        <span>{canAdd ? `Available: ${countLeft}` : 'Not available'}</span>
      </div>
      <div className={styles.productTotal}>
        <p>${price * quantity}</p>
        <div>
          <Quantities secondary>
            <QuantityButton secondary hashover onClick={() => manageCart(product, 'remove')}>
              <Minus />
            </QuantityButton>
            {quantity}
            <QuantityButton
              secondary
              hashover
              onClick={() => manageCart(product, 'add')}
              disabled={!canAdd}
            >
              <Plus />
            </QuantityButton>
          </Quantities>
        </div>
      </div>
    </div>
  )
}
