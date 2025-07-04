---
title: ES6 的 Promise
description: 學習 JavaScript ES6 Promise 的基本概念、語法、狀態管理，以及如何解決回呼地獄問題，建立更清晰的非同步程式流程
keywords:
  [
    JavaScript,
    ES6,
    Promise,
    非同步,
    回呼地獄,
    async,
    then,
    catch,
    非同步程式設計,
  ]
---

## 為什麼要用 Promise？

在以前的 JavaScript（ES6 之前），非同步操作通常會用「callback（回呼函式）」，但這種方式容易造成「回呼地獄（callback hell）」，讓程式碼層層縮排、難以維護，例如：

```javascript
getData(function (result) {
  parseData(result, function (parsed) {
    saveToDB(parsed, function (response) {
      console.log("完成！");
    });
  });
});
```

這種結構被戲稱為「波動拳」。

---

## Promise 是什麼？

Promise 是一種可以「代表未來某個時間點結果（成功或失敗）」的物件。

你可以想像成：Promise 就像一個「保證未來會給你資料」的包裹。\
 未來有資料時，它會幫你呼叫 `.then()`；如果出錯，它會呼叫 `.catch()`。

---

## Promise 的三種狀態

| 狀態名稱    | 意思                 | 可否改變 |
| ----------- | -------------------- | -------- |
| `pending`   | 尚未完成（初始狀態） | 可以改變 |
| `fulfilled` | 已成功完成           | 不可改變 |
| `rejected`  | 發生錯誤、失敗       | 不可改變 |

一個 Promise 只能轉換一次狀態，之後就固定了（不可逆）。

---

#### 基本用法範例

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("成功了！"); // 進入 fulfilled 狀態
  } else {
    reject("失敗了..."); // 進入 rejected 狀態
  }
});
```

---

### then 方法（處理成功）

```javascript
myPromise.then((result) => {
  console.log(result); // 顯示「成功了！」
});
```

`.then()` 是在成功的時候執行。

---

### catch 方法（處理失敗）

```javascript
myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error); // 如果失敗，這裡會處理錯誤
  });
```

`.catch()` 是在失敗的時候執行，用來捕捉錯誤。

---

## Promise 狀態總結

```javascript
const p = new Promise((resolve, reject) => {
  // 初始為 pending
  setTimeout(() => {
    resolve("成功！");
    // 或：reject("失敗了");
  }, 1000);
});
```

---

## 建立已解決或已拒絕的 Promise

```javascript
Promise.resolve("這是成功的值").then(console.log);
// → 這是成功的值
Promise.reject("這是錯誤訊息").catch(console.error);
// → 這是錯誤訊息
```

---

## then 的串接（鏈式寫法）

你可以把多個 `.then()` 接起來，讓資料一步步處理：

```javascript
Promise.resolve(1)
  .then((num) => {
    return num + 1;
  })
  .then((num) => {
    return num * 2;
  })
  .then((result) => {
    console.log(result); // 會顯示 4
  });
```

---

## Promise 組合技

### Promise.all()

等所有 Promise 都成功，才會回傳結果；只要有一個失敗就整個失敗。

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);
Promise.all([p1, p2, p3])
  .then((results) => {
    console.log(results); // [1, 2, 3]
  })
  .catch((err) => {
    console.error("有一個失敗了：", err);
  });
```

---

### Promise.race()

哪一個 Promise 最快完成（不論成功或失敗），就用它的結果。

```javascript
const slow = new Promise((resolve) => setTimeout(() => resolve("慢的"), 2000));
const fast = new Promise((resolve) => setTimeout(() => resolve("快的"), 1000));
Promise.race([slow, fast]).then((result) => {
  console.log(result); // → 快的
});
```

---

## 小結論

| 方法                | 說明                      |
| ------------------- | ------------------------- |
| `new Promise()`     | 建立一個新的 Promise 物件 |
| `.then()`           | 處理成功結果              |
| `.catch()`          | 處理錯誤結果              |
| `Promise.resolve()` | 建立已成功的 Promise      |
| `Promise.reject()`  | 建立已失敗的 Promise      |
| `Promise.all()`     | 等所有 Promise 完成才執行 |
| `Promise.race()`    | 只要其中一個完成就執行    |
