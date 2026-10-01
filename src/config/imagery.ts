import { images } from '@/data/images.generated'

/**
 * Which picture goes where (owner decision 2026-09-30: use the old site's
 * images, labelled "representative image", until Taxiverz's own photos arrive,
 * F1). Only images without baked-in captions and of the right model; no cars
 * the fleet doesn't offer (the supercar and Rolls-Royce shoot renders are not
 * used). Swap a key here to change a picture site-wide.
 */
export type ImageKey = keyof typeof images

/**
 * Scenery photos from Unsplash (free to use under the Unsplash License;
 * credit given on the page). Real places, not Taxiverz vehicles, so no
 * "representative" label. Files in public/images/scenes/ (docs/IMAGE_MAP.md).
 */
export interface Scene {
  src: string
  alt: string
  width: number
  height: number
  credit: string
  url: string
}
const scene = (
  name: string,
  width: number,
  height: number,
  alt: string,
  credit: string,
  id: string,
): Scene => ({
  src: `/images/scenes/${name}.webp`,
  alt,
  width,
  height,
  credit,
  url: `https://unsplash.com/photos/${id}`,
})

export const scenes = {
  openRoad: scene(
    'open-road',
    1920,
    1440,
    'An open road through tall trees',
    'Harsh Dubey',
    'KgP6WCfyznM',
  ),
  nepalValley: scene(
    'nepal-valley',
    1920,
    887,
    'Green valley below snow peaks near Pokhara, Nepal',
    'Nirajan Dhakal',
    'WhZTCXud5Xc',
  ),
  weddingMandap: scene(
    'wedding-mandap',
    1920,
    1280,
    'A couple under a floral mandap at an Indian wedding',
    'AMISH THAKKAR',
    '7O422yG_b80',
  ),
  varanasiGhats: scene(
    'varanasi-ghats',
    1920,
    2240,
    'Boats moored below the ghats of Varanasi',
    'Srivatsan Balaji',
    'YpX8_xuV1zE',
  ),
  kathmanduValley: scene(
    'kathmandu-valley',
    1920,
    1440,
    'Kathmandu valley with the Himalaya behind',
    'NanC L',
    'laiJN3Gw1zE',
  ),
  pokharaPhewa: scene(
    'pokhara-phewa',
    1920,
    1103,
    'Boats on Phewa Lake, Pokhara',
    'Meera Pankhania',
    '7cENZhgyf7c',
  ),
  gangaAarti: scene(
    'ganga-aarti',
    1920,
    2880,
    'Priests with oil lamps at the Ganga aarti, Varanasi',
    'Chandramouli Bakulapally',
    'V3kokTYkDvw',
  ),
  himalayaVillage: scene(
    'himalaya-village',
    1920,
    1280,
    'Hill village in Nepal with snow peaks behind',
    'Martin Skřivánek',
    '-sz-PCtnmFI',
  ),
  varanasiBoats: scene(
    'varanasi-boats',
    1920,
    2560,
    'Boats on the Ganga before the temples of Varanasi',
    'Srivatsan Balaji',
    'T5s48osIQTU',
  ),
  weddingCouple: scene(
    'wedding-couple',
    1920,
    2876,
    'A couple in Indian wedding clothes by a river',
    'Sean Williams',
    'd-jyMeP6uNQ',
  ),
} satisfies Record<string, Scene>
export type SceneKey = keyof typeof scenes

export const heroSlides: {
  key: string
  scene: SceneKey
  kicker: string
  heading: string
  text: string
  cta: { label: string; href: string }
}[] = [
  {
    key: 'cabs',
    scene: 'openRoad',
    kicker: 'Gorakhpur · across India · into Nepal',
    heading: 'Taxi service in Gorakhpur, across India and into Nepal',
    text: 'Cars with drivers for local hire, one-way drops, round trips and airport transfers. See the cars for your trip before you share your number.',
    cta: { label: 'Check fare', href: '/book/' },
  },
  {
    key: 'nepal',
    scene: 'nepalValley',
    kicker: 'India to Nepal by road',
    heading: 'Kathmandu, Pokhara, Lumbini and Chitwan from Gorakhpur',
    text: 'Taxis from Gorakhpur and Raxaul into Nepal. We confirm the crossing and how your journey is arranged when you book.',
    cta: { label: 'Travel to Nepal', href: '/nepal-taxi/' },
  },
  {
    key: 'weddings',
    scene: 'weddingMandap',
    kicker: 'Weddings and occasions',
    heading: 'Wedding cars, luxury cars and cars for the family',
    text: 'The groom’s car, the couple’s car and cars for the guests — booked together, with one plan and one number to call on the day.',
    cta: { label: 'Wedding cars', href: '/wedding-cars/' },
  },
  {
    key: 'pilgrimage',
    scene: 'varanasiGhats',
    kicker: 'Pilgrimages and group trips',
    heading: 'Ayodhya, Varanasi and Kushinagar, together as a group',
    text: 'Tempo travellers and Urbania for 13 to 26 people — one vehicle, one driver, everyone together for the darshan.',
    cta: { label: 'Tempo traveller hire', href: '/tempo-traveller/' },
  },
]

/** One picture per service card (keyed by service slug). */
export const serviceImages: Record<string, ImageKey> = {
  'outstation-cabs': 'fleet/toyota-fortuner-1',
  'one-way-cabs': 'fleet/toyota-etios-2',
  'airport-taxi': 'fleet/hyundai-verna-1',
  'local-car-rental': 'fleet/wagonr-1',
  'nepal-taxi': 'fleet/land-rover-defender-2',
  'tempo-traveller': 'fleet/tempo-traveller-17-seater-1',
  'corporate-car-rental': 'fleet/mercedes-e-class-1',
  'luxury-car-rental': 'fleet/mercedes-s-class-1',
  'wedding-cars': 'shoots/post-wedding-1',
  'shoot-car-rental': 'shoots/post-wedding-2',
  'bus-rental': 'fleet/volvo-bus-1',
  'self-drive-car-rental': 'fleet/mahindra-thar-2',
  'bike-rental': 'fleet/royal-enfield-classic-350-1',
}

/** One picture per vehicle class card (keyed by class slug). */
export const classImages: Record<string, ImageKey> = {
  hatchback: 'fleet/wagonr-1',
  sedan: 'fleet/toyota-etios-2',
  'premium-sedan': 'fleet/hyundai-verna-1',
  muv: 'fleet/maruti-ertiga-1',
  suv: 'fleet/mahindra-scorpio-1',
  mpv: 'fleet/innova-crysta-1',
  'premium-suv': 'fleet/toyota-fortuner-1',
  'tempo-traveller-13': 'fleet/tempo-traveller-13-seater-1',
  'tempo-traveller-17': 'fleet/tempo-traveller-17-seater-1',
  'tempo-traveller-20': 'fleet/tempo-traveller-20-seater-1',
  'tempo-traveller-26': 'fleet/tempo-traveller-26-seater-2',
  'urbania-13': 'fleet/force-urbania-13-seater-2',
  'urbania-17': 'fleet/force-urbania-17-seater-2',
  winger: 'fleet/tata-winger-1',
}

export const imageFor = (key: ImageKey) => images[key]

/** True unless the picture is Taxiverz's own photo (none are yet, F1). */
export const isRepresentativeImage = (img: { source: string }) => img.source !== 'own'

/** The label every non-own picture carries (owner decision 2026-09-30). */
export const REPRESENTATIVE_LABEL = 'Representative image'

export interface Visual {
  src: string
  alt: string
  width: number
  height: number
  /** A vehicle picture that isn't Taxiverz's own photo: labelled on the page. */
  representative: boolean
}

/** Services shown with a scenery photo instead of a vehicle picture. */
const serviceScenes: Partial<Record<string, SceneKey>> = {
  'nepal-taxi': 'nepalValley',
  'wedding-cars': 'weddingCouple',
}

/** The picture for a service card: a scene where one fits, else a representative vehicle. */
export function serviceVisual(slug: string): Visual | null {
  const sceneKey = serviceScenes[slug]
  if (sceneKey) {
    const s = scenes[sceneKey]
    return { src: s.src, alt: s.alt, width: s.width, height: s.height, representative: false }
  }
  const key = serviceImages[slug]
  if (!key) return null
  const img = images[key]
  return {
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
    representative: isRepresentativeImage(img),
  }
}

/**
 * Page heroes with a real photo of the place: only where the photo shows that
 * place (or its immediate surroundings). Everything else keeps the plain hero.
 */
export const serviceHeroScenes: Partial<Record<string, SceneKey>> = {
  'nepal-taxi': 'nepalValley',
  'wedding-cars': 'weddingMandap',
}
export const placeScenes: Partial<Record<string, SceneKey>> = {
  kathmandu: 'kathmanduValley',
  nagarkot: 'kathmanduValley',
  pokhara: 'pokharaPhewa',
  varanasi: 'varanasiBoats',
}
export const sceneFor = (key: SceneKey | undefined): Scene | null => (key ? scenes[key] : null)
