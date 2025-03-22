fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
  .then(response => response.json())
  .then(data => {
    const imagesDiv = document.getElementById('images');
    let currentList = null;
    let currentParentDiv = null;

    data.forEach(item => {
      const imageItemDiv = document.createElement('div');
      imageItemDiv.classList.add('image-item');

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      imageItemDiv.appendChild(img);

      const nameDiv = document.createElement('div');
      nameDiv.textContent = item.name;
      nameDiv.classList.add('name');
      imageItemDiv.appendChild(nameDiv);

      imagesDiv.appendChild(imageItemDiv);

      img.addEventListener('click', () => {
        if (currentList === item.list && currentParentDiv === imageItemDiv) {
          const existingList = imageItemDiv.querySelector('ul');
          if (existingList) {
            existingList.remove();
          }
          currentList = null;
          currentParentDiv = null;
        } else {
          displayList(item.list, imageItemDiv, nameDiv);
          currentList = item.list;
          currentParentDiv = imageItemDiv;
        }
      });
    });

    function displayList(list, parentDiv, nameDiv) {
      const existingList = parentDiv.querySelector('ul');
      if (existingList) {
        existingList.remove();
      }

      const ul = document.createElement('ul');
      list.forEach(item => {
        const li = document.createElement('li');
        if (item.startsWith('#')) {
          li.innerHTML = `好きな色:<span style="background-color: ${item};">&nbsp;&nbsp;&nbsp;</span>${item}`;
        } else {
          // ウィンドウ幅に応じて空白を改行または空白なしに変換
          if (window.innerWidth <= 425) {
            li.textContent = item.replace(/\s+/g, '\n'); // 空白を改行に変換
          } else {
            li.textContent = item.replace(/\s+/g, ''); // 空白を削除
          }
        }
        ul.appendChild(li);
      });
      nameDiv.appendChild(ul);
    }
  });

// ウィンドウサイズ変更時にリストの表示を更新
window.addEventListener('resize', () => {
  const lists = document.querySelectorAll('.name ul');
  lists.forEach(list => {
    const nameDiv = list.parentElement;
    const parentDiv = nameDiv.parentElement;
    const dataItem = Array.from(parentDiv.querySelectorAll('img')).map(img => ({
      name: img.alt,
      list: Array.from(list.querySelectorAll('li')).map(li => li.textContent)
    })).find(item => item.name === nameDiv.textContent);
    if (dataItem) {
      displayList(dataItem.list, parentDiv, nameDiv);
    }
  });
});
