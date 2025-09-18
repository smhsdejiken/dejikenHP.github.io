// URL から Drive ID を抽出する関数
function extractDriveId(url) {
    // url が undefined または null の場合は早期リターン
    if (!url) {
        console.warn('URL が未定義です');
        return null;
    }
    const match = url.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

// Google Drive の画像 URL を生成する関数
function generateImageSrc(url) {
    const driveId = extractDriveId(url);
    return driveId ? `https://lh3.googleusercontent.com/d/${driveId}` : null;
}

// 初期データ配列
let data = []; 

// データを取得する非同期関数
async function fetchData() {
    // キャッシュバスティングのためのタイムスタンプパラメータを追加
    const timestamp = new Date().getTime();
    const url = `https://script.google.com/macros/s/AKfycbwDIe1HsUJ4kIz6wU9EoT0qwVO6_wqrWFcmv6tayymbTc1Xd-RsFlfrfH6i0fHkzGcm/exec?t=${timestamp}`;
    
    try {
        const response = await fetch(url, { 
            mode: 'cors',
            cache: 'no-store' // キャッシュを使用しない
        });
        console.log("レスポンス:", response);
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }
        const text = await response.text();
        console.log('レスポンスの生データ:', text);
        
        const jsonResponse = JSON.parse(text);
        
        // レスポンス形式がtimestampとdataを含む形式に変更された場合の対応
        const fetchedData = jsonResponse.data || jsonResponse;
        
        if (!Array.isArray(fetchedData)) {
            throw new Error('データ形式エラー: 配列ではありません');
        }
        
        // データの検証: photo プロパティがない場合のデバッグ
        fetchedData.forEach((item, index) => {
            if (!item.img) {
                console.warn(`警告: インデックス ${index} のアイテムに img プロパティがありません:`, item);
            }
        });
        
        return fetchedData;
    } catch (error) {
        console.error('データ取得エラー:', error);
        alert(`データの取得に失敗しました。\nエラー詳細: ${error.message}`);
        return [];
    }
}



// データをHTMLに表示する非同期関数
async function loadAndDisplayJSON() {
    try {
        // データがない場合は取得する
        if (data.length === 0) {
            data = await fetchData();
        }
        
        if (!data || !Array.isArray(data)) {
            throw new Error("取得したデータが配列ではありません");
        }

        const table = document.getElementById('dataTable');
        table.innerHTML = ''; // 既存のデータをクリア

        // データをテーブルとして追加
        data.forEach(item => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const linkA = document.createElement('a');
            const linkB = document.createElement('a');
            const upperDiv = document.createElement('div');
            const lowerDiv = document.createElement('div');
            const text = document.createElement('h3');
            const content = document.createElement('p');
            const date = document.createElement('p');
            const img = document.createElement('img');

            // クラスを追加　つまり、CSSで指定できる
            upperDiv.classList.add('upper-div');
            lowerDiv.classList.add('lower-div');
            text.classList.add('h3');
            date.classList.add('date')
            content.classList.add('content');

            // 上部のDivを作成（画像を表示）
            text.textContent = item.title || '無題';
            date.textContent = item.date || '日付不明';
            linkA.href = item.url || '#';
            linkA.target = '_blank';
            linkA.style.textDecoration = 'none';
            linkA.appendChild(date);
            linkA.appendChild(text);

            // photo プロパティの存在確認
            if (item.img) {

                const photoUrl = item.img || '';
                const imgSrc = generateImageSrc(photoUrl);
                img.src = imgSrc || '';
                img.classList.add('cell-image');
            }
            upperDiv.appendChild(linkA);
            linkA.appendChild(img);

            // 下部のDivを作成（文字を表示）
            linkB.href = item.url || '#';
            linkB.target = '_blank';
            linkB.style.textDecoration = 'none'; // リンクの下線を消す
            //linkB.innerHTML = `${item.name || ''}<br>${item.about || ''}`;
            content.textContent = item.about || '';
            lowerDiv.appendChild(linkB);
            linkB.appendChild(content);

            // セルにDivを追加し、行に追加
            cell.appendChild(upperDiv);
            cell.appendChild(lowerDiv);
            row.appendChild(cell);
            table.appendChild(row);
        });
        console.log("データ表示完了:", data);
    } catch (error) {
        console.error('JSONファイルの読み込み中にエラーが発生しました:', error);
    }
}

// DOMが読み込まれた後に実行
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await fetchData();      // まずデータを取得
        await loadAndDisplayJSON();   // テーブルにデータを表示
        //await createCarousel();       // カルーセルを作成
    } catch (error) {
        console.error('初期化エラー:', error);
        alert('ページの初期化中にエラーが発生しました。詳細はコンソールを確認してください。');
    }
});
