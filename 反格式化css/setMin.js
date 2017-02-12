var fs=require('fs');
var path=require('path');
var readline=require('readline');
var rl=readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
var source,target;

init();

function init(){
	rl.question('请输入文件路径：',function(answer){
		source=path.resolve(answer);
		console.log('文件路径是：');
		console.log(source);
		outputPath();
	});
}

function outputPath(){
	rl.question('请输入文件输出路径：',function(answer){
		target=path.resolve(answer);
		console.log('文件路径是：');
		console.log(target);
		setMin();
	})
}

function setMin(){
	fs.readFile(source,function(e,d){
		if(e){
			return console.log('404');	 
		}
		d=d.toString();
		d=d.replace(/([>\{,;\:\)])\s*/g,'$1')
		.replace(/\s*([>\{\+])/g,'$1')
		.replace(/([\}\+]|\*\/)\s*/g,'$1\r')
		fs.writeFile(target,d,function(err){
			if(e){
				return console.log('写入失败');	
			}
			console.log('创建成功');
			rl.close();
		});
	});
}

