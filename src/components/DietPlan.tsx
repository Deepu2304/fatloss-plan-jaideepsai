import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mealPlan = [
  {
    day: "Monday",
    isVeg: false,
    kcal: "~1860",
    breakfast: {
      name: "Oats Porridge with Banana & Boiled Eggs",
      portions: "50g oats (½ cup dry) · 1 medium banana · 1 tsp honey · 2 whole eggs",
      protein: "2 Boiled Eggs",
      prep: [
        "Boil 1.5 cups water. Add 50g rolled oats, stir on low flame for 4–5 min until thick.",
        "Add ½ tsp honey and top with 1 sliced banana. Do NOT add sugar.",
        "Separately, place 2 eggs in cold water, bring to boil, cook 10 min, cool and peel.",
        "Eat oats first, then eggs. Drink 1 glass warm water 20 min before breakfast.",
      ],
      note: "Oats coat the stomach lining — ideal first meal for gastritis.",
    },
    lunch: {
      name: "Steamed Rice + Moong Dal + Sabzi + Grilled Chicken",
      portions: "1 cup cooked rice (200g) · ½ cup moong dal cooked · 1 cup sabzi · 120g chicken breast",
      protein: "120g Grilled Chicken Breast",
      prep: [
        "Rice: Wash 80g raw rice 2–3 times. Add 1.5 cups water, cook on low flame 15 min. Fluff with fork.",
        "Moong Dal: Wash 50g moong dal. Pressure cook with 1.5 cups water, pinch turmeric, for 3 whistles. Add cumin tadka in ½ tsp ghee.",
        "Sabzi (Carrot & Beans): Chop 1 medium carrot + 10–12 beans. Steam for 8 min. Season with ¼ tsp cumin, salt, ½ tsp ghee.",
        "Chicken: Marinate 120g breast with ginger paste, salt, turmeric 30 min. Grill on tawa with ½ tsp oil each side, 5–6 min per side on medium flame.",
      ],
      note: "Avoid adding tomatoes or tamarind to dal — both are acidic.",
    },
    snack: {
      name: "Banana + Soaked Almonds + Curd",
      portions: "1 medium banana · 10 almonds (soaked overnight) · 100g low-fat curd",
      protein: "100g Low-fat Curd",
      prep: [
        "Soak 10 almonds in water the previous night. Peel skins before eating — easier on stomach.",
        "Take 100g fresh curd (not sour). Eat at room temperature, not cold from fridge.",
        "Eat banana first, then almonds, then curd. Do not mix into a bowl.",
      ],
      note: "Soaked almonds are more alkaline than raw and gentler on the gut.",
    },
    dinner: {
      name: "Multigrain Roti + Lauki Sabzi + Cucumber Raita + Egg",
      portions: "2 rotis (60g flour total) · 200g lauki · 1 medium cucumber · 100g curd · 1 boiled egg",
      protein: "1 Boiled Egg",
      prep: [
        "Roti: Knead 60g multigrain atta with water into soft dough. Roll medium-thin. Cook on hot tawa 1 min per side, apply ¼ tsp ghee.",
        "Lauki Sabzi: Peel and cube 200g bottle gourd. Heat ½ tsp ghee, add cumin seeds, add lauki, salt, ¼ tsp turmeric. Cook covered on low flame 12–15 min until tender.",
        "Raita: Grate 1 cucumber, mix into 100g curd. Add roasted cumin powder, salt. No chilli.",
        "Boil 1 egg 10 min. Slice and eat alongside meal.",
      ],
      note: "Eat dinner by 7:30 PM — lauki is one of the most alkaline vegetables.",
    },
  },
  {
    day: "Tuesday",
    isVeg: false,
    kcal: "~1820",
    breakfast: {
      name: "Vegetable Daliya (Broken Wheat Porridge) + Egg Whites",
      portions: "50g daliya (broken wheat) · ½ cup mixed veg (carrot, peas) · 1 tsp ghee · 3 egg whites",
      protein: "3 Egg Whites (Scrambled)",
      prep: [
        "Dry roast 50g daliya in a pan 2–3 min on medium flame until light golden and fragrant.",
        "Add 1.5 cups water, ½ cup chopped carrot + peas, ¼ tsp cumin, salt. Cook covered 15 min on low flame, stirring occasionally.",
        "Add 1 tsp ghee at the end. Daliya should be soft — not watery, not dry.",
        "Egg whites: Separate 3 eggs. Whisk whites with salt. Cook in non-stick pan with ¼ tsp oil, stir gently on low flame 2–3 min.",
      ],
      note: "Daliya is slower to digest than oats — keeps you full till lunch.",
    },
    lunch: {
      name: "Moong Dal Khichdi + Steamed Fish",
      portions: "60g rice + 40g moong dal (combined) · 150g fish (rohu/pomfret) · 1 tsp ghee",
      protein: "150g Steamed Rohu / Pomfret",
      prep: [
        "Khichdi: Wash 60g rice + 40g yellow moong dal together. Pressure cook with 2.5 cups water, ¼ tsp turmeric, pinch asafoetida, salt — 4 whistles. Should be soft and mushy. Add 1 tsp ghee.",
        "Fish: Clean 150g fish. Apply ginger paste + salt + ¼ tsp turmeric. Place in a steamer or idli vessel. Steam 12–15 min until flesh flakes easily.",
        "Do NOT fry fish. Steaming preserves omega-3 and avoids added acidity from oil.",
      ],
      note: "Khichdi + steamed fish is the most gut-healing combination in this plan.",
    },
    snack: {
      name: "Watermelon + Walnuts + Buttermilk",
      portions: "200g watermelon (2 medium slices) · 4 walnut halves · 200ml plain buttermilk",
      protein: "200ml Plain Buttermilk (Chaas)",
      prep: [
        "Cut fresh watermelon — avoid pre-cut stored fruit.",
        "Buttermilk: Whisk 3 tbsp curd in 200ml water until smooth. Add roasted cumin powder + salt. No chilli.",
        "Eat watermelon, then walnuts, then sip buttermilk slowly.",
      ],
      note: "Watermelon is 92% water and deeply alkaline — perfect for gastritis.",
    },
    dinner: {
      name: "Multigrain Roti + Ridge Gourd Sabzi + Moong Soup",
      portions: "2 rotis (60g flour) · 200g ridge gourd · ½ cup moong dal soup",
      protein: "½ cup Moong Dal Soup",
      prep: [
        "Roti: Same as Monday. 60g multigrain atta, roll thin, cook on tawa, ¼ tsp ghee.",
        "Ridge Gourd (Turai): Peel and slice 200g turai. Heat ½ tsp ghee, add cumin, ginger, add turai, salt, ¼ tsp turmeric. Cook uncovered 10 min — it releases water naturally.",
        "Moong Soup: Boil ½ cup cooked moong dal with 1 cup water, ¼ tsp cumin, salt. Stir well. Drink as a clear soup.",
      ],
      note: "Keep this dinner under 400 kcal. Ridge gourd is extremely easy to digest.",
    },
  },
  {
    day: "Wednesday",
    isVeg: false,
    kcal: "~1840",
    breakfast: {
      name: "Curd Rice + Boiled Eggs",
      portions: "1 cup cooked rice (200g) · 150g low-fat curd · ¼ tsp mustard seeds · 2 boiled eggs",
      protein: "2 Boiled Eggs",
      prep: [
        "Cook rice as usual. Let it cool to room temperature (not fridge-cold).",
        "Mash 200g cooked rice lightly with a fork. Mix in 150g fresh curd and salt.",
        "Tempering: Heat ½ tsp ghee, add ¼ tsp mustard seeds. Let them splutter. Pour over curd rice. Add grated carrot on top.",
        "Boil 2 eggs 10 min separately. Eat alongside curd rice.",
      ],
      note: "Curd rice is probiotic — actively repairs the stomach lining.",
    },
    lunch: {
      name: "Steamed Rice + Toor Dal + Drumstick Sabzi + Grilled Chicken",
      portions: "1 cup cooked rice (200g) · ½ cup toor dal · 1 cup drumstick sabzi · 120g chicken breast",
      protein: "120g Grilled Chicken Breast",
      prep: [
        "Rice: 80g raw rice, wash 3x, cook with 1.5 cups water 15 min on low flame.",
        "Toor Dal: Wash 50g toor dal. Pressure cook 3 whistles with 1.5 cups water + turmeric. Temper with ½ tsp ghee + cumin. NO tomato.",
        "Drumstick Sabzi: Cut 2 drumsticks into 3-inch pieces. Boil in water 10 min until soft. Drain. Stir fry in ½ tsp oil with cumin, salt, ¼ tsp turmeric for 3 min.",
        "Chicken: Same as Monday prep — marinate with ginger+salt+turmeric, grill on tawa 5–6 min per side.",
      ],
      note: "Drumstick (murungakkai) is anti-inflammatory and great for gut health.",
    },
    snack: {
      name: "Apple + Warm Milk",
      portions: "1 medium apple (150g) · 200ml warm low-fat milk",
      protein: "200ml Warm Low-fat Milk",
      prep: [
        "Wash apple thoroughly. Eat with skin — the pectin in skin is a prebiotic.",
        "Warm milk: Heat 200ml low-fat milk to just below boiling. Add a pinch of turmeric (golden milk). No sugar.",
        "Eat apple first, wait 10 min, then drink milk.",
      ],
      note: "Warm milk buffers stomach acid. Never drink cold milk — it causes rebound acidity.",
    },
    dinner: {
      name: "Multigrain Roti + Ash Gourd Sabzi + Egg Bhurji",
      portions: "2 rotis (60g flour) · 200g ash gourd (winter melon) · 1 whole egg + 1 white",
      protein: "1 Egg + 1 Egg White Bhurji",
      prep: [
        "Roti: Standard prep — 60g multigrain atta, soft dough, roll and cook on tawa.",
        "Ash Gourd: Peel and cube 200g. Heat ½ tsp ghee, add cumin + grated ginger. Add ash gourd + salt + ¼ tsp turmeric. Cook covered 15 min on low flame. Very soft when done.",
        "Egg Bhurji: Whisk 1 whole egg + 1 white. Heat non-stick pan, add ¼ tsp oil. Pour eggs. Add salt, ¼ tsp cumin powder. Stir gently on low flame 2–3 min. Do NOT add chilli.",
      ],
      note: "Ash gourd is deeply alkaline — one of the best vegetables for gastritis sufferers.",
    },
  },
  {
    day: "Thursday",
    isVeg: false,
    kcal: "~1850",
    breakfast: {
      name: "Banana Oat Smoothie + Boiled Eggs",
      portions: "1 large banana · 30g oats · 200ml low-fat milk · 2 boiled eggs",
      protein: "2 Boiled Eggs",
      prep: [
        "Blend 1 ripe banana + 30g rolled oats + 200ml low-fat milk until completely smooth. No citrus, no seeds.",
        "Pour into a glass and drink slowly — do not gulp.",
        "Boil 2 eggs separately (10 min), eat alongside smoothie.",
        "Do not add protein powder — commercial powders are often acidic.",
      ],
      note: "Banana is one of the few alkaline fruits that coats the stomach lining.",
    },
    lunch: {
      name: "Jeera Rice + Chana Dal + 2-Egg Curry",
      portions: "1 cup cooked jeera rice (200g) · ½ cup chana dal · 2 eggs (light curry)",
      protein: "2-Egg Light Curry",
      prep: [
        "Jeera Rice: Cook 80g raw rice. In a pan, heat ½ tsp ghee, add 1 tsp cumin seeds, let splutter. Add cooked rice + salt, toss 2 min.",
        "Chana Dal: Soak 50g chana dal 2 hours. Pressure cook 4 whistles with 1.5 cups water + turmeric. Temper with ½ tsp ghee + cumin. No tomato.",
        "Egg Curry: Boil 2 eggs, peel. In a pan, heat ½ tsp oil, add ½ tsp cumin, 1 tsp ginger paste, ¼ tsp turmeric, salt. Add ½ cup water, bring to simmer. Add halved boiled eggs. Simmer 5 min on low flame. No red chilli.",
      ],
      note: "Chana dal needs soaking — without it, it causes bloating and gas.",
    },
    snack: {
      name: "Papaya + Roasted Peanuts + Buttermilk",
      portions: "150g papaya (1 cup cubed) · 20g roasted peanuts (1 small handful) · 150ml buttermilk",
      protein: "20g Roasted Peanuts + Buttermilk",
      prep: [
        "Cut 150g ripe papaya. Remove seeds. Eat as is — no salt or lime on papaya.",
        "Peanuts: Dry roast 20g raw peanuts on tawa 5 min, tossing frequently. Allow to cool. Remove loose skins.",
        "Buttermilk: Whisk 3 tbsp curd in 150ml water. Add cumin powder + salt only.",
      ],
      note: "Papaya contains papain enzyme — a natural gut-healer and fat digestion aid.",
    },
    dinner: {
      name: "Multigrain Roti + Palak Sabzi + Grilled Fish",
      portions: "2 rotis (60g flour) · 150g spinach leaves · 130g fish (surmai/pomfret)",
      protein: "130g Grilled Surmai / Pomfret",
      prep: [
        "Roti: Standard 60g multigrain atta prep.",
        "Palak Sabzi: Wash 150g spinach. Blanch in boiling water 2 min, drain. Roughly chop. Heat ½ tsp ghee, add garlic (just 1 small clove, optional), add spinach, salt, ¼ tsp cumin powder. Stir fry 3 min.",
        "Fish: Marinate 130g fish with ginger paste, salt, ¼ tsp turmeric, 1 tsp lemon juice (just a few drops — minimal). Grill on tawa with ½ tsp oil, 4–5 min per side on medium flame.",
      ],
      note: "Grill fish on medium — not high heat. Charring increases acidity.",
    },
  },
  {
    day: "Friday",
    isVeg: false,
    kcal: "~1870",
    breakfast: {
      name: "Vegetable Poha + Boiled Eggs",
      portions: "60g thick poha (flattened rice) · ½ cup mixed veg (peas, carrot) · 2 boiled eggs",
      protein: "2 Boiled Eggs",
      prep: [
        "Wash 60g thick poha in a strainer under running water 30 sec. Drain and let sit 5 min — it softens naturally.",
        "Heat ½ tsp oil in pan. Add ¼ tsp mustard seeds + cumin. Add ½ cup peas + carrot, cook 3 min.",
        "Add soaked poha + salt + ¼ tsp turmeric. Mix gently. Cover and cook on low 3–4 min. No chilli. Garnish with coriander.",
        "Boil 2 eggs 10 min separately and eat alongside.",
      ],
      note: "Use THICK poha — thin poha becomes mushy and harder to digest.",
    },
    lunch: {
      name: "Steamed Rice + Masoor Dal + Steamed Broccoli + Grilled Chicken",
      portions: "1 cup cooked rice (200g) · ½ cup masoor dal · 1 cup broccoli · 120g chicken breast",
      protein: "120g Grilled Chicken Breast",
      prep: [
        "Rice: 80g raw, wash 3x, cook with 1.5 cups water 15 min.",
        "Masoor Dal (Red Lentils): Wash 50g masoor dal (no soaking needed). Pressure cook 2 whistles with 1.5 cups water + turmeric. Temper with ½ tsp ghee + cumin. No tomato.",
        "Broccoli: Cut 1 cup florets. Steam 7–8 min until bright green and tender. Season with salt + ¼ tsp ghee.",
        "Chicken: Standard marinade (ginger+salt+turmeric). Grill 5–6 min per side on tawa.",
      ],
      note: "Masoor dal is the quickest-cooking and easiest lentil to digest.",
    },
    snack: {
      name: "Cucumber + Hummus (Homemade) + Chaas",
      portions: "1 medium cucumber (150g) · 3 tbsp homemade hummus · 200ml plain chaas",
      protein: "Hummus (chickpea-based) + Chaas",
      prep: [
        "Hummus: Soak 50g chickpeas overnight. Boil until very soft (30–40 min). Blend with 1 tsp tahini (or just sesame paste), ½ tsp cumin, salt, 1 tsp olive oil. Add water for consistency. NO lemon/garlic if sensitive.",
        "Slice cucumber into sticks. Dip in hummus.",
        "Chaas: Whisk 3 tbsp curd in 200ml water. Add cumin + salt. No chilli.",
      ],
      note: "Make hummus at home — store-bought versions often contain preservatives and vinegar.",
    },
    dinner: {
      name: "Multigrain Roti + Tinda Sabzi + Chicken Soup",
      portions: "2 rotis (60g flour) · 200g tinda (apple gourd) · 1 bowl chicken soup (150ml)",
      protein: "150ml Clear Chicken Soup",
      prep: [
        "Roti: Standard prep — 60g multigrain atta.",
        "Tinda Sabzi: Peel and cube 200g tinda. Heat ½ tsp ghee, add cumin, ginger. Add tinda + salt + ¼ tsp turmeric. Cover and cook 12–15 min low flame until soft.",
        "Chicken Soup: Boil 80g chicken pieces (with bone = more collagen) in 400ml water with ginger slice + salt + cumin for 25–30 min. Strain and drink the clear broth. Eat the soft chicken pieces.",
      ],
      note: "Bone broth chicken soup is gut-healing — the collagen repairs stomach lining.",
    },
  },
  {
    day: "Saturday",
    isVeg: true,
    kcal: "~1780",
    breakfast: {
      name: "Idli + Coconut Chutney + Sambar",
      portions: "3 medium idlis (~180g) · 3 tbsp coconut chutney · ½ cup mild sambar",
      protein: "Sambar (lentil-based)",
      prep: [
        "Use store-bought idli batter or ferment your own (urad dal + rice, soak 6 hrs, grind, ferment 8 hrs).",
        "Pour batter into greased idli moulds. Steam in idli pot 10–12 min. Toothpick should come out clean.",
        "Coconut Chutney: Blend 3 tbsp grated coconut + ¼ tsp cumin + salt + small piece ginger + water. No green chilli.",
        "Sambar: Boil ½ cup toor dal (pressure cooked). Add drumstick/carrot, ¼ tsp sambar powder (mild), salt. Simmer 10 min. No tamarind if acid-sensitive.",
      ],
      note: "Fermented idli batter is probiotic — the best Saturday breakfast for gut healing.",
    },
    lunch: {
      name: "Steamed Rice + Coconut-based Mild Vegetable Curry + Moong Dal",
      portions: "1 cup cooked rice (200g) · 1 cup mixed veg curry · ½ cup moong dal",
      protein: "½ cup Moong Dal",
      prep: [
        "Rice: 80g raw, wash 3x, cook 15 min.",
        "Coconut Veg Curry: Chop 200g mixed veg (carrot, beans, potato). Cook in ½ cup coconut milk + 1 cup water + ¼ tsp cumin + salt on low flame 15 min. Coconut milk is alkaline and gut-soothing.",
        "Moong Dal: Pressure cook 50g moong dal, 3 whistles. Temper with ½ tsp ghee + cumin.",
      ],
      note: "Saturday is your full rest-for-the-gut day — no non-veg, no heavy proteins.",
    },
    snack: {
      name: "Pear + Cashews + Curd",
      portions: "1 medium pear (150g) · 10–12 cashews · 100g low-fat curd",
      protein: "100g Low-fat Curd",
      prep: [
        "Wash and slice pear. Eat with skin — the skin contains gut-friendly prebiotics.",
        "Cashews: Raw or lightly dry-roasted (no salt, no oil). Limit to 10–12 pieces.",
        "Curd: At room temperature. Add a pinch of roasted cumin powder if desired.",
      ],
      note: "Pear is one of the highest-fibre fruits and very gentle on the stomach.",
    },
    dinner: {
      name: "Multigrain Roti + Mixed Vegetable Sabzi + Moong Dal Soup + Curd",
      portions: "2 rotis (60g flour) · 1.5 cups mixed sabzi · ½ cup dal soup · 100g curd",
      protein: "Moong Dal + Curd",
      prep: [
        "Roti: 60g multigrain atta, standard prep.",
        "Mixed Sabzi: Chop 100g each of pumpkin + carrot + green beans. Heat ½ tsp ghee, add cumin + ginger. Add vegetables, ¼ tsp turmeric, salt. Cover and cook 15 min on low flame.",
        "Moong Dal Soup: Cook ½ cup moong dal with 1.5 cups water, salt, cumin. Stir well into a thin soup consistency.",
        "Curd: Eat at room temperature as the final component of the meal.",
      ],
      note: "Saturday dinner: lightest meal of the week. Prepares your gut for Sunday.",
    },
  },
  {
    day: "Sunday",
    isVeg: false,
    kcal: "~1900",
    breakfast: {
      name: "Vegetable Upma + Boiled Eggs",
      portions: "60g semolina (rava) · ½ cup mixed veg · 1 tsp ghee · 2 boiled eggs",
      protein: "2 Boiled Eggs",
      prep: [
        "Dry roast 60g rava in a pan on medium flame 3–4 min, stirring constantly, until light golden. Set aside.",
        "In same pan, heat 1 tsp ghee. Add mustard seeds. Once they splutter, add ½ cup chopped carrot + peas + beans. Sauté 3 min.",
        "Add 1.5 cups boiling water + salt. Let it come to boil. Slowly pour roasted rava while stirring to avoid lumps. Cover and cook 4–5 min on low flame.",
        "Boil 2 eggs 10 min separately. Eat alongside upma.",
      ],
      note: "Always roast rava first — raw rava is heavy and acidic on the stomach.",
    },
    lunch: {
      name: "Jeera Rice + Toor Dal + Steamed Vegetables + Grilled Chicken",
      portions: "1 cup jeera rice (200g cooked) · ½ cup toor dal · 1 cup steamed veg · 120g chicken",
      protein: "120g Grilled Chicken Breast",
      prep: [
        "Jeera Rice: Cook 80g rice. Heat ½ tsp ghee, add 1 tsp cumin seeds, let splutter. Toss cooked rice in this for 2 min with salt.",
        "Toor Dal: Pressure cook 50g toor dal 3 whistles. No tomato. Temper with ½ tsp ghee + cumin + pinch hing.",
        "Steamed Veg: Steam 1 cup of broccoli + carrot + zucchini 8 min. Season with salt + ghee.",
        "Chicken: Marinate 120g breast with ginger+salt+turmeric 30 min. Grill on tawa, 5–6 min per side. Rest 5 min before eating.",
      ],
      note: "Sunday's biggest meal — enjoy it! Portion control matters more than restriction.",
    },
    snack: {
      name: "Banana + Homemade Oat Biscuits + Warm Milk",
      portions: "1 banana · 2 oat biscuits (homemade) · 150ml warm milk",
      protein: "150ml Warm Milk",
      prep: [
        "Oat Biscuits: Mix 60g oats + 1 tsp honey + 1 tsp ghee + pinch of cinnamon + 2 tbsp milk into a stiff dough. Shape into flat rounds. Bake at 170°C for 15–18 min until golden.",
        "Warm milk: Heat 150ml low-fat milk, add tiny pinch of turmeric.",
        "Eat banana → biscuits → sip warm milk slowly.",
      ],
      note: "Bake oat biscuits in batches on Sunday — store in airtight box for the week.",
    },
    dinner: {
      name: "Multigrain Roti + Pumpkin Sabzi + Masoor Dal + Curd",
      portions: "2 rotis (60g flour) · 200g pumpkin · ½ cup masoor dal · 100g curd",
      protein: "Masoor Dal + Curd",
      prep: [
        "Roti: 60g multigrain atta, standard prep.",
        "Pumpkin Sabzi: Peel and cube 200g yellow pumpkin. Heat ½ tsp ghee, add cumin + ginger. Add pumpkin + salt + ¼ tsp turmeric. Cover and cook 15 min until soft and slightly mushy.",
        "Masoor Dal: Wash 50g masoor dal, pressure cook 2 whistles. Temper with ½ tsp ghee + cumin. No tomato.",
        "Curd at room temperature as a side.",
      ],
      note: "End your week with a light, easy dinner. Pumpkin is deeply alkaline and anti-inflammatory.",
    },
  },
];

const safeVsAvoid = {
  safe: [
    { icon: "🥣", item: "Oats, daliya, poha (thick), idli, upma, semolina" },
    { icon: "🍌", item: "Banana, papaya, watermelon, pear, apple (with skin)" },
    { icon: "🥦", item: "Lauki, turai, ash gourd, pumpkin, tinda, carrot, beans, broccoli" },
    { icon: "🍳", item: "Boiled / poached / scrambled eggs (no frying)" },
    { icon: "🐟", item: "Steamed / grilled fish — rohu, pomfret, surmai, king fish" },
    { icon: "🍗", item: "Grilled chicken breast (no skin, no charring)" },
    { icon: "🫘", item: "Moong dal, toor dal, masoor dal, chana dal (soaked)" },
    { icon: "🍚", item: "Normal white rice (cooked soft), multigrain roti" },
    { icon: "🥛", item: "Low-fat curd (room temp), plain buttermilk, warm milk" },
    { icon: "🥥", item: "Coconut milk, coconut chutney (no chilli)" },
    { icon: "🌿", item: "Cumin, turmeric, ginger, coriander, mustard seeds, hing" },
    { icon: "🫚", item: "Ghee (1 tsp/meal max), cold-pressed coconut oil" },
  ],
  avoid: [
    { icon: "🌶️", item: "Green chillies, red chilli powder, hot sauces, pepper (excess)" },
    { icon: "🍋", item: "Citrus fruits — lemon, orange, pineapple, grapes" },
    { icon: "☕", item: "Coffee, strong black tea — especially on empty stomach" },
    { icon: "🧀", item: "Paneer, tofu, rajma, dal makhani — heavy / slow-digesting" },
    { icon: "🥤", item: "Carbonated drinks, colas, energy drinks" },
    { icon: "🍟", item: "Deep-fried foods — samosa, pakoda, puri, chips" },
    { icon: "🍅", item: "Tomatoes, tamarind, raw onion in excess — highly acidic" },
    { icon: "🍫", item: "Chocolate, mint — relax the lower esophageal sphincter" },
    { icon: "🍷", item: "Alcohol — severely irritates the stomach lining" },
    { icon: "🧈", item: "Butter, cream, full-fat dairy, ghee excess (>2 tsp/day)" },
    { icon: "🍞", item: "Maida (refined flour) — bread, naan, biscuits, pasta" },
    { icon: "🥗", item: "Pickles, vinegar dressings, achaar, store-bought chutneys" },
  ],
};

const timingTips = [
  {
    icon: "⏰", title: "Pre-Workout — 60–90 Min Before",
    color: "#e8f5e9", border: "#43a047",
    tips: [
      "Have a small, easily digestible meal: 1 banana + 2 boiled eggs OR oats porridge (50g).",
      "Avoid any high-fat or high-fibre meal right before the treadmill — delays digestion and causes bloating mid-run.",
      "Drink 250ml warm water 20 min before eating. Sip 200ml water between meal and workout — do not gulp.",
    ],
  },
  {
    icon: "🏃", title: "During Workout — Treadmill + Resistance",
    color: "#e3f2fd", border: "#1e88e5",
    tips: [
      "Small sips of plain water every 15–20 min. Carry a 500ml bottle and finish it during the session.",
      "Never eat anything mid-workout — even a banana mid-run triggers reflux while your body is in motion.",
      "On the treadmill, maintain upright posture. Hunching over compresses the stomach and worsens acid splash.",
    ],
  },
  {
    icon: "🍽️", title: "Post-Workout Window — Within 30–45 Min",
    color: "#fff3e0", border: "#fb8c00",
    tips: [
      "THIS is your most important meal. Eat within 45 min of finishing: grilled chicken (120g) + rice (1 cup) + dal is ideal.",
      "Your muscles are insulin-sensitive post-workout — protein absorption is 30–40% higher. Don't skip this.",
      "Sit upright for at least 1 hour after eating. Do not lie down directly after the post-workout meal.",
    ],
  },
  {
    icon: "🌙", title: "Dinner — Critical Rule for Gastritis",
    color: "#f3e5f5", border: "#8e24aa",
    tips: [
      "Target dinner time: 7:00–7:30 PM. Absolute latest: 8:00 PM. Sleep should be at 10:00–10:30 PM.",
      "Keep dinner under 400 kcal — 2 rotis + sabzi + dal soup + curd. No heavy proteins at night.",
      "Elevate your head slightly while sleeping (use an extra pillow) — this physically prevents acid reflux at night.",
    ],
  },
];

const proteinOptions = {
  veg: [
    { name: "Moong Dal (cooked)", amount: "1 cup = ~14g", tip: "Easiest lentil on the stomach. Best for dinner dal." },
    { name: "Toor Dal (cooked)", amount: "1 cup = ~11g", tip: "Use for lunch dal. No tomato tempering." },
    { name: "Masoor Dal (cooked)", amount: "1 cup = ~13g", tip: "Fastest cooking. Great for quick dinner dal." },
    { name: "Chana Dal (cooked)", amount: "1 cup = ~13g", tip: "Soak 2–3 hours first. Rich, fills you up." },
    { name: "Chickpea Hummus", amount: "3 tbsp = ~6g", tip: "Homemade only. Spread on roti or dip cucumber." },
    { name: "Low-fat Curd", amount: "200g = ~8g", tip: "Room temp. Probiotic. Best after meals." },
    { name: "Warm Low-fat Milk", amount: "300ml = ~10g", tip: "Warm only. Add turmeric. Never cold milk." },
    { name: "Soaked Almonds", amount: "10 almonds = ~3g", tip: "Peel skin after soaking. Alkaline + gut-safe." },
    { name: "Roasted Peanuts", amount: "20g = ~5g", tip: "Dry roast — no oil, no salt. Good snack protein." },
    { name: "Cashews (raw)", amount: "10 pieces = ~3g", tip: "Lower acid than other nuts. Max 10–12/day." },
  ],
  nonVeg: [
    { name: "Chicken Breast (grilled)", amount: "120g = ~37g", tip: "Highest protein. Always grill — never fry." },
    { name: "Chicken Soup (bone broth)", amount: "1 bowl = ~15g", tip: "Collagen heals stomach lining. Best dinner protein." },
    { name: "Whole Egg (boiled)", amount: "1 egg = ~6g", tip: "10 min boil. Safest cooking method for gastritis." },
    { name: "Egg White (3 whites)", amount: "3 whites = ~11g", tip: "Zero fat. Great for breakfast scramble." },
    { name: "Egg Bhurji (1 egg)", amount: "1 egg = ~6g", tip: "Non-stick pan, ¼ tsp oil, no chilli." },
    { name: "Rohu Fish (steamed)", amount: "150g = ~25g", tip: "Steam or grill only. Light omega-3 fish." },
    { name: "Pomfret (grilled)", amount: "150g = ~28g", tip: "Grill on medium flame with ginger+turmeric." },
    { name: "Surmai / King Fish", amount: "130g = ~28g", tip: "Rich omega-3. Grill with ginger paste. No charring." },
  ],
};

export default function DietPlan() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedMeal, setExpandedMeal] = useState(null);

  const tabs = [
    { id: "plan", label: "📅 7-Day Plan" },
    { id: "foods", label: "🥗 Safe vs Avoid" },
    { id: "timing", label: "⏰ Meal Timing" },
    { id: "protein", label: "💪 Protein Guide" },
  ];

  const current = mealPlan[activeDay];

  const mealSections = [
    { key: "breakfast", label: "🌅 Breakfast", bg: "#fffde7", accent: "#f9a825" },
    { key: "lunch", label: "☀️ Lunch", bg: "#e8f5e9", accent: "#43a047" },
    { key: "snack", label: "🍎 Evening Snack", bg: "#fff3e0", accent: "#fb8c00" },
    { key: "dinner", label: "🌙 Dinner", bg: "#ede7f6", accent: "#7e57c2" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f0f7ee 0%, #fdf6ec 60%, #eef2f7 100%)",
      fontFamily: "'Georgia', serif",
      paddingBottom: 60,
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 60%, #40916c 100%)",
        color: "white",
        padding: "36px 20px 28px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 50%, rgba(255,255,255,0.06) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.07) 0%, transparent 50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: "4px", color: "#95d5b2", textTransform: "uppercase", marginBottom: 8, fontFamily: "sans-serif" }}>
            Personalized · Gastritis-Safe · Fat Loss
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: "normal", lineHeight: 1.2 }}>
            Gut-Friendly Diet Plan
          </h1>
          <p style={{ margin: "10px 0 0", fontSize: 13, color: "#b7e4c7", fontStyle: "italic", fontFamily: "sans-serif" }}>
            With exact portions & full preparation steps · ~1,800–1,900 kcal/day
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 16 }}>
            {[["🏋️","100 kg"], ["📏","180 cm"], ["🚶","5km/day"], ["🫁","Gastritis-safe"], ["🥩","Non-veg Mon–Fri,Sun"], ["🌿","Sat: Veg Only"]].map(([ic, lb]) => (
              <span key={lb} style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "sans-serif", color: "#d8f3dc" }}>{ic} {lb}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#1b4332", position: "sticky", top: 0, zIndex: 10, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, minWidth: 80, padding: "13px 6px",
            border: "none",
            background: activeTab === t.id ? "#40916c" : "transparent",
            color: activeTab === t.id ? "white" : "#95d5b2",
            fontFamily: "sans-serif", fontSize: 12, fontWeight: activeTab === t.id ? "700" : "400",
            cursor: "pointer", borderBottom: activeTab === t.id ? "3px solid #74c69d" : "3px solid transparent",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "20px 14px" }}>

        {/* 7-DAY PLAN */}
        {activeTab === "plan" && (
          <div>
            {/* Day Selector */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
              {mealPlan.map((d, i) => (
                <button key={i} onClick={() => { setActiveDay(i); setExpandedMeal(null); }} style={{
                  width: 54, height: 54, borderRadius: "50%",
                  border: activeDay === i ? "2.5px solid #40916c" : "2px solid #ccc",
                  background: activeDay === i ? "#1b4332" : d.isVeg ? "#f1f8e9" : "white",
                  color: activeDay === i ? "white" : "#333",
                  fontFamily: "sans-serif", fontSize: 12, fontWeight: "700",
                  cursor: "pointer",
                  boxShadow: activeDay === i ? "0 4px 14px rgba(27,67,50,0.35)" : "none",
                  transition: "all 0.2s", position: "relative",
                }}>
                  {days[i]}
                  {d.isVeg && <span style={{ position: "absolute", top: -3, right: -3, fontSize: 10, background: "#43a047", color: "white", borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>🌿</span>}
                </button>
              ))}
            </div>

            {/* Day Header */}
            <div style={{ background: "linear-gradient(135deg, #1b4332, #40916c)", borderRadius: "14px 14px 0 0", padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "white", fontSize: 22, fontWeight: "normal" }}>{current.day}</div>
                <div style={{ color: "#95d5b2", fontSize: 12, fontFamily: "sans-serif", marginTop: 2 }}>
                  {current.isVeg ? "🌿 Fully Vegetarian Day" : "🥩 Non-Veg Included"}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.18)", color: "white", padding: "6px 14px", borderRadius: 20, fontFamily: "sans-serif", fontSize: 13, fontWeight: "600" }}>
                {current.kcal} kcal
              </div>
            </div>

            {/* Meals */}
            {mealSections.map(({ key, label, bg, accent }) => {
              const meal = current[key];
              const isOpen = expandedMeal === key;
              return (
                <div key={key} style={{ background: "white", borderBottom: "1px solid #eee" }}>
                  <div style={{ padding: "18px 22px", background: bg + "66", borderLeft: `4px solid ${accent}` }}>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: "800", color: accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
                    <div style={{ fontSize: 15, color: "#1a1a1a", marginBottom: 6, lineHeight: 1.4 }}><strong>{meal.name}</strong></div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 8, lineHeight: 1.6 }}>
                      <span style={{ fontWeight: "700", color: "#333" }}>📊 Portions: </span>{meal.portions}
                    </div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#2d6a4f", fontWeight: "700", marginBottom: 10 }}>
                      💪 Protein Source: {meal.protein}
                    </div>
                    <button onClick={() => setExpandedMeal(isOpen ? null : key)} style={{
                      background: isOpen ? accent : "white",
                      color: isOpen ? "white" : accent,
                      border: `1.5px solid ${accent}`,
                      borderRadius: 20, padding: "6px 16px",
                      fontFamily: "sans-serif", fontSize: 12, fontWeight: "600",
                      cursor: "pointer", transition: "all 0.2s",
                    }}>
                      {isOpen ? "▲ Hide Preparation" : "▼ View Step-by-Step Preparation"}
                    </button>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "18px 22px", background: "#fafafa", borderLeft: `4px solid ${accent}` }}>
                      <div style={{ fontFamily: "sans-serif", fontSize: 12, fontWeight: "800", color: "#333", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>
                        🍳 Preparation Steps
                      </div>
                      {meal.prep.map((step, si) => (
                        <div key={si} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                          <div style={{ width: 24, height: 24, borderRadius: "50%", background: accent, color: "white", fontFamily: "sans-serif", fontSize: 12, fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {si + 1}
                          </div>
                          <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#444", lineHeight: 1.6 }}>{step}</div>
                        </div>
                      ))}
                      <div style={{ marginTop: 12, padding: "10px 14px", background: accent + "15", borderRadius: 8, borderLeft: `3px solid ${accent}`, fontFamily: "sans-serif", fontSize: 12, color: "#555", fontStyle: "italic" }}>
                        💡 {meal.note}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ borderRadius: "0 0 14px 14px", background: "#f0fdf4", padding: "14px 22px", borderTop: "2px dashed #b7e4c7" }}>
              <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#2d6a4f", fontWeight: "600" }}>
                ℹ️ Click "View Step-by-Step Preparation" on any meal above to see exact cooking instructions.
              </div>
            </div>
          </div>
        )}

        {/* SAFE VS AVOID */}
        {activeTab === "foods" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: "normal", color: "#1b4332", margin: "0 0 6px" }}>Foods Guide</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#666", margin: 0 }}>Curated for gastritis + fat loss · Excludes paneer, tofu, rajma, dal makhani</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { title: "✅ Safe Foods", sub: "Gut-friendly & fat-loss approved", items: safeVsAvoid.safe, headerBg: "#1b4332", rowBg: "#f0fdf4" },
                { title: "❌ Avoid Foods", sub: "Trigger gastritis flare-ups", items: safeVsAvoid.avoid, headerBg: "#b71c1c", rowBg: "#fff5f5" },
              ].map(({ title, sub, items, headerBg, rowBg }) => (
                <div key={title} style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.09)" }}>
                  <div style={{ background: headerBg, padding: "14px 18px" }}>
                    <div style={{ color: "white", fontSize: 15, fontWeight: "700", fontFamily: "sans-serif" }}>{title}</div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontFamily: "sans-serif", marginTop: 2 }}>{sub}</div>
                  </div>
                  {items.map((item, i) => (
                    <div key={i} style={{ padding: "11px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", gap: 10, background: i % 2 === 0 ? "white" : rowBg, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#333", lineHeight: 1.5 }}>{item.item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, background: "white", borderRadius: 14, padding: "18px 20px", boxShadow: "0 3px 14px rgba(0,0,0,0.07)", borderLeft: "4px solid #fb8c00" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "700", color: "#e65100", marginBottom: 10, fontSize: 14 }}>⚠️ Why these 4 foods are excluded for you</div>
              {[
                ["Paneer", "High in saturated fat — slow to digest, can sit in stomach and worsen acid secretion."],
                ["Tofu", "Processed soy — some people with gastritis react to phytic acid in soy products."],
                ["Rajma (Kidney Beans)", "Even well-cooked, kidney beans cause gas and bloating — worsens gastritis discomfort."],
                ["Dal Makhani", "Contains cream, butter, and overnight-cooked beans — too heavy and fatty for a sensitive stomach."],
              ].map(([name, reason]) => (
                <div key={name} style={{ display: "flex", gap: 10, marginBottom: 8, fontFamily: "sans-serif", fontSize: 13, color: "#444" }}>
                  <span style={{ color: "#fb8c00", fontWeight: "700", flexShrink: 0 }}>→</span>
                  <span><strong>{name}:</strong> {reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEAL TIMING */}
        {activeTab === "timing" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: "normal", color: "#1b4332", margin: "0 0 6px" }}>Workout Meal Timing</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#666", margin: 0 }}>Prevent acid reflux during your 5km treadmill + resistance session</p>
            </div>

            <div style={{ background: "white", borderRadius: 14, padding: "18px 20px", boxShadow: "0 3px 14px rgba(0,0,0,0.08)", marginBottom: 18, borderLeft: "4px solid #40916c" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "700", fontSize: 13, color: "#1b4332", marginBottom: 12 }}>📅 Ideal Daily Schedule</div>
              {[
                ["7:00 AM", "🌅", "Light breakfast — oats or banana + eggs"],
                ["8:30 AM", "🏃", "Start treadmill (5km) + resistance workout"],
                ["9:30 AM", "🍳", "Post-workout protein meal — most important meal"],
                ["1:00 PM", "☀️", "Lunch — your largest meal of the day"],
                ["4:30 PM", "🍎", "Evening snack — fruit + nuts or curd"],
                ["7:30 PM", "🌙", "Dinner — light, before 8:00 PM latest"],
                ["10:00 PM", "😴", "Sleep — head slightly elevated"],
              ].map(([time, icon, label]) => (
                <div key={time} style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 10, fontFamily: "sans-serif" }}>
                  <div style={{ minWidth: 60, fontSize: 12, color: "#888", fontWeight: "600" }}>{time}</div>
                  <div style={{ fontSize: 18 }}>{icon}</div>
                  <div style={{ fontSize: 13, color: "#333" }}>{label}</div>
                </div>
              ))}
            </div>

            {timingTips.map((tip, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 14px rgba(0,0,0,0.07)", marginBottom: 14 }}>
                <div style={{ background: tip.color, borderLeft: `5px solid ${tip.border}`, padding: "14px 18px" }}>
                  <div style={{ fontFamily: "sans-serif", fontSize: 15, fontWeight: "700", color: "#1a1a1a" }}>{tip.icon} {tip.title}</div>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  {tip.tips.map((t, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: j < tip.tips.length - 1 ? 10 : 0, fontFamily: "sans-serif", fontSize: 13, color: "#444", lineHeight: 1.6 }}>
                      <span style={{ color: tip.border, fontWeight: "700", flexShrink: 0 }}>→</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROTEIN GUIDE */}
        {activeTab === "protein" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: "normal", color: "#1b4332", margin: "0 0 6px" }}>Protein Guide</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#666", margin: 0 }}>Stomach-gentle sources · Target: 120–140g protein/day</p>
            </div>

            {[
              { title: "🌿 Vegetarian Protein Sources", sub: "Use daily — especially on Saturday", data: proteinOptions.veg, accent: "#2d6a4f", bg: "#e8f5e9" },
              { title: "🍗 Non-Vegetarian Sources", sub: "Mon–Fri and Sunday only (skip Saturday)", data: proteinOptions.nonVeg, accent: "#4527a0", bg: "#ede7f6" },
            ].map(({ title, sub, data, accent, bg }) => (
              <div key={title} style={{ marginBottom: 22 }}>
                <div style={{ background: accent, color: "white", padding: "14px 20px", borderRadius: "14px 14px 0 0" }}>
                  <div style={{ fontFamily: "sans-serif", fontSize: 15, fontWeight: "700" }}>{title}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{sub}</div>
                </div>
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.08)" }}>
                  {data.map((item, i) => (
                    <div key={i} style={{ padding: "13px 18px", borderBottom: i < data.length - 1 ? "1px solid #f2f2f2" : "none", background: i % 2 === 0 ? "white" : bg + "55" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                        <div>
                          <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: "700", color: "#1a1a1a", marginBottom: 4 }}>{item.name}</div>
                          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#777", fontStyle: "italic" }}>💡 {item.tip}</div>
                        </div>
                        <div style={{ background: accent + "18", color: accent, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontSize: 12, fontWeight: "700", whiteSpace: "nowrap", border: `1px solid ${accent}30`, flexShrink: 0 }}>
                          {item.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: "#fff8e1", borderRadius: 14, padding: "18px 20px", border: "1px solid #ffe082" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "700", color: "#e65100", marginBottom: 12, fontSize: 14 }}>⚠️ Protein Rules for Gastritis</div>
              {[
                "Never eat protein on a completely empty stomach. Have banana or oats first, then protein.",
                "Avoid commercial whey/protein shakes — artificial sweeteners and additives trigger gastritis.",
                "Cook all non-veg on medium-low flame. High-heat charring increases acidity in food.",
                "Space protein meals 3–4 hours apart for optimal absorption and comfortable digestion.",
                "Always pair protein with an alkaline food: curd, banana, cucumber, warm milk.",
                "On Saturday (veg-only day), meet your protein target through dal + curd + milk + nuts combination.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 5 ? 8 : 0, fontFamily: "sans-serif", fontSize: 13, color: "#555", lineHeight: 1.5 }}>
                  <span style={{ color: "#e65100", flexShrink: 0 }}>•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: 11, color: "#aaa", padding: "16px 20px" }}>
        This plan is for informational purposes only. Please consult a gastroenterologist and registered dietitian for personalised medical guidance.
      </div>
    </div>
  );
}
