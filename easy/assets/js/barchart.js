const xmlhttp = new XMLHttpRequest();
const url = 'http://localhost/chartjs/easy/assets/data/barchart.json';
xmlhttp.open('GET', url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function()
{
    if (this.readyState == 4 && this.status == 200)
    {
        let data = JSON.parse(this.responseText);
        data = data.languages;
        data = sortArrayOfObjects(data, 'experience', 'ascending');
        setBarchart(data);
    };
}

function setBarchart(data)
{
    const canvas = document.getElementById('barchart');

    const languages = data.map(function(element)
    {
        return element.language;
    });
    const experiences = data.map(function (element)
    {
        return element.experience;
    });
    const colors = data.map(function (element)
    {
        if(element.experience >= 80) return '#FF2C05';
        else if(element.experience >= 60) return '#FD6104';
        else if (element.experience >= 40) return '#FD9A01';
        else if (element.experience >= 20) return '#FFCE03';
        else return '#FEF001';

    })

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: languages, 
            datasets: [ 
                {
                    label: 'Programming Experience (percentage)',
                    data: experiences,
                    backgroundColor: colors,
                    borderWidth: 1,

                },
            ],
        },
    });

}