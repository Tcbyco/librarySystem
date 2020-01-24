/* 
Library Loading System 
*/  

(function() {
  var libStorage = {}
  function librarySystem(libName, dependencyNames, callback) {
    // Case 1: Storage
    if (arguments.length > 1) {
      libStorage[libName] = { library: callback,
                              depsArray: dependencyNames }
    } else {
      
      // Case 2: Retrieval 
      // The library property will always start as a callback.
      // The first time a library is retrieved, library: callback is run to generate its API.
      // Once the callback is run, library points to the public API.  
      // For a library callback to be run, any dependencies must be run first.

      // Check if the library callback has been run yet.
      // If it hasn't been run, check for deps (recursive case).
      // If it has been run, it won't be a function anymore. Return the library. 
      if (typeof libStorage[libName].library === 'function') {
        
        if (libStorage[libName].depsArray.length > 0) {

          // Recursive case
          // Map array of dep names to an array of refs to dep libraries.
          // Store this new array at the depsArray property.
          libStorage[libName].depsArray = libStorage[libName].depsArray.map(function(depName) {

            // Throw TypeError if current dep is not stored.
            if (libStorage[depName] === undefined) {
              throw new TypeError(`The current library requires ${ depName }, which was not found in the librarySystem`); 
            }
            
            // If current dependency hasn't been run, pass it into librarySystem,
            // allowing us to check any deps it may have, and run those. 
            if (typeof libStorage[depName].library === 'function') {
              librarySystem(depName);
            }
            
            // Add reference to current dep library to a new array.
            return libStorage[depName].library;
          }); // END OF MAPPING.
        }

        // BASE CASE 
        // No Dependencies, or all dependency callbacks have been run.
        // Run the library, passing in array of references to deps.
        // Store the result at library property, overriding the library callback.
        libStorage[libName].library = libStorage[libName].library.apply(null, libStorage[libName].depsArray);

      }
      // If library callback has already been run, we skip to here.
      return libStorage[libName].library;
      
    }
  }
  window.librarySystem = librarySystem;
})()


