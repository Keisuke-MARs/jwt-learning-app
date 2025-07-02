"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Key, LogOut, KeyRound, RefreshCw, AlertCircle, Shield, Clock } from "lucide-react"
import { checkJwtSession, logoutJwt, refreshJwtToken } from "@/lib/auth-actions"
import { JwtDisplay } from "@/components/jwt-display"

export default function JwtDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [jwtInfo, setJwtInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchJwtInfo = async () => {
    setLoading(true)
    try {
      const result = await checkJwtSession()
      if (result.success) {
        setUser(result.user)
        setJwtInfo(result.jwtInfo)
        setError("")
      } else {
        // エラーメッセージを詳細化
        if (result.error?.includes("見つかりません")) {
          setError("ログインが必要です。JWT認証でログインしてください。")
        } else {
          setError("トークンの有効期限が切れています。再度ログインしてください。")
        }
        setTimeout(() => {
          router.push("/login-jwt")
        }, 3000) // 3秒に延長してメッセージを読む時間を確保
      }
    } catch (err) {
      setError("トークン情報の取得中にエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJwtInfo()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logoutJwt()
      router.push("/login-jwt")
    } catch (error) {
      console.error("ログアウトエラー:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshToken = async () => {
    try {
      await refreshJwtToken()
      fetchJwtInfo()
    } catch (err) {
      setError("トークン更新中にエラーが発生しました")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">トークン情報を読み込み中...</p>
        </div>
      </div>
    )
  }

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
            {user && (
              <>
                <span className="text-xs sm:text-sm hidden md:inline">
                  ようこそ、<strong>{user.username}</strong> さん
                </span>
                <Button
                  onClick={handleLogout}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap"
                >
                  <LogOut className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  {isLoading ? "..." : "ログアウト"}
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 py-6 sm:py-12 w-full overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          {error && (
            <Alert variant="destructive" className="mb-4 sm:mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm sm:text-base">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2 px-2">
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 flex-shrink-0" />
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight break-words">JWT認証ダッシュボード</h1>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base break-words">
                JWT認証が正常に完了しました。以下でJWTトークンの詳細を確認できます。
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <CardTitle className="text-lg sm:text-xl break-words">認証状態</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base break-words">JWT認証済み</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 break-words">
                      有効なJWTトークンで認証されています
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <CardTitle className="text-lg sm:text-xl break-words">セッション情報</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm sm:text-base break-words">
                      <span className="font-medium">ユーザー:</span> user
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 break-words">
                      JWTトークンにユーザー情報が含まれています
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl break-words">アクション</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/dashboard-traditional">
                      <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm break-words">
                        従来認証と比較
                      </Button>
                    </Link>
                    <Link href="/quiz">
                      <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm break-words">
                        クイズに挑戦
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl break-words">あなたのJWTトークン</CardTitle>
                <CardDescription className="text-sm sm:text-base break-words">
                  実際に発行されたJWTトークンとその構造を確認できます
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <JwtDisplay jwtInfo={jwtInfo} />
              </CardContent>
            </Card>

            <Card className="w-full overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl break-words">JWT認証の特徴</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm sm:text-base break-words">メリット</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm break-words">
                      <li>ステートレス - サーバー側でセッション管理が不要</li>
                      <li>スケーラビリティ - 複数サーバーでの拡張が容易</li>
                      <li>自己完結型 - トークンに必要な情報がすべて含まれる</li>
                      <li>クロスドメイン対応 - 異なるドメイン間での認証が可能</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm sm:text-base break-words">デメリット</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm break-words">
                      <li>トークンサイズが大きい</li>
                      <li>取り消しが困難</li>
                      <li>機密情報をペイロードに含められない</li>
                      <li>有効期限の管理が複雑</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
