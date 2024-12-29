
  .then(response => response.json())
  .then(data => {
    const n = 3; // 表示する記事の数
    const startIndex = Math.max(0, data.length - n);
    const recentBlogs = data.slice(startIndex);

    const blogList = document.getElementById('recent-blog-list'); // HTMLのul要素のid

    recentBlogs.forEach(blog => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = blog.url;
      a.textContent = blog.title;
      li.appendChild(a);
      blogList.appendChild(li);
    });
  });
