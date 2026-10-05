import { MenuItem, DiningZone } from '../types/cafe';

export const DINING_ZONES: DiningZone[] = [
  {
    id: 'conservatory',
    name: 'The Sunlit Conservatory',
    subtitle: 'Greenhouse flora & skylit garden',
    description: 'Basking under a high glass atrium with living olive trees and trailing vines, offering soft natural daylight and airy tranquility.',
    atmosphere: 'Serene, bright, nature-immersed',
    idealFor: 'Weekend brunch, celebrations, lively daytime gatherings',
    capacity: 'Up to 24 guests'
  },
  {
    id: 'bar',
    name: 'The Espresso & Roaster Bar',
    subtitle: 'Front-row brew counter & artisan craft',
    description: 'Polished Carrera marble counter facing our custom Slayer espresso machine and Mahlkönig grinders. Feel the tactile ritual of each extraction.',
    atmosphere: 'Vibrant, sensory, energetic',
    idealFor: 'Solo coffee connoisseurs, casual pairs, morning catch-ups',
    capacity: 'Up to 10 counter seats'
  },
  {
    id: 'alcove',
    name: 'The Library Alcove',
    subtitle: 'Velvet banquettes & quiet book-lined walls',
    description: 'Deep forest green velvet booths nestled against reclaimed walnut bookshelves, warm low-voltage incandescent lighting, and intimate acoustics.',
    atmosphere: 'Intimate, warm, conversational',
    idealFor: 'Romantic dinners, quiet meetings, prolonged reading sessions',
    capacity: 'Up to 16 guests'
  },
  {
    id: 'terrace',
    name: 'The Cobblestone Terrace',
    subtitle: 'Alfresco courtyard with radiant warmth',
    description: 'Outdoor cobblestone patio flanked by fragrant rosemary planters, overhead linen canvas awnings, and radiant overhead warming lamps.',
    atmosphere: 'Breezy, European sidewalk charm',
    idealFor: 'Afternoon aperitifs, pet owners, fresh air dining',
    capacity: 'Up to 18 guests'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- SPECIALTY COFFEE ---
  {
    id: 'c1',
    name: 'Single-Origin Ethiopian Yirgacheffe Pour-Over',
    category: 'coffee',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-brewed via Hario V60. High-grown heirloom varietal featuring delicate jasmine florals, bergamot citrus, and lingering peach nectar sweetness.',
    calories: 5,
    caffeineLevel: 'High',
    origin: 'Kochere, Gedeo Zone, Ethiopia (1,950m)',
    tastingNotes: ['Jasmine Floral', 'Bergamot Citrus', 'Wild White Peach'],
    allergens: ['None'],
    tags: ['signature', 'vegan', 'gluten-free'],
    popular: true,
    options: {
      temperatures: ['Hot', 'Over Japanese Ice (+0.50)'],
      additions: [
        { name: 'Extra Brew Concentration', price: 1.00 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#3B281E] to-[#1E140E]',
      accentColor: '#D97706',
      iconName: 'coffee'
    }
  },
  {
    id: 'c2',
    name: 'Velvet Vanilla & Smoked Oak Cortado',
    category: 'coffee',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    description: 'Double ristretto espresso cut with velvety micro-foamed milk, infused with house-made whole Madagascar bourbon vanilla and a whisper of smoked sea salt.',
    calories: 120,
    caffeineLevel: 'High',
    origin: 'Guatemala Antigua & Colombian Huila Blend',
    tastingNotes: ['Brown Sugar', 'Charred Oak', 'Velvety Cocoa'],
    allergens: ['Dairy (alternative available)'],
    tags: ['signature'],
    popular: true,
    options: {
      milks: ['Whole Milk', 'Oatly Barista Oat (+0.75)', 'House Almond Milk (+0.75)', 'Pistachio Milk (+1.00)'],
      sweetness: ['Standard', 'Half Sweet', 'Unsweetened']
    },
    visualTheme: {
      bgGradient: 'from-[#4A3525] to-[#2B1D14]',
      accentColor: '#B45309',
      iconName: 'cup'
    }
  },
  {
    id: 'c3',
    name: 'Pistachio Cardamom Cloud Latte',
    category: 'coffee',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    description: 'Creamy espresso layered over slow-simmered green cardamom pod syrup, topped with cold aerated roasted Sicilian pistachio milk foam.',
    calories: 190,
    caffeineLevel: 'Medium',
    origin: 'Sumatra Kerinci & Brazil Cerrado',
    tastingNotes: ['Crushed Cardamom', 'Roasted Pistachio', 'Spiced Toffee'],
    allergens: ['Tree Nuts (Pistachio)'],
    tags: ['chef-pick', 'vegetarian'],
    popular: true,
    options: {
      milks: ['House Pistachio Oat Foam', 'Almond Milk', 'Whole Milk'],
      temperatures: ['Iced (Recommended)', 'Steamed Hot'],
      sweetness: ['Signature (100%)', 'Subtle (50%)', 'Unsweetened']
    },
    visualTheme: {
      bgGradient: 'from-[#424B35] to-[#242E1B]',
      accentColor: '#65A30D',
      iconName: 'sparkles'
    }
  },
  {
    id: 'c4',
    name: 'Nitro Draft Cold Brew & Brown Butter Foam',
    category: 'coffee',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    description: '18-hour cold steeped single-estate Colombian beans charged with pure nitrogen for a stout-like cascade, capped with salted brown butter cream.',
    calories: 140,
    caffeineLevel: 'High',
    origin: 'Huila, Colombia',
    tastingNotes: ['Dark Chocolate Truffle', 'Molasses', 'Salted Cream'],
    allergens: ['Dairy (optional vegan foam available)'],
    tags: ['signature'],
    options: {
      sweetness: ['Light Sweet', 'Unsweetened'],
      additions: [
        { name: 'Vegan Coconut Vanilla Foam', price: 0.50 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#2B1D15] to-[#120B07]',
      accentColor: '#F59E0B',
      iconName: 'coffee'
    }
  },
  {
    id: 'c5',
    name: 'Artisan Flat White & Rosetta Art',
    category: 'coffee',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    description: 'Balanced 6oz extraction with double ristretto espresso and textured silk milk poured with hand-drawn rosetta latte art.',
    calories: 110,
    caffeineLevel: 'High',
    origin: 'House Roaster Seasonal Blend',
    tastingNotes: ['Milk Chocolate', 'Toasted Hazelnut', 'Caramelized Fig'],
    allergens: ['Dairy'],
    tags: ['vegetarian'],
    options: {
      milks: ['Whole Milk', 'Oatly Barista Oat (+0.75)', 'House Almond (+0.75)'],
      additions: [
        { name: 'Extra Espresso Shot', price: 1.50 },
        { name: 'Decaf Swiss Water Process', price: 0.00 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#3B2F2F] to-[#201717]',
      accentColor: '#92400E',
      iconName: 'cup'
    }
  },
  {
    id: 'c6',
    name: 'Rosemary Blood Orange Espresso Tonic',
    category: 'coffee',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    description: 'Sparkling artisanal botanical tonic water infused with bruised garden rosemary, fresh blood orange juice, and a floating float of double espresso over crystal ice cubes.',
    calories: 65,
    caffeineLevel: 'Medium',
    origin: 'Kenya Nyeri Peaberry',
    tastingNotes: ['Bright Citrus', 'Woodsy Herb', 'Sparkling Bittersweet'],
    allergens: ['None'],
    tags: ['vegan', 'gluten-free'],
    visualTheme: {
      bgGradient: 'from-[#3F2B22] to-[#25130D]',
      accentColor: '#EA580C',
      iconName: 'sparkles'
    }
  },

  // --- TEAS & BOTANICALS ---
  {
    id: 't1',
    name: 'Ceremonial Grade Uji Matcha Latte',
    category: 'tea',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    description: 'First harvest stone-ground green tea from Kyoto, whisked to a vibrant emerald froth and blended with lightly warmed oat milk.',
    calories: 130,
    caffeineLevel: 'Medium',
    origin: 'Uji, Kyoto Prefecture, Japan',
    tastingNotes: ['Sweet Umami', 'Fresh Spring Grass', 'Creamy Finish'],
    allergens: ['None (with Oat Milk)'],
    tags: ['chef-pick', 'vegan', 'gluten-free'],
    popular: true,
    options: {
      milks: ['Oatly Barista Oat', 'Almond Milk', 'Whole Milk', 'Coconut Milk'],
      sweetness: ['Pure / Unsweetened', 'Light Organic Agave', 'Madagascar Vanilla (+0.50)'],
      temperatures: ['Hot Whisked', 'Iced']
    },
    visualTheme: {
      bgGradient: 'from-[#283C25] to-[#142312]',
      accentColor: '#4ADE80',
      iconName: 'cup'
    }
  },
  {
    id: 't2',
    name: 'Roasted Hojicha & Salted Maple Latte',
    category: 'tea',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Deep roasted Japanese green tea leaves slow-steeped with velvety steamed milk and a touch of grade-A Quebec dark maple syrup.',
    calories: 140,
    caffeineLevel: 'Low',
    origin: 'Shizuoka, Japan',
    tastingNotes: ['Toasted Sesame', 'Pecan Shell', 'Smoky Maple'],
    allergens: ['Dairy (or Oat alternative)'],
    tags: ['vegetarian', 'gluten-free'],
    options: {
      milks: ['Whole Milk', 'Oatly Barista Oat (+0.75)', 'Almond (+0.75)'],
      temperatures: ['Hot', 'Iced']
    },
    visualTheme: {
      bgGradient: 'from-[#3A2D25] to-[#201610]',
      accentColor: '#D97706',
      iconName: 'cup'
    }
  },
  {
    id: 't3',
    name: 'Silver Needle Jasmine Blossom Infusion',
    category: 'tea',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80',
    description: 'Delicate Fujian white tea pearls hand-scented through seven nocturnal jasmine flower blooms. Served in an individual clear glass infuser.',
    calories: 0,
    caffeineLevel: 'Low',
    origin: 'Fujian Province, China',
    tastingNotes: ['Pure Jasmine', 'Honeydew Rind', 'Silk Nectar'],
    allergens: ['None'],
    tags: ['vegan', 'gluten-free'],
    visualTheme: {
      bgGradient: 'from-[#2F3E3B] to-[#182321]',
      accentColor: '#2DD4BF',
      iconName: 'sparkles'
    }
  },

  // --- BAKERY & VIENNOISERIE ---
  {
    id: 'b1',
    name: 'Artisan Isigny Ste-Mère Butter Croissant',
    category: 'bakery',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    description: '36-hour laminated pastry made with cultured French Normandy butter (AOP). Airy honeycombed interior and crisp golden flaked exterior.',
    calories: 280,
    origin: 'Baked fresh daily at 6:00 AM & 11:30 AM',
    tastingNotes: ['Cultured Sweet Cream', 'Toasted Wheat', 'Caramelized Flake'],
    allergens: ['Wheat (Gluten)', 'Dairy'],
    tags: ['vegetarian'],
    popular: true,
    options: {
      additions: [
        { name: 'Warm Warm Cultured Butter & Raspberry Preserve', price: 1.25 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#543E2B] to-[#2F2115]',
      accentColor: '#F59E0B',
      iconName: 'croissant'
    }
  },
  {
    id: 'b2',
    name: 'Valrhona Guanaja 70% Pain au Chocolat',
    category: 'bakery',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-rolled laminated dough stuffed with double batons of grand cru 70% dark Valrhona French chocolate, dusted with dark cacao.',
    calories: 340,
    origin: 'Baked in-house',
    tastingNotes: ['Bittersweet Cacao', 'Buttery Crust', 'Melted Truffle'],
    allergens: ['Wheat (Gluten)', 'Dairy', 'Soy (in chocolate)'],
    tags: ['vegetarian'],
    popular: true,
    visualTheme: {
      bgGradient: 'from-[#3A261C] to-[#1C110C]',
      accentColor: '#B45309',
      iconName: 'croissant'
    }
  },
  {
    id: 'b3',
    name: 'Swedish Cardamom & Demerara Knot',
    category: 'bakery',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional braided brioche dough enriched with freshly crushed green cardamom seed butter, coated in crunchy coarse Demerara sugar crystals.',
    calories: 310,
    origin: 'House recipe inspired by Stockholm bakeries',
    tastingNotes: ['Zesty Cardamom', 'Sweet Brioche', 'Caramel Crunch'],
    allergens: ['Wheat (Gluten)', 'Dairy', 'Egg'],
    tags: ['chef-pick', 'vegetarian'],
    visualTheme: {
      bgGradient: 'from-[#473627] to-[#281D13]',
      accentColor: '#D97706',
      iconName: 'croissant'
    }
  },
  {
    id: 'b4',
    name: '7-Year Sourdough Loaf with Salted Butter & Fig Jam',
    category: 'bakery',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    description: 'Thick toasted slabs of our 36-hour slow fermented country levain, served with whipped sea-salt cultured butter and Mission fig thyme conserve.',
    calories: 350,
    origin: 'Stone-milled heritage grains',
    tastingNotes: ['Deep Crust', 'Complex Tang', 'Sweet Fig Preserve'],
    allergens: ['Wheat (Gluten)', 'Dairy'],
    tags: ['vegetarian'],
    options: {
      additions: [
        { name: 'Substitute Vegan Truffle Cashew Spread', price: 1.00 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#4D3929] to-[#241A11]',
      accentColor: '#F59E0B',
      iconName: 'croissant'
    }
  },

  // --- ALL-DAY BRUNCH ---
  {
    id: 'br1',
    name: 'Heirloom Avocado & Stracciatella Tartine',
    category: 'brunch',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    description: 'Crushed Hass avocado on toasted seeded sourdough, crowned with soft pulled Italian stracciatella cheese, pickled shallots, Aleppo chili oil, and micro-herbs.',
    calories: 420,
    origin: 'California avocados & local farm sourdough',
    tastingNotes: ['Creamy Stracciatella', 'Citrus Zing', 'Mild Chili Warmth'],
    allergens: ['Wheat (Gluten)', 'Dairy (can be prepared vegan)'],
    tags: ['chef-pick', 'vegetarian'],
    popular: true,
    options: {
      additions: [
        { name: 'Add Pasture-Raised 6-Minute Soft Egg', price: 2.50 },
        { name: 'Add Cold Smoked Wild King Salmon', price: 5.50 },
        { name: 'Gluten-Free Bread Substitution', price: 2.00 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#2F3D27] to-[#182312]',
      accentColor: '#84CC16',
      iconName: 'salad'
    }
  },
  {
    id: 'br2',
    name: 'Cast-Iron Shakshuka & Whipped Za’atar Labneh',
    category: 'brunch',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80',
    description: 'Simmered San Marzano tomatoes, charred red peppers, and cumin stewed with two soft baked pasture eggs. Finished with cold whipped labneh, sumac, and warm sesame pita.',
    calories: 490,
    origin: 'North African & Levantine heirloom recipe',
    tastingNotes: ['Rich Spiced Tomato', 'Cool Herb Yogurt', 'Runny Yolks'],
    allergens: ['Egg', 'Dairy', 'Sesame', 'Wheat (Gluten)'],
    tags: ['vegetarian'],
    popular: true,
    options: {
      additions: [
        { name: 'Add Merguez Spiced Lamb Sausage', price: 4.50 },
        { name: 'Extra Warm Sesame Pita (2 pcs)', price: 2.50 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#4A2018] to-[#2B0E09]',
      accentColor: '#EF4444',
      iconName: 'egg'
    }
  },
  {
    id: 'br3',
    name: 'Wild Chanterelle & Brioche French Toast',
    category: 'brunch',
    price: 17.00,
    image: 'https://images.unsplash.com/photo-1484723091739-00a69765f1dc?auto=format&fit=crop&w=800&q=80',
    description: 'Savory custard-dipped thick brioche griddled crisp, topped with pan-roasted wild chanterelles, shaved black summer truffle, runny duck egg, and aged parmesan foam.',
    calories: 520,
    origin: 'Pacific Northwest wild chanterelles',
    tastingNotes: ['Earthy Truffle', 'Rich Butter Brioche', 'Savory Umami'],
    allergens: ['Wheat (Gluten)', 'Dairy', 'Egg'],
    tags: ['chef-pick', 'vegetarian'],
    visualTheme: {
      bgGradient: 'from-[#3D3023] to-[#211910]',
      accentColor: '#D97706',
      iconName: 'egg'
    }
  },
  {
    id: 'br4',
    name: 'Smoked Salmon Royale & Herb Hollandaise',
    category: 'brunch',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    description: 'House cold-smoked Scottish salmon ribbons, two poached farm eggs, sautéed wild spinach, and tarragon-lemon emulsion over toasted English muffins.',
    calories: 510,
    origin: 'Sustainably farmed Scottish salmon',
    tastingNotes: ['Silky Salmon', 'Velvety Hollandaise', 'Fresh Dill & Tarragon'],
    allergens: ['Fish', 'Egg', 'Dairy', 'Wheat (Gluten)'],
    tags: ['signature'],
    options: {
      additions: [
        { name: 'Substitute Sourdough Bread', price: 1.00 },
        { name: 'Side of Herb Crispy Fingerling Potatoes', price: 4.00 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#4A2E28] to-[#2B1612]',
      accentColor: '#F97316',
      iconName: 'egg'
    }
  },

  // --- SAVORY PLATES & LUNCH ---
  {
    id: 'pl1',
    name: 'Crispy Duck Confit & Gruyère Croque Madame',
    category: 'plates',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    description: 'Shredded slow-cooked duck leg confit, aged Cave Gruyère, Dijon bechamel on griddled sourdough, topped with a crisp sunny egg and cornichons.',
    calories: 640,
    origin: 'Hudson Valley duck & Swiss Gruyère',
    tastingNotes: ['Savory Crispy Duck', 'Melted Nutty Gruyère', 'Sharp Mustard'],
    allergens: ['Wheat (Gluten)', 'Dairy', 'Egg'],
    tags: ['signature'],
    popular: true,
    visualTheme: {
      bgGradient: 'from-[#442D1F] to-[#25160D]',
      accentColor: '#F59E0B',
      iconName: 'egg'
    }
  },
  {
    id: 'pl2',
    name: 'Roasted Delicata & Farro Ancient Grain Bowl',
    category: 'plates',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Warm Italian pearled farro tossed with caramelized delicata squash rings, massaged lacinato kale, pomegranate arils, toasted pepitas, and creamy lemon-tahini vinaigrette.',
    calories: 390,
    origin: 'Local organic produce partners',
    tastingNotes: ['Sweet Roasted Squash', 'Chewy Farro', 'Bright Citrus Sesame'],
    allergens: ['Sesame', 'Wheat (Farro)'],
    tags: ['vegan', 'chef-pick'],
    options: {
      additions: [
        { name: 'Add Herbed Grilled Halloumi', price: 4.00 },
        { name: 'Add Citrus Herb Roasted Chicken Breast', price: 5.00 }
      ]
    },
    visualTheme: {
      bgGradient: 'from-[#2D382B] to-[#141F12]',
      accentColor: '#84CC16',
      iconName: 'salad'
    }
  },
  {
    id: 'pl3',
    name: 'Artisan Fromagerie & Charcuterie Board',
    category: 'plates',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    description: 'Triple-cream Brillat-Savarin, 24-month Comté, and cured Jamón Ibérico de Bellota. Accompanied by wildflower honeycomb, Marcona almonds, olives, and warm baguette.',
    calories: 680,
    origin: 'Selected French & Spanish affineurs',
    tastingNotes: ['Rich Creamy Brie', 'Nutty Aged Comté', 'Saline Cured Jamón'],
    allergens: ['Dairy', 'Tree Nuts (Almonds)', 'Wheat (Gluten)'],
    tags: ['signature'],
    visualTheme: {
      bgGradient: 'from-[#42291E] to-[#22130B]',
      accentColor: '#D97706',
      iconName: 'wine'
    }
  },

  // --- DESSERTS & CONFECTIONS ---
  {
    id: 'd1',
    name: 'Burnt Basque Cheesecake & Sour Morello Cherries',
    category: 'desserts',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    description: 'Baked at intense heat for an intensely caramelized, cracked crown with an ultra-creamy, molten center. Served with warm spiced Morello cherry compote.',
    calories: 410,
    origin: 'Traditional San Sebastián style',
    tastingNotes: ['Caramelized Crust', 'Molten Custard', 'Tart Sour Cherry'],
    allergens: ['Dairy', 'Egg'],
    tags: ['gluten-free', 'chef-pick', 'vegetarian'],
    popular: true,
    visualTheme: {
      bgGradient: 'from-[#483424] to-[#23170E]',
      accentColor: '#F59E0B',
      iconName: 'cake'
    }
  },
  {
    id: 'd2',
    name: 'Espresso & Hazelnut Praline Tiramisu Coupe',
    category: 'desserts',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    description: 'Savoiardi sponge biscuits drenched in our Ethiopia Yirgacheffe espresso and Flor de Caña rum, layered with whipped mascarpone mousse and Piemonte hazelnut praline.',
    calories: 390,
    origin: 'House classic recipe',
    tastingNotes: ['Bold Espresso', 'Airy Mascarpone', 'Crunchy Praline'],
    allergens: ['Wheat (Gluten)', 'Dairy', 'Egg', 'Tree Nuts (Hazelnut)'],
    tags: ['vegetarian'],
    popular: true,
    visualTheme: {
      bgGradient: 'from-[#38271C] to-[#1A1009]',
      accentColor: '#B45309',
      iconName: 'cake'
    }
  },
  {
    id: 'd3',
    name: 'Tahitian Vanilla & Lavender Bean Panna Cotta',
    category: 'desserts',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    description: 'Silky smooth set organic cream scented with French culinary lavender and whole Tahitian vanilla beans, finished with fresh blackberries and honey crisps.',
    calories: 320,
    origin: 'House dairy kitchen',
    tastingNotes: ['Floral Lavender', 'Rich Vanilla Caviar', 'Fresh Blackberry'],
    allergens: ['Dairy'],
    tags: ['gluten-free', 'vegetarian'],
    visualTheme: {
      bgGradient: 'from-[#382D3D] to-[#1D1421]',
      accentColor: '#C084FC',
      iconName: 'sparkles'
    }
  }
];
