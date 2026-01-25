export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand: string
  rating: number
  inStock: boolean
  tags: string[]
  imageUrl?: string
  createdAt: number
}

export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  publishYear: number
  genre: string
  pages: number
  rating: number
  description: string
  inStock: boolean
}

export interface User {
  id: string
  name: string
  email: string
  city: string
  country: string
  joinedAt: number
  age: number
  verified: boolean
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 149.99,
    category: 'Electronics',
    brand: 'AudioTech',
    rating: 4.5,
    inStock: true,
    tags: ['audio', 'wireless', 'bluetooth', 'noise-cancelling'],
    imageUrl: 'https://picsum.photos/seed/product1/400/400',
    createdAt: Date.now() - 86400000 * 30,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    category: 'Electronics',
    brand: 'TechWear',
    rating: 4.7,
    inStock: true,
    tags: ['wearable', 'fitness', 'smartwatch', 'gps'],
    imageUrl: 'https://picsum.photos/seed/product2/400/400',
    createdAt: Date.now() - 86400000 * 20,
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable mesh office chair with lumbar support',
    price: 249.99,
    category: 'Furniture',
    brand: 'ComfortPlus',
    rating: 4.3,
    inStock: true,
    tags: ['office', 'furniture', 'ergonomic', 'chair'],
    imageUrl: 'https://picsum.photos/seed/product3/400/400',
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches',
    price: 129.99,
    category: 'Electronics',
    brand: 'GamePro',
    rating: 4.6,
    inStock: false,
    tags: ['gaming', 'keyboard', 'mechanical', 'rgb'],
    imageUrl: 'https://picsum.photos/seed/product4/400/400',
    createdAt: Date.now() - 86400000 * 10,
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    price: 29.99,
    category: 'Sports',
    brand: 'HydroLife',
    rating: 4.8,
    inStock: true,
    tags: ['sports', 'water', 'insulated', 'eco-friendly'],
    imageUrl: 'https://picsum.photos/seed/product5/400/400',
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: '6',
    name: 'Laptop Stand Aluminum',
    description: 'Adjustable laptop stand for better ergonomics',
    price: 49.99,
    category: 'Accessories',
    brand: 'DeskMate',
    rating: 4.4,
    inStock: true,
    tags: ['laptop', 'stand', 'aluminum', 'ergonomic'],
    imageUrl: 'https://picsum.photos/seed/product6/400/400',
    createdAt: Date.now() - 86400000 * 8,
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with carrying strap',
    price: 39.99,
    category: 'Sports',
    brand: 'ZenFit',
    rating: 4.5,
    inStock: true,
    tags: ['yoga', 'fitness', 'mat', 'exercise'],
    imageUrl: 'https://picsum.photos/seed/product7/400/400',
    createdAt: Date.now() - 86400000 * 12,
  },
  {
    id: '8',
    name: 'Portable SSD 1TB',
    description: 'High-speed external SSD with USB-C connectivity',
    price: 179.99,
    category: 'Electronics',
    brand: 'DataDrive',
    rating: 4.9,
    inStock: true,
    tags: ['storage', 'ssd', 'portable', 'usb-c'],
    imageUrl: 'https://picsum.photos/seed/product8/400/400',
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: '9',
    name: 'Coffee Maker Automatic',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    category: 'Kitchen',
    brand: 'BrewMaster',
    rating: 4.2,
    inStock: true,
    tags: ['coffee', 'kitchen', 'automatic', 'appliance'],
    imageUrl: 'https://picsum.photos/seed/product9/400/400',
    createdAt: Date.now() - 86400000 * 25,
  },
  {
    id: '10',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 34.99,
    category: 'Electronics',
    brand: 'ClickPro',
    rating: 4.4,
    inStock: true,
    tags: ['mouse', 'wireless', 'ergonomic', 'computer'],
    imageUrl: 'https://picsum.photos/seed/product10/400/400',
    createdAt: Date.now() - 86400000 * 3,
  },
]

export const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    isbn: '978-0525559474',
    publishYear: 2020,
    genre: 'Fiction',
    pages: 304,
    rating: 4.2,
    description: 'A novel about the choices that go into a life well lived',
    inStock: true,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '978-0735211292',
    publishYear: 2018,
    genre: 'Self-Help',
    pages: 320,
    rating: 4.8,
    description: 'An easy and proven way to build good habits and break bad ones',
    inStock: true,
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    isbn: '978-0593135204',
    publishYear: 2021,
    genre: 'Science Fiction',
    pages: 496,
    rating: 4.7,
    description: 'A lone astronaut must save the earth from disaster',
    inStock: true,
  },
  {
    id: '4',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    isbn: '978-0857197689',
    publishYear: 2020,
    genre: 'Finance',
    pages: 256,
    rating: 4.6,
    description: 'Timeless lessons on wealth, greed, and happiness',
    inStock: false,
  },
  {
    id: '5',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    isbn: '978-0735219090',
    publishYear: 2018,
    genre: 'Fiction',
    pages: 384,
    rating: 4.5,
    description: 'A mystery set in the marshes of North Carolina',
    inStock: true,
  },
  {
    id: '6',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    isbn: '978-0062316097',
    publishYear: 2015,
    genre: 'History',
    pages: 443,
    rating: 4.4,
    description: 'A brief history of humankind',
    inStock: true,
  },
  {
    id: '7',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    isbn: '978-1250301697',
    publishYear: 2019,
    genre: 'Thriller',
    pages: 336,
    rating: 4.3,
    description: 'A shocking psychological thriller',
    inStock: true,
  },
  {
    id: '8',
    title: 'Educated',
    author: 'Tara Westover',
    isbn: '978-0399590504',
    publishYear: 2018,
    genre: 'Memoir',
    pages: 334,
    rating: 4.7,
    description: 'A memoir of a young woman who leaves her survivalist family',
    inStock: true,
  },
]

export const users: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    city: 'New York',
    country: 'USA',
    joinedAt: Date.now() - 86400000 * 365,
    age: 28,
    verified: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    city: 'London',
    country: 'UK',
    joinedAt: Date.now() - 86400000 * 180,
    age: 35,
    verified: true,
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol.white@example.com',
    city: 'Toronto',
    country: 'Canada',
    joinedAt: Date.now() - 86400000 * 90,
    age: 42,
    verified: false,
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@example.com',
    city: 'Sydney',
    country: 'Australia',
    joinedAt: Date.now() - 86400000 * 270,
    age: 31,
    verified: true,
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    city: 'Berlin',
    country: 'Germany',
    joinedAt: Date.now() - 86400000 * 45,
    age: 26,
    verified: true,
  },
]

export const collectionSchemas = {
  products: {
    name: 'products',
    fields: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'price', type: 'float' },
      { name: 'category', type: 'string', facet: true },
      { name: 'brand', type: 'string', facet: true },
      { name: 'rating', type: 'float' },
      { name: 'inStock', type: 'bool', facet: true },
      { name: 'tags', type: 'string[]', facet: true },
      { name: 'imageUrl', type: 'string', optional: true },
      { name: 'createdAt', type: 'int64' },
    ],
    default_sorting_field: 'createdAt',
  },
  books: {
    name: 'books',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'author', type: 'string', facet: true },
      { name: 'isbn', type: 'string' },
      { name: 'publishYear', type: 'int32' },
      { name: 'genre', type: 'string', facet: true },
      { name: 'pages', type: 'int32' },
      { name: 'rating', type: 'float' },
      { name: 'description', type: 'string' },
      { name: 'inStock', type: 'bool', facet: true },
    ],
    default_sorting_field: 'rating',
  },
  users: {
    name: 'users',
    fields: [
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'city', type: 'string', facet: true },
      { name: 'country', type: 'string', facet: true },
      { name: 'joinedAt', type: 'int64' },
      { name: 'age', type: 'int32' },
      { name: 'verified', type: 'bool', facet: true },
    ],
    default_sorting_field: 'joinedAt',
  },
}
