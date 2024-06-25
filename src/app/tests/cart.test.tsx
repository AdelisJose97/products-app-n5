import { fireEvent, render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Product from '../components/Product/Product'
import CartButton from '../components/Cart/CartButton'
import useCartStore from '@/app/state/cart'
import Total from '../cart/components/Total/Total'
import { useRouter } from 'next/navigation'
import CartProducts from '../cart/components/CartProducts/CartProducts'
import ClearCart from '../cart/components/ClearCart/ClearCart'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Cart tests', () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })
  })
  afterEach(() => {
    cleanup()
    useCartStore.getState().clearCart()
  })
  test('add product to cart', () => {
    const product = {
      name: 'Pringles',
      amount: 20,
      price: 1500,
      id: 1,
    }
    const { getByTestId } = render(
      <>
        <Product {...product} />
        <CartButton />
      </>,
    )

    const button = getByTestId(`cart-add-${product.id}`)
    fireEvent.click(button)

    expect(button).not.toBeInTheDocument()
    expect(getByTestId(`minus-${product.id}`)).toBeInTheDocument()
    expect(getByTestId(`plus-${product.id}`)).toBeInTheDocument()
    expect(getByTestId('cart-quantity')).toHaveTextContent('1')
  })

  test('delete product from cart', () => {
    const product = {
      name: 'Pepsi',
      amount: 20,
      price: 1200,
      id: 2,
    }

    const { getByTestId } = render(
      <>
        <Product {...product} />
        <CartButton />
      </>,
    )

    const button = getByTestId(`cart-add-${product.id}`)
    fireEvent.click(button)

    expect(button).not.toBeInTheDocument()
    expect(getByTestId(`minus-${product.id}`)).toBeInTheDocument()
    expect(getByTestId(`plus-${product.id}`)).toBeInTheDocument()

    const quantityButton = getByTestId(`minus-${product.id}`)
    fireEvent.click(quantityButton)

    expect(getByTestId(`cart-add-${product.id}`)).toBeInTheDocument()
  })

  test('add product to cart and update quantity', () => {
    const product = {
      name: 'Pescado',
      amount: 20,
      price: 1500,
      id: 12,
    }

    const { getByTestId } = render(
      <>
        <Product {...product} />
        <CartButton />
      </>,
    )

    const addButton = getByTestId(`cart-add-${product.id}`)
    fireEvent.click(addButton)

    const incrementButton = getByTestId(`plus-${product.id}`)
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)

    expect(addButton).not.toBeInTheDocument()
    expect(getByTestId(`minus-${product.id}`)).toBeInTheDocument()
    expect(incrementButton).toBeInTheDocument()
    expect(getByTestId('cart-quantity')).toHaveTextContent('3')
  })

  test('add max product quantity', () => {
    const product = {
      name: 'Pescado',
      amount: 2,
      price: 1500,
      id: 12,
    }

    const { getByTestId } = render(
      <>
        <Product {...product} />
        <CartButton />
      </>,
    )

    const addButton = getByTestId(`cart-add-${product.id}`)
    fireEvent.click(addButton)

    const incrementButton = getByTestId(`plus-${product.id}`)
    expect(incrementButton).not.toHaveAttribute('disabled')

    fireEvent.click(incrementButton)
    expect(incrementButton).toHaveAttribute('disabled')

    fireEvent.click(incrementButton)
    expect(getByTestId('cart-quantity')).toHaveTextContent(String(product.amount))
  })

  test('display total cart', () => {
    const product = {
      name: 'Leche',
      amount: 20,
      price: 7500,
      id: 1,
    }
    const { getByText } = render(
      <>
        <CartProducts />
        <Total />
      </>,
    )

    const { getByTestId } = render(
      <>
        <Product {...product} />
      </>,
    )
    const button = getByTestId(`cart-add-${product.id}`)
    fireEvent.click(button)

    const finalTotal = product.price + 100 + product.price * 0.12

    expect(getByText('Continue to checkout')).toBeInTheDocument()
    expect(getByText('Continue to checkout')).not.toHaveAttribute('disabled')
    expect(getByText('Estimated total')).toBeInTheDocument()
    expect(getByText(new RegExp(`${finalTotal}`, 'i'))).toBeInTheDocument()
  })

  test('clear cart', () => {
    const product = {
      name: 'Leche',
      amount: 20,
      price: 7500,
      id: 1,
    }
    const { getByText } = render(
      <>
        <ClearCart />
        <CartProducts />
        <Total />
      </>,
    )

    const { getByTestId } = render(
      <>
        <Product {...product} />
      </>,
    )
    const button = getByTestId(`cart-add-${product.id}`)
    fireEvent.click(button)
    const clearButton = getByText('Clear')
    fireEvent.click(clearButton)
    expect(getByText('There are no products')).toBeInTheDocument()
    expect(getByText('Go to products')).toBeInTheDocument()
    expect(getByText('Continue to checkout')).toHaveAttribute('disabled')
  })
  test('make pucharse', () => {
    const product = {
      name: 'Leche',
      amount: 20,
      price: 7500,
      id: 1,
    }
    const { getByText } = render(
      <>
        <CartProducts />
        <Total />
      </>,
    )

    const { getByTestId } = render(
      <>
        <Product {...product} />
      </>,
    )
    const button = getByTestId(`cart-add-${product.id}`)
    fireEvent.click(button)

    const checkoutButton = getByText('Continue to checkout')
    fireEvent.click(checkoutButton)

    const router = useRouter()
    expect(router.push).toHaveBeenCalledWith('/')

    const updatedProduct = getByText('Leche')
    expect(updatedProduct).toBeInTheDocument()
    const updatedAmount = getByText(new RegExp(`Available: ${product.amount - 1}`, 'i'))
    expect(updatedAmount).toBeInTheDocument()
  })
})
