const express = require('express');
const fs = require('node:fs');
const { formidable } = require('formidable');

// ⚠️ 寫作業前先 `npm start` 打開 http://localhost:3000/docs 看規格。

const uploadDir = process.env.UPLOAD_DIR || '/tmp/uploads';
const maxFileSize = (Number(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024;

fs.mkdirSync(uploadDir, { recursive: true });

const router = express.Router();

// ───────────────────────────────────────────────────────────
// TODO 任務五：POST /
//   （實際 URL 是 /uploadImage，因為 app.js 把這個 router 掛在 '/uploadImage'）
// ───────────────────────────────────────────────────────────
//
// Input:  multipart/form-data, field 名稱 `image`
// Output: 200 + { filename, sizeKB, savedPath }
//         400 + { error: 'No file uploaded' }（沒帶 image）
//
// curl 測法：
//   curl -F "image=@fixtures/sample.jpg" http://localhost:3000/uploadImage
//
// 實作提示：
//   1. 建立 formidable 實例（設定 uploadDir、keepExtensions: true、maxFileSize）
//   2. form.parse(req, (err, fields, files) => { ... })
//      - err 不為 null 時（formidable 內部錯誤）→ 回 500 { error: err.message }
//      - files.image 可能是陣列（formidable v3 預設行為）→ 用 Array.isArray 判斷，取 [0]
//      - 沒 file → 回 400
//      - 有 file 回 200，metadata 欄位如下：
//          filename  ← file.originalFilename（原始檔名）
//          sizeKB    ← Math.round(file.size / 1024)（bytes 換算 KB）
//          savedPath ← file.filepath（formidable 存檔後的路徑）

module.exports = router;
