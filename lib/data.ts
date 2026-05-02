export interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: string;
  reviews: number;
  description: string;
  unit?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'atta-rice', name: 'Atta & Rice', icon: 'Wheat' },
  { id: 'dal-pulses', name: 'Dal & Pulses', icon: 'Database' },
  { id: 'oil-ghee', name: 'Oil & Ghee', icon: 'Droplet' },
  { id: 'snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'dairy', name: 'Dairy', icon: 'Milk' },
  { id: 'beverages', name: 'Beverages', icon: 'Coffee' },
  { id: 'personal-care', name: 'Personal Care', icon: 'Smile' },
  { id: 'household', name: 'Household', icon: 'Home' }
];

const generateProducts = () => {
  const products: any[] = [];
  const baseProducts: Record<string, any[]> = {
    'atta-rice': [
      { name: 'Aashirvaad Whole Wheat Atta', price: 210, image: 'https://images.unsplash.com/photo-1627485937980-221c88ce04ea?w=400&q=80' },
      { name: 'Fortune Chakki Fresh Atta', price: 195, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
      { name: 'India Gate Basmati Rice', price: 450, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
      { name: 'Kohinoor Everyday Rice', price: 320, image: 'https://images.unsplash.com/photo-1594488630113-17b73dc2a281?w=400&q=80' },
      { name: 'Patanjali Pustahar Atta', price: 200, image: 'https://images.unsplash.com/photo-1627485937980-221c88ce04ea?w=400&q=80' },
    ],
    'dal-pulses': [
      { name: 'Tata Sampann Toor Dal', price: 160, image: 'https://images.unsplash.com/photo-1611077543958-3d5f992323e0?w=400&q=80' },
      { name: 'Organic Tattva Moong Dal', price: 180, image: 'https://images.unsplash.com/photo-1585933646706-7b83f0eb3cb0?w=400&q=80' },
      { name: 'Rajdhani Chana Dal', price: 120, image: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?w=400&q=80' },
      { name: 'Fortune Masoor Dal', price: 110, image: 'https://images.unsplash.com/photo-1601262963383-7c5e21cff8f3?w=400&q=80' },
      { name: 'Premium Urad Dal Whole', price: 150, image: 'https://images.unsplash.com/photo-1604543501676-13ce32e18501?w=400&q=80' },
    ],
    'oil-ghee': [
      { name: 'Fortune Sunlite Refined Oil', price: 145, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' },
      { name: 'Amul Pure Ghee', price: 540, image: 'https://images.unsplash.com/photo-1628186154378-2c262804b4c8?w=400&q=80' },
      { name: 'Dhara Mustard Oil', price: 165, image: 'https://images.unsplash.com/photo-1620023602492-c1cba5df3896?w=400&q=80' },
      { name: 'Saffola Gold Blended Oil', price: 190, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' },
      { name: 'Patanjali Cow Ghee', price: 520, image: 'https://images.unsplash.com/photo-1628186154378-2c262804b4c8?w=400&q=80' },
    ],
    'snacks': [
      { name: 'Maggi 2-Minute Noodles', price: 14, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80' },
      { name: 'Haldiram Aloo Bhujia', price: 110, image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&q=80' },
      { name: 'Lays Classic Salted', price: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
      { name: 'Britannia Good Day', price: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80' },
      { name: 'Kurkure Masala Munch', price: 20, image: 'https://images.unsplash.com/photo-1600350720468-b7cbaeb9738c?w=400&q=80' },
    ],
    'dairy': [
      { name: 'Amul Taaza Milk', price: 32, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80' },
      { name: 'Mother Dairy Paneer', price: 85, image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=400&q=80' },
      { name: 'Britannia Cheese Slices', price: 130, image: 'https://images.unsplash.com/photo-1612454153927-1428a113ec4e?w=400&q=80' },
      { name: 'Amul Butter', price: 55, image: 'https://images.unsplash.com/photo-1589134731853-3b567a90b4bf?w=400&q=80' },
      { name: 'Sudha Curd/Dahi', price: 30, image: 'https://images.unsplash.com/photo-1559800720-333e68dfc949?w=400&q=80' },
    ],
    'beverages': [
      { name: 'Coca-Cola 1.25L', price: 65, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
      { name: 'Red Label Tea', price: 140, image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?w=400&q=80' },
      { name: 'Nescafe Classic Coffee', price: 160, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80' },
      { name: 'Real Fruit Juice - Mixed', price: 110, image: 'https://images.unsplash.com/photo-1622597467836-f3fc62e3d368?w=400&q=80' },
      { name: 'Thumbs Up 2L', price: 95, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
    ],
    'personal-care': [
      { name: 'Dettol Original Soap', price: 45, image: 'https://images.unsplash.com/photo-1584820927498-cafe6c1523b4?w=400&q=80' },
      { name: 'Colgate Strong Teeth', price: 85, image: 'https://images.unsplash.com/photo-1559591321-dfa52b8dc1c7?w=400&q=80' },
      { name: 'Clinic Plus Shampoo', price: 160, image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80' },
      { name: 'Nivea Soft Cream', price: 180, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80' },
      { name: 'Gillette Mach 3 Razor', price: 250, image: 'https://images.unsplash.com/photo-1550508138-04fc5e1104e6?w=400&q=80' },
    ],
    'household': [
      { name: 'Surf Excel Easy Wash', price: 120, image: 'https://images.unsplash.com/photo-1585834888849-0d3ee777f9db?w=400&q=80' },
      { name: 'Vim Dishwash Gel', price: 90, image: 'https://images.unsplash.com/photo-1584820927498-cafe6c1523b4?w=400&q=80' },
      { name: 'Harpic Toilet Cleaner', price: 85, image: 'https://images.unsplash.com/photo-1585834888849-0d3ee777f9db?w=400&q=80' },
      { name: 'Lizol Floor Cleaner', price: 105, image: 'https://images.unsplash.com/photo-1585834888849-0d3ee777f9db?w=400&q=80' },
      { name: 'Odonil Room Freshener', price: 55, image: 'https://images.unsplash.com/photo-1584820927498-cafe6c1523b4?w=400&q=80' },
    ]
  };

  let idCounter = 1;
  for (const [categoryId, items] of Object.entries(baseProducts)) {
    // Generate ~15 products per category to get 100+ total
    for (let i = 0; i < 3; i++) {
      for (const item of items) {
        let name = item.name;
        if (i === 1) name = 'Large ' + name;
        if (i === 2) name = 'Family Pack ' + name;
        
        const price = i === 0 ? item.price : item.price + (i * 20);
        
        products.push({
          id: idCounter.toString(),
          name,
          categoryId,
          price,
          originalPrice: price + 20, // To show some discount
          image: item.image,
          rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
          reviews: Math.floor(Math.random() * 500) + 10,
          description: `High quality ${name} from Rajdhani Store. Perfect for your daily needs. Sourced freshly for Inderpuri, Patna.`
        });
        idCounter++;
      }
    }
  }
  return products;
};

export const products = generateProducts();

export const productReviews = [
  { name: 'Rahul Sharma', rating: 5, comment: 'Great quality, fast delivery!', date: '2023-10-15' },
  { name: 'Priya Singh', rating: 4, comment: 'Good packaging and genuine product.', date: '2023-10-12' },
  { name: 'Amit Kumar', rating: 5, comment: 'Best grocery app in Patna.', date: '2023-10-10' },
  { name: 'Sneha Gupta', rating: 4, comment: 'Prices are reasonable, will order again.', date: '2023-10-08' },
  { name: 'Vikash Yadav', rating: 5, comment: 'Delivery was exactly on time.', date: '2023-10-05' },
];
