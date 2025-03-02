import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'yzcnwhvu',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01'
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
} 