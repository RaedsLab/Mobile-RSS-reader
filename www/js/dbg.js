/// UTILITY FUNCTION
function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
    console.log(out);
    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre);
}