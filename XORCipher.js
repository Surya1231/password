var XORCipher = {
  encode: function (t, e) {
    return (e = this.xor_encrypt(t, e)), this.b64_encode(e);
  },
  decode: function (t, e) {
    return (e = this.b64_decode(e)), this.xor_decrypt(t, e);
  },
  b64_table: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  b64_encode: function (t) {
    var e = 0,
      r = "";
    if (!t) return t;
    do {
      var h = t[e++],
        n = t[e++],
        i = t[e++],
        a = (h << 16) | (n << 8) | i;
      (h = (a >> 18) & 63),
        (n = (a >> 12) & 63),
        (i = (a >> 6) & 63),
        (a &= 63),
        (r +=
          this.b64_table.charAt(h) +
          this.b64_table.charAt(n) +
          this.b64_table.charAt(i) +
          this.b64_table.charAt(a));
    } while (e < t.length);
    return ((t = t.length % 3) ? r.slice(0, t - 3) : r) + "===".slice(t || 3);
  },
  b64_decode: function (t) {
    var e = 0,
      r = [];
    if (!t) return t;
    t += "";
    do {
      var h = this.b64_table.indexOf(t.charAt(e++)),
        n = this.b64_table.indexOf(t.charAt(e++)),
        i = this.b64_table.indexOf(t.charAt(e++)),
        a = this.b64_table.indexOf(t.charAt(e++)),
        c = (h << 18) | (n << 12) | (i << 6) | a;
      (h = (c >> 16) & 255),
        (n = (c >> 8) & 255),
        (c &= 255),
        r.push(h),
        64 !== i && (r.push(n), 64 !== a && r.push(c));
    } while (e < t.length);
    return r;
  },
  keyCharAt: function (t, e) {
    t = String(t);
    return t.charCodeAt(Math.floor(e % t.length));
  },
  xor_encrypt: function (t, e) {
    for (var r = [], h = 0; h < e.length; h++) r.push(e[h].charCodeAt(0) ^ this.keyCharAt(t, h));
    return r;
  },
  xor_decrypt: function (t, e) {
    for (var r = [], h = 0; h < e.length; h++)
      r.push(String.fromCharCode(e[h] ^ this.keyCharAt(t, h)));
    return r.join("");
  },
};
