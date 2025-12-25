/* 全体レイアウト */
.main-container { display: flex; gap: 20px; margin: 10px 0; }
.editor-side, .preview-side { flex: 1; min-width: 0; }
.label { font-size: 12px; color: #666; margin-bottom: 5px; }

/* 魔法の入力エリア（自動伸縮 ＋ ハイライト） */
.FlexTextarea {
    position: relative;
    font-size: 1rem;
    line-height: 1.8;
    border: 1px solid #b6c3c6;
    border-radius: 4px;
    background: #fff;
    min-height: 300px;
}
.FlexTextarea__dummy {
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px;
    min-height: 300px;
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #333; /* 本文の色 */
}
.FlexTextarea__textarea {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    box-sizing: border-box; padding: 10px;
    background-color: transparent; /* 背景を透明にしてダミーの文字を透かす */
    color: transparent; /* 入力文字自体は透明にする */
    caret-color: #333; /* カーソルだけは見せる */
    border: none; font: inherit; resize: none; overflow: hidden;
}

/* タグのハイライト色 */
.hl-tag { color: #ff4500; font-weight: bold; background: #fff0f0; border-radius: 2px; }

/* プレビュー装飾 */
.textContents { border: 1px solid #ddd; padding: 20px; background: #fff; min-height: 300px; }
.title { font-size: 1.5rem; font-weight: bold; border-bottom: 2px solid #333; margin: 10px 0; }
.subtitle { font-size: 1.2rem; border-left: 5px solid #ccc; padding-left: 10px; margin: 10px 0; }
.code-block { background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; font-family: monospace; overflow-x: auto; }
.blog-image { max-width: 100%; height: auto; display: block; margin: 10px 0; }
.toolbar {
    background: #f0f4f5;
    padding: 10px;
    border-radius: 4px 4px 0 0;
    border: 1px solid #b6c3c6;
    border-bottom: none;
}

.toolbar button {
    cursor: pointer;
    padding: 5px 10px;
    margin: 2px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 3px;
    font-size: 0.8rem;
}

.toolbar button:hover {
    background: #e0eeb0;
}

.controls {
    margin: 10px 0;
}
