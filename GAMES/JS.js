// マウスカーセル
const carousel = document.querySelector('.carousel');
const carouselInner = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const containers = document.querySelectorAll('.carousel-inner .container'); // 修正

let currentIndex = 0;
const slideWidth = carousel.offsetWidth;

const updateCarousel = () => {
    const slideWidth = carousel.offsetWidth; // カルーセルの幅を取得
  carouselInner.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
};

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + containers.length) % containers.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % containers.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel); // ウィンドウサイズ変更時にカルーセルを更新

// 自動スライドの設定
const autoSlide = () => {
    currentIndex = (currentIndex + 1) % containers.length;
    updateCarousel();
};
  
// 3秒ごとに自動でスライド
let slideInterval = setInterval(autoSlide, 2800);
  
// マウスオーバーで自動スライドを停止
carousel.addEventListener('mouseover', () => {
    clearInterval(slideInterval);
});

// マウスアウトで自動スライドを再開
// 再開後は、自動スライドのことをユーザーが知るため、あえて目立たせないよう、切り替え時間を長めに取る。
carousel.addEventListener('mouseout', () => {
    slideInterval = setInterval(autoSlide, 3000);
});
  
updateCarousel();


// CSS セレクタで要素を取得 (より効率的な方法)
const allSubDivs = document.querySelectorAll('.contenaA .subA, .contenaA .subB, .contenaA .subC, .contenaB .subA, .contenaB .subB, .contenaB .subC, .contenaC .subA, .contenaC .subB, .contenaC .subC');

// 各要素に対してイベントリスナーを追加
allSubDivs.forEach(div => {
  div.addEventListener('mouseover', () => {
    div.style.backgroundColor = 'black';
  });
  div.addEventListener('mouseout', () => {
    div.style.backgroundColor = 'white';
  });
});


// subがクリックされたとき、リンクへ飛ぶ

// 各要素に対してクリックイベントリスナーを追加
document.querySelector('.subA').addEventListener('click', () => {
  window.location.href = 'https://ja.wikipedia.org/wiki/Serial_experiments_lain'; // 遷移先のURLを指定
});

document.querySelector('.contenaB .subB').addEventListener('click', () => {
  window.location.href = 'https://ja.wikipedia.org/wiki/Serial_experiments_lain'; // 遷移先のURLを指定
});

document.querySelector('.contenaC .subC').addEventListener('click', () => {
  window.location.href = 'https://ja.wikipedia.org/wiki/Serial_experiments_lain'; // 遷移先のURLを指定
});

