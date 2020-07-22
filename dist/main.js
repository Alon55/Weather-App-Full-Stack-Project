let render = new Renderer();
let temp = new TempManager();

async function loadPage() {
  await temp.getDataFromDB();
  render.renderData(temp.cityData);
}

async function handleSearch() {
  let info = await $('#input').val();
  info = info.charAt(0).toUpperCase() + info.slice(1)
  if(temp.cityData.find(c => c.name === info)){
    $('#input').val('The city exists').css('color', 'red')
      setTimeout(() => {$('#input').val('').css('color', 'black')}, 3000); 
  }else {
    await temp.getCityData(info);
    await render.renderData(temp.cityData);
    $('#input').val('');
  }
  
}

$('#btn').click(() => {
  handleSearch();
});

$('#list').on('click', '.save', function () {
  let cityName = $(this).closest($('div')).find($('.cityN')).html();
  let plus = 'https://image.flaticon.com/icons/svg/1828/1828817.svg';
  let minos = 'https://image.flaticon.com/icons/svg/753/753340.svg';
  if ($(this).attr('src') === plus) {
    temp.saveCity(cityName);
    $(this).attr('src', minos);
  } else if ($(this).attr('src') === minos) {
    temp.removeCity(cityName);
    $(this).attr('src', plus);
  }
});

$('.removeCity').click(() => {
  let cityName = $(this);
  temp.removeCity(cityName);
});

loadPage();
