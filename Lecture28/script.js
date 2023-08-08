const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
var bitcoin = require("bitcoinjs-lib");
var secp = require('tiny-secp256k1');
var ecfacory = require('ecpair');
console.log('start')
var ECPair = ecfacory.ECPairFactory(secp);
const keyBuffer = Buffer.from("3d6a51a383e6c4c8b40a45302a7e83ebd8fc69e2a630c48449f808e47aa0139c", 'hex')
var keys = ECPair.fromPrivateKey(keyBuffer)

var newtx = {
  inputs: [{addresses: ['mvaptPBPAZUa6uEftwft7QYUuubaCJZ19g']}],
  outputs: [{addresses: ['mzJgkoXEYwZ5tYt52G5ieCUfdPLffZKmgC'], value: 100}]
};
console.log('test', JSON.stringify(newtx))
// calling the new endpoint, same as above
try {
  $.post('https://api.blockcypher.com/v1/btc/test3/txs/new', JSON.stringify(newtx))
    .then(function(tmptx) {
      console.log('test', tmptx)
      // signing each of the hex-encoded string required to finalize the transaction
      tmptx.pubkeys = [];
      tmptx.signatures = tmptx.tosign.map(function (tosign, n) {
        tmptx.pubkeys.push(keys.publicKey.toString('hex'));
        return bitcoin.script.signature.encode(
          keys.sign(Buffer.from(tosign, "hex")),
          0x01,
        ).toString("hex").slice(0, -2);
      });
      // sending back the transaction with all the signatures to broadcast
      $.post('https://api.blockcypher.com/v1/btc/test3/txs/send', JSON.stringify(tmptx))
        .done(function (finaltx) {
          console.log(finaltx);
        })
        .fail(function (xhr) {
          console.log(xhr.responseText);
        });
    });
} catch (e) {
  console.log(e);
}
