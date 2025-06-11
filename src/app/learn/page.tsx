import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JwtStructure } from "@/components/jwt-structure"
import { SessionComparison } from "@/components/session-comparison"
import { AuthFlowDiagram } from "@/components/auth-flow-diagram"
import { VisualComparison } from "@/components/visual-comparison"
import { Key } from "lucide-react"

export default function LearnPage() {
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
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">JWT学習ガイド</h1>
            <p className="text-gray-500 md:text-lg">
              JWTと従来のセッション管理の違いを理解し、実際に体験しながら学びましょう。
            </p>
          </div>

          <Tabs defaultValue="visual-comparison" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-0 mb-8">
              <TabsTrigger value="visual-comparison">視覚的比較</TabsTrigger>
              <TabsTrigger value="what-is-jwt">JWTとは</TabsTrigger>
              <TabsTrigger value="auth-flow">認証フロー</TabsTrigger>
              <TabsTrigger value="comparison">詳細比較</TabsTrigger>
              <TabsTrigger value="security">セキュリティ</TabsTrigger>
            </TabsList>

            <TabsContent value="visual-comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>視覚的比較ガイド</CardTitle>
                  <CardDescription>
                    具体的なシナリオとパフォーマンス指標で、どちらの認証方式が適しているかを理解しましょう
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VisualComparison />
                </CardContent>
              </Card>
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
                  <CardDescription>従来のセッション認証とJWT認証のフローの違いを視覚的に理解しましょう</CardDescription>
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

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/login-traditional">
                  <Button variant="outline">従来のセッション認証を試す</Button>
                </Link>
                <Link href="/login-jwt">
                  <Button>JWT認証を試す</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
