import type { RouteCopy } from './types'

/**
 * Long-distance routes (E3): the owner asked for every legacy route page back
 * (2026-10-01). Old-page distances, drive times, fares, toll and refund claims,
 * "partner hotel" and GPS-tracking promises were dropped; public facts only.
 */
export const routeCopy: Record<string, RouteCopy> = {
  'gorakhpur-to-agra': {
    publish: true,
    ownerConfirmed: true,
    intro: `Agra draws people from Gorakhpur for one reason above all: the Taj Mahal, the white marble tomb Shah Jahan built for Mumtaz Mahal on the bank of the Yamuna. The city holds a good deal more, though. The red sandstone Agra Fort was the seat of Mughal power for generations, Itimad-ud-Daulah is a smaller, finely inlaid tomb often called the Baby Taj, and Akbar's tomb stands at Sikandra on the edge of town. Fatehpur Sikri, Akbar's abandoned capital, is a short drive west. Families also come for weddings, college admissions and work. Booking a car with a driver lets you leave from your own door in Gorakhpur, break the long drive where it suits you, and keep the same car for sightseeing once you arrive.`,
    routeGuide: `The drive runs west across the length of Uttar Pradesh. The usual way goes towards Lucknow first, through flat farmland, sugarcane country and a chain of district towns, and then continues west on the expressway towards Agra, which is a fast, fenced road with few villages along it. Some drivers prefer the older roads through Kanpur when there is a reason to stop there. The driver will pick the way on the day, depending on traffic and any road work.

For a family that wants an easy pace, Lucknow is the natural place to break the journey: plenty of hotels, good food, and you arrive in Agra fresh the next morning rather than late at night. Groups who prefer to push through usually stop only for meals and tea at the dhabas and food courts along the expressway.

Once in Agra, plan the Taj Mahal for early morning, when the light is soft and the queues are shorter. The monument is closed to visitors on Fridays, so do not schedule the visit for that day. Agra Fort and Itimad-ud-Daulah fit into the same day, and Mehtab Bagh across the river gives a quiet view of the Taj at sunset. Winter brings thick fog on the plains, which slows the drive and can hide the Taj at dawn, while May and June are fiercely hot for walking around marble courtyards.`,
    stops: [
      {
        name: 'Taj Mahal',
        note: 'Closed on Fridays; go at opening time for softer light and smaller crowds.',
      },
      {
        name: 'Agra Fort',
        note: 'Mughal fort of red sandstone a short way along the river from the Taj.',
      },
      {
        name: 'Itimad-ud-Daulah',
        note: 'Inlaid marble tomb on the far bank, often called the Baby Taj.',
      },
      { name: 'Mehtab Bagh', note: 'Riverside garden facing the Taj, popular in the evening.' },
      {
        name: 'Fatehpur Sikri',
        note: "Akbar's deserted red sandstone capital, an easy half-day outing west of Agra.",
      },
    ],
    tips: [
      'Keep Friday clear of Taj plans, since the monument is shut to visitors that day.',
      'If you want a sunrise visit, an overnight halt before Agra makes the early start far easier.',
      'Buy petha, the local sweet, from an established shop rather than roadside stalls.',
      'Carry socks or shoe covers for walking on the marble platform in summer.',
    ],
    faqs: [
      {
        q: 'Should we stop overnight on the way to Agra?',
        a: 'For families with elders or children, yes. Lucknow is the usual halt; you reach Agra rested and can see the Taj the next morning.',
      },
      {
        q: 'Is a round trip or a one-way booking better for an Agra sightseeing tour?',
        a: 'If you want the car for local sightseeing and the drive home, a round trip keeps one car and driver with you throughout. For a one-way drop, book one way. Fares are by car class and confirmed on WhatsApp or phone.',
      },
      {
        q: 'Can the driver take us to Fatehpur Sikri as well?',
        a: 'Yes. Tell us when booking so the extra day or detour is included in the plan and the quote.',
      },
      {
        q: 'Which car is comfortable for this long drive?',
        a: 'A sedan suits two or three people with light bags. For a family of five or more, or lots of luggage, an Ertiga-class SUV or an Innova Crysta gives more legroom.',
      },
      {
        q: 'Where does the driver stay at night during a multi-day Agra trip?',
        a: 'The driver arranges his own stay near your hotel. How his night stay is charged is explained when you get your quote, so there are no surprises later.',
      },
    ],
    bestDepartureTime: 'Early morning, to reach your halt before dark',
  },

  'gorakhpur-to-dehradun': {
    publish: true,
    ownerConfirmed: true,
    intro: `Dehradun sits in the Doon Valley between the Shivalik range and the first ridges of the Garhwal Himalaya, and it is the capital of Uttarakhand. People from Gorakhpur go there for many reasons: boarding schools and colleges, the Indian Military Academy and other institutions, family who have settled in the valley, and holidays in the hills above. Mussoorie looks down on the city from its ridge, and Haridwar and Rishikesh are close enough to visit on the same trip. In town, the Forest Research Institute's colonial building and grounds, the Sahastradhara springs and the cave shrine of Tapkeshwar are the familiar sights. A private car from Gorakhpur suits families moving a student with trunks and bedding, and anyone who wants to carry on up into the hills.`,
    routeGuide: `This is a drive from the eastern plains to the foot of the mountains. The road heads west towards Lucknow, then turns north-west through Rohilkhand, the country around Bareilly and Moradabad, where the land is still flat and heavily farmed with sugarcane and wheat. Beyond Moradabad there are two broad choices: north through Najibabad to Haridwar and then up to Dehradun, or further west through the Meerut and Muzaffarnagar side and in by Roorkee. The driver chooses depending on traffic and which side of the valley you are going to.

This is too much for one comfortable day for most families. Lucknow or Bareilly makes a sensible night halt, and if you are not in a hurry, a night in Haridwar lets you see the evening aarti at Har Ki Pauri before the last short stretch into the valley.

As you near the hills the scenery changes: forest along the Shivaliks, rivers coming down wide and stony, and the air turning cooler. Dehradun itself is busy and can be slow at school opening and closing times. The monsoon, roughly July to September, brings heavy rain and the risk of landslides on hill roads to Mussoorie and beyond, so keep plans flexible then. Winter is clear and pleasant in the valley but cold at night, and the plains on the way can be foggy in the early morning.`,
    stops: [
      {
        name: 'Haridwar',
        note: 'Ganga town on the way in; the evening aarti at Har Ki Pauri is worth a halt.',
      },
      {
        name: 'Forest Research Institute',
        note: 'Large colonial-era building and wooded campus with museums.',
      },
      {
        name: 'Sahastradhara',
        note: 'Sulphur springs and small waterfalls on the edge of the city.',
      },
      {
        name: 'Tapkeshwar Temple',
        note: 'Shiva shrine in a cave where water drips onto the lingam.',
      },
      {
        name: 'Mussoorie',
        note: 'Hill station on the ridge above Dehradun, reached by a winding road.',
      },
    ],
    tips: [
      'Pack a warm layer even in spring; evenings in the valley turn cool.',
      'If you plan to go up to Mussoorie, mention it at booking so the hill drive is part of the plan.',
      'Avoid hill roads during heavy monsoon rain and check local updates before going higher.',
    ],
    faqs: [
      {
        q: 'Where can we break the journey to Dehradun?',
        a: 'Lucknow or Bareilly are practical night halts. Haridwar works well as a second stop if you want to see the Ganga aarti.',
      },
      {
        q: 'Can the same car take us up to Mussoorie?',
        a: 'Yes, on a round trip the car stays with you and can do the drive up to Mussoorie. Tell us in advance so it is included in the quote.',
      },
      {
        q: 'We are dropping a student at a Dehradun school with heavy luggage. Which car should we book?',
        a: 'An SUV such as an Ertiga or an Innova Crysta has room for trunks, bedding and the family. A sedan is tight once the boot is full.',
      },
      {
        q: 'Is it possible to book just a one-way drop to Dehradun?',
        a: 'Yes. One-way and round-trip fares are by car class; the exact figure is confirmed on WhatsApp or by phone on +91 85760 00083.',
      },
      {
        q: 'Is the monsoon a bad time for this trip?',
        a: 'The drive across the plains is fine, but rain in the hills can bring landslides and road closures above Dehradun. Keep spare time in your plan between July and September.',
      },
    ],
    bestDepartureTime: 'Early morning, aiming for a first-night halt at Lucknow or Bareilly',
  },

  'gorakhpur-to-delhi': {
    publish: true,
    ownerConfirmed: true,
    intro: `Delhi is where a great many Gorakhpur families have someone: a son working in Noida or Gurugram, a daughter studying at a Delhi college, relatives settled in the eastern colonies of the city. The capital also means the international airport, embassies and visa centres, the big hospitals, and offices of central government departments. Trains to Delhi are often booked out around Chhath, Diwali and Holi, and a car becomes the practical way to move a family with luggage on a date of your choosing. A cab from Gorakhpur takes you to the exact address, whether that is a flat in Ghaziabad, a hostel in North Campus or the departures kerb at the airport, and you can stop for meals and rest whenever the family needs it.`,
    routeGuide: `The road runs west across almost the whole of Uttar Pradesh before entering the national capital region. The newer way uses the expressways: the link expressway out of Gorakhpur joins the Purvanchal Expressway towards Lucknow, and from the Lucknow side the expressways continue west past Agra and then north to Greater Noida. These are fast, fenced roads with planned food courts and fuel stops, though few towns along them. The older way goes through Lucknow and then north-west by Bareilly, Moradabad and Ghaziabad, with more traffic and more towns. Your driver will decide on the day based on traffic, weather and where in Delhi you are headed.

Many people do this in a single long day with stops for meals. Families with elders or small children often prefer a night in Lucknow, or in Agra if they want to see the Taj Mahal on the way.

The last stretch into Delhi is often the slowest. Traffic around Noida, Ghaziabad and the river bridges is heavy in the evening rush, so it helps to time your arrival outside office hours. For an airport drop, leave generous margin for the city traffic. In December and January dense fog on the expressways can bring speeds right down in the early morning and late evening, and summer heat on the open plains is hard on passengers, so the car's air conditioning and enough water matter.`,
    stops: [
      { name: 'Lucknow', note: 'A natural midway city for a meal or an overnight rest.' },
      {
        name: 'Agra',
        note: 'A Taj Mahal detour if you take the expressway side and have a spare day.',
      },
      {
        name: 'Mathura and Vrindavan',
        note: 'Krishna pilgrimage towns close to the Agra–Delhi stretch.',
      },
      {
        name: 'India Gate',
        note: 'War memorial on Kartavya Path, popular in the evening once you arrive.',
      },
      { name: 'Red Fort', note: 'Mughal fort in Old Delhi; closed on Mondays.' },
    ],
    tips: [
      'Share the full Delhi address or terminal number at booking so the driver can plan the final stretch.',
      'Avoid arriving in Delhi during the evening rush if you can.',
      'Book well ahead around Chhath, Diwali and Holi, when demand for cars is high.',
      'Keep ID ready; you may need it at hotels and for airport entry.',
    ],
    faqs: [
      {
        q: 'Can this trip be done in one day or should we halt?',
        a: 'Many travellers do it in one long day with meal stops. With elders or children, a night in Lucknow or Agra makes the trip much easier.',
      },
      {
        q: 'Can you drop us directly at Delhi airport?',
        a: 'Yes. Give the terminal and flight time when booking, and leave a wide margin for traffic inside the city.',
      },
      {
        q: 'Should I take a one-way cab or a round trip for Delhi?',
        a: 'If you are staying on in Delhi, a one-way drop is simpler. If you need the car to bring you back within a few days, ask for a round trip. Fares are by car class and confirmed on WhatsApp or phone.',
      },
      {
        q: 'Which car class makes sense for a family moving to Delhi with luggage?',
        a: 'An Ertiga-class SUV or an Innova Crysta gives space for suitcases and bedding. A sedan suits two or three people travelling light.',
      },
      {
        q: 'Who pays for the driver’s stay if the trip takes two days?',
        a: 'The driver arranges his own night stay. How it is charged on a multi-day trip is spelt out in your quote before you confirm.',
      },
    ],
    bestDepartureTime: 'Very early morning, to reach Delhi before the evening rush',
  },

  'gorakhpur-to-goa': {
    publish: true,
    ownerConfirmed: true,
    intro: `Goa by road from Gorakhpur is a genuine cross-country journey, from the plains of eastern Uttar Pradesh through central India and down the western side of the Deccan to the Konkan coast. Most people fly or take the train, and that is often sensible. A car makes sense for a family that wants to travel together with plenty of luggage, see places on the way, or simply prefers the road to airports and stations. Goa rewards the effort: the beaches of the north and south, the whitewashed churches of Old Goa including the Basilica of Bom Jesus, the old Latin quarter of Fontainhas in Panaji, spice farms inland and the Dudhsagar falls in the hills. Plan this as a road trip over several days, not a transfer.`,
    routeGuide: `There is no single obvious way to Goa, and the driver will discuss the plan with you before you set off. In broad terms the road leaves Uttar Pradesh heading south-west, crosses the forests and plateaus of Madhya Pradesh, enters Maharashtra and runs down through the Pune side towards Kolhapur or Belagavi before descending the Western Ghats to the coast. Another way goes further west through Mumbai and down the coast, which is slower but passes the Konkan scenery.

Treat it as a trip of several days, with a night halt each evening. Sensible halts depend on the line chosen: Jhansi or Bhopal in central India, Nashik or Pune in Maharashtra, and Kolhapur or Belagavi before the last stretch to Goa. Driving after dark on unfamiliar ghat roads is not a good idea, so each day should end at a proper town with hotels.

The landscape changes a great deal: the flat Gangetic plain, the rocky Bundelkhand and Vindhya country, the black-soil Deccan with its cotton and sugarcane, and finally the green, wet slopes of the Ghats. The monsoon on the west coast, roughly June to September, is very heavy; ghat roads can see landslides and slow traffic, and many beach shacks close for the season. October to March is the dry, pleasant time, with Christmas and New Year the busiest weeks in Goa.`,
    stops: [
      { name: 'Bhopal', note: 'Lake city in central India and a convenient night halt.' },
      { name: 'Pune', note: 'Large Maharashtra city with plenty of hotels for a halt.' },
      { name: 'Kolhapur', note: 'Known for the Mahalakshmi temple and its spicy cuisine.' },
      { name: 'Old Goa', note: 'Churches and convents including the Basilica of Bom Jesus.' },
      {
        name: 'Fontainhas, Panaji',
        note: 'Old Portuguese-era quarter of narrow lanes and painted houses.',
      },
    ],
    tips: [
      'Plan a night halt every evening and avoid driving the ghat roads after dark.',
      'Carry a small overnight bag so you need not unload all luggage at every hotel.',
      'Avoid the peak monsoon months for this drive if your dates are flexible.',
      'Book Goa hotels early for Christmas and New Year.',
    ],
    faqs: [
      {
        q: 'How many night halts should we plan on the way to Goa?',
        a: 'Plan for several. A halt each evening in a city such as Bhopal, Pune or Kolhapur keeps the days manageable. The driver will agree the plan with you before departure.',
      },
      {
        q: 'Is a one-way booking possible all the way to Goa?',
        a: 'Yes, one-way and round-trip fares are both offered by car class. For a trip this long, the exact fare is confirmed on WhatsApp or by phone on +91 85760 00083.',
      },
      {
        q: 'How is the driver’s accommodation handled over several nights?',
        a: 'The driver arranges his own stay each night. How that is charged is written into your quote before you confirm, so the total is clear.',
      },
      {
        q: 'What kind of vehicle suits a road trip of several days?',
        a: 'An Innova Crysta or a similar SUV is the comfortable choice for a family over many days, with room to stretch and space for bags. A sedan works for two people travelling light.',
      },
      {
        q: 'Can we stop to see places in Maharashtra on the way?',
        a: 'Yes. Tell us which places you have in mind, such as Pune or Kolhapur, so the route and the number of days are planned around them.',
      },
    ],
    bestDepartureTime: 'Early morning each day, ending at a city halt before dark',
  },

  'gorakhpur-to-indore': {
    publish: true,
    ownerConfirmed: true,
    intro: `Indore is the largest city of Madhya Pradesh and its commercial centre, with textile and trading houses, a big education scene including an IIT and an IIM, and wide, well-kept streets. For many in Gorakhpur the trip is about a student starting college, a job transfer, or business with Indore's traders. The city is also known for food: the Sarafa night market and Chappan Dukan draw crowds for poha, jalebi and snacks. Rajwada, the old Holkar palace in the heart of the city, and Lal Bagh Palace show its royal past. A car from Gorakhpur also opens up the region: Ujjain's Mahakal temple, Omkareshwar on the Narmada and the ruined fort town of Mandu are all within reach of Indore.`,
    routeGuide: `The journey leaves eastern Uttar Pradesh heading west and then south-west into central India. One common line runs towards Lucknow and Kanpur, then south through Bundelkhand around Jhansi, and on into Madhya Pradesh by way of the Bhopal side before the last stretch west to Indore. The driver may adjust this depending on road work and your plans, for example if you want to see Orchha near Jhansi.

The country changes as you go. The flat, crowded plains give way to the rocky, drier land of Bundelkhand, with its old forts and reservoirs, and then the rolling Malwa plateau around Indore, with its dark soil and soybean and wheat fields. Some sections pass through forest and ghats where driving after dark is slow, so plan to cover them by day.

Split the trip over two days. Jhansi makes a good first-night halt, with Orchha's temples and cenotaphs close by if you have time; Bhopal works as a halt too, with its lakes and the Bhimbetka rock shelters not far away. Summer in central India is very hot, especially April to June, and winters are dry and pleasant. During the monsoon, rivers in Madhya Pradesh can rise quickly and low bridges in rural stretches sometimes close for a while, so allow extra time.`,
    stops: [
      { name: 'Orchha', note: 'Bundela palaces and cenotaphs on the Betwa, close to Jhansi.' },
      { name: 'Bhopal', note: 'City of lakes and a comfortable place to break the journey.' },
      { name: 'Rajwada', note: 'The old Holkar palace at the centre of Indore.' },
      {
        name: 'Sarafa Bazaar',
        note: 'Jewellery market by day that turns into a street-food market at night.',
      },
      {
        name: 'Omkareshwar',
        note: 'Jyotirlinga temple on an island in the Narmada, an outing from Indore.',
      },
    ],
    tips: [
      'Break the journey at Jhansi or Bhopal rather than driving into the night.',
      'If you plan to visit Ujjain or Omkareshwar too, book a round trip so the car stays with you.',
      'Carry extra water in summer; central India gets very hot on the open road.',
    ],
    faqs: [
      {
        q: 'Where should we halt for the night on the way to Indore?',
        a: 'Jhansi or Bhopal are the usual choices, both with plenty of hotels. Jhansi also puts Orchha within easy reach.',
      },
      {
        q: 'We are shifting a student to Indore. Which car do you suggest?',
        a: 'An SUV such as an Ertiga or an Innova Crysta takes the student, a parent or two and the luggage comfortably over two days.',
      },
      {
        q: 'Can we add Ujjain and Omkareshwar to an Indore trip?',
        a: 'Yes, with a round trip the same car can take you to both. Mention it when booking so the extra days are in the quote.',
      },
      {
        q: 'How does the fare work for one way versus round trip?',
        a: 'Fares are set by car class for either one way or a round trip. The exact amount for Indore is confirmed on WhatsApp or by phone.',
      },
      {
        q: 'Does the driver stay overnight with us on the way?',
        a: 'Yes, he halts at the same town and arranges his own stay. How the night stay is charged is part of the quote you agree before travel.',
      },
    ],
    bestDepartureTime: 'Early morning, reaching Jhansi or Bhopal by evening',
  },

  'gorakhpur-to-jaipur': {
    publish: true,
    ownerConfirmed: true,
    intro: `Jaipur, the Pink City, is the capital of Rajasthan and a great heritage city. Its old walled centre was laid out by Sawai Jai Singh II, and the sights are close together: the City Palace, the honeycomb facade of the Hawa Mahal, and the Jantar Mantar observatory, a UNESCO World Heritage Site. Amber Fort rises above a lake on the hills outside town, with Nahargarh and Jaigarh on the ridges nearby. Gorakhpur families travel here for holidays, weddings, gem and textile shopping in the bazaars, and visits to relatives. Going by car lets you combine Jaipur with Agra on the way, since the road passes through it, and keep the car for the forts on the hills, where public transport is awkward.`,
    routeGuide: `From Gorakhpur the road heads west to Lucknow and then on towards Agra, after which it leaves Uttar Pradesh and crosses into Rajasthan by way of Bharatpur and Dausa. The first half is green, crowded Gangetic plain; after Agra the land grows drier, with mustard fields in winter, scrubby hills and stone-built villages, and the light and colours change noticeably as you enter Rajasthan.

Agra is the obvious place to spend the night: it divides the trip sensibly, has hotels at every level, and lets you see the Taj Mahal before continuing. Fatehpur Sikri lies just off the road west of Agra and fits in on the second morning. Bird lovers travelling in winter can stop at the Keoladeo National Park in Bharatpur, famous for migratory water birds.

In Jaipur, the walled city is busy and parking is tight, so the driver will drop you near the main gates and pick you up again. Start Amber Fort early before the heat and the crowds build. Rajasthan summers, especially May and June, are extremely hot and dry, while October to March is pleasant, and the city fills up around Diwali and the winter holidays. Fog can slow the plains section in December and January.`,
    stops: [
      { name: 'Agra', note: 'Sensible first-night halt, with the Taj Mahal and Agra Fort.' },
      { name: 'Fatehpur Sikri', note: 'Mughal city just off the road west of Agra.' },
      {
        name: 'Keoladeo National Park, Bharatpur',
        note: 'Wetland bird reserve, at its liveliest in winter.',
      },
      { name: 'Amber Fort', note: 'Hill fort-palace outside Jaipur; go early in the day.' },
      {
        name: 'Hawa Mahal and City Palace',
        note: 'Heart of the old walled city, close to each other.',
      },
    ],
    tips: [
      'Stay a night in Agra to split the drive and see the Taj Mahal on the way.',
      'Visit Amber Fort in the morning; afternoons on the ramparts are hot.',
      'Buy gems and jewellery only from shops with proper bills.',
    ],
    faqs: [
      {
        q: 'Is Agra a good place to stop overnight on the way to Jaipur?',
        a: 'Yes. Agra splits the journey well and gives you the Taj Mahal in the morning before the drive into Rajasthan.',
      },
      {
        q: 'Can the car stay with us for Jaipur sightseeing?',
        a: 'On a round trip, yes, the driver takes you to Amber Fort, the old city and other places at your pace. Plan the extra days when you book.',
      },
      {
        q: 'Which vehicle is comfortable for a family going to Jaipur?',
        a: 'For four or more people with bags, an SUV such as an Ertiga or an Innova Crysta is roomier for two long days. Couples can manage in a sedan.',
      },
      {
        q: 'How do I find out the fare for Jaipur?',
        a: 'Fares are by car class, one way or round trip. The exact amount is confirmed on WhatsApp or by phone on +91 85760 00083.',
      },
      {
        q: 'Will the driver need a separate room at the halt?',
        a: 'The driver makes his own arrangements for the night. The way his stay is charged is set out in your quote before you confirm.',
      },
    ],
    bestDepartureTime: 'Early morning, so the first day ends in Agra',
  },

  'gorakhpur-to-kolkata': {
    publish: true,
    ownerConfirmed: true,
    intro: `Kolkata, the old capital of British India, has long ties with eastern Uttar Pradesh and Bihar: generations of families from the region have worked in its mills, ports and offices, and many still have relatives there. It is also a city of learning and medicine, with big hospitals that draw patients from across the east, and a destination for Durga Puja, when the whole city is decorated with pandals. The sights are many: the Victoria Memorial, the Howrah Bridge over the Hooghly, the Kali temples at Dakshineswar and Kalighat, Belur Math across the river, and the old lanes of north Kolkata. A car from Gorakhpur suits families carrying a lot of luggage, patients who need to travel with a companion, and anyone who wants to stop at Bodh Gaya or Varanasi on the way.`,
    routeGuide: `The journey runs east and then south-east across Bihar and Jharkhand into West Bengal. There are two broad ways. One goes through north Bihar, via Gopalganj and Muzaffarpur, crosses the Ganga at Patna and then turns south to meet the Grand Trunk Road. The other heads south-west first towards Varanasi and then follows the Grand Trunk Road east through southern Bihar, past Sasaram and Aurangabad, into Jharkhand around Dhanbad and on through Asansol and Durgapur in Bengal. The driver will choose depending on traffic, river crossings and road work at the time.

The landscape shifts from the Gangetic plain to the low, wooded hills of the Chota Nagpur plateau in Jharkhand, and then to the flat, green rice country of Bengal, crossed by rivers and ponds.

It is a long drive, and most families stop for a night. Varanasi, Bodh Gaya or Dhanbad make reasonable halts, depending on which way you go; Bodh Gaya lets you visit the Mahabodhi Temple, a UNESCO World Heritage Site. Entering Kolkata, traffic thickens a long way out and the bridges over the Hooghly can be slow at peak hours. The monsoon is heavy in Bengal, and waterlogging in parts of the city is common after downpours. During Durga Puja many central roads are closed or diverted in the evenings.`,
    stops: [
      { name: 'Bodh Gaya', note: 'The Mahabodhi Temple, where the Buddha attained enlightenment.' },
      {
        name: 'Varanasi',
        note: 'A possible halt on the Grand Trunk Road side, with the ghats on the Ganga.',
      },
      {
        name: 'Dakshineswar Kali Temple',
        note: 'Riverside temple on the northern edge of Kolkata.',
      },
      { name: 'Victoria Memorial', note: 'White marble memorial and museum beside the Maidan.' },
      {
        name: 'Howrah Bridge',
        note: 'The steel cantilever bridge over the Hooghly near Howrah station.',
      },
    ],
    tips: [
      'If you are travelling during Durga Puja, expect evening road closures in central Kolkata.',
      'Keep the hospital or address details ready so the driver can plan the drive into the city.',
      'In the monsoon, allow extra time for waterlogged roads on the approach.',
    ],
    faqs: [
      {
        q: 'Where can we halt overnight on the way to Kolkata?',
        a: 'Varanasi, Bodh Gaya or Dhanbad, depending on the route the driver takes. Bodh Gaya is a good choice if you want to visit the Mahabodhi Temple.',
      },
      {
        q: 'We are taking a patient to a Kolkata hospital. Can the car wait or come back later?',
        a: 'Yes, ask for a round trip and tell us the expected stay. The car can wait or return on a fixed date, and the plan is set in the quote.',
      },
      {
        q: 'Is a one-way drop to Kolkata possible?',
        a: 'Yes. One-way and round-trip fares are by car class, with the exact figure confirmed on WhatsApp or by phone.',
      },
      {
        q: 'Which car is right for a group of six going to Kolkata?',
        a: 'An Innova Crysta or a similar seven-seater SUV takes six adults with luggage more comfortably than a smaller car over a long drive.',
      },
      {
        q: 'How is the driver’s night halt arranged?',
        a: 'He stops at the same town, finds his own place to stay and rests before the next day. How that is charged is stated in the quote.',
      },
    ],
    bestDepartureTime: 'Early morning, aiming to reach a halt such as Bodh Gaya or Dhanbad by dusk',
  },

  'gorakhpur-to-mumbai': {
    publish: true,
    ownerConfirmed: true,
    intro: `Mumbai is home to a very large community from eastern Uttar Pradesh, and for many Gorakhpur families the road to Mumbai is the road to work, to relatives, or back to a job after a festival at home. The city is India's financial capital and its film capital, with the Gateway of India facing the harbour, the Victorian Gothic Chhatrapati Shivaji Maharaj Terminus, the sweep of Marine Drive, the Siddhivinayak temple and the Haji Ali Dargah standing in the sea. Most people go by train, but those trains are packed after Chhath and Diwali. A car takes a family and its luggage from the door in Gorakhpur to the door in Mumbai, with halts at night along the way and the chance to see places in central India and Maharashtra.`,
    routeGuide: `This is a journey across most of the country, from the Gangetic plain to the Arabian Sea coast. The usual line heads west through Uttar Pradesh towards Lucknow and Kanpur, then south through Bundelkhand into Madhya Pradesh, across the Bhopal and Indore side of the Malwa plateau, and down into Maharashtra through Dhule and Nashik. The last stretch descends the Western Ghats at the Kasara ghat into the Thane side of greater Mumbai. The driver may vary this line depending on road work and your plans.

Plan for at least two night halts. Jhansi or Bhopal suits the first evening, and Indore or Nashik the second; Nashik also lets you see the Godavari ghats or visit Trimbakeshwar. Driving long hours through the night on this route is not recommended for safety.

Expect changing country: farmland and towns in UP, rocky Bundelkhand, the Vindhya hills and forest, the open cotton and onion fields of north Maharashtra, then the sudden green of the Ghats. The monsoon, roughly June to September, is very heavy around Mumbai and in the Ghats, bringing slow traffic, waterlogging and occasional landslides. Entering Mumbai, traffic from Thane onwards is dense for much of the day, so give the driver your exact address and building name in advance.`,
    stops: [
      {
        name: 'Bhopal',
        note: 'Central Indian city of lakes, convenient for a first or second halt.',
      },
      { name: 'Nashik', note: 'Godavari ghats and temples; a calm last halt before Mumbai.' },
      { name: 'Gateway of India', note: 'Harbour-front arch in south Mumbai.' },
      {
        name: 'Chhatrapati Shivaji Maharaj Terminus',
        note: 'Gothic railway station listed as a World Heritage Site.',
      },
      { name: 'Haji Ali Dargah', note: 'Shrine reached by a causeway across the sea at low tide.' },
    ],
    tips: [
      'Plan the halts before departure; arriving in Mumbai in daylight makes the last stretch easier.',
      'Give the full Mumbai address with building and landmark so the driver can find it quickly.',
      'In the monsoon, keep a spare day in hand for rain delays in the Ghats.',
      'Pack a small overnight bag for the halts so the main luggage stays loaded.',
    ],
    faqs: [
      {
        q: 'How many nights should we plan on the road to Mumbai?',
        a: 'Plan for at least two night halts, for example Bhopal and then Nashik or Indore. The driver agrees the plan with you before you leave.',
      },
      {
        q: 'Is the driver’s food and stay part of the fare on a Mumbai trip?',
        a: 'The driver arranges his own stay and meals along the way. How these are charged on a multi-day trip is shown in your quote before you confirm.',
      },
      {
        q: 'Can we book one way to Mumbai, or only a return?',
        a: 'One way is fine, and round trips are available too. Fares are by car class; for Mumbai the exact amount is confirmed on WhatsApp or by phone on +91 85760 00083.',
      },
      {
        q: 'Which car is suitable for several days on the road?',
        a: 'An Innova Crysta or a similar SUV gives the most comfort over many days, especially for a family with luggage. A sedan suits one or two people.',
      },
      {
        q: 'Can we stop at Shirdi or Nashik on the way?',
        a: 'Yes. Tell us when booking and the route and number of days will be planned to include them.',
      },
    ],
    bestDepartureTime: 'Early morning each day, with halts planned so you drive in daylight',
  },

  'gorakhpur-to-nashik': {
    publish: true,
    ownerConfirmed: true,
    intro: `Nashik stands on the Godavari in northern Maharashtra and is one of the four cities that host the Kumbh Mela. For pilgrims from Gorakhpur its pull is Ramayana country: Panchavati, where Rama, Sita and Lakshmana are believed to have lived during their exile, the Kalaram temple, Sita Gufa, and the bathing ghat of Ramkund. A short drive away, Trimbakeshwar is one of the twelve jyotirlingas, near the source of the Godavari in the Brahmagiri hills. Shirdi, the town of Sai Baba, is also within reach, and the Saptashrungi temple sits on a hill to the north. Nashik is also known for its vineyards and wineries. Going by car lets an extended family travel together and visit all these places at their own pace.`,
    routeGuide: `The road crosses central India from the north-east. The usual way goes west through Uttar Pradesh towards Lucknow and Kanpur, then south through Bundelkhand and across Madhya Pradesh by the Bhopal and Indore side, before dropping into Maharashtra past Dhule to Nashik. The driver may vary the line depending on road conditions and your halts.

It is a multi-day trip. Jhansi or Bhopal makes a good first-night halt, and Indore a second, which also allows a visit to Ujjain's Mahakaleshwar or Omkareshwar if your family wants to cover more jyotirlingas on the same journey. Arriving in Nashik in daylight is easier on everyone.

The scenery moves from the crowded plains of UP to the stony uplands of Bundelkhand, the forests and hills of the Vindhyas, and the wide farmland of the Malwa plateau. In northern Maharashtra the land opens out into onion and grape country, with the hills of the Sahyadri visible to the west of Nashik.

Nashik and Trimbakeshwar become extremely crowded during the Simhastha Kumbh, and vehicle access near the ghats is restricted on main bathing days. Shravan Mondays and Mahashivratri bring large crowds to Trimbakeshwar too. The monsoon brings heavy rain to the hills around Trimbak, which turn green and beautiful but slippery. Winters are pleasant, while April and May are hot.`,
    stops: [
      {
        name: 'Ramkund and Panchavati',
        note: 'Bathing ghat on the Godavari and the Ramayana sites around it.',
      },
      { name: 'Kalaram Temple', note: 'Black-stone Rama temple in Panchavati.' },
      { name: 'Trimbakeshwar', note: 'Jyotirlinga temple near the source of the Godavari.' },
      { name: 'Shirdi', note: 'Sai Baba shrine, a day trip from Nashik.' },
      {
        name: 'Indore',
        note: 'A convenient halt on the way down, with Ujjain and Omkareshwar nearby.',
      },
    ],
    tips: [
      'Check the temple dress code at Trimbakeshwar before you go.',
      'Expect long queues at Trimbakeshwar on Mondays in Shravan and on Mahashivratri.',
      'Book a round trip if you want the car for Trimbakeshwar and Shirdi as well.',
    ],
    faqs: [
      {
        q: 'Where should we stop overnight on the way to Nashik?',
        a: 'Jhansi or Bhopal for the first night and Indore for the second works well, and gives you the option of Ujjain or Omkareshwar.',
      },
      {
        q: 'Can one trip cover Nashik, Trimbakeshwar and Shirdi?',
        a: 'Yes, on a round trip the car stays with you for all three. Mention them when booking so the days are planned and quoted.',
      },
      {
        q: 'Which vehicle fits a pilgrim group of ten?',
        a: 'A tempo traveller suits a group of that size with luggage. For up to six or seven people, an Innova Crysta is comfortable.',
      },
      {
        q: 'Is a one-way fare to Nashik available?',
        a: 'Yes, fares are by car class for one way or round trip. The exact amount is confirmed on WhatsApp or by phone.',
      },
      {
        q: 'Where does the driver sleep during the halts?',
        a: 'He stops in the same town and arranges his own place to rest. How his stay is charged is clear in your quote before you book.',
      },
    ],
    bestDepartureTime: 'Early morning, with each day ending at a city halt before dark',
  },

  'gorakhpur-to-ujjain': {
    publish: true,
    ownerConfirmed: true,
    intro: `Ujjain, on the Shipra river in Madhya Pradesh, is one of the seven sacred cities of Hinduism and the home of Mahakaleshwar, one of the twelve jyotirlingas. Many devotees from Gorakhpur make this journey to attend the Bhasma Aarti performed before dawn at Mahakal, and to walk the Mahakal Lok corridor around the temple. The city is full of other shrines: Kal Bhairav, where liquor is offered to the deity, Harsiddhi Mata, the Mangalnath temple, and the ashram of Sandipani, where Krishna is said to have studied. Ram Ghat on the Shipra hosts the Simhastha Kumbh. Omkareshwar, another jyotirlinga, lies on the Narmada a drive away beyond Indore. Travelling by car means elders can rest when they need to and the family can visit both jyotirlingas in one trip.`,
    routeGuide: `The route heads west from Gorakhpur towards Lucknow and Kanpur, then south-west through the Jhansi side of Bundelkhand into Madhya Pradesh, crossing towards Bhopal and then west over the Malwa plateau to Ujjain. The driver may vary this depending on road conditions and whether you want to see places such as Orchha on the way.

The plains of eastern UP give way first to the dry, rocky Bundelkhand country with its forts and reservoirs, then to the Vindhya hills and forest, and finally the gentle, open Malwa plateau with its black soil and soybean, wheat and gram fields.

Most pilgrims break the journey for a night at Jhansi or Bhopal, arriving in Ujjain on the second day. If you plan to attend the Bhasma Aarti, book it in advance through the temple's official booking and reach Ujjain the evening before, since devotees have to be at the temple well before dawn. Indore is close by and has many more hotels, so some families stay there and drive across.

Ujjain is very crowded on Mondays in Shravan, on Mahashivratri, and during the Mahakal sawari processions, and police restrict vehicles near the temple at such times. The monsoon makes the Malwa country green but can slow the forest sections. Summers are very hot, so plan temple visits for early morning and evening.`,
    stops: [
      {
        name: 'Mahakaleshwar Temple',
        note: 'Jyotirlinga temple; the Bhasma Aarti needs advance booking.',
      },
      {
        name: 'Kal Bhairav Temple',
        note: 'Old temple on the edge of the city, usually visited with Mahakal.',
      },
      { name: 'Harsiddhi Temple', note: 'Shakti temple near Mahakal, with tall lamp towers.' },
      { name: 'Ram Ghat', note: 'Main ghat on the Shipra, with evening aarti.' },
      { name: 'Omkareshwar', note: 'Second jyotirlinga on the Narmada, a day trip via Indore.' },
    ],
    tips: [
      'Book the Bhasma Aarti in advance through the temple’s official channel.',
      'Arrive in Ujjain the evening before a dawn darshan.',
      'Expect vehicle restrictions near the temple on Shravan Mondays and festival days.',
      'Keep a light shawl for the early morning queue in winter.',
    ],
    faqs: [
      {
        q: 'Where should we halt overnight on the way to Ujjain?',
        a: 'Jhansi or Bhopal suit the first night. If you are attending the Bhasma Aarti, plan to be in Ujjain or Indore the night before.',
      },
      {
        q: 'Can the car take us to Omkareshwar as well?',
        a: 'Yes, on a round trip the same car can cover Omkareshwar. Tell us when you book so the extra day is included.',
      },
      {
        q: 'Which car is good for elderly parents on this pilgrimage?',
        a: 'An Innova Crysta or a similar SUV is easier to get in and out of and more comfortable over two days. A sedan works for a couple travelling light.',
      },
      {
        q: 'Do you offer one way to Ujjain or only return trips?',
        a: 'Both. Fares are by car class for one way or round trip, and the exact amount is confirmed on WhatsApp or by phone on +91 85760 00083.',
      },
      {
        q: 'How is the driver’s stay handled on the pilgrimage?',
        a: 'He stays in the same town each night on his own arrangement. The way it is charged is set out in your quote.',
      },
    ],
    bestDepartureTime: 'Early morning, to reach Jhansi or Bhopal before dark',
  },

  'delhi-to-gorakhpur': {
    publish: true,
    ownerConfirmed: true,
    intro: `For people from Gorakhpur and the surrounding districts who live and work in Delhi, Noida, Ghaziabad, Gurugram or Faridabad, the road home is a familiar one. Around Chhath, Diwali and Holi, and during the wedding season, train tickets to Gorakhpur vanish within minutes, and a car becomes the way to get the whole family home together. Taxiverz is a Gorakhpur company with its office at Railway Station Gate No-1, so this is a trip we know from both ends. The car can collect you from your flat, a hostel, a hospital or the airport after an international flight, and bring you to your door in Gorakhpur, with stops for meals on the way. It also suits anyone heading to the Gorakhnath temple or to Kushinagar and Nepal beyond.`,
    routeGuide: `Pickup can be from anywhere in Delhi and the NCR: a home in East Delhi or Noida, a society in Gurugram, an office in Connaught Place, a railway station such as New Delhi or Anand Vihar, or the arrivals area of the airport. Leaving the city is usually the slowest part, so an early start before the morning traffic helps a great deal.

Heading east, the driver will choose between the fast expressway line, which goes south-east past Greater Noida towards Agra and then east towards Lucknow, and the older road through Ghaziabad, Moradabad and Bareilly. The expressways are quicker and smoother, with food courts at intervals; the older road passes through more towns, which some families prefer for dhaba stops. Beyond Lucknow the road continues east through the farmland of Awadh and Purvanchal to Gorakhpur.

Most people make the trip in one long day. If you are travelling with small children, elders or a patient, a night in Lucknow is a comfortable break, and Ayodhya, a short detour off the eastern stretch, lets you visit the Ram temple on the way home. In winter, dense fog across UP can slow driving a lot in the early morning and at night, so leave room in your plans. Festival weeks bring heavy traffic out of Delhi on every road heading east.`,
    stops: [
      { name: 'Lucknow', note: 'Midway city for lunch or a night halt on the way east.' },
      { name: 'Ayodhya', note: 'Ram temple and the Saryu ghats, a detour on the last stretch.' },
      {
        name: 'Gorakhnath Temple',
        note: 'The Nath sampradaya temple in Gorakhpur, often the first visit home.',
      },
      { name: 'Kushinagar', note: 'Where the Buddha attained parinirvana, east of Gorakhpur.' },
    ],
    tips: [
      'Book early for the weeks before Chhath and Diwali, when every vehicle is in demand.',
      'Leave Delhi before the morning rush to save time getting out of the city.',
      'Share your exact pickup point, with society gate or terminal number, when booking.',
      'In the fog season, leave room in your plans for slower driving.',
    ],
    faqs: [
      {
        q: 'Can you pick us up from Noida, Gurugram or Ghaziabad instead of Delhi?',
        a: 'Yes. Pickup can be anywhere in Delhi and the NCR, including Noida, Ghaziabad, Gurugram and Faridabad. Share the address when booking.',
      },
      {
        q: 'My flight lands at Delhi airport. Can the car meet me there and drive straight to Gorakhpur?',
        a: 'Yes. Give the flight number and terminal, and the driver will wait at the arrivals area and drive you home.',
      },
      {
        q: 'Should we book well ahead of Chhath?',
        a: 'Yes, as early as you can. Demand for cars from Delhi towards Gorakhpur is very high in the days before Chhath and Diwali.',
      },
      {
        q: 'Is it one way only, or can the car bring us back to Delhi?',
        a: 'Both are possible. A one-way drop to Gorakhpur suits most people going home; a round trip suits a short visit. Fares are by car class and confirmed on WhatsApp or by phone on +91 85760 00083.',
      },
      {
        q: 'Which car should we take for the family and festival luggage?',
        a: 'An Ertiga-class SUV or an Innova Crysta has space for a family and the bags and gifts that go home at festival time. A sedan suits two or three people.',
      },
    ],
    bestDepartureTime: 'Early morning, before Delhi traffic builds',
  },
}
