"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Key, LogOut, Cookie, RefreshCw, AlertCircle } from "lucide-react"
import { checkTraditionalSession, logoutTraditional, refreshTraditionalSession } from "@/lib/auth-actions"
import { SessionInfoDisplay } from "@/components/session-info-display"

export default function TraditionalDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
    try {
      await logoutTraditional()
      router.push("/login-traditional")
    } catch (err) {
      setError("ログアウト処理中にエラーが発生しました")
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>セッション情報を読み込み中...</p>
        </div>
      </div>
    )
  }

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
            {user && (
              <>
                <span className="text-xs sm:text-sm hidden sm:inline">
                  ようこそ、<strong>{user.username}</strong> さん
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs sm:text-sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="sm:inline">ログアウト</span>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">従来のセッション認証ダッシュボード</h1>
            <p className="text-gray-500">このページでは、従来のセッション認証の状態を確認できます。</p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  <CardTitle>セッション情報</CardTitle>
                </div>
                <CardDescription>現在のセッションの詳細情報</CardDescription>
              </CardHeader>
              <CardContent>
                {sessionInfo && <SessionInfoDisplay sessionInfo={sessionInfo} type="traditional" />}

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <Button variant="outline" onClick={handleRefreshSession}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    セッションを更新
                  </Button>
                  <Link href="/dashboard-jwt">
                    <Button variant="secondary">JWT認証ダッシュボードを見る</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>従来のセッション認証の仕組み</CardTitle>
                <CardDescription>セッションベースの認証がどのように機能するか</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                  <h3 className="font-semibold">セッションの流れ:</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>ユーザーがログインすると、サーバーはセッションを作成</li>
                    <li>セッションIDがCookieとしてブラウザに保存される</li>
                    <li>以降のリクエストでは、CookieのセッションIDを使用して認証</li>
                    <li>サーバーはセッションIDを使ってセッションストアから情報を取得</li>
                    <li>ログアウト時にサーバー側でセッションを削除</li>
                  </ol>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                  <h3 className="font-semibold">メリット:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>サーバー側でセッションを無効化できる（ログアウト処理が容易）</li>
                    <li>セッションIDのみをクライアントに送信（情報漏洩リスクが低い）</li>
                    <li>実装が比較的シンプル</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                  <h3 className="font-semibold">デメリット:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>サーバーリソースを消費（セッションストアが必要）</li>
                    <li>スケーリングが難しい（複数サーバー間でのセッション共有）</li>
                    <li>CSRF攻撃に対して脆弱性がある可能性</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
