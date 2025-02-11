<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
      messageType, messageTitle, messageContent, messageColor,
      messageInputs, messageResolve, closeMessageBox, messageIcon
    } from "./customStore";
    import InputBox from "./InputBox.svelte";
    import LoadingSpinner from "./LoadingSpinner.svelte";
    import messageBoxColor from "./config/messageBoxColor.json"
  
    let inputValues: Record<string, string> = {};
      let confirmButton: HTMLButtonElement;

    function confirm(success: boolean) {
      if ($messageResolve) {
        $messageResolve(
          $messageType === "input"
            ? { success, values: success ? inputValues : undefined }
            : { success }
        );
      }
      closeMessageBox();
    }
  
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") confirm(false);
      if (event.key === "Enter" && ($messageType === "confirm" || $messageType === "input")) confirm(true);
    }
  
    onMount(() => {
      window.addEventListener("keydown", handleKey);
      if (confirmButton) {
      confirmButton.focus();
    }
    });
  
    onDestroy(() => {
      window.removeEventListener("keydown", handleKey);
    });

  </script>
  
      <div class="message-box" style="background: {messageBoxColor.background}; color: {messageBoxColor.font}">
        <div class="header" style="background: {$messageColor}">
            {#if $messageIcon}
            <div class="icon">{@html $messageIcon}</div>  
            {/if}
            {$messageTitle}</div>  
        <div class="content">
          {#if $messageType === "loading" || $messageType === "success"}
            <LoadingSpinner size={50} color={$messageColor} />
          {/if}
            <p>{$messageContent}</p>
            {#if $messageType === "input"}
              {#each $messageInputs as input}
                <InputBox
                  bind:value={inputValues[input.key]}
                  label={input.label}
                  type={(input.type || "text") as "number" | "text" | "email" | "password"}
                  placeholder={input.placeholder}
                />
              {/each}
            {/if}
        </div>
  
        {#if $messageType !== "loading" && $messageType !== "success"}
          <div class="footer">
            {#if $messageType === "confirm" || $messageType === "input"}
              <button class="button confirm-btn" on:click={() => confirm(true)}>확인</button>
              <button class="button cancel-btn" on:click={() => confirm(false)}>취소</button>
            {:else}
            <button class="button confirm-btn" bind:this={confirmButton} on:click={() => confirm(true)}>확인</button>
            {/if}
          </div>
        {/if}
      </div>
  

<style>
  .icon {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
    .message-box {
      width: 90%;
      max-width: 400px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  
    .header {
      display: flex;
      padding: 12px;
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      align-items: center;
    justify-content: center;
    gap: 8px;
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
