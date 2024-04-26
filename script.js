// script.js
function removeLineBreaks() {
	const inputText = document.getElementById("input-text").value; // テキストの取得
	const textWithoutLineBreaks = inputText.replace(/\n/g, " "); // 改行をスペースで置換
	document.getElementById("result").innerText = textWithoutLineBreaks; // 結果を表示
}
