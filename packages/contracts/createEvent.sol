pragma solidity ^0.8.0;

contract EventContract {

    struct Event {
        string title;
        string description;
        uint price;
        uint date;
        uint maxCapacity;
        string location;
        string websiteLink;
        uint collateralAmount;
    }

    Event[] public events;
        event EventCreated(
    Event indexed _event
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
        Event memory newEvent = Event(_title, _description, _price, _date, _maxCapacity, _location, _websiteLink, _collateralAmount);
        events.push(newEvent);
        emit EventCreated(newEvent);
    }

    function getEvent(uint _eventId) public view returns (
        string memory,
        string memory,
        uint,
        uint,
        uint,
        string memory,
        string memory,
        uint
    ) {
        Event memory event = events[_eventId];
        return (
            event.title,
            event.description,
            event.price,
            event.date,
            event.maxCapacity,
            event.location,
            event.websiteLink,
            event.collateralAmount
        );
    }
}