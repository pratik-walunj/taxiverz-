const fs = require('fs');

const template = fs.readFileSync('mercedes-c-class.html', 'utf8');

const jaguarCars = [
    {
        file: 'jaguar-xe.html',
        name: 'Jaguar XE',
        image: 'jaguar xe.jpeg',
        title: 'Rent Jaguar XE in Gorakhpur - Taxiverz',
        description1: 'Experience British luxury with Jaguar XE rental services in Gorakhpur. This premium sports sedan combines elegant design with thrilling performance, making it perfect for weddings, corporate events, and special celebrations.',
        description2: 'The Jaguar XE features sporty interiors, premium leather seats, advanced safety features, and cutting-edge infotainment systems. Experience the perfect blend of performance and luxury. Renting a Jaguar XE will elevate your travel experience with style and sophistication.',
        seating: '5 (incl. Driver)',
        type: 'Sport Sedan',
        wedding: '₹10,000',
        outstation: '₹55/km',
        corporate: '₹7,500',
        subject: 'Jaguar XE Booking Request'
    },
    {
        file: 'jaguar-xf.html',
        name: 'Jaguar XF',
        image: 'jaguar xf.jpeg',
        title: 'Rent Jaguar XF in Gorakhpur - Taxiverz',
        description1: 'Experience executive British luxury with Jaguar XF rental services in Gorakhpur. This executive sedan represents the perfect balance of luxury, performance, and sophistication, ideal for weddings, corporate meetings, and VIP travel.',
        description2: 'The Jaguar XF features spacious executive interiors, premium Windsor leather seats, cutting-edge safety technology, and advanced infotainment systems. Experience unmatched comfort and prestige. Renting a Jaguar XF will make every journey memorable with elegance and class.',
        seating: '5 (incl. Driver)',
        type: 'Executive Sedan',
        wedding: '₹14,000',
        outstation: '₹70/km',
        corporate: '₹8,000',
        subject: 'Jaguar XF Booking Request'
    },
    {
        file: 'jaguar-xjl.html',
        name: 'Jaguar XJL',
        image: 'jagua xjl.jpeg',
        title: 'Rent Jaguar XJL in Gorakhpur - Taxiverz',
        description1: 'Experience the pinnacle of British luxury with Jaguar XJL rental services in Gorakhpur. This ultra-luxury sedan represents the ultimate in sophistication, comfort, and prestige, perfect for VIP weddings, high-profile corporate events, and exclusive celebrations.',
        description2: 'The Jaguar XJL features ultra-spacious executive rear seating, handcrafted Windsor leather, exclusive massage functions, and the finest materials. This is not just a car, it\'s a statement of success and elegance.',
        seating: '5 (incl. Driver)',
        type: 'Luxury Sedan',
        wedding: '₹18,000',
        outstation: '₹85/km',
        corporate: '₹10,000',
        subject: 'Jaguar XJL Booking Request'
    }
];

jaguarCars.forEach(car => {
    let content = template;
    
    // Replace title
    content = content.replace('Rent Mercedes C-Class in Gorakhpur - Taxiverz', car.title);
    
    // Replace heading
    content = content.replace('Rent Mercedes C-Class With Taxiverz', `Rent ${car.name} With Taxiverz`);
    
    // Replace descriptions
    content = content.replace(/Are you looking for a premium and luxurious vehicle.*?special celebrations\./s, car.description1);
    content = content.replace(/Inside the Mercedes C-Class.*?style and luxury\./s, car.description2);
    
    // Replace image
    content = content.replace('c class.png', car.image);
    content = content.replace('Mercedes C-Class', car.name);
    
    // Replace specs
    content = content.replace(/<p>Luxury Sedan<\/p>/, `<p>${car.type}</p>`);
    
    // Replace pricing
    content = content.replace('₹12,000', car.wedding);
    content = content.replace('₹60/km', car.outstation);
    content = content.replace('₹8,000', car.corporate);
    content = content.replace(/₹60\/km/g, car.outstation);
    
    // Replace form subject
    content = content.replace('Mercedes C-Class Booking Request', car.subject);
    
    // Replace all other Mercedes C-Class mentions
    content = content.replace(/Mercedes C-Class/g, car.name);
    
    fs.writeFileSync(car.file, content);
    console.log(`Created: ${car.file}`);
});

console.log('All Jaguar pages created successfully!');
