// 新しいワーカーを作成し、"generate.js" にあるコードを与えます。
const worker = new Worker('./generate.js');

// ユーザーが "Generate primes "をクリックしたら、ワーカーにメッセージを送ります。
// メッセージのコマンドは "generate "であり、メッセージには "quota "も含まれる。
// これは生成する素数の数である。
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value;
  worker.postMessage({
    command: 'generate',
    quota,
  });
});

// Worker がメイン スレッドにメッセージを送り返したとき。
// 出力ボックスを更新し、ユーザへのメッセージを表示します。
// メッセージデータから取得した生成された素数の数を含む、ユーザへのメッセージを出力ボックスに更新します。
worker.addEventListener('message', (message) => {
  document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});
