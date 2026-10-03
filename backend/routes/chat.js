const express = require('express');
const { GoogleGenAI } = require('@google/genai');

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are MediBot, a warm, empathetic medical receptionist for a modern hospital.
Your job is to:
- Answer general patient questions about hospital services, departments, and appointments.
- Provide general health information in a safe, non-diagnostic way.
- Guide patients on how to book appointments with doctors and departments.
- Encourage patients to seek professional medical evaluation when symptoms are serious or persistent.

Important safety rules:
- Do not diagnose conditions or prescribe medication.
- Do not claim to be a replacement for a real doctor.
- If a user describes emergency symptoms such as chest pain, severe difficulty breathing, bleeding, loss of consciousness, or signs of a stroke, advise them to seek immediate medical attention or call emergency services.
- Be empathetic, clear, concise, and professional.
`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'A valid user message is required.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'Gemini API key is missing. Please configure it in the environment.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message.trim(),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const reply =
      response?.text ||
      response?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text || '')
        .join('') ||
      'I am unable to answer that right now. Please try again or speak with a doctor.';

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error('Gemini chat error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to process your request at the moment. Please try again later.',
    });
  }
});

module.exports = router;
