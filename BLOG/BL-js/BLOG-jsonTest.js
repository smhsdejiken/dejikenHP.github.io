fetch('https://smhsdejiken.github.io/dejikenHP.github.io/BLOG/BL-js/blogs.json')
  .then(response => response.json())
  .then(data => {
    const reversedBlogs = data.reverse();
    const blogList = document.getElementById('recent-blog-list');
    blogList.innerHTML = '';

    reversedBlogs.forEach(blog => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = blog.url;

      // 画像要素を作成
      const img = document.createElement('img');
      img.src = blog.image; // JSONから画像のURLを取得
      img.style.marginRight = '10px'; // 画像とタイトルの間にスペースを追加 (任意)
      img.style.verticalAlign = 'middle'; // 画像とタイトルの垂直方向の位置を揃える (任意)
      img.style.width = '100px'; // 画像の幅を調整 (任意)
      img.style.height = 'auto'; // 画像の高さは自動調整 (任意)

      a.appendChild(img); // リンクの中に画像を追加
      const titleSpan = document.createElement('span'); // タイトルを囲む要素 (任意)
      titleSpan.textContent = blog.title;
      a.appendChild(titleSpan); // リンクの中にタイトルを追加

      li.appendChild(a);
      blogList.appendChild(li);
    });
  });
