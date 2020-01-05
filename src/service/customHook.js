import React , { useState } from 'react';

const useSignUpForm = (callback) => {
   const [inputs, setInputs] = useState({});
   const handleSubmit = (event) => {
     if (event) {
       event.preventDefault();
     }
     callback();
   }
   const handleInputChange = (event) => {
     event.persist();
     console.log(event.target.value)
     setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
   }
   return {
     handleSubmit,
     handleInputChange,
     setInputs,
     inputs,
   };
 }

 export default useSignUpForm