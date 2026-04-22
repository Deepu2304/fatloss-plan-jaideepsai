import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mealPlan = [
  {
    day: "Monday",
    kcal: "~1860",
    meals: [
      {
        type: "breakfast", label: "🌅 Breakfast", time: "7:00 AM",
        bg: "#fffde7", accent: "#f9a825",
        items: [
          { name: "Oats Porridge", portion: "50g dry oats (½ cup)" },
          { name: "Banana", portion: "1 medium (120g)" },
          { name: "Honey", portion: "1 tsp (7g)" },
          { name: "Chia Seeds", portion: "1 tbsp (12g)" },
          { name: "Boiled Eggs", portion: "2 whole eggs" },
        ],
        protein: "~22g",
        prep: [
          "Boil 1.5 cups water in a saucepan on medium flame.",
          "Add 50g (½ cup) rolled oats. Stir continuously for 4–5 minutes until thick and creamy.",
          "Remove from heat. Add 1 tsp honey and stir well.",
          "Top with sliced banana (120g) and 1 tbsp chia seeds.",
          "Eggs: Place 2 eggs in cold water, bring to boil, simmer 10 min, peel and eat with a pinch of cumin powder.",
        ],
      },
      {
        type: "lunch", label: "☀️ Lunch", time: "1:00 PM",
        bg: "#e8f5e9", accent: "#43a047",
        items: [
          { name: "Cooked White Rice", portion: "150g cooked (¾ cup)" },
          { name: "Moong Dal (cooked)", portion: "1 cup cooked (180g)" },
          { name: "Carrot (steamed)", portion: "1 medium (80g)" },
          { name: "Beans (steamed)", portion: "50g" },
          { name: "Grilled Chicken Breast", portion: "100g raw (85g cooked)" },
          { name: "Ghee", portion: "½ tsp on rice" },
        ],
        protein: "~42g",
        prep: [
          "Rice: Wash ¾ cup raw white rice 2–3 times until water runs clear. Cook in 1.5 cups water on low flame, covered, for 15 min. Fluff with fork.",
          "Dal: Soak 50g moong dal 20 min. Pressure cook with 1.5 cups water + pinch turmeric + small ginger piece for 2 whistles. Simmer 5 min. Temper with ¼ tsp cumin seeds in ¼ tsp ghee.",
          "Veggies: Steam sliced carrot and beans in steamer or covered pot for 8–10 min until tender.",
          "Chicken: Marinate 100g breast in ¼ tsp turmeric + ¼ tsp cumin powder + ½ tsp ginger paste + ½ tsp oil for 15 min. Grill on non-stick pan 5–6 min each side on medium flame. Slice before serving.",
          "Drizzle ½ tsp ghee on rice. Serve all together.",
        ],
      },
      {
        type: "snack", label: "🍎 Evening Snack", time: "4:30 PM",
        bg: "#fff3e0", accent: "#fb8c00",
        items: [
          { name: "Banana", portion: "1 medium (120g)" },
          { name: "Soaked Almonds", portion: "10 almonds (12g)" },
          { name: "Low-fat Curd", portion: "100g (small bowl)" },
        ],
        protein: "~7g",
        prep: [
          "Soak 10 almonds in water the night before. Peel skin before eating — soaking reduces phytic acid, much easier on stomach.",
          "Serve curd at room temperature (not straight from fridge) — cold curd can trigger gas and bloating.",
          "Eat banana whole or sliced. This is a gut-soothing, high-potassium snack.",
        ],
      },
      {
        type: "dinner", label: "🌙 Dinner", time: "7:30 PM",
        bg: "#e8eaf6", accent: "#5c6bc0",
        items: [
          { name: "Wheat Roti", portion: "2 rotis (60g dough each = 120g total)" },
          { name: "Lauki (Bottle Gourd) Sabzi", portion: "200g bottle gourd (raw weight)" },
          { name: "Cucumber Raita", portion: "100g curd + 50g cucumber" },
          { name: "Low-fat Paneer", portion: "60g" },
        ],
        protein: "~24g",
        prep: [
          "Roti: Knead 120g whole wheat flour with water into soft dough. Rest 10 min. Roll thin (2–3mm). Cook on hot tawa 1.5 min each side on high flame. Apply ¼ tsp ghee.",
          "Lauki Sabzi: Peel and cube 200g bottle gourd. Heat ½ tsp oil in pan, add ¼ tsp cumin seeds. Add lauki + pinch turmeric + pinch coriander powder. Cover and cook on low flame 12–15 min until completely soft. No chilli.",
          "Raita: Grate 50g cucumber, squeeze lightly. Beat 100g curd smooth. Mix cucumber into curd. Add ¼ tsp roasted cumin powder + pinch salt.",
          "Paneer Bhurji: Crumble 60g low-fat paneer. Sauté in ¼ tsp oil with pinch turmeric + chopped coriander leaves for 3 min on low flame. No onion, no chilli.",
        ],
      },
    ],
  },
  {
    day: "Tuesday",
    kcal: "~1800",
    meals: [
      {
        type: "breakfast", label: "🌅 Breakfast", time: "7:00 AM",
        bg: "#fffde7", accent: "#f9a825",
        items: [
          { name: "Vegetable Daliya", portion: "60g broken wheat (dry)" },
          { name: "Mixed Vegetables", portion: "100g (carrot, peas, beans)" },
          { name: "Ghee", portion: "1 tsp (5g)" },
          { name: "Egg Whites (scrambled)", portion: "3 egg whites" },
        ],
        protein: "~18g",
        prep: [
          "Dry roast 60g broken wheat (daliya) in pan on medium flame for 3–4 min until golden and nutty-smelling. Set aside.",
          "Heat 1 tsp ghee. Add ¼ tsp cumin seeds. Add 100g diced vegetables (carrot, peas, beans). Sauté 2 min.",
          "Add roasted daliya + 1.5 cups water + pinch turmeric. Stir once. Cover, cook on low flame 12–15 min.",
          "Egg Whites: Separate whites from 3 eggs. Beat lightly. Heat ¼ tsp oil in non-stick pan. Pour whites + pinch turmeric. Scramble gently 3 min on low heat until set.",
        ],
      },
      {
        type: "lunch", label: "☀️ Lunch", time: "1:00 PM",
        bg: "#e8f5e9", accent: "#43a047",
        items: [
          { name: "Khichdi (Rice + Moong Dal)", portion: "¼ cup raw rice (45g) + ¼ cup moong dal (50g)" },
          { name: "Ghee", portion: "1 tsp on khichdi" },
          { name: "Steamed Fish (Rohu/Pomfret)", portion: "120g raw" },
        ],
        protein: "~38g",
        prep: [
          "Khichdi: Wash rice and moong dal together thoroughly. Add to pressure cooker with 2 cups water + pinch turmeric + ½ tsp cumin seeds + 1 small ginger piece.",
          "Pressure cook 3 whistles. Let steam release naturally (10 min). Open, mix well — it should be soft and porridge-like. Add 1 tsp ghee.",
          "Fish Steaming: Clean 120g rohu/pomfret. Apply ¼ tsp turmeric + ¼ tsp coriander powder + ½ tsp ginger paste + pinch salt.",
          "Place fish in steamer basket over boiling water. Cover and steam 12–15 min until flesh flakes easily when pressed. Do NOT fry — steaming is critical for gastritis.",
        ],
      },
      {
        type: "snack", label: "🍎 Evening Snack", time: "4:30 PM",
        bg: "#fff3e0", accent: "#fb8c00",
        items: [
          { name: "Watermelon", portion: "200g (roughly 2 medium slices)" },
          { name: "Walnuts", portion: "4 whole walnuts (14g)" },
        ],
        protein: "~4g",
        prep: [
          "Cut watermelon fresh. Eat at room temperature — cold fruit from fridge can shock the stomach lining and slow digestion.",
          "Eat 4 walnuts as-is. If you have an active gastritis flare-up today, swap walnuts for 10 soaked almonds instead — gentler option.",
        ],
      },
      {
        type: "dinner", label: "🌙 Dinner", time: "7:30 PM",
        bg: "#e8eaf6", accent: "#5c6bc0",
        items: [
          { name: "Wheat Roti", portion: "2 rotis (120g dough)" },
          { name: "Ridge Gourd (Turai) Sabzi", portion: "200g raw ridge gourd" },
          { name: "Moong Dal Soup", portion: "1 cup thin dal (180ml)" },
          { name: "Boiled Egg", portion: "1 whole egg" },
        ],
        protein: "~18g",
        prep: [
          "Ridge Gourd Sabzi: Peel and slice 200g turai (ridge gourd). Heat ½ tsp oil + ¼ tsp cumin seeds. Add turai + pinch turmeric + pinch coriander powder. Cover and cook 10 min on low — turai releases its own water, so no need to add water.",
          "Dal Soup: Boil 3 tbsp moong dal in 1.5 cups water with ginger and turmeric. Do not thicken — serve as thin, clear soup. Add a pinch of cumin powder.",
          "Roti: Same method as Monday — 2 thin wheat rotis.",
          "Boil 1 egg for 10 min. Peel, slice, sprinkle pinch of cumin powder.",
        ],
      },
    ],
  },
  {
    day: "Wednesday",
    kcal: "~1820",
    meals: [
      {
        type: "breakfast", label: "🌅 Breakfast", time: "7:00 AM",
        bg: "#fffde7", accent: "#f9a825",
        items: [
          { name: "Curd Rice", portion: "¾ cup cooked white rice (150g) + 100g curd" },
          { name: "Grated Carrot", portion: "50g" },
          { name: "Boiled Eggs", portion: "2 whole eggs" },
        ],
        protein: "~20g",
        prep: [
          "Cook white rice slightly softer than normal (extra ¼ cup water) — overcooked rice is much easier to digest.",
          "Let rice cool to room temperature (important — hot rice added to curd makes it sour quickly).",
          "Beat 100g fresh curd smooth. Mix into cooled rice. Consistency should be creamy, not watery.",
          "Top with 50g grated carrot. Season with ¼ tsp roasted cumin powder + pinch salt. Serve immediately.",
          "Boil 2 eggs (10 min). Peel and eat alongside curd rice.",
        ],
      },
      {
        type: "lunch", label: "☀️ Lunch", time: "1:00 PM",
        bg: "#e8f5e9", accent: "#43a047",
        items: [
          { name: "Cooked White Rice", portion: "150g cooked" },
          { name: "Toor Dal (cooked)", portion: "1 cup cooked (180g)" },
          { name: "Drumstick Sabzi", portion: "150g drumstick pieces" },
          { name: "Grilled Chicken Breast", portion: "100g" },
        ],
        protein: "~44g",
        prep: [
          "Toor Dal: Pressure cook 60g toor dal + 1.5 cups water + ¼ tsp turmeric + ½ tsp ginger (grated) for 3 whistles. Temper with ½ tsp ghee + cumin seeds. Simmer 5 min.",
          "Drumstick Sabzi: Boil 150g drumstick pieces in 1 cup water for 10 min until tender. Drain. Heat ½ tsp oil + ¼ tsp cumin seeds in pan. Add drumstick + pinch turmeric + ¼ tsp coriander powder. Stir-fry 5 min. No chilli.",
          "Chicken: Same as Monday — marinate 100g breast, grill 5–6 min each side on medium flame.",
          "Cook white rice normally (wash, 1:1.5 rice-to-water ratio, cook 15 min covered on low).",
        ],
      },
      {
        type: "snack", label: "🍎 Evening Snack", time: "4:30 PM",
        bg: "#fff3e0", accent: "#fb8c00",
        items: [
          { name: "Apple", portion: "1 medium (150g)" },
          { name: "Natural Peanut Butter", portion: "1 tbsp (16g)" },
          { name: "Warm Milk (low-fat)", portion: "150ml" },
        ],
        protein: "~9g",
        prep: [
          "Wash and slice apple into wedges. Do NOT peel — the skin contains pectin fibre that soothes the gut lining.",
          "Use natural peanut butter (ingredients should say only: peanuts + salt). Avoid brands with added sugar or palm oil.",
          "Warm milk to about 60°C (comfortably hot, not scalding). Drink slowly. Warm milk neutralises stomach acid effectively.",
        ],
      },
      {
        type: "dinner", label: "🌙 Dinner", time: "7:30 PM",
        bg: "#e8eaf6", accent: "#5c6bc0",
        items: [
          { name: "Wheat Roti", portion: "2 rotis (120g dough)" },
          { name: "Ash Gourd (Winter Melon) Sabzi", portion: "200g ash gourd" },
          { name: "Moong Dal Soup", portion: "1 cup (180ml)" },
          { name: "Tofu Scramble", portion: "80g firm tofu" },
        ],
        protein: "~20g",
        prep: [
          "Ash Gourd Sabzi: Peel, deseed and cube 200g ash gourd. Heat ½ tsp oil + ¼ tsp cumin seeds. Add ash gourd + pinch turmeric + pinch coriander powder + 2 tbsp water. Cover and cook 15 min on low flame. Ash gourd is one of the most alkaline vegetables — excellent for gastritis.",
          "Tofu Scramble: Pat 80g firm tofu completely dry with a cloth. Crumble roughly. Heat ¼ tsp oil in pan. Add tofu + pinch turmeric + ¼ tsp cumin powder. Stir-fry 5 min on medium flame until slightly golden. Add fresh coriander. No chilli.",
          "Dal Soup: Thin moong dal with turmeric and ginger. 1 cup, served hot.",
          "Rotis: Same wheat roti method — 2 thin rotis with ¼ tsp ghee each.",
        ],
      },
    ],
  },
  {
    day: "Thursday",
    kcal: "~1800",
    meals: [
      {
        type: "breakfast", label: "🌅 Breakfast", time: "7:00 AM",
        bg: "#fffde7", accent: "#f9a825",
        items: [
          { name: "Banana", portion: "1 medium (120g)" },
          { name: "Low-fat Milk", portion: "200ml" },
          { name: "Rolled Oats", portion: "30g (3 tbsp)" },
          { name: "Boiled Eggs", portion: "2 whole eggs" },
        ],
        protein: "~22g",
        prep: [
          "Banana Smoothie: Peel and break 1 banana into blender. Add 200ml chilled or room-temperature low-fat milk + 30g rolled oats.",
          "Blend 45 seconds until smooth. Do NOT add citrus juice, sugar, or protein powder. Drink immediately — oats thicken fast.",
          "Boil 2 eggs separately for 10 min. Eat alongside smoothie.",
          "This is ideal pre-workout breakfast — light, energising, sits well in the stomach during running.",
        ],
      },
      {
        type: "lunch", label: "☀️ Lunch", time: "1:00 PM",
        bg: "#e8f5e9", accent: "#43a047",
        items: [
          { name: "Vegetable Pulao", portion: "¾ cup raw white rice (135g) + 100g vegetables" },
          { name: "Boondi Raita", portion: "100g curd + 20g plain boondi" },
          { name: "Egg Curry (light)", portion: "2 whole eggs in thin gravy" },
        ],
        protein: "~26g",
        prep: [
          "Pulao: Heat ½ tsp ghee in pot. Add 1 tsp cumin seeds + 1 bay leaf. Add 100g diced vegetables (carrot, peas, beans). Sauté 2 min. Add washed rice + 1.5 cups water + ¼ tsp turmeric + pinch salt. Cover, cook on low 15 min.",
          "Boondi Raita: Beat 100g curd smooth with a fork. Add 20g plain (un-spiced) boondi. Add ¼ tsp roasted cumin powder. Let boondi soak and soften 5 min before eating.",
          "Egg Curry (Light): Hard boil 2 eggs (10 min). Peel, make 3 small slits each. In pan: heat ½ tsp oil + ¼ tsp cumin seeds + 1 tsp ginger paste. Add ¼ tsp turmeric + 1 tsp coriander powder. Add ½ cup water to make thin, brothy gravy. Add eggs. Simmer 5 min. No red chilli, no tomato.",
        ],
      },
      {
        type: "snack", label: "🍎 Evening Snack", time: "4:30 PM",
        bg: "#fff3e0", accent: "#fb8c00",
        items: [
          { name: "Papaya (ripe)", portion: "150g (1 cup cubed)" },
          { name: "Roasted Makhana", portion: "30g (about 1 cup puffed)" },
        ],
        protein: "~5g",
        prep: [
          "Papaya: Peel, deseed, cube ripe papaya into bite-sized pieces. Eat at room temperature. Papain enzyme in papaya actively breaks down proteins and soothes stomach lining — eat this as often as possible.",
          "Makhana: Dry roast in pan on low flame 5–6 min, stirring constantly until they turn crisp and make a hollow sound when tapped. Add pinch of rock salt + ¼ tsp cumin powder. Store excess in airtight box for up to 1 week.",
        ],
      },
      {
        type: "dinner", label: "🌙 Dinner", time: "7:30 PM",
        bg: "#e8eaf6", accent: "#5c6bc0",
        items: [
          { name: "Wheat Roti", portion: "2 rotis (120g dough)" },
          { name: "Palak (Spinach) Sabzi", portion: "150g fresh spinach leaves" },
          { name: "Moong Dal", portion: "¾ cup cooked" },
          { name: "Grilled Fish", portion: "100g rohu or pomfret" },
        ],
        protein: "~36g",
        prep: [
          "Palak Sabzi: Blanch 150g spinach in boiling water for 2 min. Drain immediately, press out water. Heat ½ tsp oil + ¼ tsp cumin seeds + 1 tsp ginger paste. Add blanched spinach + pinch turmeric. Stir-fry 3 min. Keep simple — no cream, no heavy spice, no garlic excess.",
          "Fish: Marinate 100g fish with ¼ tsp turmeric + ¼ tsp coriander powder + ½ tsp ginger paste + pinch salt. Grill on non-stick pan with ¼ tsp oil, 5–6 min each side on medium flame.",
          "Dal: Moong dal same as usual — pressure cook 2 whistles, temper with cumin.",
          "Rotis: 2 thin wheat rotis with ¼ tsp ghee.",
        ],
      },
    ],
  },
  {
    day: "Friday",
    kcal: "~1870",
    meals: [
      {
        type: "breakfast", label: "🌅 Breakfast", time: "7:00 AM",
        bg: "#fffde7", accent: "#f9a825",
        items: [
          { name: "Poha (Thick Flattened Rice)", portion: "60g dry weight" },
          { name: "Green Peas", portion: "30g" },
          { name: "Carrot (small dice)", portion: "40g" },
          { name: "Boiled Eggs", portion: "2 whole eggs" },
        ],
        protein: "~18g",
        prep: [
          "Wash 60g thick poha in a strainer under running water for 30 seconds. Drain. Let sit 3–4 min until softened but not mushy. Do not over-soak.",
          "Heat ½ tsp oil in pan. Add ¼ tsp mustard seeds (optional — skip if you get bloating). Add ¼ tsp turmeric.",
          "Add peas and diced carrot. Stir-fry 3 min until slightly cooked.",
          "Add softened poha + pinch salt. Toss gently (don't stir hard — poha will break). Cook 2–3 min on low flame.",
          "Garnish with fresh coriander leaves. No green chilli, no lemon juice.",
          "Boil 2 eggs (10 min). Serve alongside.",
        ],
      },
      {
        type: "lunch", label: "☀️ Lunch", time: "1:00 PM",
        bg: "#e8f5e9", accent: "#43a047",
        items: [
          { name: "Cooked White Rice", portion: "150g cooked" },
          { name: "Rajma (Kidney Beans)", portion: "80g dry (soaked) → ~200g cooked" },
          { name: "Steamed Broccoli", portion: "100g" },
          { name: "Baked Paneer Tikka", portion: "80g low-fat paneer" },
        ],
        protein: "~38g",
        prep: [
          "Rajma: Soak 80g dry rajma in water overnight (minimum 8 hrs). Discard soaking water. Pressure cook with fresh water + 1 ginger piece + pinch turmeric for 6–7 whistles until very soft (no hard centres). In pan: heat ½ tsp oil + ¼ tsp cumin seeds + 1 tsp ginger paste + ¼ tsp coriander powder. Add cooked rajma + ½ cup water. Simmer 10 min. No tomato, no chilli.",
          "Broccoli: Cut into small florets. Steam 8 min or microwave with 2 tbsp water covered for 4 min. Sprinkle ¼ tsp cumin powder + pinch salt.",
          "Paneer Tikka (Baked): Cut 80g low-fat paneer into cubes. Mix marinade: 2 tbsp curd + ¼ tsp cumin + ¼ tsp turmeric + ¼ tsp coriander powder + pinch salt. Coat paneer evenly. Marinate 20 min. Place on greased baking tray. Bake at 200°C for 15 min OR cook on non-stick pan with ¼ tsp oil for 2–3 min each side until golden.",
        ],
      },
      {
        type: "snack", label: "🍎 Evening Snack", time: "4:30 PM",
        bg: "#fff3e0", accent: "#fb8c00",
        items: [
          { name: "Cucumber", portion: "1 medium (150g), sliced" },
          { name: "Hummus", portion: "3 tbsp (45g)" },
          { name: "Plain Buttermilk (Chaas)", portion: "200ml" },
        ],
        protein: "~7g",
        prep: [
          "Slice cucumber into rounds or batons. Cucumber is one of the most alkaline vegetables — it actively cools and soothes the stomach lining.",
          "Hummus (Gastritis-safe version): Blend 100g well-cooked chickpeas + 1 tbsp tahini + 1 tsp olive oil + 3 tbsp water until smooth. No lemon juice, no raw garlic (both trigger acid). Add pinch cumin instead.",
          "Chaas: Whisk 50g fresh curd + 150ml water until smooth. Add ¼ tsp roasted cumin powder. Drink slowly. This is a probiotic, cooling, acid-neutralising drink.",
        ],
      },
      {
        type: "dinner", label: "🌙 Dinner", time: "7:30 PM",
        bg: "#e8eaf6", accent: "#5c6bc0",
        items: [
          { name: "Wheat Roti", portion: "2 rotis (120g dough)" },
          { name: "Tinda (Apple Gourd) Sabzi", portion: "200g tinda" },
          { name: "Moong Dal Soup", portion: "1 cup (180ml)" },
          { name: "Light Chicken Soup", portion: "150ml broth + 60g shredded chicken" },
        ],
        protein: "~22g",
        prep: [
          "Tinda Sabzi: Peel and quarter 200g tinda (apple gourd). Heat ½ tsp oil + ¼ tsp cumin seeds. Add tinda + ¼ tsp turmeric + ¼ tsp coriander powder + 2 tbsp water. Cover and cook 12–15 min on low flame until completely soft.",
          "Chicken Soup: Boil 80g bone-in chicken pieces in 2 cups water + 2 ginger slices + ¼ tsp turmeric for 25 min on medium flame. Strain broth. Shred chicken off the bone. Drink the broth (150ml) and eat shredded chicken. Bone broth is gut-healing.",
          "Dal Soup + Rotis: Thin moong dal (1 cup). 2 wheat rotis same as previous days.",
        ],
      },
    ],
  },
  {
    day: "Saturday",
    kcal: "~1850",
    meals: [
      {
        type: "breakfast", label: "🌅 Breakfast", time: "7:00 AM",
        bg: "#fffde7", accent: "#f9a825",
        items: [
          { name: "Idli", portion: "3 medium idlis (~150g total)" },
          { name: "Coconut Chutney (mild)", portion: "3 tbsp (45g)" },
          { name: "Sambhar", portion: "½ cup (120ml)" },
        ],
        protein: "~10g",
        prep: [
          "Idli (from batter): Grease idli moulds lightly with ¼ tsp oil. Pour fermented batter ¾ full into each mould. Steam on high flame for 10–12 min. Test with toothpick — should come out clean. Let sit 2 min before unmoulding.",
          "Coconut Chutney (No-chilli): Blend 3 tbsp fresh grated coconut + 1 tbsp roasted chana dal + 1 small ginger piece + pinch salt + 3 tbsp water until smooth. Temper with ¼ tsp oil + ¼ tsp mustard seeds + curry leaves. No green chilli.",
          "Sambhar: Pressure cook ¼ cup toor dal (2 whistles). Add drumstick or carrot pieces + ¼ tsp sambhar powder (mild variety) + pinch turmeric. Simmer 10 min. No tamarind — use tiny pinch of amchur (dry mango powder) if sourness is needed.",
        ],
      },
      {
        type: "lunch", label: "☀️ Lunch", time: "1:00 PM",
        bg: "#e8f5e9", accent: "#43a047",
        items: [
          { name: "Cooked White Rice", portion: "150g cooked" },
          { name: "Mild Fish Curry (coconut-based)", portion: "120g fish + ½ cup coconut gravy" },
          { name: "Stir-fried Tofu with Capsicum", portion: "80g tofu + 60g capsicum" },
        ],
        protein: "~40g",
        prep: [
          "Coconut Fish Curry: Blend 3 tbsp fresh grated coconut + ½ cup water into thin coconut milk. In pan: heat ½ tsp coconut oil + ¼ tsp cumin seeds + 1 tsp ginger paste + ¼ tsp turmeric + ¼ tsp coriander powder. Add coconut milk. Bring to gentle simmer. Add 120g fish pieces (rohu/pomfret). Cook on low flame 12–15 min until fish is cooked through. No tamarind, no red chilli — use curry leaves only for flavour.",
          "Tofu Stir-fry: Pat 80g firm tofu completely dry, cut into thin strips. Heat ½ tsp oil in pan on high. Add 60g sliced capsicum, stir-fry 2 min. Add tofu + ¼ tsp turmeric + ¼ tsp cumin powder. Stir-fry 5 min until tofu is golden. Add coriander leaves.",
          "Cook white rice normally. Serve all three together.",
        ],
      },
      {
        type: "snack", label: "🍎 Evening Snack", time: "4:30 PM",
        bg: "#fff3e0", accent: "#fb8c00",
        items: [
          { name: "Pear", portion: "1 medium (150g)" },
          { name: "Cashews", portion: "10–12 cashews (15g)" },
          { name: "Low-fat Curd", portion: "100g" },
        ],
        protein: "~8g",
        prep: [
          "Wash and slice pear. Eat with skin — pear skin contains pectin, a soluble fibre that is particularly gentle on and protective of the gut lining.",
          "Eat 10–12 cashews raw or dry-roasted (no oil, no salt). Do not exceed 12 in one sitting — larger quantities can cause bloating.",
          "Curd at room temperature. Stir in a pinch of roasted cumin powder.",
        ],
      },
      {
        type: "dinner", label: "🌙 Dinner", time: "7:30 PM",
        bg: "#e8eaf6", accent: "#5c6bc0",
        items: [
          { name: "Wheat Roti", portion: "2 rotis (120g dough)" },
          { name: "Lauki Kofta (Baked)", portion: "3 koftas from 200g lauki" },
          { name: "Moong Dal", portion: "¾ cup cooked" },
          { name: "Egg Bhurji", portion: "1 whole egg" },
        ],
        protein: "~22g",
        prep: [
          "Lauki Kofta (Baked — NOT fried): Grate 200g bottle gourd. Squeeze out ALL excess water using a cloth. Mix grated lauki + 2 tbsp besan (chickpea flour) + ¼ tsp cumin powder + ¼ tsp turmeric + pinch salt. Dough should be firm. Shape into 3 round balls. Brush lightly with oil. Bake at 180°C for 20 min, turning at 10 min, until golden. Serve with dal as gravy.",
          "Egg Bhurji: Beat 1 egg with a fork. Heat ¼ tsp oil in non-stick pan. Pour egg. Scramble gently with spatula for 2–3 min on low flame. Add pinch turmeric + fresh coriander. No chilli, no onion.",
          "Dal + Rotis: Moong dal cooked same as usual. 2 thin wheat rotis.",
        ],
      },
    ],
  },
  {
    day: "Sunday",
    kcal: "~1900",
    meals: [
      {
        type: "breakfast", label: "🌅 Breakfast", time: "7:00 AM",
        bg: "#fffde7", accent: "#f9a825",
        items: [
          { name: "Upma (Semolina)", portion: "60g rava (dry)" },
          { name: "Mixed Vegetables", portion: "100g (carrot, peas, beans)" },
          { name: "Ghee", portion: "1 tsp" },
          { name: "Boiled Eggs", portion: "2 whole eggs" },
        ],
        protein: "~18g",
        prep: [
          "Dry roast 60g rava (semolina) in a pan on medium flame for 3–4 min, stirring constantly, until it turns light golden and aromatic. Remove and set aside.",
          "Heat 1 tsp ghee in same pan. Add ¼ tsp mustard seeds + curry leaves. Add 100g diced vegetables. Sauté 2 min.",
          "Add 1.5 cups boiling water carefully (splatters — keep face away). Immediately add roasted rava while stirring continuously to prevent lumps.",
          "Reduce flame to low. Cook 5–6 min until water is absorbed and upma holds shape. Cover and rest 2 min. Fluff gently.",
          "Boil 2 eggs (10 min). Serve alongside.",
        ],
      },
      {
        type: "lunch", label: "☀️ Lunch", time: "1:00 PM",
        bg: "#e8f5e9", accent: "#43a047",
        items: [
          { name: "Jeera (Cumin) Rice", portion: "¾ cup raw white rice (135g)" },
          { name: "Dal Makhani (light version)", portion: "1 cup cooked (180g)" },
          { name: "Steamed Mixed Vegetables", portion: "100g" },
          { name: "Grilled Chicken Breast", portion: "100g" },
        ],
        protein: "~45g",
        prep: [
          "Jeera Rice: Heat ½ tsp ghee in pot. Add 1 tsp cumin seeds — let splutter 30 sec. Add washed white rice + 1.5 cups water + pinch salt. Cover, cook on low flame 15 min. Fluff with fork.",
          "Dal Makhani (Light): Soak 60g whole black urad dal overnight. Pressure cook with fresh water for 8–10 whistles until completely soft and creamy. In pan: heat ½ tsp butter (or ghee) + 1 tsp ginger paste. Add cooked dal + ¼ tsp coriander powder + pinch turmeric + 1 tbsp fresh cream only (vs traditional ¼ cup). Simmer 10 min. Keep spice minimal — this is Sunday's slight treat.",
          "Steamed Vegetables: 100g mixed (lauki, carrot, beans). Steam 10 min. Add pinch cumin.",
          "Grill 100g chicken breast same as Monday method.",
        ],
      },
      {
        type: "snack", label: "🍎 Evening Snack", time: "4:30 PM",
        bg: "#fff3e0", accent: "#fb8c00",
        items: [
          { name: "Banana", portion: "1 medium (120g)" },
          { name: "Homemade Oat Cookies", portion: "2 small cookies (~40g)" },
          { name: "Warm Milk (low-fat)", portion: "150ml" },
        ],
        protein: "~9g",
        prep: [
          "Oat Cookies (make in batch — Sunday prep): Mash 2 ripe bananas in a bowl. Mix in 200g rolled oats + 2 tbsp honey + ¼ tsp cinnamon powder. No sugar, no maida, no butter.",
          "Shape into small round discs (1 tbsp each) on greased baking tray. Bake at 170°C for 12–15 min until golden at edges. Makes ~16 cookies. Store in airtight container up to 4 days.",
          "Warm milk to 60°C. Drink slowly alongside 2 cookies and banana.",
        ],
      },
      {
        type: "dinner", label: "🌙 Dinner", time: "7:30 PM",
        bg: "#e8eaf6", accent: "#5c6bc0",
        items: [
          { name: "Wheat Roti", portion: "2 rotis (120g dough)" },
          { name: "Mix Veg Sabzi (mild)", portion: "200g mixed veg" },
          { name: "Low-fat Curd", portion: "100g" },
          { name: "Low-fat Paneer", portion: "60g" },
        ],
        protein: "~22g",
        prep: [
          "Mix Veg Sabzi: Dice 200g mixed vegetables (lauki, carrot, beans, 1 small potato). Heat ½ tsp oil + ¼ tsp cumin seeds. Add vegetables + ¼ tsp turmeric + ¼ tsp coriander powder + 3 tbsp water. Cover and cook 15 min on low until all vegetables are soft.",
          "Cube 60g paneer. Lightly pan-cook in ½ tsp oil for 2 min each side until just golden. Add to sabzi in last 2 min.",
          "Serve with 100g fresh curd (room temperature) and 2 thin wheat rotis.",
          "End the week light — this is an easy, comforting, balanced dinner.",
        ],
      },
    ],
  },
];

const safeVsAvoid = {
  safe: [
    { icon: "🥣", item: "Oats, daliya, poha, idli, upma, rava" },
    { icon: "🍌", item: "Banana, papaya, watermelon, pear, apple" },
    { icon: "🥦", item: "Bottle gourd, ridge gourd, ash gourd, carrot, tinda" },
    { icon: "🍳", item: "Boiled / poached / scrambled eggs (minimal oil)" },
    { icon: "🐟", item: "Steamed / grilled fish — rohu, pomfret, surmai" },
    { icon: "🍗", item: "Grilled chicken breast — no skin, minimal spice" },
    { icon: "🧆", item: "Low-fat paneer — baked or lightly cooked" },
    { icon: "🫘", item: "Moong dal, toor dal — well-cooked and soft" },
    { icon: "🍚", item: "White rice (well-cooked), wheat roti, multigrain roti" },
    { icon: "🥛", item: "Low-fat curd, warm milk, plain buttermilk (chaas)" },
    { icon: "🌿", item: "Cumin, turmeric, coriander powder, ginger, curry leaves" },
    { icon: "🫚", item: "Ghee (1 tsp/day), cold-pressed coconut oil (small qty)" },
  ],
  avoid: [
    { icon: "🌶️", item: "Green chillies, red chilli powder, pepper, hot sauces" },
    { icon: "🍋", item: "Citrus — lemon, orange, pineapple, amla juice" },
    { icon: "☕", item: "Coffee, strong black tea on empty stomach" },
    { icon: "🥤", item: "Carbonated drinks, sodas, energy drinks, packaged juices" },
    { icon: "🍟", item: "Deep-fried foods — samosa, pakoda, puri, chips" },
    { icon: "🍫", item: "Chocolate, mint — relax lower esophageal sphincter" },
    { icon: "🧅", item: "Raw onion and raw garlic in large amounts" },
    { icon: "🍅", item: "Tomato-heavy curries, sauces, ketchup, rasam" },
    { icon: "🍷", item: "Alcohol — highly corrosive to gastric lining" },
    { icon: "🧈", item: "Excess butter, heavy cream, full-fat dairy" },
    { icon: "🍞", item: "Maida — bread, pasta, naan, biscuits, bakery items" },
    { icon: "🥗", item: "Pickles, vinegar dressings, tamarind-heavy chutneys" },
  ],
};

const timingTips = [
  {
    icon: "⏰", title: "Pre-Workout (60–90 min before)", color: "#e8f5e9", border: "#66bb6a",
    tips: [
      "Eat banana (120g) + 2 boiled eggs — light, protein-rich, does not trigger acidity.",
      "Avoid high-fat meals, spicy foods, or heavy carbs right before your treadmill run.",
      "Sip 200–300ml water 30 min before workout. Do not over-hydrate — causes sloshing and reflux while running.",
    ],
  },
  {
    icon: "🏃", title: "During Workout", color: "#e3f2fd", border: "#42a5f5",
    tips: [
      "Take small sips of plain water every 15–20 minutes. Avoid gulping large amounts at once.",
      "Do NOT eat anything mid-workout — it triggers acid reflux, especially on a treadmill.",
      "Keep upright posture throughout — slouching compresses the stomach and worsens reflux.",
    ],
  },
  {
    icon: "🍽️", title: "Post-Workout (within 30–45 min)", color: "#fff3e0", border: "#ffa726",
    tips: [
      "Most important meal of the day — have curd (100g) + banana OR 2 boiled eggs + 1 roti immediately.",
      "This is the best window for protein absorption. Do not skip or delay this meal.",
      "Avoid lying down for at least 60 minutes after eating post-workout.",
    ],
  },
  {
    icon: "🌙", title: "Dinner Timing (Critical for Gastritis)", color: "#f3e5f5", border: "#ab47bc",
    tips: [
      "Eat dinner at least 2–3 hours before sleeping — ideally done by 7:30 PM.",
      "Keep dinner light — maximum 2 rotis, soupy dal, steamed vegetables.",
      "No heavy protein (large non-veg portions, rajma) at night — hard to digest lying down and causes reflux.",
    ],
  },
];

const proteinOptions = {
  veg: [
    { name: "Low-fat Paneer", amount: "100g = ~18g protein", tip: "Bake or grill — never deep fry" },
    { name: "Moong Dal (cooked)", amount: "1 cup = ~14g protein", tip: "Easiest lentil on the stomach" },
    { name: "Tofu (firm)", amount: "100g = ~8g protein", tip: "Pat dry before cooking — stir-fry with minimal spice" },
    { name: "Low-fat Curd", amount: "200g = ~8g protein", tip: "Probiotic — eat at room temperature" },
    { name: "Boiled Chickpeas", amount: "100g = ~9g protein", tip: "Soak 8 hrs, cook until very soft — undercooked = bloating" },
    { name: "Makhana (Fox Nuts)", amount: "30g = ~4g protein", tip: "Alkaline snack — always dry roast before eating" },
    { name: "Low-fat Warm Milk", amount: "300ml = ~10g protein", tip: "Warm only — cold milk can trigger rebound acidity" },
    { name: "Chia Seeds", amount: "2 tbsp = ~4g protein", tip: "Add to oats or smoothie — soak 10 min first" },
  ],
  nonVeg: [
    { name: "Chicken Breast (grilled)", amount: "100g = ~31g protein", tip: "Highest protein, lowest fat — grill, never fry" },
    { name: "Egg Whites (boiled/scrambled)", amount: "3 whites = ~11g protein", tip: "Zero fat — ultra digestible, safest for gastritis" },
    { name: "Whole Egg (boiled)", amount: "1 egg = ~6g protein", tip: "Boiled is always better than fried for gastritis" },
    { name: "Rohu Fish (steamed)", amount: "100g = ~20g protein", tip: "Freshwater fish — very light and easy to digest" },
    { name: "Pomfret (grilled)", amount: "100g = ~22g protein", tip: "Grill with ginger + coriander + turmeric only" },
    { name: "Chicken Soup (bone broth)", amount: "1 bowl = ~15g protein", tip: "Gut-healing collagen-rich broth — best on upset stomach days" },
    { name: "Egg Bhurji (1 egg)", amount: "~6g protein", tip: "Minimal oil, no spice, add fresh coriander only" },
    { name: "Fish Curry (coconut base)", amount: "100g = ~20g protein", tip: "Coconut milk is alkaline — always skip tamarind" },
  ],
};

export default function DietPlan() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("plan");
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const tabs = [
    { id: "plan", label: "7-Day Plan" },
    { id: "foods", label: "Safe vs Avoid" },
    { id: "timing", label: "Meal Timing" },
    { id: "protein", label: "Protein Guide" },
  ];

  const current = mealPlan[activeDay];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f0f7ee 0%,#fdf6ec 50%,#f0f4ff 100%)", fontFamily: "'Georgia','Times New Roman',serif", paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1b4332 0%,#2d6a4f 60%,#40916c 100%)", color: "white", padding: "36px 24px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 50%,rgba(255,255,255,.06) 0%,transparent 55%),radial-gradient(circle at 85% 20%,rgba(255,255,255,.09) 0%,transparent 50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: "#95d5b2", marginBottom: 10 }}>Personalized Fat-Loss Plan · Gastritis-Safe</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: "normal", letterSpacing: "-0.5px" }}>Gut-Friendly Diet Guide</h1>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: "#b7e4c7", fontStyle: "italic", fontFamily: "sans-serif" }}>Exact portions · Preparation steps · White rice · ~1800–1900 kcal/day</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {[["🏋️","100 kg"],["📏","180 cm"],["🚶","5 km/day"],["🫁","Gastritis-safe"],["🍚","White Rice"]].map(([icon,label])=>(
              <div key={label} style={{ background:"rgba(255,255,255,.13)", padding:"4px 11px", borderRadius:20, fontSize:11, fontFamily:"sans-serif", border:"1px solid rgba(255,255,255,.2)" }}>{icon} {label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", background:"white", boxShadow:"0 2px 12px rgba(0,0,0,.08)", position:"sticky", top:0, zIndex:10, overflowX:"auto" }}>
        {tabs.map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ flex:1, minWidth:90, padding:"14px 8px", border:"none", background:activeTab===tab.id?"#1b4332":"white", color:activeTab===tab.id?"white":"#555", fontFamily:"sans-serif", fontSize:12, fontWeight:activeTab===tab.id?"700":"400", cursor:"pointer", borderBottom:activeTab===tab.id?"3px solid #1b4332":"3px solid transparent", transition:"all .2s", letterSpacing:".3px" }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ maxWidth:820, margin:"0 auto", padding:"24px 16px" }}>

        {/* 7-Day Plan */}
        {activeTab==="plan" && (
          <div>
            <p style={{ fontFamily:"sans-serif", fontSize:12, color:"#888", margin:"0 0 14px", textAlign:"center" }}>Tap a day · Tap any meal to see exact portions & preparation steps</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:20 }}>
              {mealPlan.map((d,i)=>(
                <button key={i} onClick={()=>{ setActiveDay(i); setExpandedMeal(null); }} style={{ width:52, height:52, borderRadius:"50%", border:activeDay===i?"2px solid #1b4332":"2px solid #e0e0e0", background:activeDay===i?"#1b4332":"white", color:activeDay===i?"white":"#444", fontFamily:"sans-serif", fontSize:12, fontWeight:"700", cursor:"pointer", transition:"all .2s", boxShadow:activeDay===i?"0 4px 14px rgba(27,67,50,.35)":"none" }}>{days[i]}</button>
              ))}
            </div>

            <div style={{ background:"white", borderRadius:18, overflow:"hidden", boxShadow:"0 6px 28px rgba(0,0,0,.09)" }}>
              <div style={{ background:"linear-gradient(135deg,#1b4332,#40916c)", padding:"16px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ color:"white", fontSize:22 }}>{current.day}</div>
                <div style={{ background:"rgba(255,255,255,.18)", color:"white", padding:"4px 12px", borderRadius:20, fontFamily:"sans-serif", fontSize:12 }}>{current.kcal} kcal</div>
              </div>

              {current.meals.map((meal,mi)=>{
                const isOpen = expandedMeal===`${activeDay}-${mi}`;
                return (
                  <div key={mi} style={{ borderBottom:mi<current.meals.length-1?"1px solid #f0f0f0":"none" }}>
                    <div style={{ padding:"16px 18px", background:meal.bg+"44" }}>
                      {/* Meal label row */}
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                        <div>
                          <div style={{ fontFamily:"sans-serif", fontSize:10, fontWeight:"800", color:meal.accent, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:3 }}>{meal.label}</div>
                          <div style={{ fontFamily:"sans-serif", fontSize:11, color:"#aaa" }}>{meal.time}</div>
                        </div>
                        <div style={{ background:meal.accent+"22", color:meal.accent, padding:"4px 10px", borderRadius:20, fontFamily:"sans-serif", fontSize:11, fontWeight:"700", border:`1px solid ${meal.accent}44` }}>Protein: {meal.protein}</div>
                      </div>

                      {/* Portions table */}
                      <div style={{ background:"white", borderRadius:10, overflow:"hidden", marginBottom:10, border:"1px solid #f0f0f0" }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", padding:"7px 12px", background:"#f9f9f9", borderBottom:"1px solid #f0f0f0" }}>
                          <div style={{ fontFamily:"sans-serif", fontSize:10, fontWeight:"700", color:"#888", textTransform:"uppercase", letterSpacing:".8px" }}>Item</div>
                          <div style={{ fontFamily:"sans-serif", fontSize:10, fontWeight:"700", color:"#888", textTransform:"uppercase", letterSpacing:".8px" }}>Exact Portion</div>
                        </div>
                        {meal.items.map((item,ii)=>(
                          <div key={ii} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", padding:"9px 12px", background:ii%2===0?"white":"#fcfcfc", borderBottom:ii<meal.items.length-1?"1px solid #f5f5f5":"none" }}>
                            <div style={{ fontFamily:"sans-serif", fontSize:13, color:"#333", fontWeight:"500" }}>{item.name}</div>
                            <div style={{ fontFamily:"sans-serif", fontSize:12, color:meal.accent, fontWeight:"700" }}>{item.portion}</div>
                          </div>
                        ))}
                      </div>

                      {/* Toggle button */}
                      <button onClick={()=>setExpandedMeal(isOpen?null:`${activeDay}-${mi}`)} style={{ width:"100%", padding:"10px 14px", background:isOpen?meal.accent:"white", color:isOpen?"white":meal.accent, border:`1.5px solid ${meal.accent}`, borderRadius:8, fontFamily:"sans-serif", fontSize:12, fontWeight:"700", cursor:"pointer", transition:"all .2s", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        {isOpen?"▲ Hide Preparation Steps":"▼ Show Step-by-Step Preparation"}
                      </button>

                      {/* Prep steps */}
                      {isOpen && (
                        <div style={{ marginTop:12, background:"white", borderRadius:10, padding:"14px 16px", border:`1.5px solid ${meal.accent}33` }}>
                          <div style={{ fontFamily:"sans-serif", fontSize:10, fontWeight:"800", color:meal.accent, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:12 }}>👨‍🍳 Step-by-Step Preparation</div>
                          {meal.prep.map((step,si)=>(
                            <div key={si} style={{ display:"flex", gap:12, marginBottom:si<meal.prep.length-1?10:0, alignItems:"flex-start" }}>
                              <div style={{ background:meal.accent, color:"white", width:22, height:22, borderRadius:"50%", fontFamily:"sans-serif", fontSize:11, fontWeight:"700", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{si+1}</div>
                              <div style={{ fontFamily:"sans-serif", fontSize:13, color:"#444", lineHeight:1.6 }}>{step}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Safe vs Avoid */}
        {activeTab==="foods" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <h2 style={{ fontSize:24, fontWeight:"normal", color:"#1b4332", margin:"0 0 8px" }}>Foods Guide</h2>
              <p style={{ fontFamily:"sans-serif", fontSize:13, color:"#666", margin:0 }}>Curated for gastritis + sustainable fat loss</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[
                { title:"✅ Safe Foods", subtitle:"Gut-friendly & fat-loss approved", bg:"#1b4332", items:safeVsAvoid.safe, rowBg:"#f9fdf9" },
                { title:"❌ Avoid Foods", subtitle:"Trigger gastritis flare-ups", bg:"#b91c1c", items:safeVsAvoid.avoid, rowBg:"#fff5f5" },
              ].map(({title,subtitle,bg,items,rowBg})=>(
                <div key={title} style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.08)" }}>
                  <div style={{ background:bg, padding:"14px 18px" }}>
                    <div style={{ color:"white", fontSize:14, fontWeight:"700", fontFamily:"sans-serif" }}>{title}</div>
                    <div style={{ color:"rgba(255,255,255,.7)", fontSize:11, fontFamily:"sans-serif", marginTop:2 }}>{subtitle}</div>
                  </div>
                  {items.map((item,i)=>(
                    <div key={i} style={{ padding:"11px 14px", borderBottom:"1px solid #f5f5f5", display:"flex", alignItems:"flex-start", gap:8, background:i%2===0?"white":rowBg }}>
                      <span style={{ fontSize:18, flexShrink:0 }}>{item.icon}</span>
                      <span style={{ fontFamily:"sans-serif", fontSize:12, color:"#333", lineHeight:1.4 }}>{item.item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meal Timing */}
        {activeTab==="timing" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <h2 style={{ fontSize:24, fontWeight:"normal", color:"#1b4332", margin:"0 0 8px" }}>Workout Meal Timing</h2>
              <p style={{ fontFamily:"sans-serif", fontSize:13, color:"#666", margin:0 }}>Prevent acid reflux during your 5km treadmill run</p>
            </div>
            <div style={{ background:"white", borderRadius:16, padding:"20px 24px", boxShadow:"0 4px 20px rgba(0,0,0,.08)", marginBottom:20 }}>
              <div style={{ fontFamily:"sans-serif", fontSize:10, fontWeight:"800", color:"#1b4332", marginBottom:14, textTransform:"uppercase", letterSpacing:"1px" }}>📅 Ideal Daily Schedule</div>
              {[["7:00 AM","Light breakfast (pre-workout)","#f9a825"],["8:30 AM","Treadmill 5km + resistance exercises","#43a047"],["9:30 AM","Post-workout protein meal (critical)","#e53935"],["1:00 PM","Lunch — your largest meal of the day","#1976d2"],["4:30 PM","Evening snack","#fb8c00"],["7:30 PM","Dinner — light, 2–3 hrs before sleep","#7b1fa2"],["10:00 PM","Sleep","#455a64"]].map(([time,label,color])=>(
                <div key={time} style={{ display:"flex", gap:14, marginBottom:12, alignItems:"center" }}>
                  <div style={{ fontFamily:"sans-serif", fontSize:12, fontWeight:"700", color, width:72, flexShrink:0 }}>{time}</div>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:color, flexShrink:0 }} />
                  <div style={{ fontFamily:"sans-serif", fontSize:13, color:"#444" }}>{label}</div>
                </div>
              ))}
            </div>
            {timingTips.map((tip,i)=>(
              <div key={i} style={{ background:"white", borderRadius:16, overflow:"hidden", boxShadow:"0 4px 18px rgba(0,0,0,.07)", marginBottom:16 }}>
                <div style={{ background:tip.color, borderLeft:`5px solid ${tip.border}`, padding:"14px 18px" }}>
                  <div style={{ fontFamily:"sans-serif", fontSize:14, fontWeight:"700", color:"#222" }}>{tip.icon} {tip.title}</div>
                </div>
                <div style={{ padding:"14px 18px" }}>
                  {tip.tips.map((t,j)=>(
                    <div key={j} style={{ display:"flex", gap:10, marginBottom:j<tip.tips.length-1?10:0, fontFamily:"sans-serif", fontSize:13, color:"#444", lineHeight:1.55 }}>
                      <span style={{ color:tip.border, fontWeight:"bold", flexShrink:0 }}>→</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Protein Guide */}
        {activeTab==="protein" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <h2 style={{ fontSize:24, fontWeight:"normal", color:"#1b4332", margin:"0 0 8px" }}>High-Protein Options</h2>
              <p style={{ fontFamily:"sans-serif", fontSize:13, color:"#666", margin:0 }}>Stomach-gentle sources — aim for 120–140g protein/day</p>
            </div>
            {[
              { title:"🌿 Vegetarian Sources", data:proteinOptions.veg, accent:"#1b4332", bg:"#e8f5e9" },
              { title:"🍗 Non-Vegetarian Sources", data:proteinOptions.nonVeg, accent:"#4a235a", bg:"#f3e5f5" },
            ].map(({title,data,accent,bg})=>(
              <div key={title} style={{ marginBottom:24 }}>
                <div style={{ background:accent, color:"white", padding:"14px 20px", borderRadius:"16px 16px 0 0", fontFamily:"sans-serif", fontSize:14, fontWeight:"700" }}>{title}</div>
                <div style={{ background:"white", borderRadius:"0 0 16px 16px", overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.08)" }}>
                  {data.map((item,i)=>(
                    <div key={i} style={{ padding:"13px 18px", borderBottom:i<data.length-1?"1px solid #f5f5f5":"none", background:i%2===0?"white":bg+"55" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:4 }}>
                        <div style={{ fontFamily:"sans-serif", fontSize:14, fontWeight:"700", color:"#222" }}>{item.name}</div>
                        <div style={{ background:accent+"18", color:accent, padding:"3px 10px", borderRadius:20, fontFamily:"sans-serif", fontSize:11, fontWeight:"700", border:`1px solid ${accent}33`, whiteSpace:"nowrap", flexShrink:0 }}>{item.amount}</div>
                      </div>
                      <div style={{ fontFamily:"sans-serif", fontSize:12, color:"#777", fontStyle:"italic" }}>💡 {item.tip}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ background:"linear-gradient(135deg,#fff8e1,#fff3e0)", borderRadius:16, padding:"20px", border:"1px solid #ffe082" }}>
              <div style={{ fontFamily:"sans-serif", fontWeight:"800", color:"#e65100", marginBottom:12, fontSize:12, textTransform:"uppercase", letterSpacing:"1px" }}>⚠️ Gastritis Protein Rules</div>
              {["Never eat protein on a completely empty stomach — have a banana or 2 spoons of oats first.","Avoid protein shakes with artificial sweeteners or flavours — they irritate the stomach lining.","Cook all non-veg on medium-low heat — high-heat charring increases acidity.","Space protein meals 3–4 hours apart for optimal absorption and digestion.","Always pair protein with alkaline foods — cucumber, banana, warm curd — to neutralise acid.","Target 120–140g protein/day for fat loss at your current activity level and body weight."].map((tip,i)=>(
                <div key={i} style={{ display:"flex", gap:10, marginBottom:i<5?8:0, fontFamily:"sans-serif", fontSize:13, color:"#555", lineHeight:1.5 }}>
                  <span style={{ color:"#e65100", flexShrink:0 }}>•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ textAlign:"center", fontFamily:"sans-serif", fontSize:11, color:"#bbb", padding:"20px" }}>For informational purposes only. Consult a gastroenterologist & registered dietitian for personal medical guidance.</div>
    </div>
  );
}
