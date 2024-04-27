// script.js
// 改行を削除したテキストを保存する配列
let previousResults = [];

function removeLineBreaks() {
    const inputText = document.getElementById("input-text").value; // テキストの取得
		if (inputText.trim() === "") {
			// テキストが空白または何も入力されていない場合は操作を中止
			console.warn("No text to process");
			return; // 処理を終了
		}
    const textWithoutLineBreaks = inputText.replace(/\n+/g, ' ').trim(); // 改行をスペースに置換

    document.getElementById("result").innerText = textWithoutLineBreaks; // 改行削除後の結果を表示

    // 新しい結果を配列の先頭に追加
    previousResults.unshift(textWithoutLineBreaks);

    // 過去の結果を表示
    updatePreviousResults();
}

// 過去の結果をページの下部に表示
function updatePreviousResults() {
	const previousResultsElement = document.getElementById("previous-results");
	previousResultsElement.innerHTML = ""; // エリアをクリアして再構築

	// 配列の最初から最後までループし、逆順にインデックスを割り当てる
	previousResults.forEach((result, index) => {
			const paragraph = document.createElement("p"); // 新しい段落要素を作成
			const descendingIndex = previousResults.length - index; // 逆順のインデックス

			// インデックス部分をスパン要素として設定
			const indexSpan = document.createElement("span");
			indexSpan.innerText = `Result ${descendingIndex}`; // インデックスのテキスト
			indexSpan.className = "result-index"; // 特定のCSSクラスを適用

			// クリップボードにコピーするボタン
			const copyButton = document.createElement("button");
			copyButton.innerText = "Copy"; // ボタンのテキスト
			copyButton.className = "copy-button"; // クラスを適用
			copyButton.onclick = () => copyToClipboard(result); // クリック時にコピー

			// 段落に要素を追加
			paragraph.appendChild(indexSpan); // インデックスを追加
			paragraph.appendChild(copyButton); // コピー用のボタンを追加
			paragraph.appendChild(document.createElement("br")); // 改行
			paragraph.appendChild(document.createTextNode(result)); // テキストを追加

			previousResultsElement.appendChild(paragraph); // ページの下部に追加
	});
}

// クリップボードにテキストをコピーする関数
function copyToClipboard(text) {
	navigator.clipboard.writeText(text) // クリップボードにテキストをコピー
			.then(() => console.log("Copied to clipboard"))
			.catch(err => console.error("Failed to copy", err));
}


function clearInput() {
	document.getElementById("input-text").value = ""; // テキストエリアをクリア
}

// Ctrl+Enterでボタンを操作するイベントリスナー
document.getElementById('input-text').addEventListener('keydown', function(event) {
	if (event.ctrlKey && event.key === 'Enter') {
		removeLineBreaks();
	}
});

function updateTranslateLink() {
	const inputText = document.getElementById("input-text").value;
	const translateLink = generateGoogleTranslateLink(inputText);
	document.getElementById("translateButton").href = translateLink; // リンクを更新
}

function generateGoogleTranslateLink(text) {
	const baseURL = "https://translate.google.com/";
	const sourceLanguage = "en"; // 英語から
	const targetLanguage = "ja"; // 日本語へ
	const query = `?sl=${sourceLanguage}&tl=${targetLanguage}&text=${encodeURIComponent(text)}`;
	return baseURL + query;
}

// Google翻訳のページに遷移する関数
function goToGoogleTranslate() {
	const inputText = document.getElementById("input-text").value; // テキストエリアからテキストを取得
	const cleanedText = inputText.replace(/\n+/g, ' ').trim(); // 改行をスペースに置換

	const baseURL = "https://translate.google.com/"; // Google翻訳のベースURL
	const sourceLanguage = "en"; // 翻訳元の言語
	const targetLanguage = "ja"; // 翻訳先の言語

	// Google翻訳のURLを生成
	const query = `?sl=${sourceLanguage}&tl=${targetLanguage}&text=${encodeURIComponent(cleanedText)}`;
	const translateURL = baseURL + query;

	window.open(translateURL, "_blank"); // 新しいタブでGoogle翻訳を開く
}

// 入力エリアをクリアする関数
function clearInput() {
	document.getElementById('input-text').value = ""; // 入力をクリア
}
