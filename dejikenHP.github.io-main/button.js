window.addEventListener('scroll', function() {
    const zoomImage = document.getElementById('zoomImage');
    if (!zoomImage) return; // 画像要素が存在しない場合は何もしない

    const scrollPosition = window.scrollY;
    const triggerPoint = window.innerHeight * 0.7; // ビューポートの高さの70%をトリガーポイントとする (調整可能)

    // 画像がビューポート内に入ってきたときに拡大を開始
    if (scrollPosition > triggerPoint) {
        // スクロール量に基づいて拡大率を計算
        // ここでは、トリガーポイントを超えたスクロール量に比例して拡大する例
        const maxScale = 1.5; // 最大拡大率
        const scrollRange = window.innerHeight * 0.5; // この範囲で拡大を完了させる (調整可能)
        
        let scale = 1 + ((scrollPosition - triggerPoint) / scrollRange) * (maxScale - 1);
        
        // 拡大率を最大値に制限
        if (scale > maxScale) {
            scale = maxScale;
        }

        zoomImage.style.transform = `scale(${scale})`;
    } else {
        // トリガーポイントより上にいる場合は初期サイズに戻す
        zoomImage.style.transform = 'scale(1)';
    }
});