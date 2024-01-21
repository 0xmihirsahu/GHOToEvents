// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventTwo {
    // Event emitted when a new event is created
    event EventCreated(
        string indexed title,
        string description,
        uint price,
        uint date,
        uint maxCapacity,
        string location,
        string websiteLink,
        uint collateralAmount
    );

    // Event emitted when a participant joins an event
    event ParticipantJoined(string indexed title, address participant);

    // Struct to represent an event
    struct Event {
        string title;
        string description;
        uint price;
        uint date;
        uint maxCapacity;
        string location;
        string websiteLink;
        uint collateralAmount;
        address[] participants; // List of participants for this event
    }

    // Array to store all events
    Event[] public events;

    // Constructor to initialize the contract
    constructor() {
        // No need to initialize anything in the constructor for this case
    }

    // Function to create a new event
    function createEvent(
        string memory _title,
        string memory _description,
        uint _price,
        uint _date,
        uint _maxCapacity,
        string memory _location,
        string memory _websiteLink,
        uint _collateralAmount
    ) external {
        // Create a new event
        Event memory newEvent = Event({
            title: _title,
            description: _description,
            price: _price,
            date: _date,
            maxCapacity: _maxCapacity,
            location: _location,
            websiteLink: _websiteLink,
            collateralAmount: _collateralAmount,
            participants: new address[](0) // Initialize with an empty array of participants
        });

        // Add the new event to the array
        events.push(newEvent);

        // Emit the EventCreated event
        emit EventCreated(
            _title,
            _description,
            _price,
            _date,
            _maxCapacity,
            _location,
            _websiteLink,
            _collateralAmount
        );
    }

    // Function to get the list of all events
    function getAllEvents() external view returns (Event[] memory) {
        return events;
    }

    // Function to get the number of participants for a specific event
    function getParticipantsCount(uint eventId) external view returns (uint) {
        require(eventId < events.length, "Invalid event ID");
        return events[eventId].participants.length;
    }

    // Function to get the addresses of participants for a specific event
    function getParticipants(uint eventId) external view returns (address[] memory) {
        require(eventId < events.length, "Invalid event ID");
        return events[eventId].participants;
    }

    // Function to allow a participant to join an event by paying a specified amount
    function participateInEvent(uint eventId) external payable {
        require(eventId < events.length, "Invalid event ID");
         require(msg.value == 2 ether, "Please send exactly 2 ether");

        Event storage selectedEvent = events[eventId];
        require(selectedEvent.participants.length < selectedEvent.maxCapacity, "Event is already full");

        // Add participant to the event
        selectedEvent.participants.push(msg.sender);

        // Emit the ParticipantJoined event
        emit ParticipantJoined(selectedEvent.title, msg.sender);
    }
}
