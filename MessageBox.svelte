<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import InputBox from "$lib/custom/InputBox.svelte";
    import LoadingSpinner from "$lib/custom/LoadingSpinner.svelte";
  
    export let type: "error" | "confirm" | "alert" | "loading" | "input" | "success" = "alert";
    export let title = "메시지";
    export let message = "";
    export let loadingMessage = "처리 중...";
    export let color = "#3498db";
    export let isOpen = false;
    export let onConfirm: ((result: { success: boolean; values?: Record<string, string> }) => void) | null = null;
    export let inputs: { key: string; label: string; type?: string; placeholder?: string }[] = [];
  
    let inputValues: Record<string, string> = {};
  
    const icons = {
      error: "❌",
      loading: "⏳",
      confirm: "❓",
      alert: "ℹ️",
      success: "✅",
      input: "✍️"
    };
  
    function confirm(success: boolean) {
      if (onConfirm) {
        onConfirm(type === "input" ? { success, values: success ? inputValues : undefined } : { success });
      }
      isOpen = false;
    }
  
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") confirm(false);
      if (event.key === "Enter" && (type === "confirm" || type === "input")) confirm(true);
    }
  
    onMount(() => {
      window.addEventListener("keydown", handleKey);
  
      if (type === "success") {
        setTimeout(() => isOpen = false, 1500);
      }
    });
  
    onDestroy(() => {
      window.removeEventListener("keydown", handleKey);
    });
  </script>
  
  <style>
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
  
    .message-box {
      width: 90%;
      max-width: 400px;
      background: white;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  
    .header {
      padding: 12px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
  
    .content {
      padding: 16px;
      font-size: 16px;
      text-align: center;
    }
  
    .footer {
      display: flex;
      justify-content: center;
      padding: 12px;
    }
  
    .button {
      margin: 0 5px;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: 0.2s;
    }
  
    .confirm-btn {
      background: #27ae60;
      color: white;
    }
  
    .confirm-btn:hover {
      background: #219150;
    }
  
    .cancel-btn {
      background: #e74c3c;
      color: white;
    }
  
    .cancel-btn:hover {
      background: #c0392b;
    }
  </style>
  
  {#if isOpen}
    <div class="overlay">
      <div class="message-box">
        <div class="header" style="background: {color}">{title}</div>
  
        <div class="content">
          {#if type === "loading"}
            <LoadingSpinner size={50} color={color} />
            <p>{loadingMessage}</p>
          {:else}
            <p>{icons[type]} {message}</p>
            {#if type === "input"}
              {#each inputs as input}
                <InputBox
                  bind:value={inputValues[input.key]}
                  label={input.label}
                  type={(input.type || "text") as "number" | "text" | "email" | "password"}
                  placeholder={input.placeholder}
                />
              {/each}
            {/if}
          {/if}
        </div>
  
        {#if type !== "loading" && type !== "success"}
          <div class="footer">
            {#if type === "confirm" || type === "input"}
              <button class="button confirm-btn" on:click={() => confirm(true)}>확인</button>
              <button class="button cancel-btn" on:click={() => confirm(false)}>취소</button>
            {:else}
              <button class="button confirm-btn" on:click={() => confirm(true)}>확인</button>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/if}
  