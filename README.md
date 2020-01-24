# librarySystem
A simple library storage system, developed as a learning exercise.

### Description
Allows the user to store and retrieve libraries, including any stored dependencies of those libraries. 
- Supports stored dependencies of any depth (eg dependencies with their own dependencies). 
- Libraries can be stored in any order, regardless of whether their dependencies are present.
- Libraries cannot be retrieved if their dependencies are not stored.

### Function Signature
librarySystem(libName[, dependencies[, callback]])

### Usage
Store or Retrieve a library by calling librarySystem with 1 (to retrieve) or 3 (to store) arguments.

Storage: requires all 3 arguments:
1) Name string. The library will be stored under this name. 
2) Array of dependencies. Each dependency must be the name string that that the dep is stored under. 
3) Callback that returns the library. 

Retrieval: requires only the name string.

### Return Values
Storage >> Returns undefined

Retrieval >> Returns a reference to the named library

### Examples
#### Example 1 - Storage and retrieval of a library with no dependencies
// Store
librarySystem('simpleLibrary', [], function() {return 'The library.'});

// Retrieve
var simpleLib = librarySystem('simpleLibrary');
// simpleLib === 'The library.'

#### Example 2 - Storage and retrieval of a library with a dependency
// Store
librarySystem('dep'), [], function() {return 'a simple dep.'}
librarySystem('complexLibrary', ['dep'], function(dep) {return `I require ${dep}`});

// Retrieve
var complexLib = librarySystem('complexLibrary');
// complexLib === `I require a simple dep.`
