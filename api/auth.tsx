export async function POST(request: Request, response: Response) {
    const { email, password } = await request.json()
    console.log(email, password)

    return Response.json({ status: true, message: 'Login success', data: "token" }) 
}