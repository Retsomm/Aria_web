---
title: 箭頭函式（Arrow Function）
description: 學習 JavaScript ES6 箭頭函式的語法、特性、與傳統函式的差異，以及 this 綁定的重要概念
keywords: [JavaScript, 箭頭函式, Arrow Function, ES6, this綁定, 函式, 語法糖]
---

### 什麼是箭頭函式？

箭頭函式是 ES6（ECMAScript 2015）引入的一種撰寫函式的簡潔語法，使用 => 符號來定義。它的特點是語法更短，且在某些情況下能更方便地處理 this 的綁定問題。箭頭函式特別適合用在需要簡短回調函式（callback function）的情況，例如陣列方法（如 map、filter）或事件處理。

### 箭頭函式的基本語法

箭頭函式的語法比傳統函式簡潔許多，以下是基本結構：

```javascript
// 基本語法
(參數) => 表達式
// 或者有多行時使用大括號
(參數) => {
  // 程式碼區塊
  return 返回值;
}
```

#### 範例 1：無參數的箭頭函式

```javascript
const sayHello = () => "Hello, World!";
console.log(sayHello()); // 輸出：Hello, World!
```

#### 範例 2：單一參數的箭頭函式

如果只有一個參數，可以省略括號：

```javascript
const double = (num) => num * 2;
console.log(double(5)); // 輸出：10
```

#### 範例 3：多個參數的箭頭函式

多個參數需要用括號包住：

```javascript
const add = (a, b) => a + b;
console.log(add(3, 4)); // 輸出：7
```

#### 範例 4：多行程式碼的箭頭函式

如果函式內有多行程式碼，需用大括號 {} 包住，並明確使用 return 來返回結果：

```javascript
const greet = (name, time) => {
  const message = `Hello, ${name}! It's ${time}.`;
  return message;
};
console.log(greet("Alice", "morning")); // 輸出：Hello, Alice! It's morning.
```

#### 範例 5：直接返回物件

如果要直接返回一個物件，必須用括號包住物件，因為 {} 會被誤認為是函式主體：

```javascript
const getUser = (name) => ({ name: name, age: 25 });
console.log(getUser("Bob")); // 輸出：{ name: "Bob", age: 25 }
```

### 箭頭函式與傳統函式的差異

箭頭函式雖然好用，但有些特性與傳統函式不同，以下是詳細比較，幫助你理解何時使用箭頭函式：

#### 1\. **語法簡潔**

**傳統函式**：

```javascript
function multiply(a, b) {
  return a * b;
}
```

**箭頭函式**：

```javascript
const multiply = (a, b) => a * b;
```

    箭頭函式省略了 function 關鍵字，且單行表達式可以省略 return 和 {}，程式碼更簡潔。

#### 2\. **this 的行為不同**

箭頭函式不會創建自己的 this，它會**繼承外層作用域的 this**。這點在物件方法或回調函式中非常重要。

**傳統函式**：

```javascript
const person = {
  name: "Alice",
  sayHello: function () {
    console.log(this.name);
  },
};
person.sayHello(); // 輸出：Alice
```

**箭頭函式**：

```javascript
const person = {
  name: "Alice",
  sayHello: () => {
    console.log(this.name); // 注意：this 指向外層作用域（可能為 window 或 undefined）
  },
};
person.sayHello(); // 輸出：undefined（在嚴格模式下）
```

**結論**：箭頭函式不適合用於定義物件的方法，因為 this 不會指向物件本身。

#### 3\. **沒有 arguments 物件**

箭頭函式無法使用 arguments 物件來存取參數。如果需要存取所有參數，可以使用**剩餘參數（rest parameters）**：

```javascript
const sum = (...args) => args.reduce((total, num) => total + num, 0);
console.log(sum(1, 2, 3, 4)); // 輸出：10
```

#### 4\. **不能作為建構函式**

箭頭函式不能使用 new 關鍵字來創建物件，因為它沒有 prototype 屬性：

```javascript
const Person = (name) => {
  this.name = name;
};
const p = new Person("Alice"); // 錯誤：Person is not a constructor
```

#### 5\. **不能使用 call、apply 或 bind 改變 this**

因為箭頭函式的 this 是固定的，無法透過這些方法改變：

```javascript
const obj = { name: "Alice" };
const sayName = () => console.log(this.name);
sayName.call(obj); // 輸出：undefined（this 不會指向 obj）
```

---

### 常見使用場景

箭頭函式因為簡潔和 this 行為的特性，非常適合以下場景：

#### 1\. **陣列方法（map、filter、forEach 等）**

箭頭函式讓回調函式更簡潔：

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // 輸出：[2, 4, 6, 8]
```

#### 2\. **事件處理**

在 React 中，箭頭函式常用於事件處理，因為它能正確綁定 this：

```javascript
class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this); // 指向 MyComponent 實例
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

#### 3\. **簡短的回調函式**

當只需要簡單的邏輯時，箭頭函式讓程式碼更乾淨：

```javascript
setTimeout(() => console.log("Hello after 1 second!"), 1000);
```

---

### 實作練習：逐步操作

為了讓你更容易上手，我們來實作一個簡單的範例：**過濾陣列中大於某個值的數字，並將結果加倍**。

#### 步驟 1：建立一個數字陣列

```javascript
const numbers = [10, 5, 8, 12, 3];
```

#### 步驟 2：使用 filter 過濾大於 6 的數字

```javascript
const filtered = numbers.filter((num) => num > 6);
console.log(filtered); // 輸出：[10, 8, 12]
```

#### 步驟 3：使用 map 將結果加倍

```javascript
const doubled = filtered.map((num) => num * 2);
console.log(doubled); // 輸出：[20, 16, 24]
```

#### 步驟 4：合併成單一行

你也可以將 filter 和 map 串連起來：

```javascript
const result = numbers.filter((num) => num > 6).map((num) => num * 2);
console.log(result); // 輸出：[20, 16, 24]
```

#### 完整程式碼

```javascript
const numbers = [10, 5, 8, 12, 3];
const result = numbers.filter((num) => num > 6).map((num) => num * 2);
console.log(result); // 輸出：[20, 16, 24]
```

**操作提示**：

1. 開啟瀏覽器的開發者工具（F12），切到 Console 標籤。

2. 複製貼上以上程式碼，執行並觀察結果。

3. 試著改動數字陣列或條件（例如 num > 8），看看輸出如何變化。

---

### 注意事項

1. **不要過度使用箭頭函式**：

   - 如果函式邏輯複雜，建議使用傳統函式，程式碼可讀性會更好。

   - 避免在物件方法中使用箭頭函式，因為 this 行為可能不符合預期。

2. **瀏覽器相容性**：

   - 箭頭函式是 ES6 功能，現代瀏覽器都支援。如果需要支援舊瀏覽器（如 IE），可以使用 Babel 轉譯。

3. **可讀性優先**：

   - 雖然箭頭函式簡潔，但如果團隊成員不熟悉，建議適度搭配註解或使用傳統函式。

---

### 總結

箭頭函式是 JavaScript 中一個強大且簡潔的工具，特別適合用於陣列方法、回調函式和 React 事件處理。它的語法簡單，且 this 的行為讓它在特定場景下非常好用。但要注意它的限制，例如不適合用於物件方法或建構函式。
