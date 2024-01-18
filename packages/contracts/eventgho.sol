// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


//basic ptototype solidty code 

contract eventgho {
    address public owner;
    
    enum UserType { None, EventHolder, EventParticipant }
    
    struct Event {
        string title;
        string location;
        uint256 time;
        uint256 price;
        uint256 maxCapacity;
        address[] speakers;
        string websiteLink;
        bool isCancelled;
    }
    
    struct User {
        UserType userType;
        uint256 depositedFee;
        mapping(uint256 => bool) eventRSVP;
    }

    mapping(address => User) public users;
    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyEventHolder() {
        require(users[msg.sender].userType == UserType.EventHolder, "Only Event Holders can call this function");
        _;
    }

    modifier onlyEventParticipant() {
        require(users[msg.sender].userType == UserType.EventParticipant, "Only Event Participants can call this function");
        _;
    }

    modifier eventNotCancelled(uint256 eventId) {
        require(!events[eventId].isCancelled, "Event is cancelled");
        _;
    }

    modifier eventNotFull(uint256 eventId) {
        require(events[eventId].maxCapacity > 0, "Event is at its max capacity");
        _;
    }

    modifier eventNotStarted(uint256 eventId) {
        require(events[eventId].time > block.timestamp, "Event has already started");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createUser() external {
        require(users[msg.sender].userType == UserType.None, "User already exists");
        users[msg.sender].userType = UserType.EventParticipant;
    }

    function createEvent(
        string memory title,
        string memory location,
        uint256 time,
        uint256 price,
        uint256 maxCapacity,
        address[] memory speakers,
        string memory websiteLink
    ) external onlyEventHolder {
        events[eventCount] = Event({
            title: title,
            location: location,
            time: time,
            price: price,
            maxCapacity: maxCapacity,
            speakers: speakers,
            websiteLink: websiteLink,
            isCancelled: false
        });

        eventCount++;
    }

    function rsvpToEvent(uint256 eventId) external onlyEventParticipant eventNotCancelled(eventId) eventNotFull(eventId) eventNotStarted(eventId) {
        require(users[msg.sender].depositedFee >= events[eventId].price, "Insufficient funds");
        require(!users[msg.sender].eventRSVP[eventId], "Already RSVP'd to this event");

        users[msg.sender].depositedFee -= events[eventId].price;
        users[msg.sender].eventRSVP[eventId] = true;
        events[eventId].maxCapacity--;
    }

    function checkInToEvent(uint256 eventId) external onlyEventParticipant eventNotCancelled(eventId) eventNotStarted(eventId) {
        require(users[msg.sender].eventRSVP[eventId], "Not RSVP'd to this event");
        require(users[msg.sender].depositedFee >= events[eventId].price, "Insufficient funds");

        users[msg.sender].depositedFee -= events[eventId].price;
        // Additional logic for check-in process
    }

    function depositFunds() external payable onlyEventParticipant {
        users[msg.sender].depositedFee += msg.value;
    }

    function makeLoanAndPayWithGHO() external onlyEventHolder {
        // code to be written for gho 
    }


}
