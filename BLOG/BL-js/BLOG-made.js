const textarea = document.getElementById('FlexTextarea');
const dummy = document.getElementById('dummy');
const preview = document.getElementById('live-preview');

// リアルタイム反映（伸縮・ハイライト・プレビュー）
textarea.addEventListener('input', () => {
    const text = textarea.value;
    updateEditor(text);
});

function updateEditor(text) {
    // 1. エディタ内のハイライト更新
    dummy.innerHTML = highlightTags(text) + '\u200b';
    
    // 2. プレビューの更新
    preview.innerHTML = parseToHtml(text);
    
    // 3. 高さを同期
    textarea.style.height = 'auto';
    textarea.style.height = dummy.scrollHeight + 'px';
}

// エディタ内の色分け
function highlightTags(text) {
    if (!text) return "";
    let escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return escaped
        .replace(/a;/g, '<span class="hl-tag tag-title">$&</span>')
        .replace(/b;/g, '<span class="hl-tag tag-subtitle">$&</span>')
        .replace(/c;/g, '<span class="hl-tag tag-text">$&</span>')
        .replace(/[dD];/g, '<span class="hl-tag tag-bold">$&</span>')
        .replace(/[eE];/g, '<span class="hl-tag tag-line">$&</span>')
        .replace(/f;|F;/g, '<span class="hl-tag tag-code">$&</span>') // コード枠
        .replace(/@r/g, '<span class="hl-tag tag-bg-r">$&</span>') // 背景赤
        .replace(/@y/g, '<span class="hl-tag tag-bg-y">$&</span>') // 背景黄
        .replace(/@b/g, '<span class="hl-tag tag-bg-b">$&</span>') // 背景青
        .replace(/#[rgb]|%|\[#.*?\]/g, '<span class="hl-tag tag-color">$&</span>')
        .replace(/img\(.*?\);/g, '<span class="hl-tag tag-img">$&</span>');
}

let lastText = "";
textarea.addEventListener('input', (e) => {
    let currentText = textarea.value;
    // 相方削除ロジック
    if (currentText.length < lastText.length) {
        const deletedPart = findDeletedText(lastText, currentText);
        const pairTags = {
            'd;': 'D;', 'D;': 'd;',
            'e;': 'E;', 'E;': 'e;',
            'f;': 'F;', 'F;': 'f;',
            '#r': '%', '#g': '%', '#b': '%',
            '@y': '%', '@r': '%', '@b': '%', '%': ''
        };
        if (pairTags[deletedPart]) {
            const targetTag = pairTags[deletedPart];
            const targetIndex = currentText.indexOf(targetTag);
            if (targetTag !== "" && targetIndex !== -1) {
                textarea.setSelectionRange(targetIndex, targetIndex + targetTag.length);
                document.execCommand('delete');
                currentText = textarea.value;
            }
        }
    }
    lastText = currentText;
    updateEditor(currentText);
});

function insertTag(startTag, endTag = "") {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end && endTag !== "") {
        alert("変更したい文字を選択してください。");
        return;
    }
    textarea.focus();
    const selectedText = textarea.value.substring(start, end);
    const insertContent = startTag + selectedText + endTag;
    document.execCommand('insertText', false, insertContent);
    textarea.dispatchEvent(new Event('input'));
}

function findDeletedText(oldText, newText) {
    const tags = ['d;', 'D;', 'e;', 'E;', 'f;', 'F;', '#r', '#g', '#b', '@y', '@r', '@b', '%'];
    for (let tag of tags) {
        if (oldText.includes(tag) && !newText.includes(tag)) return tag;
    }
    return null;
}

function parseToHtml(raw) {
    if (!raw) return "";
    // 1. ソースコード部分 (f; ~ F;) の保護
    let parts = raw.split(/(f;[\s\S]*?F;)/g);
    let processedParts = parts.map(part => {
        if (part.startsWith('f;') && part.endsWith('F;')) {
            let code = part.replace(/^f;/, '').replace(/F;$/, '').trim();
            code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return `<pre class="code-block"><code>${code}</code></pre>`;
        } else {
            // 2. 通常テキストと背景色の変換
            return part
                .replace(/a;/g, '</div><div class="title">')
                .replace(/b;/g, '</div><div class="subtitle">')
                .replace(/c;/g, '</div><div class="text">')
                .replace(/d;/g, '<b>').replace(/D;/g, '</b>')
                .replace(/e;/g, '<u>').replace(/E;/g, '</u>')
                .replace(/@r/g, '<span class="bg-red">')
                .replace(/@y/g, '<span class="bg-yellow">')
                .replace(/@b/g, '<span class="bg-blue">')
                .replace(/#r/g, '<span style="color:red;">')
                .replace(/%/g, '</span>')
                .replace(/\[(#.*?)\]/g, '<span style="color:$1;">')
                .replace(/img\((.*?)\);/g, '<img src="$1" class="blog-image">')
                .replace(/\n/g, '<br>');
        }
    });
    return processedParts.join('');
}

function generateFinalHtml() {
    const lines = textarea.value.split('\n');
    let firstLine = lines[0] || "";
    let cleanTitle = firstLine.replace(/a;|b;|c;|%|#r|#g|#b|@y|@r|@b|img\(.*?\);|\[#.*?\]/g, "").trim();
    if (!cleanTitle) cleanTitle = "無題の記事";

    // 1行目を省いた本文
    let content = parseToHtml(lines.slice(1).join('\n'));
    if (content.startsWith('</div>')) content = content.replace('</div>', '').trim();

    const formattedContent = content.split('\n').map(line => '        ' + line).join('\n');

    document.getElementById('result').value = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>${cleanTitle}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="BLMD/BLMD-contents.css" type="text/css">
</head>
<body>

    <div class="textContentsBox">
        <br><br><br>
        <div class="title"><b>${cleanTitle}</b></div>
        <br>
        <div class="textContents">
${formattedContent}
        </div>
    </div>

    <footer id="footer">
        <script src="BLMD/BLMD-contents.js" defer></script>
        <small><span>デジタル研究部 2026</span></small>
        <div id="d2"></div>
    </footer>
</body>
</html>`;
}

// 補助機能
function insertColorTag() { insertTag(`[${document.getElementById('colorPicker').value}]`, '%'); }
function insertImageTag() { 
    const url = document.getElementById('imgUrl').value;
    if(url) insertTag(`img(${url});`);
}
function copyToClipboard() {
    const res = document.getElementById("result");
    res.select();
    document.execCommand("Copy");
    alert("コピーしました");
}
// 保存（保存先とファイル名を選択）
async function downloadText() {
    const content = document.getElementById('result').value;
    const defaultName = "blog-writing.html";

    // 1. File System Access API が使える場合（Chrome, Edgeなど）
    if ('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: defaultName,
                types: [{
                    description: 'HTMLファイル',
                    accept: {'text/html': ['.html']},
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(content);
            await writable.close();
            return; // 完了
        } catch (err) {
            if (err.name === 'AbortError') return; // キャンセル時は何もしない
            console.error(err);
        }
    }

    // 2. APIが使えない、またはエラー時のフォールバック（従来の方法）
    let name = window.prompt("保存先を選べないブラウザです。ファイル名を入力してください", defaultName);
    if (!name) return;
    if (!name.endsWith(".html")) name += ".html";
    
    const blob = new Blob([content], {type: "text/html"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
}
setInterval(() => { 
    const el = document.getElementById("clock");
    if(el) el.innerText = new Date().toLocaleString(); 
}, 1000);
