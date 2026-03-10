import { ProtocolConfig } from './sanitizeUrl';

const ATTR_WHITESPACE =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

export function isAllowedUri(uri: string | undefined, protocols?: ProtocolConfig) {
  const allowedProtocols: string[] = [
    'http',
    'https',
    'ftp',
    'ftps',
    'mailto',
    'tel',
    'callto',
    'sms',
    'cid',
    'xmpp',
  ];

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol = typeof protocol === 'string' ? protocol : protocol.scheme;

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }

  return (
    !uri ||
    uri.replace(ATTR_WHITESPACE, '').match(
      new RegExp(
        // eslint-disable-next-line no-useless-escape
        `^(?:(?:${allowedProtocols.join('|')}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`,
        'i'
      )
    )
  );
}
