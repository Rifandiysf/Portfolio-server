export function buildContactEmailHtml(data: {
  name: string;
  email: string;
  message: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Portfolio Contact</title>
  <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=Manrope:wght@300;400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Manrope',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #222;">
              <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#555;font-weight:500;">
                Portfolio Contact
              </p>
              <p style="margin:0;font-family:'Big Shoulders Display',Arial,sans-serif;font-weight:900;font-size:48px;line-height:0.95;letter-spacing:-0.04em;color:#2b00ff;">
                NEW<br/>MESSAGE
              </p>
            </td>
          </tr>

          <!-- Meta info -->
          <tr>
            <td style="padding:28px 0;border-bottom:1px solid #222;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="50%" style="vertical-align:top;padding-right:16px;">
                    <p style="margin:0 0 6px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#444;font-weight:500;">From</p>
                    <p style="margin:0;font-size:15px;font-weight:500;color:#ffffff;">${data.name}</p>
                  </td>
                  <td width="50%" style="vertical-align:top;padding-left:16px;">
                    <p style="margin:0 0 6px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#444;font-weight:500;">Email</p>
                    <p style="margin:0;font-size:15px;font-weight:500;color:#ffffff;">${data.email}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:28px 0;border-bottom:1px solid #222;">
              <p style="margin:0 0 12px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#444;font-weight:500;">Message</p>
              <p style="margin:0;font-size:15px;line-height:1.8;color:#aaaaaa;font-weight:300;">
                ${data.message}
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 0 0 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#ffffff;border-radius:100px;">
                    <a href="mailto:${data.email}"
                      style="display:inline-block;padding:12px 28px;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;color:#0a0a0a;text-decoration:none;">
                      Reply to ${data.name} ↗
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:48px;border-top:1px solid #222;margin-top:48px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0;font-family:'Big Shoulders Display',Arial,sans-serif;font-weight:900;font-size:22px;letter-spacing:-0.02em;color:#222;">
                      RIFANDIYSF.
                    </p>
                    <p style="margin:4px 0 0 0;font-size:11px;color:#444;text-transform:uppercase;letter-spacing:0.1em;">
                    Frontend Developer · Bandung, Indonesia
                    </p>
                  </td>
                  <td align="right" style="vertical-align:bottom;">
                    <p style="margin:0;font-size:11px;color:#333;text-transform:uppercase;letter-spacing:0.08em;">
                      rifandiysf.vercel.app
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
