import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url: string) => {
  const [data, setData] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setError(false)
      setLoading(true)
      try {
        const response = await axios.get(url)
        setData(response.data)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        setError(true)
      }
    }
    fetchData()
  }, [url])

  const reFetch = async () => {
    setError(false)
    setLoading(true)
    try {
      const response = await axios.get(url)
      setData(response.data)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setError(true)
    }
  }

  return {data,loading,error,reFetch}
}

export default useFetch;