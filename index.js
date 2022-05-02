const request = require("sync-request");
const { segment } = require("oicq");
const wiki_url = 'https://searchwiki.biligame.com/mc/index.php?search=';
const cmd = '/wiki';

function getText(e) {
    var rt = '';
    for (i in e.message) {
        switch (e.message[i].type) {
            case "text":
                rt += e.message[i].text;
                break;
        }
    }
    return rt;
}



function onStart(api){
    api.listen('onMainMessageReceived',(e)=>{
		let text = getText(e);
		let pt = text.split(' ');
		if(pt[0]==cmd){
			if(pt.length < 3){
				let key = encodeURIComponent(pt[1]);
				let wiki = wiki_url + key;
				var str = `[Minecraft WIKI]\n\n${wiki}\n\n${pt[1]} - BWIKI`;
				e.reply(str);
			}
		}
	});
}

function onStop(){
}

module.exports = {
    onStart,
    onStop
};
