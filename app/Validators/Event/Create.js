class Create {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      localization: 'required',
      event_date: 'required|date',
    };
  }

  get messages() {
    return {
      'title.required': 'O título é obrigatório',
      'localization.required': 'A localização é obrigatória',
      'event_date.required': 'A data do evento é obrigatória',
      'event_date.date': 'A Data do evento não está no formato correto',
    };
  }
}

module.exports = Create;
