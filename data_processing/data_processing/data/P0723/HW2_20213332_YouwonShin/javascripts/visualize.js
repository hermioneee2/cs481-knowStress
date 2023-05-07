var yourVLSpec1 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
        url: "data/inbody.csv"
    },
    mark: {
        type: "line",
        point: {
            filled: false,
            fill: "white"
        }
    },
    width: "container",
    encoding: {
      x: {
          field: "Date",
          type: "ordinal",
          title: "Date"
      },
      y: {
          field: "Figure",
          type: "quantitative",
          title: "Change in numbers"
      },
      color: {
        field: "Type",
        type: "nominal",
        title: "DataType"
        },
    },
    autosize: { 
        type: 'pad' ,
        resize: 'true'
      },
}

vegaEmbed('#subvis', yourVLSpec1);


var yourVLSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: {
        name: "myData"
    },
    mark: "bar",
    width: "container",
    encoding: {
      x: {
          field: "Semester",
          type: "nominal",
          title: "Semester"
      },
      y: {
          aggregate: "count",
          type: "quantitative",
          title: "Number of Courses"
      },
      color: {
        field: "Department",
        type: "nominal",
        scale: {
          domain: ["School of Computing", "General Required", "Electrical Engineering", "Cyber Security", "Computer Engineering", "Mech/BioMed Engineering"],
          range: [ "#9467bd", "#9283ad", "#b8b8b8", "#808080", "#aec7e8", "#1f77b4"]
        },
        title: "Department"
        },
    },
    autosize: { 
        type: 'pad' ,
        resize: 'true'
      },
}

const response = fetch('data/courses.csv')
    .then(response => response.text()) 
    .then(function(v) { 
        console.log(v);
        return csvJSON(v);
    })
    .catch(err => console.log(err))

vegaEmbed('#vis', yourVLSpec)
    .then(function(res) {
        function drawVL(v, selectedYear) {
            var dataVal = JSON.parse(v).filter((el) => el.Year === selectedYear);
            var changeSet = vega.changeset()
                .remove(() => true)
                .insert(dataVal);
            res.view.change('myData',changeSet).run()
        }

        const dropdown1 = document.getElementById('dropdown1');
        const dropdown2 = document.getElementById('dropdown2');

        response.then(function(v){
            drawVL(v,"2021");
            
            dropdown1.addEventListener('click',function(){
                drawVL(v,"2021");
            })
            dropdown2.addEventListener('click',function(){
                drawVL(v,"2020");
            })
        })
    });