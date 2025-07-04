---
title: JavaScript執行堆疊
description: 深入了解 JavaScript 執行堆疊的運作機制，包含函式呼叫、堆疊結構、執行順序與除錯技巧
keywords:
  [
    JavaScript,
    執行堆疊,
    Call Stack,
    函式呼叫,
    單執行緒,
    堆疊結構,
    執行順序,
    除錯,
    LIFO,
  ]
---

什麼是「執行堆疊（Call Stack）」？

JavaScript 是單執行緒（Single-threaded）的語言，意思是同一時間只能做一件事。

這時候就需要一個「排隊處理事情」的機制，而這個機制就是 **執行堆疊（Call Stack）**。它是一種「後進先出（LIFO）」的資料結構，就像是一疊盤子，最後放上去的那一個，會最先被拿出來。

---

執行堆疊怎麼運作？

每次呼叫一個函式（function），就會「推進（push）」到執行堆疊的最上層；當函式執行完，會被「彈出（pop）」堆疊。

#### 舉個簡單例子：

```javascript
function greet() {
  console.log("哈囉！");
}
function start() {
  greet();
}
start();
```

#### 對應的堆疊變化：

1. 執行 `start()` → `start` 被推進堆疊

2. `start` 裡面呼叫 `greet()` → `greet` 被推進堆疊

3. `greet` 執行完畢 → `greet` 被彈出堆疊

4. `start` 執行完畢 → `start` 被彈出堆疊

5. 執行結束 → 堆疊清空

---

視覺化流程圖

```
執行中...

|            |         <--- 執行堆疊最上層
|  greet()   |
|  start()   |
|  global()  |
|____________|         <--- 最底層是全域執行環境
```

---

堆疊溢位（Stack Overflow）

如果你不小心寫了遞迴但沒設定停止條件，就會導致堆疊不斷增加，直到爆掉（記憶體不足）：

```javascript
function callMe() {
  callMe(); // 不停呼叫自己
}
callMe(); //  堆疊溢位！
```

---

延伸：為什麼需要這個堆疊？

- 幫 JavaScript 記得目前正在執行哪個函式、以及它是從哪裡被呼叫的。

- 讓 JavaScript 能夠「有條理地」從內到外完成工作。

---

小結論

| 名稱       | 說明                                  |
| ---------- | ------------------------------------- |
| Call Stack | 一個記錄目前正在執行函式的堆疊        |
| 運作方式   | 後進先出（LIFO）：push 進去、pop 出來 |
| 作用       | 管理同步函式的呼叫流程                |
| 可能錯誤   | 遞迴無限呼叫時，會造成 Stack Overflow |

---

非同步程式是怎麼跳過堆疊來執行的

---

先幫你釐清：JavaScript 是「單執行緒」但能處理非同步？

是的，JavaScript 本身是**單執行緒**，但是它透過 **瀏覽器環境（或 Node.js 環境）幫忙處理非同步任務**，才看起來像是可以「多工」。

這個運作流程就是靠三個關鍵角色：

1. **Call Stack（執行堆疊）**

2. **Web APIs（瀏覽器提供的功能）**

3. **Callback Queue（回呼佇列）**

再加上中間協調者 → **Event Loop（事件循環機制）**

---

一步步流程：非同步程式怎麼跳過堆疊？

#### 來看範例：

```javascript
console.log("開始");
setTimeout(() => {
  console.log("延遲執行");
}, 1000);
console.log("結束");
```

---

執行流程圖解（用文字圖解 Call Stack + Web API + Queue）

```
[1] console.log("開始")        → 立即進入 Call Stack → 印出「開始」 → Pop 掉
[2] setTimeout(...)           → 進入 Call Stack → 註冊到 Web API → Pop 掉
[3] console.log("結束")        → 立即進入 Call Stack → 印出「結束」 → Pop 掉

       此時 Call Stack 清空，等待中...

[4] 1 秒後，Web API 將 callback 放入 Callback Queue

       Event Loop 發現 Call Stack 是空的

[5] 把 callback 移進 Call Stack → 執行 console.log("延遲執行") → 印出文字
```

---

各角色詳細解釋

| 名稱               | 作用                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Call Stack**     | 執行同步程式碼的主角。每次呼叫一個函式就進來。                                                                         |
| **Web APIs**       | 像是 `setTimeout`、`fetch`、DOM 事件，這些是**瀏覽器或 Node.js 提供的功能**。JS 本身沒能力處理非同步，所以外包給這邊。 |
| **Callback Queue** | 當 Web API 任務完成後，會把 callback 放到這裡，等著被執行。                                                            |
| **Event Loop**     | 一直在觀察 Call Stack，如果發現它空了，就會從 Queue 把 callback 推進去執行。                                           |

---

比喻：JavaScript 執行機制像一間便當店

- **主廚（Call Stack）**：一次只能做一個便當（同步程式碼）

- **櫃檯（Web API）**：收到預約便當訂單（像 setTimeout），會交給廚房後面處理

- **取餐櫃（Callback Queue）**：便當做好了放這邊排隊

- **服務鈴（Event Loop）**：只要廚房空了，就叫下一位取便當（callback 被執行）

---

用 console.log 示意非同步的順序

```javascript
console.log("1");
setTimeout(() => {
  console.log("2");
}, 0);
console.log("3");
```

**輸出結果：**

```
1
3
2
```

即使你設定 `setTimeout(..., 0)`，也不會馬上執行，因為它會**跳過 Call Stack**，先進 Web API 再排隊。

---

小結

| 重點                          | 說明                              |
| ----------------------------- | --------------------------------- |
| JS 只能一件一件做（單執行緒） | 所以需要用 Web API 搭配 Queue     |
| 非同步會跳過 Call Stack       | 外包給 Web API 後再進 Queue       |
| Event Loop 是協調者           | 確保當 Stack 空了，才接下一個任務 |

---

JavaScript 非同步流程動畫圖（文字版）

範例程式碼：

```javascript
console.log("1");
setTimeout(() => {
  console.log("2");
}, 1000);
console.log("3");
```

---

動畫式流程（分階段逐步模擬）

---

#### 初始狀態（還沒執行）

```
Call Stack:      [空]
Web APIs:        [空]
Callback Queue:  [空]
Console:         [空]

```

---

#### 第一步：執行 `console.log("1")`

```
Call Stack:      [console.log("1")]      ← 推進堆疊
Web APIs:        [空]
Callback Queue:  [空]
Console:         [1]                     ← 印出「1」
```

執行完 `console.log("1")` 後，從堆疊中彈出

```
Call Stack:      [空]
```

---

#### 第二步：執行 `setTimeout(...)`

```
Call Stack:      [setTimeout()]          ← 呼叫 setTimeout
Web APIs:        [setTimeout callback]   ← 登記給瀏覽器處理（延遲 1000ms）
Callback Queue:  [空]
Console:         [1]
```

`setTimeout` 本身被彈出堆疊，進入等待中...

```
Call Stack:      [空]
```

---

#### 第三步：執行 `console.log("3")`

```
Call Stack:      [console.log("3")]
Web APIs:        [setTimeout callback]
Callback Queue:  [空]
Console:         [1, 3]                  ← 印出「3」
```

執行完 `console.log("3")` 後彈出堆疊：

```
Call Stack:      [空]
```

---

#### 1000ms 後 → `setTimeout` 任務完成，回呼（callback）排進佇列

```
Call Stack:      [空]
Web APIs:        [空]
Callback Queue:  [() => console.log("2")] ← 放進排隊等候區
Console:         [1, 3]
```

---

#### Event Loop 啟動：發現 Call Stack 是空的，把 callback 推進去！

```
Call Stack:      [console.log("2")]
Web APIs:        [空]
Callback Queue:  [空]
Console:         [1, 3, 2]                ← 印出「2」
```

最後執行完畢後，清空堆疊

```
Call Stack:      [空]
```

---

最終輸出：

```
Console: 1
Console: 3
Console: 2
```

---

小結

| 項目               | 說明                                             |
| ------------------ | ------------------------------------------------ |
| `console.log("1")` | 立即進堆疊執行，馬上印出                         |
| `setTimeout`       | 被註冊到 Web API，之後延遲後將 callback 排進佇列 |
| `console.log("3")` | 緊接著同步執行，馬上印出                         |
| `console.log("2")` | 最後經由 Event Loop 送回堆疊再執行               |
