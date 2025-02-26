# Svelte용 커스텀 메시지 박스

## 개요
이 컴포넌트는 Svelte 애플리케이션에서 사용할 수 있는 커스텀 메시지 박스입니다. 알림 메시지를 표시하고, 사용자 입력을 받을 수 있으며, 확인/취소 버튼을 활용한 인터랙션이 가능합니다.

## 설치 방법

다음 파일들을 Svelte 프로젝트에 추가하세요:
- `MessageBox.svelte`
- `InputBox.svelte`
- `LoadingSpinner.svelte`
- `BoxOverlay.svelte`
- `customStore.ts`
- `config/messageBoxColor.json`

## 사용 방법

### 컴포넌트 가져오기 및 초기화

```svelte
<script>
    import BoxOverlay from "./BoxOverlay.svelte";
    import { showMessageBox } from "./customStore";
</script>

<BoxOverlay />
```

### 간단한 알림 메시지 표시

```svelte
<script>
    function showAlert() {
        showMessageBox({
            type: "alert",
            title: "알림",
            content: "이것은 간단한 알림 메시지입니다.",
        });
    }
</script>

<button on:click={showAlert}>알림 표시</button>
```

### 확인 창 표시

```svelte
<script>
    function showConfirm() {
        showMessageBox({
            type: "confirm",
            title: "확인 필요",
            content: "이 작업을 진행하시겠습니까?",
        }).then((result) => {
            if (result) {
                console.log("사용자가 확인함");
            } else {
                console.log("사용자가 취소함");
            }
        });
    }
</script>

<button on:click={showConfirm}>확인 창 표시</button>
```

### 사용자 입력을 받는 메시지 박스

```svelte
<script>
    function showPrompt() {
        showMessageBox({
            type: "input",
            title: "사용자 입력",
            content: "이름을 입력하세요:",
            inputs: [{ name: "username", placeholder: "이름 입력..." }],
        }).then((result) => {
            if (result) {
                console.log("입력된 이름:", result.username);
            }
        });
    }
</script>

<button on:click={showPrompt}>입력 받기</button>
```

## 커스터마이징

### 색상 변경
`config/messageBoxColor.json` 파일을 수정하여 디자인을 변경할 수 있습니다:
```json
{
    "background": "#FFF8E1",
    "font": "#2E2E2E",
    "default-title-background": "#8D6E63",
    "btn-default": "#8D6E63",
    "btn-default-hover": "#6D4C41",
    "btn-cancel": "#C0C0C0",
    "btn-cancel-hover": "#909090",
    "btn-text": "#FAF8F4"
}
```

### 스토어 함수

`customStore.ts` 파일에는 다음과 같은 유틸리티 함수가 포함되어 있습니다:
- `showMessageBox(options)`: 메시지 박스를 표시합니다.
- `closeMessageBox()`: 메시지 박스를 수동으로 닫습니다.

## 라이선스
MIT 라이선스

