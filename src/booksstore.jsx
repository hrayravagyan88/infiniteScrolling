import { useState, useEffect } from "react";
import axios from "axios";
export default function Booksstore(query, pagenumber) {
    

  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, sethasMore] = useState(false)
  const [loading, setLoading] = useState(true)
useEffect(()=>{
    setBooks([])
},[query])
  useEffect(() => {
    let cancel;
    setLoading(true);
    setError(false);
    var CancelToken = axios.CancelToken;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: query, page: pagenumber },
      cancelToken: new CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prev) => {
          return [...new Set([...prev,...res.data.docs.map((val) => val.title)])];
        });
        sethasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pagenumber]);
  return { loading, error, books, hasMore };
}
