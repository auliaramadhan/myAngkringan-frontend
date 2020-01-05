import React, {useState, useEffect} from 'react'
import useDataFetching from '../../service/fetchHook';


export default function Cart() {
   const { loading, results, error } = useDataFetching("http://127.0.0.1:8080/cart");
   const [myCart, setMyCart] = useState(results.data)
   useEffect(() => {
      console.log(results)
      setMyCart(results.data)
   }, [results])

   return (
      <div class="order-summary">
         <div class="order-col">
            <div><strong>Qty</strong></div>
            <div><strong>PRODUCT</strong></div>
            <div><strong>TOTAL</strong></div>
            <div><strong></strong></div>
         </div>
         <div class="order-products">
            {myCart&& myCart.map((v,i) =>
               <div class="order-col">
               <div>
                  <a href="#"><i class="fa fa-plus-square">
                  </i></a> <strong>{v.qty}x</strong> <a href="#">
                     <i class="fa fa-minus-square"></i></a>
               </div>
               <div> {v.name}</div>
            <div>IDR {v.total_harga}</div>
               <div>
                  <a href="#"><i class="fa fa-trash"></i></a>
               </div>
            </div>)}
         </div>

      </div>

   )
}
