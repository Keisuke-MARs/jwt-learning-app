export function SessionComparison() {
  return (
    <div className="space-y-8">
      {/* 視覚的な比較図 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 従来のセッション認証フロー */}
        <div className="border rounded-lg p-4 bg-blue-50">
          <h3 className="text-lg font-semibold mb-3 text-center text-blue-700">従来のセッション認証フロー</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm">ユーザー</div>
              <div className="w-1/3 border-t-2 border-blue-400"></div>
              <div className="w-1/3 text-left pl-2 text-sm">サーバー</div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm">ログイン情報送信</div>
              <div className="w-1/3 flex justify-center">
                <svg
                  className="h-6 w-6 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm"></div>
              <div className="w-1/3 flex justify-center">
                <div className="bg-blue-100 p-2 rounded text-xs text-center">
                  セッション作成
                  <br />
                  セッションストアに保存
                </div>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm"></div>
              <div className="w-1/3 flex justify-center">
                <svg
                  className="h-6 w-6 text-blue-500 transform rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm">
                セッションID返却
                <br />
                (Cookie)
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm">
                リクエスト
                <br />+ セッションID
              </div>
              <div className="w-1/3 flex justify-center">
                <svg
                  className="h-6 w-6 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm"></div>
              <div className="w-1/3 flex justify-center">
                <div className="bg-blue-100 p-2 rounded text-xs text-center">
                  セッションIDで
                  <br />
                  セッション情報を検索
                </div>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>
          </div>
        </div>

        {/* JWT認証フロー */}
        <div className="border rounded-lg p-4 bg-purple-50">
          <h3 className="text-lg font-semibold mb-3 text-center text-purple-700">JWT認証フロー</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm">ユーザー</div>
              <div className="w-1/3 border-t-2 border-purple-400"></div>
              <div className="w-1/3 text-left pl-2 text-sm">サーバー</div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm">ログイン情報送信</div>
              <div className="w-1/3 flex justify-center">
                <svg
                  className="h-6 w-6 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm"></div>
              <div className="w-1/3 flex justify-center">
                <div className="bg-purple-100 p-2 rounded text-xs text-center">
                  JWT生成
                  <br />
                  (ペイロード + 署名)
                </div>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm"></div>
              <div className="w-1/3 flex justify-center">
                <svg
                  className="h-6 w-6 text-purple-500 transform rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm">JWT返却</div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm">リクエスト + JWT</div>
              <div className="w-1/3 flex justify-center">
                <svg
                  className="h-6 w-6 text-purple-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3 text-right pr-2 text-sm"></div>
              <div className="w-1/3 flex justify-center">
                <div className="bg-purple-100 p-2 rounded text-xs text-center">
                  署名検証
                  <br />
                  ペイロードから情報取得
                </div>
              </div>
              <div className="w-1/3 text-left pl-2 text-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 詳細比較表 */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle p-4 sm:p-0">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border p-2 bg-gray-50"></th>
                <th className="border p-2 bg-blue-50 text-blue-700">従来のセッション管理</th>
                <th className="border p-2 bg-purple-50 text-purple-700">JWT認証</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">状態管理</td>
                <td className="border p-2">
                  <span className="block font-medium">ステートフル</span>
                  <span className="text-xs sm:text-sm text-gray-500">サーバー側でセッション情報を保持</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">ステートレス</span>
                  <span className="text-xs sm:text-sm text-gray-500">サーバー側で状態を保持しない</span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">保存場所</td>
                <td className="border p-2">
                  <span className="block font-medium">サーバー側</span>
                  <span className="text-xs sm:text-sm text-gray-500">セッションIDのみをクライアントに送信</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">クライアント側</span>
                  <span className="text-xs sm:text-sm text-gray-500">すべての情報がトークンに含まれる</span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">スケーラビリティ</td>
                <td className="border p-2">
                  <span className="block font-medium">低い</span>
                  <span className="text-xs sm:text-sm text-gray-500">複数サーバー間でセッション共有が必要</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">高い</span>
                  <span className="text-xs sm:text-sm text-gray-500">サーバー間で状態共有が不要</span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">セキュリティ</td>
                <td className="border p-2">
                  <span className="block font-medium">セッションIDの保護が重要</span>
                  <span className="text-xs sm:text-sm text-gray-500">CSRF攻撃に対して脆弱性がある可能性</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">署名による改ざん検出</span>
                  <span className="text-xs sm:text-sm text-gray-500">XSS攻撃に対して脆弱性がある可能性</span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">有効期限</td>
                <td className="border p-2">
                  <span className="block font-medium">サーバー側で制御</span>
                  <span className="text-xs sm:text-sm text-gray-500">いつでも無効化可能</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">トークンに組み込まれる</span>
                  <span className="text-xs sm:text-sm text-gray-500">有効期限前の無効化が難しい</span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">適用例</td>
                <td className="border p-2">
                  <span className="block font-medium">モノリシックアプリケーション</span>
                  <span className="text-xs sm:text-sm text-gray-500">単一サーバーでの運用</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">マイクロサービス、SPA</span>
                  <span className="text-xs sm:text-sm text-gray-500">分散システム、クロスドメイン認証</span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">メモリ使用量</td>
                <td className="border p-2">
                  <span className="block font-medium">サーバー側で高い</span>
                  <span className="text-xs sm:text-sm text-gray-500">アクティブセッションごとにメモリを消費</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">サーバー側で低い</span>
                  <span className="text-xs sm:text-sm text-gray-500">クライアント側で情報を保持</span>
                </td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold bg-gray-50">ログアウト処理</td>
                <td className="border p-2">
                  <span className="block font-medium">簡単</span>
                  <span className="text-xs sm:text-sm text-gray-500">サーバー側でセッションを削除</span>
                </td>
                <td className="border p-2">
                  <span className="block font-medium">複雑</span>
                  <span className="text-xs sm:text-sm text-gray-500">ブラックリストやリフレッシュトークンが必要</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* メリット・デメリット比較 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-700">従来のセッション認証</h3>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">メリット</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>セッション無効化が容易:</strong> サーバー側でセッションを削除するだけでログアウト処理が完了
              </li>
              <li>
                <strong>情報漏洩リスクが低い:</strong>{" "}
                クライアントにはセッションIDのみを送信し、機密情報はサーバーに保管
              </li>
              <li>
                <strong>実装が比較的シンプル:</strong> 多くのフレームワークで標準的にサポートされている
              </li>
              <li>
                <strong>セッション状態の変更が容易:</strong> サーバー側で直接セッション情報を更新できる
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-2">デメリット</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>サーバーリソースを消費:</strong> アクティブなセッションごとにメモリを使用
              </li>
              <li>
                <strong>スケーリングが難しい:</strong> 複数サーバー間でセッション情報の共有が必要
              </li>
              <li>
                <strong>CSRF攻撃に脆弱:</strong> 適切な対策が必要
              </li>
              <li>
                <strong>モバイルアプリとの連携が複雑:</strong>{" "}
                Cookieベースのため、モバイルアプリとの統合が難しい場合がある
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-700">JWT認証</h3>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">メリット</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>ステートレス:</strong> サーバー側で状態を保持しないため、スケーリングが容易
              </li>
              <li>
                <strong>クロスドメイン対応:</strong> 異なるドメイン間での認証が容易
              </li>
              <li>
                <strong>マイクロサービスに最適:</strong> 複数のサービス間で認証情報を共有しやすい
              </li>
              <li>
                <strong>モバイルアプリとの連携が容易:</strong> HTTPヘッダーで送信できるため、プラットフォームを選ばない
              </li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-2">デメリット</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>トークンの取り消しが難しい:</strong> 一度発行したトークンは有効期限まで有効
              </li>
              <li>
                <strong>ペイロードサイズの制限:</strong> 大きすぎるとHTTPリクエストのオーバーヘッドになる
              </li>
              <li>
                <strong>機密情報の漏洩リスク:</strong> ペイロードに機密情報を含めると漏洩の可能性
              </li>
              <li>
                <strong>リフレッシュトークン管理の複雑さ:</strong> 長期的な認証維持には追加の仕組みが必要
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
