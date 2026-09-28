# Rate card — owner to confirm

**How to use this:** every cell holds the most common value on the legacy site followed by **"?"**. A cell that is just "?" means the legacy site never gave a number. Correct the number and delete the "?". Leave the "?" where you're unsure.

The fare engine reads only numbers with the "?" removed. Until every cell a fare needs is confirmed, `pricing.status` stays `'draft'` and the site shows "Estimated fare". Where legacy pages disagree, the other values are in the Notes column (full detail: `docs/AUDIT.md §4`).

All amounts are ₹. "km/day" = minimum km charged per day.

---

## 1. Global rules

| Rule | Value | Notes |
|---|---|---|
| GST rate | ? | Legacy says only "GST … extra" (4 pages) |
| GST included in quoted totals? | no? | Legacy: extra |
| Tolls included in the all-inclusive total? | yes? | Legacy lists tolls as extra; the new site promises all-inclusive totals |
| State permit / state tax included? | yes? | Legacy: extra |
| Parking | always excluded? | Plan default |
| Nepal border charges (Bhansar etc.) included? | ? | See OWNER_TODO D2 |
| Night-charge window | 10 PM – 6 AM? | S-Class page says 9:30 PM – 6:30 AM |
| Km counted garage to garage? | yes? | Legacy says this on most outstation offers |
| Maximum driving km per day (sets round-trip days) | ? | |
| One-way trips: minimum km | ? | |
| Airport transfers: fixed fare or minimum km | ? | Legacy: "₹300 base" |
| Round totals to the nearest | 10? | Plan default |

## 2. Vehicle classes (priced by the fare engine)

Results show "Class — models or similar".

| Class | Representative models | Seats | Luggage | One-way ₹/km | Round-trip ₹/km | Min km/day | Driver allowance/day | Night charge | Local 6h/60 km | Local 8h/80 km | Local 12h/120 km | Extra km | Extra hour | Toll class | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hatchback | WagonR | 4? | ? | ? | 10? | 200? | ? | 200? | ? | ? | ? | 10? | ? | car? | |
| Sedan | Dzire, Etios | 4? | 3? | 14? | 10? | 200? | ? | 200? | ? | ? | ? | 10? | ? | car? | One-way route tables tie 14/20. Dzire round trip also shown as 8, 11, 12. ₹1,200/day on car-rental pages |
| Premium sedan | Honda City, Hyundai Verna | 4? | ? | ? | 20? | 200? | ? | 300? | ? | ? | ? | ? | ? | car? | Verna ₹1,400/day on car-rental |
| MUV | Ertiga | 6? | 4? | 16? | 12? | ? | ? | ? | ? | ? | ? | ? | ? | car? | One-way route tables tie 16/22. ₹12/km, ₹1,800/day on car-rental-service. No vehicle page yet |
| SUV | Mahindra Scorpio | 7? | ? | ? | 16? | 250? | ? | 400? | 2,200? | 2,800? | 3,200? | ? | ? | car? | |
| MPV | Innova Crysta | 7? | 4? | 18? | 14? | 250? | ? | 300? | 2,000? | 2,600? | 3,000? | ? | ? | car? | One-way route tables tie 18/35. ₹18/km on car-rental-service and the Nepal page |
| Premium SUV | Toyota Fortuner, Mahindra XUV700 | 7? | ? | ? | 40? | 200? | ? | 500? | ? | 4,000? | ? | 40? | 400? | car? | XUV700 ₹38/km. Fortuner ₹25/km on the Nepal page |
| Open 4×4 | Maruti Gypsy, Jeep | 4? | ? | ? | 25? | 200? | ? | 300? | ? | ? | ? | 25? | 250? | car? | Jeep ₹30/km, night ₹400, extra hour ₹300. Mostly for shoots — enquire only? |
| Tempo traveller 13 | Force Traveller 13-seater | 13? | ? | ? | 24? | ? | ? | ? | ? | ? | ? | ? | ? | lcv? | Hub page says max 12 passengers. Airport page: tempo ₹20/km |
| Tempo traveller 17 | Force Traveller 17-seater | 17? | ? | ? | 26? | ? | ? | ? | ? | ? | ? | ? | ? | lcv? | Hub page says max 16 passengers |
| Tempo traveller 20 | Force Traveller 20-seater | 20? | ? | ? | 30? | ? | ? | ? | ? | ? | ? | ? | ? | lcv? | Hub page says max 19 passengers |
| Tempo traveller 26 | 26-seater mini bus | 25? | ? | ? | 35? | ? | ? | ? | ? | ? | ? | ? | ? | lcv? | |
| Urbania 13 | Force Urbania 13-seater | 13? | ? | ? | 25? | ? | ? | ? | ? | ? | ? | ? | ? | lcv? | Home page: "Force Urbania 10–13 seater ₹25/km" |
| Urbania 17 | Force Urbania 17-seater | 17? | ? | ? | ? | ? | ? | ? | ? | ? | ? | ? | ? | lcv? | |
| Winger | Tata Winger | 12? | ? | ? | 20? | ? | ? | ? | ? | ? | ? | ? | ? | lcv? | Home page only; no vehicle page |

## 3. Buses (enquiry; "from" price only when confirmed)

| Bus | Seats | ₹/km | Min km/day | Local 8h/80 km | Extra hour | Night charge | Driver allowance | Notes |
|---|---|---|---|---|---|---|---|---|
| 2×2 luxury AC bus | 45? | 65? | 300? | 12,000? | 1,500? | 500? | included? | 2-2-ac-bus page: min 250 km/day |
| 3×2 luxury AC bus | 50? | 65? | 300? | 12,000? | 1,500? | ? | included? | Identical to 2×2 on legacy — likely copy-paste |
| Non-AC bus | 50? | 45? | 250? | 9,000? | ? | ? | included? | |
| AC sleeper bus | ? | 75? | 300? | ? | ? | ? | included? | |
| Non-AC sleeper bus | ? | 55? | 300? | ? | ? | ? | included? | |
| Volvo bus | 30? | 28? | ? | ? | ? | ? | ? | Home page only ("30–35 seater") |

## 4. Luxury and vintage — per model, "Enquire"

The wedding package is a fixed price for the stated hours.

| Model | Seats | Wedding hours | Wedding price | Wedding extra hour | Outstation ₹/km | Min km/day | Corporate package | Corporate price | Night charge | Washing | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BMW 320d | 4? | 16? | 12,000? | 500? | 60? | 200? | 8h/80 km? | 8,000? | 500? | 500? | Own page: "Call for price" |
| BMW 520d | 4? | 16? | 20,000? | 500? | 90? | 200? | 8h/80 km? | 15,000? | 500? | 500? | Home: 16,000 / ₹80 / 8,000 |
| BMW X1 | 4? | 16? | 12,000? | 500? | 60? | 200? | 8h/80 km? | 8,000? | 500? | 500? | Own page: "Call for price" |
| BMW convertible (model?) | 2? | 16? | 25,000? | 500? | 100? | 250? | 8h/80 km? | 15,000? | 500? | 500? | Legacy "MZ"; image "M"; car-rental "Z4" |
| Audi A4 | 4? | 14? | 8,000? | 500? | 70? | 200? | 8h/80 km? | 8,000? | 500? | 500? | |
| Audi A6 | 4? | 14? | 16,000? | 500? | 80? | 200? | 8h/80 km? | 8,000? | 500? | 500? | |
| Audi A8 | 4? | 14? | 25,000? | 500? | 100? | 250? | 8h/80 km? | 8,000? | 500? | 500? | Corporate same as A4 — likely wrong |
| Audi Q3 | 4? | 14? | 8,000? | 500? | 80? | 200? | 8h/80 km? | 8,000? | 500? | 500? | |
| Audi Q5 | 4? | 14? | 16,000? | 500? | 80? | 200? | 8h/80 km? | 8,000? | 500? | 500? | |
| Audi Q7 | 6? | 14? | 25,000? | 500? | 100? | 250? | 8h/80 km? | 8,000? | 500? | 500? | Home card: 5 seats, corporate blank |
| Mercedes C-Class | 4? | 16? | 12,000? | 500? | 60? | 200? | 8h/60 km? | 8,000? | 500? | 500? | |
| Mercedes E-Class | 4? | 16? | 16,000? | 500? | 80? | 200? | 8h/80 km? | 8,000? | 500? | 500? | |
| Mercedes S-Class | 4? | 16? | 25,000? | 500? | 100? | 250? | 8h/80 km? | 8,000? | 500? | 500? | Own page: ₹50/km, local 8h/80 ₹8,000+ |
| Mercedes Maybach | 4? | 16? | 30,000? | 1,000? | 120? | 250? | 8h/80 km? | 25,000? | 500? | 800? | |
| Mercedes SLK | 2? | ? | ? | ? | ? | ? | ? | ? | ? | 500? | Home card: all blank. ₹9,000/day on car-rental |
| Jaguar XE | 4? | 16? | 10,000? | 500? | 55? | 200? | 8h/60 km? | 7,500? | 500? | 500? | Home: 25,000 / ₹100 / 15,000 |
| Jaguar XF | 4? | 16? | 14,000? | 500? | 70? | 200? | 8h/60 km? | 8,000? | 500? | 500? | Home: 30,000 / ₹120 / 25,000 |
| Jaguar XJL | 4? | 16? | 18,000? | 500? | 85? | 200? | 8h/60 km? | 10,000? | 500? | 500? | Home card blank |
| Vintage classic car (model?) | 4? | ? | 15,000? | ? | ? | ? | ? | ? | ? | ? | Wedding page "Royal vintage ₹15,000/day"; Ambassador ₹3,000/day (election) |
| Vintage luxury car (model?) | 4? | ? | 15,000? | ? | ? | ? | ? | ? | ? | ? | |

## 5. Bikes and scooters — per model

Every legacy bike price is blank. Only the km limits were filled in.

| Model | Per day | Per week | Per month | Km limit/day | Km limit/month | Deposit |
|---|---|---|---|---|---|---|
| Honda Activa 110 | ? | ? | ? | 100? | 2,500? | ? |
| TVS "Duet" (model?) | ? | ? | ? | 100? | 1,500? | ? |
| Yamaha Fascino | ? | ? | ? | 100? | 2,500? | ? |
| Hero Destini 125 | ? | ? | ? | 100? | 2,000? | ? |
| Hero HF Deluxe | ? | ? | ? | ? | ? | ? |
| Hero Passion Pro | ? | ? | ? | 100? | ? | ? |
| Bajaj Discover 125 | ? | ? | ? | 100? | 2,500? | ? |
| Bajaj Pulsar 150 | ? | ? | ? | 100? | 2,800? | ? |
| Hero Xtreme 160 | ? | ? | ? | 100? | 2,500? | ? |
| Bajaj Avenger 220 | ? | ? | ? | 150? | 3,000? | ? |
| Royal Enfield Classic 350 | ? | ? | ? | 150? | 3,200? | ? |
| Royal Enfield Thunderbird 350 | ? | ? | ? | 150? | 3,500? | ? |
| Jawa Classic | ? | ? | ? | 150? | 3,000? | ? |

---

## 6. Which vehicles do you actually run? (OWNER_TODO B3)

Tick what you own or can reliably supply. Anything unticked won't appear on the new site. Its legacy page redirects to the matching hub.

**Cars with a legacy page**
- [ ] Maruti WagonR
- [ ] Maruti Swift Dzire
- [ ] Honda City
- [ ] Hyundai Verna
- [ ] Toyota Innova Crysta
- [ ] Toyota Fortuner
- [ ] Mahindra Scorpio
- [ ] Mahindra XUV700
- [ ] Maruti Gypsy
- [ ] Jeep — model: ________
- [ ] BMW 320d
- [ ] BMW 520d
- [ ] BMW X1
- [ ] BMW convertible — model: ________
- [ ] Audi A4
- [ ] Audi A6
- [ ] Audi A8
- [ ] Audi Q3
- [ ] Audi Q5
- [ ] Audi Q7
- [ ] Mercedes C-Class
- [ ] Mercedes E-Class
- [ ] Mercedes S-Class
- [ ] Mercedes Maybach — model: ________
- [ ] Mercedes SLK
- [ ] Jaguar XE
- [ ] Jaguar XF
- [ ] Jaguar XJL
- [ ] Vintage classic car — make/model: ________
- [ ] Vintage luxury car — make/model: ________

**Cars named on the legacy site without a page**
- [ ] Maruti Ertiga
- [ ] Toyota Etios
- [ ] Toyota Hiace ("only for Nepal")
- [ ] Toyota Hilux
- [ ] Land Rover Defender
- [ ] Mahindra Thar
- [ ] Range Rover
- [ ] Ford Endeavour
- [ ] BMW X3
- [ ] Audi A5 convertible
- [ ] Jaguar F-Type
- [ ] Hindustan Ambassador (white / black)
- [ ] Vintage open Jeep
- [ ] Bentley Continental
- [ ] Bentley Mulsanne
- [ ] Rolls-Royce Phantom
- [ ] GMC Yukon Denali
- [ ] Decorated hatchbacks for weddings (Swift, i20, Baleno)

**Group vehicles**
- [ ] Tempo traveller 13-seater
- [ ] Tempo traveller 17-seater
- [ ] Tempo traveller 20-seater
- [ ] Tempo traveller 26-seater
- [ ] Force Urbania 13-seater
- [ ] Force Urbania 17-seater
- [ ] Tata Winger
- [ ] Volvo bus
- [ ] 2×2 luxury AC bus
- [ ] 3×2 luxury AC bus
- [ ] Non-AC bus
- [ ] AC sleeper bus
- [ ] Non-AC sleeper bus

**Bikes and scooters with a legacy page**
- [ ] Honda Activa 110
- [ ] TVS "Duet" — actual model: ________
- [ ] Yamaha Fascino
- [ ] Hero Destini 125
- [ ] Hero HF Deluxe
- [ ] Hero Passion Pro
- [ ] Hero Xtreme 160
- [ ] Bajaj Discover 125
- [ ] Bajaj Pulsar 150
- [ ] Bajaj Avenger 220
- [ ] Royal Enfield Classic 350
- [ ] Royal Enfield Thunderbird 350
- [ ] Jawa Classic

**Off-road bikes named without a page** (`off-road-bikes.html`)
- [ ] Royal Enfield Himalayan
- [ ] KTM Duke 390
- [ ] Honda CB350
- [ ] Bajaj Dominar 400
- [ ] TVS Apache RTR 200
- [ ] Yamaha FZ25
- [ ] Hero Xpulse 200
- [ ] Suzuki Gixxer 250

**Self-drive:** write "SD" next to any ticked car you also rent out self-drive.
