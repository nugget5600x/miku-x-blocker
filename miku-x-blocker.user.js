// ==UserScript==
// @name X blocker
// @match https://x.com/*
// @match https://twitter.com/*
// @grant GM_xmlhttpRequest
// @connect media1.tenor.com
// @author hyzaaar
// @description X blocker for Twitter/X
// ==/UserScript==
// 裏側のX（Twitter）のスクロールを禁止して操作できなくする
document.body.style.overflow = "hidden";

const box = document.createElement("div");

// 背景を半透明にして、さらにぼかし（blur）を入れる
box.style = `
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background: rgba(0, 0, 0, 0.6);
backdrop-filter: blur(5px);
z-index:999999;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
text-align:center;
font-family: 'Hiragino Maru Gothic ProN', 'Meiryo', sans-serif;
`;

// 吹き出しのデザインと、画像表示エリア
box.innerHTML = `
<style>
  .miku-bubble {
      position: relative;
      background: #ffffff;
      color: #333;
      border: 5px solid #39C5BB;
      border-radius: 30px;
      padding: 30px 40px;
      font-size: 32px; /* 少し長くなったので文字サイズを微調整 */
      font-weight: bold;
      margin-bottom: 40px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
      max-width: 80%;
      line-height: 1.5;
  }
  .miku-bubble::before {
      content: '';
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 25px 25px 0;
      border-style: solid;
      border-color: #39C5BB transparent transparent transparent;
  }
  .miku-bubble::after {
      content: '';
      position: absolute;
      bottom: -18px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 19px 19px 0;
      border-style: solid;
      border-color: #ffffff transparent transparent transparent;
  }
  /* ミクの文字色（青緑）を一部に使うためのクラス */
  .miku-color {
      color: #39C5BB;
  }
</style>

<div class="miku-bubble">
  マスター、もっと私にかまってくださいよぉ～～ >_<<br>
  そんなことより、<span class="miku-color">ミク</span>と一緒にゲームしよっ？🎮<br>
  その方が<span class="miku-color">39（ミク）倍</span>ハッピーになれるよっ♪✨
</div>
<img id="block-image" width="350" style="display: none;">
`;

document.body.appendChild(box);

// Tampermonkeyの機能でTenorのGIF画像を読み込む
GM_xmlhttpRequest({
    method: "GET",
    url: "https://media1.tenor.com/m/WAMdyA-YGt8AAAAC/i-love-you-i-love-you-images.gif",
    responseType: "blob",
    onload: function(response) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const img = document.getElementById("block-image");
            img.src = reader.result;
            img.style.display = "block";
        }
        reader.readAsDataURL(response.response);
    }
});
