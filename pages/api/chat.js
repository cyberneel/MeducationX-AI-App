import diseases from '../../public/conditions.json';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_TOKEN);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function run(input) {
  const prompt = input + " (limit responses to 15 sentences or less. and use information from this json if relevent to help me with this problem.) Here is the JSON: \n " + JSON.stringify(diseases);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { input } = req.body;

    //console.log(input);
    try {
      const response = await run(input);

      
      const generatedText = response || "No response generated";
      res.status(200).json({ response: generatedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching response from Hugging Face API' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
