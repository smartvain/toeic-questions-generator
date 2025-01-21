'use client'

import React, { useState } from 'react'
import {
  Container,
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material'
import { generateToeicQuestion } from '../api/difyApi'

export function App() {
  const [question, setQuestion] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [inputText, setInputText] = useState('')
  const [selectedPattern, setSelectedPattern] = useState('basic')

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
          ✨ TOEIC問題ジェネレーター
        </Typography>

        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="subtitle1" gutterBottom>
            改善したい文章
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="改善したい文章を入力してください..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Typography
            variant="caption"
            align="right"
            display="block"
            sx={{ mb: 3 }}
          >
            {inputText.length} / 1000文字
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            TOEIC問題パターン（任意）
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
            >
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="基本形 - 万能でどんな状況にも適応可能"
              />
              <FormControlLabel
                value="common"
                control={<Radio />}
                label="常識の否定 - 既成概念を覆す"
              />
              <FormControlLabel
                value="news"
                control={<Radio />}
                label="一般的なニュース - 情報を軸に展開"
              />
              <FormControlLabel
                value="impact"
                control={<Radio />}
                label="衝撃的なニュース - 驚きや感動を伴う"
              />
              <FormControlLabel
                value="steps"
                control={<Radio />}
                label="ステップ紹介 - 具体的な手順を示す"
              />
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleGenerateQuestion}
              disabled={loading || !inputText.trim()}
            >
              ✨ TOEIC問題を生成
            </Button>
          </Box>
        </Paper>

        {question && (
          <Paper
            elevation={0}
            sx={{ mt: 4, p: 3, bgcolor: 'background.paper' }}
          >
            <Typography variant="h6">生成された構文:</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {JSON.stringify(question, null, 2)}
            </pre>
          </Paper>
        )}
      </Box>
    </Container>
  )
}
