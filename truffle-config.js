require('babel-polyfill');
require('babel-register');

module.exports = {
    networks : {
        development: {
            host : '127.0.0.1',
            port : '7545',
            network_id : '*'
        },
    },
    contract_directory : './contracts',
    contract_build_directory : './truffle_abis',
    compilers : {
        solc : {
            optimizer : {
                version : '0.5.0',
                enabled  : true,
                runs     : 200
            }
        }
    }
}