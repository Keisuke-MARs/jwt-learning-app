"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { v4 as uuidv4 } from "uuid";

// 秘密鍵（実際のアプリでは環境変数から取得）
const JWT_SECRET = new TextEncoder().encode("your-jwt-secret-key");
const SESSION_SECRET = "your-session-secret-key";

// モックユーザーデータ
const MOCK_USER = {
  id: "1",
  username: "user",
  password: "password",
  email: "user@example.com",
  role: "user",
};

// セッションストア（実際のアプリではデータベースを使用）
const sessionStore: Record<string, any> = {};

// JWT認証
export async function loginJwt(username: string, password: string) {
  // 認証チェック（実際のアプリではデータベースで検証）
  if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
    return {
      success: false,
      error: "ユーザー名またはパスワードが正しくありません",
    };
  }

  // JWTの作成
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 15 * 60; // 15分後に有効期限切れ

  const payload = {
    sub: MOCK_USER.id,
    name: MOCK_USER.username,
    role: MOCK_USER.role,
    iat: now,
    exp: exp,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(JWT_SECRET);

  // JWTをCookieに保存
  (await cookies()).set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60, // 15分
    path: "/",
  });

  return { success: true };
}

export async function checkJwtSession() {
  try {
    const token = (await cookies()).get("jwt")?.value;

    if (!token) {
      return { success: false, error: "トークンが見つかりません" };
    }

    // トークンの検証
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // トークンの有効期限チェック
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { success: false, error: "トークンの有効期限が切れています" };
    }

    // トークンの各部分を取得
    const tokenParts = token.split(".");

    // JWTの情報を返す
    const jwtInfo = {
      token: token,
      header: JSON.parse(Buffer.from(tokenParts[0], "base64").toString()),
      payload: payload,
      signature: tokenParts[2],
      isValid: true,
      expiresIn: payload.exp
        ? new Date(payload.exp * 1000).toLocaleString()
        : "不明",
    };

    return {
      success: true,
      user: {
        id: payload.sub,
        username: payload.name,
        role: payload.role,
      },
      jwtInfo,
    };
  } catch (error) {
    return { success: false, error: "トークンの検証に失敗しました" };
  }
}

export async function refreshJwtToken() {
  try {
    const token = (await cookies()).get("jwt")?.value;

    if (!token) {
      return { success: false, error: "トークンが見つかりません" };
    }

    // 現在のトークンを検証
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // 新しいトークンを作成
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 15 * 60; // 15分後に有効期限切れ

    const newPayload = {
      sub: payload.sub,
      name: payload.name,
      role: payload.role,
      iat: now,
      exp: exp,
    };

    const newToken = await new SignJWT(newPayload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .sign(JWT_SECRET);

    // 新しいJWTをCookieに保存
    (await cookies()).set("jwt", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60, // 15分
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: "トークンの更新に失敗しました" };
  }
}

export async function logoutJwt() {
  // JWTをCookieから削除
  (await cookies()).delete("jwt");
  return { success: true };
}

// 従来のセッション認証
export async function loginTraditional(username: string, password: string) {
  // 認証チェック（実際のアプリではデータベースで検証）
  if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
    return {
      success: false,
      error: "ユーザー名またはパスワードが正しくありません",
    };
  }

  // セッションの作成
  const sessionId = uuidv4();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15分後

  // セッションストアに保存
  sessionStore[sessionId] = {
    userId: MOCK_USER.id,
    username: MOCK_USER.username,
    role: MOCK_USER.role,
    createdAt: now,
    expiresAt: expiresAt,
    lastAccessed: now,
  };

  // セッションIDをCookieに保存
  (await cookies()).set("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  return { success: true };
}

export async function checkTraditionalSession() {
  const sessionId = (await cookies()).get("sessionId")?.value;

  if (!sessionId || !sessionStore[sessionId]) {
    return { success: false, error: "セッションが見つかりません" };
  }

  const session = sessionStore[sessionId];
  const now = new Date();

  // セッションの有効期限チェック
  if (session.expiresAt < now) {
    delete sessionStore[sessionId];
    return { success: false, error: "セッションの有効期限が切れています" };
  }

  // 最終アクセス時間を更新
  session.lastAccessed = now;

  // 残り時間を計算
  const remainingMs = session.expiresAt.getTime() - now.getTime();
  const remainingMinutes = Math.floor(remainingMs / (1000 * 60));
  const remainingSeconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

  // セッション情報を返す
  const sessionInfo = {
    id: sessionId,
    createdAt: session.createdAt.toLocaleString(),
    expiresAt: session.expiresAt.toLocaleString(),
    lastAccessed: session.lastAccessed.toLocaleString(),
    remainingTime: `${remainingMinutes}分 ${remainingSeconds}秒`,
    isValid: true,
  };

  return {
    success: true,
    user: {
      id: session.userId,
      username: session.username,
      role: session.role,
    },
    sessionInfo,
  };
}

export async function refreshTraditionalSession() {
  const sessionId = (await cookies()).get("sessionId")?.value;

  if (!sessionId || !sessionStore[sessionId]) {
    return { success: false, error: "セッションが見つかりません" };
  }

  const session = sessionStore[sessionId];
  const now = new Date();

  // セッションの有効期限チェック
  if (session.expiresAt < now) {
    delete sessionStore[sessionId];
    return { success: false, error: "セッションの有効期限が切れています" };
  }

  // 有効期限を延長
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // 15分後
  session.expiresAt = expiresAt;
  session.lastAccessed = now;

  // Cookieの有効期限も更新
  (await cookies()).set("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });

  return { success: true };
}

export async function logoutTraditional() {
  const sessionId = (await cookies()).get("sessionId")?.value;

  if (sessionId && sessionStore[sessionId]) {
    // セッションストアからセッションを削除
    delete sessionStore[sessionId];
  }

  // セッションIDをCookieから削除
  (await cookies()).delete("sessionId");

  return { success: true };
}
