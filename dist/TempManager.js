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
    if (data.cod === 200) {
      this.cityData.push(data);
    }
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
      type: 'DELETE',
      url: `/city/${cityName}`,
      success: function () {},
    });
    for (let i = 0; i < this.cityData.length; i++) {
      if (this.cityData[i].name === cityName) {
        this.cityData.splice(i, 1);
      }
    }
  }
}
