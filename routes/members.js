const express = require('express');
const initialMembers = require('../fixtures/members.json');

// ⚠️ 寫作業前先 `npm start` 打開 http://localhost:3000/docs 看 Swagger UI 的規格。

// ───────────────────────────────────────────────────────────
// TODO 任務一：初始化 state + 內部 helpers
// ───────────────────────────────────────────────────────────
//
// 1. 複製 initialMembers（不直接改外部陣列）
//    const members = [...initialMembers];
// 2. 下一個新增會員要用的 id
//    let nextId = initialMembers.length + 1;
// 3. 兩個內部 helper 函式（只在這個檔案用、不 export）：
//    - filterByQuery(list, query)：依 query.level 篩選，沒帶就回全部
//      ← 任務二的 GET / 會呼叫它：filterByQuery(members, req.query)
//    - validateBody(body)：驗 body 有沒有 name + level，要擋 null / undefined / {}
//      驗證通過 → { valid: true }
//      驗證失敗 → { valid: false, error: '缺 name 或 level' }
//      ← 任務三的 POST / 會呼叫它：validateBody(req.body)

// const members = ...
// let nextId = ...
// function filterByQuery(list, query) { ... }
// function validateBody(body) { ... }


const router = express.Router();
// 這個 router 在 app.js 被掛在 '/members'（app.use('/members', membersRouter)），
// 所以以下路由的實際 URL 都會加上 /members 前綴：
//   router.get('/')     → GET /members
//   router.get('/:id')  → GET /members/:id
//   router.post('/')    → POST /members
//   router.put('/:id')  → PUT /members/:id
//   router.delete('/:id') → DELETE /members/:id

// ───────────────────────────────────────────────────────────
// TODO 任務二：GET / 和 GET /:id
// ───────────────────────────────────────────────────────────
//
// GET /
//   Input:  req.query.level?: 'VIP' | 'normal'
//   Output: 200 + [{ id, name, level }, ...]
//   範例：GET /members?level=VIP → 只回 VIP
//   提示：用 filterByQuery(members, req.query)
//
// GET /:id
//   Input:  req.params.id （req.params.id 是 string，記得要使用 Number() 轉換）
//   Output: 200 + { id, name, level }
//           404 + { error: '會員不存在' }
//   範例：GET /members/1 → 回 { id: 1, name: '小華', level: 'VIP' }
//   提示：用 members.find，找不到時結果是 undefined → 回 404 { error: '會員不存在' }

// ───────────────────────────────────────────────────────────
// TODO 任務三：POST /
// ───────────────────────────────────────────────────────────
//
//   Input:  body = { name: string, level: 'VIP' | 'normal' }
//   Output: 201 + 新會員物件（id 自動配）
//           400 + { error: '缺 name 或 level' }
//   範例：POST /members，body { name: '阿文', level: 'VIP' }
//         → 201 { id: 5, name: '阿文', level: 'VIP' }
//   提示：
//     1. validateBody(req.body) 驗證，失敗回 400
//     2. 用 spread 複製 req.body，並附加由 nextId 自動遞增產生的 id
//     3. members.push 將新物件加入陣列
//     4. 以 201 狀態碼回傳剛建立的新會員

// ───────────────────────────────────────────────────────────
// TODO 任務四：PUT /:id 和 DELETE /:id
// ───────────────────────────────────────────────────────────
//
// PUT /:id
//   Input:  req.params.id（string，需 Number() 轉換）
//           body = 部分欄位（例如只傳 { level: 'normal' }）
//   Output: 200 + merge 後的會員
//           404 + { error: '會員不存在' }
//   範例：PUT /members/1，body { level: 'normal' }
//         → 200 { id: 1, name: '小華', level: 'normal' }（name 被保留）
//   提示：
//     1. 用 members.findIndex 找索引
//     2. 索引為 -1 時回傳 404
//     3. 用 spread 合併舊資料與 req.body（注意順序：req.body 需能覆蓋舊欄位）
//     4. 回傳 merge 後的會員
//
// DELETE /:id
//   Input:  req.params.id（string，需 Number() 轉換）
//   Output: 204（無 body）
//           404 + { error: '會員不存在' }
//   範例：DELETE /members/1 → 204（無 body）
//   提示：
//     1. 用 members.findIndex 找索引，-1 → 回 404
//     2. 用 splice 從陣列移除該索引的會員
//     3. 以 204 狀態碼回應（無 body），所以可使用 res.end()

module.exports = router;
