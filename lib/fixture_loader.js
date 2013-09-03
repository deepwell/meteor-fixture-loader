/**
 * FixtureLoader.
 *
 * Loads fixtures with dependancies.
 */

FixtureLoader = function FixtureLoader() {
  // array of object literals with fixtures
  this.fixtures = [];
  // names of fixtures that have been loaded
  this.loaded = [];
};

/**
 * Load all the registered fixtures.
 */
FixtureLoader.prototype.load = function() {
  var counter = 0, loopMax = 50;

  while (true) {
    for (var i = 0; i < this.fixtures.length;  i++) {
      var fixture = this.fixtures[i];

      if (this.canFixtureBeLoaded(fixture)) {
        this._loadFixture(fixture);
        this.fixtures.splice(i, 1); // remove from fixtures array
        i--;
      }
    }

    if (this.fixtures.length === 0) // are we done?
      return true;

    counter++;
    if (counter > loopMax) {
      console.log('Failed to load Fixtures! Could not resolve dependancies');
      return false;
    }
  }

  return true;
};

/**
 * Have all the dependancies been met so we can load this fixture?
 *
 * @param fixture object
 * @return boolean
 */
FixtureLoader.prototype.canFixtureBeLoaded = function(fixture) {
  // if no dependancies
  if (fixture.depends.length === 0)
    return true;

  // trim any dependancies that are met
  for (var i = 0, len = this.loaded.length; i < len; i++) {
    for (var j = 0; j < fixture.depends.length; j++) {
      if (fixture.depends[j] === this.loaded[i]) {
        fixture.depends.splice(j, 1);
        j--;
      }
    }
  }

  if (fixture.depends.length === 0)
    return true;

  return false;
};

/**
 * Load a single fixture.
 *
 * @param fixture object
 */
FixtureLoader.prototype._loadFixture = function(fixture) {
  console.log(' - ' + fixture.name);
  fixture.fn();
  // add to list of fixtures we have loaded
  this.loaded.push(fixture.name);
};

/**
 * Adds a fixture to be loaded.
 *
 * @param name string           Name of fixture to add
 * @param fn function           Function to load fixtures
 * @param depends string|array  Fixture or fixtures that must be loaded first (optional)
 */
FixtureLoader.prototype.add = function(name, fn, depends) {
  if (typeof depends === 'undefined')
    depends = [];
  else if (typeof depends === 'string')
    depends = [ depends ];

  var fixture = {
    name: name,
    fn: fn,
    depends: depends
  };
  this.fixtures.push(fixture);
};
