import { NextRequest, NextResponse } from 'next/server'
import openai, { SYSTEM_PROMPT } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { resumeText, linkedinUrl } = await req.json()
    const content = resumeText || linkedinUrl
    if (!content?.trim()) {
      return NextResponse.json({ error: 'LinkedIn profile content is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Audit this LinkedIn profile and return a JSON object:
{
  "score": <overall score 0-100>,
  "sections": [
    { "name": "<section>", "score": <0-100>, "feedback": "<feedback>" }
  ],
  "suggestions": [
    { "type": "error|warning|tip", "text": "<actionable suggestion>" }
  ],
  "rewritten": "<rewritten headline and summary in a professional, keyword-rich style>"
}

Evaluate: Profile Photo (advise), Headline, Summary/About, Experience descriptions, Skills & Endorsements, Recommendations, Activity & Posts.

LINKEDIN PROFILE:
${content}`,
        },
      ],
    })

    const data = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'LinkedIn audit failed' }, { status: 500 })
  }
}
