"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Key, LogOut, KeyRound, RefreshCw, AlertCircle } from "lucide-react"
import { checkJwtSession, logoutJwt, refreshJwtToken } from "@/lib/auth-actions"
import { JwtDisplay } from "@/components/jwt-display"

export default function JwtDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [jwtInfo, setJwtInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
    try {
      await logoutJwt()
      router.push("/login-jwt")
    } catch (err) {
      setError("ログアウト処理中にエラーが発生しました")
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>トークン情報を読み込み中...</p>
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
            <h1 className="text-3xl font-bold tracking-tighter mb-2">JWT認証ダッシュボード</h1>
            <p className="text-gray-500">このページでは、JWT認証の状態とトークンの詳細を確認できます。</p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5" />
                  <CardTitle>JWTトークン情報</CardTitle>
                </div>
                <CardDescription>現在のJWTトークンの詳細情報</CardDescription>
              </CardHeader>
              <CardContent>
                {jwtInfo && <JwtDisplay jwtInfo={jwtInfo} />}

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <Button variant="outline" onClick={handleRefreshToken}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    トークンを更新
                  </Button>
                  <Link href="/dashboard-traditional">
                    <Button variant="secondary">従来のセッションダッシュボードを見る</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>JWT認証の仕組み</CardTitle>
                <CardDescription>JWTベースの認証がどのように機能するか</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                  <h3 className="font-semibold">JWTの流れ:</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>ユーザーがログインすると、サーバーはJWTを生成して返す</li>
                    <li>クライアントはJWTをローカルストレージやCookieに保存</li>
                    <li>以降のリクエストでは、JWTをAuthorizationヘッダーに含めて送信</li>
                    <li>サーバーはJWTの署名を検証し、含まれる情報を使用して認証</li>
                    <li>ログアウト時はクライアント側でトークンを削除</li>
                  </ol>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                  <h3 className="font-semibold">メリット:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>ステートレス - サーバー側でセッション状態を保持しない</li>
                    <li>スケーラビリティが高い - 複数サーバー間で状態共有が不要</li>
                    <li>クロスドメイン対応 - 異なるドメイン間での認証が容易</li>
                    <li>マイクロサービスアーキテクチャに適している</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                  <h3 className="font-semibold">デメリット:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>トークンの取り消しが難しい（有効期限まで有効）</li>
                    <li>ペイロードサイズが大きくなる可能性</li>
                    <li>機密情報をペイロードに含めると漏洩リスクがある</li>
                    <li>リフレッシュトークンの管理が必要</li>
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
