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
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-0 h-auto sm:h-10">
          <TabsTrigger value="scenarios" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
            シナリオ別比較
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
            パフォーマンス
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs sm:text-sm p-2 sm:p-3 whitespace-nowrap">
            セキュリティ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4 sm:mb-6">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <Button
                key={key}
                variant={selectedScenario === key ? "default" : "outline"}
                onClick={() => setSelectedScenario(key)}
                className="h-auto p-2 sm:p-3 text-center text-xs sm:text-sm"
              >
                <div className="space-y-1">
                  <div className="font-medium leading-tight break-words">{scenario.title}</div>
                </div>
              </Button>
            ))}
          </div>

          <Card className="w-full overflow-hidden">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg md:text-xl break-words">{scenarios[selectedScenario as keyof typeof scenarios].title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm md:text-base break-words">{scenarios[selectedScenario as keyof typeof scenarios].description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* 従来のセッション認証 */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        {scenarios[selectedScenario as keyof typeof scenarios].traditional.icon}
                      </div>
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold break-words">従来のセッション認証</h4>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">適合度:</span>
                      <Badge
                        className={`${getScoreColor(scenarios[selectedScenario as keyof typeof scenarios].traditional.score)} text-white text-xs`}
                      >
                        {scenarios[selectedScenario as keyof typeof scenarios].traditional.score}/10
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h5 className="font-medium text-green-700 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        メリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].traditional.pros.map((pro, index) => (
                          <li key={index} className="text-xs sm:text-sm text-green-600 flex items-start gap-1 sm:gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="break-words leading-tight">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-red-700 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        デメリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].traditional.cons.map((con, index) => (
                          <li key={index} className="text-xs sm:text-sm text-red-600 flex items-start gap-1 sm:gap-2">
                            <div className="w-1 h-1 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="break-words leading-tight">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* JWT認証 */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-shrink-0">
                        {scenarios[selectedScenario as keyof typeof scenarios].jwt.icon}
                      </div>
                      <h4 className="text-sm sm:text-base md:text-lg font-semibold break-words">JWT認証</h4>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">適合度:</span>
                      <Badge
                        className={`${getScoreColor(scenarios[selectedScenario as keyof typeof scenarios].jwt.score)} text-white text-xs`}
                      >
                        {scenarios[selectedScenario as keyof typeof scenarios].jwt.score}/10
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h5 className="font-medium text-green-700 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        メリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].jwt.pros.map((pro, index) => (
                          <li key={index} className="text-xs sm:text-sm text-green-600 flex items-start gap-1 sm:gap-2">
                            <div className="w-1 h-1 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="break-words leading-tight">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-red-700 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        デメリット
                      </h5>
                      <ul className="space-y-1">
                        {scenarios[selectedScenario as keyof typeof scenarios].jwt.cons.map((con, index) => (
                          <li key={index} className="text-xs sm:text-sm text-red-600 flex items-start gap-1 sm:gap-2">
                            <div className="w-1 h-1 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="break-words leading-tight">{con}</span>
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

        <TabsContent value="performance" className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="text-center mb-4 sm:mb-6 px-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 break-words">パフォーマンス比較</h3>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base break-words">各指標での性能を視覚的に比較</p>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="w-full overflow-hidden">
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex-shrink-0">{metric.icon}</div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold break-words">{metric.metric}</h4>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {/* 従来のセッション認証 */}
                    <div>
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium break-words">従来のセッション認証</span>
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{metric.traditional.label}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <div
                          className={`h-2 sm:h-3 rounded-full ${metric.traditional.color}`}
                          style={{ width: `${metric.traditional.value}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* JWT認証 */}
                    <div>
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="text-xs sm:text-sm font-medium break-words">JWT認証</span>
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{metric.jwt.label}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <div
                          className={`h-2 sm:h-3 rounded-full ${metric.jwt.color}`}
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

        <TabsContent value="security" className="space-y-3 sm:space-y-4 md:space-y-6">
          <div className="text-center mb-4 sm:mb-6 px-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 break-words">セキュリティ比較</h3>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base break-words">各セキュリティ要素での強度を比較</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {securityComparison.map((item, index) => (
              <Card key={index} className="w-full overflow-hidden">
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 break-words">{item.aspect}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(item.traditional.status)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-xs sm:text-sm md:text-base break-words">従来のセッション認証</div>
                        <div className="text-xs sm:text-sm text-gray-600 break-words leading-tight">{item.traditional.description}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(item.jwt.status)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-xs sm:text-sm md:text-base break-words">JWT認証</div>
                        <div className="text-xs sm:text-sm text-gray-600 break-words leading-tight">{item.jwt.description}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-yellow-50 border-yellow-200 w-full overflow-hidden">
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-yellow-800 mb-1 sm:mb-2 text-xs sm:text-sm md:text-base break-words">重要なポイント</h4>
                  <p className="text-yellow-700 text-xs sm:text-sm break-words leading-tight">
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
