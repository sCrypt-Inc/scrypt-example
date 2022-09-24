
const path = require('path');
const {
    bsv,
    compileContract: compileContractImpl,
    getPreimage,
    toHex
} = require('scryptlib');
const crypto = require('crypto');

const inputIndex = 0
const inputSatoshis = 100000

function newTx() {
    const utxo = {
        txId: crypto.randomBytes(32).toString('hex'),
        outputIndex: 0,
        script: '',   // placeholder
        satoshis: inputSatoshis
    };
    return new bsv.Transaction().from(utxo);
}



function compileContract(fileName, options) {
    const filePath = path.join(__dirname, 'contracts', fileName)
    const out = path.join(__dirname, 'out')

    const result = compileContractImpl(filePath, options ? options : {
        out: out
    });
    if (result.errors.length > 0) {
        console.log(`Compile contract ${filePath} failed: `, result.errors)
        throw result.errors;
    }

    return result;
}


module.exports = {
    compileContract,
    newTx,
    inputSatoshis,
    inputIndex
}
