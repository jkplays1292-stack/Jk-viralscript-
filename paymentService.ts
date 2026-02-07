
import { UserProfile, UserType } from '../types';

declare var Razorpay: any;

interface PaymentOptions {
  amount: number;
  tier: UserType;
  user: UserProfile;
  onSuccess: (response: any) => void;
  onCancel?: () => void;
}

export const initializeRazorpayPayment = (options: PaymentOptions) => {
  const { amount, tier, user, onSuccess, onCancel } = options;

  const config = {
    key: "rzp_test_YOUR_KEY_HERE", // Replace with your actual Razorpay Key ID
    amount: amount * 100, // Amount is in paise
    currency: "INR",
    name: "ViralScript AI",
    description: `Upgrade to ${tier} Membership`,
    image: "https://cdn-icons-png.flaticon.com/512/2111/2111644.png", // Your logo URL
    handler: function(response: any) {
      // This is called on successful payment
      onSuccess(response);
    },
    prefill: {
      name: user.email?.split('@')[0] || "Creator",
      email: user.email || "",
      contact: user.phone_number || ""
    },
    notes: {
      userId: user.id,
      tier: tier
    },
    theme: {
      color: "#06b6d4" // Cyan-500
    },
    modal: {
      ondismiss: function() {
        if (onCancel) onCancel();
      }
    }
  };

  const rzp = new Razorpay(config);
  rzp.open();
};
