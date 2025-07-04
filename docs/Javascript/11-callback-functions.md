---
title: 回呼函式(Callback Function)
description: 學習 JavaScript 回呼函式的基本概念與應用，包含同步回呼、非同步回呼、事件處理、以及如何避免回呼地獄
keywords:
  [
    JavaScript,
    回呼函式,
    Callback Function,
    非同步,
    同步回呼,
    事件處理,
    回呼地獄,
    高階函數,
    函式參數,
  ]
---

### 什麼是回呼函式（Callback Function）？

回呼函式（Callback Function）是一種在程式設計中常用的概念，特別是在 JavaScript 這類支援非同步操作的語言中。它是指**將一個函式作為參數傳遞給另一個函式**，並在特定事件或條件發生時被呼叫執行。簡單來說，回呼函式就是「等某件事完成後，再去執行這個函式」。

在前端開發中，回呼函式常用來處理非同步操作，例如：

處理 API 請求的回應

監聽事件（例如按鈕點擊）

執行某些延遲任務（例如定時器）

---

### 回呼函式的運作方式

1. **定義回呼函式**：你先定義一個函式，這個函式會在未來某個時間點被呼叫。

2. **傳遞回呼函式**：將這個函式作為參數傳遞給另一個函式。

3. **執行回呼函式**：當某個條件滿足（例如非同步任務完成），傳遞進去的回呼函式會被執行。

---

### 簡單範例：JavaScript 中的回呼函式

假設你想模擬一個非同步操作（例如從伺服器取得資料），以下是一個簡單的範例，逐步說明如何使用回呼函式。

#### 範例 1：基本回呼函式

```javascript
// 定義一個非同步函式，接受一個回呼函式作為參數
function fetchData(callback) {
  // 模擬非同步操作（例如從伺服器取得資料）
  setTimeout(() => {
    const data = "這是從伺服器取得的資料！";
    callback(data); // 當資料準備好後，呼叫回呼函式
  }, 2000); // 模擬 2 秒的延遲
}

// 定義回呼函式
function handleData(data) {
  console.log("收到資料：", data);
}

// 呼叫 fetchData 並傳入回呼函式
fetchData(handleData);
```

**執行結果**：

程式會等待 2 秒（模擬非同步操作）。

2 秒後，handleData 函式被呼叫，輸出：收到資料：這是從伺服器取得的資料！。

**逐步說明**：

1. fetchData 是一個模擬非同步操作的函式，接受一個回呼函式 callback。

2. setTimeout 模擬 2 秒的延遲，代表非同步操作（例如從伺服器取資料）。

3. 當延遲結束，callback(data) 會執行傳入的 handleData 函式，並將資料傳給它。

---

#### 範例 2：事件監聽中的回呼函式

回呼函式在前端開發中也常用於事件監聽，例如處理按鈕點擊。

```javascript
// HTML 部分
// <button id="myButton">點我</button>

// JavaScript 部分
// 取得按鈕元素
const button = document.getElementById("myButton");

// 定義回呼函式
function handleClick() {
  console.log("按鈕被點擊了！");
}

// 將回呼函式綁定到按鈕的點擊事件
button.addEventListener("click", handleClick);
```

**執行結果**：

當使用者點擊按鈕時，handleClick 函式會被呼叫，輸出：按鈕被點擊了！。

**逐步說明**：

1. addEventListener 是 JavaScript 提供的函式，用來監聽事件。

2. 它接受兩個參數：事件名稱（"click"）和回呼函式（handleClick）。

3. 當按鈕被點擊時，handleClick 會自動執行。

---

### 回呼函式的優點與缺點

#### 優點

1. **非同步處理**：回呼函式讓你可以在非同步操作完成後執行特定邏輯，非常適合處理 API 請求、定時器或事件。

2. **靈活性**：可以將不同的回呼函式傳入同一個函式，實現不同的行為。

3. **簡單易懂**：對於簡單的非同步操作，回呼函式是一種直觀的解決方案。

#### 缺點

1. **回呼地獄（Callback Hell）**：當有多個巢狀的回呼函式時，程式碼會變得難以閱讀和維護。例如：

   ```javascript
   fetchData(function (data1) {
     processData(data1, function (data2) {
       saveData(data2, function (result) {
         console.log(result);
       });
     });
   });
   ```

   這種巢狀結構讓程式碼變得複雜，難以除錯。

2. **錯誤處理困難**：需要手動在每個回呼函式中處理錯誤，容易遺漏。

---

### 如何改善回呼函式的問題

為了避免回呼地獄和其他問題，JavaScript 提供了更現代的非同步處理方式：

1. **Promise**：使用 Promise 來處理非同步操作，程式碼更簡潔。

2. **Async/Await**：基於 Promise 的語法糖，讓非同步程式碼看起來像同步程式碼。

#### 使用 Promise 重寫範例 1

```javascript
// 使用 Promise 改進
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = "這是從伺服器取得的資料！";
      resolve(data); // 成功時回傳資料
    }, 2000);
  });
}

// 呼叫 Promise
fetchData().then((data) => {
  console.log("收到資料：", data);
});
```

#### 使用 Async/Await 重寫範例 1

```javascript
// 使用 Async/Await 改進
async function getData() {
  const data = await fetchData(); // 等待 fetchData 完成
  console.log("收到資料：", data);
}

getData();
```

**說明**：

Promise 和 Async/Await 讓程式碼更直觀，減少巢狀結構。

錯誤處理也更簡單，可以使用 try...catch。

---

### 實務中的回呼函式

在前端開發中，你可能會遇到以下場景使用回呼函式：

1. **AJAX 請求**：使用 XMLHttpRequest 或 fetch（早期）處理伺服器回應。

2. **事件處理**：如點擊、滑鼠移動、鍵盤輸入等。

3. **定時器**：如 setTimeout 或 setInterval。

4. **第三方庫**：許多舊的 JavaScript 庫（如 jQuery）大量使用回呼函式。

---

### 總結

**回呼函式**是一個函式，作為參數傳遞給另一個函式，並在適當的時機被呼叫。

它在處理非同步操作和事件監聽時非常有用，但容易導致程式碼複雜（回呼地獄）。

現代 JavaScript 推薦使用 Promise 或 Async/Await 來替代複雜的回呼函式。

如果你需要撰寫回呼函式，建議保持程式碼簡潔，並妥善處理錯誤。
