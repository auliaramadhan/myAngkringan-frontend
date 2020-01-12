import React, { useEffect, useState, Fragment } from 'react'
import Cookies from "js-cookie";
// import Axios from "axios";
import _ from 'lodash'
import { connect } from 'react-redux'
import { getCheckout, getDetailCheckout } from '../redux/action/getData'
import { Table } from 'react-bootstrap';
import Modal from "../component/Modal";



function Purchased(props) {

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);

   useEffect(() => {
      props.dispatch(getCheckout(Cookies.get('token')))
      console.log(props.checkout)
   }, [])

   const showDetail = async (id) => {
      await props.dispatch(getDetailCheckout(Cookies.get('token'), id))
      setShow(true)
   }

   return (
      <Fragment>
         <main className="section">
            <div class="container">
               <div className="row justify-content-sm-center">

                  <div class="col-sm-8">
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

                           {props.checkout.data && props.checkout.data.map((v, i) =>
                              <tr key={i}>
                                 <td>{i + 1}</td>
                                 <td>{`${v.first_name} ${v.last_name}`}</td>
                                 <td>{v.phone}</td>
                                 <td>{v.address}</td>
                                 <td>{v.total_harga}</td>
                                 <td>{v.created_on.split('T')[0]}</td>
                                 <td><button class="btn btn-primary" onClick={() => showDetail(v.id)}>
                                    Detail</button></td>
                              </tr>)}

                        </tbody>
                     </Table>
                  </div>
               </div>
            </div>
         </main>

         <Modal show={show} hide={handleClose} title="Detail">

            <div class="section-title text-center">
               <h3 class="title">Your Purchased</h3>
            </div>
            <div class="order-summary">
               <div class="order-col">
                  <div><strong>Qty</strong></div>
                  <div><strong>PRODUCT</strong></div>
                  <div style={{ width: '150px' }} ><strong>TOTAL</strong></div>
               </div>
               <div class="order-products">
                  {props.detailCheckout.data &&
                     props.detailCheckout.data.map((v, i) =>
                        <div class="order-col" key={i}>
                           <div>
                              <strong>{v.qty}x</strong></div>
                           <div> {v.name}</div>
                           <div style={{ width: '150px' }}>IDR {v.total}</div>
                        </div>)}
               </div>
               <div class="order-col">
                  <div><strong></strong></div>
                  <div><strong>TOTAL</strong></div>
                  <div style={{ width: '150px' }} >
                     <strong >IDR {_.sumBy(props.detailCheckout.data, v => v.total)} </strong></div>
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