![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

在 **GitHub Copilot 實戰工作坊**中完成的純前端待辦清單應用程式。

## 線上展示

**https://yeqiu970529.github.io/github-bootcamp/**

## 功能

- 新增待辦事項，空白內容不會送出
- 勾選標記完成或取消完成
- 刪除單筆待辦事項
- 即時顯示未完成項目數量
- 篩選全部、未完成或已完成的待辦事項
- 切換深色模式，並記住使用者偏好；未手動選擇時跟隨作業系統設定
- 使用瀏覽器 `localStorage` 保存待辦事項，重新整理後仍可讀取
- 響應式卡片介面，支援手機螢幕

## 技術

- HTML、CSS、原生 JavaScript
- 無框架、無外部套件
- 使用瀏覽器 `localStorage` 保存資料
- 使用 CSS 變數與 `prefers-color-scheme` 支援深色模式
- 可部署至 GitHub Pages

## 開發方式

本專案在工作坊中使用 GitHub Copilot Agent Mode 建立與擴充，並透過 MCP 設定連接 Microsoft Learn 與 GitHub 服務。專案也包含 `.github/copilot-instructions.md` 專案規範與 `.github/prompts/fix-issue.prompt.md` Issue 工作流程提示檔。

## 我學到什麼

- 如何透過清楚的需求描述，讓 Agent Mode 規劃並修改多個檔案。
- 如何使用檢查點與 Git 還原不理想的變更。
- 如何透過 MCP 讓 AI 查詢外部文件與 GitHub 資訊。
- 如何將重複的 Issue 處理流程保存為可重複使用的 prompt。
- 如何檢查功能並將靜態網站部署到 GitHub Pages。
