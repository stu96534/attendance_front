# 打卡出勤系統
以前後端分離方式打造出勤打卡功能，此為前端專案。
- 部屬網站為vercel 網址: https://attendance-front-vert.vercel.app
- 後端專案連結：https://github.com/stu96534/attendance_api

## 測試帳號
### 管理者
- 帳號: admin
- 密碼: tiadmin
### 一般使用者
- 帳號: user1
- 密碼: titaner

## 功能介紹
### 一般使用者
 - 有登入頁面，需登入才可使用功能
 - 一般使用者若輸入密碼錯誤達5次以上則上鎖
 - 使用者可以修改密碼
 - 打卡功能
 - 可按登出鍵登出
### 管理者
 - 一般使用者擁有的基本功能
 - 管理者若輸入密碼錯誤達5次以上則變為預設密碼(tiadmin)
 - 觀看各個使用者出勤紀錄
 - 若使用者上鎖，可進行解鎖
 - 可新增一般使用者
 ### 上下班打卡機制
 - 第一次按打卡鈕為上班時間
 - 第二次按打卡鈕為下班時間
 - 第二次之後按打卡鈕都會記錄為下班時間
 - 上班打卡一次，下班打卡一次，未滿 8 小時列為缺勤
 - 當天若只打卡一次，一樣視作出勤異常
 - 換日時間為上午五點 (GMT+8)
 - 出缺勤僅計算工作日(根據台灣行事曆)
 - 假日上班會註記加班

## 安裝

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 開發工具
### window 10
 - Visual Studio Code
 - vite 版本 4.0.0
 - Vue3 版本 3.2.45
 - vue-router 版本 4.1.6
 - pinia 版本 2.1.6
 - TypeSript 版本 4.7.4
 - bootstrap 版本 5.1.3
 - bootswatch 版本 5.2.3
 - bootstrap-icons 版本 1.10.5
 - axois 版本 0.19.2
 - sweetalert2 版本 11.6.16
 - node-sass 版本 8.0.0
 - sass-loader 版本 13.2.0

