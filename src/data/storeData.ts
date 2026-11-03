import type { DarkStore } from '../types/store';

export const sampleDarkStores: DarkStore[] = [
  {
    id: 'DS_NORTH',
    name: 'ZeptoSpeed North Hub',
    nodeId: 'N01',
    address: 'Plot 14, Sector 9 Commercial Complex, North Zone',
    rating: 4.8,
    deliveryTimeEstimate: '8-12 mins',
    inventory: {
      prod_milk: 35,
      prod_bread: 20,
      prod_eggs: 24,
      prod_butter: 15,
      prod_rice: 0, // OUT OF STOCK intentionally
      prod_fruits: 12,
      prod_vegetables: 30,
      prod_juice: 18,
    },
  },
  {
    id: 'DS_CENTRAL',
    name: 'FlashMart Central Mega-Depot',
    nodeId: 'N04',
    address: 'Underground Level 1, Downtown Central Square',
    rating: 4.9,
    deliveryTimeEstimate: '7-10 mins',
    inventory: {
      prod_milk: 80,
      prod_bread: 50,
      prod_eggs: 60,
      prod_butter: 45,
      prod_rice: 40, // Has everything!
      prod_fruits: 35,
      prod_vegetables: 70,
      prod_juice: 50,
    },
  },
  {
    id: 'DS_EAST',
    name: 'BlinkFast East Corridor Depot',
    nodeId: 'N08',
    address: 'East Tech Park Road, Gate 3 Logistics Bay',
    rating: 4.7,
    deliveryTimeEstimate: '10-14 mins',
    inventory: {
      prod_milk: 25,
      prod_bread: 18,
      prod_eggs: 0, // OUT OF STOCK
      prod_butter: 0, // OUT OF STOCK
      prod_rice: 15,
      prod_fruits: 40,
      prod_vegetables: 45,
      prod_juice: 30,
    },
  },
  {
    id: 'DS_WEST',
    name: 'QuickDrop West Industrial Pod',
    nodeId: 'N11',
    address: 'Warehouse Block C, Ring Road West Interchange',
    rating: 4.6,
    deliveryTimeEstimate: '12-16 mins',
    inventory: {
      prod_milk: 40,
      prod_bread: 30,
      prod_eggs: 36,
      prod_butter: 25,
      prod_rice: 50,
      prod_fruits: 0, // OUT OF STOCK
      prod_vegetables: 20,
      prod_juice: 0, // OUT OF STOCK
    },
  },
  {
    id: 'DS_SOUTH',
    name: 'HyperLocal South Riverfront Facility',
    nodeId: 'N14',
    address: 'Bridge End Commercial Hub, Riverside Promenade',
    rating: 4.8,
    deliveryTimeEstimate: '9-13 mins',
    inventory: {
      prod_milk: 28,
      prod_bread: 22,
      prod_eggs: 30,
      prod_butter: 0, // OUT OF STOCK
      prod_rice: 0, // OUT OF STOCK
      prod_fruits: 25,
      prod_vegetables: 50,
      prod_juice: 22,
    },
  },
];

