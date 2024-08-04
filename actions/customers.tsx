'use server'

interface IGetCustomer {
  token: string
  customer_id: number
}

interface IUpdateCustomer {
  obj: object,
  customer_id: number,
  token: string
}

interface IAddCustomer {
  token: string
  obj: object,
}

async function GetCustomers(token: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:5000/api/customer', {
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

async function updateCustomer(data: IUpdateCustomer): Promise<any> {
  try{
      const response = await fetch(`http://localhost:5000/api/customer/${data.customer_id}`, {
          method: 'PATCH',
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

async function addCustomer(data: IAddCustomer): Promise<any> {
  try{
      const response = await fetch('http://localhost:5000/api/customer/', {
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

async function GetCustomer(data: IGetCustomer): Promise<any> {
  try{
      const { token, customer_id } = data
      const response = await fetch(`http://localhost:5000/api/customer/${customer_id}`, {
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

export { addCustomer, GetCustomers, updateCustomer, GetCustomer }