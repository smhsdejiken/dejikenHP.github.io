// JSONファイルの読み込み
fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
  .then(response => response.json())
  .then(data => {
    const itemsDiv = document.getElementById('items');

    // 画像と名前を表示
    data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.style.cursor = 'pointer'; // カーソルをポインターに変更

      const nameDiv = document.createElement('div');
      nameDiv.textContent = item.name;

      const listDiv = document.createElement('div');
      listDiv.classList.add('list');

      const ul = document.createElement('ul');
      item.list.forEach(listItem => {
        const li = document.createElement('li');
        li.textContent = listItem;
        ul.appendChild(li);
      });
      listDiv.appendChild(ul);

      img.addEventListener('click', () => {
        // 画像がクリックされたときの処理
        listDiv.style.display = listDiv.style.display === 'block' ? 'none' : 'block';
      });

      itemDiv.appendChild(img);
      itemDiv.appendChild(nameDiv);
      itemDiv.appendChild(listDiv);
      itemsDiv.appendChild(itemDiv);
    });
  });
