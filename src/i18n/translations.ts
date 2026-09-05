import type { Language, TranslationTree } from './types';

const en: TranslationTree = {
  nav: {
    home: 'Home',
    about: 'About',
    gallery: 'Gallery',
    workshops: 'Workshops',
    charity: 'Charity',
    contact: 'Contact',
    viewArt: 'View Art',
    menu: 'Toggle menu',
    language: 'Language',
  },
  footer: {
    explore: 'Explore',
    more: 'More',
    connect: 'Connect',
    blurb:
      'Contemporary Ukrainian art born in Ukraine, rooted in Castellón, Spain. Paintings that bridge two worlds.',
    quote: 'Art bridges what words cannot.',
    between: 'Ukraine · Spain · Everywhere between',
    location: 'Castellón, Spain',
  },
  hero: {
    tag: 'Contemporary Ukrainian Artist',
    intro: 'Living and creating in Spain — where Ukrainian tradition meets Mediterranean light',
    viewArtwork: 'View Artwork',
    workshops: 'Workshops',
    place: 'Castellón de la Plana · Spain',
  },
  home: {
    metaTitle: 'Home',
    metaDesc:
      'Viktoria Paladios Art — Contemporary Ukrainian art living and creating in Spain. Explore paintings and workshops.',
    quote:
      'I paint the distance between where I come from and where I stand now — every canvas a bridge, every color a word in a language I am still learning to speak.',
    workshopsTitle: 'Workshops',
    workshopsDesc: 'Painting sessions in Castellón — all levels welcome.',
    discover: 'Discover',
    commissions: 'Commissions & Inquiries',
    together: "Let's create something together",
    getInTouch: 'Get in Touch',
    collectionsLabel: 'Collections',
    collectionsTitle: 'Explore the collections',
  },
  about: {
    metaTitle: 'About',
    metaDesc:
      'The story of Viktoria Paladios — contemporary Ukrainian painting bridging tradition and Mediterranean life in Spain.',
    label: 'About the Artist',
    title: 'A story written in color',
    p1: 'I learned to see color before I knew how to read. Growing up in Ukraine, childhood afternoons were spent beside my grandmother, watching her embroider vyshyvanka patterns by lamplight — every stitch a story, every motif a silent prayer.',
    p2: 'When I made Spain my home, Castellón revealed itself slowly: first through the rhythms of local markets and sunlit olive groves, and then through the distinct Mediterranean light that reshaped how I mix every color on my palette today.',
    quote:
      "I don't paint only to remember Ukraine — I paint to keep the conversation alive between who I was and who I am becoming.",
    p3: 'My work lives in the space between worlds. Ukrainian folk motifs curl through contemporary compositions like handwritten notes in the margins of a new chapter. Mediterranean landscapes breathe with the same luminous atmosphere I once associated only with summer visits to my grandmother’s garden.',
    p4: 'Today, I create from my studio in Castellón, continuing a visual diary of the journeys that feed my practice.',
    pTechnique:
      'In my work, I combine rich textured paste, warm gold leaf accents, and the living energy of acrylics. Every canvas is a way to capture shifting light, preserve the warmth of memory, and turn an inner journey into a visible story.',
    socialCta:
      'Follow the making of new works and look into my studio on social media:',
    based: 'Based in',
    basedValue: 'Castellón, Spain',
    mediums: 'Mediums',
    mediumsValue: 'Acrylic, oil, mixed media',
    focus: 'Focus',
    focusValue: 'Contemporary painting',
  },
  gallery: {
    metaTitle: 'Gallery',
    metaDesc: 'Explore Viktoria Paladios collections — paintings grouped by style and theme.',
    label: 'Gallery',
    title: 'Collections',
    description: 'Open a collection to explore the paintings inside.',
    collectionLabel: 'Collection',
    back: 'Back to Gallery',
    notFound: 'Collection not found',
  },
  workshops: {
    metaTitle: 'Workshops',
    metaDesc:
      'Join Viktoria Paladios for painting workshops in Castellón, Spain — floral acrylics, Petrykivka, plein air, and more.',
    label: 'Workshops',
    title: 'Paint together',
    description:
      'Intimate, hands-on painting sessions in Castellón and along the coast — all levels welcome at the easel.',
    studio: 'The studio experience',
    dates: 'Upcoming dates',
    datesIntro: 'All materials provided. Small groups for personal attention.',
    book: 'Book',
    expect: 'What to expect',
    expectBody:
      'Each workshop begins with a demonstration, followed by guided painting with individual feedback. You leave with a finished piece and techniques to explore at home.',
    getInTouch: 'Get in Touch',
    items: {
      'petrykivka-intro': {
        title: 'Introduction to Petrykivka',
        date: 'May 24, 2026',
        location: 'Casa dels Caragols, Castellón',
        level: 'Beginner friendly',
        description:
          "Discover the Ukrainian decorative painting tradition of Petrykivka. Using gouache and fine brushes, you'll create your own floral composition inspired by centuries-old folk art.",
      },
      'plein-air': {
        title: 'Plein Air by the Sea',
        date: 'June 7, 2026',
        location: 'Benicàssim Coast',
        level: 'Intermediate',
        description:
          'Paint the Mediterranean coastline en plein air. Guidance on capturing light, atmosphere, and the ever-changing sea — all materials provided.',
      },
      'summer-intensive': {
        title: 'Summer Painting Intensive',
        date: 'July 19–21, 2026',
        location: 'Castellón Studio',
        level: 'All levels',
        description:
          'A three-day immersive workshop covering landscape, floral, and abstract approaches. Includes studio time, group critique, and a final mini-exhibition of student works.',
      },
    },
  },
  contact: {
    metaTitle: 'Contact',
    metaDesc:
      'Contact Viktoria Paladios — contemporary artist based in Castellón, Spain. Email, Instagram, YouTube, TikTok, Facebook, WhatsApp.',
    label: 'Get in Touch',
    title: "Let's connect",
    intro:
      "For commissions, workshop bookings, exhibition inquiries, or simply to say hello — I'd love to hear from you.",
    location: 'Location',
    locationValue: 'Castellón, Spain',
    email: 'Email',
    instagram: 'Instagram',
    youtube: 'YouTube',
    youtubeValue: 'Art and process channel',
    tiktok: 'TikTok',
    tiktokValue: 'Short studio videos',
    facebook: 'Facebook',
    facebookValue: 'Community page',
    whatsapp: 'WhatsApp',
    whatsappValue: 'Send a message',
    name: 'Name',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending…',
    thanks: 'Thank you',
    thanksBody: "Your message has been received. I'll be in touch soon.",
    error: 'Something went wrong. Please try again.',
  },
  lightbox: {
    details: 'Details',
    madeToOrder: 'Made to Order',
    customizations: 'Customizations',
    shippingCare: 'Shipping & care',
    hideShippingCare: 'Hide shipping & care',
    shipping: 'Shipping',
    care: 'Care Instructions',
    prev: '← Prev',
    next: 'Next →',
    available: 'Available',
    sold: 'Sold',
    name: 'Name',
    medium: 'Medium',
    technique: 'Technique',
    authenticity: 'Authenticity',
    certification: 'Certification',
    materials: 'Materials',
    width: 'Width',
    height: 'Height',
    angle: 'Angle {{current}} / {{total}} · swipe to change',
    close: 'Close lightbox',
    closeLarge: 'Close large view',
    viewLarger: 'View painting larger',
    contactValue: 'Contact',
    inches: '{{value}} inches',
    shippingNote: 'Worldwide shipping available.',
    careNote:
      'Avoid direct sunlight and high humidity. Dust gently with a soft, dry cloth. Do not use liquid cleaners on the painted surface.',
    authenticityValue: 'Original handmade artwork',
    certificationValue: 'Signed and dated Certificate of Authenticity (CoA)',
    signedValue: 'Signed',
    customizationsText:
      'Custom orders are available for size and color changes, provided they are suitable for the artwork and preserve its overall appearance. Please send a message to discuss your requirements.',
    madeToOrderAvailable:
      'This is an original handmade painting. A recreation of this work can also be created for you in the same style and palette. While the overall composition is preserved, each brushstroke is unique — you receive a one-of-a-kind original with its own character.',
    madeToOrderSold:
      '{{title}} has been sold. Upon purchase, a new original painting will be created for you in this exact style and palette. While the composition remains consistent, each brushstroke is unique, ensuring your piece is a one-of-a-kind original with its own distinct character.',
    mediumAlcoholInk: 'Alcohol ink on {{surface}}',
    mediumGouache: 'Professional gouache on {{surface}}',
    mediumMetallic: 'Mixed media with gold leaf on {{surface}}',
    mediumMixed: 'Mixed media on {{surface}}',
    mediumAcrylic: 'Professional acrylics on {{surface}}',
    mediumDefault: 'Original painting on {{surface}}',
    techniquePetrykivka: 'Traditional Petrykivka brushwork',
    techniqueFluidInk: 'Fluid ink technique',
    techniqueHandLettered: 'Hand-lettered mixed media',
    techniqueImpasto: 'Impasto texture',
    techniqueTexturedLandscape: 'Textured abstract landscape',
    surfaceCanvas: 'canvas',
    surfacePaper: 'paper',
    surfaceWood: 'wood',
    surfaceOnCanvas: 'canvas',
    surfaceOnPaper: 'paper',
    surfaceOnWood: 'wood',
    materialsFloralCrown:
      'Canvas (cotton), pine stretcher bars, acrylic paints, textured paste, acrylic markers',
    materialsAlcoholInk: '{{surface}}, alcohol ink',
    materialsGouachePaper: 'paper, cotton, gouache paints',
    materialsGouache: 'Canvas (cotton), pine stretcher bars, gouache paints',
    materialsMetallic:
      'Canvas (cotton), pine stretcher bars, acrylic paints, textured paste, gold leaf',
    materialsDefault:
      'Canvas (cotton), pine stretcher bars, acrylic paints, textured paste',
  },
  charity: {
    metaTitle: 'Charity & Initiatives',
    label: 'Charity',
    title: 'Charity & Initiatives',
    watchOnInstagram: 'Watch on Instagram',
    event1Date: 'April 2025',
    event1Title: 'Charity master class in pysankarstvo',
    event2Title: 'Charity master class: "Childhood without war"',
    event3Title:
      'Charity master class on painting wooden ornaments dedicated to the Independence Day of Ukraine',
    event4Date: 'August 24, 2024',
    event4Title: 'Charity master class in Petrykivka painting',
  },
  exhibitions: {
    metaTitle: 'Exhibitions',
    metaDesc:
      'Past and upcoming exhibitions by Viktoria Paladios — Castellón, Madrid, Provence, Valencia, and beyond.',
    label: 'Exhibitions',
    title: 'On the wall',
    upcoming: 'Upcoming',
    past: 'Past',
  },
  journey: {
    metaTitle: 'Creative Journey',
    metaDesc:
      'A visual diary of the places and experiences that inspire Viktoria Paladios — from Provence lavender fields to Madrid gardens.',
    label: 'Creative Journey',
    title: 'Pages from a visual diary',
    description:
      "Not a blog — a scrapbook. The places I've stood, the light I've chased, and the quiet mornings that find their way onto canvas.",
    quote:
      'Every journey I take ends up on the canvas — sometimes as landscape, sometimes as color, sometimes as a single line that remembers the wind.',
  },
  press: {
    metaTitle: 'Press',
    metaDesc: 'Press mentions and features about Viktoria Paladios — contemporary Ukrainian artist in Spain.',
    label: 'Press',
    title: 'In the press',
    description:
      'Features, reviews, and mentions from publications across Spain, France, and the Ukrainian art community.',
    read: 'Read →',
  },
  collections: {
    'abstract-art': 'Abstract Art',
    'affirmation-collection': 'Affirmation Collection',
    'alcohol-ink-art': 'Alcohol Ink Art',
    'female-portraits': 'Female Portraits',
    'floral-collection': 'Floral Collection',
    'inspired-by-nature': 'Inspired by Nature',
    'inspired-by-places': 'Inspired by Places',
    petrykivka: 'Petrykivka',
    'plain-air-collection': 'Plein Air Collection',
    'pop-art': 'Pop Art',
    'textured-and-light': 'Textured & Light',
    'ukrainian-symbolism': 'Ukrainian Symbolism',
  },
  collectionIntros: {
    'ukrainian-symbolism':
      'Heritage held in paint — embroidery, memory, and symbols that carry Ukraine into the present.',
    'female-portraits':
      'Faces and figures of women — from floral-crowned silhouettes to dreamlike seascapes of identity.',
    'abstract-art':
      'Compositions that speak through color, gesture, and form — atmospheres beyond the literal.',
    'floral-collection':
      'Classic floral still lifes — bouquets studied for light, texture, and quiet drama.',
    petrykivka:
      'The Ukrainian decorative painting tradition — stylized florals, berries, and brush-stroke ornaments.',
    'pop-art':
      'Bold color, graphic energy, and contemporary icons — art that speaks with confidence.',
    'inspired-by-nature':
      'Landscapes, seas, and skies observed with feeling — nature translated into color and light.',
    'inspired-by-places':
      'Landmarks remembered in paint — cities, coasts, and journeys translated into atmosphere.',
    'plain-air-collection':
      'Painted from life and light — mountains, coasts, and horizons observed with a quiet eye.',
    'alcohol-ink-art':
      'Fluid pigment on panel — luminous landscapes and circles born from chance and control.',
    'textured-and-light':
      'Surface as story — impasto, metallic layers, and tactile depths you can almost feel.',
    'affirmation-collection':
      'Words and images woven together — paintings that hold strength, intention, and daily courage.',
  },
};

const es: TranslationTree = {
  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    gallery: 'Galería',
    workshops: 'Talleres',
    charity: 'Caridad',
    contact: 'Contacto',
    viewArt: 'Ver arte',
    menu: 'Abrir menú',
    language: 'Idioma',
  },
  footer: {
    explore: 'Explorar',
    more: 'Más',
    connect: 'Conectar',
    blurb:
      'Arte contemporáneo ucraniano nacido en Ucrania y arraigado en Castellón, España. Pinturas que unen dos mundos.',
    quote: 'El arte habla donde las palabras no alcanzan.',
    between: 'Ucrania · España · Todo lo que hay entre nosotros',
    location: 'Castellón, España',
  },
  hero: {
    tag: 'Artista contemporánea ucraniana',
    intro: 'Vivo y creo en España — donde la tradición ucraniana se encuentra con la luz mediterránea',
    viewArtwork: 'Ver obras',
    workshops: 'Talleres',
    place: 'Castellón de la Plana · España',
  },
  home: {
    metaTitle: 'Inicio',
    metaDesc:
      'Viktoria Paladios Art — Arte contemporáneo ucraniano en España. Pinturas y talleres.',
    quote:
      'Pinto la distancia entre de dónde vengo y dónde estoy ahora: cada lienzo es un puente, cada color una palabra en un idioma que aún estoy aprendiendo a hablar.',
    workshopsTitle: 'Talleres',
    workshopsDesc: 'Sesiones de pintura en Castellón — todos los niveles son bienvenidos.',
    discover: 'Descubrir',
    commissions: 'Encargos y consultas',
    together: 'Creemos algo juntas',
    getInTouch: 'Contactar',
    collectionsLabel: 'Colecciones',
    collectionsTitle: 'Explorar las colecciones',
  },
  about: {
    metaTitle: 'Sobre mí',
    metaDesc:
      'La historia de Viktoria Paladios — pintura contemporánea ucraniana entre la tradición y la vida mediterránea en España.',
    label: 'Sobre la artista',
    title: 'Una historia escrita en color',
    p1: 'Aprendí a ver el color antes de saber leer. De niña en Ucrania, pasaba las tardes junto a mi abuela, viéndola bordar patrones de vyshyvanka a la luz de la lámpara: cada puntada una historia, cada motivo una oración silenciosa.',
    p2: 'Cuando hice de España mi hogar, Castellón se reveló poco a poco: primero a través del ritmo de los mercados locales y los olivares soleados, y luego a través de esa luz mediterránea tan particular que transformó mi forma de mezclar cada color en la paleta.',
    quote:
      'No pinto solo para recordar Ucrania; pinto para mantener vivo el diálogo entre la que fui y la que estoy llegando a ser.',
    p3: 'Mi obra habita en el espacio entre mundos. Los motivos populares ucranianos se entrelazan en composiciones contemporáneas como notas manuscritas en los márgenes de un nuevo capítulo. Los paisajes mediterráneos respiran con esa misma atmósfera luminosa que antes solo asociaba con las visitas de verano al jardín de mi abuela.',
    p4: 'Hoy sigo creando desde mi estudio en Castellón, continuando un diario visual de los viajes que alimentan mi práctica artística.',
    pTechnique:
      'En mi obra combino pastas texturizadas, cálidos acentos de pan de oro y la energía viva del acrílico. Cada lienzo es una forma de atrapar la luz cambiante, preservar la calidez de la memoria y convertir un viaje interior en una historia visible.',
    socialCta:
      'Sigue el proceso de creación de nuevas obras y asómate a mi estudio en las redes:',
    based: 'Reside en',
    basedValue: 'Castellón, España',
    mediums: 'Medios',
    mediumsValue: 'Acrílico, óleo, técnica mixta',
    focus: 'Enfoque',
    focusValue: 'Pintura contemporánea',
  },
  gallery: {
    metaTitle: 'Galería',
    metaDesc: 'Colecciones de Viktoria Paladios — pinturas agrupadas por estilo y tema.',
    label: 'Galería',
    title: 'Colecciones',
    description: 'Abre una colección para explorar las pinturas.',
    collectionLabel: 'Colección',
    back: 'Volver a la galería',
    notFound: 'Colección no encontrada',
  },
  workshops: {
    metaTitle: 'Talleres',
    metaDesc:
      'Únete a Viktoria Paladios en talleres de pintura en Castellón, España — acrílico floral, Petrykivka, plein air y más.',
    label: 'Talleres',
    title: 'Pintar juntas',
    description:
      'Sesiones prácticas en Castellón y en la costa — todos los niveles son bienvenidos al caballete.',
    studio: 'La experiencia del estudio',
    dates: 'Próximas fechas',
    datesIntro: 'Todos los materiales incluidos. Grupos reducidos para atención personal.',
    book: 'Reservar',
    expect: 'Qué esperar',
    expectBody:
      'Cada taller comienza con una demostración, seguida de pintura guiada con comentarios individuales. Sales con una obra terminada y técnicas para seguir en casa.',
    getInTouch: 'Contactar',
    items: {
      'petrykivka-intro': {
        title: 'Introducción a Petrykivka',
        date: '24 de mayo de 2026',
        location: 'Casa dels Caragols, Castellón',
        level: 'Principiantes',
        description:
          'Descubre la tradición ucraniana de pintura decorativa Petrykivka. Con gouache y pinceles finos crearás tu propia composición floral inspirada en un arte popular de siglos.',
      },
      'plein-air': {
        title: 'Plein air junto al mar',
        date: '7 de junio de 2026',
        location: 'Costa de Benicàssim',
        level: 'Intermedio',
        description:
          'Pinta la costa mediterránea al aire libre. Orientación para captar la luz, la atmósfera y el mar que cambia — todos los materiales incluidos.',
      },
      'summer-intensive': {
        title: 'Intensivo de verano',
        date: '19–21 de julio de 2026',
        location: 'Estudio de Castellón',
        level: 'Todos los niveles',
        description:
          'Tres días inmersivos de paisaje, floral y abstracción. Incluye tiempo de estudio, crítica en grupo y una mini exposición final de las obras del alumnado.',
      },
    },
  },
  contact: {
    metaTitle: 'Contacto',
    metaDesc:
      'Contacta con Viktoria Paladios — artista contemporánea en Castellón, España. Email, Instagram, YouTube, TikTok, Facebook, WhatsApp.',
    label: 'Contacto',
    title: 'Hablemos',
    intro:
      'Para encargos, reservas de talleres, consultas de exposiciones o simplemente para saludar — me encantaría saber de ti.',
    location: 'Ubicación',
    locationValue: 'Castellón, España',
    email: 'Email',
    instagram: 'Instagram',
    youtube: 'YouTube',
    youtubeValue: 'Canal sobre arte y proceso',
    tiktok: 'TikTok',
    tiktokValue: 'Vídeos cortos del taller',
    facebook: 'Facebook',
    facebookValue: 'Página de la comunidad',
    whatsapp: 'WhatsApp',
    whatsappValue: 'Enviar un mensaje',
    name: 'Nombre',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    thanks: 'Gracias',
    thanksBody: 'Tu mensaje ha llegado. Te responderé pronto.',
    error: 'Algo ha fallado. Inténtalo de nuevo.',
  },
  lightbox: {
    details: 'Detalles',
    madeToOrder: 'Por encargo',
    customizations: 'Personalizaciones',
    shippingCare: 'Envío y cuidado',
    hideShippingCare: 'Ocultar envío y cuidado',
    shipping: 'Envío',
    care: 'Instrucciones de cuidado',
    prev: '← Ant.',
    next: 'Sig. →',
    available: 'Disponible',
    sold: 'Vendido',
    name: 'Nombre',
    medium: 'Medio',
    technique: 'Técnica',
    authenticity: 'Autenticidad',
    certification: 'Certificación',
    materials: 'Materiales',
    width: 'Ancho',
    height: 'Alto',
    angle: 'Ángulo {{current}} / {{total}} · desliza para cambiar',
    close: 'Cerrar',
    closeLarge: 'Cerrar vista grande',
    viewLarger: 'Ver la pintura más grande',
    contactValue: 'Consultar',
    inches: '{{value}} pulgadas',
    shippingNote: 'Envío disponible a todo el mundo.',
    careNote:
      'Evita la luz solar directa y la humedad alta. Limpia con un paño suave y seco. No uses limpiadores líquidos sobre la superficie pintada.',
    authenticityValue: 'Obra original hecha a mano',
    certificationValue: 'Certificado de autenticidad firmado y fechado (CoA)',
    signedValue: 'Firmada',
    customizationsText:
      'Los encargos personalizados están disponibles para cambios de tamaño y color, siempre que sean adecuados para la obra y preserven su apariencia general. Envía un mensaje para hablar de tus requisitos.',
    madeToOrderAvailable:
      'Esta es una pintura original hecha a mano. También se puede crear para ti una recreación de esta obra en el mismo estilo y paleta. Aunque la composición general se conserva, cada pincelada es única: recibes un original irrepetible con su propio carácter.',
    madeToOrderSold:
      '{{title}} se ha vendido. Tras la compra, se creará para ti una nueva pintura original en este mismo estilo y paleta. Aunque la composición se mantiene, cada pincelada es única, de modo que tu pieza es un original único con su propio carácter.',
    mediumAlcoholInk: 'Tinta alcohólica sobre {{surface}}',
    mediumGouache: 'Gouache profesional sobre {{surface}}',
    mediumMetallic: 'Técnica mixta con pan de oro sobre {{surface}}',
    mediumMixed: 'Técnica mixta sobre {{surface}}',
    mediumAcrylic: 'Acrílicos profesionales sobre {{surface}}',
    mediumDefault: 'Pintura original sobre {{surface}}',
    techniquePetrykivka: 'Pincelada tradicional Petrykivka',
    techniqueFluidInk: 'Técnica de tinta fluida',
    techniqueHandLettered: 'Técnica mixta con tipografía a mano',
    techniqueImpasto: 'Textura de impasto',
    techniqueTexturedLandscape: 'Paisaje abstracto texturizado',
    surfaceCanvas: 'lienzo',
    surfacePaper: 'papel',
    surfaceWood: 'madera',
    surfaceOnCanvas: 'lienzo',
    surfaceOnPaper: 'papel',
    surfaceOnWood: 'madera',
    materialsFloralCrown:
      'Lienzo (algodón), bastidor de pino, pinturas acrílicas, pasta texturizada, rotuladores acrílicos',
    materialsAlcoholInk: '{{surface}}, tinta alcohólica',
    materialsGouachePaper: 'papel, algodón, pinturas gouache',
    materialsGouache: 'Lienzo (algodón), bastidor de pino, pinturas gouache',
    materialsMetallic:
      'Lienzo (algodón), bastidor de pino, pinturas acrílicas, pasta texturizada, pan de oro',
    materialsDefault:
      'Lienzo (algodón), bastidor de pino, pinturas acrílicas, pasta texturizada',
  },
  charity: {
    metaTitle: 'Caridad e iniciativas',
    label: 'Caridad',
    title: 'Caridad e iniciativas',
    watchOnInstagram: 'Ver en Instagram',
    event1Date: 'Abril 2025',
    event1Title: 'Taller benéfico de pysankarstvo',
    event2Title: 'Taller benéfico: "Infancia sin guerra"',
    event3Title:
      'Taller benéfico de pintura de adornos de madera dedicado al Día de la Independencia de Ucrania',
    event4Date: '24 de agosto de 2024',
    event4Title: 'Taller benéfico de pintura Petrykivka',
  },
  exhibitions: {
    metaTitle: 'Exposiciones',
    metaDesc:
      'Exposiciones pasadas y próximas de Viktoria Paladios — Castellón, Madrid, Provenza, Valencia y más.',
    label: 'Exposiciones',
    title: 'En la pared',
    upcoming: 'Próximas',
    past: 'Pasadas',
  },
  journey: {
    metaTitle: 'Viaje creativo',
    metaDesc:
      'Un diario visual de los lugares y experiencias que inspiran a Viktoria Paladios.',
    label: 'Viaje creativo',
    title: 'Páginas de un diario visual',
    description:
      'No es un blog — es un álbum. Los lugares donde he estado, la luz que he perseguido y las mañanas quietas que llegan al lienzo.',
    quote:
      'Cada viaje acaba en el lienzo — a veces como paisaje, a veces como color, a veces como una sola línea que recuerda el viento.',
  },
  press: {
    metaTitle: 'Prensa',
    metaDesc: 'Menciones y reportajes sobre Viktoria Paladios — artista contemporánea ucraniana en España.',
    label: 'Prensa',
    title: 'En la prensa',
    description:
      'Reportajes, críticas y menciones de publicaciones de España, Francia y la comunidad artística ucraniana.',
    read: 'Leer →',
  },
  collections: {
    'abstract-art': 'Arte abstracto',
    'affirmation-collection': 'Colección de afirmaciones',
    'alcohol-ink-art': 'Tinta de alcohol',
    'female-portraits': 'Retratos femeninos',
    'floral-collection': 'Colección floral',
    'inspired-by-nature': 'Inspirado en la naturaleza',
    'inspired-by-places': 'Inspirado en lugares',
    petrykivka: 'Petrykivka',
    'plain-air-collection': 'Plein air',
    'pop-art': 'Pop art',
    'textured-and-light': 'Textura y luz',
    'ukrainian-symbolism': 'Simbolismo ucraniano',
  },
  collectionIntros: {
    'ukrainian-symbolism':
      'La herencia sostenida en pintura — bordado, memoria y símbolos que llevan Ucrania al presente.',
    'female-portraits':
      'Rostros y figuras de mujeres — de siluetas coronadas de flores a paisajes oníricos de identidad.',
    'abstract-art':
      'Composiciones que hablan a través del color, el gesto y la forma — atmósferas más allá de lo literal.',
    'floral-collection':
      'Bodegones florales clásicos — ramos estudiados por la luz, la textura y un drama sereno.',
    petrykivka:
      'La tradición ucraniana de pintura decorativa — flores estilizadas, bayas y ornamentos de pincel.',
    'pop-art':
      'Color audaz, energía gráfica e iconos contemporáneos — arte que habla con confianza.',
    'inspired-by-nature':
      'Paisajes, mares y cielos observados con sentimiento — la naturaleza traducida en color y luz.',
    'inspired-by-places':
      'Lugares recordados en pintura — ciudades, costas y viajes convertidos en atmósfera.',
    'plain-air-collection':
      'Pintado del natural y de la luz — montañas, costas y horizontes observados con mirada serena.',
    'alcohol-ink-art':
      'Pigmento fluido sobre panel — paisajes luminosos y círculos nacidos del azar y el control.',
    'textured-and-light':
      'La superficie como relato — impasto, capas metálicas y profundidades táctiles que casi se sienten.',
    'affirmation-collection':
      'Palabras e imágenes entrelazadas — pinturas que guardan fuerza, intención y valor cotidiano.',
  },
};

const uk: TranslationTree = {
  nav: {
    home: 'Головна',
    about: 'Про мене',
    gallery: 'Галерея',
    workshops: 'Майстер-класи',
    charity: 'Благодійність',
    contact: 'Контакти',
    viewArt: 'Переглянути галерею',
    menu: 'Відкрити меню',
    language: 'Мова',
  },
  footer: {
    explore: 'Дослідити',
    more: 'Більше',
    connect: 'Зв’язок',
    blurb:
      'Сучасне українське мистецтво, народжене в Україні та продовжене в Кастельйоні, Іспанія. Полотна, що є мостом між двома світами.',
    quote: 'Мистецтво говорить там, де слова безсилі',
    between: 'Україна · Іспанія · Все, що між нами',
    location: 'Кастельйон, Іспанія',
  },
  hero: {
    tag: 'Сучасна українська художниця',
    intro: 'Живу і творю в Іспанії — де українська традиція зустрічається зі середземноморським світлом',
    viewArtwork: 'Переглянути роботи',
    workshops: 'Майстер-класи',
    place: 'Кастельон-де-ла-Плана · Іспанія',
  },
  home: {
    metaTitle: 'Головна',
    metaDesc:
      'Viktoria Paladios Art — сучасне українське мистецтво в Іспанії. Живопис і майстер-класи.',
    quote:
      'Мої полотна — це міст між минулим і теперішнім, між місцем, де я народилася, і тим, де я є зараз. Кожна фарба тут — слово мови, яку я щодня пізнаю наново.',
    workshopsTitle: 'Майстер-класи',
    workshopsDesc: 'Сесії живопису в Кастельйоні — усі рівні вітаються.',
    discover: 'Дізнатися',
    commissions: 'Замовлення та запити',
    together: 'Створимо щось разом',
    getInTouch: "Зв'язатися",
    collectionsLabel: 'Колекції',
    collectionsTitle: 'Ознайомитися з колекціями',
  },
  about: {
    metaTitle: 'Про мене',
    metaDesc:
      'Історія Вікторії Паладіос — сучасний український живопис між традицією та середземноморським життям в Іспанії.',
    label: 'Про художницю',
    title: 'Історія, написана кольором',
    p1: 'Я навчилася бачити колір раніше, ніж читати. Дитячі вечори в Україні минули біля бабусі: при світлі лампи вона вишивала сорочку за сорочкою — кожен стібок був історією, кожен узор — тихою молитвою.',
    p2: 'Коли моїм домом стала Іспанія, Кастельйон розкривався поступово: спершу через гомін ринків та оливкові гаї, залиті сонцем, а згодом — через особливе середземноморське світло, яке назавжди змінило те, як я змішую кольори на своїй палітрі.',
    quote:
      "Я пишу не лише для того, щоб пам'ятати Україну — я пишу, щоб не згасав діалог між тим, ким я була, і тим, ким я стаю.",
    p3: 'Мої роботи живуть у просторі між світами. Українські народні мотиви вплітаються в сучасні композиції, мов від руки написані нотатки на полях нового розділу. Середземноморські пейзажі дихають тією самою світлоносною атмосферою, яку колись я знала лише під час літніх гостювань у бабусиному саду.',
    p4: 'Сьогодні я творимо у своїй студії в Кастельйоні, продовжуючи вести візуальний щоденник мандрів, які живлять мою творчість.',
    pTechnique:
      "У своїй роботі я поєдную об'ємну фактуру пасти, теплі акценти поталі та живу енергію акрилу. Кожне полотно для мене — це спосіб зафіксувати мінливість світла, зберегти тепло спогадів і перетворити внутрішній шлях на видиму історію.",
    socialCta:
      'Слідкуйте за процесом створення нових робіт та зазирніть у мою студію у соцмережах:',
    based: 'Базується в',
    basedValue: 'Кастельйон, Іспанія',
    mediums: 'Медіуми',
    mediumsValue: 'Акрил, олія, змішана техніка',
    focus: 'Фокус',
    focusValue: 'Сучасний живопис',
  },
  gallery: {
    metaTitle: 'Галерея',
    metaDesc: 'Колекції Вікторії Паладіос — живопис за стилем і темою.',
    label: 'Галерея',
    title: 'Колекції',
    description: 'Відкрийте колекцію, щоб переглянути картини.',
    collectionLabel: 'Колекція',
    back: 'Назад до галереї',
    notFound: 'Колекцію не знайдено',
  },
  workshops: {
    metaTitle: 'Майстер-класи',
    metaDesc:
      'Приєднуйтесь до Вікторії Паладіос на майстер-класах у Кастельйоні, Іспанія — квітковий акрил, петриківка, пленер та інше.',
    label: 'Майстер-класи',
    title: 'Малювати разом',
    description:
      'Практичні сесії живопису в Кастельйоні та на узбережжі — усі рівні вітаються біля мольберта.',
    studio: 'Досвід студії',
    dates: 'Найближчі дати',
    datesIntro: 'Усі матеріали надаються. Невеликі групи для особистої уваги.',
    book: 'Забронювати',
    expect: 'Чого очікувати',
    expectBody:
      'Кожен майстер-клас починається з демонстрації, далі — живопис із індивідуальним зворотним зв’язком. Ви йдете з готовою роботою і техніками, які можна продовжити вдома.',
    getInTouch: "Зв'язатися",
    items: {
      'petrykivka-intro': {
        title: 'Вступ до петриківки',
        date: '24 травня 2026 року',
        location: 'Casa dels Caragols, Кастельйон',
        level: 'Для початківців',
        description:
          'Відкрийте українську декоративну традицію петриківки. Гуашшю й тонкими пензлями ви створите власну квіткову композицію, натхненну народним мистецтвом.',
      },
      'plein-air': {
        title: 'Пленер біля моря',
        date: '7 червня 2026 року',
        location: 'Узбережжя Бенікасім',
        level: 'Середній рівень',
        description:
          'Малюйте середземноморське узбережжя на пленері. Підказки щодо світла, атмосфери й мінливого моря — усі матеріали надаються.',
      },
      'summer-intensive': {
        title: 'Літній інтенсив',
        date: '19–21 липня 2026 року',
        location: 'Студія в Кастельйоні',
        level: 'Усі рівні',
        description:
          'Три дні занурення в пейзаж, квітковий і абстрактний живопис. Студійний час, групове обговорення та міні-виставка робіт учасників.',
      },
    },
  },
  contact: {
    metaTitle: 'Контакти',
    metaDesc:
      'Зв’язок із Вікторією Паладіос — сучасна художниця в Кастельйоні, Іспанія. Email, Instagram, YouTube, TikTok, Facebook, WhatsApp.',
    label: "Зв'язатися",
    title: 'Давайте познайомимося',
    intro:
      'Для замовлень, бронювання майстер-класів, запитів про виставки або просто щоб привітатися — буду рада почути вас.',
    location: 'Локація',
    locationValue: 'Кастельйон, Іспанія',
    email: 'Email',
    instagram: 'Instagram',
    youtube: 'YouTube',
    youtubeValue: 'Канал про мистецтво та процес',
    tiktok: 'TikTok',
    tiktokValue: 'Короткі відео з майстерні',
    facebook: 'Facebook',
    facebookValue: 'Сторінка спільноти',
    whatsapp: 'WhatsApp',
    whatsappValue: 'Надіслати повідомлення',
    name: "Ім'я",
    message: 'Повідомлення',
    send: 'Надіслати',
    sending: 'Надсилання…',
    thanks: 'Дякую',
    thanksBody: 'Ваше повідомлення отримано. Я скоро відповім.',
    error: 'Щось пішло не так. Спробуйте ще раз.',
  },
  lightbox: {
    details: 'Деталі',
    madeToOrder: 'На замовлення',
    customizations: 'Персоналізація',
    shippingCare: 'Доставка та догляд',
    hideShippingCare: 'Сховати доставку та догляд',
    shipping: 'Доставка',
    care: 'Інструкції з догляду',
    prev: '← Назад',
    next: 'Далі →',
    available: 'В наявності',
    sold: 'Продано',
    name: 'Назва',
    medium: 'Медіум',
    technique: 'Техніка',
    authenticity: 'Автентичність',
    certification: 'Сертифікація',
    materials: 'Матеріали',
    width: 'Ширина',
    height: 'Висота',
    angle: 'Ракурс {{current}} / {{total}} · проведіть, щоб змінити',
    close: 'Закрити',
    closeLarge: 'Закрити збільшений вигляд',
    viewLarger: 'Відкрити картину більшою',
    contactValue: 'За запитом',
    inches: '{{value}} дюймів',
    shippingNote: 'Доставка доступна по всьому світу.',
    careNote:
      'Уникайте прямого сонця та високої вологості. Обережно протирайте м’якою сухою тканиною. Не використовуйте рідкі засоби на поверхні живопису.',
    authenticityValue: 'Оригінальний витвір ручної роботи',
    certificationValue: 'Підписаний і датований сертифікат автентичності (CoA)',
    signedValue: 'Підписано',
    customizationsText:
      'Індивідуальні замовлення доступні щодо розміру та кольору, якщо зміни підходять для роботи й зберігають її загальний вигляд. Напишіть повідомлення, щоб обговорити ваші побажання.',
    madeToOrderAvailable:
      'Це оригінальна картина ручної роботи. Для вас також можна створити повторення цієї роботи в тому ж стилі та палітрі. Хоча загальна композиція зберігається, кожен мазок унікальний — ви отримуєте неповторний оригінал із власним характером.',
    madeToOrderSold:
      '{{title}} продано. Після покупки для вас буде створено нову оригінальну картину в цьому самому стилі й палітрі. Хоча композиція залишається, кожен мазок унікальний — ваша робота буде неповторним оригіналом із власним характером.',
    mediumAlcoholInk: 'Спиртові чорнила на {{surface}}',
    mediumGouache: 'Професійна гуаш на {{surface}}',
    mediumMetallic: 'Змішана техніка з поталлю на {{surface}}',
    mediumMixed: 'Змішана техніка на {{surface}}',
    mediumAcrylic: 'Професійний акрил на {{surface}}',
    mediumDefault: 'Оригінальний живопис на {{surface}}',
    techniquePetrykivka: 'Традиційний петриківський розпис',
    techniqueFluidInk: 'Техніка плинних чорнил',
    techniqueHandLettered: 'Змішана техніка з рукописним текстом',
    techniqueImpasto: 'Фактура імпасто',
    techniqueTexturedLandscape: 'Текстурний абстрактний пейзаж',
    surfaceCanvas: 'полотно',
    surfacePaper: 'папір',
    surfaceWood: 'дерево',
    surfaceOnCanvas: 'полотні',
    surfaceOnPaper: 'папері',
    surfaceOnWood: 'дереві',
    materialsFloralCrown:
      'Полотно (бавовна), сосновий підрамник, акрилові фарби, фактурна паста, акрилові маркери',
    materialsAlcoholInk: '{{surface}}, спиртові чорнила',
    materialsGouachePaper: 'папір, бавовна, гуаш',
    materialsGouache: 'Полотно (бавовна), сосновий підрамник, гуаш',
    materialsMetallic:
      'Полотно (бавовна), сосновий підрамник, акрилові фарби, фактурна паста, поталь',
    materialsDefault:
      'Полотно (бавовна), сосновий підрамник, акрилові фарби, фактурна паста',
  },
  charity: {
    metaTitle: 'Благодійність та ініціативи',
    label: 'Благодійність',
    title: 'Благодійність та ініціативи',
    watchOnInstagram: 'Дивитися в Instagram',
    event1Date: 'Квітень 2025',
    event1Title: 'Благодійний майстер-клас з писанкарства',
    event2Title: 'Благодійний майстер-клас: "Дитинство без війни"',
    event3Title:
      "Благодійний майстер-клас з розпису дерев'яних прикрас присвячений Дню Незалежності України",
    event4Date: '24 серпня 2024 року',
    event4Title: 'Благодійний майстер-клас з Петриківського розпису',
  },
  exhibitions: {
    metaTitle: 'Виставки',
    metaDesc:
      'Минулі та майбутні виставки Вікторії Паладіос — Кастельйон, Мадрид, Прованс, Валенсія та далі.',
    label: 'Виставки',
    title: 'На стіні',
    upcoming: 'Найближчі',
    past: 'Минулі',
  },
  journey: {
    metaTitle: 'Творчий шлях',
    metaDesc:
      'Візуальний щоденник місць і вражень, що надихають Вікторію Паладіос.',
    label: 'Творчий шлях',
    title: 'Сторінки візуального щоденника',
    description:
      'Не блог — альбом. Місця, де я стояла, світло, за яким гналася, і тихі ранкові години, що потрапляють на полотно.',
    quote:
      'Кожна подорож закінчується на полотні — іноді як пейзаж, іноді як колір, іноді як одна лінія, що пам’ятає вітер.',
  },
  press: {
    metaTitle: 'Преса',
    metaDesc: 'Згадки та матеріали про Вікторію Паладіос — сучасна українська художниця в Іспанії.',
    label: 'Преса',
    title: 'У пресі',
    description:
      'Матеріали, огляди та згадки видань Іспанії, Франції та української мистецької спільноти.',
    read: 'Читати →',
  },
  collections: {
    'abstract-art': 'Абстракція',
    'affirmation-collection': 'Афірмації',
    'alcohol-ink-art': 'Алкогольні чорнила',
    'female-portraits': 'Жіночі портрети',
    'floral-collection': 'Квіткова колекція',
    'inspired-by-nature': 'Натхнене природою',
    'inspired-by-places': 'Натхнене місцями',
    petrykivka: 'Петриківка',
    'plain-air-collection': 'Пленер',
    'pop-art': 'Поп-арт',
    'textured-and-light': 'Текстура і світло',
    'ukrainian-symbolism': 'Українська символіка',
  },
  collectionIntros: {
    'ukrainian-symbolism':
      'Спадщина, утримана в фарбі — вишивка, пам’ять і символи, що несуть Україну в сьогодення.',
    'female-portraits':
      'Обличчя й постаті жінок — від силуетів у квіткових коронах до мрійливих морських пейзажів ідентичності.',
    'abstract-art':
      'Композиції, що говорять кольором, жестом і формою — атмосфери поза буквальним.',
    'floral-collection':
      'Класичні квіткові натюрморти — букети, вивчені для світла, фактури й тихої драми.',
    petrykivka:
      'Українська традиція декоративного розпису — стилізовані квіти, ягоди й орнаменти мазка.',
    'pop-art':
      'Сміливий колір, графічна енергія й сучасні ікони — мистецтво, що говорить упевнено.',
    'inspired-by-nature':
      'Пейзажі, моря й небеса, побачені з чуттям — природа, перекладена кольором і світлом.',
    'inspired-by-places':
      'Місця, збережені в фарбі — міста, узбережжя й подорожі, перетворені на атмосферу.',
    'plain-air-collection':
      'Написано з натури й світла — гори, узбережжя й обрії, побачені спокійним оком.',
    'alcohol-ink-art':
      'Рідкий пігмент на панелі — світлі пейзажі й кола, народжені з випадку й контролю.',
    'textured-and-light':
      'Поверхня як історія — імпасто, металеві шари й відчутна глибина, яку майже можна торкнути.',
    'affirmation-collection':
      'Слова й образи, сплетені разом — картини сили, наміру й щоденної відваги.',
  },
};

export const translations: Record<Language, TranslationTree> = { en, es, uk };
