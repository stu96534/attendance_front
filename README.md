# 鈦坦出勤
以前後端分離方式打造出勤打卡功能，此為前端專案。
- 部屬網站為vercel 網址: https://attendance-management-tau.vercel.app

## 測試帳號
### 管理者
- 帳號: root@example.com
- 密碼: tiadmin
### 一般使用者
- 帳號: user1@example.com
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
 - 管理者若輸入密碼錯誤達5次以上則變為預設密碼
 - 觀看各個使用者出勤紀錄
 - 若使用者上鎖，可進行解鎖
 - 可新增一般使用者
 - 可選擇工作地點，進行GPS驗證打卡，若距離工作地點400內，即可打卡
 ### 上下班打卡機制
 - 第一次按打卡鈕為上班時間
 - 第二次按打卡鈕為下班時間
 - 第二次之後按打卡鈕都會記錄為下班時間
 - 上班打卡一次，下班打卡一次，未滿 8 小時列為缺勤
 - 當天若只打卡一次，一樣視作出勤異常
 - 換日時間為上午五點 (GMT+8)
 - 出缺勤僅計算工作日(根據台灣行事曆)
 - 假日上班會註記加班
 - GPS 打卡功能: 在辦公室 400m 內就可以打卡
 - QRcode 打卡功能: 每位員工有自己專屬QRCode，開啟登入頁的QRCode camera掃描即可打卡

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

