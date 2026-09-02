import { GoogleGenAI } from '@google/genai';
import portfolioData from '../../src/data/portfolio-data.json';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const generateFallback = (queryStr: string) => {
      const q = queryStr.toLowerCase();
      if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('app')) {
        const list = portfolioData.projects
          .map((p) => `* **${p.title}** (${p.category}): ${p.summary}`)
          .join('\n');
        return `Here are some of Aryan's key projects:\n\n${list}`;
      }
      if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('tool')) {
        const list = portfolioData.techStack
          .map((t) => `* **${t.name}** (${t.category}): ${t.description}`)
          .join('\n');
        return `Here is Aryan's tech stack:\n\n${list}`;
      }
      if (
        q.includes('contact') ||
        q.includes('email') ||
        q.includes('phone') ||
        q.includes('linkedin') ||
        q.includes('reach')
      ) {
        const p = portfolioData.personal;
        return `You can reach **Aryan Sen** directly:\n\n* 📞 **Phone**: ${p.phone}\n* ✉️ **Email**: ${p.email}\n* 💼 **LinkedIn**: [Aryan Sen on LinkedIn](${p.linkedinUrl})\n* 📸 **Instagram**: [${p.instagram}](${p.instagramUrl})\n* 📍 **Location**: ${p.location}`;
      }
      if (q.includes('resume') || q.includes('cv') || q.includes('hire') || q.includes('internship')) {
        return `Aryan's resume is available upon request! Contact him directly at **aryansenn123@gmail.com** or **+91 7206510712**.`;
      }
      return `I'm designed to answer questions about Aryan's portfolio! Feel free to ask about his **projects**, **tech stack**, **education at GTU**, or **contact details**.`;
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ reply: generateFallback(message) }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });

      const chatContents = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history) {
          if (item.text && item.role) {
            chatContents.push({
              role: item.role === 'assistant' ? 'model' : item.role,
              parts: [{ text: item.text }],
            });
          }
        }
      }

      chatContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: chatContents,
        config: {
          systemInstruction: `You are "Aryan AI", an assistant for Aryan Sen's portfolio. Use ONLY this data:\n${JSON.stringify(
            portfolioData
          )}`,
          temperature: 0.6,
        },
      });

      const reply = response.text || generateFallback(message);
      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (geminiError: any) {
      console.error('Gemini error in Netlify Function:', geminiError);
      return new Response(JSON.stringify({ reply: generateFallback(message) }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err: any) {
    console.error('Netlify function error:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
