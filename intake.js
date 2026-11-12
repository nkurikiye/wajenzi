// Form backend: FormSubmit (no account needed — delivers to info@wajenzi.fund).
// First real submission triggers a one-time activation email to that inbox; click
// the link to turn delivery on. To switch to Formspree later, replace these with
// your https://formspree.io/f/<id> URLs.
const intakeEndpoints = {
  company: 'https://formsubmit.co/ajax/info@wajenzi.fund',
  investor: 'https://formsubmit.co/ajax/info@wajenzi.fund',
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
