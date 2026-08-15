/**
 * Ethnic Grace - Store Data Manager & Initial Catalog
 */

const DEFAULT_STORE_CONFIG = {
    storeName: "Ethnic Grace",
    tagline: "ETHNIC WEAR & DESIGNER BOUTIQUE",
    phone: "919876543210", // Default WhatsApp Number (with country code 91)
    announcement: "✨ Festive Special: Flat 40% OFF on Designer Suits | Free Shipping across India | COD Available on WhatsApp ✨",
    currency: "₹",
    instagram: "https://instagram.com",
    address: "Boutique Lane, Fashion Market, Delhi / NCR, India",
    adminPin: "1234"
};

const DEFAULT_PRODUCTS = [
    {
        id: "eg-101",
        title: "Royal Crimson Embroidered Anarkali Suit",
        category: "Anarkali Sets",
        fabric: "Pure Georgette with Heavy Zari & Sequence Embroidery",
        originalPrice: 3999,
        salePrice: 2399,
        badge: "Best Seller",
        inStock: true,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL", "Semi-Stitched"],
        description: "Exquisite hand-crafted embroidery on premium crimson georgette with a matching heavy work dupatta and santoon bottom. Perfect for weddings and festivals."
    },
    {
        id: "eg-102",
        title: "Pastel Blush Pink Chanderi Silk Suit",
        category: "Designer Suits",
        fabric: "Pure Chanderi Silk with Thread Work & Organza Dupatta",
        originalPrice: 2999,
        salePrice: 1799,
        badge: "Trending",
        inStock: true,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
        sizes: ["M", "L", "XL", "XXL", "Unstitched"],
        description: "Soft, breathable premium Chanderi silk adorned with delicate floral thread embroidery and a scalloped floral organza dupatta."
    },
    {
        id: "eg-103",
        title: "Mustard Gold Banarasi Brocade Kurti Set",
        category: "Festive Kurtis",
        fabric: "Banarasi Silk Brocade with Hand Zardozi Neckline",
        originalPrice: 2499,
        salePrice: 1499,
        badge: "Festive Special",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        description: "Radiant golden-yellow festive kurti with pants and chiffon dupatta. Rich woven motifs with refined craftsmanship."
    },
    {
        id: "eg-104",
        title: "Emerald Green Velvet Heavy Embroidered Suit",
        category: "Designer Suits",
        fabric: "Micro Velvet 9000 with Tilla & Dori Work",
        originalPrice: 4999,
        salePrice: 2999,
        badge: "Limited Edition",
        inStock: true,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
        sizes: ["M", "L", "XL", "Semi-Stitched"],
        description: "Opulent micro-velvet suit featuring royal Mughal tilla embroidery paired with a banarasi jacquard dupatta."
    },
    {
        id: "eg-105",
        title: "Handloom Lavender Kanjivaram Silk Saree",
        category: "Silk Sarees",
        fabric: "Pure Kanjivaram Silk with Rich Gold Zari Pallu",
        originalPrice: 5999,
        salePrice: 3499,
        badge: "Pure Silk",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
        sizes: ["Free Size (Includes Blouse Piece)"],
        description: "Drape yourself in royal grace with this authentic lavender Kanjivaram weave with intricate temple border and contrasting blouse piece."
    },
    {
        id: "eg-106",
        title: "Ivory & Champagne Bridal Heritage Lehenga",
        category: "Bridal Lehengas",
        fabric: "Raw Silk with Mirror Work, Pearls & Foil Work",
        originalPrice: 12999,
        salePrice: 7999,
        badge: "Royal Bridal",
        inStock: true,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
        sizes: ["Semi-Stitched (Up to 44 Bust/Waist)"],
        description: "Breathtaking bridal lehenga in soft champagne ivory with artisanal mirror work, heavy flare, and dual shaded soft net dupattas."
    }
];

// Storage keys
const STORAGE_KEYS = {
    PRODUCTS: "ethnic_grace_products_v2",
    CONFIG: "ethnic_grace_config_v2",
    CART: "ethnic_grace_cart_v2"
};

// Global Store API helper
const StoreDB = {
    getConfig: function() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.CONFIG);
            return data ? { ...DEFAULT_STORE_CONFIG, ...JSON.parse(data) } : DEFAULT_STORE_CONFIG;
        } catch (e) {
            return DEFAULT_STORE_CONFIG;
        }
    },

    saveConfig: function(config) {
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
        window.dispatchEvent(new Event('store_config_updated'));
    },

    getProducts: function() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
            if (data) {
                const parsed = JSON.parse(data);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch (e) {
            console.error("Error reading products:", e);
        }
        // Initialize with default
        this.saveProducts(DEFAULT_PRODUCTS);
        return DEFAULT_PRODUCTS;
    },

    saveProducts: function(products) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        window.dispatchEvent(new Event('store_products_updated'));
    },

    addProduct: function(product) {
        const products = this.getProducts();
        const newProduct = {
            id: 'eg-' + Date.now().toString().slice(-6),
            inStock: true,
            ...product
        };
        products.unshift(newProduct);
        this.saveProducts(products);
        return newProduct;
    },

    updateProduct: function(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            this.saveProducts(products);
            return products[index];
        }
        return null;
    },

    deleteProduct: function(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== id);
        this.saveProducts(products);
    },

    resetToDefault: function() {
        this.saveProducts(DEFAULT_PRODUCTS);
        this.saveConfig(DEFAULT_STORE_CONFIG);
    },

    // WhatsApp Message Generator
    getWhatsAppOrderUrl: function(product, selectedSize = null, customNote = "") {
        const config = this.getConfig();
        const phone = config.phone.replace(/[^0-9]/g, '');
        const sizeText = selectedSize ? `\n📏 *Selected Size:* ${selectedSize}` : '';
        const noteText = customNote ? `\n📝 *Note:* ${customNote}` : '';
        
        const message = 
`🌸 *Namaste Ethnic Grace Team!* 🌸
I would like to order / inquire about this outfit:

👗 *Product:* ${product.title}
💰 *Price:* ${config.currency}${product.salePrice.toLocaleString('en-IN')} (MRP: ~${config.currency}${product.originalPrice.toLocaleString('en-IN)}~)${sizeText}
🧵 *Fabric:* ${product.fabric}
🆔 *Code:* ${product.id}${noteText}

📍 *Delivery Info:*
Please confirm COD / online payment and shipping delivery time. Thank you!`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    },

    getGeneralWhatsAppUrl: function(customMsg = "") {
        const config = this.getConfig();
        const phone = config.phone.replace(/[^0-9]/g, '');
        const text = customMsg || "Hello Ethnic Grace, I'd like to check out your latest designer collection and place an order.";
        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }
};

// Export to window
window.StoreDB = StoreDB;
