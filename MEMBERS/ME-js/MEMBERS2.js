// JSONファイルの読み込み
fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
  .then(response => response.json())
  .then(data => {
    const contentDiv = document.getElementById('content');

    data.forEach(item => {
      const imageItemDiv = document.createElement('div');
      imageItemDiv.classList.add('image-item');

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.addEventListener('click', () => {
        // 画像がクリックされたときの処理
        toggleList(item, listDiv);
      });
      imageItemDiv.appendChild(img);

      const nameDiv = document.createElement('div');
      nameDiv.textContent = item.name;
      imageItemDiv.appendChild(nameDiv);

      const listDiv = document.createElement('div');
      listDiv.classList.add('list-container');
      imageItemDiv.appendChild(listDiv);

      contentDiv.appendChild(imageItemDiv);
    });

    function toggleList(item, listDiv) {
      if (listDiv.innerHTML === '') {
        // リストを表示
        const ul = document.createElement('ul');
        item.list.forEach(listItem => {
          const li = document.createElement('li');
          li.textContent = listItem;
          ul.appendChild(li);
        });
        const colorSpan = document.createElement('span');
        colorSpan.innerHTML = `&nbsp;${item.color}`;
        colorSpan.style.backgroundColor = item.color;
        ul.appendChild(colorSpan);
        listDiv.appendChild(ul);
      } else {
        // リストを非表示
        listDiv.innerHTML = '';
      }
    }
  });
