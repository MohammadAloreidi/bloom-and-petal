import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: number
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
  badge?: string
  description: string
}

interface CartItem extends Product {
  qty: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Blush Rose Bouquet',
    price: 68,
    rating: 4.9,
    reviews: 214,
    image: 'https://images.unsplash.com/photo-1533793241176-a270e75ef2ad?w=600&h=700&fit=crop&auto=format',
    category: 'Roses',
    badge: 'Best Seller',
    description: 'A dreamy arrangement of 24 soft blush garden roses, wrapped in ivory tissue and tied with a satin ribbon. Perfect for anniversaries, birthdays, or just because.',
  },
  {
    id: 2,
    name: 'White Lily Elegance',
    price: 54,
    rating: 4.8,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1631407779166-86952be9dbd7?w=600&h=700&fit=crop&auto=format',
    category: 'Lilies',
    badge: 'New',
    description: 'Crisp white Oriental lilies arranged with eucalyptus sprigs in a handblown glass vase. A timeless expression of grace and sympathy.',
  },
  {
    id: 3,
    name: 'Spring Tulip Mix',
    price: 46,
    rating: 4.7,
    reviews: 132,
    image: 'https://images.unsplash.com/photo-1618875390322-2ffb66579500?w=600&h=700&fit=crop&auto=format',
    category: 'Tulips',
    description: 'A vibrant mix of pink, cream, and coral tulips — 30 stems arranged loosely to capture the feeling of a freshly gathered field bouquet.',
  },
  {
    id: 4,
    name: 'Romantic Red Roses',
    price: 82,
    rating: 5.0,
    reviews: 303,
    image: 'https://images.unsplash.com/photo-1613508636209-cd13d894e15b?w=600&h=700&fit=crop&auto=format',
    category: 'Roses',
    badge: 'Popular',
    description: '50 long-stem red roses, hand-selected at peak bloom, arranged in a signature Bloom & Petal box. The ultimate romantic gesture.',
  },
  {
    id: 5,
    name: 'Garden Mixed Bouquet',
    price: 59,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1595467959554-9ffcbf37f10f?w=600&h=700&fit=crop&auto=format',
    category: 'Mixed Bouquets',
    description: 'A lush seasonal mix of peonies, ranunculus, sweet peas, and foliage — arranged with a wild, garden-gathered aesthetic.',
  },
  {
    id: 6,
    name: 'Bridal Ivory Collection',
    price: 145,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1521543832500-49e69fb2bea2?w=600&h=700&fit=crop&auto=format',
    category: 'Wedding Flowers',
    badge: 'Premium',
    description: 'Cascading bridal bouquet in ivory and soft white — roses, lisianthus, and trailing jasmine vine. Includes matching buttonhole.',
  },
  {
    id: 7,
    name: 'Pink Tulip Delight',
    price: 42,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1514615022492-f5a84056d23b?w=600&h=700&fit=crop&auto=format',
    category: 'Tulips',
    description: 'Twenty magenta-pink tulips in full bud, arranged in a kraft paper wrap. A cheerful gift that opens beautifully over several days.',
  },
  {
    id: 8,
    name: 'Pink & White Harmony',
    price: 63,
    rating: 4.7,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1602542212630-aee56b5fa0b0?w=600&h=700&fit=crop&auto=format',
    category: 'Mixed Bouquets',
    description: 'Soft pink roses paired with white ranunculus and baby\'s breath for a romantic, feminine arrangement that suits any occasion.',
  },
]

const CATEGORIES = [
  { name: 'All', icon: '✿' },
  { name: 'Roses', icon: '🌹' },
  { name: 'Tulips', icon: '🌷' },
  { name: 'Lilies', icon: '🌸' },
  { name: 'Mixed Bouquets', icon: '💐' },
  { name: 'Wedding Flowers', icon: '👰' },
  { name: 'Gifts', icon: '🎁' },
]

const CATEGORY_CARDS = [
  { name: 'Roses', img: 'https://images.unsplash.com/photo-1588523071614-2c9206c5fcbe?w=400&h=500&fit=crop&auto=format', count: '40+ varieties' },
  { name: 'Tulips', img: 'https://images.unsplash.com/photo-1617013411814-f5a83d005101?w=400&h=500&fit=crop&auto=format', count: '25+ varieties' },
  { name: 'Lilies', img: 'https://images.unsplash.com/photo-1704438563862-49be6f537b0f?w=400&h=500&fit=crop&auto=format', count: '18+ varieties' },
  { name: 'Mixed Bouquets', img: 'https://images.unsplash.com/photo-1667555150959-3e881131b9e4?w=400&h=500&fit=crop&auto=format', count: '30+ styles' },
  { name: 'Wedding Flowers', img: 'https://images.unsplash.com/photo-1595467959554-9ffcbf37f10f?w=400&h=500&fit=crop&auto=format', count: 'Bespoke packages' },
  { name: 'Gifts', img: 'https://images.unsplash.com/photo-1588350350572-d15ee4eeb4ed?w=400&h=500&fit=crop&auto=format', count: 'Curated sets' },
]

const TESTIMONIALS = [
  {
    name: 'Sophie Laurent',
    role: 'Loyal customer since 2021',
    avatar: 'SL',
    text: "The Blush Rose Bouquet I ordered for my mum's birthday arrived perfectly fresh and looking even more beautiful than the photos. The tissue wrapping and ribbon were such a thoughtful touch.",
    rating: 5,
  },
  {
    name: 'James & Emily Chen',
    role: 'Wedding clients',
    avatar: 'JE',
    text: "Bloom & Petal did our entire wedding florals and exceeded every expectation. The bridal bouquet was absolutely breathtaking — every guest asked about it. We couldn't recommend them more.",
    rating: 5,
  },
  {
    name: 'Margaux Delacroix',
    role: 'Corporate client',
    avatar: 'MD',
    text: "We use Bloom & Petal weekly for our office arrangements. The flowers are always impeccably fresh, the same-day delivery is genuinely reliable, and the team is an absolute pleasure to work with.",
    rating: 5,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <div className={`flex items-center gap-0.5 ${sz}`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={rating >= s ? 'text-amber-400' : 'text-gray-200'}>
          ★
        </span>
      ))}
    </div>
  )
}

function ProductCard({
  product,
  wishlist,
  onToggleWish,
  onAddCart,
  onOpen,
}: {
  product: Product
  wishlist: Set<number>
  onToggleWish: (id: number) => void
  onAddCart: (p: Product) => void
  onOpen: (p: Product) => void
}) {
  const wished = wishlist.has(product.id)
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#9c3f5d] text-white tracking-wide">
          {product.badge}
        </span>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleWish(product.id) }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${wished ? 'bg-[#d4708a] text-white' : 'bg-white/80 text-gray-400 hover:bg-[#f2c4ce] hover:text-[#9c3f5d]'}`}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {wished ? '♥' : '♡'}
      </button>
      <div
        className="overflow-hidden bg-[#f7f0ec] h-64"
        onClick={() => onOpen(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-semibold text-[#2d1f1f] text-sm leading-snug cursor-pointer hover:text-[#9c3f5d] transition-colors"
            onClick={() => onOpen(product)}
          >
            {product.name}
          </h3>
          <span className="text-[#9c3f5d] font-bold text-base shrink-0">${product.price}</span>
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <button
          onClick={() => onAddCart(product)}
          className="w-full py-2 rounded-xl text-sm font-medium bg-[#faf6f1] border border-[#e8ddd3] text-[#5c3d2e] hover:bg-[#9c3f5d] hover:text-white hover:border-[#9c3f5d] transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function ProductModal({
  product,
  wishlist,
  onToggleWish,
  onAddCart,
  onClose,
}: {
  product: Product
  wishlist: Set<number>
  onToggleWish: (id: number) => void
  onAddCart: (p: Product) => void
  onClose: () => void
}) {
  const [qty, setQty] = useState(1)
  const wished = wishlist.has(product.id)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/2 bg-[#f7f0ec] h-64 sm:h-auto overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="sm:w-1/2 p-6 flex flex-col">
            <button
              onClick={onClose}
              className="self-end text-gray-400 hover:text-gray-600 text-xl mb-4 -mt-1"
            >
              ✕
            </button>
            {product.badge && (
              <span className="self-start text-xs font-semibold px-2.5 py-1 rounded-full bg-[#9c3f5d] text-white mb-2 tracking-wide">
                {product.badge}
              </span>
            )}
            <h2 className="text-2xl font-semibold text-[#2d1f1f] leading-tight mb-1">{product.name}</h2>
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>
            <p className="text-[#5c3d2e]/70 text-sm leading-relaxed mb-4">{product.description}</p>
            <div className="text-2xl font-bold text-[#9c3f5d] mb-4">${product.price}</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-[#e8ddd3] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 hover:bg-[#f7f0ec] transition-colors text-[#5c3d2e]"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 hover:bg-[#f7f0ec] transition-colors text-[#5c3d2e]"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onToggleWish(product.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${wished ? 'bg-[#d4708a] text-white border-[#d4708a]' : 'border-[#e8ddd3] text-gray-400 hover:border-[#d4708a] hover:text-[#d4708a]'}`}
              >
                {wished ? '♥' : '♡'}
              </button>
            </div>
            <button
              onClick={() => { onAddCart(product); onClose() }}
              className="w-full py-3 rounded-xl font-medium bg-[#9c3f5d] text-white hover:bg-[#7d3049] transition-colors"
            >
              Add to Cart — ${(product.price * qty).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())
  const [activeCategory, setActiveCategory] = useState('All')
  const [modalProduct, setModalProduct] = useState<Product | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [bouquetConfig, setBouquetConfig] = useState({ flower: '', color: '', size: '' })
  const [bouquetSubmitted, setBouquetSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  function addToCart(p: Product) {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === p.id)
      if (ex) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
  }

  function toggleWishlist(id: number) {
    setWishlist((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filteredProducts =
    activeCategory === 'All' || activeCategory === 'Gifts'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory)

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="min-h-screen bg-[#faf6f1] text-[#2d1f1f]">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#faf6f1]/95 backdrop-blur border-b border-[#e8ddd3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">✿</span>
            <span className="font-['Fraunces'] font-semibold text-lg text-[#9c3f5d] tracking-tight">
              Bloom & Petal
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {['Home', 'Shop', 'Categories', 'About Us', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-[#5c3d2e]/80 hover:text-[#9c3f5d] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f2c4ce]/30 transition-colors text-[#5c3d2e]" aria-label="Search">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </button>
            <button
              onClick={() => setWishlist(wishlist)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f2c4ce]/30 transition-colors text-[#5c3d2e] relative"
              aria-label="Wishlist"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              {wishlist.size > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#d4708a] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlist.size}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#9c3f5d] text-white text-sm font-medium hover:bg-[#7d3049] transition-colors"
              aria-label="Cart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
              {cartCount > 0 && <span className="font-bold">{cartCount}</span>}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#f2c4ce]/30 transition-colors text-[#5c3d2e]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {mobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#e8ddd3] px-4 py-4 flex flex-col gap-3 fade-in">
            {['Home', 'Shop', 'Categories', 'About Us', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#5c3d2e] font-medium py-1.5 border-b border-[#e8ddd3] last:border-0"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section id="home" className="relative overflow-hidden bg-[#f7f0ec]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7d9b76] mb-4">
                Handcrafted with love · Est. 2018
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-[#2d1f1f] mb-6">
                Fresh Flowers<br />
                <em className="text-[#9c3f5d] not-italic">for Every</em><br />
                Special Moment
              </h1>
              <p className="text-[#5c3d2e]/70 text-lg leading-relaxed mb-8 max-w-md">
                Seasonal blooms, same-day delivery, and arrangements made with care — because every occasion deserves something beautifully real.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="px-7 py-3.5 rounded-xl bg-[#9c3f5d] text-white font-semibold hover:bg-[#7d3049] transition-colors shadow-md shadow-[#9c3f5d]/20"
                >
                  Shop Flowers
                </a>
                <a
                  href="#custom-bouquet"
                  className="px-7 py-3.5 rounded-xl border-2 border-[#9c3f5d] text-[#9c3f5d] font-semibold hover:bg-[#9c3f5d] hover:text-white transition-all"
                >
                  Create Your Bouquet
                </a>
              </div>
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[#e8ddd3]">
                {[['12k+', 'Happy customers'], ['24h', 'Same-day delivery'], ['100%', 'Fresh guarantee']].map(([val, lbl]) => (
                  <div key={val}>
                    <div className="text-xl font-bold text-[#9c3f5d]">{val}</div>
                    <div className="text-xs text-[#5c3d2e]/60">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-h-[600px] bg-[#f2c4ce]">
                <img
                  src="https://images.unsplash.com/photo-1571990306521-cf96e6858f2a?w=800&h=1000&fit=crop&auto=format"
                  alt="Beautiful beige rose bouquet"
                  className="w-full h-full object-cover"
                />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-lg">
                  <div className="text-xs text-[#7d9b76] font-semibold mb-0.5">Today's Special</div>
                  <div className="font-['Fraunces'] font-semibold text-[#2d1f1f]">Blush Rose Bouquet</div>
                  <div className="text-[#9c3f5d] font-bold">$68 — Free delivery</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#b5c9b1]/30 -z-10" />
              <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-full bg-[#f2c4ce]/40 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────────────── */}
      <section id="categories" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7d9b76] mb-3">Browse By</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2d1f1f]">Our Flower Families</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORY_CARDS.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#f7f0ec] cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <div className="text-white font-semibold text-sm leading-tight">{cat.name}</div>
                <div className="text-white/70 text-xs mt-0.5">{cat.count}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── BEST SELLERS ────────────────────────────────────────────────── */}
      <section id="shop" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7d9b76] mb-3">Hand-picked</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#2d1f1f]">Best Sellers</h2>
            </div>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
                    activeCategory === cat.name
                      ? 'bg-[#9c3f5d] text-white border-[#9c3f5d]'
                      : 'border-[#e8ddd3] text-[#5c3d2e] hover:border-[#9c3f5d] hover:text-[#9c3f5d]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-[#5c3d2e]/50">
              No flowers in this category yet — check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 fade-in">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  wishlist={wishlist}
                  onToggleWish={toggleWishlist}
                  onAddCart={addToCart}
                  onOpen={setModalProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM BOUQUET ──────────────────────────────────────────────── */}
      <section id="custom-bouquet" className="py-16 sm:py-24 bg-[#f7f0ec]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7d9b76] mb-3">Bespoke</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#2d1f1f] mb-4">
                Design Your Own<br />
                <em className="text-[#9c3f5d] not-italic">Dream Bouquet</em>
              </h2>
              <p className="text-[#5c3d2e]/70 leading-relaxed mb-8">
                Choose your flowers, colours, and size — our florists will craft a one-of-a-kind arrangement made especially for you. No two alike, every one unforgettable.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#2d1f1f] mb-2">Flower Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['Roses', 'Tulips', 'Lilies', 'Peonies', 'Mixed'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setBouquetConfig((c) => ({ ...c, flower: f }))}
                        className={`px-4 py-2 rounded-xl text-sm border transition-all ${bouquetConfig.flower === f ? 'bg-[#9c3f5d] text-white border-[#9c3f5d]' : 'border-[#e8ddd3] text-[#5c3d2e] hover:border-[#9c3f5d]'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d1f1f] mb-2">Colour Palette</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Blush', bg: '#f2c4ce' },
                      { name: 'Ivory', bg: '#f5eed8' },
                      { name: 'Crimson', bg: '#c0392b' },
                      { name: 'Lavender', bg: '#c9b8d9' },
                      { name: 'Sage', bg: '#7d9b76' },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setBouquetConfig((cfg) => ({ ...cfg, color: c.name }))}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm border transition-all ${bouquetConfig.color === c.name ? 'border-[#9c3f5d] ring-2 ring-[#9c3f5d]/30' : 'border-[#e8ddd3]'}`}
                      >
                        <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: c.bg }} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2d1f1f] mb-2">Bouquet Size</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Petite', sub: '10–15 stems', price: 'from $35' },
                      { label: 'Classic', sub: '20–25 stems', price: 'from $55' },
                      { label: 'Grand', sub: '40–50 stems', price: 'from $95' },
                    ].map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setBouquetConfig((c) => ({ ...c, size: s.label }))}
                        className={`flex-1 min-w-[90px] py-3 px-3 rounded-xl text-left border transition-all ${bouquetConfig.size === s.label ? 'bg-[#9c3f5d]/5 border-[#9c3f5d]' : 'border-[#e8ddd3] hover:border-[#9c3f5d]/50'}`}
                      >
                        <div className={`text-sm font-semibold ${bouquetConfig.size === s.label ? 'text-[#9c3f5d]' : 'text-[#2d1f1f]'}`}>{s.label}</div>
                        <div className="text-xs text-[#5c3d2e]/60">{s.sub}</div>
                        <div className="text-xs font-medium text-[#7d9b76] mt-0.5">{s.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {bouquetSubmitted ? (
                  <div className="w-full py-3.5 rounded-xl bg-[#7d9b76] text-white text-center font-semibold fade-in">
                    ✓ Request Received! We'll contact you shortly.
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (bouquetConfig.flower || bouquetConfig.color || bouquetConfig.size) {
                        setBouquetSubmitted(true)
                        setTimeout(() => setBouquetSubmitted(false), 4000)
                      }
                    }}
                    className="w-full py-3.5 rounded-xl bg-[#9c3f5d] text-white font-semibold hover:bg-[#7d3049] transition-colors shadow-md shadow-[#9c3f5d]/20"
                  >
                    Create My Bouquet
                  </button>
                )}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-3xl overflow-hidden aspect-square bg-[#f2c4ce] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1588350350572-d15ee4eeb4ed?w=700&h=700&fit=crop&auto=format"
                  alt="White and pink roses in bloom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-[#f2c4ce]/50 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY BENEFITS ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2d1f1f]">The Bloom & Petal Promise</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: '🚚',
              title: 'Same-Day Delivery',
              text: 'Order before 2 pm and your flowers arrive the same day — wherever you are in the city.',
            },
            {
              icon: '🌸',
              title: 'Fresh Flower Guarantee',
              text: "Every stem is sourced that morning. If they don't last 7 days, we'll replace them — no questions asked.",
            },
            {
              icon: '🔒',
              title: 'Secure Payments',
              text: 'All transactions are encrypted. Pay by card, Apple Pay, or Google Pay with complete confidence.',
            },
            {
              icon: '💌',
              title: 'Personal Gift Message',
              text: 'Add a handwritten note to any order — we print and tuck it in with beautiful care.',
            },
          ].map((b) => (
            <div key={b.title} className="group p-6 rounded-2xl bg-white border border-[#e8ddd3] hover:border-[#d4708a]/40 hover:shadow-md transition-all">
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="font-semibold text-[#2d1f1f] mb-2">{b.title}</h3>
              <p className="text-sm text-[#5c3d2e]/70 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#9c3f5d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f2c4ce] mb-3">What People Say</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">Loved by Thousands</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-amber-300 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f2c4ce] flex items-center justify-center text-[#9c3f5d] font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/50 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#f7f0ec]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-4xl mb-4 block">✉</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2d1f1f] mb-3">
            Seasonal Blooms in Your Inbox
          </h2>
          <p className="text-[#5c3d2e]/70 mb-8">
            Subscribe for first access to new arrivals, seasonal care guides, and exclusive discounts — delivered gently, never spammy.
          </p>
          {subscribed ? (
            <div className="py-4 px-6 rounded-xl bg-[#7d9b76] text-white font-semibold inline-block fade-in">
              ✓ You're on the list — welcome to the garden!
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true) }}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-[#e8ddd3] bg-white text-[#2d1f1f] placeholder-gray-400 text-sm focus:outline-none focus:border-[#9c3f5d] focus:ring-2 focus:ring-[#9c3f5d]/20 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#9c3f5d] text-white font-semibold text-sm hover:bg-[#7d3049] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-xs text-[#5c3d2e]/40 mt-4">No spam, ever. Unsubscribe with one click.</p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer id="contact" className="bg-[#2d1f1f] text-white/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">✿</span>
                <span className="font-['Fraunces'] font-semibold text-lg text-[#f2c4ce]">Bloom & Petal</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-5">
                Handcrafted floral arrangements made with love, delivered fresh to your door since 2018.
              </p>
              <div className="flex gap-3">
                {[
                  { label: 'Instagram', icon: '📷' },
                  { label: 'Facebook', icon: '📘' },
                  { label: 'Pinterest', icon: '📌' },
                  { label: 'TikTok', icon: '🎵' },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#9c3f5d] flex items-center justify-center transition-colors text-sm"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                {['Shop All Flowers', 'Best Sellers', 'Wedding Packages', 'Custom Bouquets', 'Gift Cards', 'About Us'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-[#f2c4ce] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div id="about-us">
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex gap-2"><span>📍</span><span>12 Rose Garden Lane, London W1B 4TH</span></li>
                <li className="flex gap-2"><span>📞</span><span>+44 20 7946 0321</span></li>
                <li className="flex gap-2"><span>✉</span><span>hello@bloomandpetal.co.uk</span></li>
              </ul>
            </div>

            {/* Opening hours */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Opening Hours</h4>
              <ul className="space-y-2 text-sm text-white/50">
                {[
                  ['Monday – Friday', '8:00 am – 7:00 pm'],
                  ['Saturday', '9:00 am – 6:00 pm'],
                  ['Sunday', '10:00 am – 4:00 pm'],
                  ['Same-day delivery', 'Order before 2:00 pm'],
                ].map(([day, time]) => (
                  <li key={day} className="flex justify-between gap-4">
                    <span>{day}</span>
                    <span className="text-[#f2c4ce]/70">{time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
            <span>© 2025 Bloom & Petal Ltd. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── PRODUCT MODAL ───────────────────────────────────────────────── */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          wishlist={wishlist}
          onToggleWish={toggleWishlist}
          onAddCart={addToCart}
          onClose={() => setModalProduct(null)}
        />
      )}

      {/* ── CART DRAWER ─────────────────────────────────────────────────── */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-sm fade-in"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="bg-white w-full max-w-sm h-full flex flex-col shadow-2xl fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8ddd3]">
              <h3 className="font-semibold text-[#2d1f1f] text-lg">
                Your Cart {cartCount > 0 && <span className="text-[#9c3f5d]">({cartCount})</span>}
              </h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="text-5xl mb-4">🌸</div>
                  <p className="text-[#5c3d2e]/50 text-sm">Your cart is empty</p>
                  <button onClick={() => setCartOpen(false)} className="mt-4 text-sm text-[#9c3f5d] font-medium hover:underline">
                    Start shopping →
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-3 items-start">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f7f0ec] shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#2d1f1f] truncate">{item.name}</div>
                        <div className="text-sm text-[#9c3f5d] font-bold mt-0.5">${item.price}</div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => setCart((c) => c.map((i) => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                            className="w-6 h-6 rounded border border-[#e8ddd3] text-xs flex items-center justify-center hover:bg-[#f7f0ec]"
                          >
                            −
                          </button>
                          <span className="text-sm w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => setCart((c) => c.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                            className="w-6 h-6 rounded border border-[#e8ddd3] text-xs flex items-center justify-center hover:bg-[#f7f0ec]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => setCart((c) => c.filter((i) => i.id !== item.id))}
                        className="text-gray-300 hover:text-red-400 transition-colors mt-0.5"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-[#e8ddd3] bg-[#faf6f1]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-[#5c3d2e]/70">Subtotal</span>
                  <span className="font-bold text-[#2d1f1f]">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-3.5 rounded-xl bg-[#9c3f5d] text-white font-semibold hover:bg-[#7d3049] transition-colors">
                  Proceed to Checkout
                </button>
                <p className="text-xs text-center text-[#5c3d2e]/40 mt-2">Free delivery on orders over $75</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
