import React, { useState, useEffect, Fragment } from 'react'
import useDataFetching from '../../service/fetchHook';
import Axios from 'axios';
import cookies from 'js-cookie'
import _ from 'lodash'



export default function Cart(props) {
   const { loading, results, error, setQuery } = useDataFetching("http://127.0.0.1:8080/cart");
   const [myCart, setMyCart] = useState(results.data)
   useEffect(() => {
      console.log(results)

      setMyCart(results.data)
      props.setTotal(_.sumBy(myCart, (v)=> v.total))
   }, [results])

   const setCountCart = (value, index) => {
      const temp = myCart.concat([])
      temp[index].qty = value
      temp[index].total = temp[index].price * value
      temp[index].changed = true
      setMyCart(temp)
      props.setTotal(_.sumBy(myCart, (v)=> v.total))
      console.log(myCart)
      // setState(state => {
      //    const list = state.list.map((item, j) => {
      //       if (j === i) {
      //          return item + 1;
      //       } else {
      //          return item;
      //       }
      //    });
      //    return {
      //       list,
      //    };
      // });
   }

   const removeFromCart = async (id, index) => {
      const temp = myCart.concat([])
      // temp.splice(index, 1)
      // setMyCart(temp)
      const result = await Axios(({
         method: 'delete',
         url: "http://127.0.0.1:8080/cart/" + id,
         headers: { 'Authorization': 'Bearer ' + cookies.get('token') }
      }));
      if (result.data.success) {
         window.alert('success')
         temp.splice(index, 1)
         setMyCart(temp)
         props.setTotal(_.sumBy(myCart, (v)=> v.total))
      } else window.alert(result.data.msg)
      // setState(state => {
      //    const list = state.list.filter((item, j) => i !== j);
      //    return {
      //      list,
      //    };
      //  });
   }

   const updateCart = async () => {
      let axiosArray = [];
      const loopCount = myCart.length;
  
      for (let i = 0; i < loopCount; i += 1) {
        let put = myCart[i];
        if (put.changed) {
           const newPromise = Axios({
              method: 'put',
              url:"http://127.0.0.1:8080/cart/changeitemqty",
              headers: { 'Authorization': 'Bearer ' + cookies.get('token') },
              data: put,
            });
            axiosArray.push(newPromise)
         }
      }
      console.log(axiosArray)
  
      props.setTotal(_.sumBy(myCart, (v)=> v.total))

      await Axios
        .all(axiosArray)
        .then(Axios.spread((...responses) => {
          responses.forEach(res => console.log(res));
         //  const cart = myCart.concat([])
         //  cart.map(v => {
            //  v.changed = false
            // return v
         //  })
         //  setMyCart(cart)
         
        }))
        .catch((err) => {
          console.log('sendMessage catch error', err);
        });
    }


   return (
      <Fragment>
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
                        <a href="#" onClick={() => removeFromCart(v.id,i)}><i class="fa fa-trash"></i></a>
                     </div>
                  </div>)}
            </div>
         </div>

         <div class="input-checkbox">
            <input type="checkbox" id="terms" />
            <label for="terms">
               <span></span>
               I've read and accept the <a href="#">terms &amp; conditions</a>
            </label>
         </div>
         {/* <a href="#" class="primary-btn order-submit" onClick={}>Update</a> */}
         <button class="primary-btn order-submit" onClick={updateCart} 
         disabled={myCart&&myCart.every(v => !v.changed)}>Update</button>
      </Fragment>
   )
}
