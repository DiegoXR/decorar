import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

// Webhook URL from private environment variable with fallback
// En producción, asegúrate de configurar la variable NEWSLETTER_WEBHOOK_URL en el archivo .env
const WEBHOOK_URL = env.NEWSLETTER_WEBHOOK_URL || '';

console.log("WEBHOOK_URL: ", WEBHOOK_URL);

// Verificar que la URL del webhook esté definida
if (!WEBHOOK_URL) {
    console.error('NEWSLETTER_WEBHOOK_URL environment variable is not defined');
}
export const POST: RequestHandler = async ({ request }) => {
    console.log('Newsletter API endpoint called');
    
    try {
        // Obtener datos del formulario
        const data = await request.json();
        console.log('Received data:', data);
        
        // Validar email
        const email = data.email;
        if (!email || !email.includes('@')) {
            console.log('Invalid email:', email);
            return json({ success: false, message: 'Invalid Email' }, { status: 400 });
        }
        
        // Preparar datos para n8n en el formato requerido
        const payload = [{ email }];
        console.log('Sending payload to n8n:', payload);
        
        try {
            // Verificar que la URL del webhook esté definida y no esté vacía
            if (!WEBHOOK_URL) {
                console.error('Cannot send to webhook: NEWSLETTER_WEBHOOK_URL is not defined');
                return json({ 
                    success: false, 
                    message: 'Newsletter service is not configured properly', 
                    details: 'Missing webhook URL configuration'
                }, { status: 500 });
            }
            
            // Enviar a n8n webhook
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            console.log('n8n response status:', response.status);
            
            if (!response.ok) {
                const responseText = await response.text();
                console.error('Error from n8n:', response.status, response.statusText, responseText);
                return json({ 
                    success: false, 
                    message: 'Error processing subscription', 
                    details: `${response.status}: ${response.statusText}`
                }, { status: 500 });
            }
            
            // Respuesta exitosa
            console.log('Subscription successful');
            return json({ success: true, message: 'Subscription successful' });
            
        } catch (fetchError) {
            console.error('Fetch error to n8n:', fetchError);
            return json({ 
                success: false, 
                message: 'Error connecting to subscription service', 
                details: fetchError instanceof Error ? fetchError.message : String(fetchError)
            }, { status: 500 });
        }
        
    } catch (error) {
        console.error('Server error:', error);
        return json({ 
            success: false, 
            message: 'Internal server error', 
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
};
