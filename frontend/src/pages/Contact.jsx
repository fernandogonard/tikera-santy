import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Contacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhone className="text-primary-600 mr-4" size={24} />
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <a href="tel:+5492235033585" className="text-gray-600 hover:text-primary-600">
                    +54 9 223 503-3585
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-primary-600 mr-4" size={24} />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:info@tikera.com.ar" className="text-gray-600 hover:text-primary-600">
                    info@tikera.com.ar
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-primary-600 mr-4 mt-1" size={24} />
                <div>
                  <p className="font-semibold">Ubicación</p>
                  <p className="text-gray-600">Mar del Plata, Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre</label>
                <input type="text" className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input type="email" className="input" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mensaje</label>
                <textarea className="input" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
