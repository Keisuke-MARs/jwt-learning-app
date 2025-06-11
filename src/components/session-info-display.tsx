import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SessionInfoDisplayProps {
  sessionInfo: {
    id: string
    createdAt: string
    expiresAt: string
    lastAccessed: string
    remainingTime: string
    isValid: boolean
  }
  type: "traditional" | "jwt"
}

export function SessionInfoDisplay({ sessionInfo, type }: SessionInfoDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">セッションステータス</h3>
        <Badge variant={sessionInfo.isValid ? "default" : "destructive"}>{sessionInfo.isValid ? "有効" : "無効"}</Badge>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">セッションID</div>
              <div className="text-sm font-mono truncate">{sessionInfo.id}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">作成日時</div>
              <div className="text-sm">{sessionInfo.createdAt}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">有効期限</div>
              <div className="text-sm">{sessionInfo.expiresAt}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">最終アクセス</div>
              <div className="text-sm">{sessionInfo.lastAccessed}</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">残り時間</div>
              <div className="text-sm">{sessionInfo.remainingTime}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-gray-50 p-4">
        <h4 className="font-semibold mb-2">
          {type === "traditional" ? "従来のセッション管理の特徴" : "JWTセッションの特徴"}
        </h4>
        {type === "traditional" ? (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>セッションIDはサーバー側のセッションストアと紐づいています</li>
            <li>セッション情報はサーバー側に保存されています</li>
            <li>セッションはサーバー側でいつでも無効化できます</li>
            <li>セッションIDはHTTPOnly Cookieとして保存されています</li>
          </ul>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>JWTトークンはすべての情報を自己内に含んでいます</li>
            <li>サーバー側にセッション情報は保存されていません</li>
            <li>トークンは署名によって改ざんから保護されています</li>
            <li>有効期限が切れるまでトークンは有効です</li>
          </ul>
        )}
      </div>
    </div>
  )
}
