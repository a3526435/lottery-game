const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
  it("deploys a contract", async () => {
    const lottery = await Lottery.deployed();
    assert(lottery.address !== '');
  });
});

