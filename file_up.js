/**
 * uploader
 *
 */
var uploader = function(file, i){
	this.initialize(file, i);
}

uploader.prototype = {
	file : '',
	count: '',

	initialize: function(file, i){
		this.file  = file;
		this.count = i;
	},

	upload: function(){
		var fomrElement   = document.getElementById('fileupForm');
		var fileinput     = document.getElementById('file_path[]');
		var progressBar   = document.getElementById('progress_'+this.count);
		var progressCount = document.getElementById('count_'+this.count);

		var d        = new Deferred();
		var xhr      = new XMLHttpRequest();
		var formdata = new FormData();

		formdata.append('file_path[]', this.file);

		// 読み込み
		xhr.upload.onprogress = function(e)
		{
			//console.log(e.loaded +'/'+ e.total);
			progressCount.innerHTML = '/progress:' + (e.loaded / e.total) * 100 + '%';
			progressBar.value       = (e.loaded / e.total) * 100;
		}

		// 完了
		xhr.upload.onload = function(e)
		{
			console.log(e);
			console.log("finish");
			d.call(e);
		}

		// 送信
		xhr.open('POST', fomrElement.action, true);
		xhr.send(formdata);

		return d;
	}
};


/**
 * ファイルアップロード
 *
 */
function uploadFile()
{
	Deferred.define();
	var fileinput   = document.getElementById('file_path[]');
	var files       = fileinput.files;

	// プログレスバー設置
	var progressBars    = document.getElementById('progressBars');
	var proguresBarHTML = '';
	for(var i=0; i<files.length; i++)
	{
		proguresBarHTML = proguresBarHTML + '<p>' + files[i].name + '<span id="count_' + i + '"></span>' + '</p><progress id="progress_' + i + '" min="0" max="100" value="0">0% complete</progress></p>';

	}
	progressBars.innerHTML = proguresBarHTML;

	// upload
	next(function () {
		console.log('Start----------');
	}).
	loop(files.length,function(i){
		//console.log(i);
		//console.log(files[i].name);
		file_uploader = new uploader(files[i], i);
		return file_uploader.upload();
	}).
	next(function () {
		console.log('End  ----------');
	});
}

