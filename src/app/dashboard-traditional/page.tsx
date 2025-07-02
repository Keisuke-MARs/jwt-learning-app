"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Key, LogOut, Cookie, RefreshCw, AlertCircle, Shield, Clock } from "lucide-react"
import { checkTraditionalSession, logoutTraditional, refreshTraditionalSession } from "@/lib/auth-actions"
import { SessionInfoDisplay } from "@/components/session-info-display"

export default function TraditionalDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchSessionInfo = async () => {
    setLoading(true)
    try {
      const result = await checkTraditionalSession()
      if (result.success) {
        setUser(result.user)
        setSessionInfo(result.sessionInfo)
        setError("")
      } else {
        // エラーメッセージを詳細化
        if (result.error?.includes("見つかりません")) {
          setError("ログインが必要です。従来のセッション認証でログインしてください。")
        } else {
          setError("セッションの有効期限が切れています。再度ログインしてください。")
        }
        setTimeout(() => {
          router.push("/login-traditional")
        }, 3000) // 3秒に延長してメッセージを読む時間を確保
      }
    } catch (err) {
      setError("セッション情報の取得中にエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessionInfo()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logoutTraditional()
      router.push("/login-traditional")
    } catch (error) {
      console.error("ログアウトエラー:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefreshSession = async () => {
    try {
      await refreshTraditionalSession()
      fetchSessionInfo()
    } catch (err) {
      setError("セッション更新中にエラーが発生しました")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">セッション情報を読み込み中...</p>
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
            <Link href="/login-jwt" className="text-xs sm:text-sm font-medium hidden sm:inline whitespace-nowrap">
              JWT認証
            </Link>
            <Link href="/login-jwt" className="text-xs font-medium sm:hidden whitespace-nowrap">
              JWT認証
            </Link>
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
                <Cookie className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight break-words">従来のセッション認証ダッシュボード</h1>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base break-words">
                従来のセッション認証が正常に完了しました。以下でセッション情報を確認できます。
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <CardTitle className="text-lg sm:text-xl break-words">認証状態</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm sm:text-base break-words">セッション認証済み</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 break-words">
                      有効なセッションで認証されています
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <CardTitle className="text-lg sm:text-xl break-words">セッション情報</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm sm:text-base break-words">
                      <span className="font-medium">ユーザー:</span> {user?.username}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 break-words">
                      サーバー側でセッション状態を管理しています
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
                    <Link href="/dashboard-jwt">
                      <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm break-words">
                        JWT認証と比較
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
                <CardTitle className="text-lg sm:text-xl break-words">セッション管理の詳細</CardTitle>
                <CardDescription className="text-sm sm:text-base break-words">
                  従来のセッション認証がどのように動作しているかを確認できます
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <SessionInfoDisplay sessionInfo={sessionInfo} type="traditional" />
              </CardContent>
            </Card>

            <Card className="w-full overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl break-words">従来のセッション認証の特徴</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm sm:text-base break-words">メリット</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm break-words">
                      <li>セッションの即座な無効化が可能</li>
                      <li>サーバー側で完全な制御ができる</li>
                      <li>機密情報をクライアント側に送信しない</li>
                      <li>実装が単純で理解しやすい</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm sm:text-base break-words">デメリット</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm break-words">
                      <li>サーバー側でセッション状態の管理が必要</li>
                      <li>スケーリング時にセッション共有が課題</li>
                      <li>メモリ使用量が増加</li>
                      <li>クロスドメイン認証が困難</li>
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
