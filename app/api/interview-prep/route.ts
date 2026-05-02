import { NextRequest, NextResponse } from 'next/server'
import openai, { SYSTEM_PROMPT } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { resumeText, targetRole } = await req.json()
    if (!resumeText?.trim()) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Generate interview preparation questions and model answers based on this resume${targetRole ? ` for the target role: ${targetRole}` : ''}.

Return:
{
  "questions": [
    {
      "question": "<likely interview question>",
      "answer": "<tailored model answer using STAR method where applicable, referencing specific experience from the resume>"
    }
  ]
}

Generate 8 questions covering:
- 2 behavioural questions (Tell me about a time...)
- 2 technical/role-specific questions
- 2 experience-based questions
- 1 strengths question
- 1 career goals question

Make answers specific to their actual experience, not generic.

RESUME:
${resumeText}`,
        },
      ],
    })

    const data = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Interview prep failed' }, { status: 500 })
  }
}
