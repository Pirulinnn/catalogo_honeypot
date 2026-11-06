import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import {
  Scale,
  ShoppingBag,
  ShieldAlert,
  Copyright,
  Truck,
  RotateCcw,
  RefreshCw,
  Landmark,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Honey Pot Venezuela',
  description:
    'Términos y condiciones de uso del sitio web y condiciones de compra de productos apícolas en Agropecuaria Honey Pot C.A.',
  alternates: {
    canonical: '/terminos-y-condiciones',
  },
  openGraph: {
    title: 'Términos y Condiciones | Honey Pot',
    description:
      'Condiciones contractuales, reglas de uso, políticas de compra, envíos y devoluciones en Honey Pot Venezuela.',
    url: 'https://honeypotve.com/terminos-y-condiciones',
    siteName: 'Honey Pot Venezuela',
    locale: 'es_VE',
    type: 'website',
  },
};

export default function TerminosCondicionesPage() {
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
            <Scale size={14} className="text-amber-700" />
            <span>Marco Legal & Condiciones Contractuales</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Términos y Condiciones de Uso
          </h1>
          <p className="mt-3 text-sm text-stone-600">
            Última actualización: <span className="font-medium text-stone-800">{lastUpdated}</span>
          </p>
          <p className="mt-4 text-base text-stone-700 leading-relaxed">
            Te damos la bienvenida a <strong>Honey Pot</strong>. Los presentes Términos y Condiciones
            constituyen el acuerdo vinculante entre <strong>Agropecuaria Honey Pot C.A</strong> (titular
            de la plataforma web y del catálogo en línea) y cualquier persona que visite, navegue o
            realice compras a través de este sitio. Te recomendamos leerlos con atención antes de
            utilizar nuestros servicios.
          </p>
        </header>

        {/* Contenido en Secciones */}
        <div className="space-y-10 text-stone-800 leading-relaxed">
          {/* 1. Objeto del Sitio */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                1. Objeto del Sitio Web
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-3">
              Este sitio web opera como un catálogo digital e-commerce y canal oficial de pedidos de{' '}
              <strong>Agropecuaria Honey Pot C.A</strong> (RIF J-508633660).
            </p>
            <p className="text-sm sm:text-base text-stone-700">
              A través de la plataforma, los usuarios pueden consultar las características, beneficios,
              pesos y presentaciones de nuestros productos apícolas naturales (miel cruda 100% pura
              cosechada en Guanare, polen floral desecado y extracto de propóleo concentrado), armar un
              carrito de compra al detal o al mayor, y generar solicitudes de pedido para su despacho
              en Caracas o envíos a nivel nacional.
            </p>
          </section>

          {/* 2. Reglas de Conducta */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                2. Reglas de Conducta y Uso Permitido
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-4">
              Al hacer uso de nuestra plataforma, el usuario se compromete a actuar bajo los
              principios de buena fe, veracidad y estricto respeto a las leyes vigentes. Queda
              expresamente prohibido:
            </p>
            <ul className="space-y-3 text-sm sm:text-base text-stone-700">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>
                  <strong>Pedidos ficticios o fraudulentos:</strong> Generar órdenes falsas, utilizar
                  identidades de terceros sin autorización o suministrar números telefónicos o
                  direcciones erróneas deliberadamente.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>
                  <strong>Extracción no autorizada de datos (Scraping):</strong> Utilizar robots,
                  spiders, scrapers o cualquier mecanismo automatizado para recopilar precios,
                  imágenes, textos o catálogos sin consentimiento por escrito.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>
                  <strong>Ataques y vulneración técnica:</strong> Intentar alterar el código fuente,
                  sobrecargar los servidores (DoS/DDoS), inyectar malware o vulnerar los mecanismos de
                  seguridad de la web.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-600 font-bold shrink-0">✕</span>
                <span>
                  <strong>Uso indebido de la marca:</strong> Difamar, hacer publicidad no autorizada o
                  presentarse como distribuidor oficial sin el aval formal de la empresa.
                </span>
              </li>
            </ul>
          </section>

          {/* 3. Propiedad Intelectual */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Copyright className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                3. Propiedad Intelectual e Industrial
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-3">
              Todos los elementos que componen este sitio web son propiedad exclusiva de{' '}
              <strong>Agropecuaria Honey Pot C.A</strong> o de sus respectivos licenciantes, incluyendo
              de manera enunciativa mas no limitativa:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-stone-700 list-disc pl-5 mb-4">
              <li>El nombre comercial <strong>Honey Pot</strong>, isotipos, logotipos y lemas publicitarios.</li>
              <li>Fotografías originales de producto, gráficos, ilustraciones y empaques.</li>
              <li>Textos explicativos, recetas, artículos educativos y descripciones técnicas.</li>
              <li>Diseño de interfaz (UI), código fuente (HTML, React, CSS, TypeScript) y arquitectura de software.</li>
            </ul>
            <p className="text-xs sm:text-sm text-stone-600 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              Queda estrictamente prohibida la copia, reproducción, distribución, transmisión o
              modificación total o parcial de cualquiera de estos contenidos sin la autorización previa
              y por escrito de Agropecuaria Honey Pot C.A.
            </p>
          </section>

          {/* 4. Condiciones de Compra E-commerce */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                4. Condiciones Comerciales y de Compra
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-stone-700">
              {/* Precios e impuestos */}
              <div className="p-4 rounded-xl bg-white/90 border border-stone-200">
                <h3 className="font-bold text-stone-900 text-base mb-1.5">
                  A. Precios, Moneda y Tasa de Cambio
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Los precios exhibidos en el catálogo están expresados en dólares de los Estados Unidos
                  de América (USD) con carácter referencial. Conforme a la legislación bancaria y
                  fiscal venezolana, los pagos efectuados en moneda nacional (Bolívares - Bs.) se
                  calcularán rigurosamente a la tasa oficial del{' '}
                  <strong>Banco Central de Venezuela (BCV)</strong> vigente el día de la transacción o
                  emisión del pago.
                </p>
              </div>

              {/* Métodos de Pago */}
              <div className="p-4 rounded-xl bg-white/90 border border-stone-200">
                <h3 className="font-bold text-stone-900 text-base mb-1.5">
                  B. Métodos de Pago Habilitados
                </h3>
                <p className="text-stone-700 mb-2">Aceptamos las siguientes modalidades:</p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  <li><strong>Pago Móvil:</strong> En Bolívares a tasa oficial BCV.</li>
                  <li><strong>Transferencia Bancaria Nacional:</strong> Cuentas bancarias autorizadas en Bs.</li>
                  <li><strong>Efectivo:</strong> En divisas (USD en buen estado sin tachaduras ni roturas) o en Bolívares en mano al momento de la entrega presencial.</li>
                </ul>
              </div>

              {/* Políticas de Envío y Delivery */}
              <div className="p-4 rounded-xl bg-white/90 border border-stone-200">
                <h3 className="font-bold text-stone-900 text-base mb-1.5">
                  C. Políticas de Envío y Entrega
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-stone-700">
                  <li>
                    <strong>Área Metropolitana de Caracas:</strong> Despacho motorizado inmediato (sujeto
                    a disponibilidad) o programado (día y hora preferida por el comprador). La tienda
                    ofrece <strong>Delivery Gratis</strong> cuando el pedido supera el umbral promocional
                    establecido en la cesta de compra.
                  </li>
                  <li>
                    <strong>Envíos Nacionales:</strong> Despachamos a toda Venezuela a través de agencias
                    de encomienda aliadas (MRW, Zoom, Tealca o similares) con cobro a destino o tarifa
                    convenida previamente.
                  </li>
                  <li>
                    <strong>Recepción y Verificación:</strong> El cliente debe constatar en presencia del
                    repartidor que los frascos y recipientes se encuentren debidamente precintados y en
                    perfecto estado físico.
                  </li>
                </ul>
              </div>

              {/* Devoluciones y Reembolsos */}
              <div className="p-4 rounded-xl bg-white/90 border border-stone-200">
                <h3 className="font-bold text-stone-900 text-base mb-1.5">
                  D. Políticas de Garantía, Devolución y Reembolso
                </h3>
                <p className="text-stone-700 mb-3">
                  Dado que la miel pura, el polen floral y el propóleo son{' '}
                  <strong>productos alimenticios naturales de consumo humano y con precinto higiénico</strong>:
                </p>
                <div className="space-y-2 text-stone-600">
                  <p>
                    • <strong>Productos con precinto abierto:</strong> Por estrictas razones sanitarias
                    y de inocuidad alimentaria, no se aceptan devoluciones una vez que el precinto de
                    seguridad del envase haya sido retirado o violado por el usuario.
                  </p>
                  <p>
                    • <strong>Incidencias en transporte o daños:</strong> Si un producto llega roto, con
                    fugas o si hubo un error en la presentación despachada, el cliente deberá
                    notificarlo dentro de las primeras <strong>24 a 48 horas</strong> posteriores a la
                    recepción enviando fotografías de respaldo a nuestro WhatsApp de atención.
                  </p>
                  <p>
                    • <strong>Resolución:</strong> Verificado el reclamo, Agropecuaria Honey Pot C.A
                    procederá al reemplazo inmediato del producto sin costo adicional o al reembolso
                    total correspondiente por el mismo medio de pago utilizado.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Limitación de Responsabilidad */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                5. Exclusión y Limitación de Responsabilidad
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-3">
              Agropecuaria Honey Pot C.A procura mantener la máxima disponibilidad y exactitud en el
              sitio web, pero no asume responsabilidad en los siguientes supuestos:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-stone-700 list-disc pl-5">
              <li>
                Interrupciones temporales del servicio debidas a mantenimiento técnico, fallas en
                redes de telecomunicaciones o incidencias ajenas en la plataforma de WhatsApp.
              </li>
              <li>
                Inexactitudes en los tiempos de entrega causadas por condiciones climáticas extremas,
                tráfico atípico o demoras atribuibles a las empresas de encomienda nacional.
              </li>
              <li>
                <strong>Almacenamiento inadecuado por parte del usuario:</strong> La miel cruda 100%
                pura puede cristalizar de forma natural (garantía de pureza) y debe conservarse en un
                lugar fresco, seco y a temperatura ambiente, sin refrigeración. La empresa no responde
                por alteraciones derivadas del calor excesivo, humedad o exposición directa al sol
                después de la entrega.
              </li>
            </ul>
          </section>

          {/* 6. Modificaciones de los Términos */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                6. Modificación de los Presentes Términos
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700">
              Nos reservamos el derecho de modificar, actualizar o sustituir en cualquier momento los
              presentes Términos y Condiciones a fin de adecuarlos a cambios legislativos, operativos o
              comerciales. Cualquier modificación entrará en vigor inmediatamente tras su publicación
              en este sitio web. Se entenderá que el uso continuado de la plataforma implica la plena
              aceptación de los términos vigentes en cada momento.
            </p>
          </section>

          {/* 7. Ley Aplicable y Jurisdicción */}
          <section className="bg-stone-50/80 rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-rustic">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5 text-amber-800" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                7. Legislación Aplicable y Jurisdicción
              </h2>
            </div>
            <p className="text-sm sm:text-base text-stone-700 mb-3">
              Estos Términos y Condiciones se rigen e interpretan en su totalidad bajo las leyes de la{' '}
              <strong>República Bolivariana de Venezuela</strong>, con especial observancia del Código de
              Comercio, la Ley de Mensajes de Datos y Firmas Electrónicas, y la legislación aplicable en
              materia de protección al consumidor y usuario.
            </p>
            <p className="text-sm sm:text-base text-stone-700">
              Cualquier controversia, discrepancia o reclamación que no pueda ser resuelta de mutuo
              acuerdo y de buena fe a través de nuestros canales directos de atención será sometida a la
              jurisdicción exclusiva de los tribunales competentes de la República Bolivariana de
              Venezuela en la circunscripción judicial correspondiente.
            </p>
          </section>
        </div>

        {/* Pie de página de los términos */}
        <div className="mt-12 pt-8 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Agropecuaria Honey Pot C.A • RIF: J-508633660. Todos los
            derechos reservados.
          </p>
          <Link
            href="/politica-de-privacidad"
            className="text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2"
          >
            Ver Política de Privacidad
          </Link>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

