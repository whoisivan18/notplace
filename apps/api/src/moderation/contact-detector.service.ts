import { Injectable } from '@nestjs/common';

const CONTACT_PATTERNS = [
  /\+7\d{10}/,
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
  /(t\.me|telegram\.me|wa\.me|discord\.gg|vk\.com)/i,
];

@Injectable()
export class ContactDetectorService {
  containsForbiddenContact(text: string): boolean {
    return CONTACT_PATTERNS.some((re) => re.test(text));
  }
}
