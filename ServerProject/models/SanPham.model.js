var SanPham = [];
exports.update = exports.create = function(key, title, body) {
    SanPham[key] = { title: title, body: body };
}

exports.read = function(key) {
    return SanPham[key];
}

exports.destroy = function(key) {
    delete SanPham[key];
}

exports.keys = function() {
    return Object.keys(SanPham);
}