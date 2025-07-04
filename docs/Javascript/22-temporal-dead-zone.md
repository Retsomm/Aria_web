---
title: let、const的TDZ
description: 深入了解 JavaScript let 和 const 的暫時性死區（TDZ）概念，包含執行機制、錯誤處理、與 var 的差異
keywords:
  [
    JavaScript,
    TDZ,
    暫時性死區,
    let,
    const,
    變數宣告,
    Hoisting,
    變數提升,
    作用域,
    錯誤處理,
  ]
---

#### 什麼是 TDZ（暫時性死區）？

TDZ 指的是在程式執行過程中，變數雖然已經被宣告（語法上存在），但在實際被賦值之前，該變數**無法存取**，一旦你在這個期間嘗試讀取或使用它，JavaScript 會**丟出錯誤**。

---

#### 為什麼會有 TDZ？

- 讓變數行為更安全，避免你誤用尚未初始化的變數。

- 幫助偵錯，避免你用到「undefined」但不自知的錯誤。

- 讓 `let` 和 `const` 變數行為更符合預期（不像 `var` 會有「變數提升」問題）。

---

#### `var` vs `let`/`const` 行為差異

- `var` 會有**變數提升**（hoisting），但值是 `undefined`，可以在宣告前使用（但會得到 `undefined`）

- `let` 和 `const` 也會被提升（宣告階段先被記憶了），但在被初始化之前，會處於 TDZ，**不能被存取**，會報錯。

---

#### 範例說明

```javascript
console.log(a); // undefined，var 有變數提升，但值還沒賦值，輸出 undefined
var a = 10;
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(c); // ReferenceError: Cannot access 'c' before initialization
const c = 30;
```

#### 為什麼 `let` 和 `const` 會報錯？

- 在宣告 `let b` 或 `const c` 之前，你不能使用他們，這段時間就是 TDZ。

- `const` 必須在宣告時就初始化（必須有初始值），所以 TDZ 更明顯。

---

#### TDZ 更細節範例

```javascript
{
  // TDZ 開始 (從進入區塊開始，到 b 被宣告並初始化之前)
  // console.log(b); // 會報錯

  let b = 100; // TDZ 結束，b 可以被存取

  console.log(b); // 100
}
{
  // 另一個例子：使用函式範圍的 let
  function test() {
    // console.log(x); // TDZ，報錯
    let x = 5;
    console.log(x); // 5
  }
  test();
}
```

---

#### `const` 需要注意的地方

- `const` 宣告的變數必須馬上初始化，不能只宣告不賦值。

- `const` 的值不可重新賦值，但如果是物件或陣列，內容可以修改。

範例：

```javascript
const d; // SyntaxError: Missing initializer in const declaration
const e = 10;
e = 20; // TypeError: Assignment to constant variable.
```

---

#### 總結

| 變數類型 | 變數提升 | 讀取前行為                  | TDZ 狀態期間           |
| -------- | -------- | --------------------------- | ---------------------- |
| `var`    | 有       | 可讀取，值是 `undefined`    | 無                     |
| `let`    | 有       | 讀取會報錯 (ReferenceError) | 進入作用域到初始化期間 |
| `const`  | 有       | 讀取會報錯 (ReferenceError) | 進入作用域到初始化期間 |
