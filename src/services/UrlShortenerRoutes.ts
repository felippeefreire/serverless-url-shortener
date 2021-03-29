import { UrlShortenerService } from './UrlShortenerService';

export class UrlShortenerRoutes {
  public static async shorten(req, res): Promise<void> {
    const { long_url } = req.body;
    if (!long_url) {
      return res.sendStatus(400);
    }

    const item = await UrlShortenerService.saveOrGet(long_url);
    res.send(item);
  }

  public static async healthCheck(req, res): Promise<void> {
    res.send({
      ok: true,
    });
  }

  public static async redirect(req, res): Promise<void> {
    const { hash } = req.params;

    const originalUrl = await UrlShortenerService.getLongUrl(hash);
    if (!originalUrl) {
      return res.sendStatu(404);
    }

    res.redirect(301, originalUrl);
  }
}
