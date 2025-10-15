import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { createDemoUserOnly } from '@/endpoints/seed/create-demo-user-only'

export const maxDuration = 30

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    // Create a basic request object for the Local API
    const payloadReq = await createLocalReq({}, payload)

    // Create only the demo user
    await createDemoUserOnly({ payload, req: payloadReq })

    return Response.json({
      success: true,
      message: 'Demo user created successfully',
      credentials: {
        email: 'demo-author@example.com',
        password: 'password',
      },
    })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error creating demo user' })
    return new Response('Error creating demo user.', { status: 500 })
  }
}
