import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API (key will be set later)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateKeywords(text: string): Promise<string[]> {
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

	const systemInstruction =
		'Summarize into keywords the items or services being offered and requested. Only return the keywords, no other text (punctuation, paragraphs, etc.). Try to find the most relevant keywords and phrases. Give more weight to the first line submitted, which is the title of the offer or want. Favor distinct keywords (e.g., "organic" "wine", not "organic wine").';

	try {
		const result = await model.generateContent([systemInstruction, text]);
		const response = await result.response;
		const keywords = response
			.text()
			.split(/[,\n]+/)
			.map((word) => word.trim());
		return keywords.filter((word) => word.length > 0);
	} catch (error) {
		console.error('Error generating keywords:', error);
		return [];
	}
}
