// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventContract {

    struct Event {
        uint eventId;
        string title;
        address eventOwner;
        string description;
        uint price;
        uint date;
        uint maxCapacity;
        string location;
        string websiteLink;
        address[] confirmedRSVPs;
        uint collateralAmount;
    }

    Event[] public events;
    uint public nextEventId = 1;

    event EventCreated(
        uint indexed eventId,
        string title,
        address indexed eventOwner,
        string description,
        uint price,
        uint date,
        uint maxCapacity,
        string location,
        string websiteLink,
        uint collateralAmount
    );

    function createEvent(
        string memory _title,
        string memory _description,
        uint _price,
        uint _date,
        uint _maxCapacity,
        string memory _location,
        string memory _websiteLink,
        uint _collateralAmount
    ) public {
        uint newEventId = nextEventId++;
        Event memory newEvent = Event(
            newEventId,
            _title,
            msg.sender,
            _description,
            _price,
            _date,
            _maxCapacity,
            _location,
            _websiteLink,
            new address[](0), // Initialize an empty array for confirmedRSVPs
            _collateralAmount
        );

        events.push(newEvent);
        emit EventCreated(
            newEventId,
            _title,
            msg.sender,
            _description,
            _price,
            _date,
            _maxCapacity,
            _location,
            _websiteLink,
            _collateralAmount
        );
    }

    function getEvent(uint _eventId) public view returns (Event memory) {
        require(_eventId > 0 && _eventId <= events.length, "Event does not exist");
        return events[_eventId - 1];
    }

    function getConfirmedRSVPs(uint _eventId) public view returns (address[] memory) {
        require(_eventId > 0 && _eventId <= events.length, "Event does not exist");
        return events[_eventId - 1].confirmedRSVPs;
    }
}
