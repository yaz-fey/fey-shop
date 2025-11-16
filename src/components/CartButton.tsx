import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { Link } from 'react-router-dom'

export default function CartButton() {
  const items = useSelector((s: RootState) => s.cart.items)
  const totalCount = items.reduce((s, i) => s + i.quantity, 0)
  return (
    <div className="">
      <Link to="/cart" className="bg-white border px-3 py-2 rounded-full shadow flex items-center gap-2">
        🛒
        <span>{totalCount}</span>
      </Link>
    </div>
  )
}
