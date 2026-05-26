(() => {
  const gates = document.querySelectorAll('.world-gate');
  const messages = {
    'Word Quest': 'Pages are drifting loose in the Word Realm.',
    'Monster Math Lab': 'Something odd is counting in the lab.',
    'The Wild Doors': 'Every trail hides a different kind of challenge.'
  };

  gates.forEach(gate => {
    gate.addEventListener('mouseenter', () => {
      const label = gate.querySelector('.gate-plaque')?.textContent?.trim();
      if (!label) return;
      gate.setAttribute('data-whisper', messages[label] || 'A door is waking up.');
    });
  });
})();
