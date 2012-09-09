/*
 *
 */
function uploadFile()
{
console.log('Start----------');
	var fomrElement = document.getElementById('fileupForm');
	var fileinput   = document.getElementById('file_path[]');
	var files       = fileinput.files;

	var progressBars = document.getElementById('progressBars');
	var proguresBarHTML = '';

	// プログレスバー設置
	for(var i=0; i<files.length; i++)
	{
		proguresBarHTML = proguresBarHTML + '<p><progress id="progress_' + i + '" min="0" max="100" value="0">0% complete</progress></p>';

	}
	progressBars.innerHTML = proguresBarHTML;

	// アップロード
	for(var i=0; i<files.length; i++)
	{
		console.log(files[i].name);
		console.log(i);

		var xhr      = new XMLHttpRequest();
		var formdata = new FormData();


		formdata.append('file_path[]', files[i]);

		// 読み込み
		xhr.upload.onprogress = function(e)
		{
			console.log(e.loaded +'/'+ e.total);
			console.log(e);
			//var progressBar = document.getElementById('progress_'+i);
			//console.log(progressBar.id);
			//progressBar.value = (e.loaded / e.total) * 100;
		}

		// 完了
		xhr.upload.onload = function(e)
		{
			console.log("finish");
		}

		// 送信
		xhr.open('POST', fomrElement.action, true);
		xhr.send(formdata);

	}

console.log('End  ----------');
}
