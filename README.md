sudoku
======

A sudoku kata in JS, because I finished reading the Internets early today.

There are loads of repos like this, some in 140 bytes even. That's neat, but I prefer code I can read.

Todo
----

Refactor the fuck out of this when I finish reading the Internets again.

Some ideas going forward:

* Remove the Cell object (turned out to be pretty useless)
* Flatten the storage array
* Add a cell retrieval method to simplify cell lookups
* Condense row, col methods, and possible the box method
* Write more comprehensive tests
* Track the dirty state in the board per pass, rather than comparing a serialized board state
* Add reality-forking for advanced games that require guessing
* Maybe a game generation algorithm? That could be fun.