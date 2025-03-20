// JSONファイルの読み込み
fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
  .then(response => response.json())
  .then(data => {
    const imagesDiv = document.getElementById('images');
    const listDiv = document.getElementById('list');

    // 画像と名前を表示
    data.forEach(item => {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.addEventListener('click', () => {
        // 画像がクリックされたときの処理
        displayList(item.list);
      });
      imagesDiv.appendChild(img);

      const nameDiv = document.createElement('div');
      nameDiv.textContent = item.name;
      imagesDiv.appendChild(nameDiv);
    });

    // リストを表示する関数
    function displayList(list) {
      listDiv.innerHTML = ''; // 既存のリストをクリア
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
      listDiv.appendChild(ul);
    }
  });
