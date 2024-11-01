const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const articles = [
    { title: '#1 便利なWebアプリを、 ChatGPTと Googleサイト（無料）で作ろう!!', url: '../BL-html/BLOG1.html' },
    { title: '#2 今日からあなたも！！', url: '../BL-html/BLOG2.html' },
  ];

  const results = articles.filter(article => article.title.toLowerCase().includes(keyword));

  searchResults.innerHTML = results.map(article => `<li><a href="${article.url}">${article.title}</a></li>`).join('');
});
