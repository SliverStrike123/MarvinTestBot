const Discord = require('discord.js')
const fetch = require('node-fetch');
const osu_api = "OSU API KEY HERE"


module.exports = {
    name: 'mp',
    description: 'get osu mp stat',
    async execute(message, args){
        let blueOnly = false
        let redOnly = false
        if(args.length < 1){
            await message.channel.send("**No match found**") 
            return;
        }
        else if(args.length >= 2){
            if (args[1].toUpperCase() == 'RED')
                redOnly = true
            else if (args[1].toUpperCase() == 'BLUE')
                blueOnly = true
        }
        const matchID = args[0].split('matches/').slice(-1)[0]
        console.log(matchID)
        const match_data = await fetchMatch(matchID)
        const { games } = match_data
        if(games[0] == null){
            message.channel.send('**Match Not Found**')
            return;
        }
        const [ teamUser, beatmaps ] = getUsersAndBeatmaps(games)
        let users;
        if(redOnly)
            users = teamUser['2']
        if(blueOnly)
            users = teamUser['1']
        if(!blueOnly && !redOnly)
            users = teamUser['1'].concat(teamUser['2'])
        const userBeatmapInfo = getBeatmapUserInfo(games, users)
        const usernames = await fetchUsername(users)
        const mapInfo = await fetchBeatmapNameAndMaxCombo(beatmaps)

        for (let user of users){
            let team = 'BLUE'
            if (teamUser['2'].includes(user))
                team = 'RED'
            let embed = new Discord.MessageEmbed()
                .setTitle(usernames[user])
                .setColor(team)
                .setURL(`https://osu.ppy.sh/users/${user}`)
                .setThumbnail(`https://a.ppy.sh/${user}`);
            for (let beatmap of Object.keys(userBeatmapInfo[user]))
                embed.addFields({name:`${mapInfo[beatmap]['title']} :` , 
                value:`${userBeatmapInfo[user][beatmap].score} *(${userBeatmapInfo[user][beatmap].maxcombo}/${mapInfo[beatmap].maxcombo}x)*`, 
                inline: false})
            await message.channel.send(embed)
        }        
    }
}
async function fetchMatch(matchID){
    const osu_url = "https://osu.ppy.sh/api/"
    const res = await fetch(`${osu_url}get_match?k=${osu_api}&mp=${matchID}`)
    let data = await res.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}

function getUsersAndBeatmaps(games){
    let userObj = {}
    let beatmaps = []
    let t1 = []
    let t2 = []
    for (let game of games){
        for (let score of game.scores){
            if (score.score > 10000 && !(t1.includes(score.user_id)) && !(t2.includes(score.user_id))){
                if (score.team == "2")
                    t2.push(score.user_id)
                else
                    t1.push(score.user_id)
            }
        }
        beatmaps.push(game.beatmap_id)
    }
    userObj['1'] = t1
    userObj['2'] = t2

    return [userObj, beatmaps];
}


function getBeatmapUserInfo(games, users){
    let userObj = {}
    for (let user of users){  
        userObj[user] = {}
        for (let game of games){
            for (let score of game.scores){
                if (user == score.user_id){
                    if(userObj[user][game.beatmap_id] == null)
                        userObj[user][game.beatmap_id] = {}
                    userObj[user][game.beatmap_id]['score'] = score.score
                    userObj[user][game.beatmap_id]['maxcombo'] = score.maxcombo
                    break
                }
            }
        }
    }
    return userObj;
}

async function fetchUsername(users){
    let userObj = {}
    for (let user of users){
        const osu_url = "https://osu.ppy.sh/api/"
        const res = await fetch(`${osu_url}get_user?k=${osu_api}&u=${user}`)
        let data = await res.json()
        userObj[user] = data[0].username
    }
    return userObj
}

async function fetchBeatmapNameAndMaxCombo(beatmaps){
    let beatmapObj = {}
    for (let beatmap of beatmaps){
        beatmapObj[beatmap] = {}
        const osu_url = "https://osu.ppy.sh/api/"
        const res = await fetch(`${osu_url}get_beatmaps?k=${osu_api}&b=${beatmap}`)
        let data = await res.json()
        beatmapObj[beatmap]["title"] = data[0].title
        beatmapObj[beatmap]["maxcombo"] = data[0].max_combo
    }

    return beatmapObj;
}

