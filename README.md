# GHO Event RSVP DApp

## Introduction
Welcome to the GHO Event RSVP DApp, a decentralized application designed for event management and participation powered by the Aave-native stablecoin GHO. This DApp allows event holders to create, manage, and monetize events while providing participants a seamless way to browse, RSVP, and attend events using GHO tokens.

## Features

### For Event Holders
- **Create Events**: Easily set up events with details like title, time, place, price (in GHO), and maximum capacity.
- **Financial Flexibility**: Option to make a loan and pay with GHO if funds are needed for organizing the event.
- **Manage Events**: Capability to edit or cancel events (feature scope may vary).

### For Participants
- **Discover Events**: Browse and filter events based on preferences.
- **RSVP with Assurance**: Secure your spot at an event if it has not reached maximum capacity and has not started.
- **Check-in & Enjoy**: Seamlessly check-in and pay for the event with GHO.

## Backend Architecture
- **Smart Contract**: A single contract to manage all event-related data and interactions.
- **Data Storage**: On-chain storage of event details like title, location, time, price, and capacity.

## Frontend Interface
- **Event Creation Page**: A user-friendly interface for event holders to create and manage their events.
- **Landing Page**: A central hub for participants to view all events, connect their wallets, and access detailed project information.
- **Event Interaction Page**: An interactive platform for participants to select, RSVP, and check in to events.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Foundry](https://book.getfoundry.sh/)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/0xmihirsahu/GHOToEvents
   cd GHOToEvents
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```

### Configuration
Configure your `.env` file with the necessary environment variables:
```env
RPC_URL="https://<your-rpc-url>"
PRIVATE_KEY="<your-private-key>"
```

### Running the DApp
1. Compile the smart contracts:
   ```sh
   forge build
   ```
2. Deploy the contracts to your preferred network:
   ```sh
   forge deploy --rpc-url $RPC_URL --private-key $PRIVATE_KEY
   ```
3. Start the frontend application:
   ```sh
   yarn start
   ```

## Testing
Run the test suite to ensure the smart contracts work as expected:
```sh
forge test
```

## Contribution
Contributions are welcome! Feel free to open issues or submit pull requests to improve the GHO Event RSVP DApp.

## License
MIT

Thank you for your interest in the GHO Event RSVP DApp. Let's build a vibrant community of event creators and participants!
