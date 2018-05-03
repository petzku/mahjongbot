/*
 * A simple bot that replies with emoji versions of mahjong hands
 */
"use strict";

const Discord = require("discord.js");
const conf = require("./conf");
const _ = require("lodash");

const image = require("./image");

const bot = new Discord.Client();

const token = conf.token;
const prefix = conf.prefix;
//const emoji_codes = conf.emoji_codes;

const hand_regex = /((?:[0-9]\.?)+[psm]|(?:[0-7]\.?)+z)+/g;
const part_regex = /([0-9]+)([psm])|([1-7]+)z/g;
//const tile_regex = /[0-9][pms]|[1-7]z/;

/*
function tiles_to_emoji(tiles) {
    let res = "";
    for (const t of tiles) {
        res += "<:" + t + ":" + emoji_codes[t] + ">";
    }
    return res;
}

function hand_to_tiles(hand) {
    let match;
    let tiles = [];

    while ((match = part_regex.exec(hand)) !== null) {
        const nums = match[1] || match[3];
        const suit = match[2] || 'z';
        for (const n of nums) {
            tiles.push(n + suit);
        }
    }
    return tiles;
}

function hand_to_emoji(hand) {
    return tiles_to_emoji(hand_to_tiles(hand));
}

function sort_tiles(tiles) {
    const sorted = _.orderBy(tiles, [1, tile => (tile[0] === '0') ? 5.5 : parseInt(tile[0])]);
    return sorted;
}
*/

/*
function process_command(content) {
    if (content.startsWith("dora")) {
        let msg = "";
        // dora tile
        const dora_tile = hand_regex.exec(content)[0];
        msg += "ドラ" + (hand_to_emoji(dora_tile)) + "        ";
        msg += process_hand(content);
        return msg;
    } else if (content.startsWith("sort")) {
        let msg = "";
        let match;
        while ((match = hand_regex.exec(content)) !== null) {
            msg += tiles_to_emoji(sort_tiles(hand_to_tiles(match[0]))) + "    ";
        }
        return msg;
    } else if (content.startsWith("hand")) {
        return process_hand(content);
    } else {
        // if no command, assume we want to process hand
        return process_hand(content);
    }
}

function process_hand(content) {
    let msg = "";
    let match;

    while ((match = hand_regex.exec(content)) !== null) {
        const hand = match[0];
        msg += hand_to_emoji(hand) + "    ";
    }

    return msg;
}
*/

function drop_to_first(haystack, needle) {
    return haystack.substring(haystack.indexOf(needle)+needle.length);
}

bot.on('message', (message) => {
    // test that it was actually a hand, and not a random use of $prefix
    let content = message.content;
    if (/^!([0-9]+)([psm])|([1-7]+)z/g.test(content)) {
        // remove the prefix
        content = content.replace(prefix, '');
        let sets = [];
        let match;
        while ((match = hand_regex.exec(content)) !== null) {
            //do stuff
            sets.push(match[0]);
        }
        const name = sets.join(" ") + ".png";
        const img = image.render(sets);
        setTimeout(function() {
            img.getBuffer("image/png", function(err, file) {
                message.channel.send(new Discord.Attachment(file, name));
            });
        }, 500);
//        const msg = process_command(content);
//        if (msg) {
//            message.channel.sendMessage(msg);
//        }
//    } else if (content.includes(prefix)) {
//        const rest = drop_to_first(content, prefix);
//
//            message.channel.sendMessage(process_hand(content));
    }
});

bot.login(token)
    .then(() => { bot.user.setGame("Mahjong, probably"); });
