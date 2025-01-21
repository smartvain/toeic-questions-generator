const DIFY_API_KEY = process.env.DIFY_API_KEY || "";
const DIFY_API_ENDPOINT = process.env.DIFY_API_ENDPOINT || "";

export const generateToeicQuestion = async () => {
  try {
    const response = await fetch(DIFY_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DIFY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {},
        query:
          "TOEICのPart5形式の問題を1問生成してください。選択肢は4つ用意し、正解も示してください。",
        response_mode: "blocking",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API呼び出し中にエラーが発生しました:", error);
    throw error;
  }
};
