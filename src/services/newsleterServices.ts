// src/services/newsletterService.ts
import { api } from './api';

export interface NewsletterSubscription {
  email: string;
  preferences?: {
    courseUpdates: boolean;
    promotions: boolean;
    newsletters: boolean;
  };
}

export const newsletterService = {
  async subscribe(data: NewsletterSubscription) {
    const response = await api.post('/newsletter/subscribe', data);
    return response.data;
  },

  async unsubscribe(email: string) {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response.data;
  },

  async updatePreferences(email: string, preferences: NewsletterSubscription['preferences']) {
    const response = await api.put('/newsletter/preferences', { email, preferences });
    return response.data;
  }
};