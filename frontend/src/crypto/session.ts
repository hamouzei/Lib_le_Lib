/**
 * Olm session management — E2E encrypt/decrypt for chat messages.
 *
 * The server stores ONLY ciphertext + nonce. This module is the boundary
 * at which plaintext enters and exits the encryption layer.
 *
 * Implementation: Phase 6 (matrix-js-sdk + Olm/Megolm).
 * This file is a typed placeholder so the import graph is established.
 */

export interface EncryptedPayload {
  ciphertext: string; // base64-encoded
  nonce: string;      // base64-encoded
}

/**
 * Encrypts a plaintext message for delivery to a specific match.
 *
 * @param plaintext  The message content — never leaves the device unencrypted.
 * @param matchId    Used to look up the Olm session for this conversation.
 * @returns          The encrypted payload ready to POST to the messages API.
 */
export async function encryptMessage(
  plaintext: string,
  matchId: string,
): Promise<EncryptedPayload> {
  // TODO Phase 6: Replace with real Olm session encrypt.
  void matchId;
  void plaintext;
  throw new Error('encryptMessage: Olm implementation pending Phase 6');
}

/**
 * Decrypts a ciphertext received from the messages API.
 *
 * @param payload   The encrypted payload from the server.
 * @param matchId   Used to look up the Olm session for this conversation.
 * @returns         Decrypted plaintext string.
 */
export async function decryptMessage(
  payload: EncryptedPayload,
  matchId: string,
): Promise<string> {
  // TODO Phase 6: Replace with real Olm session decrypt.
  void payload;
  void matchId;
  throw new Error('decryptMessage: Olm implementation pending Phase 6');
}
