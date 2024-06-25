import styles from '@/app/styles/page.module.css'
import CartButton from '../Cart/CartButton'
import Link from 'next/link'
import Plus from '@/app/icons/plus'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={'/'} title="Go to products">
        Inicio
      </Link>
      <Link href="/product" title="Go to create product">
        <Plus />
        Create product
      </Link>
      <CartButton />
    </header>
  )
}
