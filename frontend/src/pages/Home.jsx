import { Link } from 'react-router-dom'
import { FaWater, FaSun, FaMusic, FaMap } from 'react-icons/fa'
import EventCard from '../components/EventCard'

export default function Home() {
  // Mock data - será reemplazado por API
  const featuredEvents = [
    {
      _id: '1',
      title: 'Aquópolis - Entrada General',
      venueName: 'Aquópolis Mar del Plata',
      images: ['/images/aquopolis.jpg'],
      startPrice: 12000,
      nextDate: '2025-12-15',
      capacity: 500,
      featured: true,
    },
    {
      _id: '2',
      title: 'Tour de Bares: 4 Bares + Bus',
      venueName: 'Centro de Mar del Plata',
      images: ['/images/tour-bares.jpg'],
      startPrice: 8500,
      nextDate: '2025-12-20',
      featured: true,
    },
    {
      _id: '3',
      title: 'Teatro Victoria: Humor & Magia',
      venueName: 'Teatro Victoria',
      images: ['/images/teatro.jpg'],
      startPrice: 6000,
      nextDate: '2025-12-18',
      featured: true,
    },
    {
      _id: '4',
      title: 'Aquasol - Entrada General',
      venueName: 'Aquasol Parque Acuático',
      images: ['/images/aquasol.jpg'],
      startPrice: 10500,
      nextDate: '2025-12-16',
      featured: true,
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[620px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-mdp.jpg)' }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Viví los mejores espectáculos y experiencias en Mar del Plata
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-medium">
              Comprá tus tickets para parques, shows y excursiones al mejor precio
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/eventos" className="btn btn-primary text-lg px-8 py-4">
                Comprar Tickets
              </Link>
              <Link to="/eventos" className="btn btn-secondary text-lg px-8 py-4 bg-white">
                Ver Actividades
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">¿Qué querés hacer hoy?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/parques" className="card p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <FaWater size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Parques Acuáticos</h3>
              <p className="text-gray-600 text-sm">Aquasol – Aquópolis</p>
            </Link>

            <Link to="/beach-clubs" className="card p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <FaSun size={32} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Beach Clubs</h3>
              <p className="text-gray-600 text-sm">Mirador Beach Club</p>
            </Link>

            <Link to="/teatro" className="card p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <FaMusic size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Teatro & Shows</h3>
              <p className="text-gray-600 text-sm">Teatro Victoria</p>
            </Link>

            <Link to="/excursiones" className="card p-8 text-center hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <FaMap size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excursiones</h3>
              <p className="text-gray-600 text-sm">City Tour – Sierra – Bares</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Eventos Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Entradas más vendidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/eventos" className="btn btn-primary text-lg">
              Ver Todos los Eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Enterate de nuevas experiencias y promociones</h2>
          <p className="text-lg mb-8">Suscribite y recibí ofertas exclusivas</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="input flex-grow text-gray-900"
              required
            />
            <button type="submit" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
