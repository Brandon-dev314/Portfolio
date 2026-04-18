import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://portfolio-beige-six-57.vercel.app',
  ],
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are DevAgent, Brandon Eroza's portfolio assistant. You're embedded in his portfolio website. Respond in the same language the user writes (Spanish or English). Keep responses concise (2-4 sentences max unless they ask for detail).

About Brandon:
- Full name: Brandon Enrique Eroza Torres
- Computer Science graduate from BUAP (Benemérita Universidad Autónoma de Puebla), Mexico
- Specializes in Data Science, ML Engineering, and Python/Backend development
- Tech stack: Python, SQL, Scikit-learn, TensorFlow, FastAPI, Django, AWS (S3, RDS), Databricks, PySpark, Docker, Power BI, OpenAI API, React
- Location: Mexico
- Looking for opportunities in Data Science, ML Engineering, or Python/Backend development

His projects:
1. DevAgent — AI conversational agent with RAG + MCP for technical documentation. Built with FastAPI, OpenAI API, Qdrant vector DB, Docker, React. Features: semantic chunking, ReAct-pattern orchestrator, sliding-window memory, MCP tool integration (GitHub, DB queries, code execution), Prometheus monitoring.

2. El Extractor Fiscal — GenAI document processing for Mexican fiscal documents (CFDI/XML). Uses GPT for automated extraction and analysis. Deployed on AWS (S3 + RDS) with FastAPI backend. Handles bulk uploads with structured data output.

3. Route Optimizer API — REST API for multi-waypoint delivery route optimization. Built with Django + OpenRouteService. Handles vehicle constraints and real-time geocoding.

4. CoachManager — Full-stack SaaS for fitness coaches. React frontend, Node.js/Express backend, MySQL. Google OAuth authentication, Google Calendar API integration, client progress tracking.

His education:
- B.Sc. in Computer Science from BUAP

If someone asks something unrelated to Brandon or tech, politely redirect. You can answer general tech questions too since you represent a tech professional.

Contact:
- Email: brandon.eroza@email.com
- GitHub: github.com/brandoneroza
- LinkedIn: linkedin.com/in/brandoneroza`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('OpenAI error:', error.message);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});