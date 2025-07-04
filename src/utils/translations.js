export const translations = {
  'pt-br': {
    title: 'Portal de Reflexões Diárias A.A.',
    previous: 'Anterior',
    today: 'Hoje',
    next: 'Próximo',
    loading: 'Carregando reflexão...',
    errorTitle: 'Erro ao carregar reflexão',
    notFoundTitle: 'Reflexão não encontrada',
    notFoundMessage: 'Não foi possível encontrar uma reflexão para esta data.',
  },
  'en': {
    title: 'A.A. Daily Reflections Portal',
    previous: 'Previous',
    today: 'Today',
    next: 'Next',
    loading: 'Loading reflection...',
    errorTitle: 'Error loading reflection',
    notFoundTitle: 'Reflection not found',
    notFoundMessage: 'Could not find a reflection for this date.',
  },
  'fr': {
    title: 'Portail des Réflexions Quotidiennes A.A.',
    previous: 'Précédent',
    today: 'Aujourd\'hui',
    next: 'Suivant',
    loading: 'Chargement de la réflexion...',
    errorTitle: 'Erreur lors du chargement de la réflexion',
    notFoundTitle: 'Réflexion non trouvée',
    notFoundMessage: 'Impossible de trouver une réflexion pour cette date.',
  },
  'es': {
    title: 'Portal de Reflexiones Diarias A.A.',
    previous: 'Anterior',
    today: 'Hoy',
    next: 'Siguiente',
    loading: 'Cargando reflexión...',
    errorTitle: 'Error al cargar reflexión',
    notFoundTitle: 'Reflexión no encontrada',
    notFoundMessage: 'No se pudo encontrar una reflexión para esta fecha.',
  },
};

export const useTranslation = (language) => {
  return translations[language] || translations['pt-br'];
};
