import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'

export const useGetAllTestimonials = (onSuccess) => {
  return useQuery('getAllTestimonials', () => {
    return axios.get('http://localhost:8000/api/v1/testimonials')
  },{
    onSuccess: onSuccess
  })
}

export const useCreateTestimonial = (onSuccess, onError) => {
  const token = useSelector((state) => state.auth.accessToken)
  const queryClient = useQueryClient()
  return useMutation('createTestimonial', (data) => {
    return axios.post('http://localhost:8000/api/v1/testimonials', data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }, {
    enabled: !!token,
    onSuccess: () => {
      queryClient.invalidateQueries('getAllTestimonials')
      onSuccess()
    },
    onError: onError
  })
}