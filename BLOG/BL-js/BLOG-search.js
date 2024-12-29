const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const fs = require('fs');
  const blogsJson = fs.readFileSync('https://smhsdejiken.github.io/dejikenHP.github.io/BLOG/BL-js/blogs.json', 'utf-8'); // ファイルから読み込み
  const article = JSON.parse(blogsJson); // JSON 形式の文字列をオブジェクトに変換


  const results = articles.filter(article => article.title.toLowerCase().includes(keyword));

  searchResults.innerHTML = results.map(article => `<li><a href="${article.url}">${article.title}</a></li>`).join('');
});
