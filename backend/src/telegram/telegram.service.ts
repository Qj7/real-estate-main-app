import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

export interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface ValidatedInitData {
  user?: TelegramWebAppUser;
  auth_date: number;
}

/**
 * Validates Telegram WebApp initData according to:
 * https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 */
@Injectable()
export class TelegramService {
  private readonly botToken: string;
  private readonly maxAuthAgeSec = 24 * 60 * 60; // 24 hours

  constructor(private config: ConfigService) {
    this.botToken = this.config.get<string>('TELEGRAM_BOT_TOKEN', '');
  }

  isConfigured(): boolean {
    return !!this.botToken;
  }

  /**
   * Validates initData and returns parsed user data if valid.
   * @throws Error if validation fails
   */
  validateInitData(initData: string): ValidatedInitData | null {
    if (!initData?.trim() || !this.botToken) {
      return null;
    }

    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) {
      return null;
    }

    // Build data-check-string: all params except hash, sorted by key, joined with \n
    params.delete('hash');
    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    // secret_key = HMAC_SHA256(key="WebAppData", data=bot_token)
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(this.botToken)
      .digest();

    // calculated_hash = HMAC_SHA256(secret_key, data_check_string)
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== hash) {
      return null;
    }

    const authDate = parseInt(params.get('auth_date') || '0', 10);
    if (authDate && Date.now() / 1000 - authDate > this.maxAuthAgeSec) {
      return null; // initData expired
    }

    const userStr = params.get('user');
    let user: TelegramWebAppUser | undefined;
    if (userStr) {
      try {
        user = JSON.parse(userStr) as TelegramWebAppUser;
      } catch {
        return null;
      }
    }

    return { user, auth_date: authDate };
  }

  /**
   * Configures the bot's menu button to open the Mini App.
   * Call after setting MINI_APP_URL and TELEGRAM_BOT_TOKEN.
   */
  async setMenuButton(menuText = 'Открыть приложение'): Promise<boolean> {
    const url = this.config.get<string>('MINI_APP_URL', '');
    if (!this.botToken || !url) {
      return false;
    }

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${this.botToken}/setChatMenuButton`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            menu_button: {
              type: 'web_app',
              text: menuText,
              web_app: { url },
            },
          }),
        }
      );
      const json = await res.json();
      return json.ok === true;
    } catch {
      return false;
    }
  }
}
