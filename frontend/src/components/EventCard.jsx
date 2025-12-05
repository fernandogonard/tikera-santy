import { Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaCalendar, FaUsers } from 'react-icons/fa'

export default function EventCard({ event }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <article className="card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.images?.[0] || '/placeholder-event.jpg'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {event.featured && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Destacado
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>{event.venueName || 'Ubicación por confirmar'}</span>
          </div>
          {event.nextDate && (
            <div className="flex items-center">
              <FaCalendar className="mr-2" />
              <span>{new Date(event.nextDate).toLocaleDateString('es-AR')}</span>
            </div>
          )}
          {event.capacity && (
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span>Capacidad: {event.capacity} personas</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-sm text-gray-500">Desde</span>
            <p className="text-2xl font-bold text-primary-600">
              {formatPrice(event.startPrice || 0)}
            </p>
          </div>
          <Link
            to={`/eventos/${event._id}`}
            className="btn btn-primary"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </article>
  )
}
