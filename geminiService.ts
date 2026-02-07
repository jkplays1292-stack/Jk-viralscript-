
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ViralScript } from "../types";

export interface GenerationOptions {
  topic: string;
  platform: string;
  tone: string;
  language: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateViralScript = async (options: GenerationOptions): Promise<ViralScript> => {
  const { topic, platform, tone, language } = options;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class viral content writer and SEO expert. 
      TASK: Write a viral script for ${platform} about "${topic}" in ${language}.
      TONE: ${tone} (Humanized, natural, relatable).

      STRICT WRITING RULES:
      1. AVOID AI CLICHÉS like "In today's fast-paced world".
      2. CONVERSATIONAL flow.
      3. NICHE SEO: 10 high-performing keywords.
      4. VIRAL HASHTAGS: 10 tags.
      5. ANALYSIS: Provide a viral score (80-99) and brief analysis.
      
      OUTPUT STRUCTURE:
      - hook, body, cta, hashtags, seo_tags, visual_scenes, estimated_seconds, viral_score, analysis.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hook: { type: Type.STRING },
            body: { type: Type.STRING },
            cta: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            seo_tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            viral_score: { type: Type.NUMBER },
            analysis: {
              type: Type.OBJECT,
              properties: {
                hook_strength: { type: Type.STRING },
                retention_factor: { type: Type.STRING },
                global_appeal: { type: Type.STRING }
              }
            },
            visual_scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timestamp: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            estimated_seconds: { type: Type.NUMBER }
          },
          required: ["hook", "body", "cta", "hashtags", "seo_tags", "visual_scenes", "estimated_seconds", "viral_score", "analysis"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("The AI Engine returned an empty response.");

    const data = JSON.parse(text.trim());
    return {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      topic,
      generated_at: Date.now()
    } as ViralScript;
  } catch (error: any) {
    if (error.message?.includes("API_KEY")) {
      throw new Error("Missing or Invalid API Key. Please check your setup.");
    }
    throw new Error(error.message || "Failed to generate viral script. Please try again.");
  }
};

export const generateScriptAudio = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Read this script naturally: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("Audio synthesis failed.");
    return base64Audio;
  } catch (e: any) {
    throw new Error("AI Voice system is currently busy. Try later.");
  }
};

export const generateHookVisual = async (hookDescription: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Cinematic viral video frame representing: ${hookDescription}. Ultra-high quality, professional lighting, modern aesthetics.` }],
      },
      config: { imageConfig: { aspectRatio: "16:9" } },
    });
    
    let base64Image = "";
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        base64Image = part.inlineData.data;
        break;
      }
    }
    if (!base64Image) throw new Error("Visual generation failed.");
    return `data:image/png;base64,${base64Image}`;
  } catch (e: any) {
    throw new Error("Visualization engine is offline. Please try again.");
  }
};
