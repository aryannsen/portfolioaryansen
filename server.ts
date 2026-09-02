import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Google GenAI client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment variables.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Load portfolio-data.json
  const portfolioDataPath = path.join(process.cwd(), 'src', 'data', 'portfolio-data.json');
  let portfolioContext = '';
  try {
    if (fs.existsSync(portfolioDataPath)) {
      portfolioContext = fs.readFileSync(portfolioDataPath, 'utf-8');
    }
  } catch (err) {
    console.error('Error reading portfolio-data.json:', err);
  }

  const SYSTEM_INSTRUCTION = `You are "Aryan AI", an intelligent, polite, friendly, and concise personal AI assistant for Aryan Sen's Portfolio.

Your mission is to answer questions from visitors, recruiters, and peers about Aryan's profile, education, projects, technical skills, military background (NDA prep & NCC cadet), certificates, achievements, and contact details.

CRITICAL INSTRUCTIONS & BOUNDARIES:
1. You MUST ONLY answer questions using the provided Portfolio Data below.
2. If a user asks anything UNRELATED to Aryan, his career, education, projects, skills, or portfolio, politely refuse by saying EXACTLY:
"I'm designed to answer questions about Aryan and his portfolio."
3. Keep your answers clear, professional, warm, and nicely formatted in Markdown (use bullet points, bold text, and short paragraphs).
4. If a user asks for contact info, provide his phone (+91 7206510712), email (aryansenn123@gmail.com), Instagram (@aryannsen), and LinkedIn.
5. If a user asks to see his resume or download it, inform them that they can click the "Resume" / "Get in Touch" buttons on the website or contact him directly.

PORTFOLIO DATA JSON:
${portfolioContext}`;

  // Smart fallback response generator for portfolio questions when API rate limits occur or API key is offline
  const generateFallbackResponse = (query: string, data: any): string => {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('app')) {
      if (data?.projects?.length) {
        const list = data.projects
          .map((p: any) => `* **${p.title}** (${p.category}): ${p.summary}`)
          .join('\n');
        return `Here are some of Aryan's key projects:\n\n${list}\n\n*Note: AI service is running in local fallback mode due to high traffic.*`;
      }
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('tool')) {
      if (data?.techStack?.length) {
        const list = data.techStack
          .map((t: any) => `* **${t.name}** (${t.category}): ${t.description}`)
          .join('\n');
        return `Here is Aryan's tech stack & tools:\n\n${list}\n\n*Note: AI service is running in local fallback mode due to high traffic.*`;
      }
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('linkedin') || q.includes('instagram')) {
      const p = data?.personal || {};
      return `You can reach **Aryan Sen** directly:\n\n* 📞 **Phone**: ${p.phone || '+91 7206510712'}\n* ✉️ **Email**: ${p.email || 'aryansenn123@gmail.com'}\n* 💼 **LinkedIn**: [Aryan Sen on LinkedIn](${p.linkedinUrl || 'https://www.linkedin.com/in/aryannsen/'})\n* 📸 **Instagram**: [${p.instagram || '@aryannsen'}](${p.instagramUrl || 'https://www.instagram.com/aryannsen/'})\n* 📍 **Location**: ${p.location || 'Gujarat, India'}`;
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('hire') || q.includes('internship')) {
      return `Aryan's resume is available upon request! You can click the contact buttons on the website or reach him directly at **aryansenn123@gmail.com** or **+91 7206510712** to request a full copy.`;
    }

    if (q.includes('journey') || q.includes('nda') || q.includes('ncc') || q.includes('background') || q.includes('history')) {
      if (data?.journey?.length) {
        const list = data.journey
          .map((j: any) => `* **${j.year}** - **${j.title}**: ${j.description}`)
          .join('\n');
        return `Here is a timeline of Aryan's journey:\n\n${list}`;
      }
    }

    if (q.includes('who') || q.includes('about') || q.includes('aryan') || q.includes('education') || q.includes('university') || q.includes('gtu')) {
      const p = data?.personal || {};
      return `**Aryan Sen** is a **Second-Year B.Tech Information Technology student** at **Gujarat Technological University (GTU)**.\n\n* 🎓 **Degree**: Bachelor of Technology (IT)\n* 🚀 **Focus**: Web development, Data Structures & Algorithms, and AI integrations\n* 🎖️ **Background**: Qualified NDA written exam & served as an Army Wing NCC cadet\n* 📍 **Location**: Gujarat, India`;
    }

    return `I'm designed to answer questions about Aryan's portfolio! Feel free to ask about his **projects**, **tech stack**, **education at GTU**, **military background**, or **contact information**.`;
  };

  // API Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      let parsedPortfolio = null;
      try {
        parsedPortfolio = JSON.parse(portfolioContext);
      } catch (e) {
        // ignore
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('GEMINI_API_KEY missing, serving local intelligent fallback.');
        const fallbackReply = generateFallbackResponse(message, parsedPortfolio);
        return res.json({ reply: fallbackReply });
      }

      try {
        const ai = getAiClient();

        // Format previous chat history for model contents
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

        // Append current user message
        chatContents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: chatContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.6,
          },
        });

        const replyText = response.text || generateFallbackResponse(message, parsedPortfolio);

        return res.json({ reply: replyText });
      } catch (geminiErr: any) {
        console.error('Gemini API execution error:', geminiErr?.message || geminiErr);

        // Check if rate limit / quota exceeded error (429 / RESOURCE_EXHAUSTED)
        const errMsg = String(geminiErr?.message || geminiErr);
        const isQuotaError = errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('Quota exceeded') || errMsg.includes('rate limit');

        if (isQuotaError) {
          console.log('Serving intelligent fallback response due to API quota limit.');
          const fallbackReply = generateFallbackResponse(message, parsedPortfolio);
          return res.json({ reply: fallbackReply });
        }

        // Return local portfolio answer if any other AI error occurs
        const fallbackReply = generateFallbackResponse(message, parsedPortfolio);
        return res.json({ reply: fallbackReply });
      }
    } catch (error: any) {
      console.error('Error in /api/chat route:', error);
      return res.status(500).json({
        error: 'An unexpected error occurred. Please try again.',
      });
    }
  });

  // Vite Middleware in Development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
