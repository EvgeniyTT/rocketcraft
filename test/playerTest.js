QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "player creation", function( assert ) {
  var testPlayer = new Player();
  console.log("speed "+testPlayer.speed);


  assert.ok( 5 == testPlayer.speed, "Passed!" );
});