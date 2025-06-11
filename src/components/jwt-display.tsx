"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface JwtDisplayProps {
  jwtInfo: {
    token: string
    header: any
    payload: any
    signature: string
    isValid: boolean
    expiresIn: string
  }
}

export function JwtDisplay({ jwtInfo }: JwtDisplayProps) {
  const [activeTab, setActiveTab] = useState("token")

  // トークンの各部分を取得
  const tokenParts = jwtInfo.token.split(".")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">JWTトークン情報</h3>
        <Badge variant={jwtInfo.isValid ? "default" : "destructive"}>{jwtInfo.isValid ? "有効" : "無効"}</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-0">
          <TabsTrigger value="token">トークン</TabsTrigger>
          <TabsTrigger value="header">ヘッダー</TabsTrigger>
          <TabsTrigger value="payload">ペイロード</TabsTrigger>
          <TabsTrigger value="signature">署名</TabsTrigger>
        </TabsList>

        <TabsContent value="token" className="pt-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="rounded-md bg-blue-100 p-2 font-mono text-xs text-blue-800 break-all">
                  {tokenParts[0]}
                </div>
                <div className="rounded-md bg-purple-100 p-2 font-mono text-xs text-purple-800 break-all">
                  {tokenParts[1]}
                </div>
                <div className="rounded-md bg-green-100 p-2 font-mono text-xs text-green-800 break-all">
                  {tokenParts[2]}
                </div>
              </div>
              <div className="text-center text-sm text-gray-500">
                <span className="font-mono">Header</span> . <span className="font-mono">Payload</span> .{" "}
                <span className="font-mono">Signature</span>
              </div>
              <div className="text-sm">
                <div className="font-medium">有効期限: </div>
                <div>{jwtInfo.expiresIn}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="header" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="rounded-md bg-gray-50 p-4">
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(jwtInfo.header, null, 2)}</pre>
              </div>
              <div className="mt-4 text-sm">
                <p className="mb-2">ヘッダーには以下の情報が含まれています：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code className="text-sm bg-gray-100 px-1 rounded">alg</code> - 署名アルゴリズム
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-1 rounded">typ</code> - トークンのタイプ
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payload" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="rounded-md bg-gray-50 p-4">
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(jwtInfo.payload, null, 2)}</pre>
              </div>
              <div className="mt-4 text-sm">
                <p className="mb-2">ペイロードには以下の情報が含まれています：</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code className="text-sm bg-gray-100 px-1 rounded">sub</code> - 主体（ユーザーID）
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-1 rounded">name</code> - ユーザー名
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-1 rounded">iat</code> - 発行時刻
                  </li>
                  <li>
                    <code className="text-sm bg-gray-100 px-1 rounded">exp</code> - 有効期限
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signature" className="pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="rounded-md bg-gray-50 p-4">
                <div className="font-mono text-sm break-all">{jwtInfo.signature}</div>
              </div>
              <div className="mt-4 text-sm">
                <p className="mb-2">署名は以下の方法で生成されます：</p>
                <div className="rounded-md bg-gray-50 p-2 sm:p-4 font-mono text-xs overflow-x-auto">
                  HMACSHA256(
                  <br />
                  &nbsp;&nbsp;base64UrlEncode(header) + &quot;.&quot; +<br />
                  &nbsp;&nbsp;base64UrlEncode(payload),
                  <br />
                  &nbsp;&nbsp;secret
                  <br />)
                </div>
                <p className="mt-2">
                  署名はトークンのヘッダーとペイロードが改ざんされていないことを検証するために使用されます。
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
