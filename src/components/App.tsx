'use client'

import React, { useState } from 'react'
import {
  Container,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material'
import { generateToeicQuestion } from '../api/difyApi'

export function App() {
  const [question, setQuestion] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateQuestion = async () => {
    setLoading(true)
    try {
      const generatedQuestion = await generateToeicQuestion()
      setQuestion(generatedQuestion)
    } catch (error) {
      console.error('問題生成中にエラーが発生しました:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TOEIC問題ジェネレーター
        </Typography>

        <Button
          variant="contained"
          onClick={handleGenerateQuestion}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : '問題を生成'}
        </Button>

        {question && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">生成された問題:</Typography>
            <pre>{JSON.stringify(question, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </Container>
  )
}
