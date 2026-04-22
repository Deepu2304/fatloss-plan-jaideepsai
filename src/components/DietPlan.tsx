import { useState, useRef, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mealPlan = [
  {
    day: "Monday", isVeg: false, kcal: 1860,
    macros: { protein: 138, carbs: 198, fat: 42, fiber: 24 },
    breakfast: {
      name: "Oats Porridge with Banana & Boiled Eggs",
      portions: "50g oats · 1 medium banana · 1 tsp honey · 2 whole eggs",
      macros: { protein: 22, carbs: 58, fat: 12, fiber: 6, kcal: 430 },
      protein: "2 Boiled Eggs (12g protein)",
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
      portions: "200g cooked rice · 100g cooked moong dal · 1 cup sabzi · 120g chicken breast",
      macros: { protein: 52, carbs: 78, fat: 10, fiber: 8, kcal: 620 },
      protein: "120g Grilled Chicken Breast (37g protein)",
      prep: [
        "Rice: Wash 80g raw rice 2–3 times. Add 1.5 cups water, cook on low flame 15 min. Fluff with fork.",
        "Moong Dal: Wash 50g moong dal. Pressure cook with 1.5 cups water, pinch turmeric, 3 whistles. Add cumin tadka in ½ tsp ghee.",
        "Sabzi (Carrot & Beans): Chop 1 medium carrot + 10–12 beans. Steam 8 min. Season with ¼ tsp cumin, salt, ½ tsp ghee.",
        "Chicken: Marinate 120g breast with ginger paste, salt, turmeric 30 min. Grill on tawa with ½ tsp oil, 5–6 min per side.",
      ],
      note: "Avoid tomatoes or tamarind in dal — both are acidic.",
    },
    snack: {
      name: "Banana + Soaked Almonds + Curd",
      portions: "1 medium banana · 10 almonds (soaked) · 100g low-fat curd",
      macros: { protein: 9, carbs: 32, fat: 8, fiber: 4, kcal: 230 },
      protein: "100g Low-fat Curd (4g protein)",
      prep: [
        "Soak 10 almonds overnight. Peel skins before eating — easier on stomach.",
        "Take 100g fresh curd (not sour). Eat at room temperature, not cold from fridge.",
        "Eat banana first, then almonds, then curd.",
      ],
      note: "Soaked almonds are more alkaline than raw — gentler on the gut.",
    },
    dinner: {
      name: "Multigrain Roti + Lauki Sabzi + Cucumber Raita + Boiled Egg",
      portions: "2 rotis (60g flour) · 200g lauki · 1 cucumber · 100g curd · 1 boiled egg",
      macros: { protein: 22, carbs: 48, fat: 9, fiber: 7, kcal: 360 },
      protein: "1 Boiled Egg (6g protein)",
      prep: [
        "Roti: Knead 60g multigrain atta with water into soft dough. Roll thin. Cook 1 min per side, apply ¼ tsp ghee.",
        "Lauki Sabzi: Peel and cube 200g bottle gourd. Heat ½ tsp ghee, add cumin seeds, add lauki, salt, ¼ tsp turmeric. Cook covered 12–15 min.",
        "Raita: Grate 1 cucumber, mix into 100g curd. Add roasted cumin powder, salt. No chilli.",
        "Boil 1 egg 10 min. Slice and eat alongside meal.",
      ],
      note: "Eat dinner by 7:30 PM — lauki is one of the most alkaline vegetables.",
    },
  },
  {
    day: "Tuesday", isVeg: false, kcal: 1820,
    macros: { protein: 130, carbs: 195, fat: 40, fiber: 22 },
    breakfast: {
      name: "Vegetable Daliya + Egg Whites",
      portions: "50g daliya · ½ cup mixed veg (carrot, peas) · 1 tsp ghee · 3 egg whites",
      macros: { protein: 20, carbs: 52, fat: 8, fiber: 5, kcal: 360 },
      protein: "3 Egg Whites Scrambled (11g protein)",
      prep: [
        "Dry roast 50g daliya in a pan 2–3 min on medium flame until light golden and fragrant.",
        "Add 1.5 cups water, ½ cup chopped carrot + peas, ¼ tsp cumin, salt. Cook covered 15 min on low flame.",
        "Add 1 tsp ghee at the end. Daliya should be soft — not watery, not dry.",
        "Egg whites: Separate 3 eggs. Whisk whites with salt. Cook in non-stick pan with ¼ tsp oil, stir gently 2–3 min.",
      ],
      note: "Daliya is slower to digest than oats — keeps you full till lunch.",
    },
    lunch: {
      name: "Moong Dal Khichdi + Steamed Fish",
      portions: "60g rice + 40g moong dal · 150g fish (rohu/pomfret) · 1 tsp ghee",
      macros: { protein: 48, carbs: 72, fat: 10, fiber: 6, kcal: 580 },
      protein: "150g Steamed Rohu / Pomfret (25g protein)",
      prep: [
        "Khichdi: Wash 60g rice + 40g yellow moong dal together. Pressure cook with 2.5 cups water, ¼ tsp turmeric, pinch asafoetida, salt — 4 whistles. Should be soft and mushy. Add 1 tsp ghee.",
        "Fish: Clean 150g fish. Apply ginger paste + salt + ¼ tsp turmeric. Place in steamer or idli vessel. Steam 12–15 min until flesh flakes easily.",
        "Do NOT fry fish. Steaming preserves omega-3 and avoids added acidity.",
      ],
      note: "Khichdi + steamed fish is the most gut-healing combination in this plan.",
    },
    snack: {
      name: "Watermelon + Walnuts + Buttermilk",
      portions: "200g watermelon · 4 walnut halves · 200ml plain buttermilk",
      macros: { protein: 8, carbs: 28, fat: 10, fiber: 3, kcal: 220 },
      protein: "200ml Plain Buttermilk (4g protein)",
      prep: [
        "Cut fresh watermelon — avoid pre-cut stored fruit.",
        "Buttermilk: Whisk 3 tbsp curd in 200ml water until smooth. Add roasted cumin powder + salt.",
        "Eat watermelon, then walnuts, then sip buttermilk slowly.",
      ],
      note: "Watermelon is 92% water and deeply alkaline — perfect for gastritis.",
    },
    dinner: {
      name: "Multigrain Roti + Ridge Gourd Sabzi + Moong Soup",
      portions: "2 rotis (60g flour) · 200g ridge gourd · ½ cup moong dal soup",
      macros: { protein: 18, carbs: 46, fat: 8, fiber: 7, kcal: 330 },
      protein: "½ cup Moong Dal Soup (7g protein)",
      prep: [
        "Roti: 60g multigrain atta, roll thin, cook on tawa, ¼ tsp ghee.",
        "Ridge Gourd (Turai): Peel and slice 200g turai. Heat ½ tsp ghee, add cumin, ginger, salt, ¼ tsp turmeric. Cook uncovered 10 min.",
        "Moong Soup: Boil ½ cup cooked moong dal with 1 cup water, ¼ tsp cumin, salt. Stir into clear soup.",
      ],
      note: "Keep this dinner under 400 kcal. Ridge gourd is extremely easy to digest.",
    },
  },
  {
    day: "Wednesday", isVeg: false, kcal: 1840,
    macros: { protein: 132, carbs: 196, fat: 41, fiber: 23 },
    breakfast: {
      name: "Curd Rice + Boiled Eggs",
      portions: "200g cooked rice · 150g low-fat curd · ¼ tsp mustard seeds · 2 boiled eggs",
      macros: { protein: 22, carbs: 58, fat: 10, fiber: 2, kcal: 410 },
      protein: "2 Boiled Eggs (12g protein)",
      prep: [
        "Cook rice. Let it cool to room temperature (not fridge-cold).",
        "Mash 200g cooked rice lightly. Mix in 150g fresh curd and salt.",
        "Tempering: Heat ½ tsp ghee, add ¼ tsp mustard seeds. Let splutter. Pour over curd rice. Add grated carrot.",
        "Boil 2 eggs 10 min separately. Eat alongside.",
      ],
      note: "Curd rice is probiotic — actively repairs the stomach lining.",
    },
    lunch: {
      name: "Steamed Rice + Toor Dal + Drumstick Sabzi + Grilled Chicken",
      portions: "200g cooked rice · 100g cooked toor dal · 1 cup drumstick sabzi · 120g chicken",
      macros: { protein: 52, carbs: 76, fat: 10, fiber: 9, kcal: 620 },
      protein: "120g Grilled Chicken Breast (37g protein)",
      prep: [
        "Rice: 80g raw rice, wash 3x, cook with 1.5 cups water 15 min.",
        "Toor Dal: Wash 50g toor dal. Pressure cook 3 whistles. Temper with ½ tsp ghee + cumin. NO tomato.",
        "Drumstick Sabzi: Cut 2 drumsticks into 3-inch pieces. Boil 10 min until soft. Stir fry in ½ tsp oil with cumin, salt, turmeric 3 min.",
        "Chicken: Marinate with ginger+salt+turmeric. Grill on tawa 5–6 min per side.",
      ],
      note: "Drumstick (murungakkai) is anti-inflammatory and great for gut health.",
    },
    snack: {
      name: "Apple + Warm Milk",
      portions: "1 medium apple (150g) · 200ml warm low-fat milk",
      macros: { protein: 8, carbs: 30, fat: 4, fiber: 4, kcal: 200 },
      protein: "200ml Warm Low-fat Milk (7g protein)",
      prep: [
        "Wash apple thoroughly. Eat with skin — pectin in skin is a prebiotic.",
        "Warm milk: Heat 200ml low-fat milk to just below boiling. Add a pinch of turmeric.",
        "Eat apple first, wait 10 min, then drink milk.",
      ],
      note: "Warm milk buffers stomach acid. Never drink cold milk — causes rebound acidity.",
    },
    dinner: {
      name: "Multigrain Roti + Ash Gourd Sabzi + Egg Bhurji",
      portions: "2 rotis (60g flour) · 200g ash gourd · 1 whole egg + 1 white",
      macros: { protein: 18, carbs: 46, fat: 9, fiber: 6, kcal: 340 },
      protein: "1 Egg + 1 Egg White Bhurji (9g protein)",
      prep: [
        "Roti: Standard prep — 60g multigrain atta, soft dough, roll and cook.",
        "Ash Gourd: Peel and cube 200g. Heat ½ tsp ghee, add cumin + grated ginger. Add ash gourd + salt + ¼ tsp turmeric. Cook covered 15 min.",
        "Egg Bhurji: Whisk 1 whole egg + 1 white. Heat non-stick pan, add ¼ tsp oil. Pour eggs. Add salt, ¼ tsp cumin powder. Stir gently 2–3 min. No chilli.",
      ],
      note: "Ash gourd is deeply alkaline — one of the best vegetables for gastritis.",
    },
  },
  {
    day: "Thursday", isVeg: false, kcal: 1850,
    macros: { protein: 134, carbs: 197, fat: 42, fiber: 22 },
    breakfast: {
      name: "Banana Oat Smoothie + Boiled Eggs",
      portions: "1 large banana · 30g oats · 200ml low-fat milk · 2 boiled eggs",
      macros: { protein: 24, carbs: 60, fat: 12, fiber: 4, kcal: 440 },
      protein: "2 Boiled Eggs (12g protein)",
      prep: [
        "Blend 1 ripe banana + 30g rolled oats + 200ml low-fat milk until smooth. No citrus, no seeds.",
        "Pour into a glass and drink slowly — do not gulp.",
        "Boil 2 eggs separately (10 min), eat alongside smoothie.",
        "Do not add protein powder — commercial powders are often acidic.",
      ],
      note: "Banana is one of the few alkaline fruits that coats the stomach lining.",
    },
    lunch: {
      name: "Jeera Rice + Chana Dal + 2-Egg Light Curry",
      portions: "200g jeera rice · 100g cooked chana dal · 2 eggs (light curry)",
      macros: { protein: 40, carbs: 80, fat: 12, fiber: 8, kcal: 600 },
      protein: "2-Egg Light Curry (12g protein)",
      prep: [
        "Jeera Rice: Cook 80g raw rice. Heat ½ tsp ghee, add 1 tsp cumin seeds. Toss cooked rice 2 min with salt.",
        "Chana Dal: Soak 50g chana dal 2 hours. Pressure cook 4 whistles. Temper with ½ tsp ghee + cumin. No tomato.",
        "Egg Curry: Boil 2 eggs, peel. Heat ½ tsp oil, add ½ tsp cumin, 1 tsp ginger paste, ¼ tsp turmeric, salt. Add ½ cup water, simmer. Add halved eggs. Simmer 5 min. No red chilli.",
      ],
      note: "Chana dal needs soaking — without it, causes bloating and gas.",
    },
    snack: {
      name: "Papaya + Roasted Peanuts + Buttermilk",
      portions: "150g papaya · 20g roasted peanuts · 150ml buttermilk",
      macros: { protein: 9, carbs: 26, fat: 8, fiber: 4, kcal: 210 },
      protein: "20g Roasted Peanuts + Buttermilk (5g protein)",
      prep: [
        "Cut 150g ripe papaya. Remove seeds. Eat as is — no salt or lime on papaya.",
        "Peanuts: Dry roast 20g raw peanuts on tawa 5 min, tossing frequently. Allow to cool.",
        "Buttermilk: Whisk 3 tbsp curd in 150ml water. Add cumin powder + salt only.",
      ],
      note: "Papaya contains papain enzyme — a natural gut-healer and fat digestion aid.",
    },
    dinner: {
      name: "Multigrain Roti + Palak Sabzi + Grilled Fish",
      portions: "2 rotis (60g flour) · 150g spinach · 130g fish (surmai/pomfret)",
      macros: { protein: 34, carbs: 46, fat: 8, fiber: 7, kcal: 390 },
      protein: "130g Grilled Surmai / Pomfret (28g protein)",
      prep: [
        "Roti: Standard 60g multigrain atta prep.",
        "Palak Sabzi: Wash 150g spinach. Blanch 2 min, drain. Chop roughly. Heat ½ tsp ghee, add garlic (1 small clove optional), add spinach, salt, ¼ tsp cumin powder. Stir fry 3 min.",
        "Fish: Marinate 130g fish with ginger paste, salt, ¼ tsp turmeric. Grill on tawa 4–5 min per side on medium flame.",
      ],
      note: "Grill fish on medium — not high heat. Charring increases acidity.",
    },
  },
  {
    day: "Friday", isVeg: false, kcal: 1870,
    macros: { protein: 136, carbs: 200, fat: 43, fiber: 25 },
    breakfast: {
      name: "Vegetable Poha + Boiled Eggs",
      portions: "60g thick poha · ½ cup mixed veg (peas, carrot) · 2 boiled eggs",
      macros: { protein: 20, carbs: 54, fat: 10, fiber: 5, kcal: 390 },
      protein: "2 Boiled Eggs (12g protein)",
      prep: [
        "Wash 60g thick poha in strainer under running water 30 sec. Drain and let sit 5 min — softens naturally.",
        "Heat ½ tsp oil. Add ¼ tsp mustard seeds + cumin. Add ½ cup peas + carrot, cook 3 min.",
        "Add soaked poha + salt + ¼ tsp turmeric. Mix gently. Cover and cook on low 3–4 min. No chilli.",
        "Boil 2 eggs 10 min separately.",
      ],
      note: "Use THICK poha — thin poha becomes mushy and harder to digest.",
    },
    lunch: {
      name: "Steamed Rice + Masoor Dal + Steamed Broccoli + Grilled Chicken",
      portions: "200g cooked rice · 100g masoor dal · 1 cup broccoli · 120g chicken",
      macros: { protein: 54, carbs: 76, fat: 10, fiber: 9, kcal: 620 },
      protein: "120g Grilled Chicken Breast (37g protein)",
      prep: [
        "Rice: 80g raw, wash 3x, cook with 1.5 cups water 15 min.",
        "Masoor Dal: Wash 50g masoor dal (no soaking needed). Pressure cook 2 whistles. Temper with ½ tsp ghee + cumin. No tomato.",
        "Broccoli: Steam 1 cup florets 7–8 min. Season with salt + ¼ tsp ghee.",
        "Chicken: Standard marinade. Grill 5–6 min per side on tawa.",
      ],
      note: "Masoor dal is the quickest-cooking and easiest lentil to digest.",
    },
    snack: {
      name: "Cucumber + Homemade Hummus + Chaas",
      portions: "1 medium cucumber (150g) · 3 tbsp homemade hummus · 200ml chaas",
      macros: { protein: 10, carbs: 28, fat: 8, fiber: 6, kcal: 220 },
      protein: "Hummus (chickpea-based) + Chaas (6g protein)",
      prep: [
        "Hummus: Soak 50g chickpeas overnight. Boil until very soft 30–40 min. Blend with 1 tsp tahini, ½ tsp cumin, salt, 1 tsp olive oil. Add water for consistency. NO lemon/garlic if sensitive.",
        "Slice cucumber into sticks. Dip in hummus.",
        "Chaas: Whisk 3 tbsp curd in 200ml water. Add cumin + salt.",
      ],
      note: "Make hummus at home — store-bought versions often contain preservatives and vinegar.",
    },
    dinner: {
      name: "Multigrain Roti + Tinda Sabzi + Clear Chicken Soup",
      portions: "2 rotis (60g flour) · 200g tinda · 150ml clear chicken soup",
      macros: { protein: 26, carbs: 48, fat: 9, fiber: 7, kcal: 370 },
      protein: "150ml Clear Chicken Bone Broth (15g protein)",
      prep: [
        "Roti: Standard prep — 60g multigrain atta.",
        "Tinda Sabzi: Peel and cube 200g apple gourd. Heat ½ tsp ghee, add cumin, ginger. Add tinda + salt + ¼ tsp turmeric. Cover and cook 12–15 min.",
        "Chicken Soup: Boil 80g chicken pieces (with bone) in 400ml water with ginger + salt + cumin 25–30 min. Strain and drink clear broth. Eat soft chicken pieces.",
      ],
      note: "Bone broth chicken soup is gut-healing — the collagen repairs stomach lining.",
    },
  },
  {
    day: "Saturday", isVeg: true, kcal: 1780,
    macros: { protein: 88, carbs: 210, fat: 38, fiber: 28 },
    breakfast: {
      name: "Idli + Coconut Chutney + Mild Sambar",
      portions: "3 medium idlis (~180g) · 3 tbsp coconut chutney · ½ cup mild sambar",
      macros: { protein: 14, carbs: 62, fat: 8, fiber: 5, kcal: 380 },
      protein: "Sambar (lentil-based, 7g protein)",
      prep: [
        "Use store-bought idli batter or ferment your own (urad dal + rice, soak 6 hrs, grind, ferment 8 hrs).",
        "Pour batter into greased idli moulds. Steam in idli pot 10–12 min. Toothpick should come out clean.",
        "Coconut Chutney: Blend 3 tbsp grated coconut + ¼ tsp cumin + salt + small piece ginger + water. No green chilli.",
        "Sambar: Boil ½ cup toor dal. Add drumstick/carrot, ¼ tsp sambar powder (mild), salt. Simmer 10 min. No tamarind if acid-sensitive.",
      ],
      note: "Fermented idli batter is probiotic — the best Saturday breakfast for gut healing.",
    },
    lunch: {
      name: "Steamed Rice + Coconut Vegetable Curry + Moong Dal",
      portions: "200g cooked rice · 1 cup mixed veg curry (coconut milk) · 100g cooked moong dal",
      macros: { protein: 22, carbs: 82, fat: 12, fiber: 9, kcal: 540 },
      protein: "½ cup Moong Dal (7g protein)",
      prep: [
        "Rice: 80g raw, wash 3x, cook 15 min.",
        "Coconut Veg Curry: Chop 200g mixed veg (carrot, beans, potato). Cook in ½ cup coconut milk + 1 cup water + ¼ tsp cumin + salt on low flame 15 min.",
        "Moong Dal: Pressure cook 50g moong dal, 3 whistles. Temper with ½ tsp ghee + cumin.",
      ],
      note: "Saturday is your full gut-rest day — no non-veg, no heavy proteins.",
    },
    snack: {
      name: "Pear + Cashews + Curd",
      portions: "1 medium pear (150g) · 10–12 cashews · 100g low-fat curd",
      macros: { protein: 8, carbs: 32, fat: 8, fiber: 5, kcal: 230 },
      protein: "100g Low-fat Curd (4g protein)",
      prep: [
        "Wash and slice pear. Eat with skin — contains gut-friendly prebiotics.",
        "Cashews: Raw or lightly dry-roasted (no salt, no oil). Limit to 10–12 pieces.",
        "Curd: At room temperature. Add a pinch of roasted cumin powder.",
      ],
      note: "Pear is one of the highest-fibre fruits and very gentle on the stomach.",
    },
    dinner: {
      name: "Multigrain Roti + Mixed Vegetable Sabzi + Moong Dal Soup + Curd",
      portions: "2 rotis (60g flour) · 1.5 cups mixed sabzi · ½ cup dal soup · 100g curd",
      macros: { protein: 18, carbs: 52, fat: 8, fiber: 8, kcal: 360 },
      protein: "Moong Dal + Curd (11g protein)",
      prep: [
        "Roti: 60g multigrain atta, standard prep.",
        "Mixed Sabzi: Chop 100g each pumpkin + carrot + green beans. Heat ½ tsp ghee, add cumin + ginger, add veg, ¼ tsp turmeric, salt. Cook covered 15 min.",
        "Moong Dal Soup: Cook ½ cup moong dal with 1.5 cups water, salt, cumin. Thin soup consistency.",
        "Curd at room temperature as the final component.",
      ],
      note: "Saturday dinner: lightest meal of the week. Prepares your gut for Sunday.",
    },
  },
  {
    day: "Sunday", isVeg: false, kcal: 1900,
    macros: { protein: 140, carbs: 202, fat: 44, fiber: 26 },
    breakfast: {
      name: "Vegetable Upma + Boiled Eggs",
      portions: "60g semolina (rava) · ½ cup mixed veg · 1 tsp ghee · 2 boiled eggs",
      macros: { protein: 22, carbs: 60, fat: 12, fiber: 4, kcal: 440 },
      protein: "2 Boiled Eggs (12g protein)",
      prep: [
        "Dry roast 60g rava in pan on medium flame 3–4 min, stirring constantly, until light golden.",
        "Heat 1 tsp ghee. Add mustard seeds. Once spluttering, add ½ cup chopped carrot + peas + beans. Sauté 3 min.",
        "Add 1.5 cups boiling water + salt. Let boil. Slowly pour roasted rava while stirring to avoid lumps. Cover and cook 4–5 min on low.",
        "Boil 2 eggs 10 min separately.",
      ],
      note: "Always roast rava first — raw rava is heavy and acidic on the stomach.",
    },
    lunch: {
      name: "Jeera Rice + Toor Dal + Steamed Vegetables + Grilled Chicken",
      portions: "200g jeera rice · 100g toor dal · 1 cup steamed veg · 120g chicken",
      macros: { protein: 56, carbs: 78, fat: 11, fiber: 9, kcal: 640 },
      protein: "120g Grilled Chicken Breast (37g protein)",
      prep: [
        "Jeera Rice: Cook 80g rice. Heat ½ tsp ghee, add 1 tsp cumin seeds. Toss cooked rice 2 min with salt.",
        "Toor Dal: Pressure cook 50g toor dal 3 whistles. No tomato. Temper with ½ tsp ghee + cumin + pinch hing.",
        "Steamed Veg: Steam 1 cup broccoli + carrot + zucchini 8 min. Season with salt + ghee.",
        "Chicken: Marinate 120g with ginger+salt+turmeric 30 min. Grill on tawa 5–6 min per side. Rest 5 min before eating.",
      ],
      note: "Sunday's biggest meal — enjoy it! Portion control matters more than restriction.",
    },
    snack: {
      name: "Banana + Homemade Oat Biscuits + Warm Milk",
      portions: "1 banana · 2 oat biscuits (homemade) · 150ml warm milk",
      macros: { protein: 10, carbs: 42, fat: 8, fiber: 4, kcal: 270 },
      protein: "150ml Warm Milk (5g protein)",
      prep: [
        "Oat Biscuits: Mix 60g oats + 1 tsp honey + 1 tsp ghee + pinch cinnamon + 2 tbsp milk into stiff dough. Shape into flat rounds. Bake at 170°C for 15–18 min until golden.",
        "Warm milk: Heat 150ml low-fat milk, add tiny pinch of turmeric.",
        "Eat banana → biscuits → sip warm milk slowly.",
      ],
      note: "Bake oat biscuits in batches on Sunday — store in airtight box for the week.",
    },
    dinner: {
      name: "Multigrain Roti + Pumpkin Sabzi + Masoor Dal + Curd",
      portions: "2 rotis (60g flour) · 200g pumpkin · ½ cup masoor dal · 100g curd",
      macros: { protein: 20, carbs: 50, fat: 9, fiber: 8, kcal: 360 },
      protein: "Masoor Dal + Curd (11g protein)",
      prep: [
        "Roti: 60g multigrain atta, standard prep.",
        "Pumpkin Sabzi: Peel and cube 200g yellow pumpkin. Heat ½ tsp ghee, add cumin + ginger. Add pumpkin + salt + ¼ tsp turmeric. Cover and cook 15 min until soft.",
        "Masoor Dal: Wash 50g masoor dal, pressure cook 2 whistles. Temper with ½ tsp ghee + cumin. No tomato.",
        "Curd at room temperature as a side.",
      ],
      note: "End your week with a light dinner. Pumpkin is deeply alkaline and anti-inflammatory.",
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
    { icon: "🧀", item: "Paneer — high saturated fat, slow to digest, worsens acid secretion" },
    { icon: "🫘", item: "Tofu — processed soy, phytic acid irritates gastritis sufferers" },
    { icon: "🫘", item: "Rajma (Kidney Beans) — causes gas, bloating, worsens gastritis" },
    { icon: "🥘", item: "Dal Makhani — cream, butter, overnight beans = too heavy & fatty" },
    { icon: "🌶️", item: "Green chillies, red chilli powder, hot sauces, excess pepper" },
    { icon: "🍋", item: "Citrus fruits — lemon, orange, pineapple, grapes" },
    { icon: "☕", item: "Coffee, strong black tea — especially on empty stomach" },
    { icon: "🥤", item: "Carbonated drinks, colas, energy drinks" },
    { icon: "🍟", item: "Deep-fried foods — samosa, pakoda, puri, chips" },
    { icon: "🍅", item: "Tomatoes, tamarind, raw onion in excess — highly acidic" },
    { icon: "🍫", item: "Chocolate, mint — relax the lower esophageal sphincter" },
    { icon: "🍷", item: "Alcohol — severely irritates the stomach lining" },
  ],
};

const timingTips = [
  {
    icon: "⏰", title: "Pre-Workout — 60–90 Min Before",
    color: "#e8f5e9", border: "#43a047",
    tips: [
      "Have a small, easily digestible meal: 1 banana + 2 boiled eggs OR oats porridge (50g).",
      "Avoid high-fat or high-fibre meal right before treadmill — delays digestion and causes bloating mid-run.",
      "Drink 250ml warm water 20 min before eating. Sip 200ml water between meal and workout.",
    ],
  },
  {
    icon: "🏃", title: "During Workout — Treadmill + Resistance",
    color: "#e3f2fd", border: "#1e88e5",
    tips: [
      "Small sips of plain water every 15–20 min. Carry 500ml bottle and finish during the session.",
      "Never eat anything mid-workout — even a banana mid-run triggers reflux while body is in motion.",
      "On the treadmill, maintain upright posture. Hunching compresses the stomach and worsens acid splash.",
    ],
  },
  {
    icon: "🍽️", title: "Post-Workout Window — Within 30–45 Min",
    color: "#fff3e0", border: "#fb8c00",
    tips: [
      "THIS is your most important meal. Eat within 45 min: grilled chicken (120g) + rice (1 cup) + dal is ideal.",
      "Muscles are insulin-sensitive post-workout — protein absorption is 30–40% higher. Don't skip this.",
      "Sit upright for at least 1 hour after eating. Do not lie down directly after the post-workout meal.",
    ],
  },
  {
    icon: "🌙", title: "Dinner — Critical Rule for Gastritis",
    color: "#f3e5f5", border: "#8e24aa",
    tips: [
      "Target dinner time: 7:00–7:30 PM. Absolute latest: 8:00 PM. Sleep at 10:00–10:30 PM.",
      "Keep dinner under 400 kcal — 2 rotis + sabzi + dal soup + curd. No heavy proteins at night.",
      "Elevate head slightly while sleeping (extra pillow) — physically prevents acid reflux at night.",
    ],
  },
];

const proteinOptions = {
  veg: [
    { name: "Moong Dal (cooked)", amount: "1 cup = 14g", tip: "Easiest lentil on stomach. Best for dinner dal." },
    { name: "Toor Dal (cooked)", amount: "1 cup = 11g", tip: "Use for lunch dal. No tomato tempering." },
    { name: "Masoor Dal (cooked)", amount: "1 cup = 13g", tip: "Fastest cooking. Great for quick dinner dal." },
    { name: "Chana Dal (cooked)", amount: "1 cup = 13g", tip: "Soak 2–3 hours first. Rich, fills you up." },
    { name: "Chickpea Hummus (homemade)", amount: "3 tbsp = 6g", tip: "Homemade only. Spread on roti or dip cucumber." },
    { name: "Low-fat Curd", amount: "200g = 8g", tip: "Room temp. Probiotic. Best after meals." },
    { name: "Warm Low-fat Milk", amount: "300ml = 10g", tip: "Warm only. Add turmeric. Never cold milk." },
    { name: "Soaked Almonds", amount: "10 almonds = 3g", tip: "Peel skin after soaking. Alkaline + gut-safe." },
    { name: "Roasted Peanuts", amount: "20g = 5g", tip: "Dry roast — no oil, no salt. Good snack protein." },
    { name: "Cashews (raw)", amount: "10 pieces = 3g", tip: "Lower acid than other nuts. Max 10–12/day." },
  ],
  nonVeg: [
    { name: "Chicken Breast (grilled)", amount: "120g = 37g", tip: "Highest protein. Always grill — never fry." },
    { name: "Chicken Soup (bone broth)", amount: "1 bowl = 15g", tip: "Collagen heals stomach lining. Best dinner protein." },
    { name: "Whole Egg (boiled)", amount: "1 egg = 6g", tip: "10 min boil. Safest cooking method for gastritis." },
    { name: "Egg White (3 whites)", amount: "3 whites = 11g", tip: "Zero fat. Great for breakfast scramble." },
    { name: "Egg Bhurji (1 egg)", amount: "1 egg = 6g", tip: "Non-stick pan, ¼ tsp oil, no chilli." },
    { name: "Rohu Fish (steamed)", amount: "150g = 25g", tip: "Steam or grill only. Light omega-3 fish." },
    { name: "Pomfret (grilled)", amount: "150g = 28g", tip: "Grill on medium flame with ginger+turmeric." },
    { name: "Surmai / King Fish", amount: "130g = 28g", tip: "Rich omega-3. Grill with ginger paste. No charring." },
  ],
};

// ─── AI CHATBOT ───────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are NutriBot, a specialized AI assistant for a personalized gastritis-safe, fat-loss diet plan. 

The user is: Male, 100kg, 180cm, walks 5km/day on treadmill + resistance training. Has gastritis. Eats non-veg Monday–Friday and Sunday. Saturday is strictly vegetarian.

The diet plan: ~1800–1900 kcal/day, 120–140g protein target, gastritis-safe foods only.

EXCLUDED FOODS (user cannot eat): Paneer, Tofu, Rajma, Dal Makhani, citrus fruits, coffee, carbonated drinks, deep-fried foods, tomatoes in excess, tamarind, alcohol, maida/refined flour, pickles, chillies.

SAFE FOODS: Oats, daliya, poha, idli, banana, papaya, watermelon, pear, apple, lauki, turai, ash gourd, pumpkin, tinda, broccoli, eggs (boiled/scrambled), steamed/grilled fish, grilled chicken breast, moong dal, toor dal, masoor dal, chana dal, rice, multigrain roti, low-fat curd, buttermilk, warm milk, coconut milk, ghee (max 2 tsp/day), ginger, cumin, turmeric.

You can help with: meal swaps, cooking questions, gastritis flare-up advice, protein tracking, workout nutrition, grocery lists, and food alternatives.

Be warm, practical, and concise. Keep answers focused and actionable. If asked about excluded foods, explain why and suggest safe alternatives. Always remember the gastritis condition when giving advice.`;

// ─── MACRO BAR ────────────────────────────────────────────────────────────────

function MacroBar({ label, value, max, color, unit = "g" }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "#555", fontWeight: 600 }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{value}{unit}</span>
      </div>
      <div style={{ height: 8, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

// ─── MACRO RING ───────────────────────────────────────────────────────────────

function MacroRing({ protein, carbs, fat, kcal }) {
  const total = protein * 4 + carbs * 4 + fat * 9;
  const pPct = Math.round((protein * 4 / total) * 100);
  const cPct = Math.round((carbs * 4 / total) * 100);
  const fPct = Math.round((fat * 9 / total) * 100);
  const r = 54, cx = 64, cy = 64;
  const circ = 2 * Math.PI * r;
  
  const segments = [
    { pct: pPct, color: "#40916c", label: "Protein" },
    { pct: cPct, color: "#f9a825", label: "Carbs" },
    { pct: fPct, color: "#e57373", label: "Fat" },
  ];
  
  let offset = 0;
  const arcs = segments.map(s => {
    const dash = (s.pct / 100) * circ;
    const gap = circ - dash;
    const startOffset = circ - offset * circ / 100;
    offset += s.pct;
    return { ...s, dash, gap, startOffset };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <svg width={128} height={128} viewBox="0 0 128 128">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f0f0" strokeWidth={14} />
        {arcs.map((arc, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={arc.color} strokeWidth={14}
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={arc.startOffset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={16} fontWeight={700} fill="#1b4332" fontFamily="sans-serif">{kcal}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={10} fill="#888" fontFamily="sans-serif">kcal</text>
      </svg>
      <div>
        {segments.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: s.color }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#444" }}>{s.label} <strong>{s.pct}%</strong></span>
          </div>
        ))}
        <div style={{ marginTop: 4, fontFamily: "sans-serif", fontSize: 11, color: "#888" }}>
          P:{protein}g · C:{carbs}g · F:{fat}g
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function DietPlan() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hi! I'm NutriBot, your personal gastritis-safe diet assistant. Ask me anything about your meal plan, food swaps, or nutrition tips!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(3);
  const [waterCount, setWaterCount] = useState(4);
  const [checkedMeals, setCheckedMeals] = useState({});
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const current = mealPlan[activeDay];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [
            ...messages.filter(m => m.role !== "assistant" || messages.indexOf(m) > 0).map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please check your internet and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const mealSections = [
    { key: "breakfast", label: "🌅 Breakfast", bg: "#fffde7", accent: "#f9a825" },
    { key: "lunch", label: "☀️ Lunch", bg: "#e8f5e9", accent: "#2d6a4f" },
    { key: "snack", label: "🍎 Evening Snack", bg: "#fff3e0", accent: "#fb8c00" },
    { key: "dinner", label: "🌙 Dinner", bg: "#ede7f6", accent: "#7e57c2" },
  ];

  const tabs = [
    { id: "plan", label: "📅 Plan" },
    { id: "tracker", label: "📊 Tracker" },
    { id: "foods", label: "🥗 Foods" },
    { id: "timing", label: "⏰ Timing" },
    { id: "protein", label: "💪 Protein" },
  ];

  const toggleMealCheck = (key) => {
    const dayKey = `${activeDay}-${key}`;
    setCheckedMeals(prev => ({ ...prev, [dayKey]: !prev[dayKey] }));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f0f7ee 0%, #fdf6ec 60%, #eef2f7 100%)",
      fontFamily: "'Georgia', serif",
      paddingBottom: 80,
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 60%, #40916c 100%)",
        color: "white", padding: "28px 20px 22px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 50%, rgba(255,255,255,0.06) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.07) 0%, transparent 50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "4px", color: "#95d5b2", textTransform: "uppercase", marginBottom: 6, fontFamily: "sans-serif" }}>Personalized · Gastritis-Safe · Fat Loss</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: "normal" }}>Gut-Friendly Diet Plan</h1>
          <p style={{ margin: "6px 0 0", fontSize: 12, color: "#b7e4c7", fontStyle: "italic", fontFamily: "sans-serif" }}>Exact portions & macros · ~1,800–1,900 kcal/day</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 12 }}>
            {[["🏋️","100 kg"],["📏","180 cm"],["🚶","5km/day"],["🫁","Gastritis-safe"],["🥩","Mon–Fri+Sun Non-Veg"],["🌿","Sat: Veg Only"]].map(([ic,lb]) => (
              <span key={lb} style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontFamily: "sans-serif", color: "#d8f3dc" }}>{ic} {lb}</span>
            ))}
          </div>
          {/* Quick Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
            {[
              { label: "🔥 Streak", value: `${streak} days`, action: () => setStreak(s => s + 1) },
              { label: "💧 Water", value: `${waterCount}/8 glasses` },
              { label: "🎯 Protein", value: "~130g/day" },
            ].map(({ label, value, action }) => (
              <div key={label} onClick={action} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "6px 12px", cursor: action ? "pointer" : "default", textAlign: "center" }}>
                <div style={{ fontFamily: "sans-serif", fontSize: 10, color: "#95d5b2" }}>{label}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "white" }}>{value}</div>
              </div>
            ))}
          </div>
          {/* Water tracker */}
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 10 }}>
            {Array.from({length: 8}, (_, i) => (
              <div key={i} onClick={() => setWaterCount(i + 1)}
                style={{ width: 18, height: 18, borderRadius: 3, background: i < waterCount ? "#74c69d" : "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i < waterCount ? "💧" : "·"}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#1b4332", position: "sticky", top: 0, zIndex: 10, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, minWidth: 70, padding: "12px 6px", border: "none",
            background: activeTab === t.id ? "#40916c" : "transparent",
            color: activeTab === t.id ? "white" : "#95d5b2",
            fontFamily: "sans-serif", fontSize: 11, fontWeight: activeTab === t.id ? "700" : "400",
            cursor: "pointer", borderBottom: activeTab === t.id ? "3px solid #74c69d" : "3px solid transparent",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "16px 12px" }}>

        {/* ── 7-DAY PLAN ── */}
        {activeTab === "plan" && (
          <div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
              {mealPlan.map((d, i) => {
                const dayChecks = mealSections.filter(m => checkedMeals[`${i}-${m.key}`]).length;
                return (
                  <button key={i} onClick={() => { setActiveDay(i); setExpandedMeal(null); }} style={{
                    width: 52, height: 52, borderRadius: "50%",
                    border: activeDay === i ? "2.5px solid #40916c" : "2px solid #ccc",
                    background: activeDay === i ? "#1b4332" : d.isVeg ? "#f1f8e9" : "white",
                    color: activeDay === i ? "white" : "#333",
                    fontFamily: "sans-serif", fontSize: 11, fontWeight: "700",
                    cursor: "pointer", boxShadow: activeDay === i ? "0 4px 14px rgba(27,67,50,0.35)" : "none",
                    transition: "all 0.2s", position: "relative",
                  }}>
                    {days[i]}
                    {dayChecks > 0 && (
                      <span style={{ position: "absolute", bottom: -2, right: -2, fontSize: 9, background: "#40916c", color: "white", borderRadius: "50%", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                        {dayChecks}
                      </span>
                    )}
                    {d.isVeg && <span style={{ position: "absolute", top: -3, right: -3, fontSize: 9 }}>🌿</span>}
                  </button>
                );
              })}
            </div>

            {/* Day header with macros */}
            <div style={{ background: "linear-gradient(135deg, #1b4332, #40916c)", borderRadius: "14px 14px 0 0", padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ color: "white", fontSize: 20, fontWeight: "normal" }}>{current.day}</div>
                  <div style={{ color: "#95d5b2", fontSize: 11, fontFamily: "sans-serif", marginTop: 2 }}>
                    {current.isVeg ? "🌿 Fully Vegetarian Day" : "🥩 Non-Veg Included"}
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 12, padding: "10px 14px" }}>
                  <MacroRing {...current.macros} kcal={current.kcal} />
                </div>
              </div>
              {/* Daily macro bars */}
              <div style={{ marginTop: 14, background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "12px 14px" }}>
                <MacroBar label="🥩 Protein" value={current.macros.protein} max={145} color="#74c69d" />
                <MacroBar label="🌾 Carbs" value={current.macros.carbs} max={220} color="#f9a825" />
                <MacroBar label="🫒 Fat" value={current.macros.fat} max={55} color="#e57373" />
                <MacroBar label="🥦 Fiber" value={current.macros.fiber} max={30} color="#81c784" />
              </div>
            </div>

            {/* Meals */}
            {mealSections.map(({ key, label, bg, accent }) => {
              const meal = current[key];
              const isOpen = expandedMeal === key;
              const isChecked = checkedMeals[`${activeDay}-${key}`];
              return (
                <div key={key} style={{ background: "white", borderBottom: "1px solid #eee" }}>
                  <div style={{ padding: "16px 18px", background: bg + "66", borderLeft: `4px solid ${accent}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ fontFamily: "sans-serif", fontSize: 10, fontWeight: "800", color: accent, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                      <div onClick={() => toggleMealCheck(key)} style={{
                        width: 24, height: 24, borderRadius: "50%", border: `2px solid ${isChecked ? accent : "#ccc"}`,
                        background: isChecked ? accent : "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0
                      }}>{isChecked ? "✓" : ""}</div>
                    </div>
                    <div style={{ fontSize: 14, color: "#1a1a1a", marginBottom: 6, lineHeight: 1.4 }}><strong>{meal.name}</strong></div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#666", marginBottom: 8 }}>
                      <span style={{ fontWeight: "700", color: "#333" }}>📊 Portions: </span>{meal.portions}
                    </div>
                    {/* Meal macros pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                      {[
                        { label: `🔥 ${meal.macros.kcal} kcal`, bg: "#fff3e0", color: "#e65100" },
                        { label: `🥩 ${meal.macros.protein}g protein`, bg: "#e8f5e9", color: "#2d6a4f" },
                        { label: `🌾 ${meal.macros.carbs}g carbs`, bg: "#fffde7", color: "#f57f17" },
                        { label: `🫒 ${meal.macros.fat}g fat`, bg: "#fce4ec", color: "#c62828" },
                        { label: `🥦 ${meal.macros.fiber}g fiber`, bg: "#e8f5e9", color: "#388e3c" },
                      ].map(pill => (
                        <span key={pill.label} style={{ background: pill.bg, color: pill.color, borderRadius: 20, padding: "3px 9px", fontFamily: "sans-serif", fontSize: 11, fontWeight: 600 }}>
                          {pill.label}
                        </span>
                      ))}
                    </div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#2d6a4f", fontWeight: "700", marginBottom: 10 }}>
                      💪 Protein: {meal.protein}
                    </div>
                    <button onClick={() => setExpandedMeal(isOpen ? null : key)} style={{
                      background: isOpen ? accent : "white", color: isOpen ? "white" : accent,
                      border: `1.5px solid ${accent}`, borderRadius: 20, padding: "5px 14px",
                      fontFamily: "sans-serif", fontSize: 11, fontWeight: "600", cursor: "pointer", transition: "all 0.2s",
                    }}>
                      {isOpen ? "▲ Hide Prep" : "▼ View Step-by-Step"}
                    </button>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "16px 18px", background: "#fafafa", borderLeft: `4px solid ${accent}` }}>
                      <div style={{ fontFamily: "sans-serif", fontSize: 11, fontWeight: "800", color: "#333", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>🍳 Preparation Steps</div>
                      {meal.prep.map((step, si) => (
                        <div key={si} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                          <div style={{ width: 22, height: 22, borderRadius: "50%", background: accent, color: "white", fontFamily: "sans-serif", fontSize: 11, fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{si + 1}</div>
                          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#444", lineHeight: 1.6 }}>{step}</div>
                        </div>
                      ))}
                      <div style={{ marginTop: 10, padding: "8px 12px", background: accent + "15", borderRadius: 8, borderLeft: `3px solid ${accent}`, fontFamily: "sans-serif", fontSize: 12, color: "#555", fontStyle: "italic" }}>
                        💡 {meal.note}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ borderRadius: "0 0 14px 14px", background: "#f0fdf4", padding: "12px 18px", borderTop: "2px dashed #b7e4c7" }}>
              <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#2d6a4f", fontWeight: "600" }}>
                ✅ Tap the circle on any meal to mark it done · Click "View Step-by-Step" for full cooking guide
              </div>
            </div>
          </div>
        )}

        {/* ── MACRO TRACKER ── */}
        {activeTab === "tracker" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: "normal", color: "#1b4332", margin: "0 0 4px" }}>Weekly Nutrition Overview</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", margin: 0 }}>Daily macro breakdown across all 7 days</p>
            </div>

            {/* Weekly summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 18 }}>
              {[
                { label: "Avg Daily Calories", value: Math.round(mealPlan.reduce((s, d) => s + d.kcal, 0) / 7) + " kcal", icon: "🔥", color: "#e65100", bg: "#fff3e0" },
                { label: "Avg Daily Protein", value: Math.round(mealPlan.reduce((s, d) => s + d.macros.protein, 0) / 7) + "g", icon: "🥩", color: "#2d6a4f", bg: "#e8f5e9" },
                { label: "Avg Daily Carbs", value: Math.round(mealPlan.reduce((s, d) => s + d.macros.carbs, 0) / 7) + "g", icon: "🌾", color: "#f57f17", bg: "#fffde7" },
                { label: "Avg Daily Fiber", value: Math.round(mealPlan.reduce((s, d) => s + d.macros.fiber, 0) / 7) + "g", icon: "🥦", color: "#388e3c", bg: "#f1f8e9" },
              ].map(card => (
                <div key={card.label} style={{ background: card.bg, borderRadius: 12, padding: "14px 16px", border: `1px solid ${card.color}22` }}>
                  <div style={{ fontSize: 22 }}>{card.icon}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, color: card.color, marginTop: 4 }}>{card.value}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#777", marginTop: 2 }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* Per-day breakdown table */}
            <div style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 14px rgba(0,0,0,0.08)", marginBottom: 18 }}>
              <div style={{ background: "#1b4332", padding: "12px 18px" }}>
                <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "white" }}>📅 Daily Macro Breakdown</div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "sans-serif", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#f5f5f5" }}>
                      {["Day", "kcal", "Protein", "Carbs", "Fat", "Fiber"].map(h => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: h === "Day" ? "left" : "center", color: "#555", fontWeight: 700, borderBottom: "2px solid #e0e0e0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mealPlan.map((d, i) => (
                      <tr key={i} onClick={() => { setActiveDay(i); setActiveTab("plan"); }}
                        style={{ background: i % 2 === 0 ? "white" : "#fafafa", cursor: "pointer", transition: "background 0.15s" }}>
                        <td style={{ padding: "10px 12px", fontWeight: 700, color: "#1b4332" }}>
                          {d.day.slice(0, 3)} {d.isVeg ? "🌿" : ""}
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: "#e65100", fontWeight: 600 }}>{d.kcal}</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: "#2d6a4f", fontWeight: 600 }}>{d.macros.protein}g</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: "#f57f17", fontWeight: 600 }}>{d.macros.carbs}g</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: "#c62828", fontWeight: 600 }}>{d.macros.fat}g</td>
                        <td style={{ padding: "10px 12px", textAlign: "center", color: "#388e3c", fontWeight: 600 }}>{d.macros.fiber}g</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: "#1b4332" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 700, color: "#74c69d", fontFamily: "sans-serif", fontSize: 12 }}>Weekly Avg</td>
                      {["kcal", "protein", "carbs", "fat", "fiber"].map(key => (
                        <td key={key} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, color: "#74c69d" }}>
                          {Math.round(mealPlan.reduce((s, d) => s + (key === "kcal" ? d.kcal : d.macros[key]), 0) / 7)}{key !== "kcal" ? "g" : ""}
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Protein target card */}
            <div style={{ background: "white", borderRadius: 14, padding: "18px 20px", boxShadow: "0 3px 14px rgba(0,0,0,0.07)", borderLeft: "4px solid #40916c" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: 13, color: "#1b4332", marginBottom: 12 }}>🎯 Protein Target Analysis</div>
              <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#555", lineHeight: 1.8 }}>
                <div>Target range: <strong style={{ color: "#2d6a4f" }}>120–140g/day</strong> (1.2–1.4g per kg bodyweight for fat loss with muscle retention)</div>
                <div>Your average: <strong style={{ color: "#40916c" }}>{Math.round(mealPlan.reduce((s, d) => s + d.macros.protein, 0) / 7)}g/day</strong> ✅</div>
                <div>Saturday (veg-only): <strong style={{ color: "#f57f17" }}>{mealPlan[5].macros.protein}g</strong> — lowest day, compensate with extra dal + curd</div>
                <div style={{ marginTop: 8, padding: "8px 12px", background: "#e8f5e9", borderRadius: 8, color: "#2d6a4f" }}>
                  💡 Tip: On workout days (Mon–Fri), aim for 135–140g. On rest days (Sat–Sun), 110–120g is sufficient.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SAFE VS AVOID ── */}
        {activeTab === "foods" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: "normal", color: "#1b4332", margin: "0 0 4px" }}>Foods Guide</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", margin: 0 }}>Curated for gastritis + fat loss · Paneer/Tofu/Rajma/Dal Makhani excluded</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { title: "✅ Safe Foods", sub: "Gut-friendly & fat-loss approved", items: safeVsAvoid.safe, headerBg: "#1b4332", rowBg: "#f0fdf4" },
                { title: "❌ Avoid Foods", sub: "Trigger gastritis flare-ups", items: safeVsAvoid.avoid, headerBg: "#b71c1c", rowBg: "#fff5f5" },
              ].map(({ title, sub, items, headerBg, rowBg }) => (
                <div key={title} style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.09)" }}>
                  <div style={{ background: headerBg, padding: "12px 16px" }}>
                    <div style={{ color: "white", fontSize: 13, fontWeight: "700", fontFamily: "sans-serif" }}>{title}</div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, fontFamily: "sans-serif", marginTop: 2 }}>{sub}</div>
                  </div>
                  {items.map((item, i) => (
                    <div key={i} style={{ padding: "10px 14px", borderBottom: "1px solid #f0f0f0", display: "flex", gap: 8, background: i % 2 === 0 ? "white" : rowBg, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontFamily: "sans-serif", fontSize: 11, color: "#333", lineHeight: 1.5 }}>{item.item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: "white", borderRadius: 14, padding: "16px 18px", boxShadow: "0 3px 14px rgba(0,0,0,0.07)", borderLeft: "4px solid #fb8c00" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "700", color: "#e65100", marginBottom: 10, fontSize: 13 }}>⚠️ Why these 4 foods are excluded for you</div>
              {[
                ["Paneer", "High in saturated fat — slow to digest, worsens acid secretion. Alternative: Low-fat curd or warm milk for calcium."],
                ["Tofu", "Processed soy — phytic acid irritates gastritis sufferers. Alternative: Moong dal or masoor dal for plant protein."],
                ["Rajma", "Even well-cooked kidney beans cause gas and bloating. Alternative: Chana dal (soaked 2–3 hrs) or moong dal."],
                ["Dal Makhani", "Cream + butter + overnight beans = too heavy and fatty. Alternative: Plain toor dal with minimal ghee tempering."],
              ].map(([name, reason]) => (
                <div key={name} style={{ display: "flex", gap: 8, marginBottom: 8, fontFamily: "sans-serif", fontSize: 12, color: "#444" }}>
                  <span style={{ color: "#fb8c00", fontWeight: "700", flexShrink: 0 }}>→</span>
                  <span><strong>{name}:</strong> {reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TIMING ── */}
        {activeTab === "timing" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: "normal", color: "#1b4332", margin: "0 0 4px" }}>Workout Meal Timing</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", margin: 0 }}>Prevent acid reflux during treadmill + resistance session</p>
            </div>
            <div style={{ background: "white", borderRadius: 14, padding: "16px 18px", boxShadow: "0 3px 14px rgba(0,0,0,0.08)", marginBottom: 14, borderLeft: "4px solid #40916c" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "700", fontSize: 12, color: "#1b4332", marginBottom: 10 }}>📅 Ideal Daily Schedule</div>
              {[
                ["7:00 AM", "🌅", "Light breakfast — oats or banana + eggs"],
                ["8:30 AM", "🏃", "Start treadmill (5km) + resistance workout"],
                ["9:30 AM", "🍳", "Post-workout protein meal — most important meal"],
                ["1:00 PM", "☀️", "Lunch — largest meal of the day"],
                ["4:30 PM", "🍎", "Evening snack — fruit + nuts or curd"],
                ["7:30 PM", "🌙", "Dinner — light, before 8:00 PM latest"],
                ["10:00 PM", "😴", "Sleep — head slightly elevated"],
              ].map(([time, icon, label]) => (
                <div key={time} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, fontFamily: "sans-serif" }}>
                  <div style={{ minWidth: 56, fontSize: 11, color: "#888", fontWeight: "600" }}>{time}</div>
                  <div style={{ fontSize: 16 }}>{icon}</div>
                  <div style={{ fontSize: 12, color: "#333" }}>{label}</div>
                </div>
              ))}
            </div>
            {timingTips.map((tip, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 14px rgba(0,0,0,0.07)", marginBottom: 12 }}>
                <div style={{ background: tip.color, borderLeft: `5px solid ${tip.border}`, padding: "12px 16px" }}>
                  <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: "700", color: "#1a1a1a" }}>{tip.icon} {tip.title}</div>
                </div>
                <div style={{ padding: "12px 16px" }}>
                  {tip.tips.map((t, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, marginBottom: j < tip.tips.length - 1 ? 8 : 0, fontFamily: "sans-serif", fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                      <span style={{ color: tip.border, fontWeight: "700", flexShrink: 0 }}>→</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROTEIN ── */}
        {activeTab === "protein" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: "normal", color: "#1b4332", margin: "0 0 4px" }}>Protein Guide</h2>
              <p style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", margin: 0 }}>Stomach-gentle sources · Target: 120–140g protein/day</p>
            </div>
            {[
              { title: "🌿 Vegetarian Protein Sources", sub: "Use daily — especially on Saturday", data: proteinOptions.veg, accent: "#2d6a4f", bg: "#e8f5e9" },
              { title: "🍗 Non-Vegetarian Sources", sub: "Mon–Fri and Sunday only (skip Saturday)", data: proteinOptions.nonVeg, accent: "#4527a0", bg: "#ede7f6" },
            ].map(({ title, sub, data, accent, bg }) => (
              <div key={title} style={{ marginBottom: 18 }}>
                <div style={{ background: accent, color: "white", padding: "12px 18px", borderRadius: "14px 14px 0 0" }}>
                  <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: "700" }}>{title}</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: 10, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{sub}</div>
                </div>
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,0.08)" }}>
                  {data.map((item, i) => (
                    <div key={i} style={{ padding: "12px 16px", borderBottom: i < data.length - 1 ? "1px solid #f2f2f2" : "none", background: i % 2 === 0 ? "white" : bg + "55" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                        <div>
                          <div style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: "700", color: "#1a1a1a", marginBottom: 3 }}>{item.name}</div>
                          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#777", fontStyle: "italic" }}>💡 {item.tip}</div>
                        </div>
                        <div style={{ background: accent + "18", color: accent, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontSize: 11, fontWeight: "700", whiteSpace: "nowrap", border: `1px solid ${accent}30`, flexShrink: 0 }}>
                          {item.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ background: "#fff8e1", borderRadius: 14, padding: "16px 18px", border: "1px solid #ffe082" }}>
              <div style={{ fontFamily: "sans-serif", fontWeight: "700", color: "#e65100", marginBottom: 10, fontSize: 13 }}>⚠️ Protein Rules for Gastritis</div>
              {[
                "Never eat protein on a completely empty stomach. Have banana or oats first, then protein.",
                "Avoid commercial whey/protein shakes — artificial sweeteners and additives trigger gastritis.",
                "Cook all non-veg on medium-low flame. High-heat charring increases acidity in food.",
                "Space protein meals 3–4 hours apart for optimal absorption and comfortable digestion.",
                "Always pair protein with an alkaline food: curd, banana, cucumber, warm milk.",
                "On Saturday (veg-only day), meet protein target through dal + curd + milk + nuts combination.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < 5 ? 7 : 0, fontFamily: "sans-serif", fontSize: 12, color: "#555", lineHeight: 1.5 }}>
                  <span style={{ color: "#e65100", flexShrink: 0 }}>•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── AI CHAT BUTTON ── */}
      <button
        onClick={() => setChatOpen(o => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #1b4332, #40916c)",
          color: "white", border: "none", fontSize: 22, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(27,67,50,0.5)", zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
        }}
        title="Chat with NutriBot"
      >
        {chatOpen ? "✕" : "🤖"}
      </button>

      {/* ── AI CHAT PANEL ── */}
      {chatOpen && (
        <div style={{
          position: "fixed", bottom: 90, right: 16, width: 340, maxWidth: "calc(100vw - 32px)",
          height: 480, background: "white", borderRadius: 18,
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)", zIndex: 99,
          display: "flex", flexDirection: "column", overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}>
          {/* Chat header */}
          <div style={{ background: "linear-gradient(135deg, #1b4332, #40916c)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
            <div>
              <div style={{ fontFamily: "sans-serif", fontSize: 14, fontWeight: 700, color: "white" }}>NutriBot</div>
              <div style={{ fontFamily: "sans-serif", fontSize: 10, color: "#95d5b2" }}>Your gastritis-safe diet assistant</div>
            </div>
            <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#74c69d" }} />
          </div>

          {/* Quick prompts */}
          <div style={{ padding: "10px 12px", borderBottom: "1px solid #f0f0f0", display: "flex", gap: 6, overflowX: "auto" }}>
            {["Protein on Saturday?", "What to eat pre-workout?", "Swap for chicken?", "Best foods for gastritis"].map(q => (
              <button key={q} onClick={() => { setInput(q); inputRef.current?.focus(); }}
                style={{ background: "#e8f5e9", color: "#1b4332", border: "none", borderRadius: 20, padding: "4px 10px", fontFamily: "sans-serif", fontSize: 10, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                <div style={{
                  maxWidth: "82%", padding: "9px 12px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #1b4332, #40916c)" : "#f5f5f5",
                  color: msg.role === "user" ? "white" : "#333",
                  fontFamily: "sans-serif", fontSize: 12, lineHeight: 1.6,
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                <div style={{ background: "#f5f5f5", borderRadius: "14px 14px 14px 4px", padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(j => (
                      <div key={j} style={{
                        width: 6, height: 6, borderRadius: "50%", background: "#40916c",
                        animation: "bounce 1.2s ease-in-out infinite",
                        animationDelay: `${j * 0.2}s`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid #f0f0f0", display: "flex", gap: 8 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your diet plan..."
              style={{
                flex: 1, border: "1.5px solid #e0e0e0", borderRadius: 22, padding: "8px 14px",
                fontFamily: "sans-serif", fontSize: 12, outline: "none", color: "#333",
                background: "#fafafa",
              }}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{
              width: 36, height: 36, borderRadius: "50%",
              background: input.trim() && !loading ? "linear-gradient(135deg, #1b4332, #40916c)" : "#e0e0e0",
              color: "white", border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0,
            }}>
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>

      <div style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: 10, color: "#aaa", padding: "14px 20px" }}>
        This plan is for informational purposes only. Please consult a gastroenterologist and registered dietitian for personalised medical guidance.
      </div>
    </div>
  );
}
