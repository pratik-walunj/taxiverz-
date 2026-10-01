import type { VehicleCopy } from './vehicles'

export const bikeVehicleCopy: Record<string, VehicleCopy> = {
  'honda-activa': {
    publish: true,
    summary:
      'Rent a Honda Activa 110 in Gorakhpur, a gearless scooter for city errands and daily trips. Enquire online or on WhatsApp.',
    intro: `The Honda Activa 110 is a gearless scooter and one of the most familiar two-wheelers on Indian roads. There is no clutch and no gear lever, so you twist the throttle and go. That makes it easy to handle in stop-start traffic around Gorakhpur, whether you are visiting the market, going to an office, or running a few errands between train times.

To rent it, send an enquiry with your dates, or WhatsApp us on +91 85760 00083. We reply with availability, the price, the documents you need to show, the security deposit and any kilometre limit before you book, and every enquiry gets a reference number. Our head office is at Railway Station Gate No-1, Gorakhpur, which is handy if you arrive by train. Helmets are required by law in India for both rider and pillion, so ask about helmets when you enquire.`,
    highlights: [
      {
        title: 'Quiet, easy starts',
        text: 'The Activa starts without the usual starter whine, which is handy on an early morning outside a hotel or in a sleeping residential lane.',
      },
      {
        title: 'Metal body panels',
        text: 'Its body is metal rather than plastic, so the odd knock while parking in a crowded market leaves it none the worse.',
      },
      {
        title: 'Telescopic front forks',
        text: 'The front suspension soaks up speed breakers and patchy stretches of city road better than older scooter designs.',
      },
      {
        title: 'Nothing new to learn',
        text: 'Almost everyone in India has ridden an Activa or sat on one, so you are comfortable on it from the first few metres.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a licence to ride the Activa?',
        a: 'Yes. You need a valid two-wheeler licence for this type of vehicle. A licence for motorcycles without gear covers a gearless scooter, and a licence with gear also works. Please carry the original when you collect it.',
      },
      {
        q: 'What documents do I need to rent it?',
        a: 'We confirm the exact documents and the security deposit when we reply to your enquiry, so you know what to bring before you book.',
      },
      {
        q: 'Can I keep the Activa for a few days?',
        a: 'Yes, you can ask for any number of days. Put your start and end dates in the enquiry and we will tell you whether it is free for that period.',
      },
    ],
  },

  'tvs-duet': {
    // Held back: the data flags “TVS Duet” as not a real TVS model; the page title would carry a wrong name.
    publish: false,
    summary:
      'Hire a gearless scooter in Gorakhpur for short trips and local work. Tell us your dates and we confirm the model and availability.',
    intro: `This listing is for a gearless scooter meant for local use in and around Gorakhpur. It suits someone who needs simple transport for a few days: getting to a college or hospital, visiting relatives across town, or carrying a bag of shopping on the footboard. The exact scooter you get can vary, so if the make and model matter to you, ask us and we will tell you what is available for your dates.

Booking works by enquiry. Fill in the form with the days you need it, call us, or message us on WhatsApp at +91 85760 00083. Our reply covers whether a scooter is free, what it costs, which documents you should bring, the deposit and any limit on kilometres, all before you commit. You also get a reference number to quote if you follow up. Indian law requires a helmet for the rider and for the person sitting behind, so mention helmets in your message.`,
    highlights: [
      {
        title: 'Twist and go',
        text: 'There is no clutch or gear lever, so the scooter suits anyone who simply wants to get from one part of town to another.',
      },
      {
        title: 'Model named upfront',
        text: 'The exact scooter can vary, so we name it in our reply before you book rather than surprising you at pickup.',
      },
      {
        title: 'Space for shopping',
        text: 'The footboard and under-seat space take a bag of vegetables or a small parcel on a market run.',
      },
    ],
    faqs: [
      {
        q: 'Which scooter model will I get?',
        a: 'It depends on what is free on your dates. Ask in your enquiry and we will name the model before you book.',
      },
      {
        q: 'Is a gearless licence enough for this scooter?',
        a: 'You need a valid two-wheeler licence for this type of vehicle. For a gearless scooter, a licence for motorcycles without gear is enough, and a licence with gear covers it too.',
      },
      {
        q: 'Do I pay a deposit?',
        a: 'We tell you the deposit and the documents to show when we reply to your enquiry. Nothing is fixed until you agree to it.',
      },
    ],
  },

  'yamaha-fascino': {
    publish: true,
    summary:
      'Yamaha Fascino scooter on rent in Gorakhpur. A light gearless scooter for short city rides. Send your dates to check availability.',
    intro: `The Yamaha Fascino is a light gearless scooter with rounded, retro-inspired styling. Riders who are not very tall, or who have not ridden much before, often find a small scooter like this easy to push, park and turn in narrow lanes. It is a sensible pick for short rides across the city, a college run, or a couple of days spent visiting people in Gorakhpur.

Here is how renting works. Tell us your pickup and return dates through the website, by phone, or on WhatsApp at +91 85760 00083. Before you book, we come back to you with availability, the rental price, the documents we need to see, the security deposit and whether a kilometre limit applies. Each enquiry is logged with a reference number so you can follow up easily. Pickup is from our head office at Railway Station Gate No-1. Helmets are compulsory for rider and pillion, so please raise this when you get in touch.`,
    highlights: [
      {
        title: 'Light to handle',
        text: 'The Fascino is a light scooter that is easy to push off its stand, turn round and squeeze into a parking gap.',
      },
      {
        title: 'Retro-inspired looks',
        text: 'Rounded panels and vintage-style details make it a scooter people pick for its looks as much as for the ride.',
      },
      {
        title: 'Friendly for shorter riders',
        text: 'A small, slim scooter like this lets most riders put their feet down comfortably at a signal.',
      },
      {
        title: 'Made for short hops',
        text: 'It fits college runs, visits to friends across town and quick trips to the shops.',
      },
    ],
    faqs: [
      {
        q: 'Is the Fascino suitable for a new rider?',
        a: 'It is a gearless scooter, so there are no gears to learn, but you still need a valid two-wheeler licence for this type of vehicle and should be comfortable riding in traffic.',
      },
      {
        q: 'What should I bring when I collect it?',
        a: 'Your licence and the ID documents we list in our reply. We confirm the documents and the deposit before you book.',
      },
      {
        q: 'Can two people ride on it?',
        a: 'Yes, it has a pillion seat. Both the rider and the pillion must wear a helmet by law, so ask about helmets when you enquire.',
      },
    ],
  },

  'hero-destini-125': {
    publish: true,
    summary:
      'Rent a Hero Destini 125 gearless scooter in Gorakhpur for daily commuting or a week of city travel. Enquire by form or WhatsApp.',
    intro: `The Hero Destini 125 is a 125 cc gearless scooter, a size up from the common 110 cc scooters. It keeps the easy twist-and-go riding, with a little more pull when you carry a passenger or ride on the bypass roads. If you are staying in Gorakhpur for a week for work and need to cover the same route every day, or you want a scooter that two people can share comfortably, this is a practical choice.

The process starts with your dates. Send them through the enquiry form, or on WhatsApp to +91 85760 00083, and we answer with availability, the price for that period, the documents to show at pickup, the deposit and any kilometre limit. You decide after that. Your enquiry is tracked with a reference number. Riding without a helmet is against the law in India for the rider and the pillion, so check with us about helmets too.`,
    highlights: [
      {
        title: 'Idle stop-start',
        text: 'Hero’s i3S system switches the engine off when you wait at a signal and restarts it as soon as you open the throttle.',
      },
      {
        title: 'Phone charging port',
        text: 'A built-in charging port keeps your phone topped up while you use it for maps around an unfamiliar city.',
      },
      {
        title: 'Fuel cap outside the seat',
        text: 'You can refuel without getting off and lifting the seat, which saves time at a busy petrol pump.',
      },
      {
        title: 'Roomy for two',
        text: 'A long, wide seat and under-seat storage make it comfortable to share with a passenger and a bag.',
      },
    ],
    faqs: [
      {
        q: 'Can I rent the Destini 125 for a week?',
        a: 'Yes. Weekly bookings are fine. Give us the exact dates and we confirm availability and the price for that period.',
      },
      {
        q: 'Which licence do I need?',
        a: 'A valid two-wheeler licence for this type of vehicle. Since it is gearless, a licence for motorcycles without gear works, as does one with gear.',
      },
      {
        q: 'How do I know what documents to carry?',
        a: 'Our reply to your enquiry lists the documents and the security deposit, so you know before you book.',
      },
    ],
  },

  'hero-hf-deluxe': {
    publish: true,
    summary:
      'Hero HF Deluxe on rent in Gorakhpur. A simple commuter motorcycle for everyday travel. Share your dates to check availability.',
    intro: `The Hero HF Deluxe is a basic commuter motorcycle with a manual gearbox. It is the kind of bike you see carrying people to work across towns and villages in Uttar Pradesh every morning: simple, upright and unfussy. If you are comfortable with a clutch and gears and just need dependable daily transport while you are in Gorakhpur, it does the job without extras.

It suits someone commuting to a job or site for a week or two, or a person who has to cover a few nearby villages in a day. To book, send an enquiry with your dates, call, or WhatsApp +91 85760 00083. We confirm availability, the price, the documents to show, the security deposit and any kilometre limit before you book, and give you a reference number. The law requires helmets for rider and pillion; tell us if you need them.`,
    highlights: [
      {
        title: 'Built for economy',
        text: 'The HF Deluxe is one of India’s plainest commuters, known for keeping running costs down on daily trips.',
      },
      {
        title: 'Light and manageable',
        text: 'It is light for a motorcycle, so it is easy to handle on village roads, in mud lanes and while parking.',
      },
      {
        title: 'Long, flat seat',
        text: 'The single long seat gives the rider and a pillion room to sit comfortably for everyday rides.',
      },
      {
        title: 'Known to every mechanic',
        text: 'It is so common in Uttar Pradesh that help for a puncture or a small fix is never far away.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a geared motorcycle licence for this bike?',
        a: 'Yes. The HF Deluxe has gears, so you need a valid two-wheeler licence for this type of vehicle, which means a licence for motorcycles with gear.',
      },
      {
        q: 'Can I rent it for a week of daily commuting?',
        a: 'Yes. Tell us the start and end dates in your enquiry and we confirm whether the bike is available for the whole period.',
      },
      {
        q: 'What documents and deposit are needed?',
        a: 'We confirm the documents and the security deposit when we reply to your enquiry.',
      },
    ],
  },

  'hero-passion-pro': {
    publish: true,
    summary:
      'Rent a Hero Passion Pro commuter motorcycle in Gorakhpur for work trips or a week in the city. Enquire online, by phone or WhatsApp.',
    intro: `The Hero Passion Pro is a commuter motorcycle with a little more styling than the most basic models, while staying easy to ride in city traffic. It has a manual gearbox and an upright seating position, so it works for daily use as well as for a few longer rides out of town at the weekend.

People who come to Gorakhpur for work, training or a family function often want their own transport for a week instead of booking autos every day, and a bike like this fits that need. Booking is simple. Send an enquiry with your dates through the website, or WhatsApp or call +91 85760 00083. Before anything is confirmed, we tell you if it is available, what it costs, the documents you need to show, the security deposit and any kilometre limit. You receive a reference number for your enquiry. Helmets for both rider and pillion are a legal requirement, so ask us about them.`,
    highlights: [
      {
        title: 'i3S stop-start',
        text: 'The engine pauses itself in long traffic halts and starts again the moment you use the throttle or clutch.',
      },
      {
        title: 'Digital instrument display',
        text: 'The console shows more than a basic speedometer, which helps when you are riding a bike that is not your own.',
      },
      {
        title: 'Smarter commuter styling',
        text: 'It looks a step above the entry-level commuters while riding just as easily in town.',
      },
      {
        title: 'Suits office routines',
        text: 'A good fit for professionals who need a dependable bike for the same office route every day for a week or two.',
      },
    ],
    faqs: [
      {
        q: 'Is the Passion Pro a geared bike?',
        a: 'Yes, it has a manual gearbox with a clutch. You need a valid two-wheeler licence for this type of vehicle, that is, one for motorcycles with gear.',
      },
      {
        q: 'Can I take it outside Gorakhpur?',
        a: 'Tell us where you plan to ride when you enquire. We confirm any kilometre limit and conditions in our reply before you book.',
      },
      {
        q: 'What do I need to show when I pick it up?',
        a: 'We list the documents and the security deposit in our reply to your enquiry.',
      },
    ],
  },

  'hero-xtreme-160r': {
    publish: true,
    summary:
      'Hero Xtreme 160R sporty street bike on rent in Gorakhpur for experienced riders. Send your dates and we confirm availability.',
    intro: `The Hero Xtreme 160R is a sporty street motorcycle, with a sharper look and a more eager feel than an everyday commuter. It is meant for riders who already know their way around a geared bike and want something livelier for city rides, or for day trips on the highways around Gorakhpur.

If you are new to riding, one of our scooters or commuter bikes will be easier to start on. For experienced riders, the Xtreme 160R makes sense for a weekend or a week of exploring. Enquire with your dates on the website, or send a WhatsApp message to +91 85760 00083. Our answer comes with availability, the price, the documents required, the security deposit and any kilometre limit, so you have the full picture before you book. Every enquiry gets a reference number. Rider and pillion must both wear helmets under Indian law; ask about helmets when you write.`,
    highlights: [
      {
        title: 'Nimble in traffic',
        text: 'For a sporty street bike it feels light and agile, so it threads through city traffic without much effort.',
      },
      {
        title: 'Five-speed gearbox',
        text: 'A smooth manual gearbox lets an experienced rider make the most of open stretches outside the city.',
      },
      {
        title: 'Sharp street styling',
        text: 'Its aggressive design gives it a sportier presence than a regular commuter motorcycle.',
      },
      {
        title: 'Weekdays and weekends',
        text: 'It works for daily rides through town and for a weekend run out of Gorakhpur on the same booking.',
      },
    ],
    faqs: [
      {
        q: 'Who is the Xtreme 160R suited to?',
        a: 'Riders who are already comfortable on a geared motorcycle. If you are still learning, a scooter or commuter bike is a better fit.',
      },
      {
        q: 'Which licence do I need?',
        a: 'A valid two-wheeler licence for this type of vehicle. As it is a geared motorcycle, that means a licence for motorcycles with gear.',
      },
      {
        q: 'Can I book it for a weekend ride?',
        a: 'Yes. Send us the dates and your rough plan, and we confirm availability, the price, the deposit and any kilometre limit before you book.',
      },
    ],
  },

  'bajaj-discover-125': {
    publish: true,
    summary:
      'Bajaj Discover 125 on rent in Gorakhpur. A 125 cc commuter motorcycle for daily travel. Enquire by form, phone or WhatsApp.',
    intro: `The Bajaj Discover 125 is a 125 cc commuter motorcycle with a manual gearbox. It sits between the entry-level bikes and the sportier models: easy enough for daily city riding, with room for a passenger on the back. It is a steady choice if you need to get around Gorakhpur for work for several days, or visit a few places in the district.

You can book by sending an enquiry with your dates, messaging us on WhatsApp at +91 85760 00083, or calling the same number. We reply with availability, the price, the documents you need to show, the security deposit and any kilometre limit before you book, and each enquiry has its own reference number. Our head office is at Railway Station Gate No-1, Gorakhpur. Helmets are compulsory in India for the rider and pillion, so bring this up when you contact us.`,
    highlights: [
      {
        title: 'Happy with a pillion',
        text: 'It keeps pulling steadily with a passenger on the back, which the most basic commuters can struggle with.',
      },
      {
        title: 'Comfort-tuned suspension',
        text: 'The rear suspension is set up to take the edge off broken roads and village tracks.',
      },
      {
        title: 'Good for field work',
        text: 'Sales staff, surveyors and anyone visiting several places in the district in a day will find it a practical tool.',
      },
    ],
    faqs: [
      {
        q: 'Do I need a licence with gear for the Discover 125?',
        a: 'Yes. It is a geared motorcycle, so you need a valid two-wheeler licence for this type of vehicle, which is one for motorcycles with gear.',
      },
      {
        q: 'Can I rent it for more than one week?',
        a: 'You can ask for any period. Give us the dates and we confirm availability and the price for the full booking.',
      },
      {
        q: 'Where do I collect the bike?',
        a: 'Our head office is at Railway Station Gate No-1, Gorakhpur. We confirm the pickup arrangement, documents and deposit when we reply.',
      },
    ],
  },

  'bajaj-pulsar-150': {
    publish: true,
    summary:
      'Rent a Bajaj Pulsar 150 in Gorakhpur, a sporty 150 cc street bike for confident riders. Share your dates and we reply with details.',
    intro: `The Bajaj Pulsar 150 is a sporty 150 cc street motorcycle and has long been a familiar sight with young riders across India. It is heavier and quicker than a basic commuter, with a manual gearbox, and feels at home both in town and on open roads.

It suits a rider with some experience who wants to explore Gorakhpur and the surrounding area, or a couple heading out for a day ride. Renting it takes an enquiry: send your dates through our website, or WhatsApp or call +91 85760 00083. Before you book, we confirm whether it is available, the price, the documents you need to show, the security deposit and any kilometre limit. We give every enquiry a reference number. Helmets are required by law for rider and pillion, so ask about helmets when you enquire.`,
    highlights: [
      {
        title: 'Twin-spark engine',
        text: 'Bajaj’s DTS-i twin-spark design gives the Pulsar a lively feel that commuter bikes lack.',
      },
      {
        title: 'Five-speed gearbox',
        text: 'The extra gear makes it relaxed to ride on open highways around Gorakhpur as well as in town.',
      },
      {
        title: 'Balanced handling',
        text: 'It is heavier than a commuter but well balanced, so it stays settled with a pillion on board.',
      },
      {
        title: 'Spares everywhere',
        text: 'The Pulsar is so widespread that parts and mechanics are easy to find on the road.',
      },
    ],
    faqs: [
      {
        q: 'Is the Pulsar 150 good for a first-time rider?',
        a: 'It is better suited to someone already comfortable on a geared motorcycle. Newer riders may prefer a scooter or a lighter commuter bike.',
      },
      {
        q: 'What licence do I need?',
        a: 'A valid two-wheeler licence for this type of vehicle. For a geared bike like the Pulsar, that is a licence for motorcycles with gear.',
      },
      {
        q: 'How much is the deposit?',
        a: 'It depends on the booking. We tell you the deposit and the documents needed when we reply to your enquiry, before you book.',
      },
    ],
  },

  'bajaj-avenger-220': {
    publish: true,
    summary:
      'Bajaj Avenger 220 cruiser on rent in Gorakhpur for relaxed rides and longer trips. Enquire with your dates online or on WhatsApp.',
    intro: `The Bajaj Avenger 220 is a cruiser, built for a relaxed riding position rather than speed. The seat is low, the handlebar comes back towards you and your feet sit forward, so it feels easy-going on long stretches of road. It fits experienced riders who want to spend a few days touring out of Gorakhpur at an unhurried pace, or a couple who want a comfortable ride through the city.

To rent the Avenger, send an enquiry with your dates, or WhatsApp us on +91 85760 00083. If you plan a longer trip, mention your route. We come back with availability, the price, the documents to show, the security deposit and any kilometre limit, and you book only once you are happy with those. You get a reference number for the enquiry. By law, both rider and pillion must wear helmets in India, so let us know if you need them.`,
    highlights: [
      {
        title: 'Laid-back riding position',
        text: 'The low seat, swept-back handlebar and forward footpegs keep you relaxed on a long ride.',
      },
      {
        title: 'Low centre of gravity',
        text: 'The weight sits low, so the bike feels steady at walking pace and easy to hold up at a stop.',
      },
      {
        title: 'Pillion backrest',
        text: 'A passenger gets a backrest, which makes longer rides far more comfortable for the person behind.',
      },
      {
        title: 'Unhurried highway cruising',
        text: 'It suits touring at an easy pace rather than rushing, for riders who enjoy the journey itself.',
      },
    ],
    faqs: [
      {
        q: 'What kind of motorcycle is the Avenger 220?',
        a: 'It is a cruiser with a low seat and a laid-back riding position, suited to relaxed rides and longer trips by experienced riders.',
      },
      {
        q: 'Do I need a licence with gear?',
        a: 'Yes. You need a valid two-wheeler licence for this type of vehicle, which for a geared motorcycle is a licence for motorcycles with gear.',
      },
      {
        q: 'Can I take it on a multi-day trip?',
        a: 'Tell us your dates and route when you enquire. We confirm availability, the price, the deposit and any kilometre limit before you book.',
      },
    ],
  },

  'royal-enfield-classic-350': {
    publish: true,
    summary:
      'Rent a Royal Enfield Classic 350 in Gorakhpur, a retro-styled 350 cc motorcycle for longer rides. Enquire by form or WhatsApp.',
    intro: `The Royal Enfield Classic 350 is a retro-styled 350 cc motorcycle with the look and steady thump that Royal Enfield is known for. It is heavier than a commuter bike and has a manual gearbox, so it is best for riders who are already comfortable on bigger motorcycles. Many people rent one simply to enjoy the ride, whether that is a slow evening loop through Gorakhpur or a longer run on the highway.

It suits experienced riders planning a weekend trip, or anyone who has wanted to spend a few days on a Royal Enfield. Send an enquiry with your dates, or WhatsApp us on +91 85760 00083. Along with a reference number, our reply gives you availability, the price, the documents you need to show, the security deposit and any kilometre limit, all before you book. Helmets are required by law for rider and pillion, so ask about helmets when you enquire.`,
    highlights: [
      {
        title: 'The Royal Enfield thump',
        text: 'Its single-cylinder engine has the deep, steady beat that many riders rent a Royal Enfield for.',
      },
      {
        title: 'Solid, planted build',
        text: 'The heavy steel construction keeps the bike stable and composed on the highway.',
      },
      {
        title: 'Timeless retro looks',
        text: 'Its classic design suits occasion rides and photographs as well as touring.',
      },
      {
        title: 'Five-speed gearbox',
        text: 'A relaxed manual gearbox made for steady cruising rather than quick sprints.',
      },
    ],
    faqs: [
      {
        q: 'Is the Classic 350 hard to handle?',
        a: 'It is a heavier motorcycle than a typical commuter, so we suggest it for riders who are already comfortable on geared bikes.',
      },
      {
        q: 'What licence and documents do I need?',
        a: 'A valid two-wheeler licence for this type of vehicle, meaning one for motorcycles with gear. We confirm the other documents and the deposit when we reply.',
      },
      {
        q: 'Can I rent it for a week-long trip?',
        a: 'Yes, you can ask for a week or longer. Share your dates and plans, and we confirm availability and any kilometre limit before you book.',
      },
    ],
  },

  'royal-enfield-thunderbird-350': {
    publish: true,
    summary:
      'Royal Enfield Thunderbird 350 on rent in Gorakhpur, a 350 cc cruiser for relaxed touring. Send your dates to check availability.',
    intro: `The Royal Enfield Thunderbird 350 is a 350 cc cruiser designed with touring in mind. Compared with the Classic, it has a more laid-back posture that many riders find comfortable over long distances. It has a manual gearbox and some weight to it, so it suits people who already have experience on larger motorcycles.

If you plan to ride out of Gorakhpur for a few days, or want an easy-paced motorcycle for a trip with a pillion, the Thunderbird is worth asking about. Call, WhatsApp +91 85760 00083, or use the enquiry form, and include your dates. We reply with availability, the price, the documents you need to show, the security deposit and any kilometre limit before you book. Your enquiry is given a reference number. Indian law requires helmets for the rider and pillion, and we can talk about helmets when you contact us.`,
    highlights: [
      {
        title: 'Touring posture',
        text: 'A more upright, relaxed seating position than the Classic, so long days in the saddle are easier.',
      },
      {
        title: 'Big fuel tank',
        text: 'A large tank means fewer stops to refuel when you are riding between towns.',
      },
      {
        title: 'Stable on the highway',
        text: 'The touring chassis and its weight keep the Thunderbird calm at a steady highway pace.',
      },
      {
        title: 'Pillion comfort',
        text: 'A wide seat and backrest make it a good choice when you ride with a passenger.',
      },
    ],
    faqs: [
      {
        q: 'How is the Thunderbird different from the Classic 350?',
        a: 'Both are 350 cc Royal Enfield motorcycles. The Thunderbird is a cruiser with a more relaxed, touring-style riding position, while the Classic has retro styling.',
      },
      {
        q: 'Which licence do I need?',
        a: 'A valid two-wheeler licence for this type of vehicle. For this geared motorcycle, that is a licence for motorcycles with gear.',
      },
      {
        q: 'What do you need from me to book?',
        a: 'Your dates first. We then confirm availability, the price, the documents you need to show and the security deposit before you book.',
      },
    ],
  },

  'jawa-classic': {
    publish: true,
    summary:
      'Rent a Jawa motorcycle in Gorakhpur, a classic retro bike for experienced riders. Enquire online, by phone or on WhatsApp.',
    intro: `Jawa is a name many Indian families remember from the motorcycles of past decades, and today’s Jawa bikes keep that classic retro look. This is a geared motorcycle with a manual clutch, aimed at riders who enjoy the style and feel of an old-school bike on the road. It works for relaxed rides around Gorakhpur or a day out to nearby towns.

It is best for experienced riders, or someone who wants a few days on a classic-looking motorcycle for a trip or a special occasion. Write to us with your dates through the enquiry form, or on WhatsApp at +91 85760 00083. We let you know if the Jawa is free, the price, the documents to bring, the security deposit and any kilometre limit, before you book anything. Every enquiry is given a reference number. Helmets are required by law in India for rider and pillion, so ask about helmets when you enquire.`,
    highlights: [
      {
        title: 'Twin exhausts',
        text: 'The twin exhaust pipes are part of the classic Jawa look that many families remember.',
      },
      {
        title: 'Retro look, modern engine',
        text: 'The bike looks old-school but uses a liquid-cooled engine, so it rides like a modern motorcycle.',
      },
      {
        title: 'Made for shoots',
        text: 'Its heritage styling makes it a favourite for photo shoots, videos and themed rides.',
      },
      {
        title: 'For experienced riders',
        text: 'It suits riders who already ride geared bikes and want a few days on a classic machine.',
      },
    ],
    faqs: [
      {
        q: 'Which Jawa model is this?',
        a: 'Ask in your enquiry and we will tell you the exact model available for your dates before you book.',
      },
      {
        q: 'Do I need a licence with gear to ride the Jawa?',
        a: 'Yes. You need a valid two-wheeler licence for this type of vehicle, which for a geared motorcycle is a licence for motorcycles with gear.',
      },
      {
        q: 'Can I rent it for a week?',
        a: 'Yes. Give us the dates and we confirm availability, the price, the documents, the deposit and any kilometre limit before you book.',
      },
    ],
  },
}
