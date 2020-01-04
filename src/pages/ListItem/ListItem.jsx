import React from 'react'
import imgProduct from '../../assets/img/product04.png'
import Product from '../../component/Product'

export default function ListItem() {
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
									<select class="input-select">
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
            <div class="col-md-4 col-sm-6" style={{padding:'2vh'}}>
               <Product />
            </div>
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
