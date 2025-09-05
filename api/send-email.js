import { Resend } from 'resend';
import { generateDemoEmailTemplate } from './email.js';
// Instancia de Resend con tu API Key
const resend = new Resend(process.env.RESEND_API_KEY); 

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido, use POST' });
  }

  const { name, email, asunto, message, from } = req.body;

  try {
    if (from === 'demo'){
      const demoEmailHtml = generateDemoEmailTemplate(name);
      // Envía el correo utilizando Resend
      await resend.batch.send([
        {
        from: 'info@smartcoopcr.com',  // Usa un correo autorizado en Resend
        to: 'contacto@smartcoopcr.com',
        subject: `${asunto} - ${name}`,
        text: `Detalles:\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      },
      {
        from: 'contacto@smartcoopcr.com',
        to: 'juandiegomatute11@gmail.com',
        subject: 'Demo SmartCoop',
        html: demoEmailHtml,
      },
      ]);

      return res.status(200).json({ message: 'Correo enviado exitosamente' });
    }else{
      // Envía el correo utilizando Resend
      await resend.emails.send({
        from: 'info@smartcoopcr.com',  // Usa un correo autorizado en Resend
        to: 'contacto@smartcoopcr.com',
        subject: `Mensaje de contacto - ${asunto}`,
        text: `Detalles:\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
      });

      return res.status(200).json({ message: 'Correo enviado exitosamente' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar el correo' });
  }
}
