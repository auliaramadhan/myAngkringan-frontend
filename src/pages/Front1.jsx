import React, { Component } from 'react'
import axios from 'axios'
import { Col, Container, Row, Button } from 'react-bootstrap'

export default class Home extends Component {
   constructor(props) {
      super(props)
   
      this.state = {
          data:[]
          , isFetch: false
      }
   }
   async componentDidMount(){
      const {data} = await axios.get('https://rickandmortyapi.com/api/character/')
      this.setState({data:data, isFetch:true })
   }
   prevButton = async() => {
      const url = this.state.data.info.prev
      if (url) {
         const {data} = await axios.get(url)
         this.setState({data})
      }
   }   
   nextButton = async() => {
      const url = this.state.data.info.next
      if (url) {
         const {data} = await axios.get(url)
         this.setState({data})
      }
   }   
   render() {
      // eslint-disable-next-line
      const {data,isFetch} = this.state
      return (
         <Container>
            <Row>
                  {this.state.isFetch&&this.state.data.results.map(v => (
                     <Col key={v.id} className="mt-4">
                            {v.name}
                           <img src={v.image} alt="gambar"/> 
                     </Col>
                  ))}
            </Row>
            <Row className='mt-5 mb-5'>
               <Col className="md-6 text-center">
                  <Button onClick={this.prevButton}>Previous</Button>
               </Col>
               <Col className="md-6 text-center">
                  <Button onClick={this.nextButton}>Next</Button>
               </Col>
            </Row>
         </Container>
      )
   }
}
