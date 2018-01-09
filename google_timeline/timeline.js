google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    
    var data = new google.visualization.DataTable();
    data.addColumn({type: 'string', id: 'TaskCategory'});
    data.addColumn({type: 'string', id: 'TaskName'});
    data.addColumn({type: 'date',   id: 'Start'});
    data.addColumn({type: 'date',   id: 'End'});
    
    
    // --- USER SECTION: ONLY NEED TO CHANGE THIS PART ---
    
    // change to add/delete tasks
    data.addRows([
                  ['Scattering Experiments', 'INS Experiments', new Date(2017, 12, 1), new Date(2018, 5, 20)],
                  ['Scattering Experiments', 'Data Analysis', new Date(2018, 5, 22), new Date(2018, 9, 20)],
                  ['Scattering Experiments', 'IXS Experiments', new Date(2018, 10, 22), new Date(2019, 3, 10)],
                  ['Scattering Experiments', 'Data Analysis', new Date(2019, 3, 20), new Date(2019, 7, 20)],
                  
                  ['MD Simulations', 'Metallic Liquids', new Date(2018, 1, 30), new Date(2018, 6, 1)],
                  ['MD Simulations', 'Density Corr.', new Date(2018, 6, 12), new Date(2018, 10, 5)],
                  ['MD Simulations', 'Current Corr.', new Date(2018, 10, 9), new Date(2019, 1, 25)],
                  
                  ['MD Simulations', 'Water', new Date(2018, 2, 30), new Date(2018, 6, 20)],
                  ['MD Simulations', 'Density Corr.', new Date(2018, 6, 30), new Date(2018, 10, 25)],
                  ['MD Simulations', 'Current Corr.', new Date(2018, 10, 29), new Date(2019, 2, 25)],
                  
                  ['MD Simulations', 'Ionic Liquids', new Date(2018, 3, 30), new Date(2018, 8, 10)],
                  ['MD Simulations', 'Density Corr.', new Date(2018, 8, 20), new Date(2019, 1, 15)],
                  ['MD Simulations', 'Current Corr.', new Date(2019, 1, 19), new Date(2019, 5, 25)],
                  
                  ['Viscoelastic Theory', 'Viscoelastic Response', new Date(2018, 5, 18), new Date(2019, 9, 5)],
                  ['Viscoelastic Theory', 'Longitudinal-Transverse Coupling', new Date(2018, 8, 10), new Date(2019, 12, 25)]
                  ]);
    
    // change options to customize the plot
    var options = {
        width: 840,
        height: 280,
        timeline: { colorByRowLabel: true,
                    // rowLabelStyle: {xfontName: 'Helvetica', fontSize: 13, color: '#603913'},
                    // barLabelStyle: { fontName: 'Garamond', fontSize: 12 }
        }
    };
    
    // --- END OF USER SECTION ---
    

    var chart_div = document.getElementById('chart_div');
    var chart = new google.visualization.Timeline(chart_div);

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
                                                console.log(output);
                                                document.body.appendChild(output);
                                            });

    chart.draw(data, options);
}

