
import { UserProfile, UserType } from '../types';

const DB_KEY = 'viralscript_mock_db';
const SESSION_KEY = 'viralscript_session';
const OTP_STORE_KEY = 'viralscript_pending_otps';

interface MockDB {
  users: UserProfile[];
  ips: Record<string, string>; // ip -> user_id
}

interface PendingOTP {
  identifier: string; // email or phone
  code: string;
  expires: number;
}

const getDB = (): MockDB => {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : { users: [], ips: {} };
};

const saveDB = (db: MockDB) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const getPublicIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return '127.0.0.1';
  }
};

export const authService = {
  getCurrentUser: (): UserProfile | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  // Generic OTP Requester (Email or Phone)
  requestOTP: async (identifier: string): Promise<string> => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const otps: PendingOTP[] = JSON.parse(localStorage.getItem(OTP_STORE_KEY) || '[]');
    
    const newOtp = {
      identifier,
      code,
      expires: Date.now() + (5 * 60 * 1000)
    };
    
    localStorage.setItem(OTP_STORE_KEY, JSON.stringify([...otps.filter(o => o.identifier !== identifier), newOtp]));
    
    if (identifier.includes('@')) {
      console.log(`[MOCK EMAIL] To: ${identifier} | OTP: ${code}`);
    } else {
      console.log(`[MOCK SMS] To: ${identifier} | OTP: ${code}`);
    }
    
    return code; 
  },

  // Generic Verifier
  verifyOTP: async (identifier: string, code: string): Promise<UserProfile> => {
    const otps: PendingOTP[] = JSON.parse(localStorage.getItem(OTP_STORE_KEY) || '[]');
    const validOtp = otps.find(o => o.identifier === identifier && o.code === code && o.expires > Date.now());
    
    if (!validOtp) throw new Error('Invalid or expired OTP code.');

    localStorage.setItem(OTP_STORE_KEY, JSON.stringify(otps.filter(o => o.identifier !== identifier)));

    const db = getDB();
    const isEmail = identifier.includes('@');
    
    let user = db.users.find(u => isEmail ? u.email === identifier : u.phone_number === identifier);
    
    if (!user) {
      const ip = await getPublicIP();
      const existingUserWithIp = db.users.find(u => u.ip_address === ip);
      if (existingUserWithIp) throw new Error('Security Alert: Multiple accounts detected from this device.');

      user = {
        id: Math.random().toString(36).substr(2, 9),
        email: isEmail ? identifier : undefined,
        phone_number: isEmail ? undefined : identifier,
        ip_address: ip,
        credits_balance: 100,
        user_type: 'Free'
      };
      
      db.users.push(user);
      db.ips[ip] = user.id;
      saveDB(db);
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  // Mock Google Login
  loginWithGoogle: async (email: string): Promise<UserProfile> => {
    const db = getDB();
    let user = db.users.find(u => u.email === email);
    
    if (!user) {
      const ip = await getPublicIP();
      user = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        ip_address: ip,
        credits_balance: 100,
        user_type: 'Free'
      };
      db.users.push(user);
      saveDB(db);
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateCredits: async (userId: string, amount: number): Promise<number> => {
    const db = getDB();
    const user = db.users.find(u => u.id === userId);
    if (!user) throw new Error('User session expired.');
    
    user.credits_balance += amount;
    saveDB(db);
    
    const session = authService.getCurrentUser();
    if (session && session.id === userId) {
      session.credits_balance = user.credits_balance;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    
    return user.credits_balance;
  },

  upgradeUser: async (userId: string, tier: UserType): Promise<void> => {
    const db = getDB();
    const user = db.users.find(u => u.id === userId);
    if (!user) throw new Error('User session expired.');
    
    user.user_type = tier;
    if (tier === 'Basic') user.credits_balance += 500;
    if (tier === 'Pro') user.credits_balance += 2000;
    
    saveDB(db);

    const session = authService.getCurrentUser();
    if (session && session.id === userId) {
      session.user_type = tier;
      session.credits_balance = user.credits_balance;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  }
};
