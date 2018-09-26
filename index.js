const discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const YtDl = require("ytdl-core");
const TOKEN = process.env.TOKEN;
const PREFIX = "|"

var bot = new discord.Client
let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

bot.on('ready', () => {
    console.log("connected.");
    bot.user.setStatus("online");;
    bot.user.setUsername("Suwabot");
    bot.user.setGame("By Tatic")
});

function rndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function nextLvlXp(lvl) {
    return 120 + (lvl * 70) + (lvl * lvl)
}var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YtDl(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    })
}

bot.on('message', (message) => {

    let sender = message.author;

    //register
    if (!userData[sender.id]) userData[sender.id] = {};
    if (!userData[sender.id].currentXp) userData[sender.id].currentXp = 0;
    if (!userData[sender.id].totalXP) userData[sender.id].totalXP = 0;
    if (!userData[sender.id].level) userData[sender.id].level = 0;
    if (!userData[sender.id].Gold) userData[sender.id].Gold = 0;
    if (!userData[sender.id].Knife) userData[sender.id].Knife = 0;
    if (!userData[sender.id].Tem_Flake) userData[sender.id].Tem_Flake = 0;
    if (!userData[sender.id].Heart_locket) userData[sender.id].Heart_locket = 0;
    if (!userData[sender.id].Gland) userData[sender.id].Gland = 0;
    if (!userData[sender.id].Buster_Sword) userData[sender.id].Buster_Sword = 0;
    if (!userData[sender.id].Suwako_Hat) userData[sender.id].Suwako_Hat = 0;
    if (!userData[sender.id].Master_Sword) userData[sender.id].Master_Sword = 0;
    if (!userData[sender.id].Blaster) userData[sender.id].Blaster = 0;
    if (!userData[sender.id].Keyblade) userData[sender.id].Keyblade = 0;
    if (!userData[sender.id].Fursuit) userData[sender.id].Fursuit = 0;
    if (!userData[sender.id].Bag_Of_Nitori) userData[sender.id].Bag_Of_Nitori = 0;
    if (!userData[sender.id].timeXp) userData[sender.id].timeXp = moment().format("LT");
    if (!userData[sender.id].Daily) userData[sender.id].Daily = moment().format("L")

    //XpSyst
    if(userData[sender.id].timeXp != moment().format("LT")) {
        var addXP = rndInt(5, 42);
        userData[sender.id].totalXP += addXP;
        userData[sender.id].currentXp += addXP;
        userData[sender.id].timeXp = moment().format("LT");
        console.log(message.author.username + " a gagner " + addXP + " XP")

        if (userData[sender.id].currentXp >= nextLvlXp(userData[sender.id].level)) {
            userData[sender.id].currentXp -= nextLvlXp(userData[sender.id].level)
            userData[sender.id].level += 1
            var addGold = rndInt(0, 42)
            userData[sender.id].Gold += addGold;
            message.channel.send(message.author.username + " est LOVE **" + userData[sender.id].level + "** maintenant ! \nEt tu as gagné " + addGold + " G")
            console.log(message.author.username + " as atteint le level " + userData[sender.id].level)
        }
    }
    
    if (message.guild.id === "343166563006021633") {
        try {
            message.delete();
        } catch {
            console.log("cant delete");
        }
    }


    let XXX = "293767380796964864" //Id du serv
    let YYY = "293767380796964864" //Id du channel
    let ZZZ = "285758885787074561" //Id de l'utilisateur qui controle
    let ZZA = "269145505408221194"

    var salon = bot.guilds.find("id", XXX).channels.find("id", YYY);    
    
    if (message.channel.type === "dm" && message.author.id === ZZZ | message.author.id === ZZA) {
        salon.send(message.content);
    }

    var Cmd = message.content.toLowerCase();

    if (Cmd === PREFIX + "daily" && userData[sender.id].Daily != moment().format("L")){
        var DailyG = rndInt(10, 20)
        userData[sender.id].Daily = moment().format("L")
        userData[sender.id].Gold += DailyG
        message.channel.send("Tu a obtenu " + DailyG + " G de daily")
    } 

    if (Cmd === "bonjour" | Cmd === "salut") {
        message.channel.sendMessage("Salut !");
    }

    if (Cmd === PREFIX + "nyu"){
        message.channel.sendMessage("Cada Nyu")
    }


    if (Cmd === PREFIX + "bruh"){
        message.channel.sendMessage("https://www.youtube.com/watch?v=NzishIREebw")
    }

    if (Cmd === PREFIX + "help"){
        message.channel.sendMessage("commande disponible: \n|help \n|bruh \n|game \n|undertale \n|choix (exemple:|choix Bruh a la noix/Bruh pistache/bruhstic) \n|status idle/dnd/invisible/online (seul mon creator a acces a cette commmande) \n|nom \n|info Tadertalic [Nom du personnage] (Tiance,Fanima,Flawic,Tatic,Tara,Triskic,Kanami,Yumi,Suka,Sarane et Tans) \n|waifu \n|roll \n|level \n|Suwako \n|hug \n|shoot \n|pat \n|slap \n|Cirno \n|Yuyuko \n|Yukari \n|Daiyousei \n|commande \n|Rumia \n|Sakuya \n|Flandre \n|Clownpiece \n|Reisen \n|Komachi \n|Youmu \n|shop")
    }

    if (message.content.startsWith(PREFIX + "game")){
        var gam = message.content.substring(6);
        bot.user.setGame(gam);
        message.channel.sendMessage("**JEU CHANGER**");
    }

    if (Cmd === "bienvenue"){
        message.channel.sendMessage("Bienvenu")
    }
    
    if (Cmd === PREFIX + "undertale"){
            message.channel.sendMessage("Le meilleur jeu du monde ^^ donc le meilleur perso est Mettaton car lui aussi il est un robot comme moi")
    } 

    if (Cmd ==="666"){
            message.channel.sendMessage("Chara , Diable ou bien Tara ? **OU BIEN ALORS LE BESCHERELLE O_O**")
    }

    if (message.content.startsWith(PREFIX + "choix")){
        var opt = message.content.substring(7).split("/");

        var rnd = Math.floor(Math.random() * opt.length);
        console.log(rnd)

        message.reply("j'ai choisi : " + opt[rnd])
        //|choix Bruh a la noix/Bruh pistache/bruhstic 
    } 

    if (message.content.startsWith(PREFIX + "status") && message.author.id === "285758885787074561"){
        var con = message.content.substring(8);
        bot.user.setStatus(con);
        message.channel.sendMessage("**STATUS CHANGER**"); 
    } 

    if (message.content.startsWith(PREFIX + "nom")){
        var con = message.content.substring(5);
        bot.user.setUsername(con);
        message.channel.sendMessage("**NOM CHANGER**"); 
    } 

    if (Cmd === PREFIX + "info tadertalic fanima"){
        message.channel.sendMessage("Age: 6 Humain Fille a tatic ame: bravour Tue des gens dans son ennuis et souvent avec sa soeur Tiance pas de magie Arme:Poing Image: https://cdn.discordapp.com/attachments/427296392307015680/432919060452343808/Tiance_Fanima-2.png");
    }

    if (Cmd === PREFIX + "info tadertalic tiance"){
     message.channel.sendMessage("Age: 6 Humain Cat girl Fille a tatic ame: Patience ne Tue pas aime se baigner et a des ocasion s'habille en Maid et se cosplay souvent et aime la compagnie traine souvent avec Famina pas de magie Arme: Inconnu Image: https://cdn.discordapp.com/attachments/427296392307015680/432919061039415297/Tiance_Fanima-1.png");
    }

    if (Cmd === PREFIX + "info tadertalic tara"){
        message.channel.sendMessage("Age: 13 Humain Fille a tatic Ame: Determination Tue souvent Amical sauf quand elle a des crise pas de magie Arme: Couteaux Epée de patience Image: https://cdn.discordapp.com/attachments/427296392307015680/432919060452343810/Tara_1.png");
    }

    if (Cmd === PREFIX + "info tadertalic sarane"){
        message.channel.sendMessage("Age: 9 Humain Fille a tatic ame: Integre Danceuse aucune autre information Aucune arme et pas de magie Image: https://cdn.discordapp.com/attachments/427296392307015680/432919061706571797/Famille-2.png");
    }

    if (Cmd === PREFIX + "info tadertalic triskic"){
        message.channel.sendMessage("Age: 8 Humain Fils a Tatic Ame: Determination Amical ne tue pas aime la compagnie Arme:Baton Image: https://cdn.discordapp.com/attachments/427296392307015680/432919061039415299/Triskic_et_Tara-1.png");
    }

    if (Cmd === PREFIX + "info tadertalic kumiko"){
        message.channel.sendMessage("Age: 13 Humain fille a tatic Discrete Image: https://cdn.discordapp.com/attachments/427296392307015680/432919062784245770/Kumiko_et_mina_tenue_Normal-1.png");
    }

    if (Cmd === PREFIX + "info tadertalic tatic"){
        message.channel.sendMessage("Age: Inconnu Monstre Pere Sympa Procteur des AU et de sa Famille Traine avec Ink Maltraité un peu par sa femme Arme: Pinceau Magie:Lance os, Os, GB Image: https://cdn.discordapp.com/attachments/427296392307015680/432919233240891402/Bruh_1.png");
    }

    if (Cmd === PREFIX + "info tadertalic kanami"){
        message.channel.sendMessage("Age: 29 Veritable Age: 4 Humain Cat girl Mere aime ses enfant Maltraite son mari embette ses enfant Arme: Hache Magie: temps Image: https://cdn.discordapp.com/attachments/427296392307015680/432919062163619856/mere.png");
    }

    if (Cmd === PREFIX + "info tadertalic suka"){
     message.channel.sendMessage("Age: 11 Humain Fille a tatic Timide pas d'arme Magie: Est connu (Ami) par tout le monde quand elle ne dors pas ou qu'elle est inconsiente Image: https://cdn.discordapp.com/attachments/427296392307015680/432919061706571798/Suka.png");
    }

    if (Cmd === PREFIX + "info Tadertalic yumi"){
        message.channel.sendMessage("Age: 14 Humain Fille a Tatic Pas d'arme Magie: Elementaire Image: https://cdn.discordapp.com/attachments/427296392307015680/432919062163619864/Yumi.png");
    }

    if (Cmd === PREFIX + "info Tadertalic flawic"){
        message.channel.sendMessage("Age: Inconnu Monstre ami de tatic A tendance a tuer et peux etre Omega Magie:Pellet Gb plante Image: https://cdn.discordapp.com/attachments/427296392307015680/432919516473983003/EpicFlawic.png");
    }

    if (Cmd === PREFIX + "info tadertalic tans"){
        message.channel.sendMessage("Age: Inconnu Monstre Magie:Gb Image: https://cdn.discordapp.com/attachments/427296392307015680/432919516473983004/sketch-1521662248715.png");
    }

    if (Cmd === PREFIX + "info tadertalic mina"){
     message.channel.sendMessage("Age: 17 Maid servante etc. fille a tatic Humain aucune autre information Image: https://cdn.discordapp.com/attachments/427296392307015680/432950003586039808/mina_bunny.png");
    }

    if (Cmd === "bruhlovania"){
     message.channel.sendMessage("https://www.youtube.com/watch?v=9UBICledJxQ");
    }

    if (message.content.startsWith(PREFIX + "info Tadertalic Amina")){
        message.channel.sendMessage("Age:?? Fille Humain Cat girl Gentille cache un grand secret:Et en realité Tatic. cherche a se faire des amis , Ame: inconnue Armes: Batte ,Lance os Image: https://cdn.discordapp.com/attachments/346387142768984064/433671875030417409/Anima_2.png");
       }

    if (message.content.startsWith(PREFIX + "waifu")){
        var nk = message.content.substring(7).split("/");
        var tu4 = rndInt(0, 100);
        message.channel.sendMessage("Je note " + nk + " **"+ tu4 + "/100**")
    }

    if (message.content.startsWith(PREFIX + "roll")){
        var gh = message.content.substring(6)
        var max = parseInt(gh);
        var result = 0;
        if (!max) {
            result = rndInt(1, 6);
            message.reply("tu a obtenu **" + result + "/6** !");
        } else {

            if (message.author.id === "285758885787074561") {
                result = rndInt(Math.floor((max / 2 ) + 1), max);
            } else {
                result = rndInt(1, max);
            } message.reply("tu a obtenu **" + result + "/" + max + "** !");

        }

    }

    if(message.content.startsWith(PREFIX + "level") | message.content.startsWith(PREFIX + "profile")){

        var cible = message.mentions.users.first();

        if (!cible) {
            var AEmbed = new discord.RichEmbed({
                title: "Level",
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                fields: [{
                   name: "**LOVE**",
                   value: userData[sender.id].level,
                   inline: true
                },{
                    name: "Execution Point",
                    value: userData[sender.id].currentXp + " / " + nextLvlXp(userData[sender.id].level) + "\n(" + userData[sender.id].totalXP + " EXP)",
                    inline: true
                },{
                    name: "Gold",
                    value: userData[sender.id].Gold + " G",
                    inline: true
                },{
                    name: "Knife",
                    value: userData[sender.id].Knife,
                    inline: true
                },{
                    name: "Tem Flake",
                    value: userData[sender.id].Tem_Flake,
                    inline: true
                },{
                    name: "Heart locket",
                    value: userData[sender.id].Heart_locket,
                    inline: true
                },{
                    name: "Suwako Hat",
                    value: userData[sender.id].Suwako_Hat,
                    inline: true
                },{
                    name: "Buster Sword",
                    value: userData[sender.id].Buster_Sword,
                    inline: true
                },{
                    name: "Gland",
                    value: userData[sender.id].Gland,
                    inline: true
                },{
                    name: "Keyblade",
                    value: userData[sender.id].Keyblade,
                    inline: true
                },{
                    name: "Nitori bag",
                    value: userData[sender.id].Bag_Of_Nitori,
                    inline: true
                },{
                    name: "Master Sword",
                    value: userData[sender.id].Master_Sword,
                    inline: true
                },{
                    name: "Fursuit",
                    value: userData[sender.id].Fursuit,
                    inline: true
                },{
                    name: "Blaster",
                    value: userData[sender.id].Blaster,
                    inline: true
                }],
                color: message.member.colorRole.color
            });
        } else {
            var AEmbed = new discord.RichEmbed({
                title: "Level",
                author: {
                    name: cible.username,
                    icon_url: cible.avatarURL
                },
                fields: [{
                   name: "**LOVE**",
                   value: userData[cible.id].level,
                   inline: true
                },{
                    name: "Execution Point",
                    value: userData[cible.id].currentXp + " / " + nextLvlXp(userData[cible.id].level) + "\n(" + userData[cible.id].totalXP + " EXP)",
                    inline: true
                },{
                    name: "Gold",
                    value: userData[cible.id].Gold + " G",
                    inline: true
                },{
                    name: "Knife",
                    value: userData[cible.id].Knife,
                    inline: true
                },{
                    name: "Tem Flake",
                    value: userData[cible.id].Tem_Flake,
                    inline: true
                },{
                    name: "Heart locket",
                    value: userData[cible.id].Heart_locket,
                    inline: true
                },{
                    name: "Suwako Hat",
                    value: userData[cible.id].Suwako_Hat,
                    inline: true
                },{
                    name: "Buster Sword",
                    value: userData[cible.id].Buster_Sword,
                    inline: true
                },{
                    name: "Gland",
                    value: userData[cible.id].Gland,
                    inline: true
                },{
                    name: "Keyblade",
                    value: userData[cible.id].Keyblade,
                    inline: true
                },{
                    name: "Nitori bag",
                    value: userData[cible.id].Bag_Of_Nitori,
                    inline: true
                },{
                    name: "Master Sword",
                    value: userData[cible.id].Master_Sword,
                    inline: true
                },{
                    name: "Fursuit",
                    value: userData[cible.id].Fursuit,
                    inline: true
                },{
                    name: "Blaster",
                    value: userData[cible.id].Blaster,
                    inline: true
                }],
                color: 3192471
            });
        }

        message.channel.send(AEmbed);

    }

    if(Cmd === PREFIX + "suwako"){
        
        var imgURL = "";
        var choice = rndInt(1, 8)

        if(choice === 1){
            imgURL = "https://cdn.discordapp.com/attachments/379314985060270082/379316716175491072/images.png"
        } else if(choice === 2){
            imgURL = "https://cdn.discordapp.com/attachments/379314985060270082/379315252270989325/9k.png"
        } else if(choice === 3){
            imgURL= "https://cdn.discordapp.com/attachments/379314985060270082/379316655949611009/images.png"
        } else if(choice === 4){
            imgURL = "https://cdn.discordapp.com/attachments/379314985060270082/379315165403021312/Z.png"
        } else if(choice === 5){
            imgURL = "https://cdn.discordapp.com/attachments/379314985060270082/379315441186766860/2Q.png"
        } else if(choice === 6){
            imgURL = "https://cdn.discordapp.com/attachments/379314985060270082/379316689587666944/images.png"
        } else if(choice === 7){
            imgURL = "https://cdn.discordapp.com/attachments/379314985060270082/379316502899195905/images.png"
        } else {
            imgURL = "https://cdn.discordapp.com/attachments/379314985060270082/379315306440556556/9k.png"
        }

        var Bembed = new discord.RichEmbed({
            image: {
                url: imgURL
            }
        });
        message.channel.send(Bembed);
    }

    if (message.content.startsWith(PREFIX + "hug")){
        var gas = message.content.substring(5)
        var gifUrl = ""
        var HCoose = rndInt(1, 11)

        if(HCoose === 1){
            gifUrl = "https://media1.tenor.com/images/7db5f172665f5a64c1a5ebe0fd4cfec8/tenor.gif?itemid=9200935"
        } else if(HCoose === 2){
            gifUrl = "https://78.media.tumblr.com/10920f32b832535e01c257273edc386a/tumblr_o4q12rkYqX1uefti6o1_500.gif"
        } else if(HCoose === 3){
            gifUrl = "https://orig00.deviantart.net/68e8/f/2016/229/e/0/undertale____underswap____underfell____monster_hug_by_spacejacket-daebm0e.gif"
        } else if(HCoose === 4){
            gifUrl = "http://31.media.tumblr.com/33c8d3b0b83514b16fc5fb06589ceb11/tumblr_nlrld1pXss1tros9go1_500.gif"
        } else if(HCoose === 5){
            gifUrl = "https://78.media.tumblr.com/a8010e4dd438187a6280a4f6d2fe54df/tumblr_mld7hjS2p71rswb5ko1_500.gif"
        } else if(HCoose === 6){
            gifUrl = "https://i.pinimg.com/originals/61/96/87/61968769748ca0259106a2b537bff2b7.gif"
        } else if(HCoose === 7){
            gifUrl = "https://i.pinimg.com/originals/03/18/94/03189484602887495d0d97923eeb559c.gif"
        } else if(HCoose === 8){
            gifUrl = "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif"
        } else if(HCoose === 9){
            gifUrl = "https://i.pinimg.com/originals/3a/e5/f4/3ae5f45a9ee2bd72c9b964b3192a9f45.gif"
        } else if(HCoose === 10){
            gifUrl = "https://i.pinimg.com/originals/b9/c9/bd/b9c9bd8a900e51d82f105ac2cd93021a.gif"
        } else {
            gifUrl = "https://vignette.wikia.nocookie.net/fairytail/images/3/35/Erza%27s-hug.gif/revision/latest?cb=20120624163553"

        }

        var Gembed = new discord.RichEmbed({
            image: {
                url: gifUrl
            }
        })

        message.channel.sendMessage(gas +" Tu a été hug par <@" + sender.id + ">")
        message.channel.send(Gembed)
    }
    
    if(message.content.startsWith(PREFIX + "kiss")){
        var gef = message.content.substring(6)
        var gif = ""
        var HC = rndInt(1, 4)

        if(HC === 1){
            gif = "https://vignette.wikia.nocookie.net/undertale/images/4/42/Undyne_kiss.gif/revision/latest?cb=20161122143117&path-prefix=ru"
        } else if(HC === 2){
            gif = "https://imgur.com/4Ad9iwh"
        } else if(HC === 3){
            gif = "https://media.tenor.com/images/8cf98d92c54ee938e1c6617ad8c0e167/tenor.gif"
        } else {
            gif = "https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865"
        }

        var Ml = new discord.RichEmbed({
            image: {
                url: gif
            }
        })
    
        message.channel.sendMessage(gef +" Tu a reçu un bisou de <@" + sender.id + ">")
        message.channel.send(Ml)
    }

    if(message.content.startsWith(PREFIX + "pout")){
        var gif = ""
        var HC = rndInt(1, 4)

        if(HC === 1){
            gif = "https://media1.tenor.com/images/58a26a738703565f7fc276aedabfcfb3/tenor.gif?itemid=5754157"
        } else if(HC === 2){
            gif = "https://imgur.com/uQzTgI7"
        } else if(HC === 3){
            gif = "https://78.media.tumblr.com/7dd785d8518634c401951e10e2d5a17d/tumblr_o2jjytAxIl1tydz8to1_500.gif"
        } else {
            gif = "https://media1.tenor.com/images/c9c9ff2eed3dff5c3b9f7c0c033704da/tenor.gif?itemid=8657468"
        }

        var Ml = new discord.RichEmbed({
            image: {
                url: gif
            }
        })
    
        message.channel.sendMessage(" Il semblerait que <@" + sender.id + "> soit vexé")
        message.channel.send(Ml)
    }

    if(message.content.startsWith(PREFIX + "shoot")){
        var gef = message.content.substring(7)
        var gif = ""
        var HC = rndInt(1, 3)

        if(HC === 1){
            gif = "http://mizbala.com/_uploads/images/2012/07/cat1.gif"
        } else if(HC === 2){
            gif = "https://data.whicdn.com/images/151731647/original.gif"
        } else if(HC === 3){
            gif = "https://78.media.tumblr.com/tumblr_m1rpa43mBj1qh9mnoo1_500.gif"
        }

        var Ml = new discord.RichEmbed({
            image: {
                url: gif
            }
        })

        message.channel.sendMessage(gef +" Tu a été shooter par <@" + sender.id + ">")
        message.channel.send(Ml)
    }

    if(message.content.startsWith(PREFIX + "pat")){
        var jef = message.content.substring(5)
        var jif = ""
        var jC = rndInt(1, 9)

        if(jC === 1){
            jif = "https://vignette.wikia.nocookie.net/fairy-tail/images/b/ba/Gajil_tapote_la_t%C3%AAte_de_Reby.gif/revision/latest?cb=20130319170957&path-prefix=fr"
        } else if(jC === 2){
            jif = "https://media1.tenor.com/images/398c9c832335a13be124914c23e88fdf/tenor.gif?itemid=9939761"
        } else if(jC === 3){
            jif = "https://vignette.wikia.nocookie.net/date-a-live/images/a/a0/Tumblr_gif.-date-a-live.gif/revision/latest?cb=20150703064955"
        } else if(jC === 4){
            jif = "https://media0.giphy.com/media/N0CIxcyPLputW/giphy.gif"
        } else if(jC === 5){
            jif = "https://vignette.wikia.nocookie.net/date-a-live/images/3/3d/Shido_patting_kurumi.gif/revision/latest?cb=20160728135000"
        } else if(jC === 6){
            jif = "https://78.media.tumblr.com/584a3894e3483eed23d1afaf1f6f9347/tumblr_ok1oplyzSF1r0tp5lo1_500.gif"
        } else if(jC === 7){
            jif = "https://media.giphy.com/media/iGZJRDVEM6iOc/giphy.gif"
        } else if(jC === 8){
            jif = "http://reve-of-manga.r.e.pic.centerblog.net/bb35d33b.gif"
        } else {
            gif = "https://i.pinimg.com/originals/3f/ce/b9/3fceb931f867de40db9ab49a693d8dda.gif"
        }

        var Mm = new discord.RichEmbed({
            image: {
                url: jif
            }
        })

        message.channel.sendMessage(jef +" Tu a été pat par <@" + sender.id + ">")
        message.channel.send(Mm)
    }

    
    if(message.content.startsWith(PREFIX + "slap")){
        var klo = message.content.substring(6)
        var jjf = ""
        var brusx = rndInt(1, 6)

        if(brusx === 1){
            jjf = "http://25.media.tumblr.com/tumblr_m1nsxc3jUu1qdjfd8o1_400.gif"
        } else if(brusx === 2){
            jjf = "https://media.giphy.com/media/LB1kIoSRFTC2Q/giphy.gif"
        } else if(brusx === 3){
            jjf = "https://media1.tenor.com/images/85722c3e51d390e11a0493696f32fb69/tenor.gif?itemid=5463215"
        } else if(brusx === 4){
            jjf = "https://media2.giphy.com/media/m6etefcEsTANa/giphy.gif"
        } else if(brusx === 5){
            jjf = "https://pa1.narvii.com/5609/73312031bc4f5879b88ccd0892c22cead0f3a95f_hq.gif"
        } else if(brusx === 6){
            jjf = "http://38.media.tumblr.com/96410a7793a02486937d341a4b8b8d86/tumblr_neg21h1Ywc1qii6huo2_500.gif"
        }

        var jta = new discord.RichEmbed({
            image: {
                url: jjf
            }
        })

        message.channel.sendMessage(klo +" Tu a été slapé par <@" + sender.id + ">")
        message.channel.send(jta)
    } 
    
    if(message.content.startsWith(PREFIX + "bite")){
        var klo = message.content.substring(6)
        var jjf = ""
        var brusx = rndInt(1, 7)

        if(brusx === 1){
            jjf = "https://media1.tenor.com/images/c22a247affcf4cd02c7d17f5a432cd95/tenor.gif?itemid=8259627"
        } else if(brusx === 2){
            jjf = "https://media1.tenor.com/images/a74770936aa6f1a766f9879b8bf1ec6b/tenor.gif?itemid=4676912"
        } else if(brusx === 3){
            jjf = "http://i0.kym-cdn.com/photos/images/newsfeed/000/783/193/dc2.gif"
        } else if(brusx === 4){
            jjf = "https://3.bp.blogspot.com/-aFX_onS0RmY/VqMgqpAY2YI/AAAAAAAAW1M/FsPCzA8lMds/s1600/Omake%2BGif%2BAnime%2B-%2BGATE%2B-%2BEpisode%2B15%2B-%2BRory%2BBites.gif"
        } else if(brusx === 5){
            jjf = "https://orig00.deviantart.net/ad3d/f/2017/036/d/1/ezgif_com_video_to_gif__2__by_pokestudios-day20ni.gif"
        } else if(brusx === 6){
            jjf = "https://lh3.googleusercontent.com/-pZmm2mW38Eo/U-PAxJTCkPI/AAAAAAAAA6w/KVAKNq9MdVw/w426-h240/bite..gif"
        } else {
            jjf= "https://cdn.discordapp.com/attachments/451201135160590337/464762350877278209/nya.gif"
        }

        var jta = new discord.RichEmbed({
            image: {
                url: jjf
            }
        })

        message.channel.sendMessage(klo +" Tu a été mordu par <@" + sender.id + ">")
        message.channel.send(jta)
    }  

    if(message.content.startsWith(PREFIX + "dab")){
        var jjf = ""
        var brusx = rndInt(1, 6)

        if(brusx === 1){
            jjf = "https://78.media.tumblr.com/5f2e555cb2cfe2049167d17ed334cd85/tumblr_ovmi3nDfq31vb24bgo1_500.gif"
        } else if(brusx === 2){
            jjf = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWYH2AnAMN7rQiLcfoBID4Y54uynrlv5MHeMPBYkdeI8kwk9ff"
        } else if(brusx === 3){
            jjf = "https://i.kym-cdn.com/photos/images/original/001/075/821/0e7.gif"
        } else if(brusx === 4){
            jjf = "https://orig00.deviantart.net/8e29/f/2017/025/1/2/snas_emit_dab_by_radc-dawqncs.gif"
        } else if(brusx === 5){
            jjf = "https://orig00.deviantart.net/ad3d/f/2017/036/d/1/ezgif_com_video_to_gif__2__by_pokestudios-day20ni.gif"
        } else if(brusx === 6){
            jjf = "https://orig00.deviantart.net/d015/f/2017/099/1/4/dab_by_cutgut-db57z19.gif"
        }

        var jta = new discord.RichEmbed({
            image: {
                url: jjf
            }
        })

        message.channel.sendMessage("<@" + sender.id + "> est en train de daber")
        message.channel.send(jta)
    }

    if(Cmd === PREFIX + "commande"){
        message.channel.sendMessage("Menu tacos avec coca et des fri- BAKAAA !!")
    }

if(Cmd === PREFIX + "yuyuko"){
        
        var imUR = "";
        var chce = rndInt(1, 5)

        if(chce === 1){
            imUR = "https://en.touhouwiki.net/images/thumb/a/a4/Th075yuyuko01.png/200px-Th075yuyuko01.png"
        } else if(chce === 2){
            imUR = "https://i.ytimg.com/vi/gCgwMF-7DAg/maxresdefault.jpg"
        } else if(chce === 3){
            imUR= "https://static.zerochan.net/Saigyouji.Yuyuko.full.1935386.jpg"
        } else if(chce === 4){
            imUR = "https://static.zerochan.net/Saigyouji.Yuyuko.full.205295.jpg"
        } else {
            imUR = "https://i.ytimg.com/vi/BGnq1XmGpA0/maxresdefault.jpg"
        }

        var Bbed = new discord.RichEmbed({
            image: {
                url: imUR
            }
        });
        message.channel.send(Bbed);
    }

    if(Cmd === PREFIX + "aya"){
        
        var imUR = "";
        var chce = rndInt(1, 9)

        if(chce === 1){
            imUR = "https://vignette.wikia.nocookie.net/p__/images/1/10/Aya5.jpg/revision/latest?cb=20180112181742&path-prefix=protagonist"
        } else if(chce === 2){
            imUR = "https://static.giantbomb.com/uploads/original/1/14761/792707-aya_76.png"
        } else if(chce === 3){
            imUR= "https://static.zerochan.net/Shameimaru.Aya.full.146932.jpg"
        } else if(chce === 4){
            imUR = "https://vignette.wikia.nocookie.net/dragonball/images/f/fc/Touhou_-_Aya_Shameimaru.gif/revision/latest?cb=20120206204227"
        } else if(chce === 5){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702550403448832/8fd426a56104ebcbfac902cde5014c41_480.jpg"
        } else if(chce === 6){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702549946007553/96c458ace30bd95e00025f50d144e062_480.jpg"
        } else if(chce === 7){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702515112312833/f36rhKw.jpg"
        } else if(chce === 8){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702341745213450/Shameimaru.Aya.600.1316113.jpg"
        } else {
            imUR = "https://vignette.wikia.nocookie.net/touhou/images/3/34/Swr_aya.jpg/revision/latest?cb=20130530203151&path-prefix=fr"
        }

        var Bbed = new discord.RichEmbed({
            image: {
                url: imUR
            }
        });
        message.channel.send(Bbed);
    }

    if(Cmd === PREFIX + "aya momiji" | Cmd === PREFIX + "momiji aya"){
        
        var imUR = "";
        var chce = rndInt(1, 12)

        if(chce === 1){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464472745045131274/aya___momiji_leaves_geta_inubashiri_tengu-bFYy.jpg"
        } else if(chce === 2){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464472745506373632/ganbatte_kudasai__tengu_inubashiri_momiji-bcVX.jpg"
        } else if(chce === 3){
            imUR= "https://cdn.discordapp.com/attachments/459003373937623060/464702340994170880/telechargement_1.jpeg"
        } else if(chce === 4){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702340994170882/cpfsDvC.jpg"
        } else if(chce === 5){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702341745213452/Touhou.600.165849.jpg"
        } else if(chce === 6){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702409835544586/Touhou-Autumn-Leaves-Shameimaru-Aya-and-Inubashiri-Momiji-600x375.jpg"
        } else if(chce === 7){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702514252611585/95afc524.png"
        } else if(chce === 8){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702515557171200/Touhou.600.852837.jpg"
        } else if(chce === 9){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702548830584854/Touhou.600.1129049.jpg"
        } else if(chce === 10){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702549438627870/touhou_animal_ears_shameimaru_aya_inubashiri_momiji_tengu_1400x1050_wallpaper_www.knowledgehi.com_79.jpg"
        } else if(chce === 11){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702549946007552/VaLeBWR.jpg"
        } else {
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702548830584852/video_games_touhou_animal_ears_shameimaru_aya_inubashiri_momiji_tengu_1280x1024_wallpaper_www.knowle.jpg"
        }

        var Bbed = new discord.RichEmbed({
            image: {
                url: imUR
            }
        });
        message.channel.send(Bbed);
    }

    if(Cmd ===  PREFIX + "shop buy tem flake" && !message.author.bot.user && userData[sender.id].Gold >= 18  ) {
        userData[sender.id].Gold -= 19;
        userData[sender.id].Tem_Flake += 1
        message.channel.send ("Tu a acheter 1 Tem flake")
    }

    if(Cmd === PREFIX + "shop buy keyblade" && !message.author.bot.user && userData[sender.id].Gold >= 113 ) {
        userData[sender.id].Gold -= 114;
        userData[sender.id].Keyblade += 1
        message.channel.send ("Tu a acheter 1 Keyblake")
    }
    
    if(Cmd === PREFIX + "shop buy fursuit" && !message.author.bot.user && userData[sender.id].Gold >= 45 ) {
        userData[sender.id].Gold -= 46;
        userData[sender.id].Fursuit += 1
        message.channel.send ("Tu a acheter 1 Fursuit")
    }

    if(Cmd === PREFIX + "shop buy blaster" && !message.author.bot.user && userData[sender.id].Gold >= 109 ) {
        userData[sender.id].Gold -= 110;
        userData[sender.id].Blaster += 1
        message.channel.send ("Tu a acheter 1 Blaster")
    }

    if(Cmd === PREFIX + "shop buy nitori bag" && !message.author.bot.user && userData[sender.id].Gold >= 168 ) {
        userData[sender.id].Gold -= 169;
        userData[sender.id].Bag_Of_Nitori += 1
        message.channel.send ("Tu a acheter 1 Nitori Bag")
    }

    if(Cmd === PREFIX + "shop buy buster sword" && !message.author.bot.user && userData[sender.id].Gold >= 119 ) {
        userData[sender.id].Gold -= 120;
        userData[sender.id].Buster_Sword += 1
        message.channel.send ("Tu a acheter 1 Buster sword")
    }

    if(Cmd === PREFIX + "shop buy gland" && !message.author.bot.user && userData[sender.id].Gold >= 24 ) {
        userData[sender.id].Gold -= 25;
        userData[sender.id].Gland += 1
        message.channel.send ("Tu a acheter 1 Gland")
    }

    if(Cmd === PREFIX + "shop buy master sword" && !message.author.bot.user && userData[sender.id].Gold >= 199 ) {
        userData[sender.id].Gold -= 200;
        userData[sender.id].Master_Sword += 1
        message.channel.send ("Tu a acheter 1 master sword")
    }

    if(Cmd === PREFIX + "shop buy suwako hat" && !message.author.bot.user && userData[sender.id].Gold >= 166 ) {
        userData[sender.id].Gold -= 167;
        userData[sender.id].Suwako_Hat += 1
        message.channel.send ("Tu a acheter 1 Suwako hat")
    }

    if(Cmd === PREFIX + "shop buy knife" && !message.author.bot.user && userData[sender.id].Gold >= 111 ) {
            userData[sender.id].Gold -= 112;
            userData[sender.id].Knife += 1;
            message.channel.send ("Tu a acheter 1 Knife")
    }

    if(Cmd === PREFIX + "shop buy heart locket" && !message.author.bot.user && userData[sender.id].Gold >= 99 ) {
                userData[sender.id].Gold -= 100;
                userData[sender.id].Heart_locket += 1;
                message.channel.send ("Tu a acheter 1 Heart Locket")
    }

    if(Cmd === PREFIX + "momiji"){
        
        var imUR = "";
        var chce = rndInt(1, 11)

        if(chce === 1){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464472745506373633/resize.gif"
        } else if(chce === 2){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702342344867851/Inubashiri.Momiji.full.1068749.jpg"
        } else if(chce === 3){
            imUR= "https://cdn.discordapp.com/attachments/459003373937623060/464702342344867852/telechargement_1.png"
        } else if(chce === 4){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702408614871040/momiji_inubashiri_vector_by_hellfromheaven-d8hsvi9.png"
        } else if(chce === 5){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702409185165312/Inubashiri.Momiji.600.1678501.jpg"
        } else if(chce === 6){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702409185165313/inubashiri_momiji_touhou_drawn_by_akeboshi_kagayo__sample-5880865014745680059def1db14ebfde.jpg"
        } else if(chce === 7){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702409835544589/inubashiri_momiji_touhou_drawn_by_shiro_ami__sample-01edaf9fcd1208d0a3f340e050ef8845.jpg"
        } else if(chce === 8){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702514252611584/tenor.gif"
        } else if(chce === 9){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702618988707840/2014-12-14-693778.jpeg"
        } else if(chce === 10){
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702515557171201/P7rY2zv.jpg"
        } else {
            imUR = "https://cdn.discordapp.com/attachments/459003373937623060/464702515112312832/647410-momiji_default.jpg"
        }

        var Bbed = new discord.RichEmbed({
            image: {
                url: imUR
            }
        });
        message.channel.send(Bbed);
    }

    if(Cmd === PREFIX + "yukari"){
        
        var im = "";
        var hce = rndInt(1, 7)

        if(hce === 1){
            im = "https://vignette.wikia.nocookie.net/deathbattlefanon/images/b/b2/Yakumo.Yukari.full.1005817.jpg/revision/latest?cb=20150624151322"
        } else if(hce === 2){
            im = "https://static.zerochan.net/Yakumo.Yukari.full.1363846.jpg"
        } else if(hce === 3){
            im= "https://i.pinimg.com/originals/e7/f5/bb/e7f5bb0303dcc8ade872eff4bde08e16.jpg"
        } else if(hce === 4){
            im = "http://hakureishrine.co.uk/wp-content/uploads/2014/06/Congratulations-Zun-First-Child.jpg"
        } else if(hce === 5){
            im = "https://orig00.deviantart.net/9f9a/f/2011/072/5/e/phantasm__yukari_yakumo_by_lazuren-d3bjup1.png"
        } else if(hce === 6){
            im = "https://i.imgur.com/EUsL3Mo.jpg"
        } else {
            im = "https://pre00.deviantart.net/dec9/th/pre/i/2012/308/1/e/touhou_vivid_daybreak___yukari_yakumo_by_altronage-d5jx0le.jpg"
        }

        var Bd = new discord.RichEmbed({
            image: {
                url: im
            }
        });
        message.channel.send(Bd);
    }

    if(Cmd === PREFIX + "daiyousei"){
        
        var wvq = "";
        var hye = rndInt(1, 6)

        if(hye === 1){
            wvq = "https://cdn.discordapp.com/attachments/379314985060270082/438863629903855627/images.png"
        } else if(hye === 2){
            wvq = "https://cdn.discordapp.com/attachments/379314985060270082/438862923818074113/Daiyousei.png"
        } else if(hye === 3){
            wvq = "https://cdn.discordapp.com/attachments/379314985060270082/438862834777063425/Z.png"
        } else if(hye === 4){
            wvq = "https://cdn.discordapp.com/attachments/379314985060270082/438862951282376706/9k.png"
        } else if(hye === 5){
            wvq = "https://cdn.discordapp.com/attachments/379314985060270082/438865397169651713/images.png"
        } else {
            wvq = "https://cdn.discordapp.com/attachments/379314985060270082/438866742622683136/images.png"
        }

        var Opsa = new discord.RichEmbed({
            image: {
                url: wvq
            }
        });
        message.channel.send(Opsa);
    }

    if(Cmd === PREFIX + "cirno"){
        
        var qwa = "";
        var liea = rndInt(1, 6)

        if(liea === 1){
            qwa = "https://cdn.discordapp.com/attachments/379314985060270082/438855803605352462/74895.png"
        } else if(liea === 2){
            qwa = "https://cdn.discordapp.com/attachments/379314985060270082/438854957282885660/9k.png"
        } else if(liea === 3){
            qwa = "https://cdn.discordapp.com/attachments/379314985060270082/438855195103854602/images.png"
        } else if(liea === 4){
            qwa = "https://cdn.discordapp.com/attachments/379314985060270082/438854938018185218/9k.png"
        } else if(liea === 5){
            qwa = "https://cdn.discordapp.com/attachments/379314985060270082/438854891335712779/2Q.png"
        } else {
            qwa = "https://cdn.discordapp.com/attachments/379314985060270082/438857359759245323/images.png"
        }

        var ksa = new discord.RichEmbed({
            image: {
                url: qwa
            }
        });
        message.channel.send(ksa);
    }

    if(Cmd === PREFIX + "yee"){
        message.channel.sendMessage("https://www.youtube.com/watch?v=q6EoRBvdVPQ")
    }

    if(Cmd === PREFIX + "rumia"){
        
        var za = "";
        var lis = rndInt(1, 9)

        if(lis === 1){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438995056742105088/rumia_wallpaper_by_thunderdragn-d5k9ie1.png"
        } else if(lis === 2){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438994250437230603/images.png"
        } else if(lis === 3){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438994146443657216/Z.png"
        } else if(lis === 4){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438994349452296192/Rumia_4.jpg"
        } else if(lis === 5){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438994331185971202/Rumia_1.jpg"
        } else if(lis === 6){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438995851499798528/47a4034785f578784f6902dc539df6db--pin-anime.png"
        } else if(lis === 7){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438994116609835010/images.png"
        } else if(lis === 8){
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438995873888862218/d872b66f6e0cdb464190464da903fad8--skirt-set-shirt-skirt.png"
        } else {
            za = "https://cdn.discordapp.com/attachments/379314985060270082/438996079598370836/4qCaz.png"
        }

        var Ghs = new discord.RichEmbed({
            image: {
                url: za
            }
        });
        message.channel.send(Ghs);
    }

    if(Cmd === PREFIX + "flandre"){
        
        var Ocap = "";
        var lipa = rndInt(1, 9)

        if(lipa === 1){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438997718770384896/Flandre-Scarlet-anime-girl.png"
        } else if(lipa === 2){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438997476033298432/touhou-halloween-vampires-flandre-scarlet-1440x900-wallpaper-495005.png"
        } else if(lipa === 3){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438996714322395136/Z.png"
        } else if(lipa === 4){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438996783603908608/images.png"
        } else if(lipa === 5){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438996951456022529/images.png"
        } else if(lipa === 6){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438997299327139840/33479-full.png"
        } else if(lipa === 7){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438997760923140117/flandre-scarlet-34076.png"
        } else if(lipa === 8){
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438997870964637708/1418722001--.png"
        } else {
            Ocap = "https://cdn.discordapp.com/attachments/379314985060270082/438997356105433089/5dd1cfe179db4a5885a8338aa67c0974.png"
        }

        var Gsb = new discord.RichEmbed({
            image: {
                url: Ocap
            }
        });
        message.channel.send(Gsb);
    }

    if(Cmd === PREFIX + "sakuya"){
        
        var Odp = "";
        var lsd = rndInt(1, 7)

        if(lsd === 1){
            Odp = "https://cdn.discordapp.com/attachments/379314985060270082/438998528900071445/images.png"
        } else if(lsd === 2){
            Odp = "https://cdn.discordapp.com/attachments/379314985060270082/438998382942355457/images.png"
        } else if(lsd === 3){
            Odp = "https://cdn.discordapp.com/attachments/379314985060270082/438998407277707265/images.png"
        } else if(lsd === 4){
            Odp = "https://cdn.discordapp.com/attachments/379314985060270082/438998312725512192/images.png"
        } else if(lsd === 5){
            Odp = "https://cdn.discordapp.com/attachments/379314985060270082/438998127056257024/images.png"
        } else if(lsd === 6){
            Odp = "https://cdn.discordapp.com/attachments/379314985060270082/438998594565963797/images.png"
        } else {
            Odp = "https://cdn.discordapp.com/attachments/379314985060270082/438998081388675082/2Q.png"
        }

        var gb = new discord.RichEmbed({
            image: {
                url: Odp
            }
        });
        message.channel.send(gb);
    }

    if(Cmd === PREFIX + "clownpiece"){
        
        var iR = "";
        var chae = rndInt(1, 7)

        if(chae === 1){
            iR = "https://static.zerochan.net/Clownpiece.full.1913459.jpg"
        } else if(chae === 2){
            iR = "https://static.zerochan.net/Clownpiece.full.1927911.jpg"
        } else if(chae === 3){
            iR= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZALOCQPEV4jixjhmyL0Y4cLe2tvz1dZs5SeWWzv31FxGpqsnI"
        } else if(chae === 4){
            iR = "https://i.pinimg.com/564x/fd/15/d2/fd15d28a8d7a604f8cc18596671b233c.jpg"
        } else if(chae === 5){
            iR = "https://pre00.deviantart.net/7fc4/th/pre/f/2015/226/5/3/5309037d763b2512484783077286c499-d95mm5t.png"
        } else if(chae === 6){
            iR = "https://pre00.deviantart.net/16b1/th/pre/i/2015/347/a/5/clownpiece_by_takabubu-d9k25u3.jpg"
        } else {
            iR = "https://lohas.nicoseiga.jp/thumb/5129790i?"
        }

        var Bwq = new discord.RichEmbed({
            image: {
                url: iR
            }
        });
        message.channel.send(Bwq);
    }

    if(Cmd === PREFIX + "reisen"){
        
        var isa = "";
        var cse = rndInt(1, 7)

        if(cse === 1){
            isa = "https://static.zerochan.net/Reisen.Udongein.Inaba.full.1328025.jpg"
        } else if(cse === 2){
            isa = "https://i.ytimg.com/vi/cZJir5H2N1c/maxresdefault.jpg"
        } else if(cse === 3){
            isa= "http://www.legion34.com/wp-content/uploads/2013/08/Reisen-4.jpg"
        } else if(cse === 4){
            isa = "https://i.ytimg.com/vi/HcyOdaKtv70/maxresdefault.jpg"
        } else if(cse === 5){
            isa = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7ddBQMsB6vIohLJgmOxSDhQJ7nuDZ0GxJPui9Hj25EyknVKvEw"
        } else if(cse === 6){
            isa = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7mi-5dCp0ryrjSccKfMOMSCrPrsBvSxo_Edep4AOPUWOmgcu"
        } else {
            isa = "https://static.zerochan.net/Reisen.Udongein.Inaba.full.245733.jpg"
        }

        var Bwate = new discord.RichEmbed({
            image: {
                url: isa
            }
        });
        message.channel.send(Bwate);
    }

    if(Cmd === PREFIX + "komachi"){
        
        var isag = "";
        var cks = rndInt(1, 7)

        if(cks === 1){
            isag = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYi5P3eMGmvs5wpKebQZ6TmbJS9VtwcQZloA46GuZFiJt-S8A7"
        } else if(cks === 2){
            isag = "https://orig00.deviantart.net/a369/f/2016/177/c/d/komachi_onozuka_by_clearechoes-da7p4qf.png"
        } else if(cks === 3){
            isag= "https://static.zerochan.net/Onozuka.Komachi.full.1097141.jpg"
        } else if(cks === 4){
            isag = "https://static.zerochan.net/Onozuka.Komachi.full.1415421.jpg"
        } else if(cks === 5){
            isag = "https://static.zerochan.net/Onozuka.Komachi.full.168128.jpg"
        } else if(cks === 6){
            isag = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVB_Zvqq8_3DocyfhM4ECSaCpicqzBGg2YBjw6h5lPAqdi4fi9"
        } else {
            isag = "https://en.touhouwiki.net/images/thumb/3/37/Th105Komachi.png/275px-Th105Komachi.png"
        }

        var Bgz = new discord.RichEmbed({
            image: {
                url: isag
            }
        });
        message.channel.send(Bgz);
    }

    if(Cmd === PREFIX + "youmu"){
        
        var isx = "";
        var cxa = rndInt(1, 7)

        if(cxa === 1){
            isx = "https://img00.deviantart.net/0552/i/2009/350/d/d/youmu_konpaku_by_killerrabis.jpg"
        } else if(cxa === 2){
            isx = "https://cdn.discordapp.com/attachments/292024719664742401/440233613468893216/images.png"
        } else if(cxa === 3){
            isx= "https://cdn.discordapp.com/attachments/292024719664742401/440234075882651649/images.png"
        } else if(cxa === 4){
            isx = "https://cdn.discordapp.com/attachments/292024719664742401/440234263452057602/2Q.png"
        } else if(cxa === 5){
            isx = "https://cdn.discordapp.com/attachments/292024719664742401/440234293436874773/Z.png"
        } else if(cxa === 6){
            isx = "https://cdn.discordapp.com/attachments/292024719664742401/440234036829487133/images.png"
        } else {
            isx = "https://cdn.discordapp.com/attachments/292024719664742401/440234008823988269/images.png"
        }

        var Bgfq = new discord.RichEmbed({
            image: {
                url: isx
            }
        });
        message.channel.send(Bgfq);
    }

    if(Cmd === PREFIX + "alice"){
        
        var isx = "";
        var cxa = rndInt(1, 8)

        if(cxa === 1){
            isx = "https://cdn.discordapp.com/attachments/349688218557612033/465460007295516673/images.png"
        } else if(cxa === 2){
            isx = "https://cdn.discordapp.com/attachments/349688218557612033/465460226028470282/8b5184bcba1590bffee3231387ee2940--illustration-shanghai.jpg"
        } else if(cxa === 3){
            isx= "https://cdn.discordapp.com/attachments/349688218557612033/465460355435462656/images_1.jpg"
        } else if(cxa === 4){
            isx = "https://cdn.discordapp.com/attachments/349688218557612033/465460402466324480/Alice.Margatroid.full.163382.jpg"
        } else if(cxa === 5){
            isx = "https://cdn.discordapp.com/attachments/349688218557612033/465460454953844746/Alice_Margatroid.jpg"
        } else if(cxa === 6){
            isx = "https://cdn.discordapp.com/attachments/349688218557612033/465460510574510080/telechargement_1.jpg"
        } else if(cxa === 7){
            isx = "https://cdn.discordapp.com/attachments/349688218557612033/465460885885026304/tumblr_nwakphAROs1uj7cdwo1_1280.jpg"
        } else {
            isx = "https://cdn.discordapp.com/attachments/349688218557612033/465460589054001162/images_28.jpg"
        }

        var Bgfq = new discord.RichEmbed({
            image: {
                url: isx
            }
        });
        message.channel.send(Bgfq);
    }

    if(Cmd === PREFIX + "cosplay"){
        
        var iasq = "";
        var cxd = rndInt(1, 74)

        if(cxd === 1){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440244270620999682/Tiance_Tara.png"
        } else if(cxd === 2){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440244270620999686/Blue_Tiance.png"
        } else if(cxd === 3){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440244271195488276/Tiance_cirno.png"
        } else if(cxd === 4){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440244271195488277/Tiace_Chara.png"
        } else if(cxd === 5){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440244271736422400/Tiance_Suwako.png"
        } else if(cxd === 6){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440244271736422402/Tiance_Remilla.png"
        } else if(cxd === 7){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440244272307109899/Tiace_Frisk.png"
        } else if(cxd === 8){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440247662860566539/Tiance_Marisa.png"
        } else if(cxd === 9){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440247677490298890/Tiance_Reimu.png"
        } else if(cxd === 10){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440552396825952257/Tiance_Flandre.png"
        } else if(cxd === 11){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440552406636560394/Tiance_X_Tale_Chara.png"
        } else if(cxd === 12){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440566919213481984/Tiance_Reisen.png"
        } else if(cxd === 13){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/440566919943290892/Tiance_Tuhla.png"
        } else if(cxd === 14){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/444425387687280641/Sakuya_Tiance.png"
        } else if(cxd === 15){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/444425394171412481/Tiance_Aya.png"
        } else if(cxd === 16){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/444425397048836096/Tiance_Creep.png"
        } else if(cxd === 17){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/444557316088397834/Tiance_Komachi.png"
        } else if(cxd === 18){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/444557319221542931/Tiance_Yukari.png"
        } else if(cxd === 19){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/444557320924692480/Youmu_Tiance.png"
        } else if(cxd === 20){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/444557325844611083/Yuyuko_Tiance.png"
        } else if(cxd === 21){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445690085577457664/Sanae_Tiance.png"
        } else if(cxd === 22){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445690087317962752/Chen_Tiance.png"
        } else if(cxd === 23){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445690089352331274/Meiling_Tiance.png"
        } else if(cxd === 24){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445690093173473300/Rumia_Tiance.png"
        } else if(cxd === 25){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865427332235264/Byakuren_Tiance.png"
        } else if(cxd === 26){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865429227929610/kanako_Tiance.png"
        } else if(cxd === 27){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865432910397450/Kasen_Tiance.png"
        } else if(cxd === 28){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865434617479181/Koishi_Tiance.png"
        } else if(cxd === 29){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865437557948416/mamizou_tiance.png"
        } else if(cxd === 30){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865439948701697/Miko_Tiance.png"
        } else if(cxd === 31){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865443710730240/Mokou_Tiance.png"
        } else if(cxd === 32){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865445463949313/Nitori_Tiance.png"
        } else if(cxd === 33){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865448974581761/nue_tiance.png"
        } else if(cxd === 34){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865451990548487/Patchouli_Tiance.png"
        } else if(cxd === 35){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865525759705088/Sumireko_Tiance.png"
        } else if(cxd === 36){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865529387909121/Tenshi_tiance.png"
        } else if(cxd === 37){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865533435281418/Tiance_Seija.png"
        } else if(cxd === 38){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865536874610688/Utsuho_Tiance.png"
        } else if(cxd === 39){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865951527698444/Satori_Tiance.png"
        } else if(cxd === 40){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445865955046850560/Seikibanki_Tiance.png"
        } else if(cxd === 41){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445969399174791170/Tiance_Kanami.png"
        } else if(cxd === 42){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/445969406770544640/Tiance_PinkDiamond.png"
        } else if(cxd === 43){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/446279169807089684/Autre_cosplay_de_yukari.png"
        } else if(cxd === 44){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/446279169807089685/Daiyousei_Tiance.png"
        } else if(cxd === 45){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/446279170310275072/Suika_Tiance.png"
        } else if(cxd === 46){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/448737768445575178/Tiance_Lucy.png"
        } else if(cxd === 47){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/448737768445575179/Tiance_Toriel.png"
        } else if(cxd === 48){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526308116889610/Famina_Alice.png"
        } else if(cxd === 49){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526309388025856/Famina_Dayousei.png"
        } else if(cxd === 50){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526312634417155/Famina_hatate.png"
        } else if(cxd === 51){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526314349625344/Famina_Kagerou.png"
        } else if(cxd === 52){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526317264928768/Famina_mamizou.png"
        } else if(cxd === 53){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526319726985217/Famina_Marisa.png"
        } else if(cxd === 54){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526321383473154/Famina_Medicine.png"
        } else if(cxd === 55){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526324944437248/Famina_Nightbug.png"
        } else if(cxd === 56){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526327037657088/Famina_Ran.png"
        } else if(cxd === 57){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526328765448202/Famina_Reimu.png"
        } else if(cxd === 58){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526379273256960/Famina_Yamame.png"
        } else if(cxd === 59){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526383178416139/Famina_Yuugi.png"
        } else if(cxd === 60){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526400433782784/Tiance_Mystia.png"
        } else if(cxd === 61){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526829414481940/Famina_Remilia.png"
        } else if(cxd === 62){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526833164058625/Famina_Wakasagihime.png"
        } else if(cxd === 63){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526954291625994/Tiance_Flandre_et_Famina_Remilia.png"
        } else if(cxd === 64){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/449526955855839232/Tiance_Cirno_et_Famina_Dayousei.png"
        } else if(cxd === 65){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/452883121835081749/Tiance_Alice_Mario_music_box.png"
        } else if(cxd === 66){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/452977596800696360/Tiance_Luigi_et_Blue_Mario.png"
        } else if(cxd === 67){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/452977596800696361/Tiance_serina_et_Famina_anna.png"
        } else if(cxd === 68){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/452977597303881729/Kira_Riba.png"
        } else if(cxd === 69){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/453143415182327818/Blue_Mercy.png"
        } else if(cxd === 70){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/453143418361610241/Famina_Peach.png"
        } else if(cxd === 71){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/453143423998754827/Famina_Tewi.png"
        } else if(cxd === 72){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/453143435101339648/Tiance_rin.png"
        } else if(cxd === 73){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/456087103671894017/Tiance_Rem_et_Famina_Ram.png"
        } else if(cxd === 74){
            iasq = "https://cdn.discordapp.com/attachments/440243591256997899/456087103671894018/Tiance_Kat_et_Famina_Raven.png"
        } else if(cxd === 75){
            iasq = "https://cdn.discordapp.com/attachments/292024719664742401/456912048169811980/Tiance_grenouille.png"
        } else if(cxd === 76){
            iasq = "https://cdn.discordapp.com/attachments/311817907963428864/457564836147232770/Tiance_ecoliere.png"
        }
        
    var bghi = new discord.RichEmbed({
            image: {
                url: iasq
            }
        });
        message.channel.send(bghi);
    }
        
    if(Cmd === PREFIX + "music box"){
            
            var ishq = "";
            var opiw = rndInt(1, 22)
    
            if(opiw === 1){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322542393786388/mario_and_marchionne_by_mariogirl619-dbpxw6e.jpg"
            } else if(opiw === 2){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322542393786389/telechargement.jpeg"
            } else if(opiw === 3){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322542955692052/DUwLPZkVMAEz-2W.jpg"
            } else if(opiw === 4){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322542955692053/telechargement_1.jpeg"
            } else if(opiw === 5){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322542955692054/tom_riba_lawrence_l__by_fnafstorywriterreal-d9zszr4.jpg"
            } else if(opiw === 6){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322543396356107/images_2.jpeg"
            } else if(opiw === 7){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322598194675722/Ma2.png"
            } else if(opiw === 8){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322598194675724/omitted_memory_by_marios_friend9-dat195o.jpg"
            } else if(opiw === 9){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322598710837258/images_1.jpeg"
            } else if(opiw === 10){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322598710837259/81.jpg"
            } else if(opiw === 11){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322599176273920/mtmb_anniversary_by_marios_friend9-dbs1fk8.jpg"
            } else if(opiw === 12){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322695494139904/Mariooooooooooo_creepy.png"
            } else if(opiw === 13){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322695494139906/mtmb_release_by_marios_friend9-d9euz42.jpg"
            } else if(opiw === 14){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322696077410323/A_01.png"
            } else if(opiw === 15){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322696077410324/Capture_decran_439.png"
            } else if(opiw === 16){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322696572207109/mario_the_music_box_possession_by_marios_friend9-d7xrop7.png"
            } else if(opiw === 17){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322696572207111/20180528_183110.jpg"
            } else if(opiw === 18){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322777841041411/19213.jpg"
            } else if(opiw === 19){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322777841041415/serina_by_fukrau-dbb3gky.png"
            } else if(opiw === 20){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322778562330624/192.png"
            } else if(opiw === 21){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322820417421312/20180530_114319.jpg"
            } else if(opiw === 22){
                ihsq = "https://cdn.discordapp.com/attachments/451317950083891200/451322820417421313/20180530_114253.jpg"
            }

        var nope = new discord.RichEmbed({
            image: {
                url: ihsq
            }
        });
        message.channel.send(nope);
    }

    if ((Cmd === PREFIX + "shop") && !message.author.bot.user){
    var AEmbed = new discord.RichEmbed({
        title: "Shop",
        author: {
            icon_url: "https://pa1.narvii.com/6364/56a2a43cf48dd65c47fa6c6deabe7bbb0f25c400_hq.gif"
        },
        fields: [{
           name: "Knife :",
           value: " 112G"
        },{
            name: "Tem flake:",
            value: " 19G"
        },{
            name: "Heart locket:",
            value: " 100G"
        },{
            name: "Keyblade :",
            value: " 114G"
        },{
            name: "Suwako Hat:",
            value: " 167G"
        },{
            name: "Blaster:",
            value: " 110G"
        },{
            name: "Gland:",
            value: " 25G"
        },{
            name: "Master Sword:",
            value: " 200G"
        },{
            name: "Nitori Bag:",
            value: " 169G"
        },{
            name: "Buster Sword:",
            value: " 120G"
        },{
            name: "Fursuit:",
            value: " 46G"
        },{
            name: "Buy somehing with the command",
            value: " |shop buy [Item]"
        }],
        color: 1310465
    });
    
    message.channel.send(AEmbed);
    
    }
    
    if (message.content.startsWith(PREFIX + "give") && message.author.id === "285758885787074561" | message.author.id === "269145505408221194"){
        var bnas = message.content.substring(6);
        var masse = parseInt(bnas);
        var cibles = message.mentions.users.first();

        userData[cibles.id].Gold += masse;

        message.channel.sendMessage("La cible a gagner **" + masse + "G**")
    }

    if (message.content.startsWith(PREFIX + "loose") && message.author.id === "285758885787074561" | message.author.id === "269145505408221194"){
        var bnass = message.content.substring(6);
        var masses = parseInt(bnass);
        var cibless = message.mentions.users.first();

        userData[cibless.id].Gold -= masses;

        message.channel.sendMessage("La cible a perdu **" + masses + "G**")
    }

    var args = message.content.split(" ");
    
    switch (args[0].toLowerCase()) {
        case "|play":
            if (!args[1]) {
                message.channel.sendMessage("veuillez ajouter le lien.");
                return;
            }
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("veuillez rester dans un channel vocal.");
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
    
            var server = servers[message.guild.id];
    
            server.queue.push(args[1])
    
            if (!message.guild.voiceConnection) {
                message.member.voiceChannel.join().then(function(connection) {
                    play(connection, message)
                })
            } 
            message.channel.send("Ajouté a la queue")
            break;
        case "|skip" :
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
            break;
        case "|stop" :
            var server = servers[message.guild.id];
            if(message.guild.voiceConnection) {
                message.guild.voiceConnection.disconnect();
            }
            break;
    }

    //DataSaving
    fs.writeFile('Storage/userData.json', JSON.stringify(userData, null, " "), err => {
        if (err) console.error(err);
    });

});

bot.on("guildMemberAdd", (member) => {
    if(member.guild.id != "293767380796964864") return;

    let chan = bot.guilds.find("id", "293767380796964864").channels.find("id", "360377432294948864");

    switch(member.id) {
        case "212485543827734539":
        chan.sendMessage("The great god Caelliox has join the server come @everyone ! Pray for him and his magnificence");
        break;

        case "410128539073904651":
        chan.sendMessage("Je crois que kkchose de sombre c'est introduit ici...");
        break;

        default:
        chan.sendMessage(member.user.username + " vien d'intégrer CreepGaming !");
    }

});

bot.login(TOKEN)
