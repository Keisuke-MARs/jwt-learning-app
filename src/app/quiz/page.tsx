"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Key, Trophy, Puzzle, HelpCircle } from "lucide-react"
import { ComparisonQuiz } from "@/components/quiz/comparison-quiz"
import { SessionQuiz } from "@/components/quiz/session-quiz"
import { JwtPuzzle } from "@/components/quiz/jwt-puzzle"
import { QuizResult } from "@/components/quiz/quiz-result"

export default function QuizPage() {
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([])
  const [scores, setScores] = useState<{ [key: string]: number }>({})

  const handleQuizComplete = (quizId: string, score: number) => {
    if (!completedQuizzes.includes(quizId)) {
      setCompletedQuizzes([...completedQuizzes, quizId])
    }
    setScores({ ...scores, [quizId]: score })
  }

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  const maxPossibleScore = completedQuizzes.length * 100
  const averageScore = completedQuizzes.length > 0 ? totalScore / completedQuizzes.length : 0

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="w-full max-w-7xl mx-auto flex h-16 items-center px-3 sm:px-4 lg:px-6">
          <div className="mr-2 sm:mr-4 flex">
            <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
              <Key className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <span className="font-bold text-sm sm:text-base whitespace-nowrap">JWT学習アプリ</span>
            </Link>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-1 sm:space-x-4">
            <Link href="/login-traditional" className="text-xs sm:text-sm font-medium hidden sm:inline whitespace-nowrap">
              従来のセッション認証
            </Link>
            <Link href="/login-traditional" className="text-xs font-medium sm:hidden whitespace-nowrap">
              従来認証
            </Link>
            <Link href="/login-jwt">
              <Button variant="default" size="sm" className="text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">
                JWT認証
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-6 sm:py-12 w-full overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="h-8 w-8 text-yellow-600 flex-shrink-0" />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight break-words">JWT学習クイズ & パズル</h1>
              </div>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto break-words">
                JWTと従来のセッション認証について学んだ知識をクイズとパズルで確認してみましょう
              </p>
            </div>

            {/* 進捗カード */}
            {completedQuizzes.length > 0 && (
              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl break-words">学習進捗</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuizResult 
                    scores={{
                      comparisonQuiz: scores.comparison || null,
                      sessionQuiz: scores.session || null,
                      jwtPuzzle: scores["jwt-puzzle"] || null
                    }}
                  />
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-0 mb-6 sm:mb-8 h-auto sm:h-10 overflow-x-auto">
                <TabsTrigger value="comparison" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  <HelpCircle className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">認証方式比較クイズ</span>
                  <span className="sm:hidden">比較クイズ</span>
                </TabsTrigger>
                <TabsTrigger value="session" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  <Key className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">セッション管理クイズ</span>
                  <span className="sm:hidden">セッションクイズ</span>
                </TabsTrigger>
                <TabsTrigger value="jwt-puzzle" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  <Puzzle className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">JWT構造パズル</span>
                  <span className="sm:hidden">JWTパズル</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">認証方式比較クイズ</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">
                      JWTと従来のセッション認証の特徴や適用場面について理解度をチェックしましょう
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <ComparisonQuiz onScoreUpdate={(score: number) => handleQuizComplete("comparison", score)} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="session" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">セッション管理クイズ</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">
                      セッション管理の仕組みやセキュリティについて理解度をチェックしましょう
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <SessionQuiz onScoreUpdate={(score: number) => handleQuizComplete("session", score)} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jwt-puzzle" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">JWT構造パズル</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">
                      JWTの構造（Header、Payload、Signature）を正しく組み立てるパズルです
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <JwtPuzzle onScoreUpdate={(score: number) => handleQuizComplete("jwt-puzzle", score)} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* 学習への誘導 */}
            <Card className="w-full overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl break-words">さらに学習を深めましょう</CardTitle>
                <CardDescription className="text-sm sm:text-base break-words">
                  クイズで知識を確認した後は、実際の認証フローを体験してみてください
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/login-traditional" className="flex-1">
                    <Button variant="outline" className="w-full text-xs sm:text-sm break-words">
                      従来のセッション認証を体験
                    </Button>
                  </Link>
                  <Link href="/login-jwt" className="flex-1">
                    <Button variant="outline" className="w-full text-xs sm:text-sm break-words">
                      JWT認証を体験
                    </Button>
                  </Link>
                  <Link href="/learn" className="flex-1">
                    <Button className="w-full text-xs sm:text-sm break-words">
                      詳細学習ガイド
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
