import React, { useState, useEffect, Fragment, useRef } from 'react'
import Product from '../../component/Product'
import Axios from "axios";
import _ from 'lodash';
import { connect } from 'react-redux'
import { getItems } from '../../redux/action/getData'
import Modal from '../../component/Modal';
import Cookies from 'js-cookie'
import { postCart } from '../../redux/action/postData';


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
            method: 'get', url: "http://52.91.248.206:8080/category/"
         })
         setCategory(result.data)
         console.log(result.data)
      }
      getdata()
   }, [query])

   const setPage = (page) => {
      setQuery({ ...query, page: page })
   }

   const [show, setShow] = useState(false);
   const [item, setItem] = useState({})

   const showDetail = async (thisitem) => {
      setQty(0)
      setItem(thisitem)
      setShow(true)
   }

   const [qty, setQty] = useState(0)
   const addCart = async () => {
      const token = Cookies.get('token')
      if (!qty) {
         window.alert('minimal 1 qty')
      } else {
         await props.dispatch(postCart(token,
            { id_item: item.id, qty: qty, total: qty * item.price }))
      }
   }

   const mount = useRef(false)
   useEffect(() => {
      if (mount.current){
         if (props.cart.isError) {
            alert('terdapat error di database')
         } else if (!props.cart.isError && props.cart.status.success) {
            alert('barang berhasil ditambahkan ke cart')
         }
      }
    else mount.current = true;
      console.log(props.cart.status)
   }, [props.cart.status])

   return (
      <Fragment>
         <div class="container">
            <div class="store-filter clearfix">
               <div class="store-sort" >
                  <div class="form-group" >
                     <label >Search</label>
                     <input class="input" type="text" name="search" placeholder="Search"
                        onKeyDown={(e) => e.key === 'Enter' ? setQuery({ ...query, name: e.target.value }) : ''} />
                     <button class="btn btn-default">Search</button>
                  </div>
                  <label>
                     Category:
							<select class="input-select" onChange={(e) => setQuery({ ...query, category: e.target.value })}>
                        <option value="0">All</option>
                        {category.data && category.data.map((v, i) =>
                           <option value={v.id} key={i}>{v.name}</option>
                        )}
                     </select>
                  </label>

                  <label>
                     Sort By:
							<select class="input-select" onChange={(e) => setQuery({ ...query, order: e.target.value })}>
                        <option value={null} selected>Restaurant</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="rating">rating</option>
                     </select>
                  </label>
                  <label>
                     Sort By:
							<select class="input-select" onChange={(e) => setQuery({ ...query, asc: e.target.value })}>
                        <option value={null} selected>ASC</option>
                        <option value="DESC">DESC</option>
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
                  {/* <ul class="store-grid">
                  <li class="active"><i class="fa fa-th"></i></li>
                  <li><a href="#"><i class="fa fa-th-list"></i></a></li>
               </ul> */}
               </div>
            </div>

            <div class="row justify-content-sm-center">
               {props.items.isLoading && <div class="lds-ring"><div></div><div></div><div></div></div>}
               {!props.items.isLoading && props.items.data.data
                  && props.items.data.data.map((v, i) =>
                     <div class="col-md-4 col-sm-6" key={i}>
                        <Product item={v}
                           onpress={() => showDetail(v)}
                           norestauran={props.byRestaurant ? false : true} />
                     </div>)}

            </div>


            <div class="store-filter clearfix">
               {props.items.data.page && <Pagination {...props.items.data.page} setPage={setPage} />}
            </div>

         </div >
         <Modal show={show} hide={() => setShow(false)} title={"add to cart"} >
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
         </Modal>

      </Fragment>

   )

}


function Pagination(props) {

   return (
      <Fragment>
         <div class="store-filter clearfix">
            <span class="store-qty">Showing
            {props.limit * props.current_page}-{props.limit * (props.current_page + 1)} Of {props.total_data}
               products</span>
            <ul class="store-pagination">
               {props.current_page !== 1 && <li onClick={() => props.setPage(props.current_page - 1)}>
                  <i class="fa fa-angle-left"></i></li>}
               {_.range(props.current_page - 3,
                  props.current_page + 3).filter(i => 0 < i)
                  .filter(i => i <= props.total_page)
                  .map((v, i) => {
                     if (v === props.current_page) {
                        return (<li class="active" key={i}>{v}</li>)
                     } else return (
                        <li onClick={() => props.setPage(v)} key={i} >{v}</li>
                     )
                  })
               }
               {props.current_page !== props.total_page &&
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
      , cart:state.cart
   }
}

export default connect(mapStateToProps)(ListItem)
