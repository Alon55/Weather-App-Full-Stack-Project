class Renderer {
  constructor() {}
  async renderData(allCityData) {
    
      const source = $('#template').html();
      const template = Handlebars.compile(source);
      let newHTML = template({ allCityData });
      $('#list').empty().append(newHTML);
    
  }
}
