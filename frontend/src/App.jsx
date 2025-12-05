import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Parques from './pages/Parques'
import Teatro from './pages/Teatro'
import Excursiones from './pages/Excursiones'
import BeachClubs from './pages/BeachClubs'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="eventos" element={<Events />} />
        <Route path="eventos/:id" element={<EventDetail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="confirmacion/:orderId" element={<Confirmation />} />
        <Route path="parques" element={<Parques />} />
        <Route path="teatro" element={<Teatro />} />
        <Route path="excursiones" element={<Excursiones />} />
        <Route path="beach-clubs" element={<BeachClubs />} />
        <Route path="contacto" element={<Contact />} />
      </Route>
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  )
}

export default App
