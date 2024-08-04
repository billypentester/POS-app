'use server'

interface IAddOrder {
  token: string
  obj: object,
}

async function addOrder(data: IAddOrder): Promise<any> {
    try{
        const response = await fetch('http://localhost:5000/api/order', {
            method: 'POST',
            body: JSON.stringify(data.obj),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + data.token
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

async function GetOrders(token: string): Promise<any> {
  try{
      const response = await fetch('http://localhost:5000/api/order', {
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

export { addOrder, GetOrders }