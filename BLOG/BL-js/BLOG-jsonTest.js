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
