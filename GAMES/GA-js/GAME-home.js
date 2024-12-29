async function loadAndDisplayJSON() {
  try {
    const response = await fetch('GAMES/GA-js/data.json');
    const data = await response.json(); //Jsonファイルを読み込む
    const table = document.getElementById('dataTable');

    // テーブル行の作成
    data.forEach(item => { //forEachを使い、Jsonのデータ一つ一つにつき、以下の処理を行う
      const row = document.createElement('tr'); // <tr>すなわち「行」を追加
      const cell = document.createElement('td'); // その行に<td>すなわち「セル」を追加
      const linkA = document.createElement('a');
      const linkB = document.createElement('a');
      const upperDiv = document.createElement('div');
      const lowerDiv = document.createElement('div');
      const text = document.createElement('h3');
      const img = document.createElement('img');

      upperDiv.classList.add('upper-div'); // 上部div用のCSSクラスを作って、CSSからこの要素にデザインを指定できるようにする
      lowerDiv.classList.add('lower-div'); // 下部のDiv用のCSSクラス
      text.classList.add('h3'); // h3のCSSクラス

      // 上部のDivを作成（画像を表示）
      linkA.href = item.url;
      linkA.target = '_blank';  // 新しいタブで開く
      linkA.style.textDecoration = 'none'; // リンクの下線を削除
      
      img.src = item.photo;
      img.alt = item.name; // 代替テキスト追加
      img.classList.add('cell-image'); // 画像用のCSSクラス
      upperDiv.appendChild(linkA);
      linkA.appendChild(img);

      // 下部のDivを作成（文字を表示）
      text.textContent = item.name;
      linkB.href = item.url;
      linkB.target = '_blank'; // 新しいタブで開く
      linkB.style.textDecoration = 'none'; // リンクの下線を削除
      linkB.innerHTML = `${item.name}<br>${item.about}`;
      lowerDiv.appendChild(linkB); 
      linkB.appendChild(text);

      // セルにDivを追加し、行に追加
      cell.appendChild(upperDiv);
      cell.appendChild(lowerDiv);
      row.appendChild(cell);
      table.appendChild(row);
    });
  } catch (error) {
    console.error('JSONファイルの読み込み中にエラーが発生しました:', error);
  }
}

loadAndDisplayJSON();
