import { NextRequest, NextResponse } from 'next/server'
import openai, { SYSTEM_PROMPT } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json()
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
          content: `Review this resume and return a JSON object with this exact structure:
{
  "score": <overall score 0-100>,
  "sections": [
    { "name": "<section name>", "score": <0-100>, "feedback": "<specific feedback>" }
  ],
  "suggestions": [
    { "type": "error|warning|tip", "text": "<actionable suggestion>" }
  ]
}

Sections to evaluate: Contact Info, Summary/Objective, Work Experience, Education, Skills, Formatting & ATS.
Provide 8-12 suggestions ordered by priority (errors first, then warnings, then tips).

RESUME:
${resumeText}`,
        },
      ],
    })

    const raw = completion.choices[0].message.content || '{}'
    const data = JSON.parse(raw)
    return NextResponse.json(data)
  } catch (err: any) {
    console.error('Resume review error:', err)
    return NextResponse.json({ error: err.message || 'AI review failed' }, { status: 500 })
  }
}
