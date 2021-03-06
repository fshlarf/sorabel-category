import React, { Component } from 'react'
import axios from 'axios'
import { formatMoney } from './../common/currency'
// import API from './../config/Http'
import cardProduct from './scss/card-product.scss'
import { Redirect } from "react-router-dom"

export default class cardProducrCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      altImg: 'Image Not Found'
    }
  }
  componentDidMount() {
    this.getDataProduct()
  }
  getDataProduct = () => {
    let url = ''
    const { category } = this.props.match.params
    if (!category) {
      url = 'http://localhost:1000/products'
    } else {
      url = 'http://localhost:1000/products?category=' + encodeURIComponent(category)
    }
    axios.get(url, {
      crossDomain: true
    })
    .then(res => {
      this.setState({
        products: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  openDetail(product) {
    let url = '/category/detail/' + product.id
    window.location = url
  }
  render() {
    return (
      <div className={cardProduct}>
       {this.state.products.map((product, i) => (
         <div className="card-product" key={i}>
          <div className="card-product__img" >
            <img src={product.urlImage[0]} alt={this.state.altImg} onClick={() => this.openDetail(product)}/>
            {
              product.popularProduct ? 
              (<div className="card-product__img-label">
                <div>Produk Terlaris</div>
                </div>) :
              ('') 
            }
          </div>
          <div className="card-product__header">
            <div className="card-product__header-title" onClick={() => this.openDetail(product)}>{product.title}</div>
            <label className="card-product__header-label">
              {
                product.size.map((size, i) => {
                  return ( size + '  ' )
                })
              }
            </label>
            <span>
              <img className="ic-like" src={'https://salestock-public-prod.freetls.fastly.net/balok-assets/assets/img/icons/icon-heart-grey-0a895ac5bdf1f98aa48d5f85efc7679d.png'} alt={this.state.altImg}/>
              <button className="btn btn-primary" >BELI</button>
            </span>
            <div className="card-product__header-price">{formatMoney(product.price)}</div>
          </div>
         </div>
       ))}

      </div>
    )
  }
}
