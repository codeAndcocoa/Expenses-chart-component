const API = "data.json";
const tooltipTitle = (tooltipItems) => {
  return "";
};



fetch(API)
  .then((data) => data.json())
  .then((data) => {
    labelValues = [];
    dataValues = [];
    data.map((d) => {
      labelValues.push(d.day);
      dataValues.push(d.amount);
      return { labelValues, dataValues };
    });
    const ctx = document.getElementById("spendChart").getContext("2d");
    const spendChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labelValues,
        datasets: [
          {
            data: dataValues,
            backgroundColor: "hsl(10, 79%, 65%)",
            borderRadius: 5,
            barThickness: 35,
            hoverBackgroundColor: "hsl(10, 79%, 75%)",
           
          },
          
        ],
       
      },
      options: {
        scales: {
          y: {
            display: false,
            grid: {
              display: false,
              lineWidth: 1,
              offset: false,
            },
          },
          x: {
            grid: {
              display: false,
              lineWidth: 1,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            padding:10,
            backgroundColor: "hsl(25, 47%, 15%)",
            bodyColor: "hsl(33, 100%, 98%)",
            displayColors: false,
            caretSize: 0,
            xAlign :"center",
            yAlign : 13,
            bodyFont: {
              size: 15,
            },
            callbacks: {
              title: tooltipTitle,
             label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label = ` $${label}`;
                        }
                        if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                      }
                      return label;
                  },
                 
              
            },
          },
        },
         onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
           console.log(chartElement.datasets);
        },
       
      },
    });
  })
  .catch((err) => console.log(err));

