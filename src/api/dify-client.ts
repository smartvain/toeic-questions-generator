import { API_ENDPOINT } from '@/constants/endpoints'

export class DifyClient {
  static async generateToeicQuestion({ level }: { level: string }) {
    const url = API_ENDPOINT.completionMessages

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ level }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to generate TOEIC question:', error)
    }
  }
}
