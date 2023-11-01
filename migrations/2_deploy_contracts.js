const Will = artifacts.require('Will');

module.exports = async function(deployer,network,accounts){
    await deployer.deploy(Will,{value : '30000000000000000000'});
    const will = await Will.deployed();

}