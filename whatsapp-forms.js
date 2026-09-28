/*
 * Enquiry forms -> WhatsApp (hotfix, 2026-09-28)
 *
 * Forms marked with data-whatsapp-form open WhatsApp pre-filled with
 * everything the visitor typed, the same way Quick Booking on the home
 * page works. Nothing is sent anywhere else.
 */
(function () {
  var WHATSAPP = '918576000083';
  var PHONE_DISPLAY = '+91 85760 00083';
  var PHONE_TEL = '+918576000083';

  var TYPE_LABELS = {
    date: 'Date',
    time: 'Time',
    'datetime-local': 'Date and time',
    email: 'Email',
    tel: 'Phone',
    number: 'Number'
  };

  function clean(text) {
    return (text || '').replace(/\s+/g, ' ').replace(/[:*]\s*$/, '').trim();
  }

  function labelFor(field, form) {
    if (field.id) {
      var byFor = form.querySelector('label[for="' + field.id + '"]');
      if (byFor) return clean(byFor.textContent);
    }
    var parent = field.parentElement;
    if (parent && parent !== form) {
      var labels = parent.querySelectorAll('label');
      var fields = parent.querySelectorAll('input, select, textarea');
      if (labels.length === 1 && fields.length === 1) return clean(labels[0].textContent);
    }
    if (field.getAttribute('aria-label')) return clean(field.getAttribute('aria-label'));
    if (field.tagName === 'SELECT' && field.options.length && field.options[0].value === '') {
      return clean(field.options[0].text);
    }
    if (field.placeholder) return clean(field.placeholder);
    if (field.name) {
      var name = field.name.replace(/[_-]+/g, ' ');
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return TYPE_LABELS[field.type] || 'Details';
  }

  function valueOf(field) {
    if (field.disabled) return '';
    var type = (field.type || '').toLowerCase();
    if (field.tagName === 'SELECT') {
      if (field.selectedIndex < 0 || field.value === '') return '';
      return clean(field.options[field.selectedIndex].text);
    }
    if (type === 'hidden' || type === 'submit' || type === 'button' || type === 'reset' ||
        type === 'file' || type === 'password' || type === 'image') return '';
    if ((type === 'checkbox' || type === 'radio') && !field.checked) return '';
    return (field.value || '').trim();
  }

  function buildMessage(form) {
    var heading = document.querySelector('h1');
    var page = clean(heading ? heading.textContent : document.title);
    var lines = ['New enquiry from taxiverz.com', 'Page: ' + page];

    var selected = form.querySelector('#selectedCar');
    var selectedText = selected ? clean(selected.textContent) : '';
    if (selectedText && selectedText !== 'Selected Car') lines.push('For: ' + selectedText);

    lines.push('');
    var fields = form.querySelectorAll('input, select, textarea');
    for (var i = 0; i < fields.length; i++) {
      var value = valueOf(fields[i]);
      if (value) lines.push(labelFor(fields[i], form) + ': ' + value);
    }
    return lines.join('\n');
  }

  function showStatus(form) {
    var box = form.querySelector('.whatsapp-form-status');
    if (!box) {
      box = document.createElement('p');
      box.className = 'whatsapp-form-status';
      box.setAttribute('role', 'status');
      box.style.cssText = 'margin-top:1rem;font-size:0.95rem;line-height:1.5;';
      form.appendChild(box);
    }
    box.innerHTML = 'WhatsApp has opened with your details. Press <strong>Send</strong> in WhatsApp to reach us. ' +
      'No WhatsApp? Call <a href="tel:' + PHONE_TEL + '">' + PHONE_DISPLAY + '</a>.';
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(buildMessage(form));
    var win = window.open(url, '_blank');
    if (win) {
      try { win.opener = null; } catch (e) { /* ignore */ }
    } else {
      window.location.href = url;
    }
    showStatus(form);
  }

  var forms = document.querySelectorAll('form[data-whatsapp-form]');
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', handleSubmit);
  }
})();
