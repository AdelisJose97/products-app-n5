import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import data from './data/data.json'
import Product from '../components/Product/Product'

test('renders product list', () => {
  data.products.forEach((product) => {
    render(<Product {...product} />)
    expect(screen.getByText(product.name)).toBeInTheDocument()
  })
})
