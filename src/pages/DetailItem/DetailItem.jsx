import React from 'react'
import imgProduct from '../../assets/img/product04.png'
import Slider from 'react-slick'
import Product from '../../component/Product';


export default function DetailItem() {
	var settings = {
		dots: true,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		swipeToSlide: true,
		adaptiveHeight: true,
		className: 'slides',
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
								<img src={imgProduct} alt="gambar" />
							</div>
						</div>
					</div>
	
					<div class="col-md-6">
						<div class="product-details">
							<h2 class="product-name">product name goes here</h2>
							<div>
								<div class="product-rating">
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-o"></i>
								</div>
								<a class="review-link" href="#">10 Review(s) | Add your review</a>
							</div>
							<div>
								<h3 class="product-price">$980.00 <del class="product-old-price">$990.00</del></h3>
								<span class="product-available">In Stock</span>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	
							<div class="product-options">
								<label>
									Size
										<select class="input-select">
										<option value="0">X</option>
									</select>
								</label>
								<label>
									Color
										<select class="input-select">
										<option value="0">Red</option>
									</select>
								</label>
							</div>
	
							<div class="add-to-cart">
								<div class="qty-label">
									Qty
										<div class="input-number">
										<input type="number" />
										<span class="qty-up">+</span>
										<span class="qty-down">-</span>
									</div>
								</div>
								<button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
							</div>
	
							<ul class="product-btns">
								<li><a href="#"><i class="fa fa-heart-o"></i> add to wishlist</a></li>
								<li><a href="#"><i class="fa fa-exchange"></i> add to compare</a></li>
							</ul>
	
							<ul class="product-links">
								<li>Category:</li>
								<li><a href="#">Headphones</a></li>
								<li><a href="#">Accessories</a></li>
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
					
				</div>

				<div class="col-md-12">
					<div class="section-title text-center">
						<h3 class="title">Related Products</h3>
					</div>
					<Slider {...settings}>

						<div class='row'>
							<div className="col-xs-10">
								<Product />
							</div>
						</div>
					</Slider>
				</div>
			</div>
		</div>
	)
}
