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
    const url = `https://script.google.com/macros/s/AKfycbyx4V1sfafo9jpLSLESk_tdWX6MWpYBEthf5A-7ZM-fdgc_fdHLKS9RcWdg94ujFQpI/exec?t=${timestamp}`;
    
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


// カルーセルを作成する非同期関数
async function createCarousel() {
    const carouselImages = document.getElementById('carousel-images');
    carouselImages.innerHTML = ''; // 既存の内容をクリア
    
    // データがない場合は取得する
    if (data.length === 0) {
        data = await fetchData();
    }

    // プロファイルの画像をカルーセルに追加
    data.forEach(profile => {
        const img = document.createElement('img');
        // img プロパティの存在確認
        const photoUrl = profile.img || null;
        img.src = generateImageSrc(photoUrl) || 'https://lh3.googleusercontent.com/d/1NdAalgGi8HrV5iV1R7BFZHDh_XP9aXoi';
        img.alt = `${profile.title || '無題'}の写真`;
        carouselImages.appendChild(img);
    });

    initializeCarousel();
}

// カルーセルを初期化する関数
function initializeCarousel() {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const profileName = document.getElementById('profile-name');
    const profileAbout = document.getElementById('profile-about');
    const carouselContainer = document.querySelector('.carousel-container');
    
    // 画像がない場合は処理を中断
    if (totalImages === 0) {
        console.warn('カルーセルに表示する画像がありません');
        return;
    }
    
    let currentIndex = 0;
    let autoPlayInterval;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;

        // 現在表示中のスライドのデータをinfo-containerに表示
        if (data && data.length > 0 && currentIndex < data.length) {
            const currentProfile = data[currentIndex];
            profileName.textContent = currentProfile.title || '無題';
            profileAbout.textContent = currentProfile.about || '説明なし';
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3000); // 3秒ごとにスライド
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // ボタンのイベントリスナー
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    });

    // 自動再生の開始
    startAutoPlay();

    // マウスホバー時に自動再生を停止、ホバー解除時に再開
    carouselContainer.addEventListener('mouseover', stopAutoPlay);
    carouselContainer.addEventListener('mouseout', startAutoPlay);

    // 初期表示
    updateCarousel();
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
            const about = document.createElement('p');
            const upperDiv = document.createElement('div');
            const lowerDiv = document.createElement('div');
            const text = document.createElement('h3');
            const img = document.createElement('img');
            const title = document.createElement('div');
            const backgroundFill = document.createElement('div');

            upperDiv.classList.add('upper-div');
            lowerDiv.classList.add('lower-div');
            text.classList.add('h3');
            about.classList.add('about');
            title.classList.add('title');
            backgroundFill.classList.add('background-fill');

            // 上部のDivを作成（画像を表示）
            linkA.href = item.url || '#';
            linkA.target = '_blank';
            linkA.style.textDecoration = 'none';

            // photo プロパティの存在確認
            const photoUrl = item.img || null;
            const imgSrc = generateImageSrc(photoUrl);
            img.src = imgSrc || 'https://lh3.googleusercontent.com/d/1NdAalgGi8HrV5iV1R7BFZHDh_XP9aXoi';
            img.alt = item.title || '無題';
            img.classList.add('cell-image');
            upperDiv.appendChild(linkA);
            linkA.appendChild(img);

            // 下部のDivを作成（文字を表示）
            text.textContent = item.title || '無題';
            linkB.href = item.url || '#';
            linkB.target = '_blank';
            linkB.style.textDecoration = 'none';
            about.textContent = `${item.name || ''}<br>${item.about || ''}` || '無題';
            //about.textContent = item.about;
            //linkB.innerHTML = `${item.name || ''}<br>${item.about || ''}`;
            lowerDiv.appendChild(linkB);
            linkB.appendChild(title);
            linkB.appendChild(about);
            title.appendChild(text);
            title.appendChild(backgroundFill);

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
        await createCarousel();       // カルーセルを作成
    } catch (error) {
        console.error('初期化エラー:', error);
        alert('ページの初期化中にエラーが発生しました。詳細はコンソールを確認してください。');
    }
});
