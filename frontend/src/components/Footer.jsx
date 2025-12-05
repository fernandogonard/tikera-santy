import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">Tikera</h3>
            <p className="text-sm mb-4">
              Tu plataforma de venta de tickets para eventos, parques, teatro y excursiones en Mar del Plata.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Eventos */}
          <div>
            <h4 className="text-white font-semibold mb-4">Eventos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/parques" className="hover:text-white">Parques Acuáticos</Link></li>
              <li><Link to="/beach-clubs" className="hover:text-white">Beach Clubs</Link></li>
              <li><Link to="/teatro" className="hover:text-white">Teatro & Shows</Link></li>
              <li><Link to="/excursiones" className="hover:text-white">Excursiones</Link></li>
              <li><Link to="/eventos" className="hover:text-white">Todos los Eventos</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/sobre-nosotros" className="hover:text-white">Sobre Nosotros</Link></li>
              <li><Link to="/preguntas-frecuentes" className="hover:text-white">Preguntas Frecuentes</Link></li>
              <li><Link to="/terminos" className="hover:text-white">Términos y Condiciones</Link></li>
              <li><Link to="/privacidad" className="hover:text-white">Política de Privacidad</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <a href="tel:+5492235033585" className="hover:text-white">+54 9 223 503-3585</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:info@tikera.com.ar" className="hover:text-white">info@tikera.com.ar</a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <span>Mar del Plata, Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 Tikera. Todos los derechos reservados.</p>
          <p className="mt-2 text-gray-500">Desarrollado con ❤️ para brindar la mejor experiencia</p>
        </div>
      </div>
    </footer>
  )
}
