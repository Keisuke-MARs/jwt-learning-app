import { Server, Globe, Key } from "lucide-react"

export function AuthFlowDiagram() {
  return (
    <div className="space-y-12">
      {/* 従来のセッション認証フロー */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <Server className="h-5 w-5" /> 従来のセッション認証フロー
        </h3>

        <div className="relative overflow-hidden rounded-xl border bg-blue-50 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {/* クライアント側 */}
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold">クライアント</h4>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">1. ログイン情報を送信</p>
                  <p className="text-gray-500">ユーザー名・パスワード</p>
                </div>

                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">4. セッションIDを保存</p>
                  <p className="text-gray-500">Cookieに保存</p>
                </div>

                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">5. 以降のリクエスト</p>
                  <p className="text-gray-500">Cookieのセッションを自動送信</p>
                </div>
              </div>
            </div>

            {/* 矢印 */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                <span className="text-blue-700 font-bold">1</span>
              </div>
              <svg
                className="h-8 w-8 text-blue-500 hidden md:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <svg
                className="h-8 w-8 text-blue-500 block md:hidden transform rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                <span className="text-blue-700 font-bold">2</span>
              </div>
              <svg
                className="h-8 w-8 text-blue-500 hidden md:block transform rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <svg
                className="h-8 w-8 text-blue-500 block md:hidden transform -rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                <span className="text-blue-700 font-bold">5</span>
              </div>
            </div>

            {/* サーバー側 */}
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-2">
                  <Server className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold">サーバー</h4>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">2. 認証・セッション作成</p>
                  <p className="text-gray-500">セッションIDを生成</p>
                </div>

                <div className="p-2 border rounded bg-blue-100">
                  <p className="font-medium">3. セッションストア</p>
                  <p className="text-gray-500">セッションID: ユーザー情報</p>
                </div>

                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">6. セッション検証</p>
                  <p className="text-gray-500">セッションIDからユーザー情報を取得</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-100 p-3 rounded-lg">
            <h5 className="font-semibold mb-2">ポイント</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>サーバー側でセッション情報を保持（ステートフル）</li>
              <li>クライアントはセッションIDのみを保持</li>
              <li>サーバー側でいつでもセッションを無効化可能</li>
              <li>セッションストアの管理が必要</li>
            </ul>
          </div>
        </div>
      </div>

      {/* JWT認証フロー */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
          <Key className="h-5 w-5" /> JWT認証フロー
        </h3>

        <div className="relative overflow-hidden rounded-xl border bg-purple-50 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {/* クライアント側 */}
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-2">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold">クライアント</h4>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">1. ログイン情報を送信</p>
                  <p className="text-gray-500">ユーザー名・パスワード</p>
                </div>

                <div className="p-2 border rounded bg-purple-100">
                  <p className="font-medium">4. JWTを保存</p>
                  <p className="text-gray-500">ローカルストレージ/Cookie</p>
                </div>

                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">5. 以降のリクエスト</p>
                  <p className="text-gray-500">Authorization: Bearer [JWT]</p>
                </div>
              </div>
            </div>

            {/* 矢印 */}
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-bold">1</span>
              </div>
              <svg
                className="h-8 w-8 text-purple-500 hidden md:block"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <svg
                className="h-8 w-8 text-purple-500 block md:hidden transform rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-bold">2</span>
              </div>
              <svg
                className="h-8 w-8 text-purple-500 hidden md:block transform rotate-180"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <svg
                className="h-8 w-8 text-purple-500 block md:hidden transform -rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-bold">5</span>
              </div>
            </div>

            {/* サーバー側 */}
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-2">
                  <Server className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold">サーバー</h4>
              </div>

              <div className="space-y-3 text-sm">
                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">2. 認証・JWT生成</p>
                  <p className="text-gray-500">ペイロード作成と署名</p>
                </div>

                <div className="p-2 border rounded bg-purple-100">
                  <p className="font-medium">3. JWT構造</p>
                  <p className="text-gray-500">ヘッダー.ペイロード.署名</p>
                </div>

                <div className="p-2 border rounded bg-gray-50">
                  <p className="font-medium">6. JWT検証</p>
                  <p className="text-gray-500">署名検証・ペイロード取得</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-purple-100 p-3 rounded-lg">
            <h5 className="font-semibold mb-2">ポイント</h5>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>サーバー側で状態を保持しない（ステートレス）</li>
              <li>必要な情報はすべてトークンに含まれる</li>
              <li>署名によりトークンの改ざんを検出</li>
              <li>有効期限が切れるまでトークンは有効</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
