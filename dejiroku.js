window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const maxScroll = 1000; // 扉が完全に開くまでのスクロール量 (px)
  
  // スクロール量に応じて扉の開く割合を計算 (0から1)
  let progress = Math.min(1, scrollY / maxScroll);
  
  // 左右の扉を動かす量 (例: 画面幅の50% * 進捗)
  const moveAmount = 50 * progress; 
  
  const leftDoor = document.querySelector('.left-door1');
  const rightDoor = document.querySelector('.right-door1');
  
  // 扉を開く (transform: translateX を使う)
  // 左の扉は左へ移動 (マイナス方向)
  leftDoor.style.transform = `translateX(-${moveAmount}vw)`;
  // 右の扉は右へ移動 (プラス方向)
  rightDoor.style.transform = `translateX(${moveAmount}vw)`;
});

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const maxScroll = 250; // 扉が完全に開くまでのスクロール量 (px)
  
  // スクロール量に応じて扉の開く割合を計算 (0から1)
  let progress = Math.min(1, scrollY / maxScroll);
  
  // 左右の扉を動かす量 (例: 画面幅の50% * 進捗)
  const moveAmount = 50 * progress; 
  
  const leftDoor = document.querySelector('.left-door2');
  const rightDoor = document.querySelector('.right-door2');
  
  // 扉を開く (transform: translateX を使う)
  // 左の扉は左へ移動 (マイナス方向)
  leftDoor.style.transform = `translateX(-${moveAmount}vw)`;
  // 右の扉は右へ移動 (プラス方向)
  rightDoor.style.transform = `translateX(${moveAmount}vw)`;
});

window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const maxScroll = 500; // 扉が完全に開くまでのスクロール量 (px)
  
  // スクロール量に応じて扉の開く割合を計算 (0から1)
  let progress = Math.min(1, scrollY / maxScroll);
  
  // 左右の扉を動かす量 (例: 画面幅の50% * 進捗)
  const moveAmount = 50 * progress; 
  
  const leftDoor = document.querySelector('.left-door3');
  const rightDoor = document.querySelector('.right-door3');
  
  // 扉を開く (transform: translateX を使う)
  // 左の扉は左へ移動 (マイナス方向)
  leftDoor.style.transform = `translateX(-${moveAmount}vw)`;
  // 右の扉は右へ移動 (プラス方向)
  rightDoor.style.transform = `translateX(${moveAmount}vw)`;
});

document.addEventListener('DOMContentLoaded', () => {
    // ターゲット要素を取得
    const targetImage = document.querySelector('.fade-image');
    
    // 画像が完全に消えるまでのスクロール距離 (px)
    const fadeDistance = 500; 

    // スクロールイベントリスナーを設定
    window.addEventListener('scroll', () => {
        // 1. 現在のスクロール位置を取得
        const scrollPosition = window.scrollY;

        // 2. 透明度を計算
        // スクロール位置をフェード距離で割って、0〜1の割合を求める
        let fadeRatio = scrollPosition / fadeDistance;

        // 3. 透明度の値を 1 から 0 の範囲に制限
        // Math.max(0, ...) で値が0未満にならないようにする (0=完全に透明)
        // Math.min(1, ...) で値が1より大きくならないようにする (1=完全に不透明)
        let newOpacity = Math.max(0, 1 - fadeRatio);
        
        // 補足: 1 - fadeRatio にすることで、スクロール量が増えるほど (fadeRatioが大きくなるほど)
        // opacity の値は小さくなり (1 → 0)、フェードアウトします。

        // 4. 計算した透明度をCSSに適用
        targetImage.style.opacity = newOpacity;
    });
});

document.addEventListener('DOMContentLoaded', () => {
  // すべての対象リンクを取得
  const links = document.querySelectorAll('.scroll-and-go');
  
  // スクロールにかける時間 (ミリ秒)
  const scrollDuration = 800; // 例: 0.3秒
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      // ページ遷移を一時的に停止
      e.preventDefault(); 
      
      // リンク先URLを取得
      const targetUrl = this.href;
      
      // 1. ページの先頭へスムーズにスクロール
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // スムーズなアニメーションを適用
      });

      // 2. スクロール完了後にページ遷移を実行
      // スクロール時間より少し長めの待機時間を設定する
      setTimeout(() => {
        window.location.href = targetUrl;
      }, scrollDuration + 50); // 待機時間 = スクロール時間 + 余裕
      
    });
  });
});