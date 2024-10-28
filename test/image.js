const image = require("../image");

//test_data = ["123s346m", "555.z"];
test_data = ["2s", "33.3s", "6.57s", "4.23s", "444.z"];

//image.render_hand(test_data);
var img = image.render(test_data);
console.log(img);
setTimeout(function(){console.log("saving"); img.write("test.png");}, 100);
