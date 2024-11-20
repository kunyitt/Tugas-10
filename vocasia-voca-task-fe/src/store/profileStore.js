import { create } from "zustand";
import { getProfile, updateProfile } from "../api/network";

const initialState = {
  profile: null,
  error: null,
  isLoading: false,
};

export const useProfileStore = create((set) => ({
  ...initialState,
  getProfile: async () => {
    try {
      set({ isLoading: false, error: null });

      const { data } = await getProfile();
      set({ profile: data });
    } catch (error) {
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await updateProfile(profileData);
      set ({profile: response.data});
    } catch (err) {
      set({err})
    } finally {
      set({isLoading: false});
    }
  },

  reset: () => {
    set(initialState);
  },
}));
