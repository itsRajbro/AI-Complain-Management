// controllers/aiController.js
// Handles AI complaint analysis using OpenRouter API

const axios = require("axios");

// @desc    Analyze complaint using AI
// @route   POST /api/ai/analyze
// @access  Private
const analyzeComplaint = async (req, res) => {
  const { title, description, category, location } = req.body;

  if (!description || !title) {
    return res
      .status(400)
      .json({ message: "Title and description are required for AI analysis" });
  }

  // Build prompt for OpenRouter AI
  const prompt = `
You are an AI assistant for a Smart Complaint Management System for municipal/government services.
Analyze the following complaint and respond ONLY in valid JSON format with no extra text.

Complaint Details:
- Title: ${title}
- Category: ${category}
- Location: ${location}
- Description: ${description}

Provide a JSON response with these exact fields:
{
  "priority": "Low | Medium | High | Critical",
  "department": "Name of the responsible government department",
  "autoResponse": "A professional, empathetic 2-3 sentence response to the complainant",
  "summary": "A concise 1-2 sentence summary of the complaint"
}

Rules:
- Water issues → Water Supply Department
- Electricity issues → Electrical Department, High priority
- Garbage/waste → Sanitation Department
- Roads → Public Works Department
- Critical means life-threatening or major infrastructure failure
- Keep autoResponse professional and reassuring
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat", // Free model on OpenRouter
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://smart-complaint-system.onrender.com",
          "X-Title": "Smart Complaint Management System",
        },
      }
    );

    // Extract content from OpenRouter response
    const content = response.data.choices[0].message.content;

    // Parse JSON response from AI
    let aiResult;
    try {
      // Remove markdown code fences if present
      const cleaned = content.replace(/```json|```/g, "").trim();
      aiResult = JSON.parse(cleaned);
    } catch (parseError) {
      // Fallback if AI doesn't return perfect JSON
      aiResult = {
        priority: "Medium",
        department: "General Administration",
        autoResponse:
          "Thank you for submitting your complaint. Our team has received it and will take action shortly.",
        summary: title,
      };
    }

    res.json({ success: true, analysis: aiResult });
  } catch (error) {
    console.error("OpenRouter AI Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "AI analysis failed. Please try again.",
      error: error.response?.data?.error?.message || error.message,
    });
  }
};

module.exports = { analyzeComplaint };
