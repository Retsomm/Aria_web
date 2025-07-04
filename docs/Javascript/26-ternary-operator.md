---
title: 三元運算子(Ternary Operator)
description: 學習 JavaScript 三元運算子的語法與應用，包含條件判斷、簡化 if-else 語句、巢狀使用等技巧
keywords:
  [
    JavaScript,
    三元運算子,
    Ternary Operator,
    條件判斷,
    條件運算,
    if-else,
    簡化語法,
    運算子,
    條件表達式,
  ]
---

### 什麼是三元運算子？

三元運算子是一種三個部分組成的運算子，語法簡單，格式如下：

`條件 ? 條件為真的結果 : 條件為假的結果`

**條件**：一個布林表達式（true 或 false）。

**條件為真的結果**：如果條件為 true，則返回這個值。

**條件為假的結果**：如果條件為 false，則返回這個值。

三元運算子的名稱來自於它包含三個部分（條件、結果 1、結果 2），相較於傳統的 if-else 語句，它更簡潔，但功能較為受限，適合簡單的邏輯判斷。

---

### 三元運算子的語法

在 JavaScript 中，三元運算子的語法如下：

```javascript
變數 = 條件 ? 值1 : 值2;
```

- 如果 條件 為 true，則 變數 會被賦值為 值 1。

- 如果 條件 為 false，則 變數 會被賦值為 值 2。

---

### 與 if-else 的比較

為了讓你更容易理解，我們先來看看三元運算子如何替代簡單的 if-else 語句。

#### 使用 if-else 的範例

假設你想根據使用者的年齡判斷是否成年：

```javascript
let age = 20;
let status;

if (age >= 18) {
  status = "成年";
} else {
  status = "未成年";
}

console.log(status); // 輸出：成年
```

#### 使用三元運算子改寫

同樣的邏輯可以用三元運算子簡化：

```javascript
let age = 20;
let status = age >= 18 ? "成年" : "未成年";

console.log(status); // 輸出：成年
```

可以看到，三元運算子將原本的 5 行 if-else 語句縮減為一行，程式碼更簡潔。

---

### 逐步教學：如何使用三元運算子

以下我會提供幾個實際的前端場景，逐步說明如何使用三元運算子，並確保你能跟著操作。

#### 範例 1：根據條件顯示不同的文字

假設你正在開發一個網頁，根據使用者的登錄狀態顯示「歡迎回來」或「請先登錄」。

**步驟 1：設置 HTML** 在你的 HTML 檔案中，加入一個顯示訊息的元素：

```javascript
<!DOCTYPE html>
<html>
<head>
  <title>三元運算子範例</title>
</head>
<body>
  <h1 id="message"></h1>
  <script src="script.js"></script>
</body>
</html>
```

**步驟 2：撰寫 JavaScript 程式碼** 在 script.js 中使用三元運算子判斷登錄狀態：

```javascript
// 假設 isLoggedIn 表示使用者是否已登錄
let isLoggedIn = true;

// 使用三元運算子決定顯示的訊息
let message = isLoggedIn ? "歡迎回來" : "請先登錄";

// 將訊息顯示到網頁上
document.getElementById("message").textContent = message;
```

**步驟 3：測試程式碼**

1. 將 isLoggedIn 設為 true，執行程式，網頁會顯示「歡迎回來」。

2. 將 isLoggedIn 改為 false，重新整理網頁，會顯示「請先登錄」。

**說明**：

條件 isLoggedIn 是布林值，決定返回哪個字串。

三元運算子直接將結果賦值給 message，簡潔且易讀。

---

#### 範例 2：動態設置 CSS 樣式

假設你想根據溫度動態改變文字顏色（高於 25 度顯示紅色，低於等於 25 度顯示藍色）。

**步驟 1：設置 HTML**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>三元運算子範例</title>
  </head>
  <body>
    <h1 id="temperature">目前溫度：30°C</h1>
    <script src="script.js"></script>
  </body>
</html>
```

**步驟 2：撰寫 JavaScript 程式碼** 在 script.js 中：

```javascript
let temp = 30; // 目前溫度
let color = temp > 25 ? "red" : "blue";

// 套用顏色到 h1 元素
document.getElementById("temperature").style.color = color;
```

**步驟 3：測試程式碼**

1. 當 temp = 30 時，文字顏色會變成紅色。

2. 將 temp 改為 20，重新整理網頁，文字顏色會變成藍色。

**說明**：

三元運算子用來根據 temp > 25 決定顏色值。

這種方式非常適合前端開發中動態改變樣式的場景。

---

#### 範例 3：巢狀三元運算子

三元運算子可以巢狀使用，類似多層 if-else，但要注意不要過於複雜，以免程式碼難以閱讀。

假設你想根據分數顯示等級（>=90 為「優秀」，>=60 為「及格」，其他為「不及格」）：

```javascript
let score = 85;
let grade = score >= 90 ? "優秀" : score >= 60 ? "及格" : "不及格";

console.log(grade); // 輸出：及格
```

**說明**：

第一個條件 score >= 90 檢查是否為「優秀」。

如果第一個條件為 false，則檢查第二個條件 score >= 60。

如果第二個條件也為 false，則返回「不及格」。

**注意**： 巢狀三元運算子容易讓程式碼變得難讀，建議僅在簡單邏輯中使用。如果邏輯複雜，還是使用 if-else 更清晰。

---

### 常見使用場景

三元運算子在前端開發中特別實用，以下是一些常見應用：

1. **賦值**：根據條件快速賦值給變數（如上面的範例）。

2. **動態樣式**：根據條件設置 CSS 屬性（如顏色、顯示/隱藏）。

3. **條件渲染**：在 React 或 Vue 等框架中，根據條件顯示不同的組件或內容。

   ```javascript
   // React 範例
   return <div>{isLoggedIn ? <UserProfile /> : <LoginButton />}</div>;
   ```

4. **簡單邏輯判斷**：快速決定某個值的輸出，像是顯示文字或數字。

---

### 注意事項

1. **保持程式碼可讀性**：

   三元運算子適合簡單的條件判斷。如果邏輯複雜，建議使用 if-else。

   避免過多巢狀三元運算子，例如：

   ```javascript
   let result = condition1
     ? value1
     : condition2
     ? value2
     : condition3
     ? value3
     : value4;
   ```

   這種程式碼很難閱讀，應該改用 if-else。

2. **僅限於返回值**：

   三元運算子必須返回一個值，不能用來執行複雜的程式碼區塊。

   例如，無法在三元運算子中直接寫 console.log 或迴圈。

3. **型別一致性**：

   確保 值 1 和 值 2 的型別一致，否則可能導致意外的錯誤。

---

### 練習題

以下是一個簡單的練習，幫助你熟悉三元運算子：

1. 建立一個 HTML 頁面，包含一個 `<p>` 元素。

2. 使用 JavaScript 和三元運算子，根據變數 isDarkMode（布林值）設置 `<p>` 的背景顏色（true 時為黑色，false 時為白色）。

3. 將結果顯示在網頁上，並嘗試改變 isDarkMode 的值來測試。

**參考解答**： **HTML**：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>三元運算子練習</title>
  </head>
  <body>
    <p id="text">這是測試文字</p>
    <script src="script.js"></script>
  </body>
</html>
```

**JavaScript (script.js)**：

```javascript
let isDarkMode = true;
let backgroundColor = isDarkMode ? "black" : "white";
document.getElementById("text").style.backgroundColor = backgroundColor;
document.getElementById("text").style.color = isDarkMode ? "white" : "black"; // 確保文字可見
```

**測試**：

將 isDarkMode 設為 true，背景應為黑色，文字為白色。

將 isDarkMode 設為 false，背景應為白色，文字為黑色。

---

### 總結

三元運算子是一種簡潔的條件語句，適合快速賦值或簡單邏輯。

語法：條件 ? 值 1 : 值 2。

適用場景：前端動態樣式、條件渲染、簡單邏輯判斷。

注意：避免過於複雜的巢狀使用，保持程式碼可讀性。
