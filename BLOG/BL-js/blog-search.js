const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const articles = [
    { title: '#1 便利なWebアプリを、 ChatGPTと Googleサイト（無料）で作ろう!!', url: 'blog1.html' },
  ];

  const results = articles.filter(article => article.title.toLowerCase().includes(keyword));

  searchResults.innerHTML = results.map(article => `<li><a href="${article.url}">${article.title}</a></li>`).join('');
});
