const React = require('react');
const axios = require('axios');

class Uber extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 37.774929,
      lng: -122.419416,
      products: [],
      prices: [],
      estimates: [],
      productId: {},
      interval: () => '',
    };
  }
  componentDidMount() {
    let lat = this.state.lat;
    let lng = this.state.lng;
    //available products
    axios.get('http://localhost:3000/api/products', {
      params: {
        lat: lat,
        lng: lng
      }
    })
    .then(resp => {
      this.setState({ products: resp.data });
      let productIdObj = {}
      resp.data.map(car => {
        let product = car.display_name;
        productIdObj[product] = car.product_id;
      })
      this.setState({ productId: productIdObj })
    })
    //general price estimates
    axios.get('http://localhost:3000/api/price', {
      params: {
        destination: "1080 Folsom St, San Francisco, CA 94103, US"
      }
    })
    .then(resp => {
      console.log('price estimate', resp.data.prices)
      this.setState({ prices: resp.data.prices })
    })
    //estimates for this specific trip
    axios.get('http://localhost:3000/api/estimate', {
      params: {
        product_id: this.state.productId.POOL,
        destination: "1080 Folsom St, San Francisco, CA 94103, US"
      }
    })
    .then(resp => {
      console.log('estimates', resp.data)
    })
    //
  }

  render() {
    console.log("PRODUCT", this.state.products)

    return (
      <div>
      <div className="uberOptions">
      {this.state.products
        .filter(car => (car.display_name === "POOL" || car.display_name === "uberX" || car.display_name === "uberXL"))
        .sort((a, b) => (a.capacity - b.capacity))
        .map(car => {
        return <div style={{color:"white"}}>
          {car.display_name}, {car.capacity} {car.capacity === 1 ? "seat" : "seats"}
          <div>
            {this.state.prices.filter(price => (price.display_name === car.display_name))
              .map(thisPrice => { return thisPrice.estimate })[0]
            }
          </div>
            <img src={car.image}></img>
          </div>
          })
        }
      </div>
      <div className="uberSelected" style={{color:"white"}}>
        {this.state.productId.POOL}
      </div>
    </div>
    )
  }
}

export default Uber;
