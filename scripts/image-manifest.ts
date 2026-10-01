/**
 * Which legacy images migrate, where to, and what they are. Input is the
 * 2026-08-03 cleanup (legacy/cleanup-2026-08-03/img: compressed, cleaned names).
 *
 * Tags come from viewing every image (Phase 2, docs/IMAGE_MAP.md):
 *   source  own     = owner-confirmed photo of a Taxiverz vehicle (none yet — F1)
 *           render  = AI/3D render or composited studio image
 *           stock   = manufacturer or stock photograph / cut-out
 *           unknown = photo that could be the owner's own; needs the owner
 *   bakedInText   = a caption bar or label is part of the pixels
 *   modelMismatch = the picture shows a different model than the page it serves
 */
export type Source = 'own' | 'stock' | 'render' | 'unknown'

export interface ManifestEntry {
  /** File name in legacy/cleanup-2026-08-03/img */
  file: string
  /** Output key → public/images/{key}.webp */
  key: string
  alt: string
  source: Source
  bakedInText?: boolean
  /** The caption is a bar along the bottom: crop it off at migration (then the image is clean). */
  cropCaption?: boolean
  modelMismatch?: boolean
  note?: string
}

const r = (
  file: string,
  key: string,
  alt: string,
  extra: Partial<ManifestEntry> = {},
): ManifestEntry => ({
  file,
  key,
  alt,
  source: 'render',
  ...extra,
})
const s = (
  file: string,
  key: string,
  alt: string,
  extra: Partial<ManifestEntry> = {},
): ManifestEntry => ({
  file,
  key,
  alt,
  source: 'stock',
  ...extra,
})
/** Name bar along the bottom, cropped off by migrate-images (owner decision 2026-10-01). */
const cap = { bakedInText: true, cropCaption: true }

export const manifest: ManifestEntry[] = [
  // ---- standard cars
  r('wagnor.png', 'fleet/wagonr-1', 'White Maruti WagonR'),
  r('car10.jpeg', 'fleet/swift-dzire-1', 'White Maruti Swift Dzire', cap),
  r('city.jpeg', 'fleet/honda-city-1', 'White Honda City', cap),
  r('verna.png', 'fleet/hyundai-verna-1', 'White Hyundai Verna'),
  s('car7.jpeg', 'fleet/innova-crysta-1', 'White Toyota Innova Crysta'),
  s('car8.jpeg', 'fleet/innova-crysta-2', 'White Toyota Innova (earlier model)', {
    modelMismatch: true,
    note: 'Earlier Innova, not the Crysta; the legacy Innova Crysta page used this one.',
  }),
  s('car9.jpeg', 'fleet/toyota-fortuner-1', 'White Toyota Fortuner'),
  r('scorpio.png', 'fleet/mahindra-scorpio-1', 'White Mahindra Scorpio'),
  r('xuv-700.jpg', 'fleet/mahindra-xuv700-1', 'White Mahindra XUV700'),
  r('jeep.png', 'fleet/maruti-gypsy-1', 'White Maruti Gypsy with a hard top', {
    note: 'Legacy filename says "jeep" but the image is a Gypsy; the legacy Gypsy page used it.',
  }),
  r('gypsy.jpeg', 'fleet/jeep-1', 'White open-top jeep', {
    note: 'Legacy filename says "gypsy" but the image is an open jeep; the legacy Jeep page used it.',
  }),
  r('car5.jpeg', 'fleet/maruti-ertiga-1', 'White Maruti Ertiga', cap),
  r('etios1.jpeg', 'fleet/toyota-etios-1', 'White Toyota Etios', cap),
  s('toyota-etios1.png', 'fleet/toyota-etios-2', 'Silver Toyota Etios'),
  r('thar.png', 'fleet/mahindra-thar-1', 'White Mahindra Thar', cap),
  s('thar1.jpg', 'fleet/mahindra-thar-2', 'Red Mahindra Thar parked on grass'),
  r('defender.png', 'fleet/land-rover-defender-1', 'White Land Rover Defender'),
  s('defender.jpg', 'fleet/land-rover-defender-2', 'Land Rover Defender on a misty road'),
  s('toyota-hilux.avif', 'fleet/toyota-hilux-1', 'White Toyota Hilux pickup'),
  s('toyota-hiace.avif', 'fleet/toyota-hiace-1', 'Silver Toyota Hiace van'),
  r('car4.jpeg', 'fleet/range-rover-1', 'White Range Rover Evoque', {
    ...cap,
    note: 'Evoque, not the full-size Range Rover.',
  }),

  // ---- luxury
  r('audi-a4.jpeg', 'fleet/audi-a4-1', 'White Audi A4', cap),
  r('audi-a6.png', 'fleet/audi-a6-1', 'White Audi A6', cap),
  r('audi8.jpeg', 'fleet/audi-a8-1', 'White Audi A8', cap),
  r('audi-q3.png', 'fleet/audi-q3-1', 'White Audi Q3'),
  r('audi-q5.png', 'fleet/audi-q5-1', 'White Audi Q5'),
  r('audi-q7.png', 'fleet/audi-q7-1', 'White Audi Q7'),
  r('car14.jpeg', 'fleet/audi-a5-convertible-1', 'White Audi convertible', cap),
  r('bmw-320d.png', 'fleet/bmw-320d-1', 'White BMW 3 Series', cap),
  r('bmw-520d.png', 'fleet/bmw-520d-1', 'White BMW sedan', {
    ...cap,
    modelMismatch: true,
    note: 'The body is a 3 Series with a "520d" plate, not a 5 Series.',
  }),
  r('bmw-x1.png', 'fleet/bmw-x1-1', 'White BMW X1', cap),
  r('bmw-m-convertible.png', 'fleet/bmw-convertible-1', 'White BMW M4 convertible', {
    ...cap,
    note: 'Shows an M4 convertible; the legacy page called it "MZ".',
  }),
  r('c-class.png', 'fleet/mercedes-c-class-1', 'White Mercedes-Benz C-Class'),
  r('e-class.png', 'fleet/mercedes-e-class-1', 'White Mercedes-Benz E-Class'),
  r('s-class.png', 'fleet/mercedes-s-class-1', 'White Mercedes-Benz S-Class'),
  r('maybach.png', 'fleet/mercedes-maybach-1', 'White Mercedes-Maybach S-Class'),
  r('slk.png', 'fleet/mercedes-slk-1', 'White Mercedes-Benz SLK roadster'),
  r('jaguar-xe.jpeg', 'fleet/jaguar-xe-1', 'White Jaguar XF', {
    ...cap,
    modelMismatch: true,
    note: 'Shows an XF (plate and body match jaguar-xf.jpeg), not the XE.',
  }),
  r('jaguar-xf.jpeg', 'fleet/jaguar-xf-1', 'White Jaguar XF', cap),
  r('jagua-xjl.jpeg', 'fleet/jaguar-xjl-1', 'White Jaguar XJ', cap),
  r('car11.jpeg', 'fleet/vintage-classic-car-1', 'White vintage saloon car', cap),
  r('car15.jpeg', 'fleet/vintage-luxury-car-1', 'Cream and black vintage open tourer', cap),

  // ---- group
  {
    file: '13-seater-1.webp',
    key: 'fleet/tempo-traveller-13-seater-1',
    alt: 'White Force Traveller parked at night',
    source: 'unknown',
    note: 'Real photograph; could be Taxiverz’s own van — ask the owner.',
  },
  r(
    '13inside-2.png',
    'fleet/tempo-traveller-13-seater-2',
    'Tempo traveller cabin with red and black reclining seats',
  ),
  r(
    '13seatingside.png',
    'fleet/tempo-traveller-13-seater-3',
    'Tempo traveller seats seen from the side',
  ),
  s('17seater.webp', 'fleet/tempo-traveller-17-seater-1', 'White Force Traveller on a highway'),
  {
    file: '17inside.jpg',
    key: 'fleet/tempo-traveller-17-seater-2',
    alt: 'Grey seats inside a tempo traveller',
    source: 'unknown',
  },
  {
    file: '17seatingside.jpg',
    key: 'fleet/tempo-traveller-17-seater-3',
    alt: 'Tempo traveller seats seen from the side',
    source: 'unknown',
  },
  s('20seater.jpg', 'fleet/tempo-traveller-20-seater-1', 'White Force Traveller'),
  r(
    '20seating.png',
    'fleet/tempo-traveller-20-seater-2',
    'Rows of grey seats inside a tempo traveller',
  ),
  {
    file: '20inside.jpg',
    key: 'fleet/tempo-traveller-20-seater-3',
    alt: 'Tempo traveller cabin with patterned seats',
    source: 'unknown',
  },
  r('26frontside.jpg', 'fleet/tempo-traveller-26-seater-1', 'White van', {
    modelMismatch: true,
    note: 'A smaller van, not a 26-seat traveller.',
  }),
  r('26inside.jpg', 'fleet/tempo-traveller-26-seater-2', 'Tempo traveller cabin with cream seats'),
  r('26seatingside.jpg', 'fleet/tempo-traveller-26-seater-3', 'Cream seats in rows'),
  r('13urbania.png', 'fleet/force-urbania-13-seater-1', 'White van', {
    modelMismatch: true,
    note: 'Not a Force Urbania.',
  }),
  r(
    '13urbaniainside-3.png',
    'fleet/force-urbania-13-seater-2',
    'Van cabin with tan captain seats and screens',
  ),
  r('13urbania-seating.png', 'fleet/force-urbania-13-seater-3', 'Tan captain seats with screens'),
  r('17urbaniafrontside.png', 'fleet/force-urbania-17-seater-1', 'White long-wheelbase van', {
    modelMismatch: true,
    note: 'Not a Force Urbania.',
  }),
  r(
    '17urbania-inside.png',
    'fleet/force-urbania-17-seater-2',
    'Van cabin with tan reclining seats',
  ),
  r(
    '17urbaniasetingside.png',
    'fleet/force-urbania-17-seater-3',
    'Tan reclining seats with screens',
  ),
  r('force-urbania.jpeg', 'fleet/force-urbania-13-seater-4', 'White van', {
    ...cap,
    modelMismatch: true,
    note: 'Captioned "Force Urbania" but shows a different van.',
  }),
  r('tata-winger.jpeg', 'fleet/tata-winger-1', 'White Tata Winger'),
  r('volvo-ac-bus.jpeg', 'fleet/luxury-bus-2x2-1', 'Brown Volvo coach'),
  r('volvo.jpeg', 'fleet/volvo-bus-1', 'White Volvo coach'),

  // ---- bikes and scooters
  r('honda-activa.png', 'fleet/honda-activa-1', 'White Honda Activa scooter'),
  r('tvs-deut.png', 'fleet/tvs-duet-1', 'Red scooter'),
  r('yemaha.png', 'fleet/yamaha-fascino-1', 'Blue Yamaha Fascino scooter'),
  r('hero-destini125.png', 'fleet/hero-destini-125-1', 'Blue Hero Destini 125 scooter'),
  r('herohfdelux.png', 'fleet/hero-hf-deluxe-1', 'Black Hero HF Deluxe motorcycle'),
  r('hero-passion-pro.png', 'fleet/hero-passion-pro-1', 'Red Hero Passion Pro motorcycle'),
  r('hero-xtreme-160.jpg', 'fleet/hero-xtreme-160r-1', 'Red Hero Xtreme 160R motorcycle'),
  r('bajaj-discover.png', 'fleet/bajaj-discover-125-1', 'Blue Bajaj Discover 125 motorcycle'),
  r('bajaj-pulsar.jpg', 'fleet/bajaj-pulsar-150-1', 'Rider on a Bajaj Pulsar at dusk'),
  r('bajaj-avenger.jpg', 'fleet/bajaj-avenger-220-1', 'Bajaj Avenger cruiser at sunset'),
  r(
    'bullet-classic-350.jpg',
    'fleet/royal-enfield-classic-350-1',
    'Green Royal Enfield Classic 350',
  ),
  r(
    'thunderbird-350.jpg',
    'fleet/royal-enfield-thunderbird-350-1',
    'Royal Enfield Thunderbird 350 by the sea',
  ),
  r('jawa-classic.jpg', 'fleet/jawa-classic-1', 'Maroon Jawa motorcycle on a city street'),

  // ---- shoots (service pages)
  r('advertisement-shoots.jpg', 'shoots/ads-and-fashion-1', 'Sports car on a lit film set'),
  r('fashion-shoots.jpg', 'shoots/ads-and-fashion-2', 'Model with a blue coupe in a photo studio'),
  r('couple-portrait-cars.jpg', 'shoots/post-wedding-1', 'Couple posing beside a white Mercedes'),
  r(
    'journey-themed-shoots.jpg',
    'shoots/post-wedding-2',
    'Couple beside a vintage off-roader in the mountains',
  ),
  r(
    'romantic-vidio-shoot.png',
    'shoots/pre-wedding-1',
    'Two white convertibles in a villa courtyard',
  ),
  r(
    'royal-luxury-cars.jpg',
    'shoots/pre-wedding-2',
    'Bride and groom beside a black Rolls-Royce at a palace',
  ),
  r(
    'music-car-rental.webp',
    'shoots/music-video-1',
    'Performer beside a supercar under stage lights',
  ),
  r(
    'movie-and-web-series-car.jpg',
    'shoots/film-and-web-series-1',
    'Film crew around a blue sports car at night',
  ),
  r('vlog-shooting.avif', 'shoots/youtube-and-vlogs-1', 'Red gull-wing sports car in a studio'),
  r('celebration.jpg', 'shoots/hub-1', 'Wedding party with a decorated vintage car'),
  r('luxury-car-photoshoot-1013220-477.avif', 'shoots/hub-2', 'Dark sports car on a city street'),
  r('vintage-classic-image.jpg', 'shoots/hub-3', 'Couple with a vintage Ambassador and jeep'),

  // ---- Nepal experiences (packages, drafts)
  r(
    'helicopterhero.png',
    'packages/nepal-helicopter-charter-1',
    'White helicopter on snow in the mountains',
  ),
  r('heli.png', 'packages/nepal-helicopter-charter-2', 'Helicopter on a helipad at dusk'),
  s(
    'mountain-flight.jpg',
    'packages/everest-mountain-flight-1',
    'Snow peaks seen from an aircraft window',
  ),
]

/** Cleanup images deliberately not migrated, with the reason (for docs/IMAGE_MAP.md). */
export const skipped: Record<string, string> = {
  'placeholder.svg': 'Cleanup placeholder graphic.',
  'taxiverz.avif': 'Logo — already in public/images/brand (Phase 1).',
  'taxiverz.jpeg': 'Car mark — the favicon was cut from the logo instead (Phase 1).',
  'carrental.jpg': 'Generic yellow Rolls-Royce banner reused on many legacy pages.',
  'caro1.jpg': 'Stock landscape (a lake in the Alps); not Taxiverz territory.',
  'caro2.jpg': 'Stock landscape (balloons over Cappadocia).',
  'caro2.jpeg': 'Ram Mandir banner with text baked in.',
  'bmw1.jpg': 'Unused headlight close-up.',
  'rr3.jpg': 'Cadillac with an aircraft; no matching vehicle.',
  'car2.jpeg': 'Mercedes GLE Coupé captioned "Mercedes Benz"; no matching vehicle.',
  'car3.jpeg': 'Jaguar captioned "Jaguar"; duplicates the Jaguar images.',
  'car6.jpeg': 'Second Audi A6 captioned image; duplicates audi-a6.',
  'car12.jpeg': 'BMW convertible captioned image; duplicates the BMW convertible.',
  'car13.jpeg': 'Mercedes convertible captioned image; no matching vehicle page.',
  'thar1.png': 'Identical to thar.png.',
  '13inside.jpg': 'Not used on any live page.',
  '13insideimage.jpg': 'Not used on any live page.',
  '13seating.jpg':
    'Collage not used on any live page (it may show a real Taxiverz van — worth asking the owner).',
  '13seating-2.jpg': 'Not used on any live page.',
}
