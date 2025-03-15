// JSONファイルの読み込み
fetch('https://github.com/smhsdejiken/dejikenHP.github.io/blob/main/MEMBERS/ME-js/member.json')
  .then(response => response.json())
  .then(data => {
    // 画像の表示
    const imageContainer = document.getElementById('image-container');
    data.forEach(item => {
      const image = document.createElement('img');
      image.src = item.image;
      image.addEventListener('click', () => showList(item.list));
      imageContainer.appendChild(image);
    });
  });

// リストの表示
function showList(list) {
  const listContainer = document.getElementById('list-container');
  listContainer.innerHTML = ''; // 既存のリストをクリア
  list.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    listContainer.appendChild(listItem);
  });
}
