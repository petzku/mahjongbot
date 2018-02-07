const jimp = require("jimp");

const th = 39; // tile height
const tw = 27; // tile width
const bw = 5; // border width

const base_path = "./tiles/";

function calc_width(sets) {
    var res = bw;
    for (i in sets) {
        const set = sets[i];
        for (j in set) {
            const tile = set[j];
            res += (tile.length == 3) ? th : tw;
        }
        res += bw;
    }
    return res;
}

function tiles_to_sets(tiles) {
    var sets = [];
    
    for (var i = 0; i < tiles.length; ++i) {
        set = tiles[i];

        const outer_reg = /((?:[0-9]\.?)+)([pmsz])/g;
        var part;
        var temp = [];

        while ((part = outer_reg.exec(set)) !== null) {
            const suit = part[2];
            const nums = part[1];
            const reg = /[0-9]\.?/g;
            var result;
            while ((result = reg.exec(nums)) !== null) {
                temp.push(result + suit);
            }
        }

        sets.push(temp);
    }

console.log("sets: " + sets);
    return sets;
}

/*
async function render(tiles) {
    console.log("rendering: " + tiles);
    const sets = tiles_to_sets(tiles);
    const w = calc_width(sets);
    const h = th;
    var base = await new jimp(w, h, function(err, base) {
        var x = bw;
        for (var i = 0; i < sets.length; ++i) {
            const set = sets[i];
            for (var j = 0; j < set.length; ++j) {
                const tile = set[j];
                if (tile.length == 3) { // sideways
                    const path = base_path + tile[0] + tile[2] + ".png";
                    jimp.read(path).then(function (image) {
                        image.rotate(90);
                        base.blit(image, xx, th-tw);
                    });
                    x += th;
                } else {
                    const path = base_path + tile + ".png";
                    jimp.read(path).then(function (image) {
                        base.blit(image, xx, 0);
                    });
                    x += tw;
                }
            }
            x += bw;
        }
    });
    return base;
}
*/
function render(tiles) {
    console.log("rendering: " + tiles);
    const sets = tiles_to_sets(tiles);
    const w = calc_width(sets);
    const h = th;
    var base = new jimp(w, h, function(err, base) {
        var x = bw;
        for (var i = 0; i < sets.length; ++i) {
            const set = sets[i];
            for (var j = 0; j < set.length; ++j) {
                const tile = set[j];
                if (tile.length == 3) { // sideways
                    const path = base_path + tile[0] + tile[2] + ".png";
                    (function(xx){
                        jimp.read(path).then(function (image) {
                            image.rotate(90);
                            base.blit(image, xx, th-tw);
                        });
                    })(x);
                    x += th;
                } else {
                    const path = base_path + tile + ".png";
                    (function(xx){
                        jimp.read(path).then(function (image) {
                            base.blit(image, xx, 0);
                        });
                    })(x);
                    x += tw;
                }
            }
            x += bw;
        }
    });
    return base;
}

module.exports.render = render;
