var ICOContract = artifacts.require('./ICOContract.sol');


contract('ICOContract', function(accounts) {
    var ICOContractInstance;
it("initializes the contract with the correct supply",function(){
    return ICOContract.deployed().then(function(instance){
        ICOContractInstance = instance;
        return ICOContractInstance.totalSupply()
        }).then(function(count){
          assert.equal(count.toNumber(),1000000, "The total supply is million")
        });
        });

it("can transfer ether",function(){
  return ICOContract.deployed().then(function(instance){
    ICOContractInstance = instance;
  return ICOContractInstance.transfer.call(accounts[1],99988898988989)
  }).then(assert.fail).catch(function(error){
    assert(error.message.indexOf("revert">=0))
    return ICOContractInstance.transfer(accounts[1],1000, {from : accounts[0]});
  }).then(function(reciept){
    assert.equal(reciept.logs.length,1,"One event generated");
    assert.equal(reciept.logs[0].event,"Transfer","Correct event name");
    assert.equal(reciept.logs[0].args.from,accounts[0],"Correct sender address");
    assert.equal(reciept.logs[0].args.to,accounts[1],"Correct teciever address");
    return ICOContractInstance.balanceOf(accounts[1])
  }).then(function(balance){
    assert.equal(balance.toNumber(),1000,"The balance is correct");
    return ICOContractInstance.balanceOf(accounts[0])
  }).then(function(balance){
     assert.equal(balance.toNumber(),999000,"balance reduced"); 
  })
  });

  it("approves tokens for delegated transfer",function(){
    return ICOContract.deployed().then(function(instance){
      ICOContractInstance = instance;
      return ICOContractInstance.approve(accounts[1],100)
    }).then(function(reciept){
      assert.equal(reciept.logs.length,1,"One event generated");
      assert.equal(reciept.logs[0].event,"Approval","Correct event name");
      assert.equal(reciept.logs[0].args.spender,accounts[1],"Spender check");
      assert.equal(reciept.logs[0].args.amount,100,"Amount Check");
      return ICOContractInstance.allowance(accounts[0],accounts[1])
      }).then(function(allowance){
        assert.equal(allowance,100,"Allowance Check");
        return ICOContractInstance.transferFrom(accounts[0],accounts[1],20)
    }).then(function(reciept){
      assert.equal(reciept.logs.length,1,"Pne event generated")
      assert.equal(reciept.logs[0].event,"Transfer","Event Check");
      assert.equal(reciept.logs[0].args.from,accounts[0],"Sender Address check");
      return ICOContractInstance.allowance(accounts[0],accounts[1])
    }).then(function(result){
      assert.equal(result.toNumber(),80,"allowance check");
      return ICOContractInstance.transferFrom(accounts[0],accounts[1],300)
    }).then(assert.fail).catch(function(error){
      assert(error.message.indexOf("revert")>=0,"Can't transfer more than approved amount")
    });
      // assert.equal(balance.toNumber(),80,"balance check")
  });
});       
