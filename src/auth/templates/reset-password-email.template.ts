export function buildResetPasswordEmailHtml(data: {
  name: string;
  resetUrl: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>
  <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@900&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'DM Sans',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #222;">
              <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#555;font-weight:500;">
                Portfolio Admin
              </p>
              <p style="margin:0;font-family:'Big Shoulders Display',Arial,sans-serif;font-weight:900;font-size:48px;line-height:0.95;letter-spacing:-0.04em;color:#2b00ff;">
                RESET<br/>PASSWORD
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:28px 0;border-bottom:1px solid #222;">
              <p style="margin:0 0 6px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#444;font-weight:500;">Halo</p>
              <p style="margin:0;font-size:15px;font-weight:500;color:#ffffff;">${data.name}</p>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:28px 0;border-bottom:1px solid #222;">
              <p style="margin:0 0 12px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#444;font-weight:500;">Informasi</p>
              <p style="margin:0;font-size:15px;line-height:1.8;color:#aaaaaa;font-weight:300;">
                Anda menerima email ini karena ada permintaan reset password untuk akun admin portfolio Anda.
                Klik tombol di bawah untuk membuat password baru.
              </p>
              <p style="margin:16px 0 0 0;font-size:13px;line-height:1.8;color:#555;font-weight:300;">
                Link ini hanya berlaku selama <span style="color:#aaa;font-weight:500;">1 jam</span>.
                Jika Anda tidak merasa meminta reset password, abaikan email ini.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 0 0 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#ffffff;border-radius:100px;">
                    <a href="${data.resetUrl}"
                      style="display:inline-block;padding:12px 28px;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.08em;color:#0a0a0a;text-decoration:none;">
                      Reset Password ↗
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0 0;font-size:11px;color:#333;">
                Atau copy link ini ke browser:<br/>
                <a href="${data.resetUrl}" style="color:#555;word-break:break-all;">${data.resetUrl}</a>
              </p>
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
                      Junior Frontend Developer · Bandung, Indonesia
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
