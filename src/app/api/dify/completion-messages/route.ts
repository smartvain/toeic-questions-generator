import { DIFY_API_ENDPOINT, API_ENDPOINT } from '@/constants/endpoints'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { level } = await req.json()

  try {
    const url = `${process.env.DIFY_API_BASE_URL}${DIFY_API_ENDPOINT.completionMessages}`

    const query = `Generate one TOEIC question at ${level} point level.

Return ONLY a valid JSON object in this exact format (no markdown, no code blocks):
{
  "question": "The question text here",
  "choices": {
    "A": "First choice",
    "B": "Second choice",
    "C": "Third choice",
    "D": "Fourth choice"
  },
  "answer": "A",
  "explanation": "Explanation of why this answer is correct in Japanese"
}`

    const body = {
      inputs: {
        query,
      },
      response_mode: 'blocking',
      user: 'Hoge',
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Parse the JSON from Dify's answer field
    const answerText = data.answer || ''
    const jsonMatch = answerText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const questionData = JSON.parse(jsonMatch[0])
      return NextResponse.json({ question: questionData })
    }

    return NextResponse.json({ error: 'Failed to parse question' }, { status: 500 })
  } catch (error) {
    console.error(
      `Internal server error: ${API_ENDPOINT.completionMessages} route`,
      error
    )
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
