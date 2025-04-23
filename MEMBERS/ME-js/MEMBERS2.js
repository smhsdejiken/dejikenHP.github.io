fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
   .then(response => response.json())
   .then(data => {
     const imagesDiv = document.getElementById('images');
     let currentList = null;
     let currentParentDiv = null;
     let originalLists = new Map(); // 元のリストを保存するMap

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
      originalLists.set(item.name, item.list); // 元のリストを保存

      img.addEventListener('click', () => {
         if (currentList === item.list && currentParentDiv === imageItemDiv) {
          const existingList = imageItemDiv.querySelector('ul');
          if (existingList) {
            existingList.remove();
          }
          currentList = null;
          currentParentDiv = null;
         } else {
          const useAltList = document.getElementById('toggle').checked;
          const listToDisplay = useAltList && item.altList ? item.altList : item.list;
          displayList(listToDisplay, imageItemDiv, nameDiv);
          currentList = listToDisplay;
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
        if (typeof item === 'string') {
          if (item.startsWith('#')) {
            li.innerHTML = `好きな色:<span style="background-color: ${item};"> </span>${item}`;
          } else {
            if (window.innerWidth <= 768) {
              li.innerHTML = item.replace(/\s+/g, '<br>').replace(/-/g, '');
            } else {
              li.innerHTML = item.replace(/\s+/g, '').replace(/-/g, '<br>');
            }
          }
        } else if (typeof item === 'object' && item.image && item.title && item.url) {
          const link = document.createElement('a');
          link.href = item.url;
          link.style.display = 'flex';
          link.style.alignItems = 'center';
          link.style.textDecoration = 'none'; // リンクの下線を削除
          link.style.color = 'inherit'; // 親要素の文字色を継承
    
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.title;
          img.style.width = '80px'; // サイズ調整
          img.style.height = 'auto';
          img.style.marginRight = '5px';
          img.style.marginBottom = '10px';
    
          const titleSpan = document.createElement('span');
          titleSpan.textContent = item.title;
    
          link.appendChild(img);
          link.appendChild(titleSpan);
          li.appendChild(link);
          li.style.display = 'flex';
          li.style.alignItems = 'center';
        }
        ul.appendChild(li);
      });
      nameDiv.appendChild(ul);
    }

     // トグルスイッチの追加
     const toggleContainer = document.createElement('div');
     toggleContainer.style.position = 'fixed';
     toggleContainer.style.top = '10px';
     toggleContainer.style.right = '10px';
     toggleContainer.innerHTML = `
      <label class="switch">
         <input type="checkbox" id="toggle">
         <span class="slider round"></span>
         <span style="color: black; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8em;"></span>
      </label>
     `;
     document.body.appendChild(toggleContainer);

     const toggleSwitch = document.getElementById('toggle');
     const body = document.body;

     toggleSwitch.addEventListener('change', () => {
      if (toggleSwitch.checked) {
         body.style.backgroundColor = 'black';
         body.style.color = 'white'; // テキストの色も変更
         // JSONデータにaltListが存在する場合、リストを切り替える
         data.forEach(item => {
          const imageItemDiv = Array.from(imagesDiv.children).find(div => div.querySelector('img').alt === item.name);
          if (imageItemDiv && item.altList) {
            const nameDiv = imageItemDiv.querySelector('.name');
            if (currentParentDiv === imageItemDiv) {
               displayList(item.altList, imageItemDiv, nameDiv);
               currentList = item.altList;
            } else if (!imageItemDiv.querySelector('ul')) {
               // まだリストが表示されていない場合は、以降のクリックで代替リストが表示される
            }
          } else if (imageItemDiv && !item.altList && currentParentDiv === imageItemDiv) {
            const nameDiv = imageItemDiv.querySelector('.name');
            displayList(originalLists.get(item.name), imageItemDiv, nameDiv);
            currentList = originalLists.get(item.name);
          }
         });
      } else {
         body.style.backgroundColor = 'white';
         body.style.color = 'black'; // テキストの色も戻す
         // 元のリストに戻す
         data.forEach(item => {
          const imageItemDiv = Array.from(imagesDiv.children).find(div => div.querySelector('img').alt === item.name);
          if (imageItemDiv) {
            const nameDiv = imageItemDiv.querySelector('.name');
            if (currentParentDiv === imageItemDiv) {
               displayList(originalLists.get(item.name), imageItemDiv, nameDiv);
               currentList = originalLists.get(item.name);
            } else if (!imageItemDiv.querySelector('ul')) {
               // まだリストが表示されていない場合は、以降のクリックで元のリストが表示される
            }
          }
         });
      }
    });
  });

// ウィンドウサイズ変更時にリストの表示を更新
window.addEventListener('resize', () => {
  const lists = document.querySelectorAll('.name ul');
    lists.forEach(list => {
    const nameDiv = list.parentElement;
    const parentDiv = nameDiv.parentElement;
    const imgElement = parentDiv.querySelector('img');
    if (imgElement) {
      const itemName = imgElement.alt;
      fetch('https://smhsdejiken.github.io/dejikenHP.github.io/MEMBERS/ME-js/member.json')
        .then(response => response.json())
        .then(data => {
          const currentItemData = data.find(item => item.name === itemName);
          if (currentItemData) {
            const useAltList = document.getElementById('toggle').checked;
            const listToDisplay = useAltList && currentItemData.altList ? currentItemData.altList : currentItemData.list;
             displayList(listToDisplay, parentDiv, nameDiv);
          }
        });
    }
  });
});
