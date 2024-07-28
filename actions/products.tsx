'use server'

interface IGetProduct {
  token: string
  id: number
}

async function GetProducts(token: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:5000/api/inventory', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
      
          const responseData:any = await response.json()

          return {
            status: responseData.status,
            message: responseData.message,
            data: responseData.data
          }
    }
    catch(error: any){
        return {
          status: false,
          message: error.message,
          data: null
        }
    }
}

async function GetProduct(data: IGetProduct): Promise<any> {
  try{
      const { token, id } = data
      const response = await fetch(`http://localhost:5000/api/inventory/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
    
        const responseData:any = await response.json()

        return {
          status: responseData.status,
          message: responseData.message,
          data: responseData.data
        }
  }
  catch(error: any){
      return {
        status: false,
        message: error.message,
        data: null
      }
  }
}

export { GetProducts, GetProduct }