import React, { useState, useEffect } from 'react'
import Product from '../../component/Product'
import Cookies from "js-cookie";
import Axios from "axios";
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default function ListItem(props) {
   const [query, setQuery] = useState({})
   useEffect(() => {
      setQuery({ byRestaurant: props.byrestaurant, page: 1 })
   }, [])
   const [items, setItems] = useState([])
   useEffect(() => {
      const token = Cookies.get('token')
      async function getdata() {
         const result = await Axios({
            method: 'get',
            url: "http://127.0.0.1:8080/item",
            params: query
         })
         console.log(result.data)
         setItems(result.data)
         console.log(items)
      }
      getdata()
   }, [query])

   return (
      <div class="container">
         <div class="store-filter clearfix">
            <div class="store-sort" >
               <div class="form-group">
                  <label >Search</label>
                  <input class="input" type="text" name="search" placeholder="Search"
                  onKeyDown={(e) => e.key==='Enter'?setQuery({ ...query, name: e.target.value }):''} />
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
							<select class="input-select" onChange={(e) => setQuery({ ...query, limit: e.target.value })}>
                     <option value="5">5</option>
                     <option value="10" selected>10</option>
                     <option value="15">15</option>
                     <option value="20">20</option>
                  </select>
               </label>
               <ul class="store-grid">
                  <li class="active"><i class="fa fa-th"></i></li>
                  <li><a href="#"><i class="fa fa-th-list"></i></a></li>
               </ul>
            </div>
         </div>

         <div class="row">
            {items.data && items.data.map((v, i) =>
               <div class="col-md-4 col-sm-6" key={i}>
                  <Product item={v}
                     norestauran={props.byRestaurant ? false : true} />
               </div>)}

         </div>


         <div class="store-filter clearfix">
            <span class="store-qty">Showing 20-100 products</span>
            <ul class="store-pagination">
            <li onClick={() => items.page.current_page!==1? setQuery({ ...query, page: (query.page - 1) }):''}>
               <i class="fa fa-angle-left"></i></li>
               {items.page &&
                  _.range(items.page.current_page - 3,
                     items.page.current_page + 3).filter(i => 0 < i )
                     .filter(i => i<= items.page.total_page)
                     .map((v, i) => {
                        if (v === items.page.current_page) {
                           return (<li class="active">{v}</li>)
                        } else return (
                           <li onClick={() => setQuery({ ...query, page: v })}>{v}</li>
                        )
                     })
               }
               <li onClick={() => items.page.current_page!== items.page.total_page?
                   setQuery({ ...query, page: (query.page + 1) }):''}>
                  <i class="fa fa-angle-right"></i></li>

            </ul>
         </div>

      </div >
   )
}
