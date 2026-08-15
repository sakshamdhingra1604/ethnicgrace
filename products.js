/**
 * Ethnic Grace - Store Data & WhatsApp Helpers
 */
const DEFAULT_STORE_CONFIG = {
    storeName: "Ethnic Grace",
    tagline: "PREMIUM ETHNIC WEARS • PANIPAT",
    phone: "919518285233", // WhatsApp Number
    announcement: "🎉 GRAND OPENING SALE: Flat 10% OFF on All New Arrivals | 📍 Visit our Boutique: Uttam Nagar, Devi Mandir Main Road, Panipat | Worldwide Shipping 📦",
    currency: "₹",
    address: "Plot no. 99, Uttam Nagar, Devi Mandir Main Road, Panipat - 132103",
    adminPin: "Chirag@12300"
};

const DEFAULT_PRODUCTS = [
    {
        id: "EG-101",
        title: "Panipat Special: Crimson Embroidered Anarkali Suit",
        category: "Anarkali Sets",
        fabric: "Pure Georgette with Heavy Zari & Sequence Handwork",
        originalPrice: 2999,
        salePrice: 2699,
        badge: "Grand Opening Special",
        inStock: true,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL", "Semi-Stitched"],
        description: "Panipat boutique launch exclusive! Handcrafted zari work on georgette with matching dupatta. Visit store for trial."
    },
    {
        id: "EG-102",
        title: "New Arrival: Pastel Blush Pink Chanderi Silk Suit",
        category: "Designer Suits",
        fabric: "Pure Chanderi Silk with Thread Work & Scalloped Organza Dupatta",
        originalPrice: 1999,
        salePrice: 1799,
        badge: "New Arrival",
        inStock: true,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
        sizes: ["M", "L", "XL", "XXL", "Unstitched"],
        description: "Lightweight royal Chanderi silk with pastel floral thread work. Try in-store at our Panipat shop."
    },
    {
        id: "EG-103",
        title: "Festive Ready: Mustard Gold Banarasi Brocade Kurti Set",
        category: "Festive Kurtis",
        fabric: "Banarasi Silk Brocade with Hand Zardozi Neckline",
        originalPrice: 1599,
        salePrice: 1439,
        badge: "Hot Seller",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        description: "Vibrant festive kurti set with pant & dupatta. Visit shop or inquire on WhatsApp."
    },
    {
        id: "EG-104",
        title: "Royal Velvet Heavy Embroidered Party Suit",
        category: "Designer Suits",
        fabric: "Micro Velvet 9000 with Intricate Tilla & Dori Work",
        originalPrice: 3499,
        salePrice: 3149,
        badge: "Panipat Special",
        inStock: true,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
        sizes: ["M", "L", "XL", "Semi-Stitched"],
        description: "Ultra-luxury micro-velvet suit featuring royal tilla embroidery paired with a banarasi dupatta."
    },
    {
        id: "EG-105",
        title: "Pure Handloom Lavender Kanjivaram Silk Saree",
        category: "Silk Sarees",
        fabric: "Pure Kanjivaram Silk with Rich Gold Zari Pallu",
        originalPrice: 3999,
        salePrice: 3599,
        badge: "10% OFF Launch",
        inStock: true,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
        sizes: ["Free Size (With Blouse Piece)"],
        description: "Authentic lavender Kanjivaram silk saree with traditional temple border and designer blouse piece."
    },
    {
        id: "EG-106",
        title: "Bridal Edition: Ivory & Champagne Heritage Lehenga",
        category: "Bridal Lehengas",
        fabric: "Raw Silk with Mirror Work, Pearls & Double Dupatta",
        originalPrice: 8999,
        salePrice: 7999,
        badge: "Grand Opening Bridal",
        inStock: true,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
        sizes: ["Semi-Stitched (Up to 44 Bust)"],
        description: "Stunning bridal lehenga in soft champagne ivory with real mirror work. Book in-store trial at Panipat."
    }
];

const STORAGE_KEYS = {
    PRODUCTS: "ethnic_grace_prod_v4",
    CONFIG: "ethnic_grace_conf_v4",
    CART: "ethnic_grace_bag_v4"
};

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
            console.error("Error loading products", e);
        }
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
            id: 'EG-' + Math.floor(100 + Math.random() * 900),
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

    // WhatsApp Message on clicking "Order Now / I am interested"
    getWhatsAppOrderUrl: function(product, selectedSize = null) {
        const config = this.getConfig();
        const phone = config.phone.replace(/[^0-9]/g, '');
        const sizeText = selectedSize ? `\n📏 *Size:* ${selectedSize}` : '';
        
        const message = 
`🌸 *Namaste Ethnic Grace Panipat!* 🌸
Hello, I am interested in this outfit from your website:

👗 *Product:* ${product.title}
💰 *Offer Price:* ${config.currency}${product.salePrice.toLocaleString('en-IN')} (MRP: ~${config.currency}${product.originalPrice.toLocaleString('en-IN)}~)${sizeText}
🧵 *Fabric:* ${product.fabric}
🆔 *Item Code:* ${product.id}

📍 *Store Visit / Shipping:*
Please share store availability at Panipat (Plot no. 99, Devi Mandir Road) or shipping details. Thank you!`;

        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    },

    // WhatsApp direct Contact Us Link
    getDirectWhatsAppUrl: function(customMsg = "") {
        const config = this.getConfig();
        const phone = config.phone.replace(/[^0-9]/g, '');
        const text = customMsg || "Hello Ethnic Grace Panipat! I would like to contact you regarding your designer suits collection and visit your shop at Devi Mandir Main Road.";
        return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }
};

window.StoreDB = StoreDB;
