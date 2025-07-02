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

      <main className="flex-1 w-full overflow-x-hidden">
        {/* ヒーローセクション */}
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 w-full px-2">
                <h1 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl break-words text-center">
                  JWT vs 従来のセッション管理
                </h1>
                <p className="mx-auto max-w-full text-gray-500 text-xs sm:text-sm md:text-base lg:text-xl break-words text-center px-2">
                  このアプリケーションでは、JWTと従来のセッション管理の違いを実際に体験しながら学ぶことができます。
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-lg sm:max-w-none sm:flex-row sm:justify-center">
                <Link href="/quiz" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">
                    <Trophy className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">クイズに挑戦</span>
                  </Button>
                </Link>
                <Link href="/login-traditional" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Server className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="hidden sm:inline whitespace-nowrap">従来のセッション認証を試す</span>
                    <span className="sm:hidden whitespace-nowrap">従来認証を試す</span>
                  </Button>
                </Link>
                <Link href="/login-jwt" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Globe className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">JWT認証を試す</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* メイン学習コンテンツ */}
        <section className="w-full py-8 sm:py-12 md:py-24">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <Tabs defaultValue="visual-comparison" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-0 mb-6 sm:mb-8 h-auto sm:h-10 overflow-x-auto">
                <TabsTrigger value="visual-comparison" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  <span className="hidden sm:inline">メリット・デメリット</span>
                  <span className="sm:hidden">比較</span>
                </TabsTrigger>
                <TabsTrigger value="what-is-jwt" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  JWTとは
                </TabsTrigger>
                <TabsTrigger value="auth-flow" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  <span className="hidden sm:inline">認証フロー</span>
                  <span className="sm:hidden">フロー</span>
                </TabsTrigger>
                <TabsTrigger value="comparison" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  <span className="hidden sm:inline">詳細比較</span>
                  <span className="sm:hidden">詳細</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs sm:text-sm p-2 sm:p-3 col-span-2 sm:col-span-1 whitespace-nowrap">
                  セキュリティ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visual-comparison" className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="text-center mb-4 sm:mb-6 md:mb-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 break-words px-2">どちらを選ぶべき？</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base break-words px-2">
                    具体的なシナリオとメリット・デメリットで、どちらの認証方式が適しているかを理解しましょう
                  </p>
                </div>
                <div className="w-full overflow-hidden px-1 sm:px-0">
                  <VisualComparison />
                </div>
              </TabsContent>

              <TabsContent value="what-is-jwt" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">JWTの基本構造</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">
                      JSON Web Token (JWT) は、当事者間で情報を安全に転送するためのコンパクトで自己完結型の方法です。
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <JwtStructure />
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                  <Card className="w-full overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl break-words">JWTの特徴</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base break-words">
                        <li>自己完結型 - 必要な情報がすべてトークン内に含まれる</li>
                        <li>ステートレス - サーバー側でセッション状態を保持する必要がない</li>
                        <li>署名付き - 改ざんの検出が可能</li>
                        <li>有効期限の設定 - トークンの有効期限を制御できる</li>
                        <li>クロスドメイン対応 - 異なるドメイン間での認証が容易</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="w-full overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl break-words">JWTの使用例</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base break-words">
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

              <TabsContent value="auth-flow" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">認証フローの比較</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">
                      従来のセッション認証とJWT認証のフローの違いを視覚的に理解しましょう
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <AuthFlowDiagram />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">従来のセッション管理とJWTの詳細比較</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">両方式の主な違いと特徴を詳しく比較します。</CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-hidden">
                    <SessionComparison />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">セキュリティ考慮事項</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">JWTと従来のセッション管理におけるセキュリティ上の注意点</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 break-words">JWTのセキュリティ</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base break-words">
                          <li>適切な署名アルゴリズムの選択 (HMAC SHA-256, RSA)</li>
                          <li>トークンの有効期限を短く設定</li>
                          <li>機密情報をペイロードに含めない</li>
                          <li>リフレッシュトークンの適切な管理</li>
                          <li>JWTの取り消し方法の検討</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 break-words">従来のセッション管理のセキュリティ</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base break-words">
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
        <section className="w-full py-8 sm:py-12 md:py-24 bg-gray-50">
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 break-words px-2">実際に体験してみよう</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base break-words px-2">
                理論を学んだ後は、実際に両方の認証方式を体験して違いを実感しましょう
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center w-full overflow-hidden">
                <CardHeader>
                  <Server className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-blue-600 flex-shrink-0" />
                  <CardTitle className="text-lg sm:text-xl break-words">従来のセッション認証</CardTitle>
                  <CardDescription className="text-sm sm:text-base break-words">
                    サーバーサイドでセッションを管理する従来の方法を体験
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/login-traditional">
                    <Button className="w-full" size="sm">
                      体験してみる
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center w-full overflow-hidden">
                <CardHeader>
                  <Globe className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-green-600 flex-shrink-0" />
                  <CardTitle className="text-lg sm:text-xl break-words">JWT認証</CardTitle>
                  <CardDescription className="text-sm sm:text-base break-words">
                    ステートレスで拡張性の高いJWT認証を体験
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/login-jwt">
                    <Button className="w-full" size="sm">
                      体験してみる
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="text-center sm:col-span-2 lg:col-span-1 w-full overflow-hidden">
                <CardHeader>
                  <Trophy className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-yellow-600 flex-shrink-0" />
                  <CardTitle className="text-lg sm:text-xl break-words">クイズ & パズル</CardTitle>
                  <CardDescription className="text-sm sm:text-base break-words">
                    学習した内容をクイズとパズルで確認
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/quiz">
                    <Button className="w-full" size="sm">
                      挑戦してみる
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link href="/learn">
                <Button variant="secondary" size="lg" className="text-sm sm:text-base">
                  <ArrowRight className="mr-2 h-4 w-4 flex-shrink-0" />
                  詳細な学習ガイドを見る
                </Button>
              </Link>
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
