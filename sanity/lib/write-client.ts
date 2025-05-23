import "server-only"
// This file is used to create a client for writing data to Sanity.

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token
})

if(!writeClient.config().token){
    throw new Error("Write token not found.")
}
