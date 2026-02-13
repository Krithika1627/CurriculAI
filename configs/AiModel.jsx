// AiModel.jsx
import { GoogleGenAI } from "@google/genai";

function cleanJSON(text) {
  try {
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract only JSON part
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("No JSON found");
    }

    return cleaned.slice(firstBrace, lastBrace + 1);
  } catch (err) {
    console.error("❌ Clean JSON Failed:", err);
    console.log("RAW AI OUTPUT:", text);
    return null;
  }
}


// Initialize client
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

// ---------------- EXISTING FUNCTION ----------------
export async function GenerateCourseLayout_AI(userPrompt) {
  try {
    const tools = [{ googleSearch: {} }];

    const config = {
      thinkingConfig: { thinkingBudget: -1 },
      tools,
    };

    const model = "gemini-flash-latest";

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `
Generate a detailed course tutorial using the following inputs.
Return ONLY JSON. No explanation.

${userPrompt}
`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullText = "";
    for await (const chunk of response) {
      if (chunk.text) fullText += chunk.text;
    }

    return cleanJSON(fullText);
  } catch (err) {
    console.error("AI ERROR:", err);
    throw err;
  }
}

// ---------------- NEW FUNCTION ----------------
export async function GenerateChapterContent_AI(course, chapter) {
  try {
    const tools = [{ googleSearch: {} }];

    const config = {
      thinkingConfig: { thinkingBudget: -1 },
      tools,
    };

    const model = "gemini-flash-latest";

    const prompt = `
Explain the concept in detail on the following.

Course: ${course?.name}
Chapter: ${chapter?.chapter_name}

Return ONLY JSON in the following format:
{
  "content": [
    {
      "title": string,
      "explanation": string,
      "code": "<precode>...</precode>" // include only if applicable, else empty string
    }
  ]
}

Rules:
- Explanation must be detailed and beginner-friendly
- Include code examples only when relevant
- Code must be wrapped strictly inside <precode> tags
- Do not include markdown or extra text
`;

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullText = "";
    for await (const chunk of response) {
      if (chunk.text) fullText += chunk.text;
    }

    return cleanJSON(fullText); // raw JSON string
  } catch (err) {
    console.error("CHAPTER AI ERROR:", err);
    throw err;
  }
}
