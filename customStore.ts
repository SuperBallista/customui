import { writable } from "svelte/store";
import { get } from "svelte/store";


export const accessToken = writable<string | null>(null)

export async function authFetch(
    endpoint: string,
    method: string = "GET", // 특정 메서드로 제한하지 않음
    body: any = null,
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
    try{
    const response = await fetch("/api/auth" + endpoint, options)

    const newToken = response.headers.get('Authorization')?.split('Bearer ')[1]
    if (newToken)
    {   accessToken.set(newToken);    }
    
    return response
  }
  catch (error)
  {
    throw error;
  }
  }
  


  export const isOpen = writable<boolean>(false);
export const messageType = writable<"error" | "confirm" | "alert" | "loading" | "input" | "success" | null>(null);
export const messageTitle = writable<string>("");
export const messageContent = writable<string>("");
export const messageColor = writable<string>("#3498db");
export const messageInputs = writable<{ key: string; label: string; type?: string; placeholder?: string }[]>([]);
export const messageResolve = writable<((res: { success: boolean; values?: Record<string, string> }) => void) | null>(null);


  export type MessageBoxOptions = {
    type?: "error" | "confirm" | "alert" | "loading" | "input" | "success";
    title?: string;
    message?: string;
    color?: string;
    inputs?:  { key: string; label: string; type?: string; placeholder?: string }[];
  };
  
  type MessageBoxResponse = { success: boolean; values?: Record<string, string> };
    
  export function showMessageBox(type:"error" | "confirm" | "alert" | "loading" | "input" | "success", title: string, message: string, color?: string, inputs?: { key: string; label: string; type?: string; placeholder?: string }[] ): Promise<MessageBoxResponse> {
    return new Promise((resolve) => {
      isOpen.set(true);
      messageType.set(type ?? null);
      messageTitle.set(title ?? "제목 없음"); 
      messageContent.set(message ?? "메세지가 없습니다");
      messageColor.set(color ?? "#3498db");
      messageInputs.set(inputs ?? []);
      messageResolve.set(resolve);
      console.log("✅ showMessageBox 실행됨:", get(isOpen), get(messageType), get(messageTitle), get(messageContent), get(messageContent), get(messageColor), get(messageInputs), get(messageResolve));

      if (type === "success") {
        setTimeout(() => {
          resolve({ success: true });
          closeMessageBox();
        }, 1500);
      }
    });
  }
  
  export function closeMessageBox() {
    console.log("🚨 closeMessageBox 실행됨! 초기화 시작", {
      title: get(messageTitle),
      content: get(messageContent),
      type: get(messageType),
      isOpen: get(isOpen),
    });
  
    isOpen.set(false);
    messageType.set(null);
    messageTitle.set("");
    messageContent.set("");
    messageColor.set("#3498db");
    messageInputs.set([]);
    messageResolve.set(null);
  }
  
  messageTitle.subscribe(value => {
    console.log("🔄 messageTitle 변경 감지:", value, " | 현재 상태:", {
      isOpen: get(isOpen),
      messageType: get(messageType),
      messageContent: get(messageContent),
    });
  });
  