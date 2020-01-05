import React from 'react'
import useDataFetching from '../../service/fetchHook';


export default function Cart() {
   const { loading, results, error } = useDataFetching("http://127.0.0.1:8080/profile");

   return (
      <div class="order-summary">
         <div class="order-col">
            <div><strong>Qty</strong></div>
            <div><strong>PRODUCT</strong></div>
            <div><strong>TOTAL</strong></div>
            <div><strong></strong></div>
         </div>
         <div class="order-products">
            {results.data.map((v,i) =>
               <div class="order-col">
               <div>
                  <a href="#"><i class="fa fa-plus-square">
                  </i></a> <strong>1x</strong> <a href="#">
                     <i class="fa fa-minus-square"></i></a>
               </div>
               <div> Product Name Goes Here</div>
               <div>$980.00</div>
               <div>
                  <a href="#"><i class="fa fa-trash"></i></a>
               </div>
            </div>)}
         </div>

      </div>

   )
}
