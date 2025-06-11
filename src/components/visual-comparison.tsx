"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  Globe,
  Users,
  Shield,
  Cloud,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Cpu,
  HardDrive,
  Network,
} from "lucide-react"

export function VisualComparison() {
  const [selectedScenario, setSelectedScenario] = useState("single-server")

  const scenarios = {
    "single-server": {
      title: "単一サーバーアプリケーション",
      description: "1台のサーバーで運用する小〜中規模のWebアプリケーション",
      traditional: {
        score: 9,
        pros: ["実装が簡単", "セッション管理が直感的", "即座にログアウト可能"],
        cons: ["メモリ使用量が多い"],
        icon: <Server className="h-8 w-8 text-blue-600" />,
      },
      jwt: {
        score: 6,
        pros: ["サーバーメモリ節約"],
        cons: ["オーバーエンジニアリング", "ログアウト処理が複雑"],
        icon: <Globe className="h-8 w-8 text-purple-600" />,
      },
    },
    microservices: {
      title: "マイクロサービスアーキテクチャ",
      description: "複数のサービスが連携する分散システム",
      traditional: {
        score: 3,
        pros: ["セッション管理が確実"],
        cons: ["サービス間でセッション共有が困難", "複雑な実装が必要", "スケーリングが困難"],
        icon: <Server className="h-8 w-8 text-blue-600" />,
      },
      jwt: {
        score: 9,
        pros: ["サービス間で認証情報を簡単に共有", "ステートレス", "スケーラブル"],
        cons: ["トークン管理が必要"],
        icon: <Cloud className="h-8 w-8 text-purple-600" />,
      },
    },
    "mobile-api": {
      title: "モバイルアプリ + API",
      description: "スマートフォンアプリがAPIサーバーと通信",
      traditional: {
        score: 4,
        pros: ["サーバー側で制御しやすい"],
        cons: ["Cookieが使えない", "実装が複雑", "ネイティブアプリとの相性が悪い"],
        icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      },
      jwt: {
        score: 9,
        pros: ["HTTPヘッダーで簡単に送信", "プラットフォーム非依存", "オフライン対応しやすい"],
        cons: ["クライアント側でのセキュリティ管理が重要"],
        icon: <Smartphone className="h-8 w-8 text-purple-600" />,
      },
    },
    "high-traffic": {
      title: "大規模・高トラフィック",
      description: "数万〜数百万ユーザーが同時利用するサービス",
      traditional: {
        score: 4,
        pros: ["セッション無効化が確実"],
        cons: ["大量のメモリ消費", "データベース負荷が高い", "水平スケーリングが困難"],
        icon: <Users className="h-8 w-8 text-blue-600" />,
      },
      jwt: {
        score: 8,
        pros: ["メモリ効率が良い", "水平スケーリング対応", "CDN活用可能"],
        cons: ["トークン取り消しが困難", "リフレッシュトークン管理が複雑"],
        icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      },
    },
  }

  const performanceMetrics = [
    {
      metric: "メモリ使用量",
      traditional: { value: 85, label: "高い", color: "bg-red-500" },
      jwt: { value: 25, label: "低い", color: "bg-green-500" },
      icon: <HardDrive className="h-5 w-5" />,
    },
    {
      metric: "ネットワーク負荷",
      traditional: { value: 30, label: "低い", color: "bg-green-500" },
      jwt: { value: 60, label: "中程度", color: "bg-yellow-500" },
      icon: <Network className="h-5 w-5" />,
    },
    {
      metric: "スケーラビリティ",
      traditional: { value: 40, label: "制限あり", color: "bg-red-500" },
      jwt: { value: 90, label: "優秀", color: "bg-green-500" },
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      metric: "実装の複雑さ",
      traditional: { value: 30, label: "シンプル", color: "bg-green-500" },
      jwt: { value: 70, label: "複雑", color: "bg-red-500" },
      icon: <Cpu className="h-5 w-5" />,
    },
    {
      metric: "セキュリティ制御",
      traditional: { value: 85, label: "強い", color: "bg-green-500" },
      jwt: { value: 60, label: "中程度", color: "bg-yellow-500" },
      icon: <Shield className="h-5 w-5" />,
    },
  ]

  const securityComparison = [
    {
      aspect: "セッション/トークン取り消し",
      traditional: { status: "excellent", description: "サーバー側で即座に無効化可能" },
      jwt: { status: "poor", description: "有効期限まで取り消し困難" },
    },
    {
      aspect: "CSRF攻撃への耐性",
      traditional: { status: "poor", description: "追加の対策が必要" },
      jwt: { status: "good", description: "Authorizationヘッダー使用で自然に防御" },
    },
    {
      aspect: "XSS攻撃への耐性",
      traditional: { status: "good", description: "HttpOnly Cookieで保護" },
      jwt: { status: "poor", description: "LocalStorageは脆弱" },
    },
    {
      aspect: "情報漏洩リスク",
      traditional: { status: "excellent", description: "セッションIDのみ送信" },
      jwt: { status: "fair", description: "ペイロードに機密情報を含めると危険" },
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "good":
        return <CheckCircle className="h-5 w-5 text-blue-600" />
      case "fair":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "poor":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-500"
    if (score >= 6) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0">
          <TabsTrigger value="scenarios">シナリオ別比較</TabsTrigger>
          <TabsTrigger value="performance">パフォーマンス</TabsTrigger>
          <TabsTrigger value="security">セキュリティ</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">どちらを選ぶべき？</h3>
            <p className="text-gray-600">具体的なシナリオで比較してみましょう</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <Button
                key={key}
                variant={selectedScenario === key ? "default" : "outline"}
                onClick={() => setSelectedScenario(key)}
                className="h-auto p-3 text-center"
              >
                <div className="space-y-1">
                  <div className="text-sm font-medium">{scenario.title}</div>
                </div>
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{scenarios[selectedScenario as keyof typeof scenarios].title}</CardTitle>
              <CardDescription>{scenarios[selectedScenario as keyof typeof scenarios].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* 従来のセッション認証 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {scenarios[selectedScenario as keyof typeof scenarios].traditional.icon}
                      <h4 className="text-lg font-semibold">従来のセッション認証</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">適合度:</span>
                      <Badge
                        className={`${getScoreColor(scenarios[selectedScenario as keyof typeof scenarios].traditional.score)} text-white`}
                      >
                        {scenarios[selectedScenario as keyof typeof scenarios].traditional.score}/10
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        メリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].traditional.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        デメリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].traditional.cons.map((con, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* JWT認証 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {scenarios[selectedScenario as keyof typeof scenarios].jwt.icon}
                      <h4 className="text-lg font-semibold">JWT認証</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">適合度:</span>
                      <Badge
                        className={`${getScoreColor(scenarios[selectedScenario as keyof typeof scenarios].jwt.score)} text-white`}
                      >
                        {scenarios[selectedScenario as keyof typeof scenarios].jwt.score}/10
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        メリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].jwt.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-green-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        デメリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].jwt.cons.map((con, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">パフォーマンス比較</h3>
            <p className="text-gray-600">各指標での性能を視覚的に比較</p>
          </div>

          <div className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {metric.icon}
                    <h4 className="text-lg font-semibold">{metric.metric}</h4>
                  </div>

                  <div className="space-y-4">
                    {/* 従来のセッション認証 */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">従来のセッション認証</span>
                        <span className="text-sm text-gray-600">{metric.traditional.label}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${metric.traditional.color}`}
                          style={{ width: `${metric.traditional.value}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* JWT認証 */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">JWT認証</span>
                        <span className="text-sm text-gray-600">{metric.jwt.label}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${metric.jwt.color}`}
                          style={{ width: `${metric.jwt.value}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">セキュリティ比較</h3>
            <p className="text-gray-600">各セキュリティ要素での強度を比較</p>
          </div>

          <div className="space-y-4">
            {securityComparison.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4">{item.aspect}</h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(item.traditional.status)}
                      <div>
                        <div className="font-medium">従来のセッション認証</div>
                        <div className="text-sm text-gray-600">{item.traditional.description}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      {getStatusIcon(item.jwt.status)}
                      <div>
                        <div className="font-medium">JWT認証</div>
                        <div className="text-sm text-gray-600">{item.jwt.description}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">重要なポイント</h4>
                  <p className="text-yellow-700 text-sm">
                    どちらの認証方式も適切に実装すれば安全です。重要なのは、あなたのアプリケーションの要件に合った方式を選択し、
                    セキュリティのベストプラクティスに従って実装することです。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
