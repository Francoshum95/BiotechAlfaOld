const Reg = (url) =>{
  return `
          <div style="max-width: 700px; font-size: 14px; background-color: black; padding: 1rem;">
            <div style="padding: 0.5rem; margin-top: -1rem;">
              <h3 style="font-weight:700;font-size:2rem;
                color: white; user-select: none;">BiotechAlfa
              </h3>
            </div>
            <div style="padding: 0.5rem; color: white">
              <h2 style="text-align: left; color: #fb8b1e;font-weight:600; margin-top:-0.2rem;font-size:2rem;">Welcome to the BiotechAlfa</h2>
              <p>Congratulations! You're almost set to start using BiotechAlfa.
                Just one more step. Click the following button to Registration.
              </p>

              <a href=${url} style="background: #fb8b1e;text-transform: uppercase;text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; border-radius: 10px;">Registration</a>

              <p>If you’re unable to click on the button above, please copy and paste the following link into your browser:</p>
              <div>${url}</div>
              <div style="margin-top:1.5rem;">
                <p>Sincerely,</p>
                <p style="color: #3B82F6; font-weight:700">The BiotechAlfa Team</p>
                <a href="https://www.biotechalfa.com"
                  style="text-decoration: none;color: white;">
                  biotechalfa.com
                </a>
              </div>
            </div>
          </div>
          `
} 

const Reset = (url)=> {
  return `
    <div style="max-width: 700px; font-size: 14px; background-color: black; padding: 1rem;">
      <div style="padding: 0.5rem; margin-top: -1rem;">
        <h3 style="font-weight:700;font-size:2rem;
          color: white; user-select: none;">BiotechAlfa
        </h3>
      </div>
      <div style="padding: 0.5rem; color: white">
        <h2 style="text-align: left; color: #fb8b1e;font-weight:600; margin-top:-0.2rem;font-size:2rem;">Rest Your Password</h2>
        <p>We received a request for a password change on your BiotechAlfa account.
          To reset your password,please click the following button to Reset.
        </p>

        <a href=${url} style="background: #fb8b1e;text-transform: uppercase;text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; border-radius: 10px;">Reset Your Password</a>

        <p>If you’re unable to click on the button above, please copy and paste the following link into your browser:</p>
        <div>${url}</div>

        <p>This link will expire in 15 minutes.After that,you'll need to submit a new request in order to reset your password.
        If you don't want to reset it,simply disregard this email</p>
        <div style="margin-top:1.5rem;">
          <p>Sincerely,</p>
          <p style="color: #3B82F6; font-weight:700">The BiotechAlfa Team</p>
          <a href="https://www.biotechalfa.com"
            style="text-decoration: none;color: white;">
            biotechalfa.com
          </a>
        </div>
      </div>
    </div>
  `
}

const SendUserId = (id)=> {
  return `
    <div style="max-width: 700px; font-size: 14px; background-color: black; padding: 1rem;">
      <div style="padding: 0.5rem; margin-top: -1rem;">
        <h3 style="font-weight:700;font-size:2rem;
          color: white; user-select: none;">BiotechAlfa
        </h3>
      </div>
      <div style="padding: 0.5rem; color: white">
        <h2 style="text-align: left; color: #fb8b1e;font-weight:600; margin-top:-0.2rem;font-size:2rem;">Welcome to the BiotechAlfa</h2>

        <h4>Hi ${id}, </h4>
        <p>We received a request for a forgot User Id on your BiotechAlfa account.
          For your referernce, your User Id is: ${id}
        </p>

        <div style="margin-top:1.5rem;">
          <p>Sincerely,</p>
          <p style="color: #3B82F6; font-weight:700">The BiotechAlfa Team</p>
          <a href="https://www.biotechalfa.com"
            style="text-decoration: none;color: white;">
            biotechalfa.com
          </a>
        </div>
      </div>
    </div>
  `
}

module.exports = {
  Reg,
  Reset,
  SendUserId 
}
