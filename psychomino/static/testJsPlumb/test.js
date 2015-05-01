jsPlumb.ready(function() {
  jsPlumb.makeSource("test1", {
    connector: 'StateMachine'
  });
  jsPlumb.makeTarget("test2", {
    anchor: 'Continuous'
  });

  jsPlumb.connect(
			{
				source:"test1",
				target:"test2"
			}
		);
});