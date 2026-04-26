const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a healthcare support assistant.

Your job:
- Help users understand how to use this platform
- Answer general healthcare support questions
- Provide safe, general advice

Do NOT:
- Diagnose diseases
- Suggest medicines
- Provide prescriptions

Always:
- Keep answers short
- Be clear and helpful
- Suggest consulting a professional when needed`;

// Safety filter keywords
const SAFETY_KEYWORDS = ['treatment', 'medicine', 'diagnosis', 'prescribe', 'medication', 'drug', 'cure', 'symptom', 'disease'];

const containsSafetyTrigger = (message) => {
  const lowerMessage = message.toLowerCase();
  return SAFETY_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
};

// Fallback responses when API quota is exceeded
const FALLBACK_RESPONSES = [
  "I'd be happy to help you navigate our platform! You can request patient support through the 'Get Help' button, or register as a volunteer through the 'Become Volunteer' option.",
  "Our platform connects patients with compassionate volunteers who can help with errands, medical companionship, prescription pickup, and more. Use the forms on our website to get started!",
  "For general health concerns, please consult a medical professional. Our AI assistant can help you understand how to use our platform and answer non-medical questions.",
  "To request support, simply fill out the Patient Support Form with your needs. We'll match you with a suitable volunteer based on your requirements.",
  "Our volunteers are background-checked and trained to provide compassionate support. You can trust that you're in good hands when using our platform.",
  "If you'd like to volunteer, register through our Volunteer Form. We welcome anyone with a compassionate heart and some availability to help others.",
];

const getFallbackResponse = () => {
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Safety filter
    if (containsSafetyTrigger(message)) {
      return res.status(200).json({
        success: true,
        response: "Please consult a medical professional for medical advice."
      });
    }

    // Get Gemini model - using gemini-2.0-flash which is available
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Combine system prompt with user message
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.status(200).json({
      success: true,
      response: response
    });
  } catch (error) {
    // Check if it's a quota error
    if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('rate limit')) {
      console.log('Gemini quota exceeded, using fallback response');
      return res.status(200).json({
        success: true,
        response: getFallbackResponse(),
        fallback: true
      });
    }
    
    console.error('Chatbot Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get response from AI'
    });
  }
};