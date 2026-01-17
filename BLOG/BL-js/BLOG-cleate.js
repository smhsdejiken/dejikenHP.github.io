const textarea = document.getElementById('FlexTextarea');
const dummy = document.getElementById('dummy');
const preview = document.getElementById('live-preview');

// リアルタイム反映（伸縮・ハイライト・プレビュー）
textarea.addEventListener('input', () => {
    const text = textarea.value;
    
    // 1. エディタ内のハイライト更新
    dummy.innerHTML = highlightTags(text) + '\u200b';
    
    // 2. プレビューの更新
    preview.innerHTML = parseToHtml(text);
    
    // 3. 高さを同期
    textarea.style.height = 'auto';
    textarea.style.height = dummy.scrollHeight + 'px';
});

function highlightTags(text) {
    if (!text) return "";

    // HTMLの特殊文字をエスケープ（< > があると色付けのspanが壊れるため）
    let escaped = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // 色付け置換（上から順番に適用される）
    return escaped
        .replace(/a;/g, '<span class="hl-tag tag-title">')
        .replace(/b;/g, '<span class="hl-tag tag-subtitle">$&</span>')
        .replace(/c;/g, '<span class="hl-tag tag-text">$&</span>')
        .replace(/[dD];/g, '<span class="hl-tag tag-bold">$&</span>')
        .replace(/[eE];/g, '<span class="hl-tag tag-line">$&</span>')
        .replace(/[fF]/g, '<span class="hl-tag tag-code">$&</span>')
        .replace(/#[rgb]|@[yrb]|%|\[#.*?\]/g, '<span class="hl-tag tag-color">$&</span>')
        .replace(/img\(.*?\);/g, '<span class="hl-tag tag-img">$&</span>');
}

let lastText = "";

textarea.addEventListener('input', (e) => {
    let currentText = textarea.value;

    // --- 相方削除ロジック（Ctrl+Z対応版） ---
    if (currentText.length < lastText.length) {
        const deletedPart = findDeletedText(lastText, currentText);
        
        const pairTags = {
            'd;': 'D;', 'D;': 'd;',
            'e;': 'E;', 'E;': 'e;',
            'f;': 'F;', 'F;': 'f;',
            'code;': 'CODE;', 'CODE;': 'code;',
            '#r': '%', '#g': '%', '#b': '%',
            '@y': '%', '@r': '%', '@b': '%', '%': ''
        };

        if (pairTags[deletedPart]) {
            const targetTag = pairTags[deletedPart];
            const targetIndex = currentText.indexOf(targetTag);
            if (targetTag !== "" && targetIndex !== -1) {
                // 相方の位置にカーソルを移動させて、その1箇所を消去する
                textarea.setSelectionRange(targetIndex, targetIndex + targetTag.length);
                document.execCommand('delete'); // これで履歴に残る削除ができる
                currentText = textarea.value;
            }
        }
    }
    lastText = currentText;

    // ハイライト・プレビュー更新（ここは共通）
    dummy.innerHTML = highlightTags(currentText) + '\u200b';
    preview.innerHTML = parseToHtml(currentText);
    textarea.style.height = 'auto';
    textarea.style.height = dummy.scrollHeight + 'px';
});

// タグ挿入関数（Ctrl+Z対応版）
function insertTag(startTag, endTag = "") {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start === end) {
        alert("変更したい文字を選択してください。");
        return;
    }
    
    const val = textarea.value;
    const selectedText = val.substring(start, end);
    const insertContent = startTag + selectedText + endTag;

    // フォーカスを当ててから、選択範囲を新しい文字列で「置換」する
    textarea.focus();
    // execCommandを使うことで、Ctrl+Zの履歴に登録される
    document.execCommand('insertText', false, insertContent);
    
    // inputイベントを強制発火させてプレビューを更新
    textarea.dispatchEvent(new Event('input'));
}

// 削除検知用（変更なし）
function findDeletedText(oldText, newText) {
    const tags = ['d;', 'D;', 'e;', 'E;', 'f;', 'F;', 'code;', 'CODE;', '#r', '#g', '#b', '@y', '@r', '@b', '%'];
    for (let tag of tags) {
        if (oldText.includes(tag) && !newText.includes(tag)) return tag;
    }
    return null;
}

function insertColorTag() {
    const col = document.getElementById('colorPicker').value;
    insertTag(`[${col}]`, '%');
}

function insertImageTag() {
    const url = document.getElementById('imgUrl').value;
    if(!url) return alert("URLを入力してください");
    insertTag(`img(${url});`);
}

// プレビュー・書き出し用HTML変換
function parseToHtml(raw) {
    if (!raw) return "";

    // 1. ソースコード部分 (code; ~ CODE;) を保護しながら分割
    let parts = raw.split(/(code;[\s\S]*?CODE;)/g);
    
    let processedParts = parts.map(part => {
        if (part.startsWith('code;') && part.endsWith('CODE;')) {
            let codeContent = part.replace(/^code;/, '').replace(/CODE;$/, '');
            // HTMLエスケープ
            codeContent = codeContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return `<pre class="code-block"><code>${codeContent.trim()}</code></pre>`;
        } else {
            // 2. 通常テキストの処理（a; を確実に置換する）
            return part
                .replace(/a;/g, '</div><div class="title">') // ここでタイトルに置換
                .replace(/b;/g, '</div><div class="subtitle">')
                .replace(/c;/g, '</div><div class="text">')
                .replace(/d;/g, '<b>').replace(/D;/g, '</b>')
                .replace(/e;/g, '<u>').replace(/E;/g, '</u>')
                .replace(/#r/g, '<span style="color:red;">')
                .replace(/%/g, '</span>')
                .replace(/\[(#.*?)\]/g, '<span style="color:$1;">')
                .replace(/img\((.*?)\);/g, '<img src="$1" class="blog-image">')
                .replace(/\n/g, '<br>');
        }
    });

    return processedParts.join('');
}


// 完成HTML生成（ソースコードの見た目を整える）
function generateFinalHtml() {
    const rawText = textarea.value;
    const lines = rawText.split('\n');
    let firstLine = lines[0] || "";

    // 1行目にa;が含まれていなければ強制付与
    let titleLine = firstLine.includes('a;') ? firstLine : 'a;' + firstLine;
    
    // 記号なしタイトル
    let cleanTitle = titleLine.replace(/a;|%|#r|#g|#b|@y|@r|@b|img\(.*?\);|\[#.*?\]/g, "").trim();
    if (!cleanTitle) cleanTitle = "無題の記事";

    // 本文の構成
    let adjustedRawText = titleLine + '\n' + lines.slice(1).join('\n');
    let content = parseToHtml(adjustedRawText);

    // 文頭の不要な</div>を削除し、インデントを整える
    if (content.startsWith('</div>')) {
        content = content.replace('</div>', '').trim();
    }

    // ★ソースコードを見やすくするための整形（インデントを追加）
    const formattedContent = content.split('\n').map(line => '            ' + line).join('\n');

    // result（下のテキストエリア）に出力
    document.getElementById('result').value = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>${cleanTitle}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" href="BLOG/BL-css/BLOG-contents.css" type="text/css">
</head>
<body>
    <header>
        <img class="headerImg" src="https://lh3.googleusercontent.com/d/19q5HdAGS9HyTxRr9CdYvq6KFsjuMd_0X"></img>
        <ol class="breadlist">
            <li><a href="HOME-home.html">ホーム</a></li>
            <li><a href="BLOG-home.html">ブログ</a></li>
            <li><a href="">${cleanTitle}</a></li>
        </ol>
        <nav>
            <ul>
                <li><a href="HOME-home.html">ホーム</a></li>
                <li><a href="BLOG-home.html">ブログ</a></li>
                <li><a href="MEMBERS2.html">部員紹介</a></li>
                <li><a href="GAMES-home.html">ゲーム</a></li>
                <li><a href="unity">unity紹介</a></li>
            </ul>
        </nav>
    </header>

    <div class="textContentsBox">
        <div class="textContents">
${formattedContent}
        </div>
    </div>

    <footer id="footer">
        <script src="BLOG/BL-js/BLOG-home.js" defer></script>
        <small><span>デジタル研究部 2024</span></small>
                <div id="d2">&nbsp;</div></small>
    </footer>
</body>
</html>`;
}

// 保存（ファイル名指定）
function downloadText() {
    let name = window.prompt("保存するファイル名を入力", "blog-writing");
    if (!name) return;
    if (!name.endsWith(".html")) name += ".html";
    
    const blob = new Blob([document.getElementById('result').value], {type:"text/html"});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
}

// コピー機能
function copyToClipboard() {
    const res = document.getElementById("result");
    res.select();
    document.execCommand("Copy");
    alert("コピーしました");
}

// 時計
setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleString();
}, 1000);
