google.charts.load('current', {'packages':['gantt']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');   // same resource, same color
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');
    
    
    // --- USER SECTION: ONLY NEED TO CHANGE THIS PART ---
    // change to add/delete tasks
    data.addRows([
                  ['Expt.INS', 'INS Experiments', 'expt',
                   new Date(2017, 12, 1), new Date(2018, 5, 20), null, 33, null],
                  ['Expt.IXS', 'IXS Experiments', 'expt',
                   new Date(2018, 5, 15), new Date(2018, 8, 20), null, 0, null],
                  ['MD.simulation', 'MD Simulations', 'MD',
                   new Date(2018, 5, 30), new Date(2018, 10, 10), null, 67, null],
                  ['MD.density_corr', 'Characterization of Density Corerlations', 'MD',
                   new Date(2018, 9, 10), new Date(2018, 12, 25), null, 33, 'MD.simulation'],
                  ['MD.current_corr', 'Characterization of Current Corerlations', 'MD',
                   new Date(2018, 9, 20), new Date(2019, 1, 25), null, 67, 'MD.simulation'],
                  ['Theory.viscoelasticity', 'VH Theory: Viscoelastic Response', 'theory',
                   new Date(2018, 10, 18), new Date(2019, 4, 5), null, 50, null],
                  ['Theory.coupling', 'VH Theory: Longitudinal-Transverse Coupling', 'theory',
                   new Date(2019, 4, 10), new Date(2019, 12, 25), null, 50, 'Theory.viscoelasticity']
                  ]);
    
    // change options to customize the plot
    var options = {
        width: 860,
        height: 320,
        gantt: {
            trackHeight: 40
        }
    };
    // --- END OF USER SECTION ---
    

    var chart_div = document.getElementById('chart_div');
    var chart = new google.visualization.Gantt(chart_div);

//    // Wait for the chart to finish drawing before calling the getImageURI() method.
//    // this functionality so far only works for core google charts, not gantt chart
//    google.visualization.events.addListener(chart, 'ready', function () {
//                                            chart_div.innerHTML = '<img src="' + chart.getImageURI() + '">';
//                                            console.log(chart_div.innerHTML);
//                                            });

    // Wait for the chart to finish drawing before converting to svg using canvg library
    google.visualization.events.addListener(chart, 'ready', function() {
                                                var svg = document.getElementsByTagName("svg")[0];
                                                console.log(svg);
                                                var output = document.createElement('canvas');
                                                canvg(output, new XMLSerializer().serializeToString(svg));
                                                document.body.appendChild(output);
                                            });

    chart.draw(data, options);
}

