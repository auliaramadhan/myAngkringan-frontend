import React, { useState, useEffect, Fragment } from 'react'
import Product from '../../component/Product'
import Axios from "axios";
import _ from 'lodash';
import { connect } from 'react-redux'
import { getItems } from '../../redux/action/getData'


function ListItem(props) {
   const [query, setQuery] = useState({})
   useEffect(() => {
      setQuery({ byRestaurant: props.byrestaurant, page: 1 })
   }, [])
   useEffect(() => {
      props.dispatch(getItems(query))
   }, [query])

   const [category, setCategory] = useState({})
   useEffect(() => {
      async function getdata() {
         const result = await Axios({
            method: 'get',url: "http://127.0.0.1:8080/category/"
         })
         setCategory(result.data)
         console.log(result.data)
      }
      getdata()
   }, [query])

   const setPage = (page) => {
      setQuery({ ...query, page: page})
   }

   return (
      <div class="container">
         <div class="store-filter clearfix">
            <div class="store-sort" >
               <div class="form-group" >
                  <label >Search</label>
                  <input class="input" type="text" name="search" placeholder="Search"
                  onKeyDown={(e) => e.key==='Enter'?setQuery({ ...query, name: e.target.value }):''} />
                  <button class="btn btn-default">Search</button>
               </div>
               <label>
                  Category:
							<select class="input-select"  onChange={(e) => setQuery({ ...query, category: e.target.value })}>
                     <option value="0">All</option>
                     {category.data&&category.data.map((v,i) => 
                        <option value={v.id} key={i}>{v.name}</option>
                     )}
                  </select>
               </label>

               <label>
                  Sort By:
							<select class="input-select" onChange={(e) => setQuery({ ...query, sort: e.target.value })}>
                     <option value={null} selected>Restaurant</option>
                     <option value="name">Name</option>
                     <option value="price">Price</option>
                     <option value="rating">rating</option>
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

         <div class="row justify-content-sm-center">
            { !props.items.isLoading && props.items.data.data
             && props.items.data.data.map((v, i) =>
               <div class="col-md-4 col-sm-6" key={i}>
                  <Product item={v}
                     norestauran={props.byRestaurant ? false : true} />
               </div>)}

         </div>


         <div class="store-filter clearfix">
            {props.items.data.page && <Pagination {...props.items.data.page} setPage={setPage} />}
         </div>

      </div >
   )
}


function Pagination(props) {

   return (
      <Fragment>
         <div class="store-filter clearfix">
            <span class="store-qty">Showing 
            {props.limit*props.current_page}-{props.limit*(props.current_page+1)} Of {props.total_data}
             products</span>
            <ul class="store-pagination">
            {props.current_page!==1&& <li onClick={() => props.setPage(props.current_page - 1)}>
               <i class="fa fa-angle-left"></i></li>}
               {_.range(props.current_page - 3,
                     props.current_page + 3).filter(i => 0 < i )
                     .filter(i => i<= props.total_page)
                     .map((v, i) => {
                        if (v === props.current_page) {
                           return (<li class="active" key={i}>{v}</li>)
                        } else return (
                           <li onClick={() => props.setPage(v) } key={i} >{v}</li>
                        )
                     })
               }
                  {props.current_page!==props.total_page&& 
                  <li onClick={() => props.setPage(props.current_page + 1)}>
               <i class="fa fa-angle-right"></i></li>}

            </ul>
         </div>
      </Fragment>
   )
}


const mapStateToProps = state => {
   return {
     items: state.itemList
   }
 }
 
 export default connect(mapStateToProps)(ListItem)
 