import { NextRequest, NextResponse } from 'next/server'
import openai, { SYSTEM_PROMPT } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json()
    if (!resumeText?.trim()) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Write a compelling, personalised cover letter based on this resume${jobDescription ? ' and job description' : ''}.

Requirements:
- Professional but warm tone
- 3-4 short paragraphs
- Opening: hook with why you are excited about this role/company
- Middle: 2-3 specific achievements from the resume that match the role
- Closing: confident call to action
- Do NOT use generic phrases like "I am writing to apply for..."
- Sound like a real human wrote it, not an AI

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}\n\n` : ''}
RESUME:
${resumeText}

Return only the cover letter text, no JSON, no explanation.`,
        },
      ],
    })

    const raw = completion.choices[0].message.content || ''
    return NextResponse.json({ raw })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Cover letter generation failed' }, { status: 500 })
  }
}
