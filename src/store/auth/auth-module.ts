import { Profile } from "@/types/auth-types";
import { Module, ActionContext } from "vuex";
import axios from "axios";
import { BASE_API_URL } from "@/constants";

// auth state
export type AuthState = {
  profile: Profile;
};

const authModule: Module<AuthState, any> = {
  namespaced: true, // custom name space
  state: {
    profile: {} as Profile, // convert to type Profile
  },
  mutations: {
    SET_USER_PROFILE(state: AuthState, newProfile: Profile) {
      state.profile = newProfile;
    },
  },
  actions: {
    // ** shloud split action to new file
    // connect services (backend service)
    async getProfile(context: ActionContext<AuthState, null>) {
      // const token = JSON.parse(localStorage.getItem("token").toString());
      const token = JSON.parse(localStorage.getItem("token")!);
      if (token) {
        const response = await axios.get(`${BASE_API_URL}/auth/profile`, {
          headers: { Authorization: "Bearer " + token.accessToken },
        });

        const newProfile = response.data;
        context.commit("SET_USER_PROFILE", newProfile);
      }
    },
  },
};

export default authModule;
