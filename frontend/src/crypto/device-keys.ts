/**
 * Device key management — E2E encryption public/private keypair.
 *
 * The private key NEVER leaves this module and NEVER touches the API.
 * Only the public key is registered with the server (POST /devices).
 *
 * Implementation: Phase 6 (matrix-js-sdk + Olm).
 * This file is a typed placeholder so the import graph is established.
 */

import * as SecureStore from 'expo-secure-store';

const PRIVATE_KEY_STORE_KEY = 'e2e_private_key';
const PUBLIC_KEY_STORE_KEY = 'e2e_public_key';

/**
 * Generates an E2E keypair and stores the private key in SecureStore.
 * Returns the public key for registration with the server.
 *
 * Idempotent — if keys already exist, returns the existing public key.
 */
export async function getOrCreateDeviceKeys(): Promise<{ publicKey: string }> {
  const existingPublicKey = await SecureStore.getItemAsync(PUBLIC_KEY_STORE_KEY);
  if (existingPublicKey) {
    return { publicKey: existingPublicKey };
  }

  // TODO Phase 6: Replace with real Olm keypair generation.
  // Olm.Account.generate_one_time_keys() → extract identity key → store private
  throw new Error('getOrCreateDeviceKeys: Olm implementation pending Phase 6');
}

/**
 * Retrieves the stored private key.
 * Returns null if no key has been generated yet.
 */
export async function getPrivateKey(): Promise<string | null> {
  return SecureStore.getItemAsync(PRIVATE_KEY_STORE_KEY);
}

/**
 * Clears stored keys — called on sign-out.
 * The server should also be notified to invalidate the device record.
 */
export async function clearDeviceKeys(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(PRIVATE_KEY_STORE_KEY),
    SecureStore.deleteItemAsync(PUBLIC_KEY_STORE_KEY),
  ]);
}
