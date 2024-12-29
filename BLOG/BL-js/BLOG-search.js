const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();

  fetch('https://smhsdejiken.github.io/dejikenHP.github.io/BLOG/BL-js/blogs.json') // JSONファイルのURLを指定
    .then(response => response.json()) // JSON形式でレスポンスを解析
    .then(articles => { // articlesとしてデータを受け取る
      const results = articles.filter(article =>
        article.title.toLowerCase().includes(keyword)
      );

      searchResults.innerHTML = results
        .map(article => `<li><a href="${article.url}">${article.title}</a></li>`)
        .join('');
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
      searchResults.innerHTML = '<li>データの読み込みに失敗しました</li>'; // エラーメッセージを表示
    });
});
