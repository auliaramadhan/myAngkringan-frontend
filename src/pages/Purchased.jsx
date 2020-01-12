import React, { useEffect, useState, Fragment } from 'react'
import Cookies from "js-cookie";
// import Axios from "axios";
import _ from 'lodash'
import { connect } from 'react-redux'
import { getCheckout, getDetailCheckout } from '../redux/action/getData'
import { Table, Modal } from 'react-bootstrap';


function Purchased(props) {

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);

   useEffect(() => {
      props.dispatch(getCheckout(Cookies.get('token')))
      console.log(props.checkout)
   }, [props])

   const showDetail = async(id) =>{
      await props.dispatch(getDetailCheckout(Cookies.get('token'), id))
      setShow(true)
   }

   return (
      <Fragment>
         <div>
            <Table responsive>
               <thead>
                  <tr>
                     <th>No.</th>
                     <th> Receiver Name </th>
                     <th>Phone</th>
                     <th>Address</th>
                     <th>Total Purchased</th>
                     <th>On Date</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>

                  {props.checkout && props.checkout.data.map((v, i) =>
                     <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{`${v.firts_name} ${v.last_name}`}</td>
                        <td>{v.phone}</td>
                        <td>{v.address}</td>
                        <td>{v.total_harga}</td>
                        <td>{v.created_on.split('T')[0]}</td>
                        <td><button onClick={() => showDetail(v.id)}></button></td>
                     </tr>)}

               </tbody>
            </Table>
         </div>

         <Modal show={show} hide={handleClose} >
            <div className="container">
               <div className="row justify-content-sm-center">
                  <div class="col-md-8 order-details">
                     <div class="section-title text-center">
                        <h3 class="title">Your Purchased</h3>
                     </div>
                     <div class="order-summary">
                        <div class="order-col">
                           <div><strong>Qty</strong></div>
                           <div><strong>PRODUCT</strong></div>
                           <div><strong>TOTAL</strong></div>
                        </div>
                        <div class="order-products">
                           {props.detailCheckout.data &&
                              props.detailCheckout.data.map((v, i) =>
                                 <div class="order-col" key={i}>
                                    <div>
                                       <strong>{v.qty}x</strong></div>
                                    <div> {v.name}</div>
                                    <div>IDR {v.total}</div>
                                 </div>)}
                        </div>
                        <div class="order-col">
                           <div><strong></strong></div>
                           <div><strong>TOTAL</strong></div>
                           <div style={{ alignContent: "end" }} >
                              <strong>IDR {_.sumBy(props.detailCheckout.data, v => v.total)} </strong></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Modal>
      </Fragment>
   )
}

const mapStateToProps = state => {
   return {
      checkout: state.checkout,
      detailCheckout: state.detailCheckout
   }
}

export default connect(mapStateToProps)(Purchased)