"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function JwtStructure() {
  const [activeTab, setActiveTab] = useState("structure")

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <div className="rounded-md bg-blue-100 p-3 text-center w-full md:w-1/3">
            <div className="font-mono text-xs text-blue-800 break-all">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</div>
            <div className="mt-2 text-sm font-semibold text-blue-600">ヘッダー</div>
          </div>
          <div className="rounded-md bg-purple-100 p-3 text-center w-full md:w-1/3">
            <div className="font-mono text-xs text-purple-800 break-all">
              eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9
            </div>
            <div className="mt-2 text-sm font-semibold text-purple-600">ペイロード</div>
          </div>
          <div className="rounded-md bg-green-100 p-3 text-center w-full md:w-1/3">
            <div className="font-mono text-xs text-green-800 break-all">
              SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            </div>
            <div className="mt-2 text-sm font-semibold text-green-600">署名</div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <span className="font-mono">Header</span> . <span className="font-mono">Payload</span> .{" "}
          <span className="font-mono">Signature</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0">
          <TabsTrigger value="structure">構造</TabsTrigger>
          <TabsTrigger value="header">ヘッダー</TabsTrigger>
          <TabsTrigger value="payload">ペイロード</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4 pt-4">
          <p>JWTは3つの部分からなるBase64URLエンコードされた文字列で、ドット（.）で区切られています。</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-blue-600">ヘッダー</strong>: トークンのタイプと使用している署名アルゴリズムを指定
            </li>
            <li>
              <strong className="text-purple-600">ペイロード</strong>: ユーザーIDや権限などのクレーム（情報）を含む
            </li>
            <li>
              <strong className="text-green-600">署名</strong>:
              ヘッダーとペイロードが改ざんされていないことを検証するための署名
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="header" className="space-y-4 pt-4">
          <div className="rounded-md bg-gray-50 p-4">
            <pre className="text-sm">
              {`{
  "alg": "HS256",
  "typ": "JWT"
}`}
            </pre>
          </div>
          <p>ヘッダーは通常、2つの部分から構成されています：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <code className="text-sm bg-gray-100 px-1 rounded">alg</code> - 署名アルゴリズム（例：HMAC SHA256、RSA）
            </li>
            <li>
              <code className="text-sm bg-gray-100 px-1 rounded">typ</code> - トークンのタイプ（JWT）
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="payload" className="space-y-4 pt-4">
          <div className="rounded-md bg-gray-50 p-4">
            <pre className="text-sm">
              {`{
  "sub": "1234567890",
  "name": "User",
  "iat": 1516239022,
  "exp": 1516242622
}`}
            </pre>
          </div>
          <p>
            ペイロードには、クレーム（claims）と呼ばれるエンティティ（通常はユーザー）に関する情報と追加データが含まれます。
          </p>
          <p>一般的なクレーム：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <code className="text-sm bg-gray-100 px-1 rounded">sub</code> - 主体（通常はユーザーID）
            </li>
            <li>
              <code className="text-sm bg-gray-100 px-1 rounded">iat</code> - 発行時刻
            </li>
            <li>
              <code className="text-sm bg-gray-100 px-1 rounded">exp</code> - 有効期限
            </li>
            <li>
              <code className="text-sm bg-gray-100 px-1 rounded">iss</code> - 発行者
            </li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}
