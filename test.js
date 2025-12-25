document.addEventListener('DOMContentLoaded', function() {
    const animatedButton = document.querySelector('.animated-button');
    const body = document.body; // body要素を取得

    // マウスがボタンに乗ったときの処理
    animatedButton.addEventListener('mouseenter', function() {
        // body::after のグラデーションの色とサイズを変更して広げる
        body.style.setProperty('--after-bg-start-color', '#434370'); /* 開始色は半透明の明るい青 */
        body.style.setProperty('--after-bg-end-color', '#805980');   /* 終了色は半透明の少し暗い青 */
        body.style.setProperty('--after-bg-size', '200% 200%'); /* 画面全体を覆うくらい大きく広げる */

        // body自体の背景色も変更（必要であれば）
        // body.style.background = '#c0c0c0';
    });

    // マウスがボタンから離れたときの処理
    animatedButton.addEventListener('mouseleave', function() {
        // body::after のグラデーションを元の（見えない）状態に戻す
        body.style.setProperty('--after-bg-start-color', 'rgba(255, 255, 255, 0)');
        body.style.setProperty('--after-bg-end-color', 'rgba(255, 255, 255, 0)');
        body.style.setProperty('--after-bg-size', '0% 0%');

        // body自体の背景色も元に戻す（必要であれば）
        // body.style.background = '-webkit-linear-gradient(top, #ffffff 0%,#999999 100%)';
    });
});