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
      .replace(/</g, '&lt;') 
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '\r\n')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    document.getElementById('result').textContent =
     '<pre>'+replacedText+'</pre>';
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
