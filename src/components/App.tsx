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
  Alert,
  Collapse,
} from '@mui/material'
import { DifyClient } from '@/api/dify-client'
import { ToeicQuestion, ChoiceKey } from '@/types/question'

export function App() {
  const [question, setQuestion] = useState<ToeicQuestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState('500')
  const [selectedAnswer, setSelectedAnswer] = useState<ChoiceKey | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleGenerateQuestion = async () => {
    setLoading(true)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowExplanation(false)

    try {
      const response = await DifyClient.generateToeicQuestion({
        level: selectedLevel,
      })
      setQuestion(response.question)
    } catch (error) {
      console.error('Error generating question:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      setIsAnswered(true)
    }
  }

  const handleNextQuestion = () => {
    setQuestion(null)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setShowExplanation(false)
  }

  const isCorrect = selectedAnswer === question?.answer

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TOEIC Question Generator
        </Typography>

        {!question && (
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
                {loading ? 'Generating...' : 'Generate Question'}
              </Button>
            </Box>
          </Paper>
        )}

        {question && (
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>
              Question
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
              {question.question}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={selectedAnswer || ''}
                onChange={(e) => setSelectedAnswer(e.target.value as ChoiceKey)}
              >
                {(Object.keys(question.choices) as ChoiceKey[]).map((key) => {
                  const isThisCorrect = key === question.answer
                  const isThisSelected = key === selectedAnswer

                  let color = 'inherit'
                  if (isAnswered) {
                    if (isThisCorrect) color = 'success.main'
                    else if (isThisSelected && !isThisCorrect) color = 'error.main'
                  }

                  return (
                    <FormControlLabel
                      key={key}
                      value={key}
                      disabled={isAnswered}
                      control={<Radio />}
                      label={
                        <Typography sx={{ color }}>
                          {key}. {question.choices[key]}
                        </Typography>
                      }
                      sx={{
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: isAnswered && isThisCorrect ? 'success.light' : 'transparent',
                        '&:hover': {
                          bgcolor: isAnswered ? undefined : 'action.hover',
                        },
                      }}
                    />
                  )
                })}
              </RadioGroup>
            </FormControl>

            {!isAnswered && (
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                sx={{ mt: 2 }}
              >
                Submit Answer
              </Button>
            )}

            {isAnswered && (
              <Box sx={{ mt: 3 }}>
                <Alert severity={isCorrect ? 'success' : 'error'} sx={{ mb: 2 }}>
                  {isCorrect ? 'Correct!' : `Incorrect. The correct answer is ${question.answer}.`}
                </Alert>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                </Button>

                <Collapse in={showExplanation}>
                  <Paper
                    elevation={0}
                    sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Explanation
                    </Typography>
                    <Typography variant="body2">
                      {question.explanation}
                    </Typography>
                  </Paper>
                </Collapse>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleNextQuestion}
                  sx={{ mt: 3 }}
                >
                  Next Question
                </Button>
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Container>
  )
}
