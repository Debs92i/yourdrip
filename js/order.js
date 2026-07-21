// Soumission du formulaire de commande (démo, sans backend)
const orderForm = document.getElementById('orderForm');
const orderSuccess = document.getElementById('orderSuccess');
const paymentInputs = document.querySelectorAll('input[name="paiement"]');
const recapPaymentMethod = document.getElementById('recapPaymentMethod');
const successPaymentNote = document.getElementById('successPaymentNote');

function methodLabel(value) {
  return value === 'wave' ? 'Wave' : 'Orange Money';
}

paymentInputs.forEach(input => {
  input.addEventListener('change', () => {
    if (recapPaymentMethod) recapPaymentMethod.textContent = methodLabel(input.value);
  });
});

if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="paiement"]:checked');
    const label = methodLabel(selected ? selected.value : 'orange');

    if (successPaymentNote) {
      successPaymentNote.textContent = `Merci ! Notre équipe commence la conception de ta maquette. Dès qu'elle sera validée, tu recevras une demande de paiement de l'avance (4 000 F) via ${label} — rien n'est débité maintenant.`;
    }

    orderForm.hidden = true;
    document.querySelector('.order-recap')?.setAttribute('hidden', '');
    if (orderSuccess) orderSuccess.classList.add('is-visible');
    orderSuccess?.removeAttribute('hidden');
    orderSuccess?.scrollIntoView({ behavior: 'smooth' });
  });
}

