import { Router } from 'express';
import { UrlShortenerRoutes } from '../services/UrlShortenerRoutes';

export default (router: Router): Router => {
  router.post('/shorten', UrlShortenerRoutes.shorten);

  router.get('/health/check', UrlShortenerRoutes.healthCheck);

  router.get('/:hash', UrlShortenerRoutes.redirect);

  return router;
};
