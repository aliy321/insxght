import type { Payload, PayloadRequest } from 'payload'

export const createDemoUserOnly = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Creating demo user...')

  // First, check if demo user already exists
  const existingUser = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  if (existingUser.docs.length > 0) {
    payload.logger.info('Demo user already exists!')
    payload.logger.info('Email: demo-author@example.com')
    payload.logger.info('Password: password')
    return
  }

  // Delete any existing demo user first (from the original seed logic)
  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  // Create the demo user
  const demoUser = await payload.create({
    collection: 'users',
    data: {
      name: 'Demo Author',
      email: 'demo-author@example.com',
      password: 'password',
    },
  })

  payload.logger.info('✅ Demo user created successfully!')
  payload.logger.info('Email: demo-author@example.com')
  payload.logger.info('Password: password')
  payload.logger.info(`User ID: ${demoUser.id}`)
}
