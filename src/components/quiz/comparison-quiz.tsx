"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react"

interface ComparisonQuizProps {
  onScoreUpdate: (score: number) => void
}

interface Scenario {
  id: string
  title: string
  description: string
  options: {
    text: string
    value: "session" | "jwt" | "both"
  }[]
  correctAnswer: "session" | "jwt" | "both"
  explanation: string
}

const scenarios: Scenario[] = [
  {
    id: "s1",
    title: "スタートアップのWebアプリケーション",
    description:
      "小規模チームで開発する単一サーバーのWebアプリケーション。ユーザー数は数百人程度で、今後の急激な成長は予想されていない。",
    options: [
      { text: "従来のセッション認証", value: "session" },
      { text: "JWT認証", value: "jwt" },
      { text: "どちらでも良い", value: "both" },
    ],
    correctAnswer: "session",
    explanation:
      "小規模で単一サーバーの場合、セッション認証の方がシンプルで実装しやすく、即座にログアウト処理もできるため適しています。",
  },
  {
    id: "s2",
    title: "マイクロサービスアーキテクチャ",
    description:
      "複数のサービスが連携する大規模システム。各サービスが独立してデプロイされ、異なるチームが開発している。",
    options: [
      { text: "従来のセッション認証", value: "session" },
      { text: "JWT認証", value: "jwt" },
      { text: "どちらでも良い", value: "both" },
    ],
    correctAnswer: "jwt",
    explanation: "マイクロサービスでは各サービス間で認証情報を共有する必要があり、ステートレスなJWTが適しています。",
  },
  {
    id: "s3",
    title: "モバイルアプリのAPI",
    description:
      "スマートフォンアプリがバックエンドAPIと通信する。オフライン機能も必要で、ネットワークが不安定な環境でも動作する必要がある。",
    options: [
      { text: "従来のセッション認証", value: "session" },
      { text: "JWT認証", value: "jwt" },
      { text: "どちらでも良い", value: "both" },
    ],
    correctAnswer: "jwt",
    explanation:
      "モバイルアプリではCookieが使いにくく、JWTをHTTPヘッダーで送信する方が適しています。また、オフライン対応もしやすくなります。",
  },
  {
    id: "s4",
    title: "金融系Webアプリケーション",
    description:
      "高いセキュリティが要求される金融系のWebアプリケーション。不正アクセスを即座に検知して、該当ユーザーのセッションを無効化する必要がある。",
    options: [
      { text: "従来のセッション認証", value: "session" },
      { text: "JWT認証", value: "jwt" },
      { text: "どちらでも良い", value: "both" },
    ],
    correctAnswer: "session",
    explanation: "即座にセッションを無効化する必要がある場合、サーバー側で制御できるセッション認証の方が適しています。",
  },
  {
    id: "s5",
    title: "グローバルなSaaSプラットフォーム",
    description:
      "世界中にユーザーがいるSaaSプラットフォーム。複数のリージョンにサーバーが分散配置されており、高い可用性とスケーラビリティが必要。",
    options: [
      { text: "従来のセッション認証", value: "session" },
      { text: "JWT認証", value: "jwt" },
      { text: "どちらでも良い", value: "both" },
    ],
    correctAnswer: "jwt",
    explanation: "分散環境では、ステートレスなJWTの方がスケーラビリティと可用性の面で有利です。",
  },
]

export function ComparisonQuiz({ onScoreUpdate }: ComparisonQuizProps) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [answers, setAnswers] = useState<string[]>(new Array(scenarios.length).fill(""))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const selectAnswer = (answer: string) => {
    if (isSubmitted) return

    const newAnswers = [...answers]
    newAnswers[currentScenario] = answer
    setAnswers(newAnswers)
  }

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setShowExplanation(false)
    }
  }

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1)
      setShowExplanation(false)
    }
  }

  const submitQuiz = () => {
    setIsSubmitted(true)
    setShowExplanation(true)

    let correctCount = 0
    scenarios.forEach((scenario, index) => {
      if (answers[index] === scenario.correctAnswer) {
        correctCount++
      }
    })

    const score = Math.round((correctCount / scenarios.length) * 100)
    onScoreUpdate(score)
  }

  const reset = () => {
    setCurrentScenario(0)
    setAnswers(new Array(scenarios.length).fill(""))
    setIsSubmitted(false)
    setShowExplanation(false)
  }

  const scenario = scenarios[currentScenario]
  const isAnswered = answers[currentScenario] !== ""
  const isCorrect = isSubmitted && answers[currentScenario] === scenario.correctAnswer

  return (
    <div className="space-y-6">
      {/* 進捗表示 */}
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          シナリオ {currentScenario + 1} / {scenarios.length}
        </Badge>
        <div className="text-sm text-gray-500">
          回答済み: {answers.filter((a) => a !== "").length} / {scenarios.length}
        </div>
      </div>

      {/* シナリオカード */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
            <p className="text-gray-600">{scenario.description}</p>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">どちらの認証方式が適していますか？</h4>

            <div className="space-y-3">
              {scenario.options.map((option, index) => (
                <Button
                  key={index}
                  variant={answers[currentScenario] === option.value ? "default" : "outline"}
                  className={`w-full text-left justify-start h-auto p-4 ${
                    isSubmitted
                      ? option.value === scenario.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : answers[currentScenario] === option.value && option.value !== scenario.correctAnswer
                          ? "border-red-500 bg-red-50"
                          : ""
                      : ""
                  }`}
                  onClick={() => selectAnswer(option.value)}
                  disabled={isSubmitted}
                >
                  <div className="flex items-center gap-3">
                    <span>{option.text}</span>
                    {isSubmitted && option.value === scenario.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                    )}
                    {isSubmitted &&
                      answers[currentScenario] === option.value &&
                      option.value !== scenario.correctAnswer && <XCircle className="h-5 w-5 text-red-600 ml-auto" />}
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* 解説 */}
          {isSubmitted && showExplanation && (
            <Alert className={isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <AlertDescription>
                <strong>解説:</strong> {scenario.explanation}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevScenario} disabled={currentScenario === 0}>
          前のシナリオ
        </Button>

        <div className="flex gap-2">
          {!isSubmitted ? (
            <>
              {currentScenario < scenarios.length - 1 ? (
                <Button onClick={nextScenario} disabled={!isAnswered}>
                  次のシナリオ
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={submitQuiz} disabled={answers.some((a) => a === "")}>
                  結果を確認
                </Button>
              )}
            </>
          ) : (
            <>
              {currentScenario < scenarios.length - 1 && (
                <Button onClick={nextScenario}>
                  次のシナリオ
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              <Button onClick={reset} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                もう一度挑戦
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 結果サマリー（最後のシナリオで表示） */}
      {isSubmitted && currentScenario === scenarios.length - 1 && (
        <Card className="p-4 bg-blue-50">
          <h4 className="font-semibold mb-2">クイズ完了！</h4>
          <p className="text-sm">
            正解数: {answers.filter((answer, index) => answer === scenarios[index].correctAnswer).length} /{" "}
            {scenarios.length}
          </p>
        </Card>
      )}
    </div>
  )
}
