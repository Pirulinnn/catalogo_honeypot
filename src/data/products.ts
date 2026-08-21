export type ProductCategory = 'miel' | 'colmena' | 'snacks' | 'mayor';

export interface Product {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    weight: string;
    image: string;
    images?: string[];
    description: string;
    origin: string;
    featured: boolean;
}

export const categories = [
    { id: 'all', label: 'Todos los productos' },
    { id: 'miel', label: 'Miel' },
    { id: 'colmena', label: 'Productos de la colmena' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'mayor', label: 'Al mayor' },
] as const;

export const products: Product[] = [
    // ==========================================
    // --- Categoría: Miel ---
    // ==========================================
    {
        id: 1,
        name: 'Miel Pura de Abeja',
        category: 'miel',
        price: 6.5,
        weight: '260g',
        image: '/assets/images/products/miel/miel_presentacion_260gr.png',
        description: 'Miel 100% pura y natural, extraída directamente de nuestras colmenas. Presentación compacta y práctica de 260g, ideal para el uso personal, viajes o degustaciones.',
        origin: 'Cosecha Artesanal',
        featured: false,
    },
    {
        id: 2,
        name: 'Miel Pura de Abeja',
        category: 'miel',
        price: 8.5,
        weight: '360g',
        image: '/assets/images/products/miel/miel_presentacion_360gr.png',
        description: 'Miel cruda sin filtrar ni pasteurizar con todo el aroma y propiedades bioactivas intactas. Tamaño mediano perfecto para acompañar desayunos e infusiones.',
        origin: 'Cosecha Artesanal',
        featured: false,
    },
    {
        id: 3,
        name: 'Miel Pura de Abeja',
        category: 'miel',
        price: 12,
        weight: '500g',
        image: '/assets/images/products/miel/miel_presentacion_500gr.png',
        description: 'Nuestra presentación estrella de 500g. Miel multifloral pura con consistencia perfecta, notas florales silvestres y alto contenido de enzimas y antioxidantes.',
        origin: 'Cosecha Artesanal',
        featured: true,
    },
    {
        id: 4,
        name: 'Miel Pura de Abeja',
        category: 'miel',
        price: 20,
        weight: '1kg',
        image: '/assets/images/products/miel/miel_presentacion_1kg.png',
        description: 'Frasco familiar de 1kg de miel 100% natural. Excelente rendimiento para repostería saludable, consumo diario familiar o endulzante gastronómico.',
        origin: 'Cosecha Artesanal',
        featured: true,
    },
    {
        id: 5,
        name: 'Miel Pura de Abeja',
        category: 'miel',
        price: 26.5,
        weight: '1.45kg',
        image: '/assets/images/products/miel/miel_presentacion_1.45kg.PNG',
        description: 'Presentación grande de 1.45kg para verdaderos amantes de la miel. Cosechada de forma sostenible, garantizando la máxima pureza y densidad nutricional.',
        origin: 'Cosecha Artesanal',
        featured: false,
    },

    // ==========================================
    // --- Categoría: Productos de la colmena ---
    // ==========================================
    {
        id: 6,
        name: 'Polen Floral Deshidratado',
        category: 'colmena',
        price: 15,
        weight: '125g',
        image: '/assets/images/products/productos_de_la_colmena/polen_presentacion_125gr.png',
        description: 'Granos de polen floral multifloral deshidratados a baja temperatura para preservar nutrientes. Superalimento rico en proteínas completas, vitaminas B y minerales.',
        origin: 'Cosecha Artesanal',
        featured: false,
    },
    {
        id: 7,
        name: 'Extracto de Propóleo al 30% en Gotero',
        category: 'colmena',
        price: 15,
        weight: '30ml',
        image: '/assets/images/products/productos_de_la_colmena/propoleoAl30__30ml_gotero.png',
        description: 'Tintura pura de propóleo concentrado al 30% en formato gotero. Reconocido antibiótico y antiviral natural que fortalece las defensas y protege las vías respiratorias.',
        origin: 'Cosecha Artesanal',
        featured: true,
    },
    {
        id: 8,
        name: 'Extracto de Propóleo al 30% en Spray',
        category: 'colmena',
        price: 15,
        weight: '30ml',
        image: '/assets/images/products/productos_de_la_colmena/propoleoAl30__30ml_spray.png',
        description: 'Propóleo concentrado al 30% con aplicador bucal en spray. Brinda alivio directo e inmediato a la irritación de garganta y actúa como escudo antiséptico natural.',
        origin: 'Cosecha Artesanal',
        featured: false,
    },

    // ==========================================
    // --- Categoría: Al mayor ---
    // ==========================================
    {
        id: 9,
        name: 'Miel Pura de Abeja',
        category: 'mayor',
        price: 55,
        weight: 'Caja x12 (260g c/u)',
        image: '/assets/images/products/al_mayor/miel_presentacion_260gr.jpeg',
        description: 'Caja con 12 frascos de miel pura de 260g. Empaque ideal para tiendas delicatessen, souvenirs y distribución minorista.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 10,
        name: 'Miel Pura de Abeja',
        category: 'mayor',
        price: 75,
        weight: 'Caja x12 (360g c/u)',
        image: '/assets/images/products/al_mayor/miel_presentacion_360gr.jpeg',
        description: 'Pack mayorista de 12 unidades de 360g con precio preferencial. Excelente margen comercial para comercios y distribuidores.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 11,
        name: 'Miel Pura de Abeja',
        category: 'mayor',
        price: 225,
        weight: 'Caja x24 (500g c/u)',
        image: '/assets/images/products/al_mayor/miel_presentacion_500gr.jpeg',
        description: 'Lote de 24 frascos de nuestra presentación más vendida de 500g. Alta rotación y presentación atractiva para anaquel.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 12,
        name: 'Miel Pura de Abeja',
        category: 'mayor',
        price: 175,
        weight: 'Caja x12 (1kg c/u)',
        image: '/assets/images/products/al_mayor/miel_presentacion_1kg.jpeg',
        description: 'Caja de 12 unidades de miel pura de 1kg. Miel de origen certificado con trazabilidad y óptima calidad garantizada.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 13,
        name: 'Miel Pura de Abeja',
        category: 'mayor',
        price: 75,
        weight: 'Caja x4 (1.45kg c/u)',
        image: '/assets/images/products/al_mayor/miel_presentacion_1.45kg.jpeg',
        description: 'Caja mayorista de 4 unidades de 1.45kg. Diseñado para consumidores recurrentes o venta en tiendas naturistas.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 14,
        name: 'Miel Pura de Abeja en Galón',
        category: 'mayor',
        price: 70,
        weight: '7 kg',
        image: '/assets/images/products/al_mayor/miel_presentacion_7kg.png',
        description: 'Galón gastronómico de 7kg de miel pura multifloral. Ideal para panaderías, cafeterías, pastelerías artesanales y restaurantes.',
        origin: 'Distribución Mayorista',
        featured: true,
    },
    {
        id: 15,
        name: 'Cubeta de Miel Pura de Abeja',
        category: 'mayor',
        price: 220,
        weight: '25 kg',
        image: '/assets/images/products/al_mayor/miel_presentacion_25kg.png',
        description: 'Cubeta alimentaria de grado industrial de 25kg con precinto hermético de seguridad. Máxima pureza para cervecerías artesanales y laboratorios.',
        origin: 'Distribución Mayorista',
        featured: true,
    },
    {
        id: 16,
        name: 'Polen Floral Deshidratado',
        category: 'mayor',
        price: 125,
        weight: 'Caja x12 (125g c/u)',
        image: '/assets/images/products/al_mayor/polen_presentacion_125gr.jpeg',
        description: 'Caja de 12 frascos de polen floral de 125g. Producto de gran demanda en tiendas naturistas y nutricionales.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 17,
        name: 'Polen Floral Deshidratado',
        category: 'mayor',
        price: 38.5,
        weight: '500g',
        image: '/assets/images/products/al_mayor/polen_presentacion_500gr.png',
        description: 'Polen floral multifloral puro en presentación de 500g al por mayor. Excelente calidad y pureza para distribuidores y tiendas de salud.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 18,
        name: 'Polen Floral Deshidratado',
        category: 'mayor',
        price: 75,
        weight: '1kg',
        image: '/assets/images/products/al_mayor/polen_presentacion_1kg.png',
        description: 'Presentación de 1kg de polen apícola puro al por mayor. Máximo rendimiento para fraccionamiento o reventa comercial.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 19,
        name: 'Propóleo al 30% Gotero 30ml',
        category: 'mayor',
        price: 125,
        weight: 'Caja x12 (30ml c/u)',
        image: '/assets/images/products/al_mayor/propoleoAl30__30ml_gotero.jpeg',
        description: 'Pack de 12 unidades de tintura de propóleo al 30% en gotero. Excelente producto estacional y preventivo.',
        origin: 'Distribución Mayorista',
        featured: false,
    },
    {
        id: 20,
        name: 'Propóleo al 30% Spray 30ml',
        category: 'mayor',
        price: 125,
        weight: 'Caja x12 (30ml c/u)',
        image: '/assets/images/products/al_mayor/propoleoAl30__30ml_spray.jpeg',
        description: 'Caja de 12 aplicadores spray de propóleo concentrado al 30%. Alta aceptación en farmacias y herbolarios.',
        origin: 'Distribución Mayorista',
        featured: false,
    },

    // ==========================================
    // --- Categoría: Snacks ---
    // (Actualmente vacía - Próximamente nuevos productos)
    // ==========================================
];