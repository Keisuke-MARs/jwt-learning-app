"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, RotateCcw, Lightbulb } from "lucide-react"

interface JwtPuzzleProps {
  onScoreUpdate: (score: number) => void
}

interface PuzzlePiece {
  id: string
  content: string
  type: "header" | "payload" | "signature"
  isCorrect: boolean
}

const puzzlePieces: PuzzlePiece[] = [
  // Header pieces
  { id: "h1", content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", type: "header", isCorrect: true },
  { id: "h2", content: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9", type: "header", isCorrect: false },
  { id: "h3", content: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0", type: "header", isCorrect: false },

  // Payload pieces
  {
    id: "p1",
    content: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
    type: "payload",
    isCorrect: true,
  },
  { id: "p2", content: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", type: "payload", isCorrect: false },
  { id: "p3", content: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", type: "payload", isCorrect: false },

  // Signature pieces
  { id: "s1", content: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", type: "signature", isCorrect: true },
  { id: "s2", content: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0", type: "signature", isCorrect: false },
  { id: "s3", content: "invalid-signature-example", type: "signature", isCorrect: false },
]

const correctAnswers = {
  header: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  payload: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
  signature: "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
}

export function JwtPuzzle({ onScoreUpdate }: JwtPuzzleProps) {
  const [selectedPieces, setSelectedPieces] = useState<{
    header: string | null
    payload: string | null
    signature: string | null
  }>({
    header: null,
    payload: null,
    signature: null,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [currentStep, setCurrentStep] = useState<"header" | "payload" | "signature">("header")

  const selectPiece = (piece: PuzzlePiece) => {
    if (isSubmitted) return

    setSelectedPieces((prev) => ({
      ...prev,
      [piece.type]: piece.content,
    }))

    // 自動的に次のステップに進む
    if (piece.type === "header") {
      setCurrentStep("payload")
    } else if (piece.type === "payload") {
      setCurrentStep("signature")
    }
  }

  const checkAnswer = () => {
    setIsSubmitted(true)

    let correctCount = 0
    if (selectedPieces.header === correctAnswers.header) correctCount++
    if (selectedPieces.payload === correctAnswers.payload) correctCount++
    if (selectedPieces.signature === correctAnswers.signature) correctCount++

    const score = Math.round((correctCount / 3) * 100)
    onScoreUpdate(score)
  }

  const reset = () => {
    setSelectedPieces({ header: null, payload: null, signature: null })
    setIsSubmitted(false)
    setShowHint(false)
    setCurrentStep("header")
  }

  const isComplete = selectedPieces.header && selectedPieces.payload && selectedPieces.signature

  const getStepColor = (step: "header" | "payload" | "signature") => {
    if (isSubmitted) {
      const isCorrect = selectedPieces[step] === correctAnswers[step]
      return isCorrect ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
    }
    return currentStep === step ? "bg-blue-100 border-blue-300" : "bg-gray-50 border-gray-200"
  }

  const getStepIcon = (step: "header" | "payload" | "signature") => {
    if (!isSubmitted) return null
    const isCorrect = selectedPieces[step] === correctAnswers[step]
    return isCorrect ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />
  }

  return (
    <div className="space-y-6">
      {/* 説明 */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          JWTは「ヘッダー.ペイロード.署名」の3つの部分で構成されています。
          各部分に適切な内容を選択して、正しいJWTを組み立ててください。
        </AlertDescription>
      </Alert>

      {/* JWT構造表示 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">JWT構造を組み立てよう</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Header */}
          <Card className={`p-4 border-2 ${getStepColor("header")}`}>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-blue-500 text-white">
                ヘッダー
              </Badge>
              {getStepIcon("header")}
            </div>
            <div className="min-h-[60px] flex items-center">
              {selectedPieces.header ? (
                <div className="font-mono text-xs break-all p-2 bg-white rounded border">{selectedPieces.header}</div>
              ) : (
                <div className="text-gray-400 text-center w-full">ヘッダーを選択してください</div>
              )}
            </div>
          </Card>

          {/* Payload */}
          <Card className={`p-4 border-2 ${getStepColor("payload")}`}>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-purple-500 text-white">
                ペイロード
              </Badge>
              {getStepIcon("payload")}
            </div>
            <div className="min-h-[60px] flex items-center">
              {selectedPieces.payload ? (
                <div className="font-mono text-xs break-all p-2 bg-white rounded border">{selectedPieces.payload}</div>
              ) : (
                <div className="text-gray-400 text-center w-full">ペイロードを選択してください</div>
              )}
            </div>
          </Card>

          {/* Signature */}
          <Card className={`p-4 border-2 ${getStepColor("signature")}`}>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-green-500 text-white">
                署名
              </Badge>
              {getStepIcon("signature")}
            </div>
            <div className="min-h-[60px] flex items-center">
              {selectedPieces.signature ? (
                <div className="font-mono text-xs break-all p-2 bg-white rounded border">
                  {selectedPieces.signature}
                </div>
              ) : (
                <div className="text-gray-400 text-center w-full">署名を選択してください</div>
              )}
            </div>
          </Card>
        </div>

        {/* 完成したJWT */}
        {isComplete && (
          <Card className="p-4 bg-gray-50">
            <h4 className="font-semibold mb-2">完成したJWT:</h4>
            <div className="font-mono text-sm break-all p-3 bg-white rounded border">
              {selectedPieces.header}.{selectedPieces.payload}.{selectedPieces.signature}
            </div>
          </Card>
        )}
      </div>

      {/* 選択肢 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">
            ステップ {currentStep === "header" ? "1" : currentStep === "payload" ? "2" : "3"}:
            {currentStep === "header" ? "ヘッダー" : currentStep === "payload" ? "ペイロード" : "署名"}を選択
          </h4>
          <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
            <Lightbulb className="h-4 w-4 mr-2" />
            ヒント
          </Button>
        </div>

        {showHint && (
          <Alert>
            <AlertDescription>
              {currentStep === "header" && "ヘッダーには署名アルゴリズム（alg）とトークンタイプ（typ）が含まれます。"}
              {currentStep === "payload" && "ペイロードにはユーザー情報（sub, name）と発行時刻（iat）が含まれます。"}
              {currentStep === "signature" && "署名はヘッダーとペイロードから生成される検証用の文字列です。"}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {puzzlePieces
            .filter((piece) => piece.type === currentStep)
            .map((piece) => (
              <Button
                key={piece.id}
                variant={selectedPieces[piece.type] === piece.content ? "default" : "outline"}
                className="h-auto p-3 text-left"
                onClick={() => selectPiece(piece)}
                disabled={isSubmitted}
              >
                <div className="font-mono text-xs break-all">{piece.content}</div>
              </Button>
            ))}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex gap-4">
        {!isSubmitted ? (
          <Button onClick={checkAnswer} disabled={!isComplete} className="flex-1">
            答えを確認
          </Button>
        ) : (
          <Button onClick={reset} variant="outline" className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            もう一度挑戦
          </Button>
        )}
      </div>

      {/* 結果表示 */}
      {isSubmitted && (
        <Card className="p-4">
          <div className="space-y-3">
            <h4 className="font-semibold">結果:</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>ヘッダー:</span>
                {selectedPieces.header === correctAnswers.header ? (
                  <Badge className="bg-green-500">正解</Badge>
                ) : (
                  <Badge variant="destructive">不正解</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>ペイロード:</span>
                {selectedPieces.payload === correctAnswers.payload ? (
                  <Badge className="bg-green-500">正解</Badge>
                ) : (
                  <Badge variant="destructive">不正解</Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span>署名:</span>
                {selectedPieces.signature === correctAnswers.signature ? (
                  <Badge className="bg-green-500">正解</Badge>
                ) : (
                  <Badge variant="destructive">不正解</Badge>
                )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded">
              <h5 className="font-semibold mb-2">解説:</h5>
              <ul className="text-sm space-y-1">
                <li>• ヘッダー: アルゴリズム（HS256）とタイプ（JWT）を指定</li>
                <li>• ペイロード: ユーザー情報と発行時刻を含む</li>
                <li>• 署名: ヘッダーとペイロードの改ざんを検出するため</li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
