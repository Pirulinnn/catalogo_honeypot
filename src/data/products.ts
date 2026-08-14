export interface Product {
    id: number;
    name: string;
    category: 'floral' | 'silvestre' | 'premium' | 'infusionada';
    price: number;
    originalPrice?: number;
    weight: string;
    purity: number;
    rating: number;
    reviewCount: number;
    image: string;
    images: string[];
    description: string;
    benefits: string[];
    origin: string;
    featured: boolean;
    badge?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: 'Miel Floral de Azahar',
        category: 'floral',
        price: 189,
        originalPrice: 220,
        weight: '500g',
        purity: 100,
        rating: 4.9,
        reviewCount: 128,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1859568ea-1786590105001.png",
        images: [
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
            "https://img.rocket.new/generatedImages/rocket_gen_img_1fa6f9f01-1786590066711.png",
            "https://img.rocket.new/generatedImages/rocket_gen_img_1aa765673-1772951392462.png"],

        description: 'Cosechada de flores de naranjo en plena floración primaveral. Su aroma delicado y sabor suave la hacen perfecta para endulzar tés, yogures y postres artesanales. Extraída en frío para preservar todas sus propiedades.',
        benefits: ['Antiinflamatoria natural', 'Rica en antioxidantes', 'Favorece el sueño reparador', 'Sin conservadores'],
        origin: 'Valle de Tehuacán, Puebla',
        featured: true,
        badge: 'Más vendida'
    },
    {
        id: 2,
        name: 'Miel Silvestre de Monte',
        category: 'silvestre',
        price: 245,
        weight: '500g',
        purity: 100,
        rating: 4.8,
        reviewCount: 94,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_15b8d6ab6-1786590105250.png",
        images: [
            'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80',
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
            "https://img.rocket.new/generatedImages/rocket_gen_img_1aa765673-1772951392462.png"],

        description: 'Recolectada de colmenas en bosques vírgenes de la Sierra Madre. Sabor robusto con notas terrosas y dulzor profundo. Ideal para acompañar quesos artesanales, carnes y platillos gourmet.',
        benefits: ['Alto poder antibacterial', 'Energizante natural', 'Fortalece el sistema inmune', 'Cero aditivos'],
        origin: 'Sierra Madre Occidental, Jalisco',
        featured: true
    },
    {
        id: 3,
        name: 'Miel Premium de Manuka',
        category: 'premium',
        price: 520,
        weight: '250g',
        purity: 100,
        rating: 5.0,
        reviewCount: 67,
        image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&q=80',
        images: [
            'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&q=80',
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80',
            'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80'],

        description: 'La joya de nuestra colección. Con índice MGO+300, esta miel de manuka tiene propiedades terapéuticas únicas. Certificada por laboratorios independientes. Recomendada por nutriólogos y médicos funcionales.',
        benefits: ['MGO+300 certificado', 'Propiedades antimicrobianas únicas', 'Cicatrización y regeneración', 'Certificada y analizada'],
        origin: 'Importada de Nueva Zelanda, empacada en México',
        featured: true,
        badge: 'Premium'
    },
    {
        id: 4,
        name: 'Miel Infusionada con Canela',
        category: 'infusionada',
        price: 215,
        weight: '350g',
        purity: 98,
        rating: 4.7,
        reviewCount: 83,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_13c3a7d2a-1786590106349.png",
        images: [
            'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80',
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'],

        description: 'Nuestra miel floral de azahar infusionada con canela de Ceilán orgánica. Una combinación ancestral con beneficios amplificados. Perfecta para el desayuno, para tés medicinales o para marinadas.',
        benefits: ['Regula el azúcar en sangre', 'Antifúngica potente', 'Digestiva y antiinflamatoria', 'Canela 100% orgánica'],
        origin: 'Valle de Tehuacán, Puebla',
        featured: false
    },
    {
        id: 5,
        name: 'Miel Floral Multifloral',
        category: 'floral',
        price: 165,
        weight: '500g',
        purity: 100,
        rating: 4.6,
        reviewCount: 112,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_18041c800-1786590107003.png",
        images: [
            'https://images.unsplash.com/photo-1476224203421-9ac39bcb3b27?w=600&q=80',
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'],

        description: 'Cosechada de praderas con más de 40 variedades de flores silvestres. Sabor complejo y aromático. La más versátil de nuestra colección, perfecta para hornear, endulzar y regalar.',
        benefits: ['Polifenoles variados', 'Energía sostenida', 'Apta para niños mayores de 1 año', 'Sin cristalización acelerada'],
        origin: 'Valles Centrales, Oaxaca',
        featured: false
    },
    {
        id: 6,
        name: 'Miel Infusionada con Jengibre',
        category: 'infusionada',
        price: 229,
        weight: '350g',
        purity: 98,
        rating: 4.8,
        reviewCount: 71,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bceda5e4-1786590106211.png",
        images: [
            'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&q=80',
            'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80'],

        description: 'Miel silvestre combinada con jengibre fresco orgánico. Potente aliada para el sistema inmune, ideal en temporada de frío o para preparar shots energizantes matutinos.',
        benefits: ['Antiinflamatoria y antiviral', 'Estimula la circulación', 'Digestiva y antiemética', 'Sin gluten ni lactosa'],
        origin: 'Sierra Madre Occidental, Jalisco',
        featured: false
    },
    {
        id: 7,
        name: 'Miel Silvestre de Catedral',
        category: 'silvestre',
        price: 285,
        weight: '500g',
        purity: 100,
        rating: 4.9,
        reviewCount: 45,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_15012c78b-1786590106414.png",
        images: [
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
            'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80'],

        description: 'Limitada a 200 frascos por cosecha. Proveniente de colmenas ubicadas en cañones de difícil acceso en la Barranca del Cobre. Sabor único, oscuro, con notas a madera y frutos secos.',
        benefits: ['Edición limitada', 'Poder antibacterial máximo', 'Trazabilidad completa de colmena', 'Recolección manual'],
        origin: 'Barranca del Cobre, Chihuahua',
        featured: false,
        badge: 'Edición Limitada'
    },
    {
        id: 8,
        name: 'Miel Premium Negra de Abeto',
        category: 'premium',
        price: 389,
        weight: '300g',
        purity: 100,
        rating: 4.7,
        reviewCount: 38,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_119397a96-1786590105393.png",
        images: [
            'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&q=80',
            'https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&q=80'],

        description: 'Miel de mielada producida por abejas que procesan la savia del abeto. Color oscuro intenso, sabor malteado y mineral. Considerada la más rica en minerales y oligoelementos de toda la gama.',
        benefits: ['Altísima concentración de minerales', 'Prebiótica y digestiva', 'Indicada para anemia', 'Potente antioxidante'],
        origin: 'Bosques de Abeto, Michoacán',
        featured: false
    }];


export const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'floral', label: 'Floral' },
    { id: 'silvestre', label: 'Silvestre' },
    { id: 'premium', label: 'Premium' },
    { id: 'infusionada', label: 'Infusionada' }];