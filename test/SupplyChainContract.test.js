const SupplyChainContract = artifacts.require("SupplyChainContract");

contract("SupplyChainContract", accounts => {
    it("should deploy the contract", async () => {
        const instance = await SupplyChainContract.deployed();
        assert(instance.address !== '');
    });

    it("should add a product", async () => {
        const instance = await SupplyChainContract.deployed();
        await instance.addProduct("Product1", 100, { from: accounts[0] });
        const product = await instance.products(0);
        assert.equal(product.name, "Product1");
        assert.equal(product.price.toNumber(), 100);
    });

    it("should retrieve the product details", async () => {
        const instance = await SupplyChainContract.deployed();
        const product = await instance.products(0);
        assert.equal(product.name, "Product1");
        assert.equal(product.price.toNumber(), 100);
    });
});