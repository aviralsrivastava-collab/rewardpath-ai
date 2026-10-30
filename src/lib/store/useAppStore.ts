import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SpendState {
  dining: number;
  groceries: number;
  travel: number;
  gas: number;
  shopping: number;
}

export interface PortfolioItem {
  cardId: string;
  points: number;
  renewalMonth: string;
  annualSpend: number;
}

interface AppState {
  // Theme
  theme: "dark" | "light" | "system";
  setTheme: (theme: "dark" | "light" | "system") => void;

  // Calculator Spend
  spend: SpendState;
  setSpendCategory: (category: keyof SpendState, value: number) => void;
  applyPreset: (preset: "salaried" | "travel" | "shopper") => void;

  // Comparison
  comparisonCardIds: string[];
  toggleComparisonCard: (cardId: string) => void;

  // User Wallet
  walletCardIds: string[];
  toggleWalletCard: (cardId: string) => void;

  // Portfolio & Milestones
  portfolio: PortfolioItem[];
  addPortfolioCard: (cardId: string) => void;
  updatePortfolioItem: (cardId: string, data: Partial<PortfolioItem>) => void;
  removePortfolioCard: (cardId: string) => void;

  // AI Advisor slide-over
  isAdvisorOpen: boolean;
  advisorQuery: string;
  openAdvisor: (query?: string) => void;
  closeAdvisor: () => void;

  // Scroll Progress (0 to 1)
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => set({ theme }),

      spend: {
        dining: 15000,
        groceries: 25000,
        travel: 20000,
        gas: 10000,
        shopping: 30000,
      },
      setSpendCategory: (category, value) =>
        set((state) => ({
          spend: { ...state.spend, [category]: value },
        })),
      applyPreset: (preset) => {
        if (preset === "salaried") {
          set({
            spend: {
              dining: 12000,
              groceries: 20000,
              travel: 8000,
              gas: 6000,
              shopping: 18000,
            },
          });
        } else if (preset === "travel") {
          set({
            spend: {
              dining: 25000,
              groceries: 15000,
              travel: 65000,
              gas: 8000,
              shopping: 30000,
            },
          });
        } else if (preset === "shopper") {
          set({
            spend: {
              dining: 18000,
              groceries: 35000,
              travel: 10000,
              gas: 5000,
              shopping: 55000,
            },
          });
        }
      },

      comparisonCardIds: ["hdfc-infinia-metal", "axis-atlas", "sbi-cashback"],
      toggleComparisonCard: (cardId) =>
        set((state) => {
          if (state.comparisonCardIds.includes(cardId)) {
            if (state.comparisonCardIds.length <= 1) return state; // Keep at least 1
            return {
              comparisonCardIds: state.comparisonCardIds.filter((id) => id !== cardId),
            };
          }
          if (state.comparisonCardIds.length >= 3) {
            // Replace the oldest
            return {
              comparisonCardIds: [...state.comparisonCardIds.slice(1), cardId],
            };
          }
          return { comparisonCardIds: [...state.comparisonCardIds, cardId] };
        }),

      walletCardIds: ["hdfc-infinia-metal", "axis-atlas"],
      toggleWalletCard: (cardId) =>
        set((state) => ({
          walletCardIds: state.walletCardIds.includes(cardId)
            ? state.walletCardIds.filter((id) => id !== cardId)
            : [...state.walletCardIds, cardId],
        })),

      portfolio: [
        {
          cardId: "hdfc-infinia-metal",
          points: 54000,
          renewalMonth: "November",
          annualSpend: 780000,
        },
        {
          cardId: "axis-atlas",
          points: 21500,
          renewalMonth: "March",
          annualSpend: 420000,
        },
        {
          cardId: "amex-plat-travel",
          points: 40000,
          renewalMonth: "August",
          annualSpend: 390000,
        },
      ],
      addPortfolioCard: (cardId) =>
        set((state) => {
          if (state.portfolio.some((p) => p.cardId === cardId)) return state;
          return {
            portfolio: [
              ...state.portfolio,
              {
                cardId,
                points: 10000,
                renewalMonth: "January",
                annualSpend: 150000,
              },
            ],
          };
        }),
      updatePortfolioItem: (cardId, data) =>
        set((state) => ({
          portfolio: state.portfolio.map((item) =>
            item.cardId === cardId ? { ...item, ...data } : item
          ),
        })),
      removePortfolioCard: (cardId) =>
        set((state) => ({
          portfolio: state.portfolio.filter((item) => item.cardId !== cardId),
        })),

      isAdvisorOpen: false,
      advisorQuery: "",
      openAdvisor: (query = "") =>
        set({ isAdvisorOpen: true, advisorQuery: query }),
      closeAdvisor: () => set({ isAdvisorOpen: false }),

      scrollProgress: 0,
      setScrollProgress: (scrollProgress) => set({ scrollProgress }),
    }),
    {
      name: "rewardpath-storage-v2",
      partialize: (state) => ({
        theme: state.theme,
        spend: state.spend,
        comparisonCardIds: state.comparisonCardIds,
        walletCardIds: state.walletCardIds,
        portfolio: state.portfolio,
      }),
    }
  )
);
