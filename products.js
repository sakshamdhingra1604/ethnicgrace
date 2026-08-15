/**
 * Ethnic Grace - Store Data & Configuration
 */
const STORE_DATA = {
    phone: "919518285233",
    storeName: "Ethnic Grace",
    address: "Plot no. 99, Uttam Nagar, Devi Mandir Main Road, Panipat - 132103",
    adminPin: "Chirag@12300",
    announcement: "🎉 GRAND OPENING SALE: Flat 10% OFF on All New Arrivals | 📍 Visit our Boutique: Uttam Nagar, Devi Mandir Main Road, Panipat | Worldwide Shipping 📦",
    
    products: [
        {
            id: "EG-101",
            title: "Panipat Special: Crimson Hand Embroidered Anarkali Suit",
            category: "Anarkali Sets",
            fabric: "Pure Georgette with Heavy Zari & Sequence Handwork",
            originalPrice: 2999,
            salePrice: 2699,
            badge: "Best Seller",
            inStock: true,
            image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
            features: ["✨ Pure heavy georgette fabric", "🧵 Royal Zari & sequence work dupatta", "📍 Available for in-store trial in Panipat"]
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
            features: ["✨ Soft skin-friendly Chanderi silk", "🧵 Delicate pastel floral embroidery", "📦 Worldwide shipping available"]
        },
        {
            id: "EG-103",
            title: "Festive Star: Mustard Gold Banarasi Brocade Kurti Set",
            category: "Festive Kurtis",
            fabric: "Banarasi Silk Brocade with Hand Zardozi Neckline",
            originalPrice: 1599,
            salePrice: 1439,
            badge: "Hot Seller",
            inStock: true,
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
            features: ["✨ Rich Banarasi brocade weave", "🧵 Hand zardozi work neckline", "📍 Visit shop: Devi Mandir Road"]
        },
        {
            id: "EG-104",
            title: "Royal Micro Velvet Heavy Party Suit",
            category: "Designer Suits",
            fabric: "Micro Velvet 9000 with Tilla & Dori Embroidery",
            originalPrice: 3499,
            salePrice: 3149,
            badge: "Panipat Special",
            inStock: true,
            image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
            features: ["✨ Premium Micro Velvet 9000", "🧵 Intricate Mughal tilla embroidery", "🛍️ In-store boutique trial available"]
        },
        {
            id: "EG-105",
            title: "Handloom Lavender Kanjivaram Silk Saree",
            category: "Silk Sarees",
            fabric: "Pure Kanjivaram Silk with Rich Gold Zari Pallu",
            originalPrice: 3999,
            salePrice: 3599,
            badge: "Pure Silk",
            inStock: true,
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
            features: ["✨ Authentic temple border design", "🧵 Heavy gold zari pallu with blouse", "📦 Fast worldwide delivery"]
        },
        {
            id: "EG-106",
            title: "Bridal Edition: Ivory & Champagne Heritage Lehenga",
            category: "Bridal Lehengas",
            fabric: "Raw Silk with Mirror Work, Pearls & Double Dupattas",
            originalPrice: 8999,
            salePrice: 7999,
            badge: "Bridal Special",
            inStock: true,
            image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
            features: ["✨ Royal bridal flair & raw silk", "🧵 Handcrafted mirror & pearl work", "📍 Custom fitting at Panipat store"]
        }
    ]
};

const DB_KEY = "ethnic_grace_data_final";

function getStoreData() {
    try {
        const saved = localStorage.getItem(DB_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
                return parsed;
            }
        }
    } catch (e) {}
    localStorage.setItem(DB_KEY, JSON.stringify(STORE_DATA));
    return STORE_DATA;
}

function saveStoreData(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function buildWhatsAppUrl(productTitle, price, code) {
    const data = getStoreData();
    const phone = data.phone || "919518285233";
    let msg = "";
    if (productTitle) {
        msg = `Hello Ethnic Grace Panipat! I am interested in: ${productTitle} (Offer Price: ₹${price}, Code: ${code}). Please share availability and store visit/shipping details.`;
    } else {
        msg = `Hello Ethnic Grace Panipat! I would like to inquire about your designer ladies suits collection and visit your shop at Devi Mandir Main Road, Panipat.`;
    }
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);
}

window.STORE_DATA = STORE_DATA;
window.getStoreData = getStoreData;
window.saveStoreData = saveStoreData;
window.buildWhatsAppUrl = buildWhatsAppUrl;
