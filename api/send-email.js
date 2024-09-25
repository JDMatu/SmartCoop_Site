import { Resend } from 'resend';

// Instancia de Resend con tu API Key
const resend = new Resend(process.env.RESEND_API_KEY); 

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido, use POST' });
  }

  const { name, email, message } = req.body;

  try {
    // Envía el correo utilizando Resend
    await resend.emails.send({
      from: 'contacto@smartcoopcr.com',  // Usa un correo autorizado en Resend
      to: email,
      subject: `Nuevo mensaje de ${name}`,
      text: `Detalles:\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    });

    return res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al enviar el correo' });
  }
}
