'use client'

import React, { useState } from 'react'
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material'
import { DifyClient } from '@/api/dify-client'

export function App() {
  const [question, setQuestion] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState('500')

  const handleGenerateQuestion = async () => {
    setLoading(true)
    try {
      const response = await DifyClient.generateToeicQuestion({
        level: selectedLevel,
      })
      const question = response.answer
      setQuestion(question)
    } catch (error) {
      console.error('Error generating question:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ✨ TOEIC Question Generator
        </Typography>

        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="subtitle1" gutterBottom>
            Question Level
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <FormControlLabel
                value="500"
                control={<Radio />}
                label="500 point level"
              />
              <FormControlLabel
                value="600"
                control={<Radio />}
                label="600 point level"
              />
              <FormControlLabel
                value="700"
                control={<Radio />}
                label="700 point level"
              />
              <FormControlLabel
                value="800"
                control={<Radio />}
                label="800 point level"
              />
              <FormControlLabel
                value="900"
                control={<Radio />}
                label="900 point level"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGenerateQuestion}
              disabled={loading}
            >
              ✨ Generate
            </Button>
          </Box>
        </Paper>

        {question && (
          <Paper
            elevation={0}
            sx={{ mt: 4, p: 3, bgcolor: 'background.paper' }}
          >
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {question}
            </pre>
          </Paper>
        )}
      </Box>
    </Container>
  )
}
