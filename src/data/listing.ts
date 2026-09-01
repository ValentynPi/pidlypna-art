import type { Artwork } from '../types';
import { listingHeight, listingWidth } from './artworks';

export const AUTHENTICITY = 'Original handmade artwork';
export const CERTIFICATION = 'Signed & Dated COA';

export const CUSTOMIZATIONS =
  'Custom orders are available for size and color changes, provided they are suitable for the artwork and preserve its overall appearance. Please send a message to discuss your requirements.';

export function madeToOrderText(artwork: Artwork): string {
  if (artwork.availability === 'Sold') {
    return `${artwork.title} has been sold. Upon purchase, a new original painting will be created for you in this exact style and palette. While the composition remains consistent, each brushstroke is unique, ensuring your piece is a one-of-a-kind original with its own distinct character.`;
  }
  return `This is an original handmade painting by Viktoria Paladios. A new original can also be created for you in this exact style and palette. While the composition remains consistent, each brushstroke is unique, ensuring your piece is a one-of-a-kind original with its own distinct character.`;
}

export function listingMedium(artwork: Artwork): string {
  const materials = artwork.materials.toLowerCase();
  const surface = artwork.surface.toLowerCase();
  if (materials.includes('alcohol ink')) return `Alcohol ink on ${surface}`;
  if (materials.includes('gouache')) return `Professional gouache on ${surface}`;
  if (materials.includes('metallic')) return `Mixed media with metallic leaf on ${surface}`;
  if (materials.includes('mixed')) return `Mixed media on ${surface}`;
  if (materials.includes('acrylic')) return `Professional acrylics on ${surface}`;
  return `Original painting on ${surface}`;
}

export function listingTechniqueLabel(artwork: Artwork): string {
  if (artwork.collectionId === 'petrykivka') return 'Traditional Petrykivka brushwork';
  if (artwork.collectionId === 'alcohol-ink-art') return 'Fluid ink technique';
  if (artwork.collectionId === 'affirmation-collection') return 'Hand-lettered mixed media';
  if (
    artwork.collectionId === 'textured-and-light' ||
    artwork.collectionId === 'female-portraits' ||
    artwork.materials.toLowerCase().includes('impasto')
  ) {
    return 'Impasto texture';
  }
  if (artwork.materials.toLowerCase().includes('acrylic')) return 'Impasto texture';
  return artwork.technique;
}

export function listingMaterialsFull(artwork: Artwork): string {
  const materials = artwork.materials.toLowerCase();
  const surface = artwork.surface.toLowerCase();

  if (artwork.id === 'female-portraits-01' || artwork.title === 'Floral Crown') {
    return `${surface}, pine, cotton, acrylic paints, textured paste, acrylic markers`;
  }
  if (materials.includes('alcohol ink')) {
    return `${surface}, alcohol ink`;
  }
  if (materials.includes('gouache') && surface === 'paper') {
    return 'paper, cotton, gouache paints';
  }
  if (materials.includes('gouache')) {
    return 'canvas, pine, cotton, gouache paints';
  }
  if (materials.includes('metallic')) {
    return `${surface}, pine, cotton, acrylic paints, textured paste, metallic leaf`;
  }
  return `${surface}, pine, cotton, acrylic paints, textured paste`;
}

const DESCRIPTIONS: Record<string, string> = {
  'abstract-art-01':
    'Mist Horizon is an original acrylic painting by Viktoria Paladios celebrating the hush between sky and water through layered palette-knife textures and pale cream light. A dark horizon divides cool reflection from open air, as if dawn were still deciding its color. The peaceful composition transforms a simple landscape into a poetic contemporary work that evokes stillness, distance, and quiet sophistication.',
  'abstract-art-02':
    'Ember Reflection is an original acrylic painting by Viktoria Paladios capturing the last warmth of sunset through expressive impasto and delicate peach tones. A red glow gathers on dark water while a single yellow accent holds the light like a held breath. The composition turns evening into a contemporary meditation on warmth, memory, and calm.',
  'abstract-art-03':
    'City Light is an original acrylic painting by Viktoria Paladios celebrating the pulse of a city through abstracted towers and glowing interiors. Warm orange rises through dark architecture while pale symbols drift across the skyline like notes in a private language. The work transforms urban night into a poetic contemporary piece that evokes energy, intimacy, and quiet wonder.',
  'abstract-art-04':
    'Day & Night is an original mixed-media painting by Viktoria Paladios celebrating duality through a single tree split between gold light and cool shadow. Two climates meet in one trunk, as if belonging could live in more than one place at once. The composition becomes a poetic contemporary symbol of home, change, and balance.',
  'abstract-art-05':
    'Patina Horizon is an original mixed-media painting by Viktoria Paladios celebrating the meeting of metal and landscape through copper texture and teal water. A dark ridge holds the light like a shoreline of memory. The work transforms an abstract horizon into a quiet contemporary piece that evokes depth, time, and refined calm.',
  'abstract-art-06':
    'Soft Current is an original acrylic painting by Viktoria Paladios celebrating movement through mint, rose, and white in airy, layered strokes. Color travels across the canvas like water finding its path. The composition becomes a poetic contemporary work that evokes ease, breath, and gentle sophistication.',
  'abstract-art-07':
    'Vertical Light is an original acrylic painting by Viktoria Paladios celebrating ascent through blue, white, and earth tones stacked like architecture. Light rises in measured strokes, as if a window were opening from within the paint. The work transforms abstraction into a contemporary meditation on hope, structure, and quiet lift.',
  'affirmation-collection-01':
    'Soy Fuerte is an original acrylic painting by Viktoria Paladios celebrating inner strength through stylized waves and hand-lettered words. The sea carries the phrase like a vow, each crest painted with confident, contemporary rhythm. The composition becomes a poetic artwork of courage, devotion, and calm power.',
  'affirmation-collection-02':
    'Shine · Love · Create is an original mixed-media painting by Viktoria Paladios celebrating a life motto written in Ukrainian — Сяй, Кохай, Твори — across soft pink light. The words rest inside the color as if they had always belonged there. The work transforms language into a contemporary symbol of joy, devotion, and making.',
  'affirmation-collection-03':
    'Joy is an original acrylic painting by Viktoria Paladios celebrating gladness through a pale blue sky and clouds of lavender and peach. The word itself is painted into the atmosphere, light and unforced. The composition becomes a poetic contemporary piece that evokes serenity, warmth, and quiet happiness.',
  'affirmation-collection-04':
    'Bloom Anyway is an original acrylic painting by Viktoria Paladios celebrating resilience through pink lettering across swirling blue and plum light. The words insist on beauty even when the season is difficult. The work transforms an affirmation into a contemporary painting of hope, tenderness, and strength.',
  'alcohol-ink-art-01':
    'Pastel Hills is an original alcohol-ink painting by Viktoria Paladios celebrating landscape as breath through rose, lavender, and yellow veils. Ink is allowed to travel, bloom, and settle into hills that feel remembered rather than mapped. The composition becomes a poetic contemporary work that evokes softness, distance, and calm.',
  'alcohol-ink-art-02':
    'Soft Terrain is an original alcohol-ink painting by Viktoria Paladios celebrating dusk through a pink sky over dark rolling ground. Fluid color finds its own edges, as evening does. The work transforms landscape into a contemporary meditation on quiet, warmth, and the end of day.',
  'alcohol-ink-art-03':
    'Ink Circle is an original alcohol-ink painting by Viktoria Paladios celebrating completeness through a luminous ring of pink, lavender, indigo, and gold. Color gathers toward the center like a held secret. The composition becomes a poetic contemporary piece that evokes harmony, intimacy, and refined calm.',
  'alcohol-ink-art-04':
    'Ink Study I is an original alcohol-ink painting by Viktoria Paladios celebrating chance and control as color is invited to bloom and settle. Each tide of pigment leaves a shoreline of its own. The work transforms a studio study into a contemporary artwork of curiosity, grace, and quiet experiment.',
  'alcohol-ink-art-05':
    'Blush Horizon is an original alcohol-ink painting by Viktoria Paladios celebrating a circular landscape through blush sky and olive hills. Ink layers build distance without hard lines. The composition becomes a poetic contemporary work that evokes memory, softness, and open air.',
  'alcohol-ink-art-06':
    'Lavender Tide is an original alcohol-ink painting by Viktoria Paladios celebrating flow through dusty rose and sky blue moving in a circular field. Veins of color travel like water under light. The work transforms fluid technique into a contemporary piece of serenity, romance, and quiet sophistication.',
  'female-portraits-01':
    'Floral Crown is an original mixed-media painting by Viktoria Paladios celebrating the quiet strength of a woman through a grayscale profile and a lush, sculptural crown of flowers. Thick impasto petals in white, rose, magenta, and green bloom across her face and hair, while neon marks and a pink contour keep the work contemporary. The composition transforms the portrait into a poetic symbol of identity, beauty, and inner blossoming.',
  'female-portraits-02':
    'Ocean Dream is an original acrylic painting by Viktoria Paladios celebrating a woman merging with sea and sky. Tide, horizon, and figure share one breath, painted in layered, luminous color. The work becomes a poetic contemporary portrait of belonging, freedom, and quiet transformation.',
  'female-portraits-03':
    'Tiger Bloom is an original acrylic painting by Viktoria Paladios celebrating the meeting of wildness and tenderness through a woman, a tiger, and unfolding peonies. Bold color and thick petals hold both ferocity and care in a single frame. The composition becomes a poetic contemporary work of courage, beauty, and devotion.',
  'floral-collection-01':
    'Sunflowers is an original acrylic painting by Viktoria Paladios celebrating summer’s generosity through three blooms in a green vase against teal. Palette-knife petals catch the light as if the room were still warm from the afternoon. The composition transforms a simple still life into a poetic contemporary piece of joy, abundance, and calm.',
  'floral-collection-02':
    'White Lilacs is an original acrylic painting by Viktoria Paladios celebrating perfume and memory through white blossoms in glass against deep burgundy. Delicate clusters are built with patient, luminous strokes. The work transforms a still life into a contemporary meditation on tenderness, home, and quiet luxury.',
  'floral-collection-03':
    'Night Bouquet is an original acrylic painting by Viktoria Paladios celebrating flowers after dark through thick paint and a burgundy ground. Light finds the petals the way a lamp finds a table late in the evening. The composition becomes a poetic contemporary still life of intimacy, richness, and calm.',
  'inspired-by-nature-01':
    'Nature Study is an original acrylic painting by Viktoria Paladios celebrating looking closely — light, air, and distance held in paint. Observed with care and finished with contemporary restraint, the landscape keeps the freshness of being there. The work evokes presence, patience, and quiet sophistication.',
  'inspired-by-places-01':
    'Golden Balloon is an original mixed-media painting by Viktoria Paladios celebrating travel as dream, with a golden balloon rising above a remembered place. Metallic light and soft ground turn a journey into something you can keep. The composition becomes a poetic contemporary work of wonder, freedom, and longing.',
  'petrykivka-01':
    'Kalyna Night is an original Petrykivka painting by Viktoria Paladios celebrating the kalyna berry as a living emblem of home. White fruit and leaves bloom against deep burgundy in traditional brushstrokes made contemporary. The work becomes a poetic symbol of memory, devotion, and Ukrainian beauty.',
  'petrykivka-02':
    'Blue Bloom is an original Petrykivka painting by Viktoria Paladios celebrating a single flower opening against black, edged with orange leaves that catch the light. Classic strokes are placed with contemporary confidence. The composition evokes elegance, focus, and quiet festivity.',
  'petrykivka-03':
    'Blue & Gold is an original Petrykivka painting by Viktoria Paladios celebrating an intimate floral sprig in Ukraine’s colors. The small format feels almost calligraphic — a note written in blossom. The work becomes a poetic contemporary piece of delicacy, heritage, and charm.',
  'petrykivka-04':
    'Golden Petals is an original Petrykivka painting by Viktoria Paladios celebrating gold petal strokes among blue leaves and berry trails. Traditional rhythm meets a luminous, contemporary palette. The composition evokes celebration, craft, and the warmth of remembered gardens.',
  'petrykivka-05':
    'Teal Peonies is an original Petrykivka painting by Viktoria Paladios celebrating spring through teal and burgundy flowers on a white ground. Each petal is placed with the light, airy touch of the tradition. The work becomes a poetic contemporary bloom of freshness, grace, and joy.',
  'petrykivka-06':
    'Red Berry Vine is an original Petrykivka painting by Viktoria Paladios celebrating a tall climb of red blossoms, green leaves, and blue berries. The narrow format is read slowly, like a path through summer. The composition evokes abundance, craftsmanship, and quiet delight.',
  'petrykivka-07':
    'Garden Path is an original Petrykivka painting by Viktoria Paladios celebrating orange and blue flowers winding upward along a green stem. Classic strokes keep the movement lively and precise. The work becomes a poetic contemporary piece of growth, color, and folk elegance.',
  'petrykivka-08':
    'Firebird is an original Petrykivka painting by Viktoria Paladios celebrating the mythical bird rising from a black ground among ornamental florals. Tradition and story meet in a single, vivid form. The composition evokes wonder, heritage, and luminous courage.',
  'petrykivka-09':
    'Flame Sprig is an original Petrykivka painting by Viktoria Paladios celebrating three flame-red flowers along a vertical stem with berries and leaves. The tall format feels like a bookmark of summer. The work becomes a poetic contemporary piece of warmth, rhythm, and craft.',
  'petrykivka-10':
    'Spiral Garden is an original Petrykivka painting by Viktoria Paladios celebrating floral motifs turning outward on a round canvas. A quieter, almost monochrome palette lets the rhythm of the strokes lead. The composition evokes meditation, balance, and refined folk beauty.',
  'plain-air-collection-01':
    'Snow Peaks is an original acrylic painting by Viktoria Paladios celebrating high distance through pale blue sky and quiet snow. The mountains are held with clear, calm color rather than noise. The work becomes a poetic contemporary landscape of stillness, air, and awe.',
  'plain-air-collection-02':
    'Plein Air II is an original acrylic painting by Viktoria Paladios celebrating painting on location — color as an immediate response to light. Fresh strokes keep the hour visible on the canvas. The composition evokes presence, weather, and the pleasure of looking.',
  'plain-air-collection-03':
    'Lavender Fields is an original acrylic painting by Viktoria Paladios celebrating purple rows leading toward gold ground and distant mountains. The landscape is both place and perfume, painted with Mediterranean warmth. The work becomes a poetic contemporary piece of travel, calm, and summer light.',
  'plain-air-collection-04':
    'Blossom Path is an original acrylic painting by Viktoria Paladios celebrating a walk through flowering trees toward far mountains. Spring light is arranged in rows, as if the path itself were blooming. The composition evokes hope, journey, and quiet joy.',
  'pop-art-01':
    'Vibrant Spirit is an original acrylic painting by Viktoria Paladios celebrating a face that refuses to be quiet — bold color, painterly texture, and contemporary nerve. The portrait holds energy without losing warmth. The work becomes a poetic piece of character, confidence, and living color.',
  'pop-art-02':
    'Thoughts is an original mixed-media painting by Viktoria Paladios celebrating the inner life through pastel fields crossed by the handwritten word Thoughts. Mind is made visible without becoming loud. The composition evokes reflection, softness, and contemporary intimacy.',
  'textured-and-light-01':
    'Halo is an original mixed-media diptych by Viktoria Paladios celebrating wholeness through a white and gold circle spanning two panels. Concentric textured lines build a quiet radiance where the canvases meet. The work becomes a poetic contemporary symbol of connection, light, and two places becoming one.',
  'textured-and-light-02':
    'Gold Arcs is an original mixed-media painting by Viktoria Paladios celebrating quiet architecture through textured metallic arcs on clean white ground. Each curve is built in relief, catching real light as you move. The composition evokes elegance, space, and refined calm.',
  'textured-and-light-03':
    'Rose Cake is an original acrylic painting by Viktoria Paladios celebrating sweetness and celebration through a peach cake with roses and strawberries built in thick, luminous paint. Frosting and petals share the same sculptural joy. The work becomes a poetic contemporary still life of delight, care, and festivity.',
  'ukrainian-symbolism-01':
    'Heritage is an original acrylic painting by Viktoria Paladios celebrating a face woven with Ukrainian embroidery — memory held in the skin. Realism and folk pattern share one portrait, as if the past were still speaking. The composition becomes a poetic contemporary work of identity, devotion, and belonging.',
};

export function listingDescription(artwork: Artwork): string {
  return DESCRIPTIONS[artwork.id] ?? artwork.description;
}

export function listingDetails(artwork: Artwork) {
  return [
    { label: 'Name', value: artwork.title },
    { label: 'Medium', value: listingMedium(artwork) },
    { label: 'Technique', value: listingTechniqueLabel(artwork) },
    { label: 'Authenticity', value: AUTHENTICITY },
    { label: 'Certification', value: artwork.certificateOfAuthenticity ? CERTIFICATION : 'Signed' },
    { label: 'Materials', value: listingMaterialsFull(artwork) },
    { label: 'Width', value: listingWidth(artwork) },
    { label: 'Height', value: listingHeight(artwork) },
  ];
}
