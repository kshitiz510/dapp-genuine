//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LuxuryProductRegistry {
    // Struct to store product details
    struct Product {
        uint256 id;
        string name;
        string manufacturer;
        address currentOwner;
        address[] previousOwners;
        bool isAuthentic;
        uint256 transferPrice;  // Price for transferring ownership
        address manufacturerAddress;  // Address of the manufacturer
    }

    // Mapping of product ID to Product details
    mapping(uint256 => Product) public products;

    // Mapping to track registered manufacturers and their names
    mapping(address => string) public manufacturerNames;

    // Mapping to track if an address is a manufacturer
    mapping(address => bool) public manufacturers;

    // Track product count
    uint256 public productCounter;

    // Events
    event ProductRegistered(uint256 productId, string name, address indexed manufacturer);
    event OwnershipTransferRequested(uint256 productId, address indexed currentOwner, address indexed newOwner, uint256 price);
    event OwnershipTransferred(uint256 productId, address indexed oldOwner, address indexed newOwner, uint256 price, address indexed manufacturer);
    event AuthenticityVerified(uint256 productId, address indexed verifier);

    // Mapping to track pending transfers (productId => (newOwner => price))
    mapping(uint256 => mapping(address => uint256)) public pendingTransfers;

    // Only registered manufacturers can call certain functions
    modifier onlyManufacturer() {
        require(manufacturers[msg.sender], "Only manufacturers can call this function.");
        _;
    }

    // Only the current owner of a product can transfer it
    modifier onlyOwner(uint256 productId) {
        require(products[productId].currentOwner == msg.sender, "You are not the current owner.");
        _;
    }

    constructor() public {}

    // Function to register a new manufacturer
    function registerManufacturer(address manufacturer, string memory name) public {
        require(!manufacturers[manufacturer], "Manufacturer already registered.");
        manufacturers[manufacturer] = true;
        manufacturerNames[manufacturer] = name;
    }

    // Function for a manufacturer to register a new luxury product
    function registerProduct(string memory name) public onlyManufacturer returns (uint256) {
        productCounter++; 
        uint256 productId = productCounter; 

        // Automatically fetch the manufacturer's name and address
        string memory manufacturerName = manufacturerNames[msg.sender];
        
        Product storage newProduct = products[productId];
        newProduct.id = productId;
        newProduct.name = name;
        newProduct.manufacturer = manufacturerName; // Automatically set the manufacturer's name
        newProduct.manufacturerAddress = msg.sender; // Store the manufacturer's address
        newProduct.currentOwner = msg.sender;
        newProduct.isAuthentic = true; // Mark the product as authentic by default
        newProduct.transferPrice = 0; // Initially, there is no transfer price set

        emit ProductRegistered(productId, name, msg.sender);
        
        return productId;  // Return the generated productId
    }

    // Function to verify authenticity of a product
    function verifyAuthenticity(uint256 productId) public view returns (bool) {
        Product storage product = products[productId];
        return product.isAuthentic;
    }

    // Function to request ownership transfer
    function requestOwnershipTransfer(uint256 productId, address newOwner, uint256 price) public onlyOwner(productId) {
        Product storage product = products[productId];

        // Set the transfer price
        product.transferPrice = price;

        // Store the transfer request in the pendingTransfers mapping
        pendingTransfers[productId][newOwner] = price;

        emit OwnershipTransferRequested(productId, product.currentOwner, newOwner, price);
    }

    // Function for the new owner to accept the transfer and pay for it
    function acceptOwnershipTransfer(uint256 productId) public payable {
        Product storage product = products[productId];
        uint256 transferPrice = pendingTransfers[productId][msg.sender];

        require(transferPrice > 0, "No transfer request found for this product.");
        require(msg.value >= transferPrice, "Insufficient payment for transfer.");

        // Calculate 1% of the transfer price to send to the manufacturer
        uint256 manufacturerCut = transferPrice / 100;

        // Transfer 1% to the manufacturer
        payable(product.manufacturerAddress).transfer(manufacturerCut);

        // Transfer the remaining amount to the old owner
        uint256 amountToOldOwner = transferPrice - manufacturerCut;
        address oldOwner = product.currentOwner;
        payable(oldOwner).transfer(amountToOldOwner);

        // Transfer ownership to the new owner
        product.currentOwner = msg.sender;

        // Store current owner in previous owners
        product.previousOwners.push(oldOwner);

        // Reset the pending transfer
        delete pendingTransfers[productId][msg.sender];

        emit OwnershipTransferred(productId, oldOwner, msg.sender, transferPrice, product.manufacturerAddress);
    }

    // View function to get the ownership history of a product
    function getOwnershipHistory(uint256 productId) public view returns (address[] memory) {
        return products[productId].previousOwners;
    }

    // Optional: Function to mark a product as no longer authentic (e.g., in case of loss or theft)
    function revokeAuthenticity(uint256 productId) public onlyManufacturer {
        Product storage product = products[productId];
        product.isAuthentic = false;
    }
}