function validate() {
    var amplitude = document.getElementById('a').value;
    var horizontalDilation = document.getElementById('b').value;
    var phaseShift = document.getElementById('c').value;
    var verticalTranslation = document.getElementById('d').value;
    var incrementValue = document.getElementById('i').value;

    //check for empty inputs
    if (amplitude == '' || horizontalDilation == '' || phaseShift == '' || verticalTranslation == '' || incrementValue == '') {
        alert('all inputs are required');
        return false;
    } else {
        var values = {
            amplitude: amplitude,
            horizontalDilation: horizontalDilation,
            phaseShift: phaseShift,
            verticalTranslation: verticalTranslation,
            incrementValue: incrementValue
        };

        fetch('./sinFunctionprocess.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(response => response.text())
            .then(data => alert(data))
            .catch(err => console.log(err));

        return false;
    }
}