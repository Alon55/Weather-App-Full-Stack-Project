class TempManager {
  constructor() {
    this.cityData = [];
  }

  async getDataFromDB() {
    let cities = await $.get(`/cities`);
    this.cityData = cities;
  }

  async getCityData(cityName) {
    let data = await $.get(`/city/${cityName}`);
    this.cityData.push(data);
  }

  async saveCity(cityName) {
    for (const c of this.cityData) {
      if (cityName === c.name) {
        await $.post(`/city`, c);
      }
    }
  }

  removeCity(cityName) {
      
    $.ajax({
        type: "DELETE",
        url: `/city/${cityName}`,
        success: function () {}
    })
    
  }
}


