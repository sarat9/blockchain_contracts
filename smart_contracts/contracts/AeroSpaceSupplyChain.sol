// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AerospaceSupplyChain {
    address public owner;

    enum Status { Ordered, Created, Tested, Approved, Installed, ReadyForDelivery, Delivered }

    struct Component {
        string partName;
        address manufacturer;
        address lab;
        Status status;
        string testReportHash;
        uint createdAt;
    }

    struct History {
        Status status;
        address updatedBy;
        uint timestamp;
    }

    uint public nextId;
    mapping(uint => Component) public components;
    mapping(uint => History[]) public componentHistory;
    mapping(address => string) public roles;

    // --- Events ---
    event StatusUpdated(uint indexed id, Status status, address by, uint timestamp);
    event ComponentOrdered(uint indexed id, address owner, address manufacturer, string name);
    event ComponentCreated(uint indexed id, address creator);
    event LabAssigned(uint indexed id, address lab);
    event TestReportAdded(uint indexed id, string ipfsHash);
    event ComponentApproved(uint indexed id, address approvedBy);
    event ComponentInstalled(uint indexed id, address installedBy);
    event ComponentReady(uint indexed id, address by);
    event ComponentDelivered(uint indexed id, address deliveredBy);
    event PaymentMade(address indexed to, uint amount, uint timestamp);

    // --- Modifiers ---
    modifier onlyRole(string memory expectedRole) {
        require(
            keccak256(bytes(roles[msg.sender])) == keccak256(bytes(expectedRole)),
            "Unauthorized role"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = "owner";
    }

    // --- Role Management ---
    function assignRole(address user, string memory role) public {
        require(msg.sender == owner, "Only owner can assign roles");
        roles[user] = role;
    }

    // --- Main Lifecycle ---
    function orderedComponent(string memory name, address manufacturer) public onlyRole("owner") {
        components[nextId] = Component({
            partName: name,
            manufacturer: manufacturer,
            lab: address(0),
            status: Status.Ordered,
            testReportHash: "",
            createdAt: block.timestamp
        });

        componentHistory[nextId].push(History(Status.Ordered, msg.sender, block.timestamp));
        emit ComponentOrdered(nextId, msg.sender, manufacturer, name);
        emit StatusUpdated(nextId, Status.Ordered, msg.sender, block.timestamp);
        nextId++;
    }

    function assignLab(uint id, address lab) public onlyRole("manufacturer") {
        Component storage c = components[id];
        require(c.manufacturer == msg.sender, "Not your component");
        require(c.lab == address(0), "Lab already assigned");
        c.lab = lab;
        emit LabAssigned(id, lab);
    }

    function createComponent(uint id) public onlyRole("manufacturer") {
        Component storage c = components[id];
        require(c.manufacturer == msg.sender, "Not your component");
        require(c.status == Status.Ordered, "Not in Ordered state");

        c.status = Status.Created;

        componentHistory[id].push(History(Status.Created, msg.sender, block.timestamp));
        emit ComponentCreated(id, msg.sender);
        emit StatusUpdated(id, Status.Created, msg.sender, block.timestamp);
    }

    function addTestReport(uint id, string memory ipfsHash) public onlyRole("lab") {
        Component storage c = components[id];
        require(c.lab != address(0), "Lab not assigned");
        require(c.lab == msg.sender, "Not assigned to this component");
        require(c.status == Status.Created, "Component must be in Created state");

        c.testReportHash = ipfsHash;
        c.status = Status.Tested;

        componentHistory[id].push(History(Status.Tested, msg.sender, block.timestamp));
        emit TestReportAdded(id, ipfsHash);
        emit StatusUpdated(id, Status.Tested, msg.sender, block.timestamp);
    }

    function approveComponent(uint id) public onlyRole("manufacturer") {
        Component storage c = components[id];
        require(c.manufacturer == msg.sender, "Only creator can approve");
        require(c.status == Status.Tested, "Must be tested first");

        c.status = Status.Approved;

        componentHistory[id].push(History(Status.Approved, msg.sender, block.timestamp));
        emit ComponentApproved(id, msg.sender);
        emit StatusUpdated(id, Status.Approved, msg.sender, block.timestamp);
    }

    function installComponent(uint id) public onlyRole("installer") {
        require(id < nextId, "Component does not exist");

        Component storage c = components[id];
        require(c.status == Status.Approved, "Component must be approved first");

        c.status = Status.Installed;

        componentHistory[id].push(History(Status.Installed, msg.sender, block.timestamp));
        emit ComponentInstalled(id, msg.sender);
        emit StatusUpdated(id, Status.Installed, msg.sender, block.timestamp);

        // 💸 Pay installer
        payUser(payable(msg.sender), 0.01 ether);
    }

    function markReady(uint id) public onlyRole("manufacturer") {
        Component storage c = components[id];
        require(c.manufacturer == msg.sender, "Not your component");
        require(c.status == Status.Installed, "Component must be installed first to deliver it to someone");

        c.status = Status.ReadyForDelivery;

        componentHistory[id].push(History(Status.ReadyForDelivery, msg.sender, block.timestamp));
        emit ComponentReady(id, msg.sender);
        emit StatusUpdated(id, Status.ReadyForDelivery, msg.sender, block.timestamp);
    }

    function markDeliveredComponent(uint id) public onlyRole("owner") {
        Component storage c = components[id];
        require(c.status == Status.ReadyForDelivery, "Not ready for delivery");

        c.status = Status.Delivered;

        componentHistory[id].push(History(Status.Delivered, msg.sender, block.timestamp));
        emit ComponentDelivered(id, msg.sender);
        emit StatusUpdated(id, Status.Delivered, msg.sender, block.timestamp);

        // 💸 Pay manufacturer
        payUser(payable(c.manufacturer), 0.02 ether);
    }

    function getComponent(uint id) public view returns (
        string memory,
        address,
        address,
        Status,
        string memory,
        uint
    ) {
        Component memory c = components[id];
        return (
            c.partName,
            c.manufacturer,
            c.lab,
            c.status,
            c.testReportHash,
            c.createdAt
        );
    }

    function getHistory(uint id) public view returns (History[] memory) {
        return componentHistory[id];
    }

    function payUser(address payable recipient, uint amount) internal {
        require(address(this).balance >= amount, "Insufficient contract balance");
        recipient.transfer(amount);
        emit PaymentMade(recipient, amount, block.timestamp);
    }

    receive() external payable {} // to allow contract to receive funds
}
