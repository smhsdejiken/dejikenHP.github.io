// JSONファイルの読み込み
fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
  .then(response => response.json())
  .then(data => {
    const imagesDiv = document.getElementById('images');
    const containerDiv = document.getElementById('container');
    let currentList = null; // 現在表示されているリスト
    let currentParentDiv = null; // 現在リストが表示されている親要素

    // 画像と名前を表示
    data.forEach(item => {
      const imageItemDiv = document.createElement('div');
      imageItemDiv.classList.add('image-item');

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.addEventListener('click', () => {
        // 画像がクリックされたときの処理
        if (currentList === item.list && currentParentDiv === imageItemDiv) {
          // 同じ画像がクリックされた場合はリストを非表示にする
          const existingList = imageItemDiv.querySelector('ul');
          if (existingList) {
            existingList.remove();
          }
          currentList = null;
          currentParentDiv = null;
        } else {
          // 異なる画像がクリックされた場合はリストを表示する
          displayList(item.list, imageItemDiv);
          currentList = item.list;
          currentParentDiv = imageItemDiv;
        }
      });
      imageItemDiv.appendChild(img);

      const nameDiv = document.createElement('div');
      nameDiv.textContent = item.name;
      imageItemDiv.appendChild(nameDiv);

      imagesDiv.appendChild(imageItemDiv);
    });

    // リストを表示する関数
    function displayList(list, parentDiv) {
      // 既存のリストをクリア
      const existingList = parentDiv.querySelector('ul');
      if (existingList) {
        existingList.remove();
      }

      const ul = document.createElement('ul');
      list.forEach(item => {
        const li = document.createElement('li');
        if (item.startsWith('#')) {
          // 色コードの場合
          li.innerHTML = `<span style="background-color: ${item};">&nbsp;&nbsp;&nbsp;</span>${item}`;
        } else {
          // 色コード以外の場合
          li.textContent = item;
        }
        ul.appendChild(li);
      });
      parentDiv.appendChild(ul);
    }
  });
