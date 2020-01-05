import React, { useState, useEffect } from 'react'
import Product from '../../component/Product'
import Cookies from "js-cookie";
import Axios from "axios";


export default function ListItem(props) {

   const [items, setItems] = useState([])
   let query = {byRestaurant:props.byRestaurant}
   useEffect(() => {
      const token = Cookies.get('token')
      async function getdata() {
         const result = await Axios({ method: 'get',
          url: "http://127.0.0.1:8080/item", 
          headers: { 'Authorization': 'Bearer ' + token },
          params:query})
         console.log(result.data.data)
         setItems(result.data.data)
      }
      getdata()
   }, [])
   return (
      <div class="container">
         <div class="store-filter clearfix">
            <div class="store-sort" >
               <div class="form-group">
                  <label >Search</label>
                  <input class="input" type="text" name="search" placeholder="Search" />
                  <button class="btn btn-default">Search</button>
               </div>
               <label>
                  Sort By:
							<select class="input-select" name="category">
                     <option value="0">Popular</option>
                     <option value="1">Position</option>
                  </select>
               </label>

               <label>
                  Show:
									<select class="input-select">
                     <option value="0">20</option>
                     <option value="1">50</option>
                  </select>
               </label>
               <ul class="store-grid">
                  <li class="active"><i class="fa fa-th"></i></li>
                  <li><a href="#"><i class="fa fa-th-list"></i></a></li>
               </ul>
            </div>
         </div>

         <div class="row">
            {items.map( (v,i) =>
               <div class="col-md-4 col-sm-6" key={i}>
               <Product item={v}
               norestauran={props.byRestaurant?false:true} />
            </div>)}
            {/* ini bisa filipatgandakan */}
         </div>


         <div class="store-filter clearfix">
            <span class="store-qty">Showing 20-100 products</span>
            <ul class="store-pagination">
               <li class="active">1</li>
               <li><a href="#">2</a></li>
               <li><a href="#">3</a></li>
               <li><a href="#">4</a></li>
               <li><a href="#"><i class="fa fa-angle-right"></i></a></li>
            </ul>
         </div>
      </div >
   )
}
