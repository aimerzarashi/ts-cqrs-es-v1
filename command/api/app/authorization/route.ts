import { redirect } from 'next/navigation'

export async function GET() {
  return redirect('/callback?code=123&state=abc');
}