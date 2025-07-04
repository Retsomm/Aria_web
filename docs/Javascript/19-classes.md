---
title: ES6 Class
description: 學習 JavaScript ES6 類別語法，了解物件導向程式設計的概念，包含類別定義、繼承、方法、屬性等核心功能
keywords:
  [JavaScript, ES6, Class, 類別, 物件導向, OOP, 繼承, 建構函式, 方法, 屬性]
---

ES6（ECMAScript 2015）引入了 class 語法，這是一種更直觀、結構化的方式來定義物件和實現物件導向程式設計（OOP）。雖然 JavaScript 的底層仍然是基於原型（prototype）的繼承，但 class 提供了一個更簡潔的語法來建立物件、處理繼承和管理方法。以下是 class 的核心概念和使用方式：

### 1\. 什麼是 Class？

- class 是一種模板，用來創建物件。

- 它封裝了資料（屬性）和行為（方法），讓程式碼更模組化。

- 相較於 ES5 的建構函數（constructor function），class 語法更簡潔且易於閱讀。

### 2\. 基本語法

```javascript
class 類別名稱 {
  constructor(參數1, 參數2) {
    // 建構函數，用來初始化物件的屬性
    this.屬性1 = 參數1;
    this.屬性2 = 參數2;
  }

  // 方法
  方法名稱() {
    // 方法的邏輯
  }
}
```

- **constructor**：當你用 new 關鍵字創建物件時，constructor 會被自動呼叫，用來初始化物件的屬性。

- **this**：指向當前物件實例。

- **方法**：直接在 class 內定義，不需要 function 關鍵字。

### 3\. 創建物件

使用 new 關鍵字來創建一個 class 的實例：

```javascript
const 物件 = new 類別名稱(參數1, 參數2);
```

---

## 範例 1：簡單的 Class

以下是一個簡單的 Person 類別，包含姓名和年齡屬性，以及一個問候方法。

```javascript
// 定義 Person 類別
class Person {
  constructor(name, age) {
    this.name = name; // 設定姓名屬性
    this.age = age; // 設定年齡屬性
  }

  // 定義問候方法
  sayHello() {
    return `你好，我的名字是 ${this.name}，我今年 ${this.age} 歲！`;
  }
}

// 創建 Person 物件
const person1 = new Person("小明", 25);
console.log(person1.name); // 輸出：小明
console.log(person1.age); // 輸出：25
console.log(person1.sayHello()); // 輸出：你好，我的名字是小明，我今年 25 歲！
```

### 說明：

1. constructor 接受 name 和 age 兩個參數，並用 this 將它們綁定到物件的屬性。

2. sayHello 是一個方法，會回傳一個包含物件屬性的問候訊息。

3. 使用 new Person('小明', 25) 創建了一個物件 person1，可以直接訪問其屬性和方法。

---

## 範例 2：Class 繼承

ES6 的 class 支援繼承，使用 extends 關鍵字，讓子類別可以繼承父類別的屬性和方法。

```javascript
// 定義父類別 Animal
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} 發出聲音！`;
  }
}

// 定義子類別 Dog，繼承 Animal
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 呼叫父類別的 constructor
    this.breed = breed; // 新增 breed 屬性
  }

  // 覆寫父類別的 speak 方法
  speak() {
    return `${this.name} 是一隻 ${this.breed}，汪汪叫！`;
  }

  // 新增獨有的方法
  fetchBall() {
    return `${this.name} 正在撿球！`;
  }
}

// 創建 Dog 物件
const dog1 = new Dog("小黑", "拉布拉多");
console.log(dog1.name); // 輸出：小黑
console.log(dog1.breed); // 輸出：拉布拉多
console.log(dog1.speak()); // 輸出：小黑 是一隻 拉布拉多，汪汪叫！
console.log(dog1.fetchBall()); // 輸出：小黑 正在撿球！
```

說明：

1. **extends**：讓 Dog 類別繼承 Animal 類別，這樣 Dog 會擁有 Animal 的所有屬性和方法。

2. **super**：在子類別的 constructor 中呼叫父類別的 constructor，以初始化父類別的屬性（這裡是 name）。

3. **方法覆寫**：子類別可以重新定義父類別的方法（例如 speak），這稱為方法覆寫。

4. **新增方法**：子類別可以定義獨有的方法（例如 fetchBall）。

---

## 範例 3：靜態方法

靜態方法是屬於類別本身的方法，而不是物件實例。使用 static 關鍵字定義。

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

// 直接透過類別名稱呼叫靜態方法
console.log(MathHelper.add(5, 3)); // 輸出：8
console.log(MathHelper.multiply(5, 3)); // 輸出：15

// 創建物件
const math = new MathHelper();
// 靜態方法不能透過物件呼叫
console.log(math.add); // 輸出：undefined
```

說明：

1. **靜態方法**：使用 static 定義的方法只能透過類別名稱（MathHelper）呼叫，不能透過物件實例呼叫。

2. 靜態方法通常用來執行與類別相關的工具函數，不依賴物件的狀態。

---

## 範例 4：Getter 和 Setter

ES6 的 class 支援 get 和 set 方法，用來控制屬性的讀取和設定。

```javascript
class Student {
  constructor(name) {
    this._name = name; // 使用 _name 表示私有屬性（這是慣例，非強制）
  }

  // Getter
  get name() {
    return this._name;
  }

  // Setter
  set name(newName) {
    if (newName.length > 0) {
      this._name = newName;
    } else {
      console.log("錯誤：姓名不能為空！");
    }
  }
}

// 創建 Student 物件
const student = new Student("小華");
console.log(student.name); // 輸出：小華

// 使用 setter 修改姓名
student.name = "小美";
console.log(student.name); // 輸出：小美

// 嘗試設定無效姓名
student.name = ""; // 輸出：錯誤：姓名不能為空！
console.log(student.name); // 輸出：小美（姓名未被修改）
```

說明：

1. **get**：定義一個方法，當訪問屬性時自動執行（例如 [student.name](student.name)）。

2. **set**：定義一個方法，當設定屬性時自動執行（例如 [student.name](student.name) = '小美'）。

3. 使用 \_name 是 JavaScript 的慣例，表示該屬性是「私有」的，雖然 JavaScript 並沒有真正的私有屬性。

---

注意事項

1. **嚴格模式**：class 內的程式碼自動運行在嚴格模式（strict mode），因此某些不規範的寫法會報錯。

2. **不支援私有屬性**：ES6 原生不支援真正的私有屬性，但可以用 \_ 開頭來模擬（慣例）。若需要真正的私有屬性，可以使用 ES2022 的 # 語法（例如 #name）。

3. **不提升（No Hoisting）**：與函數不同，class 聲明不會被提升（hoisted），必須先定義才能使用。
