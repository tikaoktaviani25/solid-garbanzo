# 📸 ShopSnap - Visual Product Search & Price Comparison

**ShopSnap** is a cutting-edge web application that revolutionizes online shopping by allowing users to find products instantly by taking a photo. Using AI-powered visual recognition, ShopSnap identifies products, compares prices across multiple retailers, and helps users save money.

## 🌟 Why ShopSnap?

ShopSnap addresses a real market need - **visual product search** is one of the most searched features that doesn't have a dedicated, comprehensive solution. While Google Lens and Pinterest Lens exist, they lack the shopping-focused features that users want:

- **Dedicated Shopping Experience**: Built specifically for product discovery and price comparison
- **Multi-Store Price Comparison**: Compare prices across 10+ major retailers instantly
- **Wishlist & Tracking**: Save products and track price changes
- **Search History**: Keep track of all your searches
- **Beautiful UI**: Modern, responsive design with smooth animations

## ✨ Key Features

### 🔍 AI-Powered Visual Search
- Upload or drag-and-drop product images
- Advanced AI recognition with confidence scores
- Instant product matching (1-3 seconds)
- Support for multiple product categories

### 💰 Price Comparison
- Compare prices across 10+ stores (Amazon, eBay, Walmart, Target, Best Buy, etc.)
- Real-time availability status
- Discount detection and savings calculation
- Shipping cost information
- Best price highlighting

### 💝 Wishlist Management
- Save favorite products
- Sort by price or date added
- Quick access to product details
- Total value calculation
- One-click removal

### 🕐 Search History
- Automatic search tracking
- Visual search history with thumbnails
- Re-search from history
- Clear individual or all searches
- Top match preview

### 📊 Product Details
- Comprehensive product information
- Multiple high-quality images
- Detailed specifications
- Customer ratings and reviews
- Brand and category information
- Direct links to purchase

### 📈 Statistics Dashboard
- Total searches performed
- Products found
- Wishlist items
- Total savings tracked

## 🎯 Product Categories

ShopSnap supports 50+ products across 9 categories:

- **Fashion**: Shoes, clothing, accessories, bags
- **Electronics**: Phones, laptops, tablets, smartwatches, TVs
- **Home & Living**: Kitchen appliances, furniture, bedding
- **Beauty**: Skincare, makeup, hair care
- **Sports**: Fitness equipment, athletic wear, outdoor gear
- **Accessories**: Watches, sunglasses, wallets, backpacks
- **Furniture**: Office chairs, desks, sofas, tables
- **Toys**: LEGO, RC cars, board games, drones
- **Books**: Fiction, cookbooks, educational

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4
- **State Management**: React Hooks
- **Storage**: Browser localStorage
- **Build Tool**: Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd shopsnap

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📖 How to Use

### 1. Search for Products

1. Navigate to the **Search** tab
2. Click "Choose Image" or drag-and-drop a product image
3. Wait 1-3 seconds for AI analysis
4. View matching products with confidence scores

### 2. Compare Prices

1. Click on any product card to view details
2. See prices from all available stores
3. Compare shipping costs and delivery times
4. Click "View at [Store]" to purchase

### 3. Manage Wishlist

1. Click the heart icon on any product
2. Navigate to **Wishlist** tab
3. Sort by price or date added
4. Remove items or view details

### 4. View History

1. Navigate to **History** tab
2. See all past searches with thumbnails
3. Click "Search Again" to re-run analysis
4. Delete individual searches or clear all

## 🎨 Design Features

### Visual Design
- **Gradient Backgrounds**: Purple to pink gradients throughout
- **Glassmorphism**: Frosted glass effects on cards
- **Dark Theme**: Eye-friendly dark color scheme
- **Smooth Animations**: Fade-in, slide-up, scale effects
- **Responsive Layout**: Works on mobile, tablet, and desktop

### User Experience
- **Intuitive Navigation**: Tab-based interface
- **Real-time Feedback**: Loading states and progress indicators
- **Empty States**: Helpful messages when no data
- **Hover Effects**: Interactive elements respond to mouse
- **Keyboard Accessible**: Full keyboard navigation support

## 📁 Project Structure

```
shopsnap/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main application page
├── components/
│   ├── CameraCapture.tsx    # Image upload interface
│   ├── ProductCard.tsx      # Product display card
│   ├── ProductDetails.tsx   # Detailed product modal
│   ├── Wishlist.tsx         # Wishlist management
│   └── SearchHistory.tsx    # Search history display
├── lib/
│   ├── imageAnalysis.ts     # AI image recognition (mock)
│   ├── productDatabase.ts   # Product data (50+ products)
│   ├── stores.ts            # Store information (10 stores)
│   └── storage.ts           # localStorage utilities
├── types/
│   └── index.ts             # TypeScript type definitions
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── next.config.ts           # Next.js configuration
```

## 🔧 Configuration

### Tailwind CSS

The app uses a custom Tailwind configuration with:
- Extended color palette (purple, pink gradients)
- Custom animations (fadeIn, slideUp, scaleIn)
- Responsive breakpoints
- Custom utilities

### TypeScript

Strict mode enabled with:
- Type checking for all files
- Path aliases (@/components, @/lib, @/types)
- Incremental compilation
- ES2022 target

## 🎯 Mock Data

### Products
- 50 realistic products across 9 categories
- Detailed attributes (color, size, material, weight)
- Multiple images per product
- Ratings and review counts
- Tags for search optimization

### Stores
- 10 major retailers
- Trust scores and ratings
- Shipping policies
- Return policies
- Store logos (emoji-based)

### Prices
- Dynamic price generation (±15% variation)
- Discount detection (20-40% off)
- Availability status (In Stock, Limited, Out of Stock)
- Shipping costs (free or calculated)
- Estimated delivery times

## 🔮 Future Enhancements

### Phase 1: Real AI Integration
- [ ] Integrate real computer vision API (Google Vision, AWS Rekognition)
- [ ] Implement actual product database
- [ ] Connect to real store APIs
- [ ] Real-time price updates

### Phase 2: Advanced Features
- [ ] Price drop alerts via email/push notifications
- [ ] Barcode scanning
- [ ] AR try-on for fashion items
- [ ] Similar products recommendations
- [ ] User accounts and cloud sync

### Phase 3: Social & Sharing
- [ ] Share products with friends
- [ ] Social login (Google, Facebook)
- [ ] Product reviews and ratings
- [ ] Community wishlists
- [ ] Shopping groups

### Phase 4: Mobile Apps
- [ ] React Native mobile app
- [ ] Camera integration
- [ ] Push notifications
- [ ] Offline mode
- [ ] Location-based deals

### Phase 5: Business Features
- [ ] Affiliate program integration
- [ ] Sponsored products
- [ ] Analytics dashboard
- [ ] API for third-party integration
- [ ] White-label solution

## 🐛 Known Limitations

- **Mock AI**: Currently uses simulated AI recognition
- **Static Data**: Product database is hardcoded
- **No Backend**: All data stored in browser localStorage
- **No Real Prices**: Prices are generated, not real-time
- **Limited Products**: Only 50 products in database

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- React team for the UI library
- All open-source contributors

## 📧 Contact & Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Email: support@shopsnap.com (placeholder)
- Twitter: @ShopSnapApp (placeholder)

## 🌐 Live Demo

Visit the live demo at: [https://shopsnap.vercel.app](https://shopsnap.vercel.app) (placeholder)

---

**ShopSnap** - Find it. Compare it. Buy it. 📸✨

Built with ❤️ using Next.js, React, and TypeScript
