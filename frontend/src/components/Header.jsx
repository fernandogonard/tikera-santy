import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Tikera</span>
            <span className="ml-2 text-sm text-gray-500">Mar del Plata</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/parques" className="text-gray-700 hover:text-primary-600 font-medium">
              Parques
            </Link>
            <Link to="/beach-clubs" className="text-gray-700 hover:text-primary-600 font-medium">
              Beach Clubs
            </Link>
            <Link to="/teatro" className="text-gray-700 hover:text-primary-600 font-medium">
              Teatro
            </Link>
            <Link to="/excursiones" className="text-gray-700 hover:text-primary-600 font-medium">
              Excursiones
            </Link>
            <Link to="/eventos" className="text-gray-700 hover:text-primary-600 font-medium">
              Todos los Eventos
            </Link>
            <Link to="/contacto" className="text-gray-700 hover:text-primary-600 font-medium">
              Contacto
            </Link>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-700 hover:text-primary-600">
              <FaShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <Link to="/eventos" className="btn btn-primary">
              Comprar Tickets
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
