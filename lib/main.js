/**
 * Fixture loader.
 *
 * Loads fixtures with dependancies.
 */

var loader = new FixtureLoader();

/**
 * Registers a fixture to be loaded.
 *
 * @param name string           Name of fixture to add
 * @param fn function           Function to load fixtures
 * @param depends string|array  Fixture or fixtures that must be loaded first (optional)
 */
function addFixture(name, fn, depends) {
  loader.add(name, fn, depends);
}

/**
 * Load all the registered fixtures
 */
function load() {
  return loader.load();
}

// Make these functions globals:
registerFixture = addFixture;
loadFixtures = load;
