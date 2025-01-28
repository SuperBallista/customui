export async function authFetch(
    endpoint: string,
    method: string = "GET", // 특정 메서드로 제한하지 않음
    body: any = null,
    accessToken: string = ""
  ) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
  
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
  
    const options: RequestInit = {
      method,
      headers,
      credentials: "include", // 쿠키 자동 포함
    };
  
    if (body && method !== "GET" && method !== "HEAD") {
      options.body = JSON.stringify(body);
    }
  
    return fetch(endpoint, options); // fetch 결과를 그대로 반환
  }
  