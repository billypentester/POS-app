export async function POST(request: Request, response: Response) {
    const { email, password } = await request.json()

    return Response.json({ status: true, message: 'Login success', data: "token" }) 
}