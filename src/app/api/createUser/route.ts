import fetch from "node-fetch";

import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const { firebaseId, email, name } = await req.json();

  // Express.jsのAPIに動的にリクエストを送信
  const response = await fetch(`http://localhost:4000/api/createUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firebaseId, email, name }),
  });

  // APIからのレスポンスを取得
  const data = await response.json();

  // レスポンスをクライアントに転送
  return NextResponse.json(data);
}