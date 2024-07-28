'use server'

interface LoginData {
    email: string
    password: string
}

async function LoginAccount(data: LoginData): Promise<any> {
    try{
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
      
          const responseData:any = await response.json()

          return {
            status: responseData.status,
            message: responseData.message,
            data: responseData.token
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

export { LoginAccount }