var scalingFactors = {
  "lb/h": 194,
  "btu/h": 0.0089566,
  "kg/h": 428,
};

var outputUnits = {
  "kJ/h": 1,
  "BTU/h": 1/1.055,
  "lb/h": 1/3.6
};

function calculateHeatNeeded(useRate, unit) {
  return useRate * unit;
}

$(document).ready(function(){
  $useRate = $('[name="use-rate"]');
  $units = $('[name="units"]');
  $output = $('#output');

  function onChange() {
    var useRate = parseFloat($useRate.val());
    var units = $units.val();
    var scalingFactor = scalingFactors[units];
    var outputUnit = outputUnits

    var heatNeeded = calculateHeatNeeded(useRate, scalingFactor)

    var keys = Object.keys(outputUnits);

    var i = 0;
    $.map(outputUnits, function(outputScalingFactor, outputUnit){
      $currentOutput = $output.find('li').eq(i);

      $outputNumber = $currentOutput.find('.number');
      $outputUnit = $currentOutput.find('.unit');

      $outputNumber.text(heatNeeded * outputScalingFactor);
      $outputUnit.text(outputUnit);
      i++;
    });
  }

  $useRate.on('change', onChange);
  $units.on('change', onChange);
});
