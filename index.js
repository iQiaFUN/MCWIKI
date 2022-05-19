const path = require('path');
const cfg = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'config.json')));

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

class MCwiki extends NIL.NIL.ModuleBase{

    onStart(api){
        api.listen('onMainMessageReceived',(e)=>{
            let text = getText(e);
            let pt = text.split(' ');
            if(pt[0]==cfg.cmd){
                if(pt.length < 3){
                    let key = encodeURIComponent(pt[1]);
                    let wiki = cfg.wiki_url + key;
                    var str = `[Minecraft WIKI]\n\n${wiki}\n\n${pt[1]} - BWIKI`;
                    e.reply(str);
                }
            }
        });
    }

    onStop(){}
}


module.exports = new MCwiki;
