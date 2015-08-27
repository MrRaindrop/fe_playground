$(function () {

  $('#container').highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: '模板性能评测'
    },
    subtitle: {
      text: '平均耗时 (ms)'
    },
    xAxis: {
      categories: [
        'mustache','hogan','handlebars','swig','dot','xtpl','nunjucks','artTemplate', 'es6 TemplateString'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: '平均耗时 (ms)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '平均耗时(ms)',
      data: [44477, 32634 , 32932, 12280, 861, 23758, 25329, 8301, 1021]
    }, {
      name: 'github star数',
      data: [7891, 4022, 8564, 1996, 2149, 94, 1954, 1649, 0]
    }]
  });

});



