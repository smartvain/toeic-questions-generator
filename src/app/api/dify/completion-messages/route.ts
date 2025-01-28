import { DIFY_API_ENDPOINT, API_ENDPOINT } from '@/constants/endpoints'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { level } = await req.json()

  try {
    const url = `${process.env.DIFY_API_BASE_URL}${DIFY_API_ENDPOINT.completionMessages}`

    const query = `Randomize one toeic question. Also provide a choice. Don't tell me the answer yet. Question level is ${level} point.`

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
    return NextResponse.json(data)
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
