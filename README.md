# Form Management Application

A web application to create, store, manage and fill out forms developed using the MERN Stack.

## Getting Started

These instructions will get a copy of the application up and running on your local machine for development and testing purposes.

### Prerequisites

To install the application and get it running, you will need these tools installed

```
✓ Node.js
✓ npm
✓ git
```

### Installing

A step by step series of instructions that tell you how to get a development app running

1. Clone the repository

```
git clone https://github.com/Arcnet505/Formwire.git
```

2. Run the installation scripts

```
npm run dev-setup
```

3. Create a folder called *config* and inside this folder create a file *default.json* with the contents
```
{
    "mongoURI": "MONGO_URI",
    "jwtSecret": "TOKEN"
}
```
Then replace *MONGO_URI* with a connection string to your database, and *TOKEN* with your desired secret for your Java web tokens

4. Start the development environment

```
npm run dev
```

If the application did not open automatically, navigate to http://localhost:3000 in your browser of choice.

## Browserlist error
If you get a broswerlist error while attempting to run the code, delete the following files:
```
client/browserslist
```
```
client/browserslist.cmd
```

## Built With

* [Node.js](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [MongoDB](https://www.mongodb.com/)
* [formBuilder](https://formbuilder.online)

## Styled with

* [MDBootstrap](https://mdbootsrap.com)

## Authors

* **Anthony Clark** - *Lead Developer* - [Arcnet505](https://github.com/Arcnet505)
* **Daniel Charlton** - *Project Manager and Assistant Developer* - [DCharlo98](https://github.com/DCharlo98)
* **Gryff Priest** - *UI styling and Graphics Designer* [luna-bird](https://github.com/luna-bird)
* **Lachlan Torr** - *Technical Documentation Writer* [LachlanTorr](https://github.com/LachlanTorr)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Brad Traversy - [Traversy Media](https://www.traversymedia.com/)
