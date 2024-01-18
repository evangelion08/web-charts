async function getData(file)
{
    const response = await fetch(file);
    const data = await response.json();
    setPiechart(data);
}

getData('http://localhost/chartjs/medium/assets/data/activiteiten.php');

function setPiechart(data)
{
    const canvas = document.getElementById('piechart');

    const labels = data.map((object) => object.activiteit);
    const colors = data.map((object) => object.kleur);
    const hours = data.map((object) => object.uren);
    const pieces = data.map((object) => {
        const hoursInWeek = 7 * 24;
        const degreesInCircle = 360;
        const degreesPerHour = degreesInCircle / hoursInWeek;
        const degreesPerPiece = degreesPerHour * object.uren;
        return parseFloat(degreesPerPiece.toFixed(2));
    });

    new Chart(canvas,{
        type: 'pie',
        data:{
            labels: labels,
            datasets: [ 
                {
                    data: pieces,
                    backgroundColor: colors,
                    datalabels:{
                        labels: hours,
                    },
                },
            ],
        },
    });
    
}