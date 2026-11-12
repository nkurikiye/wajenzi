// Form backend: Formspree (forms "Company enquiry" / "Investor enquiry").
// Notifications currently go to the account email; to send them to
// info@wajenzi.fund, add it under Formspree → Account → Linked Emails (verify
// once), then set it as each form's recipient.
const intakeEndpoints = {
  company: 'https://formspree.io/f/xljbddwj',
  investor: 'https://formspree.io/f/maeonnlw',
};

const intake = document.querySelector('[data-intake]');
const endpoint = intakeEndpoints[intake.dataset.intake];

if (endpoint) {
  const submit = intake.querySelector('button[type="submit"]');
  const status = intake.querySelector('[role="status"]');
  intake.action = endpoint;
  submit.disabled = false;
  status.textContent = '';

  intake.addEventListener('submit', async (event) => {
    event.preventDefault();
    submit.disabled = true;
    status.textContent = '';

    try {
      const response = await fetch(intake.action, {
        method: 'POST',
        body: new FormData(intake),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Submission failed');
      intake.reset();
      status.textContent = intake.dataset.success;
    } catch {
      status.textContent = intake.dataset.failure;
    } finally {
      submit.disabled = false;
    }
  });
}
