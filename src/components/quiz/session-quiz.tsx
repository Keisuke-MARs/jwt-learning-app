"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, RotateCcw, ArrowRight, GripVertical, Lightbulb } from "lucide-react"

interface SessionQuizProps {
  onScoreUpdate: (score: number) => void
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  type: "multiple-choice" | "sequence"
}

interface SequenceItem {
  id: string
  content: string
  correctOrder: number
}

const sequenceItems: SequenceItem[] = [
  { id: "step1", content: "ユーザーがログイン情報（ユーザー名・パスワード）を送信", correctOrder: 1 },
  { id: "step2", content: "サーバーが認証を行い、セッションを作成してセッションストアに保存", correctOrder: 2 },
  { id: "step3", content: "サーバーがセッションIDをCookieとしてクライアントに返却", correctOrder: 3 },
  { id: "step4", content: "クライアントが以降のリクエストでCookieを自動送信", correctOrder: 4 },
  { id: "step5", content: "サーバーがセッションIDを使ってセッションストアから情報を検証", correctOrder: 5 },
]

const questions: Question[] = [
  {
    id: "q1",
    question: "セッションIDはどこに保存されるのが一般的ですか？",
    options: ["LocalStorage", "SessionStorage", "HTTPOnly Cookie", "URLパラメータ"],
    correctAnswer: 2,
    explanation: "HTTPOnly Cookieに保存することで、JavaScriptからアクセスできないようにしてXSS攻撃を防ぎます。",
    type: "multiple-choice",
  },
  {
    id: "q2",
    question: "セッションベース認証の主なメリットは何ですか？",
    options: [
      "サーバーリソースを消費しない",
      "スケーリングが容易",
      "サーバー側でセッションを即座に無効化できる",
      "クロスドメイン対応が簡単",
    ],
    correctAnswer: 2,
    explanation: "サーバー側でセッション情報を管理しているため、必要に応じて即座にセッションを無効化できます。",
    type: "multiple-choice",
  },
  {
    id: "q3",
    question: "CSRF攻撃に対してセッション認証が脆弱な理由は？",
    options: [
      "セッションIDが暗号化されていない",
      "Cookieが自動的に送信される",
      "セッションの有効期限が長い",
      "セッションIDが推測しやすい",
    ],
    correctAnswer: 1,
    explanation:
      "Cookieは同一オリジンのリクエストで自動的に送信されるため、悪意のあるサイトからのリクエストでも送信されてしまいます。",
    type: "multiple-choice",
  },
  {
    id: "q4",
    question: "セッションストアとして適していないものは？",
    options: ["Redis", "データベース", "メモリ（単一サーバーの場合）", "クライアントのLocalStorage"],
    correctAnswer: 3,
    explanation:
      "セッション情報はサーバー側で管理する必要があります。クライアント側に保存する���改ざんされる可能性があります。",
    type: "multiple-choice",
  },
]

export function SessionQuiz({ onScoreUpdate }: SessionQuizProps) {
  const [currentStep, setCurrentStep] = useState<"sequence" | "questions">("sequence")
  const [sequenceOrder, setSequenceOrder] = useState<SequenceItem[]>([...sequenceItems].sort(() => Math.random() - 0.5))
  const [isSequenceSubmitted, setIsSequenceSubmitted] = useState(false)
  const [sequenceScore, setSequenceScore] = useState<number | null>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1))
  const [isQuestionsSubmitted, setIsQuestionsSubmitted] = useState(false)
  const [questionsScore, setQuestionsScore] = useState<number | null>(null)

  const [showHint, setShowHint] = useState(false)
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [dragOverItem, setDragOverItem] = useState<number | null>(null)

  // ドラッグ開始
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isSequenceSubmitted) return
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = "move"
  }

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (isSequenceSubmitted) return
    setDragOverItem(index)
  }

  // ドラッグ終了
  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverItem(null)
  }

  // ドロップ
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (isSequenceSubmitted || draggedItem === null) return

    const newOrder = [...sequenceOrder]
    const draggedItemData = newOrder[draggedItem]

    // アイテムを削除
    newOrder.splice(draggedItem, 1)

    // 新しい位置に挿入
    newOrder.splice(dropIndex, 0, draggedItemData)

    setSequenceOrder(newOrder)
    setDraggedItem(null)
    setDragOverItem(null)
  }

  // 上下移動ボタン
  const moveItem = (index: number, direction: "up" | "down") => {
    if (isSequenceSubmitted) return

    const newOrder = [...sequenceOrder]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= newOrder.length) return // アイテムを交換
    ;[newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]]
    setSequenceOrder(newOrder)
  }

  // シーケンス回答チェック
  const checkSequenceAnswer = () => {
    setIsSequenceSubmitted(true)

    let correctCount = 0
    sequenceOrder.forEach((item, index) => {
      if (item.correctOrder === index + 1) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / sequenceItems.length) * 100)
    setSequenceScore(score)
  }

  // シーケンスリセット
  const resetSequence = () => {
    setSequenceOrder([...sequenceItems].sort(() => Math.random() - 0.5))
    setIsSequenceSubmitted(false)
    setSequenceScore(null)
    setShowHint(false)
  }

  // 質問回答選択
  const selectAnswer = (answerIndex: number) => {
    if (isQuestionsSubmitted) return

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  // 次の質問
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  // 前の質問
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // 質問回答チェック
  const submitQuestions = () => {
    setIsQuestionsSubmitted(true)

    let correctCount = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / questions.length) * 100)
    setQuestionsScore(score)
  }

  // 質問リセット
  const resetQuestions = () => {
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(-1))
    setIsQuestionsSubmitted(false)
    setQuestionsScore(null)
  }

  // 全体リセット
  const resetAll = () => {
    setCurrentStep("sequence")
    resetSequence()
    resetQuestions()
  }

  // ステップ進行
  const proceedToQuestions = () => {
    setCurrentStep("questions")
  }

  // 最終スコア計算
  useEffect(() => {
    if (sequenceScore !== null && questionsScore !== null) {
      const finalScore = Math.round((sequenceScore + questionsScore) / 2)
      onScoreUpdate(finalScore)
    }
  }, [sequenceScore, questionsScore, onScoreUpdate])

  if (currentStep === "sequence") {
    return (
      <div className="space-y-6">
        {/* 説明 */}
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            セッション認証の流れを正しい順序に並び替えてください。各ステップをドラッグ&ドロップまたは矢印ボタンで移動できます。
          </AlertDescription>
        </Alert>

        {/* 進捗表示 */}
        <div className="flex items-center justify-between">
          <Badge variant="outline">ステップ 1: セッション認証フローの並び替え</Badge>
          <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)}>
            <Lightbulb className="h-4 w-4 mr-2" />
            ヒント
          </Button>
        </div>

        {showHint && (
          <Alert>
            <AlertDescription>
              <strong>ヒント:</strong>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>まずユーザーが何をしますか？</li>
                <li>サーバーは認証後に何を作成しますか？</li>
                <li>クライアントは何を受け取りますか？</li>
                <li>以降のリクエストで何が送信されますか？</li>
                <li>サーバーは何を使って検証しますか？</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}

        {/* ドラッグ&ドロップエリア */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">セッション認証の流れを正しい順序に並び替えてください</h3>

          <div className="space-y-3">
            {sequenceOrder.map((item, index) => (
              <div
                key={item.id}
                draggable={!isSequenceSubmitted}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, index)}
                className={`p-4 rounded-lg border transition-all ${
                  draggedItem === index
                    ? "opacity-50 scale-95"
                    : dragOverItem === index
                      ? "border-blue-400 bg-blue-50"
                      : isSequenceSubmitted
                        ? item.correctOrder === index + 1
                          ? "bg-green-50 border-green-300"
                          : "bg-red-50 border-red-300"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                } ${!isSequenceSubmitted ? "cursor-move" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => moveItem(index, "up")}
                      disabled={isSequenceSubmitted || index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => moveItem(index, "down")}
                      disabled={isSequenceSubmitted || index === sequenceOrder.length - 1}
                    >
                      ↓
                    </Button>
                  </div>

                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded ${
                      isSequenceSubmitted ? "bg-gray-200" : "bg-gray-100"
                    }`}
                  >
                    {isSequenceSubmitted ? (
                      <span className="font-bold text-sm">{index + 1}</span>
                    ) : (
                      <GripVertical className="h-4 w-4 text-gray-500" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.content}</p>
                  </div>

                  {isSequenceSubmitted && (
                    <div className="flex items-center gap-2">
                      {item.correctOrder === index + 1 ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="flex items-center gap-1">
                          <XCircle className="h-5 w-5 text-red-600" />
                          <span className="text-xs text-red-600">正解: {item.correctOrder}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* アクションボタン */}
        <div className="flex gap-4">
          {!isSequenceSubmitted ? (
            <Button onClick={checkSequenceAnswer} className="flex-1">
              順序を確認
            </Button>
          ) : (
            <>
              <Button onClick={resetSequence} variant="outline" className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                もう一度挑戦
              </Button>
              <Button onClick={proceedToQuestions} className="flex-1">
                質問に進む
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </>
          )}
        </div>

        {/* 結果表示 */}
        {isSequenceSubmitted && sequenceScore !== null && (
          <Card className="p-4">
            <div className="space-y-3">
              <h4 className="font-semibold">並び替え結果:</h4>
              <div className="flex items-center justify-between">
                <span>
                  正解数: {sequenceOrder.filter((item, index) => item.correctOrder === index + 1).length} /{" "}
                  {sequenceItems.length}
                </span>
                <Badge
                  className={
                    sequenceScore >= 80 ? "bg-green-500" : sequenceScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                  }
                >
                  {sequenceScore}%
                </Badge>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded">
                <h5 className="font-semibold mb-2">正しいセッション認証の流れ:</h5>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  {sequenceItems
                    .sort((a, b) => a.correctOrder - b.correctOrder)
                    .map((item, index) => (
                      <li key={item.id}>{item.content}</li>
                    ))}
                </ol>
              </div>
            </div>
          </Card>
        )}
      </div>
    )
  }

  // 質問ステップ
  const question = questions[currentQuestion]
  const isAnswered = answers[currentQuestion] !== -1
  const isCorrect = isQuestionsSubmitted && answers[currentQuestion] === question.correctAnswer

  return (
    <div className="space-y-6">
      {/* 進捗表示 */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          ステップ 2: 質問 {currentQuestion + 1} / {questions.length}
        </Badge>
        <div className="text-sm text-gray-500">
          回答済み: {answers.filter((a) => a !== -1).length} / {questions.length}
        </div>
      </div>

      {/* 質問カード */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={answers[currentQuestion] === index ? "default" : "outline"}
                className={`w-full text-left justify-start h-auto p-4 ${
                  isQuestionsSubmitted
                    ? index === question.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : answers[currentQuestion] === index && index !== question.correctAnswer
                        ? "border-red-500 bg-red-50"
                        : ""
                    : ""
                }`}
                onClick={() => selectAnswer(index)}
                disabled={isQuestionsSubmitted}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                  {isQuestionsSubmitted && index === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                  )}
                  {isQuestionsSubmitted && answers[currentQuestion] === index && index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          {/* 解説 */}
          {isQuestionsSubmitted && (
            <Alert className={isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <AlertDescription>
                <strong>解説:</strong> {question.explanation}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep("sequence")}>
            並び替えに戻る
          </Button>
          <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
            前の質問
          </Button>
        </div>

        <div className="flex gap-2">
          {!isQuestionsSubmitted ? (
            <>
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={nextQuestion} disabled={!isAnswered}>
                  次の質問
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={submitQuestions} disabled={answers.some((a) => a === -1)}>
                  結果を確認
                </Button>
              )}
            </>
          ) : (
            <>
              {currentQuestion < questions.length - 1 && (
                <Button onClick={nextQuestion}>
                  次の質問
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              <Button onClick={resetAll} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                最初からやり直す
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 結果サマリー（最後の質問で表示） */}
      {isQuestionsSubmitted && currentQuestion === questions.length - 1 && (
        <Card className="p-4 bg-blue-50">
          <h4 className="font-semibold mb-2">全体結果</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>並び替え:</span>
              <Badge className={sequenceScore && sequenceScore >= 80 ? "bg-green-500" : "bg-yellow-500"}>
                {sequenceScore}%
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>質問:</span>
              <Badge className={questionsScore && questionsScore >= 80 ? "bg-green-500" : "bg-yellow-500"}>
                {questionsScore}%
              </Badge>
            </div>
            <div className="flex justify-between font-semibold">
              <span>総合:</span>
              <Badge className="bg-blue-500">
                {sequenceScore && questionsScore ? Math.round((sequenceScore + questionsScore) / 2) : 0}%
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
