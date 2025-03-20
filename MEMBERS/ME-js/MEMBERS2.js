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
      nameDiv.classList.add('name'); // 名前用のクラスを追加
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
          displayList(item.list, imageItemDiv, nameDiv); // リストを表示する際にnameDivを渡す
          currentList = item.list;
          currentParentDiv = imageItemDiv;
        }
      });
    });

    function displayList(list, parentDiv, nameDiv) { // nameDivを引数に追加
      const existingList = parentDiv.querySelector('ul');
      if (existingList) {
        existingList.remove();
      }

      const ul = document.createElement('ul');
      list.forEach(item => {
        const li = document.createElement('li');
        if (item.startsWith('#')) {
          li.innerHTML = `<span style="background-color: ${item};">&nbsp;</span>${item}`;
        } else {
          li.textContent = item;
        }
        ul.appendChild(li);
      });
      nameDiv.appendChild(ul); // 名前divの下にリストを追加
    }
  });
