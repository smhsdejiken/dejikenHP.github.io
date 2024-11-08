function flexTextarea(el) {
    const dummy = el.querySelector('.FlexTextarea__dummy')
    el.querySelector('.FlexTextarea__textarea').addEventListener('input', e => {
      dummy.textContent = e.target.value + '\u200b'
    })
  }
  
  document.querySelectorAll('.FlexTextarea').forEach(flexTextarea)
  
  function replaceText() {
    const inputText = document.getElementById('FlexTextarea').value;
    const replacedText = inputText
      .replace(/a;/g, '</span><span class="tytle">'+ '\r\n') 
      .replace(/b;/g, '</span><span class="subtytle">'+ '\r\n')
      .replace(/c;/g, '</span><span class="text">'+ '\r\n')
      .replace(/\n/g, '<br>'+ '\r\n'); // 改行を<br>タグに置換

    document.getElementById('result').textContent = '<!DOCTYPE html>\r\n<html>\r\n    <head>\r\n        <title>デジタル研究部ブログ（仮）</title>\r\n        <meta charset="UTF-8">\r\n        <link rel="stylesheet" href="../BL-css/BLOG-contents.css" type="text/css">\r\n    </head>\r\n        <header>\r\n            <p1>デジタル研究部</p1>\r\n            <ol class="breadlist">\r\n                <li><a href="../../HOME/HO-html/HOME-home.html">ホーム</a></li>\r\n                <li><a href="BLOG-home.html">ブログ</a></li>\r\n                <li><a href="blog.html">タイトルとＵＲＬを入れる</a></li>\r\n                </ol>\r\n            <nav>\r\n                <ul>\r\n                    <li><a class="current" href="../../HOME/HO-html/HOME-home.html">ホーム</a></li>\r\n                    <li><a href="BLOG-home.html">ブログ</a></li>\r\n                    <li><a href="../../MEMBERS/ME-html/MEMBERS1.html">部員紹介</a></li>\r\n                    <li><a href="../../GAMES/GA-html/GAMES-home.html">ゲーム</a></li>\r\n                    <li><a href="unity">unity紹介</a></li>\r\n                    </ul>\r\n            </nav>\r\n        </header>\r\n     <body>'+replacedText+'    </body>\r\n    <footer id="footer">\r\n        <small><span>デジタル研究部 2024</span></small>\r\n    </footer>\r\n\r\n</html>';
  }

  function copyToClipboard() {
    // コピー対象をJavaScript上で変数として定義する
    var copyTarget = document.getElementById("result");

    // コピー対象のテキストを選択する
    copyTarget.select();

    // 選択しているテキストをクリップボードにコピーする
    document.execCommand("Copy");

    // コピーをお知らせする
    alert("コピーできました！ : " );
}

function guide() {
  alert("1.文章を書く\r\n2.変換ボタンを押す\r\n3.コピーまたはダウンロード");
}

function downloadText() {
  const blob = new Blob([result.value],{type:"text/html"});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download ='blog-writing.html';
  link.click();
}

setInterval(function() {
  document.getElementById("d2").innerHTML = new Date().toLocaleString();
}, 1000);
