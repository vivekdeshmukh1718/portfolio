
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// IMPORTANT: Move this API key to an environment variable (e.g., .env file)
// and access it via process.env.RESEND_API_KEY in a real application.
// Example: const resend = new Resend(process.env.RESEND_API_KEY);
const RESEND_API_KEY = 're_F4SZfMn2_2dKFrAK2VrwpGch73n2E7jgS';
const resend = new Resend(RESEND_API_KEY);

// You should ideally use a "from" address on a domain you control and have verified with Resend.
const FROM_EMAIL = 'onboarding@resend.dev'; 
const TO_EMAIL = 'vivekdeshmukh1718@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields: name, email, and message are required.' }, { status: 400 });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        reply_to: email, // Set the sender's email as the reply-to address
      });

      if (error) {
        console.error('Resend API Error:', error);
        return NextResponse.json({ error: 'Failed to send email due to Resend API error.', details: error.message }, { status: 500 });
      }

      console.log('Email sent successfully via Resend:', data);
      return NextResponse.json({ 
        success: true, 
        message: "Message sent successfully! Thank you for reaching out." 
      });

    } catch (apiError: any) {
      console.error('Error sending email with Resend:', apiError);
      return NextResponse.json({ error: 'Internal server error while attempting to send email.', details: apiError.message || 'Unknown error' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Error processing contact form submission:', error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Invalid request body: Could not parse JSON.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error while processing your message.', details: error.message || 'Unknown error' }, { status: 500 });
  }
}
