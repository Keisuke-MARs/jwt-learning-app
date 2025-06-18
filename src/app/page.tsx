import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Key, Lock, ShieldCheck, Server, Globe, CheckCircle, XCircle, Trophy } from "lucide-react"
import { JwtStructure } from "@/components/jwt-structure"
import { SessionComparison } from "@/components/session-comparison"
import { AuthFlowDiagram } from "@/components/auth-flow-diagram"
import { VisualComparison } from "@/components/visual-comparison"

export default function Home() {
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
            <Link href="/login-traditional" className="text-xs sm:text-sm font-medium">
              従来のセッション認証
            </Link>
            <Link href="/login-jwt">
              <Button variant="default" size="sm" className="text-xs sm:text-sm">
                JWT認証
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  JWT vs 従来のセッション管理
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  このアプリケーションでは、JWTと従来のセッション管理の違いを実際に体験しながら学ぶことができます。
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/quiz">
                  <Button className="w-full">
                    <Trophy className="mr-2 h-4 w-4" />
                    クイズに挑戦
                  </Button>
                </Link>
                <Link href="/login-traditional">
                  <Button variant="outline" className="w-full">
                    <Server className="mr-2 h-4 w-4" />
                    従来のセッション認証を試す
                  </Button>
                </Link>
                <Link href="/login-jwt">
                  <Button variant="outline" className="w-full">
                    <Globe className="mr-2 h-4 w-4" />
                    JWT認証を試す
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* メイン学習コンテンツ */}
        <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="visual-comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-0 mb-8">
                <TabsTrigger value="visual-comparison">メリット・デメリット</TabsTrigger>
                <TabsTrigger value="what-is-jwt">JWTとは</TabsTrigger>
                <TabsTrigger value="auth-flow">認証フロー</TabsTrigger>
                <TabsTrigger value="comparison">詳細比較</TabsTrigger>
                <TabsTrigger value="security">セキュリティ</TabsTrigger>
              </TabsList>

              <TabsContent value="visual-comparison" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">どちらを選ぶべき？</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    具体的なシナリオとメリット・デメリットで、どちらの認証方式が適しているかを理解しましょう
                  </p>
                </div>
                <VisualComparison />
              </TabsContent>

              <TabsContent value="what-is-jwt" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>JWTの基本構造</CardTitle>
                    <CardDescription>
                      JSON Web Token (JWT) は、当事者間で情報を安全に転送するためのコンパクトで自己完結型の方法です。
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <JwtStructure />
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>JWTの特徴</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>自己完結型 - 必要な情報がすべてトークン内に含まれる</li>
                        <li>ステートレス - サーバー側でセッション状態を保持する必要がない</li>
                        <li>署名付き - 改ざんの検出が可能</li>
                        <li>有効期限の設定 - トークンの有効期限を制御できる</li>
                        <li>クロスドメイン対応 - 異なるドメイン間での認証が容易</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>JWTの使用例</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>シングルサインオン (SSO)</li>
                        <li>APIアクセストークン</li>
                        <li>マイクロサービスアーキテクチャでの認証</li>
                        <li>情報交換 - 署名付きデータの安全な転送</li>
                        <li>SPAとバックエンドAPIの連携</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="auth-flow" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>認証フローの比較</CardTitle>
                    <CardDescription>
                      従来のセッション認証とJWT認証のフローの違いを視覚的に理解しましょう
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AuthFlowDiagram />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>従来のセッション管理とJWTの詳細比較</CardTitle>
                    <CardDescription>両方式の主な違いと特徴を詳しく比較します。</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SessionComparison />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>セキュリティ考慮事項</CardTitle>
                    <CardDescription>JWTと従来のセッション管理におけるセキュリティ上の注意点</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">JWTのセキュリティ</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>適切な署名アルゴリズムの選択 (HMAC SHA-256, RSA)</li>
                          <li>トークンの有効期限を短く設定</li>
                          <li>機密情報をペイロードに含めない</li>
                          <li>リフレッシュトークンの適切な管理</li>
                          <li>JWTの取り消し方法の検討</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">従来のセッション管理のセキュリティ</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>セッションIDの適切な生成（十分なエントロピー）</li>
                          <li>セッションの有効期限設定</li>
                          <li>Secure属性とHttpOnly属性の使用</li>
                          <li>CSRF対策の実装</li>
                          <li>セッション固定化攻撃への対策</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 実践セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">実際に体験してみよう</h2>
              <p className="mx-auto max-w-[700px] text-gray-500">
                両方の認証方式を実際に試して、違いを体感してください
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* 従来のセッション認証 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                <div className="bg-blue-50 p-4 flex items-center justify-center">
                  <Server className="h-12 w-12 text-blue-600" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-center mb-4">従来のセッション認証</h3>

                  <div className="mb-6 flex-1">
                    <h4 className="font-semibold text-lg mb-2 text-blue-700">仕組み</h4>
                    <p className="text-gray-700 mb-4">
                      サーバー側でセッション情報を保存し、クライアントにはセッションIDのみを送信します。
                      クライアントはCookieでセッションIDを保持します。
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>ユーザーがログイン</li>
                        <li>サーバーがセッションを作成・保存</li>
                        <li>セッションIDをCookieで返却</li>
                        <li>以降のリクエストでCookieを送信</li>
                        <li>サーバーがセッションIDを検証</li>
                      </ol>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        メリット
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>サーバー側でセッションを無効化できる</li>
                        <li>クライアントに最小限の情報のみ送信</li>
                        <li>実装が比較的シンプル</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        デメリット
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>サーバーリソースを消費</li>
                        <li>スケーリングが難しい</li>
                        <li>CSRF攻撃に対して脆弱性がある可能性</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link href="/login-traditional">
                      <Button className="w-full">従来のセッション認証を試す</Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* JWT認証 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                <div className="bg-purple-50 p-4 flex items-center justify-center">
                  <Globe className="h-12 w-12 text-purple-600" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-center mb-4">JWT認証</h3>

                  <div className="mb-6 flex-1">
                    <h4 className="font-semibold text-lg mb-2 text-purple-700">仕組み</h4>
                    <p className="text-gray-700 mb-4">
                      サーバー側で状態を保持せず、必要な情報をすべてトークンに含めます。
                      トークンは署名されており、改ざんを検出できます。
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>ユーザーがログイン</li>
                        <li>サーバーがJWTを生成・署名</li>
                        <li>クライアントがJWTを保存</li>
                        <li>以降のリクエストでJWTを送信</li>
                        <li>サーバーがJWTを検証</li>
                      </ol>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        メリット
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>ステートレス - サーバー側で状態を保持しない</li>
                        <li>スケーラビリティが高い</li>
                        <li>クロスドメイン対応</li>
                        <li>マイクロサービスに適している</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        デメリット
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>トークンの取り消しが難しい</li>
                        <li>ペイロードサイズが大きくなる可能性</li>
                        <li>機密情報の漏洩リスク</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Link href="/login-jwt">
                      <Button className="w-full" variant="secondary">
                        JWT認証を試す
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">認証の仕組み</h3>
                <p className="text-center text-gray-500">
                  従来のセッション管理とJWTの認証フローの違いを視覚的に理解できます。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">セキュリティ比較</h3>
                <p className="text-center text-gray-500">
                  両方式のセキュリティ上の特徴と考慮事項を学ぶことができます。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">実践的な体験</h3>
                <p className="text-center text-gray-500">
                  実際にログインを行い、トークンの生成と検証プロセスを体験できます。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} JWT学習アプリ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
