import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Database,
  Share2,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  FileText,
  AlertCircle,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Honey Pot Venezuela',
  description:
    'Conoce cómo Agropecuaria Honey Pot C.A protege tus datos personales, qué información recopilamos, cómo la usamos y cómo ejercer tus derechos de privacidad.',
  alternates: {
    canonical: '/politica-de-privacidad',
  },
  openGraph: {
    title: 'Política de Privacidad | Honey Pot',
    description:
      'Información transparente sobre el tratamiento y la protección de datos personales en Honey Pot.',
    url: 'https://honeypotve.com/politica-de-privacidad',
    siteName: 'Honey Pot Venezuela',
    locale: 'es_VE',
    type: 'website',
  },
};

export default function PoliticaPrivacidadPage() {
  const lastUpdated = '6 de Noviembre de 2026';

  return (
    <div className="min-h-screen bg-background honeycomb-bg flex flex-col justify-between">
      <Header />

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Botón Volver y Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-900/80 hover:text-amber-700 transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-600/20"
          >
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
          </Link>
        </div>

        {/* Encabezado Principal */}
        <header className="mb-12 border-b border-amber-900/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-800 text-xs font-semibold mb-4">
            <ShieldCheck size={14} className="text-amber-700" />
            <span>Protección de Datos & Transparencia</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="mt-3 text-sm text-stone-600">
            Última actualización: <span className="font-medium text-stone-800">{lastUpdated}</span>
          </p>
          <p className="mt-4 text-base text-stone-700 leading-relaxed">
            En <strong>Agropecuaria Honey Pot C.A</strong> valoramos y respetamos tu confianza. Esta
            Política de Privacidad describe de manera transparente qué datos recopilamos cuando
            utilizas nuestra plataforma web y catálogo digital, para qué fines los utilizamos, con
            quién se comparten y los derechos que te asisten sobre tu información personal.
          </p>
        </header>

        {/* Contenido en Secciones */}
        <div className="space-y-10 text-stone-800 leading-relaxed">
          {/* 1. Responsable */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                1. Identidad del Responsable del Tratamiento
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-4">
              El responsable de la recopilación, custodia y tratamiento de los datos personales
              suministrados a través de este sitio web es:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-white/80 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-500 block text-xs">Razón Social:</span>
                <strong className="text-stone-900">Agropecuaria Honey Pot C.A</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">Registro de Información Fiscal (RIF):</span>
                <strong className="text-stone-900 font-mono">J-508633660</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">Sede y Operaciones:</span>
                <span className="text-stone-800">
                  Guanare, Estado Portuguesa (Cosecha) • Caracas, Distrito Capital (Despacho)
                </span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">Canales de Contacto:</span>
                <span className="text-stone-800">
                  Correo:{' '}
                  <a
                    href="mailto:honeypot.ve@gmail.com"
                    className="text-amber-700 underline font-medium"
                  >
                    honeypot.ve@gmail.com
                  </a>
                  <br />
                  WhatsApp:{' '}
                  <a
                    href="https://wa.me/584127665595"
                    className="text-amber-700 underline font-medium"
                  >
                    +58 412 7665595
                  </a>
                </span>
              </div>
            </div>
          </section>

          {/* 2. Datos que se recaban */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                2. Qué Datos Personales Recabamos
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-4">
              Únicamente recabamos la información indispensable para procesar y entregar tus
              solicitudes de productos derivados de la colmena:
            </p>
            <ul className="space-y-3 text-sm sm:text-base text-stone-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-amber-600 mt-1 shrink-0" />
                <span>
                  <strong>Datos de identificación y contacto:</strong> Nombre completo, número de
                  cédula de identidad o RIF (para facturación y control de entrega) y número de
                  teléfono celular (preferiblemente con WhatsApp activo).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-amber-600 mt-1 shrink-0" />
                <span>
                  <strong>Datos de entrega y localización:</strong> Dirección detallada de
                  despacho, punto de referencia y coordenadas geográficas aproximadas que selecciones
                  en el mapa interactivo para facilitar la ruta del repartidor.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-amber-600 mt-1 shrink-0" />
                <span>
                  <strong>Detalles del pedido:</strong> Productos seleccionados, cantidades, tipo de
                  entrega solicitada (inmediata o programada), notas adicionales e indicación del
                  método de pago elegido (Pago Móvil, Transferencia o Efectivo).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-amber-600 mt-1 shrink-0" />
                <span>
                  <strong>Datos de navegación técnica:</strong> Dirección IP aproximada, tipo de
                  dispositivo y navegador, a fines de optimización y seguridad web.
                </span>
              </li>
            </ul>
            <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-amber-950">
              <AlertCircle size={18} className="text-amber-700 mt-0.5 shrink-0" />
              <p>
                <strong>Nota sobre datos financieros:</strong> En ningún momento solicitamos ni
                almacenamos números de tarjetas de crédito, claves bancarias o contraseñas
                financieras. Los pagos se liquidan de forma externa y directa por Pago Móvil,
                transferencia bancaria o en efectivo al recibir el pedido.
              </p>
            </div>
          </section>

          {/* 3. Cómo se obtienen */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                3. Cómo Obtenemos tus Datos
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-4">
              Tus datos personales se recopilan a través de las siguientes vías:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-white/90 border border-stone-200">
                <h3 className="font-bold text-stone-900 mb-2">Formulario de Checkout</h3>
                <p className="text-stone-600">
                  Completado directamente por ti en la sección de compra al definir tus datos de
                  contacto, ubicación y método de pago.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/90 border border-stone-200">
                <h3 className="font-bold text-stone-900 mb-2">Canal Directo de WhatsApp</h3>
                <p className="text-stone-600">
                  Al enviar la orden generada e interactuar con nuestro personal para coordinar o
                  confirmar la entrega de los productos.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/90 border border-stone-200">
                <h3 className="font-bold text-stone-900 mb-2">Cookies y Almacenamiento Local</h3>
                <p className="text-stone-600">
                  Utilizamos almacenamiento local del navegador (<code>localStorage</code>) para
                  mantener tu carrito de compras activo y recordar tus datos básicos en futuras
                  compras si así lo deseas.
                </p>
              </div>
            </div>
          </section>

          {/* 4. Para qué se usan */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                4. Finalidad del Tratamiento de los Datos
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-3">
              Tratamos tu información estrictamente para los siguientes propósitos:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base text-stone-700 list-disc pl-5">
              <li>
                <strong>Gestión y despacho de pedidos:</strong> Procesar tus compras de miel cruda,
                polen y propóleo, planificar la logística de delivery en Caracas o gestionar el
                envío nacional con agencias de encomienda.
              </li>
              <li>
                <strong>Atención y soporte al cliente:</strong> Responder dudas sobre propiedades de
                la miel, cristalización, dosificación, estado del despacho o resolver incidencias
                con tu orden.
              </li>
              <li>
                <strong>Verificación de transacciones:</strong> Cotejar referencias bancarias de Pago
                Móvil y transferencias en Bolívares conforme a la tasa oficial BCV.
              </li>
              <li>
                <strong>Seguridad y prevención del fraude:</strong> Proteger el catálogo contra
                ataques automatizados, spam o intentos maliciosos de saturación de pedidos.
              </li>
              <li>
                <strong>Mejora continua del servicio:</strong> Analizar de manera agregada y anónima
                las preferencias de consumo y el rendimiento del sitio web.
              </li>
            </ul>
          </section>

          {/* 5. Con quién se comparten */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                5. Destinatarios y Terceros con Quienes se Comparte la Información
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-4">
              <strong>Agropecuaria Honey Pot C.A no vende, no comercializa ni arrienda tus datos personales a terceros bajo ninguna circunstancia.</strong> Solo se transmiten aquellos datos necesarios para la prestación del servicio a los siguientes proveedores tecnológicos y logísticos:
            </p>
            <div className="space-y-3 text-sm text-stone-700">
              <div className="p-3.5 bg-white/80 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-0.5">WhatsApp / Meta Platforms Inc.:</strong>
                Canal de mensajería cifrada empleado para transmitir el resumen del pedido desde el
                navegador al equipo comercial de Honey Pot.
              </div>
              <div className="p-3.5 bg-white/80 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-0.5">Servicios de Cartografía (OpenStreetMap / Leaflet / Google Maps):</strong>
                Utilizados para renderizar el mapa interactivo y generar el enlace de coordenadas de
                tu dirección de entrega.
              </div>
              <div className="p-3.5 bg-white/80 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-0.5">Personal de Delivery y Agencias de Encomienda:</strong>
                Repartidores autorizados para el área de Caracas y empresas de encomienda nacional
                (MRW, Zoom, Tealca o afines) con el único objetivo de hacerte llegar los productos
                físicos.
              </div>
              <div className="p-3.5 bg-white/80 rounded-xl border border-stone-200">
                <strong className="text-stone-900 block mb-0.5">Infraestructura y Hosting Web:</strong>
                Servidores seguros con altos estándares de cifrado y disponibilidad técnica.
              </div>
            </div>
          </section>

          {/* 6. Derechos de los usuarios (ARCO) */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                6. Derechos del Usuario (Derechos ARCO)
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-4">
              Como titular de tus datos personales, tienes derecho a ejercer en todo momento tus
              derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
              <div className="p-3 bg-white/90 rounded-lg border border-stone-200">
                <strong className="text-amber-900 block mb-1">Acceso:</strong> Saber qué datos tuyos
                conservamos y con qué fin.
              </div>
              <div className="p-3 bg-white/90 rounded-lg border border-stone-200">
                <strong className="text-amber-900 block mb-1">Rectificación:</strong> Corregir o
                actualizar datos inexactos o incompletos.
              </div>
              <div className="p-3 bg-white/90 rounded-lg border border-stone-200">
                <strong className="text-amber-900 block mb-1">Cancelación / Supresión:</strong> Solicitar
                que borremos tus datos de contacto de nuestros registros.
              </div>
              <div className="p-3 bg-white/90 rounded-lg border border-stone-200">
                <strong className="text-amber-900 block mb-1">Oposición:</strong> Oponerte al uso de tus
                datos para finalidades específicas.
              </div>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-3">
              Para ejercer cualquiera de estos derechos, basta con enviar una solicitud con tu nombre
              y número de contacto a:
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <a
                href="mailto:honeypot.ve@gmail.com?subject=Solicitud%20de%20Derechos%20ARCO"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-900 hover:bg-amber-500/30 border border-amber-500/30 transition-colors"
              >
                <Mail size={16} />
                <span>honeypot.ve@gmail.com</span>
              </a>
              <a
                href="https://wa.me/584127665595?text=Hola,%20quisiera%20solicitar%20información%20sobre%20mis%20datos%20personales"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-900 hover:bg-emerald-500/25 border border-emerald-500/30 transition-colors"
              >
                <Phone size={16} />
                <span>WhatsApp: +58 412 7665595</span>
              </a>
            </div>
            <p className="text-xs text-stone-500 mt-3">
              Asimismo, puedes borrar en cualquier momento los datos guardados en tu propio
              navegador limpiando el almacenamiento local (LocalStorage / Caché) de tu dispositivo.
            </p>
          </section>

          {/* 7. Medidas de seguridad */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                7. Seguridad y Protección de la Información
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-3">
              Implementamos rigurosas medidas técnicas y administrativas para salvaguardar tu
              privacidad:
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base text-stone-700 list-disc pl-5">
              <li>
                <strong>Cifrado SSL / TLS (HTTPS):</strong> Todo el tráfico entre tu navegador y
                nuestra plataforma se transmite a través de conexiones seguras y encriptadas.
              </li>
              <li>
                <strong>Arquitectura descentralizada:</strong> No almacenamos listas abiertas de
                clientes en bases de datos vulnerables; tus datos de compra viajan directamente al
                canal de chat seguro de la empresa.
              </li>
              <li>
                <strong>Control de acceso estricto:</strong> Solo el personal debidamente autorizado
                responsable del embalaje y entrega de pedidos tiene acceso temporal a la información
                de despacho.
              </li>
            </ul>
          </section>
        </div>

        {/* Pie de página de la política */}
        <div className="mt-12 pt-8 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Agropecuaria Honey Pot C.A • RIF: J-508633660. Todos los
            derechos reservados.
          </p>
          <Link
            href="/terminos-y-condiciones"
            className="text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2"
          >
            Ver Términos y Condiciones de Uso
          </Link>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

