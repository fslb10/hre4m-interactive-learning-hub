const blockedInputTypes = new Set([
  'insertFromPaste',
  'insertFromPasteAsQuotation',
  'insertFromDrop',
  'deleteByCut',
]);

export function shouldBlockStudentWritingEvent(eventType: string, inputType = ''): boolean {
  return ['copy', 'cut', 'paste', 'drop'].includes(eventType) ||
    (eventType === 'beforeinput' && blockedInputTypes.has(inputType));
}

export function protectStudentWriting(node: HTMLTextAreaElement) {
  const blockClipboard = (event: Event) => {
    if (!shouldBlockStudentWritingEvent(event.type)) return;
    event.preventDefault();
    node.dataset.clipboardBlocked = 'true';
    window.setTimeout(() => delete node.dataset.clipboardBlocked, 1200);
  };

  const blockInsertedText = (event: InputEvent) => {
    if (!shouldBlockStudentWritingEvent(event.type, event.inputType)) return;
    event.preventDefault();
    node.dataset.clipboardBlocked = 'true';
    window.setTimeout(() => delete node.dataset.clipboardBlocked, 1200);
  };

  node.addEventListener('copy', blockClipboard);
  node.addEventListener('cut', blockClipboard);
  node.addEventListener('paste', blockClipboard);
  node.addEventListener('drop', blockClipboard);
  node.addEventListener('beforeinput', blockInsertedText);
  node.autocomplete = 'off';

  return {
    destroy() {
      node.removeEventListener('copy', blockClipboard);
      node.removeEventListener('cut', blockClipboard);
      node.removeEventListener('paste', blockClipboard);
      node.removeEventListener('drop', blockClipboard);
      node.removeEventListener('beforeinput', blockInsertedText);
    },
  };
}
