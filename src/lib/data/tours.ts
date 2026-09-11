export interface Tour {
  id: string;
  title: string;
  duration: string;
  locations: string;
  desc: string;
  longDesc?: string;
  bestFor?: string;
  img: string;
  tags: string[];
  price?: number;
  includes?: string[];
  excludes?: string[];
  itinerary?: { day: number; title: string; desc: string }[];
}

export const tours: Tour[] = [
  {
    id: 'wildlife-expedition',
    title: 'The Wildlife Expedition',
    duration: '7 Days / 6 Nights',
    locations: 'Yala, Udawalawe, Sinharaja',
    desc: 'The ultimate journey for nature lovers. Explore the dense jungles and open plains tracking leopards, elephants, and endemic birds.',
    longDesc: 'Embark on a week-long journey through Sri Lanka\'s most famous wildlife reserves. You\'ll spend days tracking the elusive Sri Lankan Leopard in Yala, witnessing the majestic elephant gatherings in Udawalawe, and trekking through the lush, biodiverse Sinharaja Forest Reserve. This tour is expertly designed for wildlife enthusiasts and photographers looking for the perfect shot.',
    img: 'https://images.unsplash.com/photo-1549472398-63458c89c8ea?q=80&w=1600&auto=format&fit=crop',
    tags: ['Wildlife', 'Nature', 'Photography'],
    price: 1250,
    includes: ['All accommodation', 'Daily breakfast & dinner', 'Private safari jeep', 'Expert naturalist guide', 'Park entrance fees'],
    excludes: ['International flights', 'Visas', 'Travel insurance', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrival & Transfer to Yala', desc: 'Welcome to Sri Lanka! You will be picked up from the airport and transferred directly to your luxury lodge bordering Yala National Park.' },
      { day: 2, title: 'Yala Full Day Safari', desc: 'A full day dedicated to tracking leopards, sloth bears, and crocodiles across the diverse landscapes of Yala.' },
      { day: 3, title: 'Journey to Udawalawe', desc: 'Morning drive to Udawalawe. Afternoon safari to see the massive herds of elephants roaming the grasslands.' },
      { day: 4, title: 'Sinharaja Rainforest', desc: 'Transfer to the Sinharaja rainforest region. Evening at leisure.' },
      { day: 5, title: 'Rainforest Trekking', desc: 'A full day guided trek through the dense Sinharaja forest to spot endemic birds, reptiles, and flora.' },
      { day: 6, title: 'Leisure & Reflection', desc: 'A relaxing day at your eco-lodge sharing stories of the wild.' },
      { day: 7, title: 'Departure', desc: 'Transfer back to the airport for your onward journey.' },
    ]
  },
  {
    id: 'cultural-triangle',
    title: 'Cultural Triangle Discovery',
    duration: '5 Days / 4 Nights',
    locations: 'Sigiriya, Dambulla, Polonnaruwa',
    desc: 'Step back in time and discover ancient kingdoms, towering rock fortresses, and sacred temples steeped in history.',
    longDesc: 'Explore the heart of Sri Lanka\'s ancient civilization. Climb the iconic Sigiriya Rock Fortress, wander the ruins of the ancient city of Polonnaruwa, and marvel at the intricate cave paintings of Dambulla. This tour perfectly balances history, culture, and stunning landscapes.',
    img: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1600&auto=format&fit=crop',
    tags: ['History', 'Culture', 'Sightseeing'],
    price: 850,
    includes: ['Boutique accommodation', 'Breakfast', 'Air-conditioned transport', 'English-speaking chauffeur guide', 'Entrance tickets to all cultural sites'],
    excludes: ['Lunches and dinners', 'Camera/video permits', 'Gratuities'],
    itinerary: [
      { day: 1, title: 'Arrival & Dambulla', desc: 'Arrival in Sri Lanka and transfer to Dambulla. Visit the magnificent Dambulla Cave Temple.' },
      { day: 2, title: 'Sigiriya Rock Fortress', desc: 'Early morning climb of the ancient Sigiriya Rock. Afternoon village tour and traditional lunch.' },
      { day: 3, title: 'Ancient Polonnaruwa', desc: 'Cycle through the ruins of Polonnaruwa, exploring ancient palaces and giant Buddha statues.' },
      { day: 4, title: 'Minneriya Safari', desc: 'Take a break from history with a thrilling afternoon jeep safari in Minneriya National Park.' },
      { day: 5, title: 'Departure', desc: 'Transfer to the airport.' },
    ]
  },
  {
    id: 'coastal-retreat',
    title: 'The Coastal Retreat',
    duration: '4 Days / 3 Nights',
    locations: 'Mirissa, Galle, Bentota',
    desc: 'Unwind on golden beaches, go whale watching in the deep blue sea, and explore the colonial architecture of the Galle Fort.',
    longDesc: 'Experience the laid-back rhythm of Sri Lanka\'s southern coast. From the pristine beaches of Mirissa to the historic cobblestone streets of the Galle Dutch Fort, this short getaway is perfect for those seeking relaxation with a touch of adventure.',
    img: 'https://images.unsplash.com/photo-1579724734891-b3bba12f8641?q=80&w=1600&auto=format&fit=crop',
    tags: ['Beach', 'Relaxation', 'Marine Life'],
    price: 600,
    includes: ['Beachfront accommodation', 'Breakfast', 'Whale watching boat tour', 'Transport'],
    excludes: ['Water sports', 'Spa treatments', 'Other meals'],
    itinerary: [
      { day: 1, title: 'Arrival & Bentota', desc: 'Transfer to Bentota. Relax by the beach and enjoy the sunset.' },
      { day: 2, title: 'Galle Fort Exploration', desc: 'Visit the historic Galle Fort, walk the ramparts, and explore the boutique shops.' },
      { day: 3, title: 'Whale Watching in Mirissa', desc: 'Early morning boat ride from Mirissa harbor to spot Blue Whales and Dolphins.' },
      { day: 4, title: 'Departure', desc: 'Morning swim and transfer to the airport.' },
    ]
  },
  {
    id: 'highland-tea-trails',
    title: 'Highland Tea Trails',
    duration: '6 Days / 5 Nights',
    locations: 'Nuwara Eliya, Ella, Kandy',
    desc: 'A scenic journey through misty mountains, lush green tea plantations, and stunning waterfalls in the heart of Sri Lanka.',
    longDesc: 'Travel up into the cool, misty highlands of Sri Lanka. You\'ll visit the sacred Temple of the Tooth in Kandy, take the world-famous scenic train ride to Ella, and wander through the rolling green hills of Nuwara Eliya, the heart of Ceylon Tea country.',
    img: 'https://images.unsplash.com/photo-1586514781447-0e6d5e1f0e4b?q=80&w=1600&auto=format&fit=crop',
    tags: ['Scenery', 'Mountains', 'Train Ride'],
    price: 950,
    includes: ['Luxury tea estate accommodation', 'Breakfast & Dinner', 'Train tickets (subject to availability)', 'Tea factory tour'],
    excludes: ['Optional excursions', 'Lunches', 'Drinks'],
    itinerary: [
      { day: 1, title: 'Kandy & Temple of the Tooth', desc: 'Arrival and transfer to Kandy. Evening visit to the Temple of the Sacred Tooth Relic.' },
      { day: 2, title: 'Journey to Nuwara Eliya', desc: 'Scenic drive up into the mountains. Visit a working tea factory and plantation.' },
      { day: 3, title: 'Horton Plains & World\'s End', desc: 'Early morning trek in Horton Plains National Park.' },
      { day: 4, title: 'Scenic Train to Ella', desc: 'Board the famous blue train for a breathtaking journey to Ella.' },
      { day: 5, title: 'Ella Explorations', desc: 'Hike to Little Adam\'s Peak and visit the iconic Nine Arch Bridge.' },
      { day: 6, title: 'Departure', desc: 'Descent from the hills and transfer to the airport.' },
    ]
  },
];
