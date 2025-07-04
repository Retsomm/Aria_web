---
title: JavaScript 中的原始型別（Primitive Types）
description: 深入了解 JavaScript 的七種原始型別，包含 Number、String、Boolean、Undefined、Null、Symbol、BigInt 的特性與使用方法
keywords:
  [
    JavaScript,
    原始型別,
    Primitive Types,
    Number,
    String,
    Boolean,
    Undefined,
    "Null",
    Symbol,
    BigInt,
    資料型別,
  ]
---

## 一、原始型別（Primitive Types）

JavaScript 中的**原始型別**是基本資料型別，無法再被拆解，且在記憶體中以值的方式儲存。以下是七種原始型別：

1. **Number**：表示數字，包含整數和浮點數。

2. **String**：表示文字或字串。

3. **Boolean**：表示布林值，只有 true 或 false。

4. **Undefined**：表示變數已宣告但未賦值。

5. **Null**：表示空值或無值。

6. **Symbol**：表示唯一的識別符（ES6 引入）。

7. **BigInt**：表示大於 Number 能處理範圍的整數（ES2020 引入）。

範例：原始型別在 React 中的應用

假設你在 React 組件中需要展示不同型別的資料：

```javascript
import React from "react";

function PrimitiveTypesDemo() {
  const numberValue = 42; // Number
  const stringValue = "Hello, React!"; // String
  const booleanValue = true; // Boolean
  const undefinedValue = undefined; // Undefined
  const nullValue = null; // Null
  const symbolValue = Symbol("unique"); // Symbol
  const bigIntValue = 12345678901234567890n; // BigInt

  return (
    <div>
      <h1>原始型別展示</h1>
      <p>
        數字: {numberValue} (型別: {typeof numberValue})
      </p>
      <p>
        字串: {stringValue} (型別: {typeof stringValue})
      </p>
      <p>
        布林值: {booleanValue.toString()} (型別: {typeof booleanValue})
      </p>
      <p>
        未定義: {undefinedValue} (型別: {typeof undefinedValue})
      </p>
      <p>
        空值: {nullValue} (型別: {typeof nullValue})
      </p>
      <p>
        Symbol: {symbolValue.toString()} (型別: {typeof symbolValue})
      </p>
      <p>
        BigInt: {bigIntValue.toString()} (型別: {typeof bigIntValue})
      </p>
    </div>
  );
}

export default PrimitiveTypesDemo;
```

說明：

- 使用 typeof 運算子可以檢查變數的型別。

- 在 JSX 中，undefined 和 null 不會直接顯示，需轉換成字串或處理。

- Symbol 和 BigInt 需要用 .toString() 來顯示，否則 JSX 會報錯。

---

## 二、型別轉換（Type Conversion/Type Coercion）

型別轉換分為**顯式轉換**（Explicit Conversion）和**隱式轉換**（Implicit Conversion/Type Coercion）。

1\. 顯式轉換

開發者主動使用方法將一種型別轉換為另一種型別。

- **轉為字串**：String() 或 .toString()

- **轉為數字**：Number()、parseInt()、parseFloat()

- **轉為布林值**：Boolean()

範例：顯式轉換

以下是一個 React 組件，展示如何將輸入的字串轉為數字並進行計算：

```javascript
import React, { useState } from "react";

function TypeConversionDemo() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    // 顯式轉換：字串轉數字
    const number = Number(input);
    if (isNaN(number)) {
      setResult("請輸入有效數字");
    } else {
      setResult(number * 2); // 將輸入數字乘以 2
    }
  };

  return (
    <div>
      <h1>型別轉換範例</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入數字"
      />
      <button onClick={handleConvert}>轉換並計算</button>
      <p>結果: {result}</p>
    </div>
  );
}

export default TypeConversionDemo;
```

說明：

- 使用 Number(input) 將輸入的字串轉為數字。

- 使用 isNaN 檢查是否為有效數字，避免無效輸入。

- 輸入框的值預設是字串，必須顯式轉換才能進行數學運算。

### 2\. 隱式轉換（Type Coercion）

JavaScript 會在某些運算中自動轉換型別，例如 + 或 == 運算。

- **字串拼接**：當使用 + 時，若任一操作數是字串，則轉為字串。

- **數值運算**：在數學運算（如 -、\*）中，字串會嘗試轉為數字。

- **布林轉換**：在條件判斷中，值會被轉為布林值。

範例：隱式轉換

以下展示隱式轉換的行為：

```javascript
import React from "react";

function ImplicitConversionDemo() {
  const value1 = "5";
  const value2 = 10;

  const stringConcat = value1 + value2; // 字串拼接，結果為 "510"
  const numberSubtract = value1 - value2; // 字串轉數字，結果為 -5
  const booleanCheck = !value1; // 字串轉布林，結果為 false

  return (
    <div>
      <h1>隱式轉換範例</h1>
      <p>
        字串拼接: {value1} + {value2} = {stringConcat}
      </p>
      <p>
        數值運算: {value1} - {value2} = {numberSubtract}
      </p>
      <p>
        布林轉換: !{value1} = {booleanCheck.toString()}
      </p>
    </div>
  );
}

export default ImplicitConversionDemo;
```

說明：

- value1 + value2：+ 運算將數字轉為字串，結果為 "510"。

- value1 - value2：- 運算將字串 "5" 轉為數字，結果為 -5。

- !value1：非空字串轉為布林值為 true，所以 !value1 為 false。

---

## 三、型別比較（Type Comparison）

JavaScript 有兩種比較運算子：**寬鬆比較（==）** 和 **嚴格比較（===）**。

1\. 寬鬆比較（==）

- 會進行隱式型別轉換，比較值是否相等。

- 可能導致意外結果，因此不建議使用。

2\. 嚴格比較（===）

- 不進行型別轉換，值和型別都必須相等。

- 建議在 React 開發中一律使用 ===。

範例：型別比較

以下是一個 React 組件，展示寬鬆和嚴格比較的差異：

```javascript
import React from "react";

function TypeComparisonDemo() {
  const value1 = "42";
  const value2 = 42;

  const looseEqual = value1 == value2; // true，字串 "42" 轉為數字
  const strictEqual = value1 === value2; // false，型別不同
  const looseNotEqual = value1 != value2; // false
  const strictNotEqual = value1 !== value2; // true

  return (
    <div>
      <h1>型別比較範例</h1>
      <p>
        值1: {value1} (型別: {typeof value1})
      </p>
      <p>
        值2: {value2} (型別: {typeof value2})
      </p>
      <p>寬鬆比較 (==): {looseEqual.toString()}</p>
      <p>嚴格比較 (===): {strictEqual.toString()}</p>
      <p>寬鬆不等 (!=): {looseNotEqual.toString()}</p>
      <p>嚴格不等 (!==): {strictNotEqual.toString()}</p>
    </div>
  );
}

export default TypeComparisonDemo;
```

說明：

- value1 == value2："42" 轉為數字 42，所以為 true。

- value1 === value2：型別不同（字串 vs 數字），所以為 false。

- 在 React 中，為了避免隱式轉換的錯誤，建議一律使用 === 和 !==。

---

## 四、實作練習：結合型別轉換與比較的 React 應用

以下是一個結合輸入、型別轉換與比較的完整範例，讓使用者輸入兩個值並比較它們：

```javascript
import React, { useState } from "react";

function TypeDemoApp() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState("");

  const handleCompare = () => {
    // 顯式轉換為數字
    const num1 = Number(value1);
    const num2 = Number(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult("請輸入有效數字");
      return;
    }

    // 使用嚴格比較
    if (num1 === num2) {
      setResult(`${num1} 等於 ${num2}`);
    } else {
      setResult(`${num1} 不等於 ${num2}`);
    }
  };

  return (
    <div>
      <h1>型別轉換與比較練習</h1>
      <input
        type="text"
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
        placeholder="輸入第一個值"
      />
      <input
        type="text"
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
        placeholder="輸入第二個值"
      />
      <button onClick={handleCompare}>比較</button>
      <p>結果: {result}</p>
    </div>
  );
}

export default TypeDemoApp;
```

操作步驟：

1. 將以上程式碼複製到你的 React 專案中（例如 src/TypeDemoApp.js）。

2. 在 App.js 中引入並使用 `<TypeDemoApp />`。

3. 啟動專案（npm start）。

4. 在輸入框輸入兩個值，點擊「比較」按鈕，觀察結果。

5. 嘗試輸入非數字值，觀察錯誤訊息。

說明：

- 使用 Number() 將輸入值轉為數字，確保運算正確。

- 使用 isNaN 檢查無效輸入。

- 使用 === 進行嚴格比較，避免隱式轉換的錯誤。

---

## 五、注意事項與建議

1. **避免隱式轉換**：隱式轉換可能導致難以預測的行為，建議總是顯式轉換型別。

2. **使用嚴格比較**：在 React 中，=== 和 !== 是標準做法，能減少錯誤。

3. **檢查型別**：使用 typeof 或 instanceof 檢查變數型別，確保程式邏輯正確。

4. **處理輸入**：在 React 表單中，輸入值預設為字串，需特別注意型別轉換。
