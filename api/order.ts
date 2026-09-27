import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;

  if (!scriptUrl || !secret) {
    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
    });
  }

  try {
    const {
      fullName,
      phoneNumber,
      fullAddress,
      quantity,
      totalPrice,
    } = req.body;

    const response = await fetch(scriptUrl, {
      method: 'POST',
      body: new URLSearchParams({
        fullName: String(fullName),
        phoneNumber: String(phoneNumber),
        fullAddress: String(fullAddress),
        quantity: String(quantity),
        totalPrice: String(totalPrice),

        // Secret is added ONLY on the server
        secret,
      }),
    });

    const result = await response.json();

    return res.status(response.status).json(result);
  } catch (error) {
    console.error('Order API error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to submit order',
    });
  }
}