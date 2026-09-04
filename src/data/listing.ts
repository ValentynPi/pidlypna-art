import type { Language } from '../i18n/types';
import type { Artwork } from '../types';
import { listingHeight, listingWidth } from './artworks';

type Localized = Record<Language, string>;

const AUTHENTICITY: Localized = {
  en: 'Original handmade artwork',
  es: 'Obra original hecha a mano',
  uk: 'Оригінальна робота, зроблена вручну',
};

const CERTIFICATION: Localized = {
  en: 'Signed & Dated COA',
  es: 'Certificado de autenticidad firmado y fechado',
  uk: 'Підписаний і датований сертифікат автентичності',
};

const SIGNED_ONLY: Localized = {
  en: 'Signed',
  es: 'Firmada',
  uk: 'Підписана',
};

const CUSTOMIZATIONS: Localized = {
  en: 'Custom orders are available for size and color changes, provided they are suitable for the artwork and preserve its overall appearance. Please send a message to discuss your requirements.',
  es: 'Se admiten encargos con cambios de tamaño y color, siempre que encajen con la obra y preserven su aspecto general. Envía un mensaje para hablar de lo que necesitas.',
  uk: 'Можливі індивідуальні замовлення зі зміною розміру та кольору, якщо це пасує до роботи й зберігає її загальний вигляд. Напишіть, щоб обговорити деталі.',
};

const SHIPPING: Localized = {
  en: 'Worldwide shipping available.',
  es: 'Envío disponible a todo el mundo.',
  uk: 'Доставка по всьому світу.',
};

const CARE: Localized = {
  en: 'Avoid direct sunlight and high humidity. Dust gently with a soft, dry cloth. Do not use liquid cleaners on the painted surface.',
  es: 'Evita la luz solar directa y la humedad alta. Limpia el polvo con un paño suave y seco. No uses limpiadores líquidos sobre la superficie pintada.',
  uk: 'Уникайте прямого сонця та високої вологості. Обережно протирайте м’якою сухою тканиною. Не використовуйте рідкі засоби на пофарбованій поверхні.',
};

const CONTACT: Localized = {
  en: 'Contact',
  es: 'Consultar',
  uk: "Зв'язатися",
};

const INCHES: Localized = {
  en: 'inches',
  es: 'pulgadas',
  uk: 'дюймів',
};

const MADE_TO_ORDER_AVAILABLE: Localized = {
  en: 'This is an original handmade painting by Viktoria Paladios. A new original can also be created for you in this exact style and palette. While the composition remains consistent, each brushstroke is unique, ensuring your piece is a one-of-a-kind original with its own distinct character.',
  es: 'Esta es una pintura original hecha a mano por Viktoria Paladios. También se puede crear para ti una nueva obra original en este mismo estilo y paleta. Aunque la composición se mantiene, cada pincelada es única: tu pieza será un original irrepetible, con carácter propio.',
  uk: 'Це оригінальна картина, зроблена вручну Вікторією Паладіос. Для вас також можна створити нову оригінальну роботу в цьому ж стилі й палітрі. Композиція залишається подібною, але кожен мазок унікальний — ваша робота буде єдиною у своєму роді.',
};

function madeToOrderSold(title: string, lang: Language): string {
  const map: Localized = {
    en: `${title} has been sold. Upon purchase, a new original painting will be created for you in this exact style and palette. While the composition remains consistent, each brushstroke is unique, ensuring your piece is a one-of-a-kind original with its own distinct character.`,
    es: `${title} ya se ha vendido. Al encargarla, se creará para ti una nueva pintura original en este mismo estilo y paleta. Aunque la composición se mantiene, cada pincelada es única: tu pieza será un original irrepetible, con carácter propio.`,
    uk: `${title} продано. Після замовлення для вас буде створено нову оригінальну картину в цьому ж стилі й палітрі. Композиція залишається подібною, але кожен мазок унікальний — ваша робота буде єдиною у своєму роді.`,
  };
  return map[lang];
}

const SURFACE: Record<string, Localized> = {
  canvas: { en: 'canvas', es: 'lienzo', uk: 'полотно' },
  paper: { en: 'paper', es: 'papel', uk: 'папір' },
  wood: { en: 'wood', es: 'madera', uk: 'дерево' },
};

function surfaceWord(surface: string, lang: Language): string {
  const key = surface.toLowerCase();
  return SURFACE[key]?.[lang] ?? surface.toLowerCase();
}

export function listingCustomizations(lang: Language = 'en'): string {
  return CUSTOMIZATIONS[lang];
}

export function listingShipping(lang: Language = 'en'): string {
  return SHIPPING[lang];
}

export function listingCare(lang: Language = 'en'): string {
  return CARE[lang];
}

export function madeToOrderText(artwork: Artwork, lang: Language = 'en'): string {
  if (artwork.availability === 'Sold') return madeToOrderSold(artwork.title, lang);
  return MADE_TO_ORDER_AVAILABLE[lang];
}

export function listingMedium(artwork: Artwork, lang: Language = 'en'): string {
  const materials = artwork.materials.toLowerCase();
  const surface = surfaceWord(artwork.surface, lang);
  const templates: Record<string, Localized> = {
    alcohol: {
      en: `Alcohol ink on ${surface}`,
      es: `Tinta de alcohol sobre ${surface}`,
      uk: `Алкогольні чорнила на ${surface}`,
    },
    gouache: {
      en: `Professional gouache on ${surface}`,
      es: `Gouache profesional sobre ${surface}`,
      uk: `Професійна гуаш на ${surface}`,
    },
    metallic: {
      en: `Mixed media with metallic leaf on ${surface}`,
      es: `Técnica mixta con hoja metálica sobre ${surface}`,
      uk: `Змішана техніка з металевою фольгою на ${surface}`,
    },
    mixed: {
      en: `Mixed media on ${surface}`,
      es: `Técnica mixta sobre ${surface}`,
      uk: `Змішана техніка на ${surface}`,
    },
    acrylic: {
      en: `Professional acrylics on ${surface}`,
      es: `Acrílicos profesionales sobre ${surface}`,
      uk: `Професійний акрил на ${surface}`,
    },
    fallback: {
      en: `Original painting on ${surface}`,
      es: `Pintura original sobre ${surface}`,
      uk: `Оригінальна картина на ${surface}`,
    },
  };
  if (materials.includes('alcohol ink')) return templates.alcohol[lang];
  if (materials.includes('gouache')) return templates.gouache[lang];
  if (materials.includes('metallic')) return templates.metallic[lang];
  if (materials.includes('mixed')) return templates.mixed[lang];
  if (materials.includes('acrylic')) return templates.acrylic[lang];
  return templates.fallback[lang];
}

export function listingTechniqueLabel(artwork: Artwork, lang: Language = 'en'): string {
  const labels: Record<string, Localized> = {
    petrykivka: {
      en: 'Traditional Petrykivka brushwork',
      es: 'Pincelada tradicional Petrykivka',
      uk: 'Традиційний петриківський розпис',
    },
    alcohol: {
      en: 'Fluid ink technique',
      es: 'Técnica de tinta fluida',
      uk: 'Техніка рідких чорнил',
    },
    affirmation: {
      en: 'Hand-lettered mixed media',
      es: 'Técnica mixta con lettering a mano',
      uk: 'Змішана техніка з ручним леттерінгом',
    },
    impasto: {
      en: 'Impasto texture',
      es: 'Textura en impasto',
      uk: 'Фактура імпасто',
    },
  };
  if (artwork.collectionId === 'petrykivka') return labels.petrykivka[lang];
  if (artwork.collectionId === 'alcohol-ink-art') return labels.alcohol[lang];
  if (artwork.collectionId === 'affirmation-collection') return labels.affirmation[lang];
  if (
    artwork.collectionId === 'textured-and-light' ||
    artwork.collectionId === 'female-portraits' ||
    artwork.materials.toLowerCase().includes('impasto') ||
    artwork.materials.toLowerCase().includes('acrylic')
  ) {
    return labels.impasto[lang];
  }
  return artwork.technique;
}

function localizeMaterialList(raw: string, lang: Language): string {
  if (lang === 'en') return raw;
  const pairs =
    lang === 'es'
      ? ([
          ['acrylic paints', 'pinturas acrílicas'],
          ['acrylic markers', 'rotuladores acrílicos'],
          ['textured paste', 'pasta de textura'],
          ['gouache paints', 'pinturas gouache'],
          ['metallic leaf', 'hoja metálica'],
          ['alcohol ink', 'tinta de alcohol'],
          ['canvas', 'lienzo'],
          ['cotton', 'algodón'],
          ['paper', 'papel'],
          ['pine', 'pino'],
        ] as const)
      : ([
          ['acrylic paints', 'акрилові фарби'],
          ['acrylic markers', 'акрилові маркери'],
          ['textured paste', 'текстурна паста'],
          ['gouache paints', 'гуаш'],
          ['metallic leaf', 'металева фольга'],
          ['alcohol ink', 'алкогольні чорнила'],
          ['canvas', 'полотно'],
          ['cotton', 'бавовна'],
          ['paper', 'папір'],
          ['pine', 'сосна'],
        ] as const);
  let out = raw;
  for (const [en, loc] of pairs) {
    out = out.replaceAll(en, loc);
  }
  return out;
}

export function listingMaterialsFull(artwork: Artwork, lang: Language = 'en'): string {
  const materials = artwork.materials.toLowerCase();
  const surface = artwork.surface.toLowerCase();

  let raw: string;
  if (artwork.id === 'female-portraits-01' || artwork.title === 'Floral Crown') {
    raw = `${surface}, pine, cotton, acrylic paints, textured paste, acrylic markers`;
  } else if (materials.includes('alcohol ink')) {
    raw = `${surface}, alcohol ink`;
  } else if (materials.includes('gouache') && surface === 'paper') {
    raw = 'paper, cotton, gouache paints';
  } else if (materials.includes('gouache')) {
    raw = 'canvas, pine, cotton, gouache paints';
  } else if (materials.includes('metallic')) {
    raw = `${surface}, pine, cotton, acrylic paints, textured paste, metallic leaf`;
  } else {
    raw = `${surface}, pine, cotton, acrylic paints, textured paste`;
  }
  return localizeMaterialList(raw, lang);
}

const DESCRIPTIONS: Record<string, Localized> = {
  'abstract-art-01': {
    en: 'Mist Horizon is an original acrylic painting by Viktoria Paladios celebrating the hush between sky and water through layered palette-knife textures and pale cream light. A dark horizon divides cool reflection from open air, as if dawn were still deciding its color. The peaceful composition transforms a simple landscape into a poetic contemporary work that evokes stillness, distance, and quiet sophistication.',
    es: 'Mist Horizon es una pintura acrílica original de Viktoria Paladios que celebra el silencio entre el cielo y el agua mediante texturas de espátula en capas y una luz crema pálida. Un horizonte oscuro separa el reflejo frío del aire abierto, como si el amanecer aún eligiera su color. La composición serena convierte un paisaje sencillo en una obra contemporánea poética que evoca quietud, distancia y una sofisticación silenciosa.',
    uk: 'Mist Horizon — оригінальна акрилова картина Вікторії Паладіос про тишу між небом і водою: шари фактури мастихіном і бліде кремове світло. Темний горизонт ділить прохолодне віддзеркалення й відкрите повітря, ніби світанок ще обирає свій колір. Спокійна композиція перетворює простий пейзаж на поетичну сучасну роботу про тишу, відстань і стриману витонченість.',
  },
  'abstract-art-02': {
    en: 'Ember Reflection is an original acrylic painting by Viktoria Paladios capturing the last warmth of sunset through expressive impasto and delicate peach tones. A red glow gathers on dark water while a single yellow accent holds the light like a held breath. The composition turns evening into a contemporary meditation on warmth, memory, and calm.',
    es: 'Ember Reflection es una pintura acrílica original de Viktoria Paladios que captura el último calor del atardecer con impasto expresivo y delicados tonos melocotón. Un resplandor rojo se concentra sobre el agua oscura mientras un acento amarillo sostiene la luz como un aliento contenido. La composición convierte la noche en una meditación contemporánea sobre el calor, la memoria y la calma.',
    uk: 'Ember Reflection — оригінальна акрилова картина Вікторії Паладіос про останнє тепло заходу: виразне імпасто й ніжні персикові тони. Червоне світло збирається на темній воді, а жовтий акцент тримає світло, ніби затриманий подих. Композиція перетворює вечір на сучасну медитацію про тепло, пам’ять і спокій.',
  },
  'abstract-art-03': {
    en: 'City Light is an original acrylic painting by Viktoria Paladios celebrating the pulse of a city through abstracted towers and glowing interiors. Warm orange rises through dark architecture while pale symbols drift across the skyline like notes in a private language. The work transforms urban night into a poetic contemporary piece that evokes energy, intimacy, and quiet wonder.',
    es: 'City Light es una pintura acrílica original de Viktoria Paladios que celebra el pulso de una ciudad mediante torres abstractas e interiores luminosos. Un naranja cálido asciende entre la arquitectura oscura mientras símbolos pálidos cruzan el horizonte como notas de un lenguaje íntimo. La obra transforma la noche urbana en una pieza contemporánea poética que evoca energía, intimidad y asombro sereno.',
    uk: 'City Light — оригінальна акрилова картина Вікторії Паладіос про пульс міста: абстрактні вежі й світіння інтер’єрів. Теплий помаранчевий піднімається крізь темну архітектуру, а бліді знаки пливуть над лінією дахів, ніби ноти приватної мови. Робота перетворює міську ніч на поетичну сучасну річ про енергію, близькість і тихе диво.',
  },
  'abstract-art-04': {
    en: 'Day & Night is an original mixed-media painting by Viktoria Paladios celebrating duality through a single tree split between gold light and cool shadow. Two climates meet in one trunk, as if belonging could live in more than one place at once. The composition becomes a poetic contemporary symbol of home, change, and balance.',
    es: 'Day & Night es una pintura de técnica mixta original de Viktoria Paladios que celebra la dualidad en un solo árbol dividido entre luz dorada y sombra fresca. Dos climas se encuentran en un mismo tronco, como si pertenecer pudiera habitar en más de un lugar a la vez. La composición se convierte en un símbolo contemporáneo poético de hogar, cambio y equilibrio.',
    uk: 'Day & Night — оригінальна робота в змішаній техніці Вікторії Паладіос про двоїстість: одне дерево між золотим світлом і прохолодною тінню. Два клімати зустрічаються в одному стовбурі, ніби належність може жити в кількох місцях водночас. Композиція стає поетичним сучасним символом дому, змін і рівноваги.',
  },
  'abstract-art-05': {
    en: 'Patina Horizon is an original mixed-media painting by Viktoria Paladios celebrating the meeting of metal and landscape through copper texture and teal water. A dark ridge holds the light like a shoreline of memory. The work transforms an abstract horizon into a quiet contemporary piece that evokes depth, time, and refined calm.',
    es: 'Patina Horizon es una pintura de técnica mixta original de Viktoria Paladios que celebra el encuentro entre metal y paisaje con textura de cobre y agua verdeazulada. Una cresta oscura sostiene la luz como una orilla de la memoria. La obra transforma un horizonte abstracto en una pieza contemporánea serena que evoca profundidad, tiempo y calma refinada.',
    uk: 'Patina Horizon — оригінальна робота в змішаній техніці Вікторії Паладіос про зустріч металу й пейзажу: мідна фактура й бірюзова вода. Темний хребет тримає світло, ніби берег пам’яті. Робота перетворює абстрактний горизонт на тиху сучасну річ про глибину, час і витончений спокій.',
  },
  'abstract-art-06': {
    en: 'Soft Current is an original acrylic painting by Viktoria Paladios celebrating movement through mint, rose, and white in airy, layered strokes. Color travels across the canvas like water finding its path. The composition becomes a poetic contemporary work that evokes ease, breath, and gentle sophistication.',
    es: 'Soft Current es una pintura acrílica original de Viktoria Paladios que celebra el movimiento con menta, rosa y blanco en trazos aéreos y en capas. El color recorre el lienzo como el agua buscando su cauce. La composición se convierte en una obra contemporánea poética que evoca ligereza, respiración y una sofisticación suave.',
    uk: 'Soft Current — оригінальна акрилова картина Вікторії Паладіос про рух: м’ята, троянда й біле в легких шарах. Колір іде полотном, ніби вода шукає шлях. Композиція стає поетичною сучасною роботою про легкість, подих і м’яку витонченість.',
  },
  'abstract-art-07': {
    en: 'Vertical Light is an original acrylic painting by Viktoria Paladios celebrating ascent through blue, white, and earth tones stacked like architecture. Light rises in measured strokes, as if a window were opening from within the paint. The work transforms abstraction into a contemporary meditation on hope, structure, and quiet lift.',
    es: 'Vertical Light es una pintura acrílica original de Viktoria Paladios que celebra el ascenso con azules, blancos y tierras apilados como arquitectura. La luz sube en trazos medidos, como si una ventana se abriera desde dentro de la pintura. La obra transforma la abstracción en una meditación contemporánea sobre la esperanza, la estructura y una elevación serena.',
    uk: 'Vertical Light — оригінальна акрилова картина Вікторії Паладіос про підйом: сині, білі й землисті тони, складені як архітектура. Світло піднімається мірними мазками, ніби вікно відкривається зсередини фарби. Робота перетворює абстракцію на сучасну медитацію про надію, структуру й тихий злет.',
  },
  'affirmation-collection-01': {
    en: 'Soy Fuerte is an original acrylic painting by Viktoria Paladios celebrating inner strength through stylized waves and hand-lettered words. The sea carries the phrase like a vow, each crest painted with confident, contemporary rhythm. The composition becomes a poetic artwork of courage, devotion, and calm power.',
    es: 'Soy Fuerte es una pintura acrílica original de Viktoria Paladios que celebra la fuerza interior con olas estilizadas y palabras escritas a mano. El mar lleva la frase como un voto; cada cresta se pinta con ritmo contemporáneo y seguro. La composición se convierte en una obra poética de valor, devoción y poder sereno.',
    uk: 'Soy Fuerte — оригінальна акрилова картина Вікторії Паладіос про внутрішню силу: стилізовані хвилі й рукописний текст. Море несе фразу як обітницю; кожен гребінь написаний упевненим сучасним ритмом. Композиція стає поетичною роботою про мужність, відданість і спокійну силу.',
  },
  'affirmation-collection-02': {
    en: 'Shine · Love · Create is an original mixed-media painting by Viktoria Paladios celebrating a life motto written in Ukrainian — Сяй, Кохай, Твори — across soft pink light. The words rest inside the color as if they had always belonged there. The work transforms language into a contemporary symbol of joy, devotion, and making.',
    es: 'Shine · Love · Create es una pintura de técnica mixta original de Viktoria Paladios que celebra un lema de vida escrito en ucraniano — Сяй, Кохай, Твори — sobre una luz rosa suave. Las palabras habitan el color como si siempre hubieran pertenecido allí. La obra transforma el lenguaje en un símbolo contemporáneo de alegría, devoción y creación.',
    uk: 'Shine · Love · Create — оригінальна робота в змішаній техніці Вікторії Паладіос про життєве гасло українською — Сяй, Кохай, Твори — у м’якому рожевому світлі. Слова живуть у кольорі, ніби завжди там належали. Робота перетворює мову на сучасний символ радості, відданості й творення.',
  },
  'affirmation-collection-03': {
    en: 'Joy is an original acrylic painting by Viktoria Paladios celebrating gladness through a pale blue sky and clouds of lavender and peach. The word itself is painted into the atmosphere, light and unforced. The composition becomes a poetic contemporary piece that evokes serenity, warmth, and quiet happiness.',
    es: 'Joy es una pintura acrílica original de Viktoria Paladios que celebra la alegría con un cielo azul pálido y nubes de lavanda y melocotón. La palabra misma se pinta en la atmósfera, ligera y natural. La composición se convierte en una pieza contemporánea poética que evoca serenidad, calor y una felicidad callada.',
    uk: 'Joy — оригінальна акрилова картина Вікторії Паладіос про радість: блідо-блакитне небо й хмари лаванди та персика. Саме слово вписане в атмосферу легко й без напруги. Композиція стає поетичною сучасною річчю про спокій, тепло й тихе щастя.',
  },
  'affirmation-collection-04': {
    en: 'Bloom Anyway is an original acrylic painting by Viktoria Paladios celebrating resilience through pink lettering across swirling blue and plum light. The words insist on beauty even when the season is difficult. The work transforms an affirmation into a contemporary painting of hope, tenderness, and strength.',
    es: 'Bloom Anyway es una pintura acrílica original de Viktoria Paladios que celebra la resiliencia con lettering rosa sobre remolinos de luz azul y ciruela. Las palabras insisten en la belleza incluso cuando la estación es difícil. La obra transforma una afirmación en una pintura contemporánea de esperanza, ternura y fuerza.',
    uk: 'Bloom Anyway — оригінальна акрилова картина Вікторії Паладіос про стійкість: рожевий леттерінг на завитках синього й сливового світла. Слова наполягають на красі навіть у важкий сезон. Робота перетворює афірмацію на сучасну картину надії, ніжності й сили.',
  },
  'alcohol-ink-art-01': {
    en: 'Pastel Hills is an original alcohol-ink painting by Viktoria Paladios celebrating landscape as breath through rose, lavender, and yellow veils. Ink is allowed to travel, bloom, and settle into hills that feel remembered rather than mapped. The composition becomes a poetic contemporary work that evokes softness, distance, and calm.',
    es: 'Pastel Hills es una pintura original en tinta de alcohol de Viktoria Paladios que celebra el paisaje como respiración con velos de rosa, lavanda y amarillo. La tinta viaja, florece y se posa en colinas que parecen recordadas más que cartografiadas. La composición se convierte en una obra contemporánea poética que evoca suavidad, distancia y calma.',
    uk: 'Pastel Hills — оригінальна картина алкогольними чорнилами Вікторії Паладіос про пейзаж як подих: троянда, лаванда й жовті серпанки. Чорнилам дають текти, розквітати й осідати в пагорби, що більше згадані, ніж нанесені на карту. Композиція стає поетичною сучасною роботою про м’якість, відстань і спокій.',
  },
  'alcohol-ink-art-02': {
    en: 'Soft Terrain is an original alcohol-ink painting by Viktoria Paladios celebrating dusk through a pink sky over dark rolling ground. Fluid color finds its own edges, as evening does. The work transforms landscape into a contemporary meditation on quiet, warmth, and the end of day.',
    es: 'Soft Terrain es una pintura original en tinta de alcohol de Viktoria Paladios que celebra el crepúsculo con un cielo rosa sobre un suelo ondulado y oscuro. El color fluido encuentra sus propios bordes, como hace la tarde. La obra transforma el paisaje en una meditación contemporánea sobre la quietud, el calor y el fin del día.',
    uk: 'Soft Terrain — оригінальна картина алкогольними чорнилами Вікторії Паладіос про сутінки: рожеве небо над темною хвилястою землею. Рідкий колір сам знаходить краї, як і вечір. Робота перетворює пейзаж на сучасну медитацію про тишу, тепло й кінець дня.',
  },
  'alcohol-ink-art-03': {
    en: 'Ink Circle is an original alcohol-ink painting by Viktoria Paladios celebrating completeness through a luminous ring of pink, lavender, indigo, and gold. Color gathers toward the center like a held secret. The composition becomes a poetic contemporary piece that evokes harmony, intimacy, and refined calm.',
    es: 'Ink Circle es una pintura original en tinta de alcohol de Viktoria Paladios que celebra la plenitud con un anillo luminoso de rosa, lavanda, índigo y oro. El color se concentra hacia el centro como un secreto guardado. La composición se convierte en una pieza contemporánea poética que evoca armonía, intimidad y calma refinada.',
    uk: 'Ink Circle — оригінальна картина алкогольними чорнилами Вікторії Паладіос про цілісність: світле кільце троянди, лаванди, індиго й золота. Колір збирається до центру, ніби збережена таємниця. Композиція стає поетичною сучасною річчю про гармонію, близькість і витончений спокій.',
  },
  'alcohol-ink-art-04': {
    en: 'Ink Study I is an original alcohol-ink painting by Viktoria Paladios celebrating chance and control as color is invited to bloom and settle. Each tide of pigment leaves a shoreline of its own. The work transforms a studio study into a contemporary artwork of curiosity, grace, and quiet experiment.',
    es: 'Ink Study I es una pintura original en tinta de alcohol de Viktoria Paladios que celebra el azar y el control cuando se invita al color a florecer y posarse. Cada marea de pigmento deja su propia orilla. La obra transforma un estudio de taller en una pieza contemporánea de curiosidad, gracia y experimento sereno.',
    uk: 'Ink Study I — оригінальна картина алкогольними чорнилами Вікторії Паладіос про випадок і контроль: колір запрошують розквітнути й осісти. Кожна хвиля пігменту лишає свій берег. Робота перетворює студійний етюд на сучасну річ про цікавість, грацію й тихий експеримент.',
  },
  'alcohol-ink-art-05': {
    en: 'Blush Horizon is an original alcohol-ink painting by Viktoria Paladios celebrating a circular landscape through blush sky and olive hills. Ink layers build distance without hard lines. The composition becomes a poetic contemporary work that evokes memory, softness, and open air.',
    es: 'Blush Horizon es una pintura original en tinta de alcohol de Viktoria Paladios que celebra un paisaje circular con cielo sonrosado y colinas oliva. Las capas de tinta construyen distancia sin líneas duras. La composición se convierte en una obra contemporánea poética que evoca memoria, suavidad y aire abierto.',
    uk: 'Blush Horizon — оригінальна картина алкогольними чорнилами Вікторії Паладіос про круглий пейзаж: рум’яне небо й оливкові пагорби. Шари чорнил будують відстань без жорстких ліній. Композиція стає поетичною сучасною роботою про пам’ять, м’якість і відкрите повітря.',
  },
  'alcohol-ink-art-06': {
    en: 'Lavender Tide is an original alcohol-ink painting by Viktoria Paladios celebrating flow through dusty rose and sky blue moving in a circular field. Veins of color travel like water under light. The work transforms fluid technique into a contemporary piece of serenity, romance, and quiet sophistication.',
    es: 'Lavender Tide es una pintura original en tinta de alcohol de Viktoria Paladios que celebra el flujo con rosa empolvado y azul cielo en un campo circular. Las venas de color se mueven como agua bajo la luz. La obra transforma la técnica fluida en una pieza contemporánea de serenidad, romance y sofisticación callada.',
    uk: 'Lavender Tide — оригінальна картина алкогольними чорнилами Вікторії Паладіос про плинність: припорошена троянда й небесна блакить у круглому полі. Жилки кольору течуть, ніби вода під світлом. Робота перетворює текучу техніку на сучасну річ про спокій, романтику й тиху витонченість.',
  },
  'female-portraits-01': {
    en: 'Floral Crown is an original mixed-media painting by Viktoria Paladios celebrating the quiet strength of a woman through a grayscale profile and a lush, sculptural crown of flowers. Thick impasto petals in white, rose, magenta, and green bloom across her face and hair, while neon marks and a pink contour keep the work contemporary. The composition transforms the portrait into a poetic symbol of identity, beauty, and inner blossoming.',
    es: 'Floral Crown es una pintura de técnica mixta original de Viktoria Paladios que celebra la fuerza serena de una mujer con un perfil en escala de grises y una corona floral escultórica y exuberante. Pétalos de impasto en blanco, rosa, magenta y verde florecen sobre el rostro y el cabello, mientras marcas neón y un contorno rosa mantienen la obra contemporánea. La composición convierte el retrato en un símbolo poético de identidad, belleza y florecimiento interior.',
    uk: 'Floral Crown — оригінальна робота в змішаній техніці Вікторії Паладіос про тиху силу жінки: профіль у сірих тонах і пишна скульптурна квіткова корона. Густі пелюстки імпасто — білі, трояндові, маджента й зелені — розквітають на обличчі й волоссі, а неонові знаки й рожевий контур тримають роботу сучасною. Композиція перетворює портрет на поетичний символ ідентичності, краси й внутрішнього цвітіння.',
  },
  'female-portraits-02': {
    en: 'Ocean Dream is an original acrylic painting by Viktoria Paladios celebrating a woman merging with sea and sky. Tide, horizon, and figure share one breath, painted in layered, luminous color. The work becomes a poetic contemporary portrait of belonging, freedom, and quiet transformation.',
    es: 'Ocean Dream es una pintura acrílica original de Viktoria Paladios que celebra a una mujer fundiéndose con el mar y el cielo. Marea, horizonte y figura comparten un mismo aliento, pintados en color luminoso y en capas. La obra se convierte en un retrato contemporáneo poético de pertenencia, libertad y transformación serena.',
    uk: 'Ocean Dream — оригінальна акрилова картина Вікторії Паладіос про жінку, що зливається з морем і небом. Приплив, горизонт і фігура ділять один подих у шаруватих світлих кольорах. Робота стає поетичним сучасним портретом належності, свободи й тихого перетворення.',
  },
  'female-portraits-03': {
    en: 'Tiger Bloom is an original acrylic painting by Viktoria Paladios celebrating the meeting of wildness and tenderness through a woman, a tiger, and unfolding peonies. Bold color and thick petals hold both ferocity and care in a single frame. The composition becomes a poetic contemporary work of courage, beauty, and devotion.',
    es: 'Tiger Bloom es una pintura acrílica original de Viktoria Paladios que celebra el encuentro entre lo salvaje y lo tierno: una mujer, un tigre y peonías que se abren. El color audaz y los pétalos densos sostienen ferocidad y cuidado en un mismo encuadre. La composición se convierte en una obra contemporánea poética de valor, belleza y devoción.',
    uk: 'Tiger Bloom — оригінальна акрилова картина Вікторії Паладіос про зустріч дикості й ніжності: жінка, тигр і розкриті півонії. Сміливий колір і густі пелюстки тримають і лють, і турботу в одному кадрі. Композиція стає поетичною сучасною роботою про мужність, красу й відданість.',
  },
  'floral-collection-01': {
    en: 'Sunflowers is an original acrylic painting by Viktoria Paladios celebrating summer’s generosity through three blooms in a green vase against teal. Palette-knife petals catch the light as if the room were still warm from the afternoon. The composition transforms a simple still life into a poetic contemporary piece of joy, abundance, and calm.',
    es: 'Sunflowers es una pintura acrílica original de Viktoria Paladios que celebra la generosidad del verano con tres flores en un jarrón verde sobre fondo verdeazulado. Los pétalos de espátula captan la luz como si la habitación aún guardara el calor de la tarde. La composición convierte un bodegón sencillo en una pieza contemporánea poética de alegría, abundancia y calma.',
    uk: 'Sunflowers — оригінальна акрилова картина Вікторії Паладіос про щедрість літа: три квіти в зеленій вазі на бірюзовому тлі. Пелюстки мастихіном ловлять світло, ніби кімната ще тепла від дня. Композиція перетворює простий натюрморт на поетичну сучасну річ про радість, достаток і спокій.',
  },
  'floral-collection-02': {
    en: 'White Lilacs is an original acrylic painting by Viktoria Paladios celebrating perfume and memory through white blossoms in glass against deep burgundy. Delicate clusters are built with patient, luminous strokes. The work transforms a still life into a contemporary meditation on tenderness, home, and quiet luxury.',
    es: 'White Lilacs es una pintura acrílica original de Viktoria Paladios que celebra el perfume y la memoria con flores blancas en cristal sobre un burdeos profundo. Racimos delicados se construyen con trazos pacientes y luminosos. La obra transforma un bodegón en una meditación contemporánea sobre la ternura, el hogar y un lujo callado.',
    uk: 'White Lilacs — оригінальна акрилова картина Вікторії Паладіос про аромат і пам’ять: білі квіти в склі на глибокому бордо. Ніжні грона зібрані терплячими світлими мазками. Робота перетворює натюрморт на сучасну медитацію про ніжність, дім і тиху розкіш.',
  },
  'floral-collection-03': {
    en: 'Night Bouquet is an original acrylic painting by Viktoria Paladios celebrating flowers after dark through thick paint and a burgundy ground. Light finds the petals the way a lamp finds a table late in the evening. The composition becomes a poetic contemporary still life of intimacy, richness, and calm.',
    es: 'Night Bouquet es una pintura acrílica original de Viktoria Paladios que celebra las flores después del anochecer con pintura densa y un fondo burdeos. La luz encuentra los pétalos como una lámpara encuentra la mesa al final de la noche. La composición se convierte en un bodegón contemporáneo poético de intimidad, riqueza y calma.',
    uk: 'Night Bouquet — оригінальна акрилова картина Вікторії Паладіос про квіти після темряви: густа фарба й бордовий ґрунт. Світло знаходить пелюстки так, як лампа — стіл пізно ввечері. Композиція стає поетичним сучасним натюрмортом близькості, багатства й спокою.',
  },
  'inspired-by-nature-01': {
    en: 'Nature Study is an original acrylic painting by Viktoria Paladios celebrating looking closely — light, air, and distance held in paint. Observed with care and finished with contemporary restraint, the landscape keeps the freshness of being there. The work evokes presence, patience, and quiet sophistication.',
    es: 'Nature Study es una pintura acrílica original de Viktoria Paladios que celebra mirar de cerca: luz, aire y distancia sostenidos en la pintura. Observado con cuidado y rematado con contención contemporánea, el paisaje conserva la frescura de haber estado allí. La obra evoca presencia, paciencia y sofisticación serena.',
    uk: 'Nature Study — оригінальна акрилова картина Вікторії Паладіос про пильний погляд: світло, повітря й відстань, утримані в фарбі. Уважно спостережений і стримано завершений пейзаж зберігає свіжість присутності. Робота викликає відчуття присутності, терпіння й тихої витонченості.',
  },
  'inspired-by-places-01': {
    en: 'Golden Balloon is an original mixed-media painting by Viktoria Paladios celebrating travel as dream, with a golden balloon rising above a remembered place. Metallic light and soft ground turn a journey into something you can keep. The composition becomes a poetic contemporary work of wonder, freedom, and longing.',
    es: 'Golden Balloon es una pintura de técnica mixta original de Viktoria Paladios que celebra el viaje como sueño: un globo dorado se eleva sobre un lugar recordado. La luz metálica y el suelo suave convierten el trayecto en algo que se puede guardar. La composición se convierte en una obra contemporánea poética de asombro, libertad y anhelo.',
    uk: 'Golden Balloon — оригінальна робота в змішаній техніці Вікторії Паладіос про подорож як мрію: золота куля піднімається над згаданим місцем. Металеве світло й м’який ґрунт перетворюють шлях на те, що можна зберегти. Композиція стає поетичною сучасною роботою про диво, свободу й тугу.',
  },
  'petrykivka-01': {
    en: 'Kalyna Night is an original Petrykivka painting by Viktoria Paladios celebrating the kalyna berry as a living emblem of home. White fruit and leaves bloom against deep burgundy in traditional brushstrokes made contemporary. The work becomes a poetic symbol of memory, devotion, and Ukrainian beauty.',
    es: 'Kalyna Night es una pintura Petrykivka original de Viktoria Paladios que celebra la baya kalyna como emblema vivo del hogar. Frutos blancos y hojas florecen sobre un burdeos profundo con pinceladas tradicionales hechas contemporáneas. La obra se convierte en un símbolo poético de memoria, devoción y belleza ucraniana.',
    uk: 'Kalyna Night — оригінальна петриківська картина Вікторії Паладіос про калину як живий знак дому. Білі ягоди й листя розквітають на глибокому бордо традиційними мазками, зробленими сучасними. Робота стає поетичним символом пам’яті, відданості й української краси.',
  },
  'petrykivka-02': {
    en: 'Blue Bloom is an original Petrykivka painting by Viktoria Paladios celebrating a single flower opening against black, edged with orange leaves that catch the light. Classic strokes are placed with contemporary confidence. The composition evokes elegance, focus, and quiet festivity.',
    es: 'Blue Bloom es una pintura Petrykivka original de Viktoria Paladios que celebra una sola flor abriéndose sobre negro, bordeada de hojas naranja que captan la luz. Los trazos clásicos se colocan con confianza contemporánea. La composición evoca elegancia, concentración y una festividad callada.',
    uk: 'Blue Bloom — оригінальна петриківська картина Вікторії Паладіос про одну квітку на чорному, обрамлену помаранчевим листям, що ловить світло. Класичні мазки поставлені з сучасною впевненістю. Композиція викликає відчуття елегантності, зосередженості й тихого свята.',
  },
  'petrykivka-03': {
    en: 'Blue & Gold is an original Petrykivka painting by Viktoria Paladios celebrating an intimate floral sprig in Ukraine’s colors. The small format feels almost calligraphic — a note written in blossom. The work becomes a poetic contemporary piece of delicacy, heritage, and charm.',
    es: 'Blue & Gold es una pintura Petrykivka original de Viktoria Paladios que celebra un ramito floral íntimo en los colores de Ucrania. El formato pequeño parece casi caligráfico: una nota escrita en flor. La obra se convierte en una pieza contemporánea poética de delicadeza, herencia y encanto.',
    uk: 'Blue & Gold — оригінальна петриківська картина Вікторії Паладіос про інтимну квіткову гілочку в кольорах України. Малий формат майже каліграфічний — нотатка, написана цвітом. Робота стає поетичною сучасною річчю про ніжність, спадщину й шарм.',
  },
  'petrykivka-04': {
    en: 'Golden Petals is an original Petrykivka painting by Viktoria Paladios celebrating gold petal strokes among blue leaves and berry trails. Traditional rhythm meets a luminous, contemporary palette. The composition evokes celebration, craft, and the warmth of remembered gardens.',
    es: 'Golden Petals es una pintura Petrykivka original de Viktoria Paladios que celebra trazos de pétalos dorados entre hojas azules y sendas de bayas. El ritmo tradicional se encuentra con una paleta luminosa y contemporánea. La composición evoca celebración, oficio y el calor de jardines recordados.',
    uk: 'Golden Petals — оригінальна петриківська картина Вікторії Паладіос про золоті пелюсткові мазки серед синього листя й ягідних стежок. Традиційний ритм зустрічає світлу сучасну палітру. Композиція викликає відчуття свята, майстерності й тепла згаданих садів.',
  },
  'petrykivka-05': {
    en: 'Teal Peonies is an original Petrykivka painting by Viktoria Paladios celebrating spring through teal and burgundy flowers on a white ground. Each petal is placed with the light, airy touch of the tradition. The work becomes a poetic contemporary bloom of freshness, grace, and joy.',
    es: 'Teal Peonies es una pintura Petrykivka original de Viktoria Paladios que celebra la primavera con flores verdeazuladas y burdeos sobre fondo blanco. Cada pétalo se coloca con el toque ligero y aéreo de la tradición. La obra se convierte en un florecimiento contemporáneo poético de frescura, gracia y alegría.',
    uk: 'Teal Peonies — оригінальна петриківська картина Вікторії Паладіос про весну: бірюзові й бордові квіти на білому. Кожна пелюстка поставлена легким повітряним дотиком традиції. Робота стає поетичним сучасним цвітінням свіжості, грації й радості.',
  },
  'petrykivka-06': {
    en: 'Red Berry Vine is an original Petrykivka painting by Viktoria Paladios celebrating a tall climb of red blossoms, green leaves, and blue berries. The narrow format is read slowly, like a path through summer. The composition evokes abundance, craftsmanship, and quiet delight.',
    es: 'Red Berry Vine es una pintura Petrykivka original de Viktoria Paladios que celebra una trepadora alta de flores rojas, hojas verdes y bayas azules. El formato estrecho se lee despacio, como un sendero de verano. La composición evoca abundancia, oficio y un deleite callado.',
    uk: 'Red Berry Vine — оригінальна петриківська картина Вікторії Паладіос про високий виток червоних квітів, зеленого листя й синіх ягід. Вузький формат читається повільно, ніби стежка крізь літо. Композиція викликає відчуття достатку, майстерності й тихої радості.',
  },
  'petrykivka-07': {
    en: 'Garden Path is an original Petrykivka painting by Viktoria Paladios celebrating orange and blue flowers winding upward along a green stem. Classic strokes keep the movement lively and precise. The work becomes a poetic contemporary piece of growth, color, and folk elegance.',
    es: 'Garden Path es una pintura Petrykivka original de Viktoria Paladios que celebra flores naranja y azules que ascienden por un tallo verde. Los trazos clásicos mantienen el movimiento vivo y preciso. La obra se convierte en una pieza contemporánea poética de crecimiento, color y elegancia popular.',
    uk: 'Garden Path — оригінальна петриківська картина Вікторії Паладіос про помаранчеві й сині квіти, що в’ються вгору зеленим стеблом. Класичні мазки тримають рух живим і точним. Робота стає поетичною сучасною річчю про ріст, колір і народну елегантність.',
  },
  'petrykivka-08': {
    en: 'Firebird is an original Petrykivka painting by Viktoria Paladios celebrating the mythical bird rising from a black ground among ornamental florals. Tradition and story meet in a single, vivid form. The composition evokes wonder, heritage, and luminous courage.',
    es: 'Firebird es una pintura Petrykivka original de Viktoria Paladios que celebra el pájaro mítico elevándose desde un fondo negro entre florales ornamentales. Tradición e historia se encuentran en una sola forma vívida. La composición evoca asombro, herencia y un valor luminoso.',
    uk: 'Firebird — оригінальна петриківська картина Вікторії Паладіос про міфічного птаха, що піднімається з чорного тла серед орнаментальних квітів. Традиція й оповідь зустрічаються в одній яскравій формі. Композиція викликає диво, спадщину й світлу мужність.',
  },
  'petrykivka-09': {
    en: 'Flame Sprig is an original Petrykivka painting by Viktoria Paladios celebrating three flame-red flowers along a vertical stem with berries and leaves. The tall format feels like a bookmark of summer. The work becomes a poetic contemporary piece of warmth, rhythm, and craft.',
    es: 'Flame Sprig es una pintura Petrykivka original de Viktoria Paladios que celebra tres flores rojo-fuego en un tallo vertical con bayas y hojas. El formato alto parece un marcador del verano. La obra se convierte en una pieza contemporánea poética de calor, ritmo y oficio.',
    uk: 'Flame Sprig — оригінальна петриківська картина Вікторії Паладіос про три вогняно-червоні квіти на вертикальному стеблі з ягодами й листям. Високий формат — ніби закладка літа. Робота стає поетичною сучасною річчю про тепло, ритм і ремесло.',
  },
  'petrykivka-10': {
    en: 'Spiral Garden is an original Petrykivka painting by Viktoria Paladios celebrating floral motifs turning outward on a round canvas. A quieter, almost monochrome palette lets the rhythm of the strokes lead. The composition evokes meditation, balance, and refined folk beauty.',
    es: 'Spiral Garden es una pintura Petrykivka original de Viktoria Paladios que celebra motivos florales que giran hacia fuera en un lienzo redondo. Una paleta más quieta, casi monocroma, deja que lidere el ritmo de los trazos. La composición evoca meditación, equilibrio y una belleza popular refinada.',
    uk: 'Spiral Garden — оригінальна петриківська картина Вікторії Паладіос про квіткові мотиви, що розкручуються на круглому полотні. Тихіша, майже монохромна палітра дає вести ритму мазків. Композиція викликає медитацію, рівновагу й витончену народну красу.',
  },
  'plain-air-collection-01': {
    en: 'Snow Peaks is an original acrylic painting by Viktoria Paladios celebrating high distance through pale blue sky and quiet snow. The mountains are held with clear, calm color rather than noise. The work becomes a poetic contemporary landscape of stillness, air, and awe.',
    es: 'Snow Peaks es una pintura acrílica original de Viktoria Paladios que celebra la distancia alta con un cielo azul pálido y nieve serena. Las montañas se sostienen con color claro y calmado, no con ruido. La obra se convierte en un paisaje contemporáneo poético de quietud, aire y asombro.',
    uk: 'Snow Peaks — оригінальна акрилова картина Вікторії Паладіос про високу відстань: блідо-блакитне небо й тихий сніг. Гори тримаються чистим спокійним кольором, а не шумом. Робота стає поетичним сучасним пейзажем тиші, повітря й благоговіння.',
  },
  'plain-air-collection-02': {
    en: 'Plein Air II is an original acrylic painting by Viktoria Paladios celebrating painting on location — color as an immediate response to light. Fresh strokes keep the hour visible on the canvas. The composition evokes presence, weather, and the pleasure of looking.',
    es: 'Plein Air II es una pintura acrílica original de Viktoria Paladios que celebra pintar al natural: el color como respuesta inmediata a la luz. Trazos frescos mantienen la hora visible en el lienzo. La composición evoca presencia, clima y el placer de mirar.',
    uk: 'Plein Air II — оригінальна акрилова картина Вікторії Паладіос про живопис на пленері: колір як миттєва відповідь на світло. Свіжі мазки лишають годину видимою на полотні. Композиція викликає присутність, погоду й насолоду дивитися.',
  },
  'plain-air-collection-03': {
    en: 'Lavender Fields is an original acrylic painting by Viktoria Paladios celebrating purple rows leading toward gold ground and distant mountains. The landscape is both place and perfume, painted with Mediterranean warmth. The work becomes a poetic contemporary piece of travel, calm, and summer light.',
    es: 'Lavender Fields es una pintura acrílica original de Viktoria Paladios que celebra hileras púrpuras hacia tierra dorada y montañas lejanas. El paisaje es lugar y perfume a la vez, pintado con calor mediterráneo. La obra se convierte en una pieza contemporánea poética de viaje, calma y luz de verano.',
    uk: 'Lavender Fields — оригінальна акрилова картина Вікторії Паладіос про фіолетові ряди до золотої землі й далеких гір. Пейзаж — і місце, і аромат, написаний середземноморським теплом. Робота стає поетичною сучасною річчю про подорож, спокій і літнє світло.',
  },
  'plain-air-collection-04': {
    en: 'Blossom Path is an original acrylic painting by Viktoria Paladios celebrating a walk through flowering trees toward far mountains. Spring light is arranged in rows, as if the path itself were blooming. The composition evokes hope, journey, and quiet joy.',
    es: 'Blossom Path es una pintura acrílica original de Viktoria Paladios que celebra un paseo entre árboles en flor hacia montañas lejanas. La luz de primavera se ordena en hileras, como si el propio camino floreciera. La composición evoca esperanza, viaje y una alegría callada.',
    uk: 'Blossom Path — оригінальна акрилова картина Вікторії Паладіос про прогулянку крізь квітучі дерева до далеких гір. Весняне світло вишикуване рядами, ніби сама стежка цвіте. Композиція викликає надію, шлях і тиху радість.',
  },
  'pop-art-01': {
    en: 'Vibrant Spirit is an original acrylic painting by Viktoria Paladios celebrating a face that refuses to be quiet — bold color, painterly texture, and contemporary nerve. The portrait holds energy without losing warmth. The work becomes a poetic piece of character, confidence, and living color.',
    es: 'Vibrant Spirit es una pintura acrílica original de Viktoria Paladios que celebra un rostro que se niega a callar: color audaz, textura pictórica y nervio contemporáneo. El retrato sostiene energía sin perder calor. La obra se convierte en una pieza poética de carácter, confianza y color vivo.',
    uk: 'Vibrant Spirit — оригінальна акрилова картина Вікторії Паладіос про обличчя, що не хоче мовчати: сміливий колір, живописна фактура й сучасна сміливість. Портрет тримає енергію, не втрачаючи тепла. Робота стає поетичною річчю про характер, впевненість і живий колір.',
  },
  'pop-art-02': {
    en: 'Thoughts is an original mixed-media painting by Viktoria Paladios celebrating the inner life through pastel fields crossed by the handwritten word Thoughts. Mind is made visible without becoming loud. The composition evokes reflection, softness, and contemporary intimacy.',
    es: 'Thoughts es una pintura de técnica mixta original de Viktoria Paladios que celebra la vida interior con campos pastel cruzados por la palabra manuscrita Thoughts. La mente se hace visible sin volverse ruidosa. La composición evoca reflexión, suavidad e intimidad contemporánea.',
    uk: 'Thoughts — оригінальна робота в змішаній техніці Вікторії Паладіос про внутрішнє життя: пастельні поля, перетнуті рукописним словом Thoughts. Думка стає видимою, не стаючи гучною. Композиція викликає рефлексію, м’якість і сучасну близькість.',
  },
  'textured-and-light-01': {
    en: 'Halo is an original mixed-media diptych by Viktoria Paladios celebrating wholeness through a white and gold circle spanning two panels. Concentric textured lines build a quiet radiance where the canvases meet. The work becomes a poetic contemporary symbol of connection, light, and two places becoming one.',
    es: 'Halo es un díptico de técnica mixta original de Viktoria Paladios que celebra la plenitud con un círculo blanco y dorado que abarca dos paneles. Líneas texturadas concéntricas construyen un resplandor sereno donde se encuentran los lienzos. La obra se convierte en un símbolo contemporáneo poético de conexión, luz y dos lugares que se hacen uno.',
    uk: 'Halo — оригінальний диптих у змішаній техніці Вікторії Паладіос про цілісність: біло-золоте коло на двох панелях. Концентричні фактурні лінії будують тихе сяйво там, де полотна зустрічаються. Робота стає поетичним сучасним символом зв’язку, світла й двох місць, що стають одним.',
  },
  'textured-and-light-02': {
    en: 'Gold Arcs is an original mixed-media painting by Viktoria Paladios celebrating quiet architecture through textured metallic arcs on clean white ground. Each curve is built in relief, catching real light as you move. The composition evokes elegance, space, and refined calm.',
    es: 'Gold Arcs es una pintura de técnica mixta original de Viktoria Paladios que celebra una arquitectura callada con arcos metálicos texturados sobre blanco limpio. Cada curva se construye en relieve y capta la luz real al moverte. La composición evoca elegancia, espacio y calma refinada.',
    uk: 'Gold Arcs — оригінальна робота в змішаній техніці Вікторії Паладіос про тиху архітектуру: фактурні металеві дуги на чистому білому. Кожна крива збудована рельєфом і ловить справжнє світло, коли ви рухаєтесь. Композиція викликає елегантність, простір і витончений спокій.',
  },
  'textured-and-light-03': {
    en: 'Rose Cake is an original acrylic painting by Viktoria Paladios celebrating sweetness and celebration through a peach cake with roses and strawberries built in thick, luminous paint. Frosting and petals share the same sculptural joy. The work becomes a poetic contemporary still life of delight, care, and festivity.',
    es: 'Rose Cake es una pintura acrílica original de Viktoria Paladios que celebra la dulzura y la fiesta con un pastel melocotón de rosas y fresas en pintura densa y luminosa. Glaseado y pétalos comparten la misma alegría escultórica. La obra se convierte en un bodegón contemporáneo poético de deleite, cuidado y festividad.',
    uk: 'Rose Cake — оригінальна акрилова картина Вікторії Паладіос про солодощі й свято: персиковий торт із трояндами й полуницею в густій світлій фарбі. Глазур і пелюстки ділять ту саму скульптурну радість. Робота стає поетичним сучасним натюрмортом насолоди, турботи й святковості.',
  },
  'ukrainian-symbolism-01': {
    en: 'Heritage is an original acrylic painting by Viktoria Paladios celebrating a face woven with Ukrainian embroidery — memory held in the skin. Realism and folk pattern share one portrait, as if the past were still speaking. The composition becomes a poetic contemporary work of identity, devotion, and belonging.',
    es: 'Heritage es una pintura acrílica original de Viktoria Paladios que celebra un rostro tejido con bordado ucraniano: la memoria sostenida en la piel. Realismo y motivo popular comparten un mismo retrato, como si el pasado aún hablara. La composición se convierte en una obra contemporánea poética de identidad, devoción y pertenencia.',
    uk: 'Heritage — оригінальна акрилова картина Вікторії Паладіос про обличчя, вплетене в українську вишивку: пам’ять, утримана в шкірі. Реалізм і народний орнамент ділять один портрет, ніби минуле ще говорить. Композиція стає поетичною сучасною роботою про ідентичність, відданість і належність.',
  },
};

export function listingDescription(artwork: Artwork, lang: Language = 'en'): string {
  const entry = DESCRIPTIONS[artwork.id];
  if (!entry) return artwork.description;
  return entry[lang] ?? entry.en;
}

export function listingSizeValue(
  artwork: Artwork,
  kind: 'width' | 'height',
  lang: Language = 'en',
): string {
  const raw = kind === 'width' ? listingWidth(artwork) : listingHeight(artwork);
  if (raw === 'Contact') return CONTACT[lang];
  if (raw.endsWith(' inches')) {
    return raw.replace(' inches', ` ${INCHES[lang]}`);
  }
  return raw;
}

export function listingDetails(artwork: Artwork, lang: Language = 'en') {
  return [
    { label: 'Name', value: artwork.title },
    { label: 'Medium', value: listingMedium(artwork, lang) },
    { label: 'Technique', value: listingTechniqueLabel(artwork, lang) },
    { label: 'Authenticity', value: AUTHENTICITY[lang] },
    {
      label: 'Certification',
      value: artwork.certificateOfAuthenticity ? CERTIFICATION[lang] : SIGNED_ONLY[lang],
    },
    { label: 'Materials', value: listingMaterialsFull(artwork, lang) },
    { label: 'Width', value: listingSizeValue(artwork, 'width', lang) },
    { label: 'Height', value: listingSizeValue(artwork, 'height', lang) },
  ];
}
