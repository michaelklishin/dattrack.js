# What is DatTrack

DatTrack is a small command line tool for [Digitally Imported](http://di.fm) fans. 

It displays recent tracks from a particular channel in the shell.

DatTrack was developed as a small code kata excercise and should not be taken seriously.
This particular version is a JavaScript port of the [original DatTrack](https://github.com/michaelklishin/dattrack),
developed to learn about .


## Installation

From the repository root

    npm install
    npm link


## Usage

    dattrack-js [--channel NAME --limit LIMIT]

Channel names are currently not parsed in any intelligent way so you have to know them:

 * Epic Trance: `et`, `epictrance`
 * Liquid DnB: `ldnb`, `liquiddnb`
 * Club Dubstep: `clubdubstep`, `clubds`
 * Electro House: `electrohouse`
 * Hands Up: `handsup`, `hu`

This will be improved and expanded in future versions.


## License

Released under the BSD license.

Copyright Michael S. Klishin, 2012

