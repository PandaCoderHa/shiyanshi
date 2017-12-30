var Crypto = require('../pages/cryptojs/cryptojs.js').Crypto;
var utilMd5 = require('../pages/cryptojs/lib/MD5.js');  
var utilSha1 = require('../pages/cryptojs/lib/sha11.js');
var utilaes1 = require('../pages/cryptojs/lib/aes1.js');
import aes1 from '../pages/cryptojs/lib/aes1.js';
var api_key = 'PpNUAonI';
var api_secret_key = 'ouq4Jvgz24W2EDFsBiCKIwkyue8zeTIZSoTe2NaTSre8Ec13N819GTFyLx9CpiVURVL';

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  Encrypt: Encrypt,
  Decrypt: Decrypt
}
//生成MD5随机字符串
function mD15(word){
  var hash = utilMd5(word);
  // console.log(hash);
  return hash;
}
//生成25位随机字符串
function randomString(len) {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　　return pwd;
}
//获取偶数位的字符串
function str_ou(word){
  var list='';
  for (var i=0;i<word.length;i++){
    if(i%2==0){
      list+=word[i];
    }
  }
  return list;
}
//排序
function sortS(nonce,encrypt_msg,api_key){
  var array=[nonce,encrypt_msg,api_key];
  array.sort();
  var list='';
  for(var i =0;i<array.length;i++){
    list+=array[i];
  }
  return list;
}


function Encrypt(word) {
  word = word.toString();//将Word转成字符串
  
  console.log('------word---------')
  console.log(word);
  var nonce = randomString(25);
  var key = mD15(api_key + nonce);
  // var key = mD15('AAAxxxYOvmnLpUw1p3faRoQUg0qW689');
  var key1 = key.split('').reverse().join('');//md5倒序
  var key2 = str_ou(key1);//偶数字符串,最终的key值

  var iv = nonce + api_secret_key;
  var iv1=mD15(iv);
  // var iv1 = mD15('YOvmnLpUw1p3faRoQUg0qW689JSZqvCElb16pqZc1l4tmdOrOiK27ppH6tO1oABhpWxbJoIH4PDMRKXjc8Omwea5UtQo');
  var iv2 = iv1.split('').reverse().join('');//md5倒序
  var iv3 = str_ou(iv2);//偶数字符串,最终的iv值
  console.log('--------key2--------');
  console.log(key2);
  console.log(iv3)
  var mode = new Crypto.mode.CBC(Crypto.pad.ZeroPadding);//填充在BlockModes中查看
  var eb = Crypto.charenc.UTF8.stringToBytes(word);
  var kb = Crypto.charenc.UTF8.stringToBytes(key2);//KEY
  var vb = Crypto.charenc.UTF8.stringToBytes(iv3);//IV
  var ub = Crypto.AES.encrypt(eb, kb, { iv: vb, mode: mode, asBpytes: true });//结果为hex编码，如果要base64编码，到AES文件中改

  var sortA=sortS(nonce,ub,api_key);//排序
  // var sortA = sortS('YOvmnLpUw1p3faRoQUg0qW689', ub, 'AAAxxx');
  var msg_signature = utilSha1.sha1(sortA).toUpperCase();//sha加密，小写转大写
  
  var listS = { 'nonce': nonce, 'api-key': api_key, 'msg_signature': msg_signature,'encrypt_msg': ub};
  console.log(listS)
  return listS;
}
function Decrypt(nonce,word) {
  
  var key = mD15(api_key + nonce);
  // var key = mD15('AAAxxxYOvmnLpUw1p3faRoQUg0qW689');
  var key1 = key.split('').reverse().join('');//md5倒序
  var key2 = str_ou(key1);//偶数字符串,最终的key值

  var iv = nonce + api_secret_key;
  var iv1 = mD15(iv);
  var iv2 = iv1.split('').reverse().join('');//md5倒序
  var iv3 = str_ou(iv2);//偶数字符串,最终的iv值

  var bb = utilaes1.enc.Hex.parse(word);
  var bc = utilaes1.enc.Base64.stringify(bb);
  var key9 = utilaes1.enc.Utf8.parse(key2);
  var iv9 = utilaes1.enc.Utf8.parse(iv3);
  
  var decrypt = utilaes1.AES.decrypt(bc, key9, { iv: iv9, mode: utilaes1.mode.CBC, padding: utilaes1.pad.Pkcs7 });
  var sdd = utilaes1.enc.Utf8.stringify(decrypt).toString();
  console.log(sdd)
  var ss = sdd.split("}");

  console.log(ss[0]);
  ss[0]+="}";
  var ss2=JSON.parse(ss[0]);
  console.log('---------ss2------');
  console.log(ss2);
  console.log(ss2.username);
  console.log('---------ss2------');
  
  return ss2
  // return decrypt
}
