// script.js
// 消える板用 
document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.vanish-box');
    const introSection = document.querySelector('.intro-section');
    const contentSection = document.querySelector('.content-section');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // スクロール開始位置を調整するためのオフセット
    // 例えば、画面の上端からどれくらいスクロールしたらアニメーションを開始するか
    const offsetThreshold = window.innerHeight * 0.2; // 画面の20%スクロールしたら



    // Intersection Observer のオプションを設定
    const observerOptions = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: [0, 0.25, 0.5, 0.75, 1] // 0%から100%まで25%刻みで監視
    };

    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const scrollRatio = 1 - entry.intersectionRatio; // 0 (完全に表示) から 1 (完全に非表示)
            const scrollY = window.scrollY; // 現在のスクロール位置

            // スクロール量に基づいて段階的に箱を消す
            // 各段階の閾値を調整することで、アニメーションのタイミングを制御できます。
            if (scrollY > offsetThreshold) {
                // Stage 1: 最初の箱が動き出す
                if (scrollY > offsetThreshold + (window.innerHeight * 0.2)) {
                    boxes[0].classList.add('stage-1-left');
                    boxes[5].classList.add('stage-1-right');
                } else {
                    boxes[0].classList.remove('stage-1-left');
                    boxes[5].classList.remove('stage-1-right');
                }

                // Stage 2: 次の箱が動き出す
                if (scrollY > offsetThreshold + (window.innerHeight * 0.4)) {
                    boxes[1].classList.add('stage-2-left');
                    boxes[4].classList.add('stage-2-right');
                } else {
                    boxes[1].classList.remove('stage-2-left');
                    boxes[4].classList.remove('stage-2-right');
                }

                // Stage 3: 最後の箱が動き出す（完全に消える）
                if (scrollY > offsetThreshold + (window.innerHeight * 0.6)) {
                    boxes[2].classList.add('stage-3-left');
                    boxes[3].classList.add('stage-3-right');
                    scrollIndicator.style.opacity = '0'; // スクロールインジケーターを非表示に
                    contentSection.classList.add('show'); // コンテンツを表示
                } else {
                    boxes[2].classList.remove('stage-3-left');
                    boxes[3].classList.remove('stage-3-right');
                    scrollIndicator.style.opacity = '1';
                    contentSection.classList.remove('show');
                }

            } else {
                // スクロールが閾値以下の場合、全ての箱を初期状態に戻す
                boxes.forEach(box => {
                    box.classList.remove('stage-1-left', 'stage-1-right', 'stage-2-left', 'stage-2-right', 'stage-3-left', 'stage-3-right');
                });
                scrollIndicator.style.opacity = '1';
                contentSection.classList.remove('show');
            }
        });
    }, observerOptions);

    // 監視を開始
    introObserver.observe(introSection);
});