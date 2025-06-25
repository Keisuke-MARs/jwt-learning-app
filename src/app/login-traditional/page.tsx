"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Key, AlertCircle, Cookie } from "lucide-react"
import { loginTraditional } from "@/lib/auth-actions"

export default function TraditionalLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await loginTraditional(username, password)
      if (result.success) {
        router.push("/dashboard-traditional")
      } else {
        setError(result.error || "ログインに失敗しました")
      }
    } catch (err) {
      setError("ログイン処理中にエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
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
            <Link href="/login-traditional" className="text-xs sm:text-sm font-medium hidden sm:inline whitespace-nowrap">
              従来のセッション認証
            </Link>
            <Link href="/login-traditional" className="text-xs font-medium sm:hidden whitespace-nowrap">
              従来認証
            </Link>
            <Link href="/login-jwt">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-4 whitespace-nowrap">
                JWT認証
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-6 sm:py-12 w-full overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto grid items-start gap-6 px-3 sm:px-4 lg:px-6 grid-cols-1 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-3 order-2 lg:order-1 w-full">
            <div className="inline-block rounded-lg bg-gray-100 p-2">
              <Cookie className="h-5 w-5 text-gray-500" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight break-words">従来のセッション認証</h1>
            <p className="text-gray-500 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed break-words">
              このページでは、従来のセッションベースの認証を体験できます。ログイン後、サーバー側でセッションが作成され、
              クライアント側にはセッションIDを含むCookieが保存されます。
            </p>
            <div className="space-y-4 rounded-lg border bg-gray-50 p-3 sm:p-4 w-full overflow-hidden">
              <h3 className="font-semibold text-sm sm:text-base break-words">従来のセッション認証の特徴:</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm break-words">
                <li>サーバー側でセッション状態を保持（ステートフル）</li>
                <li>セッションIDをCookieに保存</li>
                <li>サーバーの負荷が高い（セッションストアが必要）</li>
                <li>スケーリングが難しい（セッション共有の問題）</li>
                <li>CSRF攻撃に対して脆弱性がある可能性</li>
              </ul>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto space-y-4 order-1 lg:order-2">
            <Card className="w-full overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl break-words">従来のセッション認証でログイン</CardTitle>
                <CardDescription className="text-sm sm:text-base break-words">ユーザー名とパスワードを入力してログインしてください</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <AlertTitle className="text-sm sm:text-base">エラー</AlertTitle>
                    <AlertDescription className="text-sm sm:text-base break-words">{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm sm:text-base">ユーザー名</Label>
                    <Input
                      id="username"
                      placeholder="user"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="text-sm sm:text-base w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm sm:text-base">パスワード</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-sm sm:text-base w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full text-sm sm:text-base" disabled={isLoading}>
                    {isLoading ? "ログイン中..." : "ログイン"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-xs sm:text-sm text-gray-500 text-center break-words">テスト用アカウント: user / password</p>
              </CardFooter>
            </Card>
            <div className="text-center text-xs sm:text-sm">
              <Link href="/login-jwt" className="underline break-words">
                JWT認証を試してみる
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
