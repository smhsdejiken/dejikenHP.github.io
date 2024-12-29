function greet(msg) {
    alert(msg);
}

function gate(){
    // ▼ユーザの入力を求める
    var UserInput = prompt("パスワードを入力して下さい:","");
    // ▼入力内容をチェック
    if( /\W+/g.test(UserInput) ) {
       // ▼半角英数字以外の文字が存在したらエラー
       alert("半角英数字のみを入力して下さい。");
    }
    // ▼キャンセルをチェック
    else if( UserInput != null ) {
       // ▼入力内容からファイル名を生成して移動
       location.href = UserInput + ".html";
    }
 }
 
 
 setInterval(function() {
   document.getElementById("d2").innerHTML = new Date().toLocaleString();
 }, 1000);

fetch('https://smhsdejiken.github.io/dejikenHP.github.io/BLOG/BL-js/blogs.json')
  .then(response => response.json())
  .then(data => {
    // データを逆順に並べ替える
    const reversedBlogs = data.reverse();

    const blogList = document.getElementById('recent-blog-list');

    // リストをクリア（既存のリストがある場合に備えて）
    blogList.innerHTML = '';

    reversedBlogs.forEach(blog => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = blog.url;
      a.textContent = blog.title;
      li.appendChild(a);
      blogList.appendChild(li);
    });
  });
