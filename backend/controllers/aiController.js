const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini Configuration
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// =====================================
// AI Nutrition Chat
// =====================================

exports.chat = async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {

      return res.status(400).json({

        success: false,

        message: "Food name is required",

      });

    }

    const model = genAI.getGenerativeModel({

      model: "gemini-2.5-flash",

    });

    const prompt = `
You are HomeBite Nutrition AI.

The user will send ONLY a food name.

Example:
Chicken
Paneer
Rice
Egg
Banana
Dal Fry

Your job is to return ONLY this format:

🍽 Food Name

🔥 Calories (per 100g)

🥩 Protein

🍞 Carbohydrates

🧈 Fat

🌾 Fiber

💊 Vitamins

🧲 Minerals

✅ Health Benefits

👨‍⚕️ Best For

⚠️ Avoid If

Keep the answer short.
Maximum 150 words.

Food:
${message}
`;
    // Generate AI Response

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    res.status(200).json({

      success: true,

      reply: text,

    });

  } catch (err) {

    console.error("Gemini Error:", err);

    res.status(500).json({

      success: false,

      message: "Unable to generate AI response.",

      error: err.message,

    });

  }

};