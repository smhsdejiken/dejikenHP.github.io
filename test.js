const GAS_URL = "https://script.google.com/macros/s/AKfycbwAF06TJh5PvZ1Jd_h_MouftdDT1irlRmSJmBHr2ohCQ7qeLLavPdfZdvN4bt6mW5UK/exec";


async function loadComments(isSilent = false) {
  const list = document.getElementById('commentList');
 
  // はじめて読み込む時（isSilentがfalseの時）だけ「読み込み中」を出す
  if (!isSilent) {
    list.innerHTML = "<p style='color: gray;'>コメントを読み込んでいます...</p>";
  }
 
  try {
    const res = await fetch(GAS_URL);
    const data = await res.json();
   
    // データが届いたら中身を書き換える（ここで「読み込み中」が消える）
    list.innerHTML = data.map(row => `
      <div style="border-bottom: 1px solid #eee; padding: 10px; margin-bottom: 5px;">
        <strong>${row[0]}</strong> <small style="color: #999;">${row[2]}</small><br>
        <div style="margin-top: 5px;">${row[1]}</div>
      </div>
    `).join('');
  } catch (e) {
    console.error("読み込み失敗:", e);
    if (!isSilent) list.innerHTML = "データの取得に失敗しました。";
  }
}


// フォーム送信時の処理
document.getElementById('commentForm').onsubmit = async (e) => {
  e.preventDefault(); // ページのリロードを防ぐ
 
  const btn = e.target.querySelector('button');
  btn.disabled = true; // 二重投稿防止
  btn.innerText = "送信中...";


  const payload = {
    name: document.getElementById('name').value,
    comment: document.getElementById('comment').value
  };


  try {
    await fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });
   
    // 入力欄を空にする
    document.getElementById('comment').value = "";
    // リストを再読み込み
    await loadComments();
    alert("投稿しました！");
  } catch (err) {
    alert("投稿に失敗しました。");
  } finally {
    btn.disabled = false;
    btn.innerText = "投稿する";
  }
};


// 1. 最初は「読み込み中」を出したいので普通に呼ぶ
loadComments();


// 2. 自動更新（30秒おき）の時は true を渡して「読み込み中」を出さない
setInterval(() => {
  loadComments(true);
}, 15000);


// 3. 投稿した直後も、すぐに反映させたいので true で呼ぶ（またはお好みでfalse）
// document.getElementById('commentForm').onsubmit 内
// await loadComments(true);

