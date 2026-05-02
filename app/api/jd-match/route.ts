import { NextRequest, NextResponse } from 'next/server'
import openai, { SYSTEM_PROMPT } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json()
    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json({ error: 'Both resume and job description are required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Compare this resume against the job description and return:
{
  "score": <match percentage 0-100>,
  "sections": [
    { "name": "Required Skills Match", "score": <0-100>, "feedback": "<which skills present/missing>" },
    { "name": "Experience Match", "score": <0-100>, "feedback": "<feedback>" },
    { "name": "Keywords Match", "score": <0-100>, "feedback": "<which keywords present/missing>" },
    { "name": "Education Match", "score": <0-100>, "feedback": "<feedback>" }
  ],
  "suggestions": [
    { "type": "error|warning|tip", "text": "<specific gap or improvement>" }
  ],
  "rewritten": "Here are the key missing keywords and phrases to add to your resume:\n<list of specific additions>"
}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}`,
        },
      ],
    })

    const data = JSON.parse(completion.choices[0].message.content || '{}')
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'JD match failed' }, { status: 500 })
  }
}
