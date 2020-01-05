import React, { useState, useEffect } from 'react'
import imgProduct from '../../assets/img/product04.png'
import Slider from 'react-slick'
import Product from '../../component/Product';
import Review from './Review';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import Axios from "axios";


export default function DetailItem(props) {
	const item = props.location.state
	const [showcase, setShowcase] = useState([])
	useEffect(() => {
		const token = Cookies.get('token')
		async function getdata() {
			const result = await Axios({
				method: 'get',
				url: "http://127.0.0.1:8080/item/" + props.match.params.id,
				headers: { 'Authorization': 'Bearer ' + token }
			})
			console.log(result.data.data)
			setShowcase(result.data.showcase)
		}
		getdata()
	}, [])

	const [qty, setQty] = useState(0)
	const addCart = async () => {
		const token = Cookies.get('token')
		if (!qty) {
			window.alert('minimal 1 qty')
		} else {
			const result = await Axios({
				method: 'post',
				url: "http://127.0.0.1:8080/cart/",
				headers: { 'Authorization': 'Bearer ' + token },
				data: { id_item: props.match.params.id, qty: qty }
			})
			console.log(result)
		}
	}

	var settings = {
		dots: true,
		infinite: true,
		centerMode: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		swipeToSlide: true,
		adaptiveHeight: true,
		className: 'slides center',
		centerPadding: "60px",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};
	return (
		<div class="section">

			<div class="container">

				<div className="row">
					<div class="col-md-6">
						<div id="product-main-img">
							<div class="product-preview">
								<img src={"http://localhost:8080".concat(item.image.substr(6))} alt={imgProduct} />
							</div>
						</div>
					</div>

					<div class="col-md-6">
						<div class="product-details">
							<h2 class="product-name">{item.name}</h2>
							<div>
								<div class="product-rating">
									{Array((Math.round(item.rating)) + 1).fill(
										<i class="fa fa-star"></i>
									)}
									{Array(4 - Math.round(item.rating)).fill(
										<i class="fa fa-star" style={{ color: '#343A40' }}></i>
									)}
								</div>
								<p>10 Review(s) | Add your review</p>
							</div>
							<div>
								<h3 class="product-price">{item.price} </h3>
								{/* <h3 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h3> */}
								<span class="product-available">In Stock</span>
							</div>
							<p>{item.description || 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus odit itaque quaerat tenetur ducimus doloremque perspiciatis nisi odio, iste accusantium dolor qui aperiam harum facere sit obcaecati enim eveniet nulla.'} </p>

							<div class="add-to-cart">
								<div class="qty-label">
									Qty
										<div class="input-number">
										<input type="number" value={qty} disabled />
										<span class="qty-up" onClick={() => setQty(qty + 1)}>+</span>
										<span class="qty-down" onClick={() => qty ? setQty(qty - 1) : qty}>-</span>
									</div>
								</div>
								<button class="add-to-cart-btn"
									onClick={addCart}>
									<i class="fa fa-shopping-cart"></i> add to cart</button>
							</div>

							<ul class="product-links">
								<li>Category:</li>
								<li><Link to="#">{item.category}</Link></li>
							</ul>

							<ul class="product-links">
								<li>Share:</li>
								<li><a href="#"><i class="fab fa-facebook"></i></a></li>
								<li><a href="#"><i class="fab fa-twitter"></i></a></li>
								<li><a href="#"><i class="fab fa-google-plus"></i></a></li>
								<li><a href="#"><i class="fa fa-envelope"></i></a></li>
							</ul>

						</div>
					</div>
				</div>

				{/* review */}
				<div class="col-md-12">
					<Review id_item={item.id} />
				</div>

				<div class="col-md-12">
					<div class="section-title text-center">
						<h3 class="title">Related Products</h3>
					</div>
					<Slider {...settings}>

						{/* div*5>h3{hai}*3 */}
						{showcase.map((v, i) =>
							<div style={{ margin: '20px' }}>
								<Product item={v} />
							</div>)}
					</Slider>
				</div>
			</div>
		</div>
	)
}
