
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields: name, email, and message are required.' }, { status: 400 });
    }

    // SERVER-SIDE LOGGING (for demonstration)
    // TODO: Integrate a transactional email service (e.g., Resend, SendGrid, AWS SES) here.
    // This is where you'll use their SDK or API to send the email to 'vivekdeshmukh1718@gmail.com'.
    // Ensure API keys are stored securely as environment variables and accessed only on the server.

    console.log('--- Contact Form Submission Received ---');
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`Sender Name: ${name}`);
    console.log(`Sender Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Intended Recipient: vivekdeshmukh1718@gmail.com`);
    console.log('--- End of Submission ---');

    // Simulate email sending success for now.
    // Replace 'true' with the actual success status from your email service.
    const emailSentSuccessfully = true; 

    if (emailSentSuccessfully) {
      return NextResponse.json({ 
        success: true, 
        message: "Message received successfully. (Note: This is a simulation. Backend email integration is pending.)" 
      });
    } else {
      // This block would be hit if your email service reported a failure.
      return NextResponse.json({ error: 'Failed to send email (simulated backend failure).' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    // Differentiate between JSON parsing errors and other errors if possible
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Invalid request body: Could not parse JSON.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error while processing your message.' }, { status: 500 });
  }
}
