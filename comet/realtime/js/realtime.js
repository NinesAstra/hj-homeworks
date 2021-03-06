const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  const dataAll = JSON.parse(event.data);
  console.log(dataAll);
  if (isFirst) {
    dataAll
      .forEach(data => realtime.addData([Number(data.online)], data.time));

    isFirst = false;
  } else {
    realtime.removeData();
    realtime.addData([Number(dataAll.online)], dataAll.time);
  }
});
