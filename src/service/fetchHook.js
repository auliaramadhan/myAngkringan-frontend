import React, { useState, useEffect } from "react";
import axios from 'axios'
import Cookies from "js-cookie";
import Axios from "axios";

function useDataFetching(dataSource, queryParams) {
   const [loading, setLoading] = useState(true);
   const [results, setResults] = useState([]);
   const [error, setError] = useState("");
   const [query, setQuery] = useState(queryParams)

   useEffect(() => {
      const token = Cookies.get('token')
      console.log(token)
      async function fetchData() {
         try {
            const result = await Axios(({
               method: 'get',
               url: dataSource,
               params: query,
               headers: { 'Authorization': 'Bearer ' + token }
            }));
            console.log(result)

            if (result.data.success) {
               setLoading(false);
               setError("Data not found")
               setResults(result.data);
            }
         } catch (error) {
            setLoading(false);
            setError(error.message);
         }

         setLoading(false);
      }

      fetchData();
   }, [query, dataSource]);

   return {
      error,
      loading,
      results,
      setQuery
   };
}

export default useDataFetching;