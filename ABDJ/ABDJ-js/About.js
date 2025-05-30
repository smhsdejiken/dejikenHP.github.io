function toggle() {
  document.querySelector('.menubutton').classList.toggle('open');
  document.querySelector('.menu').classList.toggle('open');
  }

var bar = new ProgressBar.Line(loading_text, {
      easing: 'easeIn',
      duration: 1000,
      strokeWidth: 0.3,
      color: '#545454',
      trailWidth: 0.2,
      trailColor: '#ffffff',
      text: {
          style: {
              position: 'absolute',
              left: '50%',
              top: '50%',
              padding: '0',
              margin: '-30px 0 0 0',
              transform:'translate(-50%,-50%)',
              'font-size':'18px',
              color: '#ffffff',
          },
          autoStyleContainer: false
      },
      step: function(state, bar) {
          bar.setText(Math.round(bar.value() * 100) + ' %');
      }
  });
  
  bar.animate(1.0, function () {
      $("#loading").delay(400).fadeOut(600);
  });

window.addEventListener('scroll', function(){
// スクロール量を取得
const scroll = window.scrollY;
// 画面の高さを取得
const windowHeight = window.innerHeight;
// すべての.boxを取得
const boxes = document.querySelectorAll('.box');

boxes.forEach(function(box) {
  // boxまでの高さを取得
  const distanceToBox = box.offsetTop;
  // 下記条件が成り立つときだけboxにis-activeクラスを付与する
  if(scroll + windowHeight > distanceToBox) {
    box.classList.add('is-active');
  }
});
});

var id = ['a','b','c']; //指定するidを全て配列で渡す
var tx = [];
var txCount = [];
var txSp = 70; // テキストの表示速度
var dly = 10; // 次の文章までの待ち時間
var count = 0;

window.onload = function(){
kamikakushi();
countSet();
itimozi()
}

function countSet(){ // 文字数カウントの初期設定
for(n=0;n<id.length;n++){
  txCount[n] = 0;
}
}


function kamikakushi(){ // 要素を取得して非表示（opacity:0;）にする
for(i=0;i<id.length;i++){
  id[i] = document.getElementById(id[i]);
  tx[i] = id[i].firstChild.nodeValue; // 初期の文字列
  id[i].innerHTML = '';
}
}

function itimozi(){ //　一文字ずつ表示
  id[count].innerHTML = tx[count].substr( 0, ++txCount[count] ); // テキストの指定した数の間の要素を表示
if(tx[count].length != txCount[count]){ // Count が初期の文字列の文字数と同じになるまでループ
  setTimeout("itimozi()",txSp); // 次の文字へ進む
}else{
id[count].innerHTML = tx[count].substr( 0, ++txCount[count] ); // テキストの指定した数の間の要素を表示
  count++; // 次の段落に進む為のカウントアップ

  if(count != id.length){ // id数が最後なら終了
  setTimeout("itimozi()",dly); // 次の段落へ進む
  var br = document.createElement('br'); // br要素を作成
            id[count-1].appendChild(br); 
  }
}
}



(function(window, document) {
  const selector = '.mainBody'; // 処理対象セレクタ
  const elm = document.querySelector(selector);
  const pc = document.querySelector('.progress-circle');
  const pc_inner = pc.querySelector('.progress-circle-inner');
  let goal = elm.clientHeight;
  update();

  function update() {
    let read = window.innerHeight - elm.getBoundingClientRect().top;
    let progress = Math.floor(read / goal * 100);
    if (read < 0) {
      progress = 0;
    } else if (read > goal) {
      progress = 100;
    }
    pc_inner.innerText = progress + '%';
    pc.style.backgroundImage = 'conic-gradient(rgb(162, 0, 255) 0% ' + progress + '%, #d9d9d9 ' + progress + '% 100%)';
  }

  window.addEventListener('scroll', () => {
    update();
  });
})(window, document);

document.addEventListener('DOMContentLoaded', function() {
    const animatedButton = document.querySelector('.animated-button');
    const body = document.body; // body要素を取得

    // マウスがボタンに乗ったときの処理
    animatedButton.addEventListener('mouseenter', function() {
        // body::after のグラデーションの色とサイズを変更して広げる
        body.style.setProperty('--after-bg-start-color', '#434370'); /* 開始色は半透明の明るい青 */
        body.style.setProperty('--after-bg-end-color', '#805980');   /* 終了色は半透明の少し暗い青 */
        body.style.setProperty('--after-bg-size', '200% 200%'); /* 画面全体を覆うくらい大きく広げる */

    });

    // マウスがボタンから離れたときの処理
    animatedButton.addEventListener('mouseleave', function() {
        // body::after のグラデーションを元の（見えない）状態に戻す
        body.style.setProperty('--after-bg-start-color', 'rgba(255, 255, 255, 0)');
        body.style.setProperty('--after-bg-end-color', 'rgba(255, 255, 255, 0)');
        body.style.setProperty('--after-bg-size', '0% 0%');

        // body自体の背景色も元に戻す（必要であれば）
         body.style.background = '-webkit-linear-gradient(top, #ffffff 0%,#999999 100%)';
    });
});
