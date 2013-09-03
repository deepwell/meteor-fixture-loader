Fixture Loader

Makes it easy to load fixtures in a set order synchronously.

How to use:
Create functions that add fixtures to your database eg:
<pre>
function insertCountries() {
  var countries = [{
    name: 'Australia',
    code: 'AU'
  }];

  for (var i = 0, length = countries.length; i < length; i++) {
    Countries.insert(countries[i]);
  }
}
registerFixture('countries', insertCountries);

function insertPorts() {
  var ports = [{
    name: 'Adelaide',
    countryId: Countries.findOne({ code: 'AU' }, { limit: 1 })._id
  }];

  for (var i = 0, length = ports.length; i < length; i++) {
    Ports.insert(ports[i]);
  }
}

// register this function and depend upon 'countries' fixture being loaded first
registerFixture('ports', insertPorts, 'countries');
</pre>
