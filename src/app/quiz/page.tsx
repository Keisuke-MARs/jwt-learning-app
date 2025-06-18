"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Key, Trophy, RotateCcw, Home } from "lucide-react"
import { JwtPuzzle } from "@/components/quiz/jwt-puzzle"
import { SessionQuiz } from "@/components/quiz/session-quiz"
import { ComparisonQuiz } from "@/components/quiz/comparison-quiz"
import { QuizResult } from "@/components/quiz/quiz-result"

export default function QuizPage() {
  const [activeTab, setActiveTab] = useState("jwt-puzzle")
  const [scores, setScores] = useState({
    jwtPuzzle: null as number | null,
    sessionQuiz: null as number | null,
    comparisonQuiz: null as number | null,
  })

  const updateScore = (quizType: keyof typeof scores, score: number) => {
    setScores((prev) => ({ ...prev, [quizType]: score }))
  }

  const resetAllScores = () => {
    setScores({
      jwtPuzzle: null,
      sessionQuiz: null,
      comparisonQuiz: null,
    })
  }

  const completedQuizzes = Object.values(scores).filter((score) => score !== null).length
  const totalScore = Object.values(scores).reduce<number>((sum, score) => sum + (score || 0), 0)
  const averageScore = completedQuizzes > 0 ? Math.round(totalScore / completedQuizzes) : 0

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Key className="h-6 w-6" />
              <span className="font-bold">JWT学習アプリ</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <Link href="/" className="text-xs sm:text-sm font-medium">
              <Home className="h-4 w-4 mr-1 inline" />
              ホーム
            </Link>
            <Link href="/login-traditional" className="text-xs sm:text-sm font-medium">
              従来のセッション認証
            </Link>
            <Link href="/login-jwt">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                JWT認証
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">認証クイズ & パズル</h1>
            <p className="text-gray-500 md:text-lg">
              実践的なクイズとパズルで、JWTと従来のセッション認証の理解を深めましょう
            </p>
          </div>

          {/* 進捗表示 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                学習進捗
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>完了したクイズ: {completedQuizzes}/3</span>
                  <span>平均スコア: {averageScore}%</span>
                </div>
                <Progress value={(completedQuizzes / 3) * 100} className="w-full" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>JWT パズル: {scores.jwtPuzzle !== null ? `${scores.jwtPuzzle}%` : "未完了"}</span>
                  <span>セッション クイズ: {scores.sessionQuiz !== null ? `${scores.sessionQuiz}%` : "未完了"}</span>
                  <span>比較 クイズ: {scores.comparisonQuiz !== null ? `${scores.comparisonQuiz}%` : "未完了"}</span>
                </div>
                {completedQuizzes > 0 && (
                  <Button variant="outline" size="sm" onClick={resetAllScores} className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    すべてリセット
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-0 mb-8">
              <TabsTrigger value="jwt-puzzle">JWT パズル</TabsTrigger>
              <TabsTrigger value="session-quiz">セッション クイズ</TabsTrigger>
              <TabsTrigger value="comparison-quiz">比較 クイズ</TabsTrigger>
              <TabsTrigger value="results">結果</TabsTrigger>
            </TabsList>

            <TabsContent value="jwt-puzzle">
              <Card>
                <CardHeader>
                  <CardTitle>JWT構造組み立てパズル</CardTitle>
                  <CardDescription>JWTの各部分を正しい順序で組み立て、適切な内容を選択してください</CardDescription>
                </CardHeader>
                <CardContent>
                  <JwtPuzzle onScoreUpdate={(score) => updateScore("jwtPuzzle", score)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="session-quiz">
              <Card>
                <CardHeader>
                  <CardTitle>従来のセッション認証クイズ</CardTitle>
                  <CardDescription>セッションベースの認証に関する理解度をテストします</CardDescription>
                </CardHeader>
                <CardContent>
                  <SessionQuiz onScoreUpdate={(score) => updateScore("sessionQuiz", score)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison-quiz">
              <Card>
                <CardHeader>
                  <CardTitle>認証方式比較クイズ</CardTitle>
                  <CardDescription>JWTと従来のセッション認証の違いと適用場面について学習します</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparisonQuiz onScoreUpdate={(score) => updateScore("comparisonQuiz", score)} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <QuizResult scores={scores} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
