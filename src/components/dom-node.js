export function DomNode(template) {
  return isModern() ? modernBrowser(template) : legacyBrowser(template);
}

function isModern() {
  return document.createRange && document.createRange.createContextualFragment;
}

function modernBrowser(template) {
  return document.createRange()
    .createContextualFragment(template)
    .firstElementChild;
}

function legacyBrowser(template) {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstElementChild;
}
