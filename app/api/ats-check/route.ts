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
          content: `Perform a detailed ATS (Applicant Tracking System) check on this resume. Return:
{
  "score": <ATS compatibility score 0-100>,
  "sections": [
    { "name": "Formatting", "score": <0-100>, "feedback": "<feedback>" },
    { "name": "Keywords", "score": <0-100>, "feedback": "<feedback>" },
    { "name": "File Structure", "score": <0-100>, "feedback": "<feedback>" },
    { "name": "Contact Info", "score": <0-100>, "feedback": "<feedback>" }
  ],
  "suggestions": [
    { "type": "error|warning|tip", "text": "<specific ATS fix>" }
  ]
}

Check for: tables/columns (ATS can't parse), fancy fonts, headers/footers, images, missing keywords, non-standard section names, special characters.

RESUME:
${resumeText}`,
        },
      ],
    })

    const data = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'ATS check failed' }, { status: 500 })
  }
}
