export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  mrp: number;
  price: number; // base price (for single quantity)
  hasDynamicDiscount: boolean;
  discountText?: string;
  courseDuration?: string;
  image: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  ingredients: { name: string; quantity: string; benefits: string }[];
  howToUse: string;
  whyChoose: string[];
  freeDelivery: boolean;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  faqs: FAQItem[];
}

export const products: Product[] = [
  {
    id: "pain-x-oil",
    name: "Pain X Oil",
    slug: "pain-x-oil",
    category: "Pain Relief",
    mrp: 235,
    price: 164.50, // 30% discount by default
    hasDynamicDiscount: true,
    discountText: "Save up to 40% with multi-buy discounts",
    image: "/images/products/pain-x-oil.jpg",
    shortDescription: "Therapeutic Ayurvedic oil formulated with potent herbal extracts to relieve joint pain, arthritis stiffness, and muscle backache.",
    description: "HerbsZen Pain X Oil is a premium, fast-acting Ayurvedic formulation created to target deep-seated musculoskeletal pain. Synthesized from ancient therapeutic oils like Mahanarayan Taila and Vishgarbha Taila, combined with wintergreen and eucalyptus, it penetrates deep into the tissues to restore joint flexibility, reduce inflammation, and soothe sore muscles naturally without any side effects.",
    benefits: [
      "Rapidly relieves knee pain, joint stiffness, and backache",
      "Reduces localized swelling and muscle inflammation",
      "Improves blood circulation and muscle flexibility",
      "100% natural formula, free from mineral oil or synthetic chemicals"
    ],
    ingredients: [
      { name: "Mahanarayan Taila", quantity: "30%", benefits: "Time-tested classical oil for strengthening nerves and joint lubrication." },
      { name: "Vishgarbha Taila", quantity: "20%", benefits: "Potent anti-inflammatory oil that pacifies Vata dosha in joints." },
      { name: "Gandhapura Taila (Wintergreen)", quantity: "15%", benefits: "Natural source of methyl salicylate that acts as an instant pain-reliever." },
      { name: "Nilgiri Taila (Eucalyptus)", quantity: "10%", benefits: "Provides a warming sensation and enhances transdermal absorption." },
      { name: "Pudina Satva (Menthol)", quantity: "5%", benefits: "Cooling agent that numbs pain receptors instantly." }
    ],
    howToUse: "Apply 5 to 10 ml of Pain X Oil to the affected area. Gently massage in circular motions for 5-10 minutes until absorbed. Wrap a warm towel around the area for enhanced relief. Apply 2-3 times daily.",
    whyChoose: [
      "Traditional Ayurvedic formula enriched with modern scientific processing",
      "Non-greasy, fast-absorbing texture",
      "No artificial colors, fragrances, or preservatives",
      "Relief within minutes of application"
    ],
    freeDelivery: true,
    rating: 4.8,
    reviewsCount: 124,
    reviews: [
      { id: "r1", name: "Ramesh Sharma", location: "Delhi", rating: 5, comment: "I have been suffering from chronic knee pain for 3 years. Pain X Oil works wonders! I feel immediate relief within 10 minutes of massaging it. Highly recommended.", date: "2026-05-12", avatar: "/images/avatars/user-1.jpg", verified: true },
      { id: "r2", name: "Suresh Patel", location: "Ahmedabad", rating: 4, comment: "Excellent oil for backache. The warmth it creates really relaxes the muscles. Buying my second pack now.", date: "2026-05-28", avatar: "/images/avatars/user-2.jpg", verified: true },
      { id: "r3", name: "Sunita Reddy", location: "Hyderabad", rating: 5, comment: "It works very well for joint stiffness. The multi-bottle discount is great value for money.", date: "2026-06-02", avatar: "/images/avatars/user-3.jpg", verified: true }
    ],
    faqs: [
      { question: "How long does it take to show results?", answer: "Most users experience a soothing warmth and relief within 10-15 minutes of application. For chronic conditions like arthritis, regular usage for 3-4 weeks is recommended for long-term benefits." },
      { question: "Is it sticky?", answer: "No, Pain X Oil is formulated to absorb quickly into the skin. While it is an oil, a gentle massage helps it penetrate completely, leaving a light, non-sticky protective barrier." }
    ]
  },
  {
    id: "stone-x-capsule",
    name: "Stone X Capsule",
    slug: "stone-x-capsule",
    category: "Kidney Health",
    mrp: 999,
    price: 799, // Selling price
    hasDynamicDiscount: false,
    courseDuration: "15 Day Course",
    image: "/images/products/stone-x-capsule.jpg",
    shortDescription: "Specialized herbal formulation designed to support kidney function, help dissolve stones naturally, and flush out toxins.",
    description: "HerbsZen Stone X Capsule is an advanced urinary tract health solution that blends powerful lithontriptic (stone-dissolving) herbs like Pashanbhed and Punarnava. It works by breaking down large renal calculi into tiny crystals that can be safely and painlessly flushed out through the urinary tract. It also maintains optimal kidney health, reduces burning micturition, and prevents future stone formation.",
    benefits: [
      "Helps dissolve and flush out kidney and urinary tract stones",
      "Reduces painful urination and burning sensation",
      "Supports healthy kidney function and detoxification",
      "Prevents recurrence of stone formation"
    ],
    ingredients: [
      { name: "Pashanbhed (Saxifraga Ligulata)", quantity: "150mg", benefits: "Literally meaning 'stonebreaker', dissolves renal calculi naturally." },
      { name: "Varun Chal (Crataeva Nurvala)", quantity: "100mg", benefits: "Strengthens urinary bladder and exhibits excellent diuretic properties." },
      { name: "Punarnava (Boerhavia Diffusa)", quantity: "100mg", benefits: "Rejuvenates kidney cells, reduces swelling and fluid retention." },
      { name: "Gokshur (Tribulus Terrestris)", quantity: "100mg", benefits: "Soothes the urinary tract and prevents crystallization of salts." }
    ],
    howToUse: "Take 1 to 2 capsules twice daily with lukewarm water, preferably before meals, or as directed by an Ayurvedic healthcare professional. Drink at least 3-4 liters of water daily while on this course.",
    whyChoose: [
      "100% extract-based premium formula for maximum potency",
      "Clinically supported Ayurvedic ingredients",
      "Gentle and natural stone clearance without surgical intervention",
      "Free delivery and complete 15-day course pack"
    ],
    freeDelivery: true,
    rating: 4.7,
    reviewsCount: 88,
    reviews: [
      { id: "r4", name: "Anil Goel", location: "Noida", rating: 5, comment: "I had a 6mm kidney stone. Used Stone X for two weeks, and during an ultrasound check, it was completely gone! Extremely thankful for this product.", date: "2026-04-18", avatar: "/images/avatars/user-4.jpg", verified: true },
      { id: "r5", name: "Priya Nair", location: "Bangalore", rating: 4, comment: "Very effective for burning urination. The pain in my back has also reduced significantly.", date: "2026-05-15", avatar: "/images/avatars/user-5.jpg", verified: true }
    ],
    faqs: [
      { question: "Can it dissolve large stones?", answer: "Stone X is highly effective for stones up to 8mm. For larger stones, it helps disintegrate them slowly, but it is advised to consult a urologist alongside taking the capsules." },
      { question: "Are there any dietary restrictions?", answer: "Yes, you should avoid foods rich in oxalates (like spinach, tomatoes, chocolate) and reduce excess salt intake. Drink plenty of water throughout the day." }
    ]
  },
  {
    id: "dr-dandruff-serum",
    name: "Dr. Dandruff Serum",
    slug: "dr-dandruff-serum",
    category: "Hair Care",
    mrp: 595,
    price: 416.50, // 30% discount
    hasDynamicDiscount: false,
    image: "/images/products/dr-dandruff-serum.jpg",
    shortDescription: "Intensive scalp-revitalizing serum infused with tea tree, neem, and rosemary to combat dandruff and soothe itchy scalp.",
    description: "HerbsZen Dr. Dandruff Serum is a premium scalp solution engineered to treat the root causes of dandruff. Melding the antimicrobial powers of Neem and Tea Tree Oil with the follicular stimulation of Rosemary, this fast-absorbing serum targets Malassezia yeast, controls sebum production, and relieves scalp itchiness. It repairs the scalp barrier, leaving your hair roots strong, clean, and flake-free.",
    benefits: [
      "Eliminates dandruff flakes and prevents their recurrence",
      "Calms itchy, dry, and irritated scalp within 3 applications",
      "Restores scalp pH balance and controls excess oil secretion",
      "Nourishes hair roots to reduce dandruff-induced hair fall"
    ],
    ingredients: [
      { name: "Neem Oil Extract", quantity: "5%", benefits: "Strong anti-fungal and anti-bacterial agent that cleanses the scalp." },
      { name: "Tea Tree Essential Oil", quantity: "3%", benefits: "Purifies follicles and prevents dandruff-causing yeast growth." },
      { name: "Rosemary Oil", quantity: "2%", benefits: "Improves scalp blood circulation and stimulates healthy hair growth." },
      { name: "Bhringraj & Amla Extracts", quantity: "10%", benefits: "Nourishes the hair shaft and prevents dry scaling." }
    ],
    howToUse: "Apply a few drops of the serum directly onto dry scalp, concentrating on dandruff-prone areas. Massage gently with your fingertips for 2-3 minutes. Leave it on for at least 2 hours or overnight, then wash with a mild herbal shampoo. Use 3 times a week.",
    whyChoose: [
      "Non-sticky, lightweight fluid formula that doesn't weigh hair down",
      "Visible reduction of flakes in just 7 days",
      "Zero parabens, sulfates, silicones, or mineral oils",
      "Suitable for all hair types and color-treated hair"
    ],
    freeDelivery: true,
    rating: 4.9,
    reviewsCount: 156,
    reviews: [
      { id: "r6", name: "Meera Sen", location: "Kolkata", rating: 5, comment: "Amazing product! My dandruff was completely cured in just 10 days. The itchiness stopped after the very first wash.", date: "2026-05-02", avatar: "/images/avatars/user-6.jpg", verified: true },
      { id: "r7", name: "Vikram Malhotra", location: "Mumbai", rating: 5, comment: "I tried so many clinical shampoos but they dried out my hair. This serum cured my dandruff while keeping my hair soft.", date: "2026-05-20", avatar: "/images/avatars/user-7.jpg", verified: true }
    ],
    faqs: [
      { question: "Can I leave this serum on during the day?", answer: "Yes, because it is extremely light and non-oily, you can apply a small amount to your scalp and style your hair as usual. However, for best results, apply it as an overnight scalp treatment." },
      { question: "Is it suitable for colored hair?", answer: "Absolutely. HerbsZen Dr. Dandruff Serum contains no harsh chemicals, sulfates, or parabens, making it completely safe for colored or chemically treated hair." }
    ]
  },
  {
    id: "moringa-x-capsule",
    name: "Moringa X Capsule",
    slug: "moringa-x-capsule",
    category: "Daily Nutrition",
    mrp: 200,
    price: 200, // Selling price
    hasDynamicDiscount: false,
    courseDuration: "60 Capsules",
    image: "/images/products/moringa-x-capsule.jpg",
    shortDescription: "Organic Moringa Oleifera capsules, packed with vitamins, minerals, and amino acids for daily vitality and immunity.",
    description: "HerbsZen Moringa X Capsule contains 100% pure and organic Moringa Oleifera leaf powder. Often referred to as the 'Tree of Life' or 'Miracle Tree', Moringa is loaded with over 90 nutrients, 46 antioxidants, and 18 amino acids. It serves as a natural whole-food multivitamin that boosts immunity, enhances daily stamina, regulates blood sugar levels, and supports anti-aging joint health.",
    benefits: [
      "Natural energy booster and stamina enhancer",
      "Rich source of vitamins, iron, calcium, and plant proteins",
      "Boosts immunity and contains powerful anti-inflammatory compounds",
      "Supports healthy digestion, detoxification, and radiant skin"
    ],
    ingredients: [
      { name: "Organic Moringa Oleifera Leaf Powder", quantity: "500mg", benefits: "Rich in Vitamin A, C, E, Calcium, Iron, Potassium, and essential proteins." }
    ],
    howToUse: "Take 1 to 2 capsules daily with meals or water, preferably in the morning to supply sustainable energy for the entire day.",
    whyChoose: [
      "Certified organic Moringa leaves, shade-dried to preserve nutritional value",
      "100% vegan capsules (HPMC capsule shells)",
      "Zero fillers, binders, or synthetic additives",
      "Superfood nutrition at an affordable price of just ₹200"
    ],
    freeDelivery: true,
    rating: 4.6,
    reviewsCount: 94,
    reviews: [
      { id: "r8", name: "Rajesh Kumar", location: "Pune", rating: 5, comment: "Moringa X is my daily source of energy. I feel less tired during the workday. Excellent organic product.", date: "2026-05-05", avatar: "/images/avatars/user-8.jpg", verified: true },
      { id: "r9", name: "Neha Gupta", location: "Jaipur", rating: 4, comment: "Good supplement for overall health. It helped improve my digestion and skin glow.", date: "2026-06-01", avatar: "/images/avatars/user-9.jpg", verified: true }
    ],
    faqs: [
      { question: "Is this suitable for vegetarians/vegans?", answer: "Yes, our Moringa X capsules use plant-based cellulose shells, making them 100% vegan and vegetarian-friendly." },
      { question: "Can I take this on an empty stomach?", answer: "It is safe to take, but taking it with or after a meal is recommended to avoid any mild digestive discomfort, especially when starting out." }
    ]
  },
  {
    id: "piles-x-oil",
    name: "Piles X Oil",
    slug: "piles-x-oil",
    category: "Anorectal Care",
    mrp: 400,
    price: 280, // 30% discount
    hasDynamicDiscount: false,
    image: "/images/products/piles-x-oil.jpg",
    shortDescription: "Soothing herbal oil formulated to provide rapid relief from pain, swelling, and itching associated with piles and fissures.",
    description: "HerbsZen Piles X Oil is an advanced, soothing anorectal relief formulation that provides comforting relief from the discomforts of hemorrhoids, piles, and anal fissures. Infused with natural cooling agents like Kapoor and powerful healing herbs like Lajwanti and Neem oil, it works to shrink hemorrhoidal masses, alleviate pain, stop bleeding, soothe inflamed tissue, and promote cell regeneration for fast healing.",
    benefits: [
      "Relieves pain, burning sensations, and intense itching instantly",
      "Helps shrink piles mass and controls bleeding",
      "Soothes dry, cracked skin and promotes rapid fissure healing",
      "Anti-microbial properties protect against localized infections"
    ],
    ingredients: [
      { name: "Lajwanti (Mimosa Pudica)", quantity: "12%", benefits: "Helps stop bleeding and contains excellent wound-healing properties." },
      { name: "Neem Oil (Azadirachta Indica)", quantity: "15%", benefits: "Powerful antiseptic that keeps the area clean and reduces inflammation." },
      { name: "Haridra (Turmeric) Extract", quantity: "8%", benefits: "Reduces swelling, acts as a natural antibiotic and skin healer." },
      { name: "Kapoor (Camphor)", quantity: "3%", benefits: "Provides a cooling sensation and acts as a mild local anesthetic to relieve burning." }
    ],
    howToUse: "Wash the affected area with warm water and pat dry. Apply 2-3 drops of Piles X Oil locally using a clean cotton ball or clean finger before and after bowel movements, or before bed. Use twice daily.",
    whyChoose: [
      "Provides quick cooling relief from burning pain",
      "100% natural, chemical-free topical application",
      "Promotes tissue repair and natural shrinkage",
      "Discreet packaging and free home delivery"
    ],
    freeDelivery: true,
    rating: 4.8,
    reviewsCount: 79,
    reviews: [
      { id: "r10", name: "Sanjay Dutta", location: "Kolkata", rating: 5, comment: "I had painful bleeding piles. Piles X Oil gave me relief in just 3 days. The pain and bleeding have stopped completely.", date: "2026-05-10", avatar: "/images/avatars/user-10.jpg", verified: true },
      { id: "r11", name: "Kiran Joshi", location: "Bangalore", rating: 4, comment: "Very soothing. The burning sensation vanishes instantly due to the camphor cooling effect.", date: "2026-05-29", avatar: "/images/avatars/user-11.jpg", verified: true }
    ],
    faqs: [
      { question: "Is it safe to use daily?", answer: "Yes, Piles X Oil is a 100% natural herbal oil without any synthetic steroids or chemicals. It is completely safe for daily application until symptoms resolve." },
      { question: "How long should I use it?", answer: "For mild cases, 1-2 weeks is sufficient. For chronic piles or deep fissures, we suggest using it consistently for 4-6 weeks alongside a high-fiber diet." }
    ]
  }
];
