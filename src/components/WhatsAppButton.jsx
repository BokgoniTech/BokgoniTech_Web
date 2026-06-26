import Icon from './Icon'
import { whatsappLink } from '../lib/siteConfig'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Bokgoni Tech on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-[#05241a] shadow-glow transition-transform hover:scale-105"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
