import React, { useState, useEffect, Fragment } from 'react'
import useDataFetching from '../../service/fetchHook';
import Axios from 'axios';
import cookies from 'js-cookie'
import _ from 'lodash'
import { connect } from 'react-redux'
import { getCart } from '../../redux/action/getData'
import { deleteCart } from '../../redux/action/deleteData'


function Cart(props) {
   const [myCart, setMyCart] = useState([])
   useEffect(() => {
      props.dispatch(getCart(cookies.get('token'))) 
   }, [])
   useEffect(() => {
      setMyCart(props.cart.data)
   }, [props.cart.data])
   
   const [totalHarga, setTotalHarga] = useState(0)
   useEffect(() => {
      const total = _.sumBy(myCart, (v) => v.total)
      setTotalHarga(total)
      props.setTotal(total) // coba dulu
   }, [myCart])
   
   // useEffect(() => {
   //    console.log(totalHarga)
   //    props.setTotal(totalHarga) // coba dulu
   // }, [totalHarga])

   const setCountCart = (value, index) => {
      const temp = myCart.concat([])
      temp[index].qty = (value!==0)? value : 1
      temp[index].total = (value!==0)? temp[index].price * value : temp[index].total
      temp[index].changed = true
      setMyCart(temp)
   }

   const removeFromCart = async (id, index) => {
      const temp = myCart.concat([])
      await props.dispatch(deleteCart(cookies.get('token'),id))
      console.log(props.cart.status)
      if (props.cart.status.success) {
         window.alert('success')
         temp.splice(index, 1)
         setMyCart(temp)
      } else window.alert(props.cart.status.msg)
   }

   const updateCart = async () => {
      let axiosArray = [];
      const loopCount = myCart.length;

      for (let i = 0; i < loopCount; i += 1) {
         let put = myCart[i];
         if (put.changed) {
            const newPromise = Axios({
               method: 'put',
               url: "http://127.0.0.1:8080/cart/changeitemqty",
               headers: { 'Authorization': 'Bearer ' + cookies.get('token') },
               data: put,
            });
            axiosArray.push(newPromise)
         }
      }
      console.log(axiosArray)

      await Axios
         .all(axiosArray)
         .then(Axios.spread((...responses) => {
            responses.forEach(res => console.log(res));
         }))
         .catch((err) => {
            console.log('sendMessage catch error', err);
         });
         props.dispatch(getCart(cookies.get('token')))
   }

   // function sendcheckout(){
   //    console.log(totalHarga)
   //    const kirimharga = totalHarga
   //    props.setTotal(500) // coba dulu
   //    props.checkoutCart()
   // }

   return (
      <Fragment>
         <div class="col-md-8 order-details">
            <div class="section-title text-center">
               <h3 class="title">Your Order</h3>
            </div>
            <div class="order-summary">
               <div class="order-col">
                  <div><strong>Qty</strong></div>
                  <div><strong>PRODUCT</strong></div>
                  <div><strong>TOTAL</strong></div>
                  <div><strong></strong></div>
               </div>
               <div class="order-products">
                  {myCart && myCart.map((v, i) =>
                     <div class="order-col" key={i}>
                        <div>
                           <span class="count-item" onClick={() => setCountCart(v.qty - 1, i)}><i class="fa fa-minus-square">
                           </i></span>
                           <strong>{v.qty}x</strong>
                           <span class='count-item' onClick={() => setCountCart(v.qty + 1, i)}><i class="fa fa-plus-square"></i></span>
                        </div>
                        <div> {v.name}</div>
                        <div>IDR {v.total}</div>
                        <div>
                           <a href="#" onClick={() => removeFromCart(v.id, i)}><i class="fa fa-trash"></i></a>
                        </div>
                     </div>)}
               </div>
               <div class="order-col">
                  <div><strong></strong></div>
                  <div><strong>TOTAL</strong></div>
                  <div style={{alignContent:"end"}} ><strong>IDR {totalHarga} </strong></div>
                  <div><strong></strong></div>
               </div>
            </div>
               <button class="primary-btn order-submit update-cart" onClick={updateCart}
               disabled={myCart && myCart.every(v => !v.changed)}>Update</button>
         </div>
{/* 
         <button class="primary-btn order-submit" onClick={sendcheckout}
         disabled={myCart && myCart.some(v => v.changed)}>Place order</button> */}
      </Fragment>
   )
}

const mapStateToProps = state => {
   return {
      cart: state.cart,
   }
}

export default connect(mapStateToProps)(Cart)