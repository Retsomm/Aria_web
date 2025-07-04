---
title: undefined和not defined差異
description: 深入了解 JavaScript 中 undefined 和 not defined 的差異，包含變數宣告、錯誤類型、除錯技巧等重要概念
keywords:
  [
    JavaScript,
    undefined,
    not defined,
    變數宣告,
    ReferenceError,
    變數狀態,
    除錯,
    錯誤處理,
    變數類型,
  ]
---

## 1\. `undefined` 是什麼？

**`undefined` 是一個 JavaScript 中的值**，意思是「已經宣告但還沒被賦值」。

#### 範例：

```javascript
let a;
console.log(a); // 印出 undefined
```

解釋：

- `a` 有被宣告（`let a;`），只是**沒有指定值**，所以預設是 `undefined`。

---

## 2\. `not defined` 是什麼？

**`not defined` 是一種錯誤訊息（ReferenceError）**，意思是「這個變數根本沒被宣告過」！

#### 範例：

```javascript
console.log(b); // ReferenceError: b is not defined
```

解釋：

- `b` 根本沒宣告過，直接使用就會報錯：「`b is not defined`」。

---

#### 比較表：

| 狀態          | 說明             | 會不會報錯              | console.log() 結果 |
| ------------- | ---------------- | ----------------------- | ------------------ |
| `undefined`   | 變數有宣告但沒值 | 不會報錯                | `undefined`        |
| `not defined` | 變數根本沒宣告   | 會報錯 (ReferenceError) | 無法印出           |

---

#### 小技巧（幫助你記憶）

- `undefined`：是 JavaScript 給你的「預設值」。

- `not defined`：是你「連名字都沒講」，JavaScript 找不到它。

---

#### 延伸補充：`typeof` 的特例

```javascript
console.log(typeof x); // "undefined"
```

雖然 `x` 沒宣告過，但 `typeof` 不會報錯，會回傳 `'undefined'`。這是 JavaScript 的特例之一。
