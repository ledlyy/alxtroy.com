export type Destination = {
  slug: string
  name: string
  region: string
  summary: string
  details: string[]
}

export const destinations: Destination[] = [
  {
    slug: 'latin-america-countries',
    name: 'Latin America Countries',
    region: 'Latin America',
    summary:
      'Alexander and Troy Tours coordinates programmes across Latin America, covering the countries listed below.',
    details: [
      'Argentina, Belize, Bolivia, Brazil, Chile, Colombia, Costa Rica, Ecuador, El Salvador, Falkland Islands, French Guiana, Guatemala, Guyana, Honduras, Mexico, Nicaragua, Panama, Paraguay, Peru, Suriname, Uruguay, Venezuela.',
    ],
  },
  {
    slug: 'panama',
    name: 'Panama',
    region: 'Latin America',
    summary:
      'Panama lies between North and South America with rainforest, island and canal experiences.',
    details: [
      'With diverse natural species and cultural composition, Panama enables travel from the Pacific to the Atlantic via the world-famous 48-mile Panama Canal.',
      'Signature sites include Panama City (Casco Antiguo, La Calzada de Amador, El Cangrejo, Gamboa, Punta Pacífica), Panama Canal, Causeway, Miraflores, Boquete, Casco Viejo, Bocas del Toro, Pearl Islands, San Blas Islands and El Valle de Antón.',
      'Spanish is the official language, with English widely spoken among professionals and business people.',
    ],
  },
  {
    slug: 'argentina',
    name: 'Argentina',
    region: 'Latin America',
    summary:
      'Argentina is a vast country known for tango, cuisine and dramatic landscapes.',
    details: [
      'Sights include Buenos Aires (Recoleta Cemetery, Palermo, Puerto Madero, Plaza de Mayo, Casa Rosada, Palermo Viejo, Avenida 9 de Julio, The Obelisk, Botanical Gardens, La Boca, Caminito Street, San Telmo), Iguazú Falls, Perito Moreno Glacier, Mount Fitz Roy, Salta, Jujuy, Salinas Grandes, Seven Colors Hill in Purmamarca, Patagonia, Mendoza, Andes Mountains, the delta of the Río Paraná, Córdoba, Alta Gracia and Mar del Plata.',
    ],
  },
  {
    slug: 'uruguay',
    name: 'Uruguay',
    region: 'Latin America',
    summary:
      'The second-smallest South American country with Atlantic coastline and historic towns.',
    details: [
      'Key sights include Montevideo, Plaza Independencia, Palacio Salvo, Rambla de Montevideo, Colonia del Sacramento, Río de la Plata, Punta del Este, Los Dedos Playa Brava (La Mano en la Arena) and José Ignacio.',
    ],
  },
  {
    slug: 'mexico',
    name: 'Mexico',
    region: 'Latin America',
    summary:
      'Mexico offers varied climates, cultural destinations and coastal retreats.',
    details: [
      'Highlighted locations: Oaxaca, Tulum, Playa del Carmen, Zihuatanejo, Cozumel, Guadalajara, Puerto Vallarta, San Miguel de Allende, Cabo San Lucas, Todos Santos, Cancun, Mérida, Mazatlán, Acapulco, La Paz, Puebla, Chihuahua and Mexico City.',
    ],
  },
  {
    slug: 'hawaii',
    name: "Hawai'i",
    region: 'North America',
    summary:
      'Hawai‘i comprises six major islands, each with distinct culture and landscapes.',
    details: [
      'Travellers can explore lush rain forests, towering waterfalls, spectacular beaches and active volcanoes while experiencing the spirit of aloha.',
    ],
  },
  {
    slug: 'canada',
    name: 'Canada',
    region: 'North America',
    summary:
      'Canada is the world’s second-largest country with vibrant cities and natural wonders.',
    details: [
      'It offers more than two million lakes, parliamentary democracy, multiple provinces and the opportunity to experience the Northern Lights and national parks.',
    ],
  },
]
