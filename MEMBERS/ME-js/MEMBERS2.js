// JSONファイルの読み込み
fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
  .then(response => response.json())
  .then(data => {
    const imagesDiv = document.getElementById('images');

    // 画像を表示
    data.forEach(item => {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.addEventListener('click', () => {
        // 画像がクリックされたときの処理
        displayList(item.list, img);
      });
      imagesDiv.appendChild(img);
    });

    // リストを表示する関数
    function displayList(list, img) {
      // 既存のリストをクリア
      const existingList = img.nextElementSibling;
      if (existingList && existingList.tagName === 'UL') {
        existingList.remove();
      }

      const ul = document.createElement('ul');
      list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      img.parentNode.insertBefore(ul, img.nextSibling); // 画像の下にリストを挿入
    }
  });
