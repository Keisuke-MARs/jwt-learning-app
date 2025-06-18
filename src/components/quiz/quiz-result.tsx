"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, BookOpen } from "lucide-react"

interface QuizResultProps {
  scores: {
    jwtPuzzle: number | null
    sessionQuiz: number | null
    comparisonQuiz: number | null
  }
}

export function QuizResult({ scores }: QuizResultProps) {
  const completedQuizzes = Object.values(scores).filter((score) => score !== null).length
  const totalScore = Object.values(scores).reduce<number>((sum, score) => sum + (score || 0), 0)
  const averageScore = completedQuizzes > 0 ? Math.round(totalScore / completedQuizzes) : 0

  const getScoreColor = (score: number | null) => {
    if (score === null) return "bg-gray-200"
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreBadge = (score: number | null) => {
    if (score === null) return <Badge variant="outline">未完了</Badge>
    if (score >= 80) return <Badge className="bg-green-500">優秀</Badge>
    if (score >= 60) return <Badge className="bg-yellow-500">良好</Badge>
    return <Badge variant="destructive">要復習</Badge>
  }

  const getOverallRating = () => {
    if (completedQuizzes === 0) return { text: "学習を開始しましょう", icon: <BookOpen className="h-8 w-8" /> }
    if (averageScore >= 80) return { text: "認証エキスパート", icon: <Trophy className="h-8 w-8 text-yellow-500" /> }
    if (averageScore >= 60) return { text: "認証理解者", icon: <Star className="h-8 w-8 text-blue-500" /> }
    return { text: "学習継続中", icon: <Target className="h-8 w-8 text-green-500" /> }
  }

  const rating = getOverallRating()

  return (
    <div className="space-y-6">
      {/* 総合結果 */}
      <Card className="text-center p-6">
        <div className="flex flex-col items-center space-y-4">
          {rating.icon}
          <div>
            <h2 className="text-2xl font-bold">{rating.text}</h2>
            <p className="text-gray-500">平均スコア: {averageScore}%</p>
          </div>
          <Progress value={(completedQuizzes / 3) * 100} className="w-full max-w-md" />
          <p className="text-sm text-gray-500">完了したクイズ: {completedQuizzes} / 3</p>
        </div>
      </Card>

      {/* 各クイズの詳細結果 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">JWT パズル</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>スコア:</span>
                {getScoreBadge(scores.jwtPuzzle)}
              </div>
              {scores.jwtPuzzle !== null && (
                <>
                  <Progress value={scores.jwtPuzzle} className="w-full" />
                  <p className="text-sm text-gray-500">{scores.jwtPuzzle}%</p>
                </>
              )}
              <div className="text-sm">
                <p className="font-medium">学習内容:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>JWTの構造理解</li>
                  <li>ヘッダー・ペイロード・署名</li>
                  <li>Base64エンコーディング</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">セッション クイズ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>スコア:</span>
                {getScoreBadge(scores.sessionQuiz)}
              </div>
              {scores.sessionQuiz !== null && (
                <>
                  <Progress value={scores.sessionQuiz} className="w-full" />
                  <p className="text-sm text-gray-500">{scores.sessionQuiz}%</p>
                </>
              )}
              <div className="text-sm">
                <p className="font-medium">学習内容:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>セッション認証の流れ</li>
                  <li>Cookieの役割</li>
                  <li>セキュリティ考慮事項</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">比較 クイズ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>スコア:</span>
                {getScoreBadge(scores.comparisonQuiz)}
              </div>
              {scores.comparisonQuiz !== null && (
                <>
                  <Progress value={scores.comparisonQuiz} className="w-full" />
                  <p className="text-sm text-gray-500">{scores.comparisonQuiz}%</p>
                </>
              )}
              <div className="text-sm">
                <p className="font-medium">学習内容:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>適用シナリオの判断</li>
                  <li>メリット・デメリット</li>
                  <li>実践的な選択基準</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 学習アドバイス */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">学習アドバイス</h3>
        <div className="space-y-3">
          {completedQuizzes === 0 && (
            <p className="text-gray-600">まずはJWTパズルから始めて、JWTの基本構造を理解しましょう。</p>
          )}

          {scores.jwtPuzzle !== null && scores.jwtPuzzle < 60 && (
            <p className="text-amber-600">
              • JWTの構造について復習が必要です。ヘッダー、ペイロード、署名の役割を再確認しましょう。
            </p>
          )}

          {scores.sessionQuiz !== null && scores.sessionQuiz < 60 && (
            <p className="text-amber-600">
              •
              セッション認証の流れとセキュリティについて復習しましょう。特にCookieの役割とCSRF対策について学習してください。
            </p>
          )}

          {scores.comparisonQuiz !== null && scores.comparisonQuiz < 60 && (
            <p className="text-amber-600">
              • 各認証方式の適用場面について理解を深めましょう。実際のプロジェクトでの選択基準を学習してください。
            </p>
          )}

          {averageScore >= 80 && completedQuizzes === 3 && (
            <p className="text-green-600">• 素晴らしい成績です！実際のプロジェクトで学んだ知識を活用してみましょう。</p>
          )}

          {averageScore >= 60 && averageScore < 80 && completedQuizzes === 3 && (
            <p className="text-blue-600">
              • 良い理解度です。実際のログイン機能を試して、理論と実践を結びつけましょう。
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
