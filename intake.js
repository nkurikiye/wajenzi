const intakeEndpoints = {
  company: '',
  investor: '',
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
