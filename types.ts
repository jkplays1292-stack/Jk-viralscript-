
import React from 'react';

export type UserType = 'Free' | 'Basic' | 'Pro';

export interface UserProfile {
  id: string;
  email?: string;
  phone_number?: string;
  ip_address: string;
  credits_balance: number;
  user_type: UserType;
}

export interface VisualScene {
  timestamp: string;
  description: string;
}

export interface ViralScript {
  id: string;
  topic: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  seo_tags: string[];
  visual_scenes: VisualScene[];
  estimated_seconds: number;
  generated_at: number;
  viral_score: number;
  analysis: {
    hook_strength: string;
    retention_factor: string;
    global_appeal: string;
  };
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
