import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Key, 
  Shield, 
  Server, 
  Globe, 
  Clock, 
  Users, 
  Database, 
  Zap,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BookOpen
} from "lucide-react"

export default function LearnPage() {
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
            <div className="text-center space-y-2 sm:space-y-3 px-2">
              <div className="flex items-center justify-center gap-2">
                <Key className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight break-words">JWT学習ガイド</h1>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto break-words">
                JWTと従来のセッション認証について詳しく学びましょう
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-0 mb-6 sm:mb-8 h-auto sm:h-10 overflow-x-auto">
                <TabsTrigger value="overview" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  概要
                </TabsTrigger>
                <TabsTrigger value="jwt-deep" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  JWT詳細
                </TabsTrigger>
                <TabsTrigger value="session-deep" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  <span className="hidden sm:inline">セッション詳細</span>
                  <span className="sm:hidden">セッション</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
                  セキュリティ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                  <Card className="w-full overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <CardTitle className="text-lg sm:text-xl break-words">JWT認証</CardTitle>
                      </div>
                      <Badge variant="secondary" className="w-fit text-xs sm:text-sm">モダンなアプローチ</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm sm:text-base text-gray-600 break-words">
                        JSON Web Token（JWT）は、当事者間で情報を安全に転送するためのコンパクトで自己完結型の方法です。
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm sm:text-base break-words">主な特徴:</h4>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-600 break-words">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            ステートレス（サーバーの状態管理不要）
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            自己完結型（必要な情報をトークンに内包）
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            スケーラブル（複数サーバーでの処理が容易）
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            クロスドメイン対応
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="w-full overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <CardTitle className="text-lg sm:text-xl break-words">従来のセッション認証</CardTitle>
                      </div>
                      <Badge variant="outline" className="w-fit text-xs sm:text-sm">伝統的なアプローチ</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm sm:text-base text-gray-600 break-words">
                        サーバー側でセッション状態を管理し、クライアントにはセッションIDのみを送信する従来の認証方式です。
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm sm:text-base break-words">主な特徴:</h4>
                        <ul className="space-y-1 text-xs sm:text-sm text-gray-600 break-words">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            ステートフル（サーバーで状態管理）
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            即座なセッション無効化が可能
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            機密情報をクライアントに送信しない
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            実装がシンプル
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="w-full overflow-hidden">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-base sm:text-lg md:text-xl break-words">どちらを選ぶべき？</CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base break-words">
                      アプリケーションの要件に応じて適切な認証方式を選択しましょう
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="font-semibold text-xs sm:text-sm md:text-base text-green-700 break-words">JWTが適している場面</h3>
                        <ul className="space-y-1 sm:space-y-2 text-xs break-words">
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">マイクロサービスアーキテクチャ</span>
                          </li>
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">大規模なユーザーベース</span>
                          </li>
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">複数ドメインでの認証</span>
                          </li>
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Server className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">RESTful API</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <h3 className="font-semibold text-xs sm:text-sm md:text-base text-blue-700 break-words">セッションが適している場面</h3>
                        <ul className="space-y-1 sm:space-y-2 text-xs break-words">
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">高いセキュリティが要求される</span>
                          </li>
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Database className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">従来型のWebアプリケーション</span>
                          </li>
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">即座なログアウトが必要</span>
                          </li>
                          <li className="flex items-start gap-1 sm:gap-2">
                            <Server className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="leading-tight">単一サーバーでの運用</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jwt-deep" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">JWTの詳細構造</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">
                      JWTは3つの部分から構成されます：Header、Payload、Signature
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
                        <div className="p-4 border rounded-lg bg-red-50">
                          <h3 className="font-semibold text-sm sm:text-base text-red-700 mb-2 break-words">Header</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 break-words">
                            トークンのタイプと署名アルゴリズムを指定
                          </p>
                          <div className="bg-gray-100 p-2 rounded text-xs sm:text-sm font-mono break-all">
                            {`{
  "alg": "HS256",
  "typ": "JWT"
}`}
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg bg-green-50">
                          <h3 className="font-semibold text-sm sm:text-base text-green-700 mb-2 break-words">Payload</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 break-words">
                            ユーザー情報やクレーム（主張）を含む
                          </p>
                          <div className="bg-gray-100 p-2 rounded text-xs sm:text-sm font-mono break-all">
                            {`{
  "sub": "user123",
  "name": "John Doe",
  "iat": 1516239022
}`}
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg bg-blue-50">
                          <h3 className="font-semibold text-sm sm:text-base text-blue-700 mb-2 break-words">Signature</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 break-words">
                            トークンの改ざんを検証するための署名
                          </p>
                          <div className="bg-gray-100 p-2 rounded text-xs sm:text-sm font-mono break-all">
                            HMACSHA256(
                              base64UrlEncode(header) + &quot;.&quot; +
                              base64UrlEncode(payload),
                              secret)
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm sm:text-base mb-3 break-words">完成形のJWT</h4>
                        <div className="bg-white p-3 rounded border text-xs sm:text-sm font-mono break-all">
                          <span className="text-red-600">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.
                          <span className="text-green-600">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>.
                          <span className="text-blue-600">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 break-words">
                          赤: Header, 緑: Payload, 青: Signature
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">JWTのライフサイクル</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { step: 1, title: "ログイン", description: "ユーザーがクレデンシャルを送信" },
                        { step: 2, title: "検証", description: "サーバーがユーザー情報を検証" },
                        { step: 3, title: "JWT生成", description: "サーバーがJWTを生成して返送" },
                        { step: 4, title: "トークン保存", description: "クライアントがJWTを保存" },
                        { step: 5, title: "API呼び出し", description: "JWTをAuthorizationヘッダーに含めて送信" },
                        { step: 6, title: "トークン検証", description: "サーバーがJWTの署名と有効期限を検証" },
                        { step: 7, title: "レスポンス", description: "認証成功時にリクエストされたデータを返送" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base break-words">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 break-words">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="session-deep" className="space-y-4 sm:space-y-6">
                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">セッション認証の仕組み</CardTitle>
                    <CardDescription className="text-sm sm:text-base break-words">
                      従来のセッション認証がどのように動作するかを詳しく見てみましょう
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-sm sm:text-base break-words">サーバーサイド</h3>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-sm sm:text-base text-blue-700 break-words">セッションストア</h4>
                              <p className="text-xs sm:text-sm text-gray-600 break-words">
                                メモリ、Redis、データベースなどでセッション情報を管理
                              </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <h4 className="font-medium text-sm sm:text-base text-green-700 break-words">セッション管理</h4>
                              <p className="text-xs sm:text-sm text-gray-600 break-words">
                                セッションの作成、更新、削除を処理
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold text-sm sm:text-base break-words">クライアントサイド</h3>
                          <div className="space-y-3">
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <h4 className="font-medium text-sm sm:text-base text-purple-700 break-words">セッションID</h4>
                              <p className="text-xs sm:text-sm text-gray-600 break-words">
                                ユニークなIDのみを保持
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <h4 className="font-medium text-sm sm:text-base text-orange-700 break-words">Cookie</h4>
                              <p className="text-xs sm:text-sm text-gray-600 break-words">
                                HttpOnlyとSecure属性で安全に保存
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-sm sm:text-base mb-3 break-words">セッション認証フロー</h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="break-words">ユーザーがログイン情報を送信</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="break-words">サーバーが認証し、セッションを作成</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="break-words">セッションIDをCookieとして送信</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="break-words">以降のリクエストでCookieを自動送信</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="break-words">サーバーがセッションIDでユーザーを特定</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                  <Card className="w-full overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl text-green-700 break-words">JWTのセキュリティ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center gap-2 break-words">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ベストプラクティス
                          </h4>
                          <ul className="space-y-1 text-xs sm:text-sm text-gray-600 break-words">
                            <li>• 強力な秘密鍵を使用</li>
                            <li>• 短い有効期限を設定</li>
                            <li>• HTTPSを使用</li>
                            <li>• 機密情報をペイロードに含めない</li>
                            <li>• リフレッシュトークンを活用</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center gap-2 break-words">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            注意点
                          </h4>
                          <ul className="space-y-1 text-xs sm:text-sm text-gray-600 break-words">
                            <li>• トークンの取り消しが困難</li>
                            <li>• XSS攻撃に注意</li>
                            <li>• トークンサイズが大きい</li>
                            <li>• クライアント側での保存方法</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="w-full overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl text-blue-700 break-words">セッションのセキュリティ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center gap-2 break-words">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            ベストプラクティス
                          </h4>
                          <ul className="space-y-1 text-xs sm:text-sm text-gray-600 break-words">
                            <li>• セッションIDを適切に生成</li>
                            <li>• HttpOnly、Secure属性を設定</li>
                            <li>• セッション固定化攻撃を防ぐ</li>
                            <li>• 適切なタイムアウト設定</li>
                            <li>• CSRF対策を実装</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center gap-2 break-words">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            注意点
                          </h4>
                          <ul className="space-y-1 text-xs sm:text-sm text-gray-600 break-words">
                            <li>• セッションハイジャック</li>
                            <li>• CSRF攻撃のリスク</li>
                            <li>• スケーラビリティの課題</li>
                            <li>• サーバーリソースの消費</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl break-words">共通のセキュリティ対策</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm sm:text-base break-words">通信の暗号化</h4>
                        <p className="text-xs sm:text-sm text-gray-600 break-words">
                          すべての通信にHTTPSを使用し、中間者攻撃を防ぐ
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm sm:text-base break-words">入力検証</h4>
                        <p className="text-xs sm:text-sm text-gray-600 break-words">
                          すべての入力データを検証し、インジェクション攻撃を防ぐ
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm sm:text-base break-words">ログ監視</h4>
                        <p className="text-xs sm:text-sm text-gray-600 break-words">
                          不正なアクセス試行を監視し、早期発見を行う
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="w-full overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl break-words">実際に体験してみましょう</CardTitle>
                <CardDescription className="text-sm sm:text-base break-words">
                  理論を学んだ後は、実際に両方の認証方式を体験して違いを実感してください
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
                  <Link href="/quiz" className="flex-1">
                    <Button className="w-full text-xs sm:text-sm break-words">
                      クイズで理解度確認
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
